from flask import Flask, jsonify, request
from flask_cors import CORS
import threading

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
    if client in bandwidth_data:
        bandwidth_data[client]['data'].append(bandwidth)
    else:
        bandwidth_data[client] = {
            'id': client,
            'ip': ip,
            'data': [bandwidth]
        }
    return jsonify({'status': 'success'})

@app.route('/api/set_bandwidth', methods=['POST'])
def set_bandwidth():
    data = request.json
    client = data.get('client')
    bandwidth = data.get('bandwidth')
    # Here you would implement the logic to change the bandwidth
    # For now, we just print the request
    print(f"Request to set bandwidth for {client} to {bandwidth} Mbps")
    return jsonify({'status': 'success'})

def run_flask():
    app.run(host='0.0.0.0', port=5000)

if __name__ == '__main__':
    flask_thread = threading.Thread(target=run_flask)
    flask_thread.start()