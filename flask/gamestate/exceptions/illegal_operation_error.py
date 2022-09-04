from gamestate.exceptions.planning_poker_exception import PlanningPokerException


class IllegalOperationError(PlanningPokerException):
    code = 401
