import { Board } from "./board";

export interface GameState {
  turnIndex: number;
  board: Board;
  availableAction: number[];
  oppPreviousAction: number;
}
