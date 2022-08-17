import unittest

from gamestate.deck import Deck
from gamestate.game import Game
from gamestate.illegal_operation_error import IllegalOperationError
from gamestate.player import Player


class GameTestCase(unittest.TestCase):
    def test_empty_state(self):
        game = Game()
        self.assertEqual(game.list_players_uuid(), [])
        self.assertEqual(game.deck, Deck.FIBONACCI)
        game2 = Game(Deck.T_SHIRTS)
        self.assertEqual(game2.deck, Deck.T_SHIRTS)

    def test_add_player(self):
        uuid = '47b71b00-e060-47ba-8fae-029f5473794b'
        game = Game()
        player = Player('Peter', True)
        game.player_joins(uuid, player)
        self.assertTrue(uuid in game.list_players_uuid())

    def test_remove_player(self):
        uuid = '47b71b00-e060-47ba-8fae-029f5473794b'
        game = Game()
        player = Player('Peter', True)
        game.player_joins(uuid, player)
        game.player_leaves(uuid)
        self.assertTrue(uuid not in game.list_players_uuid())

    def test_list_players(self):
        game = Game()
        uuid1 = '2c6f0ffa-ad57-47b7-bb34-2275d05018cf'
        player1 = Player('John', True)
        game.player_joins(uuid1, player1)
        uuid2 = '1499d88f-7841-47f1-a734-10a638bd4884'
        player2 = Player('Peter', False)
        game.player_joins(uuid2, player2)
        self.assertEqual(game.list_players(), [(uuid1, player1), (uuid2, player2)])

    def test_list_players_uuid(self):
        game = Game()
        uuid1 = '2c6f0ffa-ad57-47b7-bb34-2275d05018cf'
        player1 = Player('John', True)
        game.player_joins(uuid1, player1)
        uuid2 = '1499d88f-7841-47f1-a734-10a638bd4884'
        player2 = Player('Peter', False)
        game.player_joins(uuid2, player2)
        self.assertEqual(game.list_players_uuid(), [uuid1, uuid2])

    def test_get_player(self):
        game = Game()
        uuid1 = '2c6f0ffa-ad57-47b7-bb34-2275d05018cf'
        player1 = Player('John', True)
        game.player_joins(uuid1, player1)
        self.assertEqual(game.get_player(uuid1), player1)

        uuid2 = '0f6b59d5-6765-4be1-b196-760c654729a6'
        with self.assertRaises(IllegalOperationError) as ex:
            game.get_player(uuid2)
        self.assertEqual(str(ex.exception), f'Player with UUID {uuid2} is not in this game')

    def test_player_picks(self):
        game = Game(Deck.POWERS)
        uuid1 = '2c6f0ffa-ad57-47b7-bb34-2275d05018cf'
        uuid2 = '0f6b59d5-6765-4be1-b196-760c654729a6'
        player1 = Player('John', False)
        game.player_joins(uuid1, player1)
        game.player_picks(uuid1, 8)
        self.assertEqual(player1.get_hand(), 8)

        with self.assertRaises(IllegalOperationError) as ex1:
            game.player_picks(uuid2, 8)
        self.assertEqual(str(ex1.exception), f'Player with UUID {uuid2} is not in this game')
        with self.assertRaises(IllegalOperationError) as ex2:
            game.player_picks(uuid1, 13)
        self.assertEqual(str(ex2.exception), 'Card value 13 is not valid. Current deck is POWERS')

    def test_end_turn(self):
        game = Game()
        player_1 = Player('John', False)
        game.player_joins('j', player_1)
        player_2 = Player('Peter', False)
        game.player_joins('p', player_2)
        spectator_1 = Player('Daisy', True)
        game.player_joins('d', spectator_1)
        player_1.set_hand(8)
        player_2.set_hand(13)
        self.assertTrue(game.has_all_players_picked_card())
        game.end_turn()
        self.assertFalse(game.has_all_players_picked_card())
        self.assertEqual(player_1.get_hand(), None)
        self.assertEqual(player_2.get_hand(), None)

    def test_is_game_empty(self):
        uuid = '47b71b00-e060-47ba-8fae-029f5473794b'
        game = Game()
        self.assertTrue(game.is_game_empty())
        player = Player('Peter', True)
        game.player_joins(uuid, player)
        self.assertFalse(game.is_game_empty())
        game.player_leaves(uuid)
        self.assertTrue(game.is_game_empty())

    def test_get_non_spectator_players(self):
        game = Game()
        player_1 = Player('John', False)
        game.player_joins('j', player_1)
        player_2 = Player('Peter', False)
        game.player_joins('p', player_2)
        spectator_1 = Player('Daisy', True)
        game.player_joins('d', spectator_1)
        self.assertEqual(game.get_non_spectator_players(), [player_1, player_2])

    def test_all_players_have_picked_card(self):
        game = Game()
        player_1 = Player('John', False)
        game.player_joins('j', player_1)
        player_2 = Player('Peter', False)
        game.player_joins('p', player_2)
        spectator_1 = Player('Daisy', True)
        game.player_joins('d', spectator_1)
        self.assertFalse(game.has_all_players_picked_card())
        player_1.set_hand(8)
        self.assertFalse(game.has_all_players_picked_card())
        player_2.set_hand(13)
        self.assertTrue(game.has_all_players_picked_card())

    def test_state(self):
        game = Game()
        player_1 = Player('John', False)
        player_1.set_hand(8)
        game.player_joins('j', player_1)
        player_2 = Player('Peter', False)
        game.player_joins('p', player_2)
        spectator_1 = Player('Daisy', True)
        game.player_joins('d', spectator_1)

        self.assertEqual(game.state(), [
            ('j', {'name': 'John', 'spectator': False, 'hasPicked': True}),
            ('p', {'name': 'Peter', 'spectator': False, 'hasPicked': False}),
            ('d', {'name': 'Daisy', 'spectator': True, 'hasPicked': False}),
        ])

    def test_reveal_hand(self):
        game = Game()
        player_1 = Player('John', False)
        player_1.set_hand(8)
        game.player_joins('j', player_1)
        player_2 = Player('Peter', False)
        game.player_joins('p', player_2)
        spectator_1 = Player('Daisy', True)
        game.player_joins('d', spectator_1)

        self.assertEqual(game.reveal_hands(), [
            ('j', 8),
            ('p', None),
        ])


if __name__ == '__main__':
    unittest.main()
