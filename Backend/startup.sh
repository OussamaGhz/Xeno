#!/bin/bash

# Exit on error
set -e

# Initialize Open vSwitch
if [ ! -f /etc/openvswitch/conf.db ]; then
    ovsdb-tool create /etc/openvswitch/conf.db /usr/share/openvswitch/vswitch.ovsschema
fi

# Start OVS services
ovsdb-server --remote=punix:/var/run/openvswitch/db.sock \
    --remote=db:Open_vSwitch,Open_vSwitch,manager_options \
    --pidfile --detach || true

# Initialize OVS
ovs-vsctl --no-wait init || true
ovs-vswitchd --pidfile --detach || true

# Activate virtual environment
source /opt/venv/bin/activate

# Start Flask server
python main.py