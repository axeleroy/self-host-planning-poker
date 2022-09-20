#!/usr/bin/env sh
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
docker buildx create --driver docker-container --use
docker buildx inspect --bootstrap
docker buildx build --push --platform linux/arm64/v8,linux/amd64 --tag axeleroy/self-host-planning-poker:latest .
