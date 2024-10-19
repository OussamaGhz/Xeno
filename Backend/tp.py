from mininet.net import Mininet
from mininet.node import Controller
from mininet.link import TCLink
from mininet.cli import CLI

# Dictionary to store link objects
links = {}

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
    link1 = net.addLink(router, client1)  # Client1 starts with 100 Mbps
    link2 = net.addLink(router, client2)  # Client2 starts with 100 Mbps

    # Store links in the dictionary
    links["client1"] = link1
    links["client2"] = link2

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

    # Test connectivity
    print("Testing network connectivity")
    net.pingAll()

    # Start iperf server on the server host
    server.cmd("iperf -s &")  # Server listens for iperf traffic

    # Start the Mininet CLI for manual testing
    CLI(net)

    # Stop the network when done
    net.stop()

# Step 2: Run the topology
if __name__ == "__main__":
    customTopology()