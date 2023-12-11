FROM --platform=$BUILDPLATFORM node:lts-slim AS node_builder
WORKDIR /angular
COPY angular/ /angular
RUN npm i
RUN npm run build self-host-planning-poker

FROM python:3.11.7-alpine3.18
WORKDIR /app
COPY flask/ ./
RUN pip install -r requirements.txt
COPY --from=node_builder /angular/dist/self-host-planning-poker ./static
CMD [ "gunicorn", "--worker-class", "eventlet", "-w", "1", "app:app", "--bind", "0.0.0.0:8000" ]
