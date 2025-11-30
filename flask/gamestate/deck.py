from enum import Enum


class Deck(Enum):
    """List of the decks of cards available"""
    FIBONACCI = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, -1, -2]
    MODIFIED_FIBONACCI = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100, -1, -2]
    POWERS = [0, 1, 2, 4, 8, 16, 32, 64, -1, -2]
    TRUST_VOTE = [0, 1, 2, 3, 4, 5, -1, -2]
    T_SHIRTS = [1, 2, 3, 4, 5, 6, 7, -1, -2]  # Each value maps to a t-shirt size from XXS to XXL