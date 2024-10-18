from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

dbas_instance = None

def init_app(dbas):
    global dbas_instance
    dbas_instance = dbas

@app.route('/api/network-status', methods=['GET'])
def get_network_status():
    return jsonify(dbas_instance.get_status())

@app.route('/api/user/<user_id>', methods=['GET'])
def get_user_data(user_id):
    user_data = dbas_instance.users.get(user_id, {})
    return jsonify(user_data)

@app.route('/api/user/<user_id>/bandwidth', methods=['POST'])
def set_user_bandwidth(user_id):
    data = request.json
    limit = data.get('limit')
    dbas_instance.set_bandwidth_limit(user_id, limit)
    return jsonify({"status": "success", "user_id": user_id, "limit": limit})

@app.route('/api/user/<user_id>/bandwidth', methods=['GET'])
def get_user_bandwidth(user_id):
    limit = dbas_instance.get_bandwidth_limit(user_id)
    return jsonify({"user_id": user_id, "limit": limit})