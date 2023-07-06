#!/bin/bash

cd /home/ubuntu

# Stop and remove any existing containers
sudo docker compose down

# Remove all unused containers, images, networks, and volumes
sudo docker system prune --all --force

# Build and start the Docker containers
sudo docker compose up -d --build
