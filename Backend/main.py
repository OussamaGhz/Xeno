from flask import Flask, jsonify, request
from flask_cors import CORS
import threading
import sqlite3
from topology import (
    links,
    setCustomBandwidth,
    runSimulation,
    customTopology
)  # Import links, setCustomBandwidth, and runSimulation

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# SQLite database setup
def setup_database():
    conn = sqlite3.connect("./bandwidth_data.db")
    c = conn.cursor()
    c.execute(
        """CREATE TABLE IF NOT EXISTS bandwidth_data
                 (client TEXT, ip TEXT, bandwidth REAL, timestamp TEXT)"""
    )
    conn.commit()
    conn.close()


@app.route("/api/bandwidth", methods=["GET"])
def get_bandwidth():
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute("SELECT * FROM bandwidth_data")
    rows = c.fetchall()
    conn.close()

    data = {}
    for row in rows:
        client, ip, bandwidth, timestamp = row
        if client not in data:
            data[client] = {"id": client, "ip": ip, "data": []}
        data[client]["data"].append({"bandwidth": bandwidth, "timestamp": timestamp})
    return jsonify(data)


@app.route("/api/bandwidth", methods=["POST"])
def post_bandwidth():
    data = request.json
    client = data.get("client")
    ip = data.get("ip")
    bandwidth = data.get("bandwidth")
    timestamp = data.get("timestamp")  # Get the timestamp from the data
    conn = sqlite3.connect("bandwidth_data.db")
    c = conn.cursor()
    c.execute(
        "INSERT INTO bandwidth_data (client, ip, bandwidth, timestamp) VALUES (?, ?, ?, ?)",
        (client, ip, bandwidth, timestamp),
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
        return jsonify({"status": "error", "message": "Client not found", "links": list(links.keys())})
        
    link = links[client]
    client_iface = f"{client}-eth0"
    router_iface = f"router-eth{1 if client == 'client1' else 2}"

    setCustomBandwidth(link, bandwidth, client_iface, router_iface)
    return jsonify({"status": "success"})


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