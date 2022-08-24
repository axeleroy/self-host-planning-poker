from flask import Flask, request, session
from flask_socketio import SocketIO, join_room, send, leave_room

from gamestate.game_manager import GameManager

gm = GameManager()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

if __name__ == '__main__':
    socketio.run(app)


@socketio.on('connect')
def handle_connect(data):
    player_id = request.sid
    player_name = data['name']
    spectator = data['spectator']

    game_id = data['game']
    session['game_id'] = game_id
    join_room(game_id)

    state = gm.join_game(game_id, player_id, player_name, spectator)
    send(state, to=game_id)


@socketio.on('disconnect')
def hand_disconnect():
    player_id = request.sid
    game_id = session['game_id']

    state = gm.leave_game(game_id, player_id)
    leave_room(game_id)
    send(state, to=game_id)
