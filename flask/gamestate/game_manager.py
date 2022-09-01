import uuid
from typing import Optional

from peewee import DoesNotExist

from gamestate.deck import Deck
from gamestate.game import Game
from gamestate.illegal_operation_error import IllegalOperationError
from gamestate.models import StoredGame
from gamestate.player import Player


class GameManager:
    """Class that manages games"""
    def __init__(self):
        self.games = {}

    def create(self, name: str) -> str:
        game_uuid = str(uuid.uuid4())
        StoredGame.create(uuid=game_uuid, name=name, deck='FIBONACCI')
        self.games[game_uuid] = Game(name)
        return game_uuid

    def get(self, game_uuid: str) -> Game:
        game = self.games.get(game_uuid)
        if game is None:
            try:
                stored_game = StoredGame.get(StoredGame.uuid == game_uuid)
                game = Game(stored_game.name, Deck[stored_game.deck])
                self.games[game_uuid] = game
            except DoesNotExist:
                raise IllegalOperationError(f'Game {game_uuid} does not exist')
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
        game.set_deck(deck)
        StoredGame.update(deck=deck_name).where(StoredGame.uuid == uuid.UUID(game_uuid)).execute()
        return game.info()

    def join_game(self, game_uuid: str, player_id: str, player_name: str, is_spectator: bool):
        game = self.__get_game_or_raise(game_uuid)
        player = Player(player_name, is_spectator)
        game.player_joins(player_id, player)
        return game.state()

    def leave_game(self, game_uuid: str, player_uuid: str):
        game = self.__get_game_or_raise(game_uuid)
        game.player_leaves(player_uuid)
        if game.is_game_empty():
            self.games.pop(game_uuid)
        return game.state()

    def rename_game(self, game_uuid: str, game_name: str):
        game = self.__get_game_or_raise(game_uuid)
        game.name = game_name
        StoredGame.update(name=game_name).where(StoredGame.uuid == uuid.UUID(game_uuid)).execute()
        return game.info()

    def set_player_name(self, game_uuid: str, player_uuid: str, player_name: str):
        game = self.__get_game_or_raise(game_uuid)
        player = game.get_player(player_uuid)
        player.name = player_name
        return game.state()

    def set_player_spectator(self, game_uuid: str, player_uuid: str, is_spectator: bool):
        game = self.__get_game_or_raise(game_uuid)
        player = game.get_player(player_uuid)
        player.spectator = is_spectator
        player.clear_hand()
        return game.state()

    def pick_card(self, game_uuid: str, player_uuid: str, pick: Optional[int]):
        game = self.__get_game_or_raise(game_uuid)
        player = game.get_player(player_uuid)
        player.set_hand(pick)
        return game.state()

    def reveal_cards(self, game_uuid: str):
        game = self.__get_game_or_raise(game_uuid)
        return game.reveal_hands()

    def end_turn(self, game_uuid: str):
        game = self.__get_game_or_raise(game_uuid)
        game.end_turn()
        return game.state()
    