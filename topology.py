from mininet.net import Mininet
from mininet.node import Controller, Node
from mininet.link import TCLink
from mininet.cli import CLI
import threading
import time
import re
import requests

# Step 1: Define the custom network topology
def customTopology():
    net = Mininet(controller=Controller, link=TCLink)  # Using TCLink for bandwidth control

    # Add hosts
    server = net.addHost("server", ip="10.0.0.1/24")  # Server simulating the ISP
    client1 = net.addHost("client1", ip="10.0.1.1/24")  # Client1 with its own subnet
    client2 = net.addHost("client2", ip="10.0.2.1/24")  # Client2 with its own subnet

    # Add router
    router = net.addHost("router", ip="10.0.0.254")  # Router to manage traffic between server and clients

    # Add links with initial bandwidth constraints
    net.addLink(server, router, bw=100)  # High bandwidth between server and router
    link1 = net.addLink(router, client1, bw=50)  # Client1 starts with 200 Mbps
    link2 = net.addLink(router, client2, bw=50)  # Client2 starts with 200 Mbps

    # Start the network
    net.start()

    # Enable IP forwarding on the router
    router.cmd("sysctl -w net.ipv4.ip_forward=1")

    # Configure router interfaces manually
    router.cmd("ifconfig router-eth0 10.0.0.254 netmask 255.255.255.0")  # Link to server
    router.cmd("ifconfig router-eth1 10.0.1.254 netmask 255.255.255.0")  # Link to client1
    router.cmd("ifconfig router-eth2 10.0.2.254 netmask 255.255.255.0")  # Link to client2

    # Set default gateways for clients and server
    server.cmd("route add default gw 10.0.0.254")
    client1.cmd("route add default gw 10.0.1.254")
    client2.cmd("route add default gw 10.0.2.254")

    # Start iperf server on the server host
    server.cmd("iperf -s &")  # Server listens for iperf traffic

    # Return network and link objects for further manipulation
    return net, server, client1, client2, link1, link2

# Step 2: Monitor the bandwidth between client and server
def monitorBandwidth(client, server, interval=5):
    """Monitor bandwidth between client and server using iperf."""
    while True:
        print(f"Running iperf from {client.name} to {server.name}")
        result = client.cmd(f"iperf -c {server.IP()} -t 1")  # Run iperf for 1 second
        print(f"iperf result: {result}")
        bandwidth = re.search(r"(\d+\.\d+)\sMbits/sec", result)
        if bandwidth:
            bw_value = float(bandwidth.group(1))
            print(f"Bandwidth from {client.name} to {server.name}: {bw_value} Mbits/sec")
            # Send data to Flask server with client's IP
            try:
                requests.post("http://localhost:5000/api/bandwidth", json={
                    "client": client.name,
                    "ip": client.IP(),  # Include the client's IP address here
                    "bandwidth": bw_value
                })
            except requests.exceptions.RequestException as e:
                print(f"Error sending data to Flask server: {e}")
        time.sleep(interval)

# Step 3: Function to dynamically set client bandwidth
def setCustomBandwidth(link, bw, client_iface, router_iface):
    """Set custom bandwidth for a link using tc directly, ensuring shell is initialized."""
    def configure_tc(node, iface, bw):
        for _ in range(5):  # Retry up to 5 times if the shell is waiting
            if node.shell and not node.waiting:
                node.cmd(f"tc qdisc replace dev {iface} root tbf rate {bw}mbit burst 10kb latency 50ms")
                return
            else:
                print(f"Node shell for {iface} is not initialized or is in a waiting state. Retrying...")
                time.sleep(1)  # Small delay before retrying

    configure_tc(link.intf1.node, client_iface, bw)
    configure_tc(link.intf2.node, router_iface, bw)

# Step 4: Start Mininet CLI for manual interaction
def startCLI(net):
    """Start the Mininet CLI."""
    CLI(net)



# Step 5: Run the full simulation
def runSimulation():
    # Create the network topology
    net, server, client1, client2, link1, link2 = customTopology()

    # Step 6: Start monitoring bandwidth in separate threads
    threading.Thread(target=monitorBandwidth, args=(client1, server, 5), daemon=True).start()
    threading.Thread(target=monitorBandwidth, args=(client2, server, 5), daemon=True).start()

    # Simulate changing bandwidth for clients dynamically
    time.sleep(10)
    print("Changing Client1's bandwidth to 10 Mbps")
    setCustomBandwidth(link1, 10, "client1-eth0", "router-eth1")  # Change Client1's bandwidth to 10 Mbps

    time.sleep(10)
    print("Changing Client2's bandwidth to 5 Mbps")
    setCustomBandwidth(link2, 5, "client2-eth0", "router-eth2")  # Change Client2's bandwidth to 5 Mbps

    # Step 7: Start the Mininet CLI for manual testing
    startCLI(net)

    # Stop the network when done
    net.stop()

# Step 8: Run the simulation
if __name__ == "__main__":
    runSimulation()