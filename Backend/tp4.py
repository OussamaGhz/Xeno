#
#
#
#
# if you are here, you can igone this file, the main files are (main.py, topology.py)
#
#
#
#
#


from mininet.net import Mininet
from mininet.node import Controller, Node
from mininet.link import TCLink
from mininet.cli import CLI
import threading
import time
import re
from datetime import datetime
import sqlite3

# Dictionary to store link objects
links = {}

# SQLite database setup
def setup_database():
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute(
        """CREATE TABLE IF NOT EXISTS bandwidth_data
                 (client TEXT, ip TEXT, bandwidth REAL, timestamp TEXT)"""
    )
    conn.commit()
    conn.close()

def insert_bandwidth_data(client, ip, bandwidth, timestamp):
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute(
        "INSERT INTO bandwidth_data (client, ip, bandwidth, timestamp) VALUES (?, ?, ?, ?)",
        (client, ip, bandwidth, timestamp),
    )
    conn.commit()
    conn.close()

# Step 1: Define the custom network topology
def customTopology():
    net = Mininet(controller=Controller, link=TCLink)  # Using TCLink for bandwidth control

    # Add hosts
    server = net.addHost("server", ip="10.0.0.1/24")  # Server simulating the ISP
    client1 = net.addHost("client1", ip="10.0.1.1/24")  # Client1 with its own subnet
    client2 = net.addHost("client2", ip="10.0.2.1/24")  # Client2 with its own subnet
    client3 = net.addHost("client3", ip="10.0.3.1/24")  # Client3 with its own subnet
    client4 = net.addHost("client4", ip="10.0.4.1/24")  # Client4 with its own subnet

    # Add router
    router = net.addHost("router", ip="10.0.0.254")  # Router to manage traffic between server and clients

    # Add links with initial bandwidth constraints
    net.addLink(server, router, bw=100)  # High bandwidth between server and router
    link1 = net.addLink(router, client1)  # Client1 starts with 100 Mbps
    link2 = net.addLink(router, client2)  # Client2 starts with 100 Mbps
    link3 = net.addLink(router, client3)  # Client3 starts with 100 Mbps
    link4 = net.addLink(router, client4)  # Client4 starts with 100 Mbps

    # Store links in the dictionary
    links["client1"] = link1
    links["client2"] = link2
    links["client3"] = link3
    links["client4"] = link4

    # Start the network
    net.start()

    # Enable IP forwarding on the router
    router.cmd("sysctl -w net.ipv4.ip_forward=1")

    # Configure router interfaces manually
    router.cmd("ifconfig router-eth0 10.0.0.254 netmask 255.255.255.0")  # Link to server
    router.cmd("ifconfig router-eth1 10.0.1.254 netmask 255.255.255.0")  # Link to client1
    router.cmd("ifconfig router-eth2 10.0.2.254 netmask 255.255.255.0")  # Link to client2
    router.cmd("ifconfig router-eth3 10.0.3.254 netmask 255.255.255.0")  # Link to client3
    router.cmd("ifconfig router-eth4 10.0.4.254 netmask 255.255.255.0")  # Link to client4

    # Set default gateways for clients and server
    server.cmd("route add default gw 10.0.0.254")
    client1.cmd("route add default gw 10.0.1.254")
    client2.cmd("route add default gw 10.0.2.254")
    client3.cmd("route add default gw 10.0.3.254")
    client4.cmd("route add default gw 10.0.4.254")

    # Test connectivity
    print("Testing network connectivity")
    net.pingAll()

    # Start iperf server on the server host
    server.cmd("iperf -s &")  # Server listens for iperf traffic

    # Return network and link objects for further manipulation
    return net, server, client1, client2, client3, client4, link1, link2, link3, link4

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
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # Get current timestamp
            print(f"Bandwidth from {client.name} to {server.name}: {bw_value} Mbits/sec at {timestamp}")
            # Insert data into SQLite database
            insert_bandwidth_data(client.name, client.IP(), bw_value, timestamp)
        time.sleep(interval)

# Step 3: Function to dynamically set client bandwidth
def setCustomBandwidth(link, bw, client_iface, router_iface):
    """Set custom bandwidth for a link using tc directly, ensuring shell is initialized."""

    def configure_tc(node, iface, bw):
        print(f"Configuring bandwidth {bw} Mbps for {iface} on {node.name}")
        for _ in range(5):  # Retry up to 5 times if the shell is waiting
            if node.shell and not node.waiting:
                node.cmd(f"tc qdisc del dev {iface} root")
                node.cmd(f"tc qdisc add dev {iface} root tbf rate {bw}mbit burst 10kb latency 50ms")

                result = node.cmd(f"tc qdisc show dev {iface}")
                print(f"tc command result: {result}")

                return
            else:
                print(f"Node shell for {iface} is not initialized or is in a waiting state. Retrying...")
                time.sleep(1)  # Small delay before retrying

    # Configure client interface on the client node
    configure_tc(link.intf2.node, client_iface, bw)
    # Configure router interface on the router node
    configure_tc(link.intf1.node, router_iface, bw)

# Step 4: Start Mininet CLI for manual interaction
def startCLI(net):
    """Start the Mininet CLI."""
    CLI(net)

# Step 5: Run the full simulation
def runSimulation():
    # Setup the database
    setup_database()

    # Create the network topology
    net, server, client1, client2, client3, client4, link1, link2, link3, link4 = customTopology()

    # Step 6: Start monitoring bandwidth in separate threads
    clients = [client1, client2, client3, client4]
    for client in clients:
        threading.Thread(target=monitorBandwidth, args=(client, server, 5), daemon=True).start()

    # Bandwidth settings for each client
    bandwidth_settings = [
        (link1, 10, "client1-eth0", "router-eth1"),
        (link2, 5, "client2-eth0", "router-eth2"),
        (link3, 15, "client3-eth0", "router-eth3"),
        (link4, 20, "client4-eth0", "router-eth4")
    ]

    # Simulate changing bandwidth for clients dynamically
    for link, bw, client_iface, router_iface in bandwidth_settings:
        time.sleep(10)
        print(f"Changing bandwidth to {bw} Mbps")
        setCustomBandwidth(link, bw, client_iface, router_iface)

    # Step 7: Start the Mininet CLI for manual testing
    startCLI(net)

    # Stop the network when done
    net.stop()

# Step 8: Run the simulation
if __name__ == "__main__":
    runSimulation()