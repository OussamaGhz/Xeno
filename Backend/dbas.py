
#future implementation of the DBAS algorithm
# if you are here, you can igone this file, the main files are (main.py, topology.py)
#
#
#

import time
from threading import Thread
import random
import os

class DBAS:
    def __init__(self, net, total_bandwidth=100):
        self.net = net
        self.total_bandwidth = total_bandwidth
        self.users = {}
        for host in self.net.hosts:
            self.users[host.name] = {"usage": 0, "mir": total_bandwidth / len(self.net.hosts), "limit": None}
        self.running = False

    def monitor_usage(self):
        while self.running:
            for host in self.net.hosts:
                # In a real scenario, you'd measure actual traffic. Here we simulate it.
                self.users[host.name]["usage"] = random.uniform(0, self.users[host.name]["mir"])
            time.sleep(5)  # Check every 5 seconds

    def analyze_and_allocate(self):
        while self.running:
            total_usage = sum(user["usage"] for user in self.users.values())
            unused_bandwidth = self.total_bandwidth - total_usage

            for user in self.users:
                usage_ratio = self.users[user]["usage"] / self.users[user]["mir"]
                new_mir = self.users[user]["mir"]

                if usage_ratio < 0.5:
                    new_mir *= 0.9  # Decrease MIR
                elif usage_ratio > 0.9 and unused_bandwidth > 0:
                    new_mir *= 1.1  # Increase MIR

                self.users[user]["mir"] = min(new_mir, self.total_bandwidth)

            time.sleep(10)  # Adjust every 10 seconds

    def start(self):
        self.running = True
        Thread(target=self.monitor_usage).start()
        Thread(target=self.analyze_and_allocate).start()

    def stop(self):
        self.running = False

    def get_status(self):
        return {
            "users": self.users,
            "total_bandwidth": self.total_bandwidth
        }

    def set_bandwidth_limit(self, user_id, limit):
        if user_id in self.users:
            self.users[user_id]["limit"] = limit
            host = self.net.get(user_id)
            intf = host.defaultIntf()
            print(f"Setting bandwidth limit for {user_id} on interface {intf}")
            os.system(f"ip link show {intf}")  # Log the interface details
            os.system(f"tc qdisc add dev {intf} root tbf rate {limit}mbit burst 32kbit latency 400ms")

    def get_bandwidth_limit(self, user_id):
        if user_id in self.users:
            return self.users[user_id]["limit"]
        return None