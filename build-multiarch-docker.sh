#!/usr/bin/env sh

docker buildx build --push --platform linux/arm64/v8,linux/amd64 --tag axeleroy/self-host-planning-poker:latest .
