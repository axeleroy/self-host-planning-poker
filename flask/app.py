from flask import Flask, request, session
from flask_socketio import SocketIO, join_room, leave_room, emit
from peewee import SqliteDatabase

from gamestate.game_manager import GameManager
from gamestate.models import database_proxy, StoredGame

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, logger=True, engineio_logger=True)

if app.config['DEBUG']:
    real_db = SqliteDatabase('database.db')
else:
    real_db = SqliteDatabase('/app/database.db')
database_proxy.initialize(real_db)
if database_proxy.is_closed():
    database_proxy.connect()
StoredGame.create_table()

gm = GameManager()


@app.route('/create', methods=['POST'])
def create():
    game_name = request.form['name']
    game_deck = request.form['deck']
    return gm.create(game_name, game_deck)


@socketio.event
def join(data):
    player_id = request.sid
    player_name = data['name']
    spectator = data['spectator']
    game_id = data['game']

    session['game_id'] = game_id
    join_room(game_id)

    info, state = gm.join_game(game_id, player_id, player_name, spectator)
    emit('state', state, to=game_id, json=True)
    return info


@socketio.event
def disconnect():
    player_id = request.sid
    game_id = session['game_id']

    state = gm.leave_game(game_id, player_id)
    leave_room(game_id)
    emit('state', state, to=game_id, json=True)


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
    player_id = request.sid
    game_id = session['game_id']
    player_name = data['name']

    state = gm.set_player_name(game_id, player_id, player_name)
    emit('state', state, to=game_id, json=True)


@socketio.event
def set_spectator(data):
    player_id = request.sid
    game_id = session['game_id']
    is_specatator = data['spectator']

    state = gm.set_player_spectator(game_id, player_id, is_specatator)
    emit('state', state, to=game_id, json=True)


@socketio.event
def pick_card(data):
    player_id = request.sid
    game_id = session['game_id']
    card = data['card']

    state = gm.pick_card(game_id, player_id, card)
    emit('state', state, to=game_id, json=True)


@socketio.event
def reveal_cards(data):
    game_id = session['game_id']

    hands = gm.reveal_cards(game_id)
    emit('hands', hands, to=game_id, json=True)


@socketio.event
def end_turn(data):
    game_id = session['game_id']

    state = gm.end_turn(game_id)
    emit('state', state, to=game_id, json=True)


@socketio.on_error()
def on_error_handler(e):
    return {'error': True, 'message': str(e)}


if __name__ == '__main__':
    socketio.run(app)
