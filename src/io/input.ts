import { Cell } from "./cell";
import { Tree } from "./tree";
import { Trees } from "./trees";

export interface Map {
  [index: number]: Cell;
}

// export interface Cell {
//   index: number;
//   richness: number;
//   neighborIndexes: number[];
// }

export interface GameState {
  day: number;
  nutrients: number;
  sun: number;
  score: number;
  opponentSun: number;
  opponentScore: number;
  opponentIsWaiting: boolean;
  trees: Trees;
  possibleMoves: string[];
}

// export interface Tree {
//   cellIndex: number;
//   cell: Cell;
//   size: number;
//   isMine: boolean;
//   isDormant: boolean;
// }
