from typing import Optional

from gamestate.exceptions import SpectatorCannotPlayError


class Player:
    """Class representing a player"""
    def __init__(self, name: str, spectator: bool):
        self.name = name
        self.__hand = None
        self.spectator = spectator

    def set_hand(self, hand: int):
        if self.spectator is True:
            raise SpectatorCannotPlayError('Spectator cannot play')
        self.__hand = hand

    def get_hand(self) -> Optional[int]:
        return self.__hand

    def clear_hand(self):
        self.__hand = None

    def has_picked_card(self) -> bool:
        return self.__hand is not None

    def state(self) -> dict:
        """Represents the player's state, with its hand hidden"""
        return {
            'name': self.name,
            'spectator': self.spectator,
            'hasPicked': self.has_picked_card()
        }

    def state_with_hand(self) -> dict:
        """Represents the player's state, with its hand shown"""
        return {
            'name': self.name,
            'spectator': self.spectator,
            'hand': self.__hand,
            'hasPicked': self.has_picked_card()
        }
