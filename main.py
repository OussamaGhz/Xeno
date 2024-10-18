from flask import Flask, jsonify, request
from flask_cors import CORS
import threading
from topology import setCustomBandwidth, links  # Import links

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Shared data structure to store bandwidth data
bandwidth_data = {}

@app.route('/api/bandwidth', methods=['GET'])
def get_bandwidth():
    return jsonify(bandwidth_data)

@app.route('/api/bandwidth', methods=['POST'])
def post_bandwidth():
    data = request.json
    client = data.get('client')
    ip = data.get('ip')
    bandwidth = data.get('bandwidth')
    timestamp = data.get('timestamp')  # Get the timestamp from the data
    if client in bandwidth_data:
        bandwidth_data[client]['data'].append({
            'bandwidth': bandwidth,
            'timestamp': timestamp
        })
        # Update IP address if it has changed
        if bandwidth_data[client]['ip'] != ip:
            bandwidth_data[client]['ip'] = ip
    else:
        bandwidth_data[client] = {
            'id': client,
            'ip': ip,
            'data': [{
                'bandwidth': bandwidth,
                'timestamp': timestamp
            }]
        }
    return jsonify({'status': 'success'})

@app.route('/api/set_bandwidth', methods=['POST'])
def set_bandwidth():
    data = request.json
    client = data.get('client')
    bandwidth = data.get('bandwidth')
    print(f"Request to set bandwidth for {client} to {bandwidth} Mbps")
    
    # Check if the client exists in the links dictionary
    if client in links:
        link = links[client]
        client_iface = f"{client}-eth0"
        router_iface = "router-eth1" if client == 'client1' else "router-eth2"
        # Call function to update bandwidth for the client
        setCustomBandwidth(link, bandwidth, client_iface, router_iface)
        return jsonify({'status': 'success', 'message': f'Bandwidth set to {bandwidth} Mbps for {client}'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Client not found'}), 404

def run_flask():
    app.run(host='0.0.0.0', port=5000)

if __name__ == '__main__':
    flask_thread = threading.Thread(target=run_flask)
    flask_thread.start()