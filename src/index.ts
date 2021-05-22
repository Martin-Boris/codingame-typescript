import { Board } from "./input/board";
import { parseGameState } from "./parser";

var inputs = readline().split(" ");
const myId = parseInt(inputs[0]); // 0 or 1 (Player 0 plays first)
const oppId = parseInt(inputs[1]); // if your index is 0, this will be 1, and vice versa

// game loop
while (true) {
  const gameState = parseGameState();

  // Write an action using console.log()
  // To debug: console.error('Debug messages...');

  // Output a column index to drop the chip in. Append message to show in the viewer.
  console.error(gameState);
  console.log("0");
}
