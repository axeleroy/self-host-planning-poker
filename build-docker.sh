#!/usr/bin/env sh

cd angular
npm i
npm run build self-host-planning-poker
mkdir -p ../flask/static
cp -R dist/self-host-planning-poker/assets/* ../flask/static/
cp dist/self-host-planning-poker/*.* ../flask/static
cd ..
docker buildx build --push --platform linux/arm64/v8,linux/amd64 --tag axeleroy/self-host-planning-poker:latest flask
