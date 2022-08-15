import unittest

from gamestate.illegal_operation_error import IllegalOperationError
from gamestate.player import Player


class PlayerTestCase(unittest.TestCase):
    def test_new_player_should_have_empty_hand(self):
        name = "John"
        player = Player(name, True)
        self.assertEqual(player.name, name)
        self.assertTrue(player.spectator)
        self.assertEqual(player.get_hand(), None)

    def test_set_player_hand(self):
        player = Player("John", False)
        player.set_hand(3)
        self.assertEqual(player.get_hand(), 3)

    def test_clear_player_hand(self):
        player = Player("John", False)
        player.set_hand(3)
        self.assertEqual(player.get_hand(), 3)
        player.clear_hand()
        self.assertEqual(player.get_hand(), None)

    def test_has_picked_hand(self):
        player = Player("John", False)
        self.assertFalse(player.has_picked_card())
        player.set_hand(3)
        self.assertTrue(player.has_picked_card())
        player.clear_hand()
        self.assertFalse(player.has_picked_card())

    def test_spectator_cannot_set_hand(self):
        player = Player("John", True)
        with self.assertRaises(IllegalOperationError):
            player.set_hand(5)

    def test_state(self):
        name1 = "John"
        player1 = Player(name1, False)
        self.assertEqual(player1.state(), {'name': name1, 'spectator': False, 'hasPicked': False})
        player1.set_hand(3)
        self.assertEqual(player1.state(), {'name': name1, 'spectator': False, 'hasPicked': True})
        name2 = "Peter"
        player2 = Player(name2, True)
        self.assertEqual(player2.state(), {'name': name2, 'spectator': True, 'hasPicked': False})

    def test_state_with_hand(self):
        name1 = "John"
        player1 = Player(name1, False)
        self.assertEqual(player1.state_with_hand(), {'name': name1, 'spectator': False, 'hand': None})
        player1.set_hand(3)
        self.assertEqual(player1.state_with_hand(), {'name': name1, 'spectator': False, 'hand': 3})
        name2 = "Peter"
        player2 = Player(name2, True)
        self.assertEqual(player2.state_with_hand(), {'name': name2, 'spectator': True, 'hand': None})


if __name__ == '__main__':
    unittest.main()
