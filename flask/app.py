from flask import Flask, request, session
from flask_socketio import SocketIO, join_room, leave_room, emit
from peewee import SqliteDatabase

from gamestate.deck import Deck
from gamestate.game import Game
from gamestate.game_manager import GameManager
from gamestate.models import database_proxy, StoredGame

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, logger=True, engineio_logger=True)

if app.config['DEBUG'] or app.config['TESTING']:
    real_db = SqliteDatabase(':memory:')
else:
    real_db = SqliteDatabase('/app/database.db')
database_proxy.initialize(real_db)
if database_proxy.is_closed():
    database_proxy.connect()
StoredGame.create_table()

gm = GameManager()

# For testing purposes only
gm.games['8b70cb3d-00ba-4fcc-aaac-60f699d4170f'] = Game('PBR Pizza', Deck.POWERS)


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


if __name__ == '__main__':
    socketio.run(app)
