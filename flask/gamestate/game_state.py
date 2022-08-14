from gamestate.player import Player


class GameState:
    """Class representing the state of a game of Planning Poker"""
    def __init__(self):
        self.state = {}

    def player_joins(self, uuid: str, player: Player):
        self.state[uuid] = player

    def player_leaves(self, uuid: str):
        self.state.pop(uuid)

    def is_game_empty(self) -> bool:
        return len(self.state) == 0

    def has_all_players_picked_card(self) -> bool:
        non_spectators = self.get_non_spectator_players()
        players_that_played_count = sum(1 for p in non_spectators if p.has_picked_card())
        return players_that_played_count == len(non_spectators)

    def get_non_spectator_players(self) -> [Player]:
        return list(filter(lambda p: p.spectator is False, self.state.values()))
