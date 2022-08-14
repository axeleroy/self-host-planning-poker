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
        name = "John"
        player = Player(name, False)
        player.set_hand(3)
        self.assertEqual(player.get_hand(), 3)

    def test_clear_player_hand(self):
        name = "John"
        player = Player(name, False)
        player.set_hand(3)
        self.assertEqual(player.get_hand(), 3)
        player.clear_hand()
        self.assertEqual(player.get_hand(), None)

    def test_has_picked_hand(self):
        name = "John"
        player = Player(name, False)
        self.assertFalse(player.has_picked_card())
        player.set_hand(3)
        self.assertTrue(player.has_picked_card())
        player.clear_hand()
        self.assertFalse(player.has_picked_card())

    def test_spectator_cannot_set_hand(self):
        name = "John"
        player = Player(name, True)
        with self.assertRaises(IllegalOperationError):
            player.set_hand(5)


if __name__ == '__main__':
    unittest.main()
