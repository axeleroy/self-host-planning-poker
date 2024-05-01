FROM --platform=$BUILDPLATFORM docker.io/library/node:lts-slim AS node_builder
WORKDIR /angular
COPY angular/ /angular
RUN npm config set update-notifier false && \
  npm config set fund false && \
  npm config set audit false && \
  npm ci
RUN npm run build self-host-planning-poker

FROM docker.io/library/python:3.12.3-alpine3.18
RUN adduser -H -D -u 1001 -G root default
WORKDIR /app
COPY --chown=1001:0 flask/ ./
COPY --chown=1001:0 --from=node_builder /angular/dist/self-host-planning-poker ./static
RUN pip install --upgrade pip && \
  pip install --requirement requirements.txt && \
  mkdir /data && \
  chown -R 1001:0 /app /data && \
  chmod -R g+w /app /data
USER 1001
CMD [ "gunicorn", "--worker-class", "eventlet", "-w", "1", "app:app", "--bind", "0.0.0.0:8000" ]
