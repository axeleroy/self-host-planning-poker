import unittest
import uuid
from unittest.mock import Mock

from peewee import SqliteDatabase

from gamestate.deck import Deck
from gamestate.game_manager import GameManager
from gamestate.illegal_operation_error import IllegalOperationError
from gamestate.models import StoredGame, database_proxy


class GameManagerTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        test_db = SqliteDatabase(':memory:')
        database_proxy.initialize(test_db)
        if database_proxy.is_closed():
            database_proxy.connect()
        StoredGame.create_table()

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
        # should have an entry in db
        stored_game = StoredGame.get(StoredGame.uuid == game_id)
        self.assertEqual(stored_game.uuid, uuid.UUID(game_id))
        self.assertEqual(stored_game.name, name)
        self.assertEqual(stored_game.deck, 'FIBONACCI')

    def test_get_from_memory(self):
        gm = GameManager()
        game_mock1 = Mock()
        game_mock2 = Mock()
        gm.games = {'uuid1': game_mock1, 'uuid2': game_mock2}
        self.assertEqual(gm.get('uuid1'), game_mock1)
        self.assertEqual(gm.get('uuid2'), game_mock2)

    def test_get_from_db(self):
        game_id = '8b70cb3d-00ba-4fcc-aaac-60f699d4170f'
        name = 'PBR Pizza'
        deck = 'POWERS'
        StoredGame.create(uuid=game_id, name=name, deck=deck)
        gm = GameManager()
        game = gm.get(game_id)
        self.assertEqual(game.name, name)
        self.assertEqual(game.get_deck(), Deck[deck])

        game_id2 = 'd8b85f28-72fc-49fb-85ab-d669cfd57a5c'
        with self.assertRaises(IllegalOperationError) as ex:
            gm.get(game_id2)
        self.assertEqual(str(ex.exception), f'Game {game_id2} does not exist')

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
        game_mock.state.assert_called()
        self.assertEqual(state, "{'foo': 'bar'}")

    def test_join_game(self):
        gm = GameManager()
        game_mock = Mock(**{'state.return_value': "{'foo': 'bar'}"})
        gm.games = {'uuid1': game_mock}

        player_name = 'Peter'
        player_id = 'p1'
        is_spectator = True

        state = gm.join_game('uuid1', player_id, player_name, is_spectator)
        game_mock.player_joins.assert_called()
        args = game_mock.player_joins.call_args.args
        self.assertEqual(args[0], player_id)
        player = args[1]
        self.assertEqual(player.name, player_name)
        self.assertEqual(player.spectator, is_spectator)
        game_mock.state.assert_called()
        self.assertEqual(state, "{'foo': 'bar'}")

        with self.assertRaises(IllegalOperationError) as ex:
            gm.join_game('uuid2', 'p2', player_name, is_spectator)
        self.assertEqual(str(ex.exception), 'Game uuid2 is not ongoing')

    def test_leave_game(self):
        gm = GameManager()
        game_mock1 = Mock(**{'is_game_empty.return_value': False, 'state.return_value': "{'foo': 'bar'}"})
        game_mock2 = Mock(**{'is_game_empty.return_value': True, 'state.return_value': "{'bar': 'bang'}"})
        gm.games = {'uuid1': game_mock1, 'uuid2': game_mock2}

        state1 = gm.leave_game('uuid1', 'p1')
        game_mock1.player_leaves.assert_called_with('p1')
        game_mock1.state.assert_called()
        self.assertEqual(state1, "{'foo': 'bar'}")

        state2 = gm.leave_game('uuid2', 'p2')
        game_mock2.player_leaves.assert_called_with('p2')
        self.assertFalse('uuid2' in gm.games.keys())
        game_mock2.state.assert_called()
        self.assertEqual(state2, "{'bar': 'bang'}")

        with self.assertRaises(IllegalOperationError) as ex:
            gm.leave_game('uuid3', 'p3')
        self.assertEqual(str(ex.exception), 'Game uuid3 is not ongoing')

    def test_set_player_name(self):
        gm = GameManager()
        player_mock = Mock()
        game_mock = Mock(**{'get_player.return_value': player_mock, 'state.return_value': "{'foo': 'bar'}"})
        gm.games = {'uuid1': game_mock}
        new_player_name = 'John'

        state = gm.set_player_name('uuid1', 'puuid1', new_player_name)
        game_mock.get_player.assert_called_with('puuid1')
        self.assertEqual(player_mock.name, new_player_name)
        game_mock.state.assert_called()
        self.assertEqual(state, "{'foo': 'bar'}")

        with self.assertRaises(IllegalOperationError) as ex:
            gm.leave_game('uuid2', 'p3')
        self.assertEqual(str(ex.exception), 'Game uuid2 is not ongoing')

    def test_set_player_spectator(self):
        gm = GameManager()
        player_mock = Mock()
        game_mock = Mock(**{'get_player.return_value': player_mock, 'state.return_value': "{'foo': 'bar'}"})
        gm.games = {'uuid1': game_mock}

        state = gm.set_player_spectator('uuid1', "puuid1", True)
        game_mock.get_player.assert_called_with('puuid1')
        self.assertEqual(player_mock.spectator, True)
        player_mock.clear_hand.assert_called()
        game_mock.state.assert_called()
        self.assertEqual(state, "{'foo': 'bar'}")

        with self.assertRaises(IllegalOperationError) as ex:
            gm.set_player_spectator('uuid2', 'p3', True)
        self.assertEqual(str(ex.exception), 'Game uuid2 is not ongoing')

    def test_pick_card(self):
        gm = GameManager()
        player_mock = Mock()
        game_mock = Mock(**{'get_player.return_value': player_mock, 'state.return_value': "{'foo': 'bar'}"})
        gm.games = {'uuid1': game_mock}

        state = gm.pick_card('uuid1', "puuid1", 3)
        game_mock.get_player.assert_called_with('puuid1')
        player_mock.set_hand.assert_called_with(3)
        game_mock.state.assert_called()
        self.assertEqual(state, "{'foo': 'bar'}")

        with self.assertRaises(IllegalOperationError) as ex:
            gm.pick_card('uuid2', 'p3', True)
        self.assertEqual(str(ex.exception), 'Game uuid2 is not ongoing')

    def test_reveal_cards(self):
        gm = GameManager()
        game_mock = Mock(**{'reveal_hands.return_value': "{'foo': 'bar'}"})
        gm.games = {'uuid1': game_mock}

        hands = gm.reveal_cards("uuid1")
        game_mock.reveal_hands.assert_called()
        self.assertEqual(hands, "{'foo': 'bar'}")
        with self.assertRaises(IllegalOperationError) as ex:
            gm.reveal_cards('uuid2')
        self.assertEqual(str(ex.exception), 'Game uuid2 is not ongoing')

    def test_end_turn(self):
        gm = GameManager()
        game_mock = Mock(**{'state.return_value': "{'foo': 'bar'}"})
        gm.games = {'uuid1': game_mock}

        state = gm.end_turn("uuid1")
        game_mock.end_turn.assert_called()
        game_mock.state.assert_called()
        self.assertEqual(state, "{'foo': 'bar'}")
        with self.assertRaises(IllegalOperationError) as ex:
            gm.end_turn('uuid2')
        self.assertEqual(str(ex.exception), 'Game uuid2 is not ongoing')


if __name__ == '__main__':
    unittest.main()
