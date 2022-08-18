import uuid

from gamestate.deck import Deck
from gamestate.game import Game
from gamestate.illegal_operation_error import IllegalOperationError
from gamestate.player import Player


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
        game = self.games.get(game_uuid)
        if game is None:
            game = Game('random')  # TODO: load game info from DB and create new instance
            self.games[game_uuid] = game
        return game

    def __get_game_or_raise(self, game_uuid: str) -> Game:
        game = self.games.get(game_uuid)
        if game is None:
            raise IllegalOperationError(f'Game {game_uuid} is not ongoing')
        return game
    
    def set_deck(self, game_uuid: str, deck_name: str):
        if deck_name not in Deck.__members__.keys():
            raise IllegalOperationError(f'Deck {deck_name} does not exist')
        game = self.__get_game_or_raise(game_uuid)
        deck = Deck[deck_name]
        game.set_deck(deck)  # TODO: save deck to DB
        return game.state()

    def join_game(self, game_uuid: str, player_uuid: str, player_name: str, is_spectator: bool):
        game = self.__get_game_or_raise(game_uuid)
        player = Player(player_name, is_spectator)
        game.player_joins(player_uuid, player)
        return game.state()

    def leave_game(self, game_uuid: str, player_uuid: str):
        game = self.__get_game_or_raise(game_uuid)
        game.player_leaves(player_uuid)
        if game.is_game_empty():
            self.games.pop(game_uuid)
        return game.state()

    def set_player_name(self, game_uuid: str, player_uuid: str, player_name: str):
        game = self.__get_game_or_raise(game_uuid)
        player = game.get_player(player_uuid)
        player.name = player_name
        return game.state()

    def set_player_spectator(self, game_uuid: str, player_uuid: str, is_spectator: bool):
        pass

    def pick_card(self, game_uuid: str, player_uuid: str, pick: int):
        pass

    def reveal_cards(self, game_uuid: str):
        pass

    def end_turn(self, game_uuid: str):
        pass
    