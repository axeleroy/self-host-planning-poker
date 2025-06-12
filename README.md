# Self-host Planning Poker

A hassle-free Planning Poker application to deploy on your NAS.

[![Docker Hub](https://img.shields.io/docker/v/axeleroy/self-host-planning-poker?sort=semver&logo=docker)](https://hub.docker.com/r/axeleroy/self-host-planning-poker/tags)
[![Docker Hub](https://img.shields.io/docker/pulls/axeleroy/self-host-planning-poker?logo=docker)](https://hub.docker.com/r/axeleroy/self-host-planning-poker/tags)
[![GitHub release](https://img.shields.io/github/v/release/axeleroy/self-host-planning-poker?logo=github&logoColor=959DA5)](https://github.com/axeleroy/self-host-planning-poker/pkgs/container/self-host-planning-poker)

[![GitHub last commit](https://img.shields.io/github/last-commit/axeleroy/self-host-planning-poker?logo=github&logoColor=959DA5)](https://github.com/axeleroy/self-host-planning-poker/commits/main)
[![License](https://img.shields.io/github/license/axeleroy/self-host-planning-poker?logo=github&logoColor=959DA5)](https://github.com/axeleroy/self-host-planning-poker/blob/main/LICENSE)
[![Tests](https://github.com/axeleroy/self-host-planning-poker/actions/workflows/tests.yml/badge.svg)](https://github.com/axeleroy/self-host-planning-poker/actions/workflows/tests.yml)
[![Docker build](https://github.com/axeleroy/self-host-planning-poker/actions/workflows/publish.yml/badge.svg)](https://github.com/axeleroy/self-host-planning-poker/actions/workflows/publish.yml)
[![Crowdin](https://badges.crowdin.net/self-host-planning-poker/localized.svg)](https://crowdin.com/project/self-host-planning-poker)

## What is it?

This application is intended as a simplified and self-hostable alternative to
[Planning Poker Online](https://planningpokeronline.com/).

It features:

  * Multiple deck types: Fibonacci, modified Fibonacci, T-Shirt sizes, powers of 2 and trust vote (0 to 5)
  * Spectator mode
  * Responsive layout
  * Vote summary
  * Translations _(English, French, German, Italian and Polish. [Contributions welcome!](#im-a-user-and-want-to-contribute-translations))_
 
It does not have fancy features like issues management, Jira integration or timers.

## Screenshots
<a href="https://github.com/axeleroy/self-host-planning-poker/blob/main/assets/screenshot.png"><img alt="Application screenshot with cards face down" src="https://github.com/axeleroy/self-host-planning-poker/blob/main/assets/screenshot.png" width="412px"></a>
<a href="https://github.com/axeleroy/self-host-planning-poker/blob/main/assets/screenshot.png"><img alt="Application screenshot with cards revealed" src="https://github.com/axeleroy/self-host-planning-poker/blob/main/assets/screenshot-revealed.png" width="412px"></a>

## Deployment

Deploying the application is easy as it's self-contained in a single container.
All you need is to create a volume to persist the games settings (ID, name and deck).

### Docker
```bash
docker run \
  -v planning-poker-data:/data \
  -p 8000:8000 \
  axeleroy/self-host-planning-poker:latest
```

### docker-compose
```yml
version: "3"
services:
  planning-poker:
    image: axeleroy/self-host-planning-poker:latest
    ports:
      - 8000:8000
    volumes:
      - planning-poker-data:/data
volumes:
  planning-poker-data: {}
```

### Environment variables

| Variable                        | Meaning                                                                                                                                                                                                                                          | Example                                          |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| `APP_ROOT` (optional)           | Allows you to deploy to another path than `/`.<br>See [Configuration examples for deploying on sub‐paths](https://github.com/axeleroy/self-host-planning-poker/wiki/Configuration-examples-for-deploying-on-sub%E2%80%90paths) for more details. | `APP_ROOT=/poker/`                               |
| `DATABASE_URL` (optional)       | Full database connection URL. Supports SQLite, PostgreSQL, and MySQL                                                                                                                                                                               | `postgresql://user:pass@host:5432/db`           |
| `DATABASE_TYPE` (optional)      | Database type: `sqlite` (default), `postgresql`, `mysql`                                                                                                                                                                                           | `postgresql`                                     |
| `DATABASE_HOST` (optional)      | Database host for PostgreSQL/MySQL                                                                                                                                                                                                                 | `postgres.example.com`                          |
| `DATABASE_PORT` (optional)      | Database port                                                                                                                                                                                                                                       | `5432` (PostgreSQL), `3306` (MySQL)             |
| `DATABASE_NAME` (optional)      | Database name                                                                                                                                                                                                                                       | `planning_poker`                                 |
| `DATABASE_USER` (optional)      | Database username                                                                                                                                                                                                                                   | `planning_poker_user`                           |
| `DATABASE_PASSWORD` (optional)  | Database password                                                                                                                                                                                                                                   | `secure_password`                                |
| `DATABASE_SSL_MODE` (optional)  | SSL mode for PostgreSQL: `require`, `prefer`, `disable`                                                                                                                                                                                            | `prefer`                                         |
| `DATABASE_CHARSET` (optional)   | Character set for MySQL                                                                                                                                                                                                                             | `utf8mb4`                                        |
| `DATABASE_PATH` (optional)      | Custom path for SQLite database                                                                                                                                                                                                                     | `/custom/path/database.db`                      |
| `FLASK_DEBUG` (optional)        | Enable debug mode and CORS for development                                                                                                                                                                                                         | `true` or `false`                                |
| `SECRET_KEY` (recommended)      | Flask secret key for production deployments                                                                                                                                                                                                        | `your-secret-key-here`                          |

### External Database Support

Planning Poker now supports external databases for production deployments, especially useful for Kubernetes environments. See [DATABASE_CONFIGURATION.md](DATABASE_CONFIGURATION.md) for detailed configuration instructions.

#### Quick Examples

**PostgreSQL:**
```bash
docker run \
  -e DATABASE_URL="postgresql://user:password@postgres-host:5432/planning_poker" \
  -p 8000:8000 \
  axeleroy/self-host-planning-poker:latest
```

**MySQL:**
```bash
docker run \
  -e DATABASE_URL="mysql://user:password@mysql-host:3306/planning_poker" \
  -p 8000:8000 \
  axeleroy/self-host-planning-poker:latest
```

**SQLite with custom path:**
```bash
docker run \
  -e DATABASE_PATH="/data/custom.db" \
  -v planning-poker-data:/data \
  -p 8000:8000 \
  axeleroy/self-host-planning-poker:latest
```
### Running behind a reverse-proxy

Refer to [Socket.IO's documentation](https://socket.io/docs/v4/reverse-proxy/)  for setting up your reverse-proxy to work correctly with Socket.IO.

### Customization

See [Customizing the application's style and icon](https://github.com/axeleroy/self-host-planning-poker/wiki/Customizing-the-application's-style-and-icon).

## Getting involved

### I'm a developer and I want to help

You are welcome to open Pull Requests resolving issues in the [Project](https://github.com/users/axeleroy/projects/1/views/1) or 
tagged [pr-welcome](https://github.com/axeleroy/self-host-planning-poker/issues?q=is%3Aissue+is%3Aopen+label%3Apr-welcome).
Don't forget to mention the issue you want to close 😉

### I'm a user and I need help / I encountered a bug / I have a feature request

[Open an issue](https://github.com/axeleroy/self-host-planning-poker/issues/new) and I'll take a look at it.

### I'm a user and want to contribute translations

There is a [Crowdin project](https://crowdin.com/project/self-host-planning-poker) that lets you add translations for
your language. If your language is not available, feel free to contact me over Crowdin.

## Development

The app consists of two parts:

* a [back-end](flask/) written in Python with [Flask](https://flask.palletsprojects.com/), [Flask-SocketIO](https://flask-socketio.readthedocs.io/en/latest/index.html) and [peewee](http://docs.peewee-orm.com/en/latest/).
* a [front-end](angular/) written with [Angular](https://angular.io) and [Socket.IO](https://socket.io/).

### Back-end development

You must first initialise a virtual environment and install the dependencies

```sh
# Run the following commands in the flask/ folder
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
```

Then launching the development server is as easy as that:
```bash
FLASK_DEBUG=1 python app.py
```

#### Run unit tests

After initializing the virtual environment, run this command in the `flask/` directory:
```sh
python -m unittest
```

### Front-end development

> <details>
> <summary>
> <b>Note:</b> You might want to test the front-end against a back-end. You can either follow the instructions in the
> previous section to install and run it locally or use the following command to run it in a Docker container:
> </summary>
>
> ```bash
> docker run --rm -it \
>   -v $(pwd)/flask:/app \
>   -p 5000:5000 \
>   python:3.11-slim \
>   bash -c "cd /app; pip install -r requirements.txt; FLASK_DEBUG=1 gunicorn --worker-class eventlet -w 1 app:app --bind 0.0.0.0:5000"
> ```
> </details>

First make sure that [Node.js](https://nodejs.org/en/) (preferably LTS) is installed.
Then, install dependencies and launch the development server

```sh
# Run the following commands in the angular/ folder
npm install
npm start
```

### Building Docker image

```sh
# After checking out the project
docker build . -t axeleroy/self-host-planning-poker:custom
# Alternatively, if you don't want to checkout the project
docker build https://github.com/axeleroy/self-host-planning-poker -t axeleroy/self-host-planning-poker:custom
```
