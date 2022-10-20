import uuid

from flask import Flask, request, session
from flask_cors import CORS
from flask_socketio import SocketIO, join_room, leave_room, emit
from peewee import SqliteDatabase

from gamestate.exceptions import PlanningPokerException
from gamestate.game_manager import GameManager
from gamestate.models import database_proxy, StoredGame

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

if app.config['DEBUG']:
    real_db = SqliteDatabase('database.db')
    socketio = SocketIO(app, cors_allowed_origins=[
        'http://localhost:4200', 'http://localhost:5000',
        'http://127.0.0.1:4200', 'http://127.0.0.1:5000'
    ])
    CORS(app)
else:
    real_db = SqliteDatabase('/data/database.db')
    socketio = SocketIO(app)
database_proxy.initialize(real_db)
if database_proxy.is_closed():
    database_proxy.connect()
StoredGame.create_table()

gm = GameManager()


@app.route('/create', methods=['POST'])
def create():
    body = request.json
    game_name = body['name']
    game_deck = body['deck']
    return gm.create(game_name, game_deck)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file('index.html')


@app.route('/favicon.ico')
def serve_icon():
    return app.send_static_file('favicon.ico')


@app.route('/assets/<path:path>')
def serve_assets(path):
    return app.send_static_file(path)


@socketio.event
def join(data):
    player_id = str(uuid.uuid4())
    session['player_id'] = player_id
    player_name = data['name']
    spectator = data['spectator']
    game_id = data['game']

    session['game_id'] = game_id
    join_room(game_id)

    info, state = gm.join_game(game_id, player_id, player_name, spectator)
    emit('state', state, to=game_id, json=True)

    info['playerId'] = player_id
    return info


@socketio.event
def disconnect():
    player_id = session['player_id']
    game_id = session['game_id']

    state = gm.leave_game(game_id, player_id)
    leave_room(game_id)
    emit('state', state, to=game_id, json=True)

    session['player_id'] = None
    session['game_id'] = None


@socketio.event
def rename_game(data):
    game_id = session['game_id']
    game_name = data['name']

    info = gm.rename_game(game_id, game_name)
    emit('info', info, to=game_id, json=True)


@socketio.event
def set_deck(data):
    game_id = session['game_id']
    deck_name = data['deck']

    info, state = gm.set_deck(game_id, deck_name)
    emit('info', info, to=game_id, json=True)
    emit('state', state, to=game_id, json=True)


@socketio.event
def set_player_name(data):
    player_id = session['player_id']
    game_id = session['game_id']
    player_name = data['name']

    state = gm.set_player_name(game_id, player_id, player_name)
    emit('state', state, to=game_id, json=True)


@socketio.event
def set_spectator(data):
    player_id = session['player_id']
    game_id = session['game_id']
    is_spectator = data['spectator']

    state = gm.set_player_spectator(game_id, player_id, is_spectator)
    emit('state', state, to=game_id, json=True)


@socketio.event
def pick_card(data):
    player_id = session['player_id']
    game_id = session['game_id']
    card = data['card']

    state = gm.pick_card(game_id, player_id, card)
    emit('state', state, to=game_id, json=True)


@socketio.event
def reveal_cards():
    game_id = session['game_id']

    state = gm.reveal_cards(game_id)
    emit('state', state, to=game_id, json=True)


@socketio.event
def end_turn():
    game_id = session['game_id']

    state = gm.end_turn(game_id)
    emit('state', state, to=game_id, json=True)
    emit('new_game', to=game_id)


@socketio.on_error()
def on_error_handler(e):
    body = {'error': True, 'message': str(e), 'code': 0}
    if isinstance(e, PlanningPokerException):
        body['code'] = e.code
    return body


if __name__ == '__main__':
    socketio.run(app)
