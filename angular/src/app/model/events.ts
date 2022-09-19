export interface GameInfo {
  name: string;
  deck: string;
  playerId?: string;
}

export interface Player {
  name: string;
  spectator: boolean;
}

export interface PlayerState extends Player {
  hasPicked: boolean;
}

export interface PlayerHand extends PlayerState {
  hand?: number;
}

export type GameState = Record<string, PlayerState>;
export type GameHands = Record<string, number>;

export interface ErrorMessage {
  error: true;
  message: string;
  code: number;
}
