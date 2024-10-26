# Bandwidth Management System Documentation

## Table of Contents

1. [RL Documentation](#rl-documentation)
2. [Mininet Installation Guide](#mininet-installation-guide)
1. [RL Documentation](#rl-documentation)
2. [Mininet Installation Guide](#mininet-installation-guide)
3. [Frontend Documentation](#frontend-documentation)
4. [API Documentation](#api-documentation)
5. [Topology and Simulation Explanation](#topology-and-simulation-explanation)
6. [Output Data and Command Explanation](#output-data-and-command-explanation)

---

## RL Documentation

### Prerequisites

- **Python 3.7+**: Ensure Python is installed on your system.
- **Linux**: Ensure you have a Linux ditro installed in your system.


### Installation Steps

1. **Navigate to the Backend Directory**:
    ```bash
    cd Backend
    ```

2. **Create a Virtual Environment**:
    ```bash
    python -m venv venv
    ```

3. **Activate the Virtual Environment**:
    ```bash
    source venv/bin/activate
    ```

4. **Install Dependencies**:
    Install the required Python packages from `requirements.txt`:
    ```bash
    pip install -r requirements.txt
    ```

5. **Run the Server**:
    Start the Flask server using the following command:
    ```bash
    sudo python main.py
    ```

6. **Run the RL Model**:
    Start the Flask server using the following command:
    ```bash
    python RL.py
    ```

Your backend should now be accessible at `http://localhost:5000`.

---

## Mininet Installation Guide

### Prerequisites

- **Linux**: Ensure you have a Linux distribution installed on your system.

### Installation Steps

#### Ubuntu/Debian

1. **Update Package List**:
    ```bash
    sudo apt-get update
    ```

2. **Install Mininet**:
    ```bash
    sudo apt-get install mininet
    ```

3. **Verify Installation**:
    Run the following command to verify that Mininet is installed correctly:
    ```bash
    sudo mn --test pingall
    ```

#### CentOS/RHEL

1. **Install EPEL Repository**:
    ```bash
    sudo yum install epel-release
    ```

2. **Install Mininet Dependencies**:
    ```bash
    sudo yum install git python3
    ```

3. **Clone Mininet Repository**:
    ```bash
    git clone git://github.com/mininet/mininet
    cd mininet
    ```

4. **Install Mininet**:
    ```bash
    sudo ./util/install.sh -a
    ```

5. **Verify Installation**:
    Run the following command to verify that Mininet is installed correctly:
    ```bash
    sudo mn --test pingall
    ```

#### Arch Linux

1. **Install Mininet**:
    ```bash
    sudo pacman -S mininet
    ```

2. **Verify Installation**:
    Run the following command to verify that Mininet is installed correctly:
    ```bash
    sudo mn --test pingall
    ```

If the installation is successful, you should see output indicating that all hosts can ping each other.

---

## Frontend Documentation

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.

### Installation Steps

1. **Navigate to the Frontend Directory**:
    ```bash
    cd front
    ```

2. **Install Dependencies**:
    Install the required Node packages:
    ```bash
    npm install
    ```

3. **Run the Application**:
    Start the Next.js application:
    ```bash
    npm run dev
    ```

Your frontend should now be accessible at `http://localhost:3000`.

---

## API Documentation
## API Documentation

### Endpoints

#### 1. Get All Clients' Bandwidth Data

- **URL**: `/all`
- **Method**: `GET`
- **Description**: Retrieves bandwidth data for all clients, including IP, max bandwidth, and bandwidth usage over time.
- **Response**:

    ```json
    [
        {
            "id": "client1",
            "ip": "192.168.1.1",
            "max_bandwidth": 10,
            "data": [
                { "bandwidth": 5, "timestamp": "2024-10-19 12:00:00" },
                { "bandwidth": 7, "timestamp": "2024-10-19 12:01:00" }
            ]
        },
        {
            "id": "client2",
            "ip": "192.168.1.2",
            "max_bandwidth": 20,
            "data": [
                { "bandwidth": 15, "timestamp": "2024-10-19 12:00:00" }
            ]
        }
    ]
    ```

#### 2. Add Bandwidth Data for a Client

- **URL**: `/bandwidth`
- **Method**: `POST`
- **Description**: Inserts bandwidth data for a specific client.
- **Request**:

    ```json
    {
        "client": "client1",
        "ip": "192.168.1.1",
        "bandwidth": 10,
        "max_bandwidth": 20,
        "timestamp": "2024-10-19 12:02:00"
    }
    ```

- **Response**:

    ```json
    {
        "status": "success"
    }
    ```

#### 3. Set Custom Bandwidth for a Client

- **URL**: `/set_bandwidth`
- **Method**: `POST`
- **Description**: Updates the maximum bandwidth for a specific client.
- **Request**:

    ```json
    {
        "client": "client1",
        "bandwidth": 10
    }
    ```

- **Response**:

    ```json
    {
        "status": "success"
    }
    ```

#### 4. Get the Number of Clients

- **URL**: `/clients/count`
- **Method**: `GET`
- **Description**: Retrieves the number of unique clients.
- **Response**:

    ```json
    {
        "count": 5
    }
    ```

#### 5. Get Clients with Highest Bandwidth

- **URL**: `/clients/highest_bandwidth`
- **Method**: `GET`
- **Description**: Retrieves the highest bandwidth used by each client.
- **Response**:

    ```json
    [
        {
            "client": "client1",
            "highest_bandwidth": 100.0
        }
    ]
    ```

#### 6. Get Latest Bandwidth per Client

- **URL**: `/clients/latest_bandwidth`
- **Method**: `GET`
- **Description**: Retrieves the most recent bandwidth data for each client.
- **Response**:

    ```json
    [
        {
            "client": "client1",
            "latest_bandwidth": 50.0,
            "timestamp": "2023-10-01T12:00:00Z"
        }
    ]
    ```

#### 7. Get Max Bandwidth per Client

- **URL**: `/clients/max_bandwidth`
- **Method**: `GET`
- **Description**: Retrieves the maximum bandwidth set for each client.
- **Response**:

    ```json
    [
        {
            "client": "client1",
            "max_bandwidth": 100.0
        }
    ]
    ```

#### 8. Get Specific Client Information

- **URL**: `/client/<client_id>`
- **Method**: `GET`
- **Description**: Retrieves detailed information, including IP, max bandwidth, highest bandwidth, and latest bandwidth for a specific client.
- **Response**:

    ```json
    {
        "client": "client1",
        "ip": "192.168.1.1",
        "max_bandwidth": 20,
        "highest_bandwidth": 15,
        "latest_bandwidth": 10,
        "latest_timestamp": "2024-10-19 12:02:00",
        "data": [
            { "bandwidth": 5, "timestamp": "2024-10-19 12:00:00" },
            { "bandwidth": 7, "timestamp": "2024-10-19 12:01:00" }
        ]
    }
    ```

---

## Topology and Simulation Explanation

### Mininet Overview

Mininet is a network emulator that creates a virtual network of hosts, switches, and links, making it possible to run a realistic virtual network on a single machine. It is widely used for research and development in networking.

### Custom Network Topology

The custom network topology for this project is created using Mininet and consists of:

- **Server**: Acts as the ISP server with IP `10.0.0.1/24`.
- **Router**: Manages traffic between the server and clients with IP `10.0.0.254`.
- **Client1**: A client with its own subnet and IP `10.0.1.1/24`.
- **Client2**: Another client with its own subnet and IP `10.0.2.1/24`.

### Simulation Steps

1. **Setup Database**: Initializes an SQLite database to store bandwidth data.
2. **Create Network Topology**: Sets up the network with initial bandwidth constraints using `TCLink` for bandwidth control.
3. **Monitor Bandwidth**: Continuously monitors the bandwidth between clients and the server using `iperf` and stores the data in the database.
4. **Set Custom Bandwidth**: Allows dynamic adjustment of bandwidth for clients using `tc` commands.
5. **Start Mininet CLI**: Provides a command-line interface for manual interaction with the network.
6. **Run Simulation**: Combines all the steps to run the full simulation, including starting the Flask server for the API.

The simulation dynamically adjusts the bandwidth for clients and monitors the network performance, providing real-time data through the API.

---

## Output Data and Command Explanation

### Log Output

During the simulation, various log outputs are generated to provide insights into the network's performance and configuration changes. Here are some key log outputs and their explanations:

1. **Network Connectivity Test**:
    ```
    pingall
    ```
    This indicates that the network connectivity test using `pingAll` is being performed to ensure all hosts can communicate with each other.

2. **iperf Results**:
    ```
    Running iperf from client1 to server
    iperf result: [iperf output]
    Bandwidth from client1 to server: 10.0 Mbits/sec at 2024-10-19 12:00:00
    ```
    This shows the results of the `iperf` command, which measures the bandwidth between a client and the server. The bandwidth value and timestamp are logged.

3. **Changing Bandwidth**:
    ```
    Changing Client1's bandwidth to 10 Mbps
    Configuring bandwidth 10 Mbps for client1-eth0 on client1
    Configuring bandwidth 10 Mbps for router-eth1 on router
    ```
    This indicates that the bandwidth for a specific client is being changed dynamically. The `tc` commands are used to configure the new bandwidth on the specified interfaces.

### Executed Commands

Here are some key commands executed during the simulation and their explanations:

1. **Mininet Commands**:
    - `net.pingAll()`: Tests connectivity between all hosts in the network.
    - `iperf -s &`: Starts an `iperf` server on the server host to listen for traffic.
    - `iperf -c [server IP] -t 1`: Runs an `iperf` client on a client host to measure bandwidth to the server for 1 second.

2. **Traffic Control (tc) Commands**:
    - `tc qdisc del dev [iface] root`: Deletes the existing traffic control configuration on the specified interface.
    - `tc qdisc add dev [iface] root tbf rate [bw]mbit burst 10kb latency 50ms`: Adds a new traffic control configuration with the specified bandwidth, burst, and latency parameters.

These commands and log outputs provide a comprehensive view of the network's performance and configuration changes during the simulation.

---
