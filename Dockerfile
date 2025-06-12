FROM --platform=$BUILDPLATFORM docker.io/library/node:lts-slim AS node_builder
WORKDIR /angular
COPY angular/ /angular
RUN npm config set update-notifier false && \
  npm config set fund false && \
  npm config set audit false && \
  npm ci
RUN npm run build self-host-planning-poker

FROM docker.io/library/python:3.11.7-alpine3.18

# Install system dependencies for database drivers
RUN apk add --no-cache \
    postgresql-dev \
    mysql-dev \
    gcc \
    musl-dev \
    && rm -rf /var/cache/apk/*

RUN adduser -H -D -u 1001 -G root default
WORKDIR /app

# Copy application files
COPY --chown=1001:0 flask/ ./
COPY --chown=1001:0 --from=node_builder /angular/dist/self-host-planning-poker ./static

# Copy utility scripts
COPY --chown=1001:0 healthcheck.py ./

# Install Python dependencies
RUN pip install --upgrade pip && \
  pip install --requirement requirements.txt && \
  mkdir -p /data && \
  chown -R 1001:0 /app /data && \
  chmod -R g+w /app /data && \
  chmod +x /app/healthcheck.py

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD python /app/healthcheck.py app || exit 1

USER 1001
EXPOSE 8000

CMD [ "gunicorn", "--worker-class", "eventlet", "-w", "1", "app:app", "--bind", "0.0.0.0:8000" ]
