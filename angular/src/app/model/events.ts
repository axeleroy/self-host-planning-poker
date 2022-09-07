export interface GameInfo {
  name: string;
  deck: string;
  playerId?: string;
}

export interface Player {
  name: string;
  specatator: boolean;
}

export interface PlayerState extends Player {
  hasPicked: boolean;
}

export interface PlayerHand extends Player{
  hand?: number;
}

export type GameState = { [key: string]: PlayerState };
export type GameHands = { [key: string]: PlayerHand };

export interface ErrorMessage {
  error: true;
  message: string;
  code: number;
}
