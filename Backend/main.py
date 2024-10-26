from flask import Flask, jsonify, request
from flask_cors import CORS
import threading
import sqlite3
from topology import (
    links,
    setCustomBandwidth,
    runSimulation,
    customTopology,
    max_bandwidths,
)  # Import links, setCustomBandwidth, runSimulation, customTopology, and max_bandwidths

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# SQLite database setup
def setup_database():
    conn = sqlite3.connect("./bandwidth_data.db")
    c = conn.cursor()
    c.execute(
        """CREATE TABLE IF NOT EXISTS bandwidth_data
                 (client TEXT, ip TEXT, bandwidth REAL, max_bandwidth REAL, timestamp TEXT)"""
    )
    conn.commit()
    conn.close()


@app.route("/api/all", methods=["GET"])
def get_bandwidth():
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute("SELECT * FROM bandwidth_data")
    rows = c.fetchall()
    conn.close()

    clients = {}
    for row in rows:
        client, ip, bandwidth, max_bandwidth, timestamp = row
        if client not in clients:
            clients[client] = {
                "id": client,
                "ip": ip,
                "max_bandwidth": max_bandwidth,
                "data": [],
            }
        clients[client]["data"].append({"bandwidth": bandwidth, "timestamp": timestamp})

    # Convert the dictionary to a list of client objects
    client_list = list(clients.values())
    return jsonify(client_list)


@app.route("/api/bandwidth", methods=["POST"])
def post_bandwidth():
    data = request.json
    client = data.get("client")
    ip = data.get("ip")
    bandwidth = data.get("bandwidth")
    max_bandwidth = data.get("max_bandwidth")
    timestamp = data.get("timestamp")  # Get the timestamp from the data
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute(
        "INSERT INTO bandwidth_data (client, ip, bandwidth, max_bandwidth, timestamp) VALUES (?, ?, ?, ?, ?)",
        (client, ip, bandwidth, max_bandwidth, timestamp),
    )
    conn.commit()
    conn.close()
    return jsonify({"status": "success"})


@app.route("/api/set_bandwidth", methods=["POST"])
def set_bandwidth():
    data = request.json
    client = data.get("client")
    bandwidth = data.get("bandwidth")

    if client not in links:
        # Return an error with the links dictionary for debugging
        return jsonify(
            {
                "status": "error",
                "message": "Client not found",
                "links": list(links.keys()),
            }
        )

    link = links[client]
    client_iface = f"{client}-eth0"
    router_iface = f"router-eth{1 if client == 'client1' else 2}"

    # Set custom bandwidth
    setCustomBandwidth(link, bandwidth, client_iface, router_iface)

    # Update the max bandwidth in the database
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute(
        "UPDATE bandwidth_data SET max_bandwidth = ? WHERE client = ?",
        (bandwidth, client),
    )
    conn.commit()
    conn.close()

    return jsonify({"status": "success"})


@app.route("/api/clients/count", methods=["GET"])
def get_clients_count():
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute("SELECT COUNT(DISTINCT client) FROM bandwidth_data")
    count = c.fetchone()[0]
    conn.close()
    return jsonify({"count": count})


@app.route("/api/clients/highest_bandwidth", methods=["GET"])
def get_highest_bandwidth():
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute("SELECT client, MAX(bandwidth) FROM bandwidth_data GROUP BY client")
    rows = c.fetchall()
    conn.close()

    data = [{"client": row[0], "highest_bandwidth": row[1]} for row in rows]
    return jsonify(data)


@app.route("/api/clients/max_bandwidth", methods=["GET"])
def get_max_bandwidth():
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute("SELECT client, max_bandwidth FROM bandwidth_data GROUP BY client")
    rows = c.fetchall()
    conn.close()

    data = [{"client": row[0], "max_bandwidth": row[1]} for row in rows]
    return jsonify(data)


@app.route("/api/clients/latest_bandwidth", methods=["GET"])
def get_latest_bandwidth():
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute(
        """
        SELECT client, bandwidth, timestamp
        FROM bandwidth_data
        WHERE (client, timestamp) IN (
            SELECT client, MAX(timestamp)
            FROM bandwidth_data
            GROUP BY client
        )
    """
    )
    rows = c.fetchall()
    conn.close()

    data = [
        {"client": row[0], "latest_bandwidth": row[1], "timestamp": row[2]}
        for row in rows
    ]
    return jsonify(data)


@app.route("/api/clients", methods=["GET"])
def get_clients():
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute(
        "SELECT client, ip, MAX(max_bandwidth) FROM bandwidth_data WHERE ip IS NOT NULL GROUP BY client"
    )
    rows = c.fetchall()
    conn.close()

    clients = []
    seen_clients = set()
    for row in rows:
        client, ip, max_bandwidth = row
        if client not in seen_clients:
            clients.append({"client": client, "ip": ip, "max_bandwidth": max_bandwidth})
            seen_clients.add(client)
    return jsonify(clients)


@app.route("/api/client/<client_id>", methods=["GET"])
def get_client_info(client_id):
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()

    # Get client details
    c.execute(
        "SELECT client, ip, MAX(max_bandwidth) FROM bandwidth_data WHERE client = ? GROUP BY client",
        (client_id,),
    )
    client_details = c.fetchone()

    if not client_details:
        return jsonify({"error": "Client not found"}), 404

    client, ip, max_bandwidth = client_details

    # Get highest bandwidth
    c.execute(
        "SELECT MAX(bandwidth) FROM bandwidth_data WHERE client = ?", (client_id,)
    )
    highest_bandwidth = c.fetchone()[0]

    # Get latest bandwidth
    c.execute(
        """
        SELECT bandwidth, timestamp
        FROM bandwidth_data
        WHERE client = ?
        ORDER BY timestamp DESC
        LIMIT 1
    """,
        (client_id,),
    )
    latest_bandwidth_data = c.fetchone()
    latest_bandwidth, latest_timestamp = (
        latest_bandwidth_data if latest_bandwidth_data else (None, None)
    )

    # Get all bandwidth data
    c.execute(
        "SELECT bandwidth, timestamp FROM bandwidth_data WHERE client = ?", (client_id,)
    )
    bandwidth_data = [
        {"bandwidth": row[0], "timestamp": row[1]} for row in c.fetchall()
    ]

    conn.close()

    data = {
        "client": client,
        "ip": ip,
        "max_bandwidth": max_bandwidth,
        "highest_bandwidth": highest_bandwidth,
        "latest_bandwidth": latest_bandwidth,
        "latest_timestamp": latest_timestamp,
        "data": bandwidth_data,
    }
    return jsonify(data)


@app.route("/api/delete_records", methods=["DELETE"])
def delete_records():
    timestamp = request.args.get("timestamp")
    if not timestamp:
        return jsonify({"status": "error", "message": "Timestamp is required"}), 400

    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute("DELETE FROM bandwidth_data WHERE timestamp = ?", (timestamp,))
    conn.commit()
    conn.close()

    return jsonify({"status": "success", "message": f"Records with timestamp {timestamp} deleted"})


def run_flask():
    setup_database()  # Ensure the database is set up
    app.run(host="0.0.0.0", port=5000)


if __name__ == "__main__":
    # Create the network topology and populate the links dictionary
    customTopology()

    # Start the Mininet simulation in a separate thread
    mininet_thread = threading.Thread(target=runSimulation)
    mininet_thread.start()

    # Start the Flask app
    flask_thread = threading.Thread(target=run_flask)
    flask_thread.start()