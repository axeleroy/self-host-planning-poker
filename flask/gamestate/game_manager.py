import uuid

from gamestate.game import Game


class GameManager:
    """Class that manages games"""
    def __init__(self):
        self.games = {}

    def create(self, name: str) -> str:
        game_uuid = str(uuid.uuid4())
        # TODO: Save game info to DB
        self.games[game_uuid] = Game(name)
        return game_uuid

    def get(self, game_uuid: str) -> Game:
        game = self.games[game_uuid]
        if game is None:
            game = Game('random')  # TODO: load game info from DB and create new instance
            self.games[game_uuid] = game
        return game
    
    def set_deck(self, game_uuid: str, deck: str):
        pass

    def join_game(self, game_uuid: str, player_uuid: str, player_name: str, is_spectator: bool):
        pass

    def set_player_name(self, game_uuid: str, player__uid: str, player_name: str):
        pass

    def set_player_spectator(self, game_uuid: str, player__uid: str, is_spectator: bool):
        pass

    def leave_game(self, game_uuid: str, player_uuid: str):
        game = self.games[game_uuid]
        game.player_leaves(player_uuid)
        if game.is_game_empty():
            self.games.pop(game_uuid)

    def pick_card(self, game_uuid: str, player_uuid: str, pick: int):
        pass

    def reveal_cards(self, game_uuid: str):
        pass

    def end_turn(self, game_uuid: str):
        pass
    