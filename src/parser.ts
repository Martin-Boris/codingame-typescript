import { Board } from "./input/board";
import { GameState } from "./input/game-state";

export function parseGameState(): GameState {
  const turnIndex = parseInt(readline()); // starts from 0; As the game progresses, first player gets [0,2,4,...] and second player gets [1,3,5,...]

  const boardString: string[] = [];
  for (let i = 0; i < 7; i++) {
    boardString.push(readline()); // one row of the board (from top to bottom)
  }
  const board = Board.fromStringRow(boardString);

  const numValidActions = parseInt(readline()); // number of unfilled columns in the board
  const availableAction: number[] = [];
  for (let i = 0; i < numValidActions; i++) {
    availableAction.push(parseInt(readline())); // a valid column index into which a chip can be dropped
  }
  const oppPreviousAction = parseInt(readline()); // opponent's previous chosen column index (will be -1 for first player in the first turn)

  return {
    turnIndex,
    board,
    availableAction,
    oppPreviousAction,
  };
}
