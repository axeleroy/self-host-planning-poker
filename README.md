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
  * Translations _(English, French, German, Italian. [Contributions welcome!](#im-a-user-and-want-to-contribute-translations))_
 
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

| Variable              | Meaning                                       | Example            |
|-----------------------|-----------------------------------------------|--------------------|
| `APP_ROOT` (optional) | Allows you to deploy to another path than `/` | `APP_ROOT=/poker/` |

### Running behind a reverse-proxy

Refer to [Socket.IO's documentation for setting up a reverse-proxy](https://socket.io/docs/v4/reverse-proxy/).

### Customizing

<details>
<summary><b>Changing application colors</b></summary>

1. Download a copy of [overrides.css](https://github.com/axeleroy/self-host-planning-poker/blob/main/angular/src/assets/overrides.css).
2. Uncomment the CSS and customize it to match your desired colors.
3. Make a bind mount from this file to the container's `/app/static/overrides.css`:
   * **Plain Docker**
     ```shell
     docker run \
     -v planning-poker-data:/data \
     -v /path/to/overrides.css:/app/static/overrides.css \
     -p 8000:8000 \
     axeleroy/self-host-planning-poker:latest
     ```
   * **Docker Compose**
      ```yml
      version: "3"
      services:
        planning-poker:
          image: axeleroy/self-host-planning-poker:latest
          ports:
          - 8000:8000
          volumes:
          - planning-poker-data:/data
          - /path/to/overrides.css:/app/static/overrides.css
    
      volumes:
        planning-poker-data: {}
      ```
</details>

<details>
<summary><b>Changing application icon</b></summary>

Make a bind mount from your desired icon to the container's `/app/static/assets/icon.svg`:
* **Plain Docker**
  ```shell
  docker run \
  -v planning-poker-data:/data \
  -v /path/to/icon.svg:/app/static/assets/icon.svg \
  -p 8000:8000 \
  axeleroy/self-host-planning-poker:latest
  ```
* **Docker Compose**
   ```yml
   version: "3"
   services:
     planning-poker:
       image: axeleroy/self-host-planning-poker:latest
       ports:
       - 8000:8000
       volumes:
       - planning-poker-data:/data
       - /path/to/icon.svg:/app/static/assets/icon.svg
 
   volumes:
     planning-poker-data: {}
   ```
  
To change the favicon, use [Favicon Generator](https://realfavicongenerator.net/) to generate a "Favicon package".
Then unzip it and mount this folder to `/app/static/assets/favicon` using a bind mount.
</details>

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

After initalizing the virtual environment, run this command in the `flask/` directory:
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
