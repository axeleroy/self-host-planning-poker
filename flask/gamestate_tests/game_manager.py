import unittest
import uuid
from unittest.mock import Mock

from gamestate.deck import Deck
from gamestate.game_manager import GameManager
from gamestate.illegal_operation_error import IllegalOperationError


class GameManagerTestCase(unittest.TestCase):
    def test_create(self):
        gm = GameManager()
        name = 'PBR Team Pizza'
        game_id = gm.create(name)
        self.assertIsNotNone(game_id)
        # should not raise an exception because the UUID is invalid
        self.assertIsNotNone(uuid.UUID(game_id))
        self.assertTrue(game_id in gm.games.keys())
        game = gm.games.get(game_id)
        self.assertEqual(game.name, name)

    def test_get(self):
        gm = GameManager()
        game_mock1 = Mock()
        game_mock2 = Mock()
        gm.games = {'uuid1': game_mock1, 'uuid2': game_mock2}
        self.assertEqual(gm.get('uuid1'), game_mock1)
        self.assertEqual(gm.get('uuid2'), game_mock2)
        new_game = gm.get('uuid3')
        self.assertTrue('uuid3' in gm.games.keys())
        self.assertEqual(new_game.name, 'random')

    def test_set_deck(self):
        gm = GameManager()
        game_mock = Mock(**{'state.return_value': "{'foo': 'bar'}"})
        gm.games = {'uuid1': game_mock}

        with self.assertRaises(IllegalOperationError) as ex1:
            gm.set_deck('uuid1', 'holdem')
        self.assertEqual(str(ex1.exception), 'Deck holdem does not exist')
        with self.assertRaises(IllegalOperationError) as ex2:
            gm.set_deck('uuid2', 'POWERS')
        self.assertEqual(str(ex2.exception), 'Game uuid2 is not ongoing')

        state = gm.set_deck('uuid1', 'POWERS')
        game_mock.set_deck.assert_called_with(Deck.POWERS)
        self.assertEqual(state, "{'foo': 'bar'}")

    def test_join_game(self):
        gm = GameManager()
        game_mock = Mock(**{'state.return_value': "{'foo': 'bar'}"})
        gm.games = {'uuid1': game_mock}

        player_uuid = 'p1'
        player_name = 'Peter'
        is_spectator = True

        state = gm.join_game('uuid1', player_uuid, player_name, is_spectator)
        game_mock.player_joins.assert_called()
        args = game_mock.player_joins.call_args.args
        self.assertEqual(args[0], player_uuid)
        player = args[1]
        self.assertEqual(player.name, player_name)
        self.assertEqual(player.spectator, is_spectator)
        self.assertEqual(state, "{'foo': 'bar'}")

        with self.assertRaises(IllegalOperationError) as ex:
            gm.join_game('uuid2', player_uuid, player_name, is_spectator)
        self.assertEqual(str(ex.exception), 'Game uuid2 is not ongoing')

    def test_leave_game(self):
        gm = GameManager()
        game_mock1 = Mock(**{'is_game_empty.return_value': False, 'state.return_value': "{'foo': 'bar'}"})
        game_mock2 = Mock(**{'is_game_empty.return_value': True, 'state.return_value': "{'bar': 'bang'}"})
        gm.games = {'uuid1': game_mock1, 'uuid2': game_mock2}

        state1 = gm.leave_game('uuid1', 'p1')
        game_mock1.player_leaves.assert_called_with('p1')
        self.assertEqual(state1, "{'foo': 'bar'}")

        state2 = gm.leave_game('uuid2', 'p2')
        game_mock2.player_leaves.assert_called_with('p2')
        self.assertFalse('uuid2' in gm.games.keys())
        self.assertEqual(state2, "{'bar': 'bang'}")

        with self.assertRaises(IllegalOperationError) as ex:
            gm.leave_game('uuid3', 'p3')
        self.assertEqual(str(ex.exception), 'Game uuid3 is not ongoing')

    def test_set_player_name(self):
        pass


if __name__ == '__main__':
    unittest.main()
