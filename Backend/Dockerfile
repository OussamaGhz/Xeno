# Explicitly specify the platform
FROM --platform=linux/arm64 ubuntu:22.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1

# Install dependencies
RUN apt-get update && apt-get install -y \
    mininet \
    net-tools \
    iputils-ping \
    openvswitch-switch \
    python3-pip \
    python3-venv \
    python3-dev \
    build-essential \
    iproute2 \
    vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create directories for Open vSwitch
RUN mkdir -p /var/run/openvswitch && \
    mkdir -p /etc/openvswitch

# Set up Python virtual environment
WORKDIR /app
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python dependencies
COPY requirements.txt .
RUN . /opt/venv/bin/activate && \
    pip install --no-cache-dir -r requirements.txt

# Copy your backend files
COPY . /app/

# Setup startup script
COPY startup.sh /startup.sh
RUN chmod +x /startup.sh

# Expose the port
EXPOSE 5000

CMD ["/startup.sh"]