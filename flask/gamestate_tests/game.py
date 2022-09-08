import unittest
from unittest.mock import Mock

from gamestate.deck import Deck
from gamestate.exceptions import PlayerNotInGameError, InvalidCardValueError
from gamestate.game import Game


class GameTestCase(unittest.TestCase):
    def test_empty_state(self):
        game = Game('PBR Team Pizza')
        self.assertEqual(game.list_players_uuid(), [])
        self.assertEqual(game.get_deck(), Deck.FIBONACCI)
        self.assertEqual(game.name, 'PBR Team Pizza')
        game2 = Game('PBR Team Pasta', Deck.T_SHIRTS)
        self.assertEqual(game2.get_deck(), Deck.T_SHIRTS)
        self.assertEqual(game2.name, 'PBR Team Pasta')

    def test_set_name(self):
        game = Game('PBR Team Pizza')
        game.name = 'PBR Team Pasta'
        self.assertEqual(game.name, 'PBR Team Pasta')

    def test_set_deck(self):
        game = Game('PBR Team Pizza')
        game.set_deck(Deck.POWERS)
        self.assertEqual(game.get_deck(), Deck.POWERS)

    def test_add_player(self):
        uuid = '47b71b00-e060-47ba-8fae-029f5473794b'
        game = Game('PBR Team Pizza')
        player = Mock()
        game.player_joins(uuid, player)
        self.assertTrue(uuid in game.list_players_uuid())

    def test_remove_player(self):
        uuid = '47b71b00-e060-47ba-8fae-029f5473794b'
        game = Game('PBR Team Pizza')
        player = Mock()
        game.player_joins(uuid, player)
        self.assertTrue(uuid in game.list_players_uuid())
        game.player_leaves(uuid)
        self.assertTrue(uuid not in game.list_players_uuid())

    def test_list_players(self):
        game = Game('PBR Team Pizza')
        uuid1 = '2c6f0ffa-ad57-47b7-bb34-2275d05018cf'
        player1 = Mock()
        game.player_joins(uuid1, player1)
        uuid2 = '1499d88f-7841-47f1-a734-10a638bd4884'
        player2 = Mock()
        game.player_joins(uuid2, player2)
        self.assertEqual(game.list_players(), [(uuid1, player1), (uuid2, player2)])

    def test_list_players_uuid(self):
        game = Game('PBR Team Pizza')
        uuid1 = '2c6f0ffa-ad57-47b7-bb34-2275d05018cf'
        player1 = Mock()
        game.player_joins(uuid1, player1)
        uuid2 = '1499d88f-7841-47f1-a734-10a638bd4884'
        player2 = Mock()
        game.player_joins(uuid2, player2)
        self.assertEqual(game.list_players_uuid(), [uuid1, uuid2])

    def test_get_player(self):
        game = Game('PBR Team Pizza')
        uuid1 = '2c6f0ffa-ad57-47b7-bb34-2275d05018cf'
        player1 = Mock()
        game.player_joins(uuid1, player1)
        self.assertEqual(game.get_player(uuid1), player1)

        uuid2 = '0f6b59d5-6765-4be1-b196-760c654729a6'
        with self.assertRaises(PlayerNotInGameError) as ex:
            game.get_player(uuid2)
        self.assertEqual(str(ex.exception), f'Player with UUID {uuid2} is not in this game')

    def test_player_picks(self):
        game = Game('PBR Team Pizza', Deck.POWERS)
        uuid1 = '2c6f0ffa-ad57-47b7-bb34-2275d05018cf'
        uuid2 = '0f6b59d5-6765-4be1-b196-760c654729a6'
        player_mock = Mock()
        game.player_joins(uuid1, player_mock)
        game.player_picks(uuid1, 8)
        player_mock.set_hand.assert_called_with(8)

        with self.assertRaises(PlayerNotInGameError) as ex1:
            game.player_picks(uuid2, 8)
        self.assertEqual(str(ex1.exception), f'Player with UUID {uuid2} is not in this game')

        with self.assertRaises(InvalidCardValueError) as ex2:
            game.player_picks(uuid1, 13)
        self.assertEqual(str(ex2.exception), 'Card value 13 is not valid. Current deck is POWERS')

    def test_end_turn(self):
        game = Game('PBR Team Pizza')
        player_1 = Mock()
        game.player_joins('j', player_1)
        player_2 = Mock()
        game.player_joins('p', player_2)
        spectator_1 = Mock()
        game.player_joins('d', spectator_1)
        game.end_turn()
        player_1.clear_hand.assert_called()
        player_2.clear_hand.assert_called()
        spectator_1.clear_hand.assert_called()

    def test_setting_deck_should_clear_hands(self):
        game = Game('PBR Team Pizza')
        player_1 = Mock()
        game.player_joins('j', player_1)
        player_2 = Mock()
        game.player_joins('p', player_2)
        spectator_1 = Mock()
        game.player_joins('d', spectator_1)
        game.set_deck(Deck.POWERS)
        player_1.clear_hand.assert_called()
        player_2.clear_hand.assert_called()
        spectator_1.clear_hand.assert_called()

    def test_setting_deck_should_not_clear_hands_when_deck_is_the_same(self):
        game = Game('PBR Team Pizza', Deck.POWERS)
        player_1 = Mock()
        game.player_joins('j', player_1)
        player_2 = Mock()
        game.player_joins('p', player_2)
        spectator_1 = Mock()
        game.player_joins('d', spectator_1)
        game.set_deck(Deck.POWERS)
        player_1.clear_hand.assert_not_called()
        player_2.clear_hand.assert_not_called()
        spectator_1.clear_hand.assert_not_called()

    def test_is_game_empty(self):
        uuid = '47b71b00-e060-47ba-8fae-029f5473794b'
        game = Game('PBR Team Pizza')
        self.assertTrue(game.is_game_empty())
        player = Mock()
        game.player_joins(uuid, player)
        self.assertFalse(game.is_game_empty())
        game.player_leaves(uuid)
        self.assertTrue(game.is_game_empty())

    def test_get_non_spectator_players(self):
        game = Game('PBR Team Pizza')
        player_1 = Mock()
        player1_conf = {'spectator': False}
        player_1.configure_mock(**player1_conf)
        game.player_joins('j', player_1)
        player_2 = Mock()
        player2_conf = {'spectator': False}
        player_2.configure_mock(**player2_conf)
        game.player_joins('p', player_2)
        spectator_1 = Mock()
        spectator_conf = {'spectator': True}
        spectator_1.configure_mock(**spectator_conf)
        game.player_joins('d', spectator_1)
        self.assertEqual(game.get_non_spectator_players(), [player_1, player_2])

    def test_all_players_have_picked_card(self):
        game = Game('PBR Team Pizza')
        player_1 = Mock()
        player1_conf = {'spectator': False, 'has_picked_card.return_value': True}
        player_1.configure_mock(**player1_conf)
        game.player_joins('j', player_1)

        player_2 = Mock()
        player2_conf = {'spectator': False, 'has_picked_card.return_value': False}
        player_2.configure_mock(**player2_conf)
        game.player_joins('p', player_2)

        spectator_1 = Mock()
        spectator_conf = {'spectator': True, 'has_picked_card.return_value': False}
        spectator_1.configure_mock(**spectator_conf)
        game.player_joins('d', spectator_1)
        self.assertFalse(game.has_all_players_picked_card())

        player2_conf['has_picked_card.return_value'] = True
        player_2.configure_mock(**player2_conf)
        self.assertTrue(game.has_all_players_picked_card())

    def test_state(self):
        game = Game('PBR Team Pizza')
        player_1 = Mock()
        player1_state = {'name': 'John', 'spectator': False, 'hasPicked': True}
        player_1.configure_mock(**{'state.return_value': player1_state})
        game.player_joins('j', player_1)
        player_2 = Mock()
        player2_state = {'name': 'Peter', 'spectator': False, 'hasPicked': False}
        player_2.configure_mock(**{'state.return_value': player2_state})
        game.player_joins('p', player_2)
        spectator_1 = Mock()
        spectator1_state = {'name': 'Daisy', 'spectator': True, 'hasPicked': False}
        spectator_1.configure_mock(**{'state.return_value': spectator1_state})
        game.player_joins('d', spectator_1)

        self.assertEqual(game.state(), {
            'j': player1_state,
            'p': player2_state,
            'd': spectator1_state,
        })

    def test_reveal_hand(self):
        game = Game('PBR Team Pizza')
        player_1 = Mock()
        player1_state = {'spectator': False, 'get_hand.return_value': 8}
        player_1.configure_mock(**player1_state)
        game.player_joins('j', player_1)
        player_2 = Mock()
        player2_state = {'spectator': False, 'get_hand.return_value': None}
        player_2.configure_mock(**player2_state)
        game.player_joins('p', player_2)
        spectator_1 = Mock()
        spectator1_state = {'spectator': True}
        spectator_1.configure_mock(**spectator1_state)
        game.player_joins('d', spectator_1)

        self.assertEqual(game.reveal_hands(), {
            'j': 8,
            'p': None,
        })
        spectator_1.get_hand.assert_not_called()

    def test_game_info(self):
        game_name1 = 'Fizz'
        game1 = Game(game_name1)
        self.assertEqual(game1.info(), {'name': game_name1, 'deck': 'FIBONACCI'})

        game_name2 = 'Buzz'
        game2 = Game(game_name2, Deck.POWERS)
        self.assertEqual(game2.info(), {'name': game_name2, 'deck': 'POWERS'})



if __name__ == '__main__':
    unittest.main()
