from gamestate.illegal_operation_error import IllegalOperationError


class Player:
    """Class representing a player"""
    def __init__(self, name: str, spectator: bool):
        self.name = name
        self.__hand = None
        self.spectator = spectator

    def set_hand(self, hand: int):
        if self.spectator is True:
            raise IllegalOperationError('Spectator cannot play')
        self.__hand = hand

    def get_hand(self) -> int:
        return self.__hand

    def clear_hand(self):
        self.__hand = None

    def has_picked_card(self) -> bool:
        return self.__hand is not None
