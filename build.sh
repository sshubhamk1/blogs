#!/usr/bin/env bash

set -euo pipefail

IMAGE_NAME="shubh-blog"
CONTAINER_NAME="shubh-blog"
PORT="1234"

GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
BLUE="\033[0;34m"
NC="\033[0m"

log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

trap 'error "Deployment failed. Exiting..."; exit 1' ERR

log "Removing existing _site directory..."
rm -rf _site
success "_site removed."

log "Building Jekyll site..."
bundle exec jekyll build
success "Jekyll build completed."

if docker ps -a --format '{{.Names}}' | grep -Fxq "$CONTAINER_NAME"; then
    log "Stopping existing container..."
    docker stop "$CONTAINER_NAME" >/dev/null || true

    log "Removing existing container..."
    docker rm "$CONTAINER_NAME" >/dev/null || true
    success "Old container removed."
else
    warn "No existing container found."
fi

if docker image inspect "$IMAGE_NAME" >/dev/null 2>&1; then
    log "Removing existing Docker image..."
    docker rmi "$IMAGE_NAME" >/dev/null
    success "Old image removed."
else
    warn "No existing image found."
fi

log "Building Docker image..."
docker build -t "$IMAGE_NAME" .
success "Docker image built."

log "Starting container..."

docker run -d \
    --name "$CONTAINER_NAME" \
    -p ${PORT}:80 \
    --restart unless-stopped \
    "$IMAGE_NAME" >/dev/null

success "Container started successfully!"
success "Blog is available at: http://localhost:${PORT}"

echo
docker ps --filter "name=$CONTAINER_NAME"