#!/usr/bin/env sh

cd angular
npm i
ng build self-host-planning-poker -c production
cp -R dist/self-host-planning-poker/assets/* ../flask/static/
cp dist/self-host-planning-poker/*.* ../flask/static
cd ..
docker build -t self-host-planning-poker flask

