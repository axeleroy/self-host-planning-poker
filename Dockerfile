FROM --platform=$BUILDPLATFORM node:lts-slim AS node_builder
WORKDIR /angular
COPY angular/ /angular
RUN npm i
RUN npm run build self-host-planning-poker
# Flatten dist folder
RUN mkdir -p /dist
RUN cp -R dist/self-host-planning-poker/assets/* /dist
RUN cp dist/self-host-planning-poker/*.* /dist

FROM python:3.12.0-alpine3.17
WORKDIR /app
COPY flask/ ./
RUN pip install -r requirements.txt
COPY --from=node_builder /dist ./static
CMD [ "gunicorn", "--worker-class", "eventlet", "-w", "1", "app:app", "--bind", "0.0.0.0:8000" ]
