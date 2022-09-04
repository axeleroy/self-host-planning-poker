from gamestate.exceptions.planning_poker_exception import PlanningPokerException


class GameDoesNotExistError(PlanningPokerException):
    code = 404
