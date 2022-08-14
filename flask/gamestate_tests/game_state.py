import unittest

from gamestate.game_state import GameState
from gamestate.player import Player


class GameStateTestCase(unittest.TestCase):
    def test_empty_state(self):
        game_state = GameState()
        self.assertEqual(game_state.state, {})

    def test_add_player(self):
        uuid = '47b71b00-e060-47ba-8fae-029f5473794b'
        game_state = GameState()
        player = Player('Peter', True)
        game_state.player_joins(uuid, player)
        self.assertTrue(uuid in game_state.state)
        self.assertEqual(game_state.state[uuid], player)

    def test_remove_player(self):
        uuid = '47b71b00-e060-47ba-8fae-029f5473794b'
        game_state = GameState()
        player = Player('Peter', True)
        game_state.player_joins(uuid, player)
        game_state.player_leaves(uuid)
        self.assertTrue(uuid not in game_state.state)

    def test_is_game_empty(self):
        uuid = '47b71b00-e060-47ba-8fae-029f5473794b'
        game_state = GameState()
        self.assertTrue(game_state.is_game_empty())
        player = Player('Peter', True)
        game_state.player_joins(uuid, player)
        self.assertFalse(game_state.is_game_empty())
        game_state.player_leaves(uuid)
        self.assertTrue(game_state.is_game_empty())

    def test_get_non_spectator_players(self):
        game_state = GameState()
        player_1 = Player('John', False)
        player_2 = Player('Peter', False)
        spectator_1 = Player('Daisy', True)
        game_state.state = {
            'j': player_1,
            'p': player_2,
            'd': spectator_1
        }
        self.assertEqual(game_state.get_non_spectator_players(), [player_1, player_2])

    def test_all_players_have_picked_card(self):
        game_state = GameState()
        player_1 = Player('John', False)
        player_2 = Player('Peter', False)
        spectator_1 = Player('Daisy', True)
        game_state.state = {
            'j': player_1,
            'p': player_2,
            'd': spectator_1
        }
        self.assertFalse(game_state.has_all_players_picked_card())
        player_1.set_hand(8)
        self.assertFalse(game_state.has_all_players_picked_card())
        player_2.set_hand(13)
        self.assertTrue(game_state.has_all_players_picked_card())


if __name__ == '__main__':
    unittest.main()
