from mininet.net import Mininet
from mininet.node import Controller, Node
from mininet.link import TCLink
from mininet.cli import CLI
import threading
import time
import re
from datetime import datetime
import sqlite3
import random

# Dictionary to store link objects
links = {}
max_bandwidths = {}  # Dictionary to store max bandwidth values

initial_bw = 40  # Initial bandwidth for clients

# SQLite database setup
def setup_database():
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute(
        """CREATE TABLE IF NOT EXISTS bandwidth_data
                 (client TEXT, ip TEXT, bandwidth REAL, max_bandwidth REAL, timestamp TEXT)"""
    )
    conn.commit()
    conn.close()


def insert_bandwidth_data(client, ip, bandwidth, max_bandwidth, timestamp):
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute(
        "INSERT INTO bandwidth_data (client, ip, bandwidth, max_bandwidth, timestamp) VALUES (?, ?, ?, ?, ?)",
        (client, ip, bandwidth, max_bandwidth, timestamp),
    )
    conn.commit()
    conn.close()


def update_max_bandwidth(client, ip, max_bandwidth):
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute(
        "UPDATE bandwidth_data SET max_bandwidth = ?, ip = ? WHERE client = ?",
        (max_bandwidth, ip, client),
    )
    conn.commit()
    conn.close()


# Step 1: Define the custom network topology
def customTopology():
    net = Mininet(
        controller=Controller, link=TCLink
    )  # Using TCLink for bandwidth control

    # Add hosts
    server = net.addHost("server", ip="10.0.0.1/24")  # Server simulating the ISP
    clients = []
    for i in range(1, 11):
        clients.append(net.addHost(f"client{i}", ip=f"10.0.{i}.1/24"))  # Clients with their own subnets

    # Add router
    router = net.addHost(
        "router", ip="10.0.0.254"
    )  # Router to manage traffic between server and clients

    # Add links with initial bandwidth constraints
    net.addLink(server, router, bw=1000)  # High bandwidth between server and router
    for i, client in enumerate(clients, start=1):
        link = net.addLink(router, client, bw=initial_bw)
        links[f"client{i}"] = link
        # get random number between 0 and 20000
        random_max_bw = random.uniform(0, 3000)
        print(f"random_max_bw sdfsdfsdfsdf: {random_max_bw}")
        max_bandwidths[f"client{i}"] = random_max_bw
    # Start the network
    net.start()

    # Enable IP forwarding on the router
    router.cmd("sysctl -w net.ipv4.ip_forward=1")

    # Configure router interfaces manually
    router.cmd(
        "ifconfig router-eth0 10.0.0.254 netmask 255.255.255.0"
    )  # Link to server
    for i in range(1, 11):
        router.cmd(
            f"ifconfig router-eth{i} 10.0.{i}.254 netmask 255.255.255.0"
        )  # Links to clients

    # Set default gateways for clients and server
    server.cmd("route add default gw 10.0.0.254")
    for i, client in enumerate(clients, start=1):
        client.cmd(f"route add default gw 10.0.{i}.254")

    # Test connectivity
    print("Testing network connectivity")
    net.pingAll()

    # Start iperf server on the server host
    server.cmd("iperf -s &")  # Server listens for iperf traffic

    # Insert initial bandwidth data into the database
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    for i, client in enumerate(clients, start=1):
        insert_bandwidth_data(f"client{i}", client.IP(), initial_bw, initial_bw, timestamp)

    # Return network and link objects for further manipulation
    return net, server, clients


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
            max_bw_value = max_bandwidths[
                client.name
            ]  # Get max bandwidth for the client
            timestamp = datetime.now().strftime(
                "%Y-%m-%d %H:%M:%S"
            )  # Get current timestamp
            print(
                f"Bandwidth from {client.name} to {server.name}: {bw_value} Mbits/sec at {timestamp}"
            )
            # Insert data into SQLite database
            insert_bandwidth_data(
                client.name, client.IP(), bw_value, max_bw_value, timestamp
            )
        time.sleep(interval)


# Step 3: Function to dynamically set client bandwidth
def setCustomBandwidth(link, bw, client_iface, router_iface):
    """Set custom bandwidth for a link using tc directly, ensuring shell is initialized."""

    def configure_tc(node, iface, bw):
        print(f"Configuring bandwidth {bw} Mbps for {iface} on {node.name}")
        for _ in range(5):  # Retry up to 5 times if the shell is waiting
            if node.shell and not node.waiting:
                node.cmd(f"tc qdisc del dev {iface} root")
                node.cmd(
                    f"tc qdisc add dev {iface} root tbf rate {bw}mbit burst 10kb latency 50ms"
                )

                result = node.cmd(f"tc qdisc show dev {iface}")
                print(f"tc command result: {result}")

                return
            else:
                print(
                    f"Node shell for {iface} is not initialized or is in a waiting state. Retrying..."
                )
                time.sleep(1)  # Small delay before retrying

    # Configure client interface on the client node
    configure_tc(link.intf2.node, client_iface, bw)
    # Configure router interface on the router node
    configure_tc(link.intf1.node, router_iface, bw)

    # Update the max bandwidth for the client
    max_bandwidths[link.intf2.node.name] = bw

    # Update the max bandwidth in the database
    update_max_bandwidth(link.intf2.node.name, link.intf2.node.IP(), bw)


# Step 4: Start Mininet CLI for manual interaction
def startCLI(net):
    """Start the Mininet CLI."""
    CLI(net)


# Step 5: Run the full simulation
def runSimulation():
    # Setup the database
    setup_database()

    # Create the network topology
    net, server, clients = customTopology()

    # Step 6: Start monitoring bandwidth in separate threads
    for client in clients:
        threading.Thread(
            target=monitorBandwidth, args=(client, server, 10), daemon=True
        ).start()

    # Simulate changing bandwidth for clients dynamically
    
    # Step 7: Start the Mininet CLI for manual testing
    startCLI(net)

    # Stop the network when done
    net.stop()


# Step 8: Run the simulation
if __name__ == "__main__":
    runSimulation()