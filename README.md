# Bandwidth Management System Documentation

## Table of Contents

1. [Mininet Installation Guide](#mininet-installation-guide)
2. [Backend Documentation](#backend-documentation)
3. [Frontend Documentation](#frontend-documentation)
4. [API Documentation](#api-documentation)

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

## Backend Documentation

### Prerequisites

- **Python 3.7+**: Ensure Python is installed on your system.

### Installation Steps

1. **Navigate to the Backend Directory**:
    ```bash
    cd Backend
    ```

2. **Install Dependencies**:
    Install the required Python packages from `requirements.txt`:
    ```bash
    pip install -r requirements.txt
    ```

3. **Run the Server**:
    Start the Flask server using the following command:
    ```bash
    sudo python main.py
    ```

---

## Frontend Documentation

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.

### Installation Steps

1. **Navigate to the Frontend Directory**:
    ```bash
    cd Frontend
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

## API Documentation for Bandwidth Management

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