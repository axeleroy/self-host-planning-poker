# Self-host Planning Poker

A hassle-free Planning Poker application to deploy on your NAS.

## What is it?

This application is intended as a simplified and self-hostable alternative to [Planning Poker Online](https://planningpokeronline.com/).

It features:

  * Multiple deck types: Fibonacci, modified Fibonacci, T-Shirt sizes, powers of 2 and trust vote (0 to 5)
  * Spectator mode
  * Vote summary
  * Responsive layout
  * Translations
 
It does not have fancy features like issues management, Jira integration or timers.

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
  planning-poker-data:
```

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
>   python:3.10-slim \
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

### Publishing a new version to DockerHub

A GitHub Action has been set to build and publish a new image on tags pushes. So push a new tag which follow the `vX.Y.Z` convention to start the Action.
