@echo off
echo "Stopping and removing existing containers..."
docker-compose down

echo "Building and starting containers..."
docker-compose up -d --build

echo "Deployment finished."
