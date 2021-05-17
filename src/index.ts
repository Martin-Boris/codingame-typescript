import { initActions } from "./actions-factory";
import { Cell } from "./io/cell";
import { parseGameState, parseMap } from "./io/parser";

const map = parseMap();
let lastDayComplete = undefined;

while (true) {
  const gameState = parseGameState(map, lastDayComplete);

  // Debug code
  // console.error(gameState.possibleMoves);

  // Possible actions: GROW cellIdx | SEED sourceIdx targetIdx | COMPLETE cellIdx | WAIT <message>)
  // console.log('WAIT');
  //console.log(gameState.possibleMoves[0]);
  const actions = initActions(gameState, map);
  const bestCompleteAction = actions.completeActions.bestAction(gameState, map);
  const bestGrowAction = actions.growActions.bestAction(gameState, map);
  const bestSeedAction = actions.seedActions.bestAction(gameState, map);
  if (bestCompleteAction) {
    lastDayComplete = gameState.day;
    console.log(bestCompleteAction);
  } else if (bestSeedAction) {
    console.log(bestSeedAction);
  } else if (bestGrowAction) {
    console.log(bestGrowAction);
  } else {
    console.log("WAIT");
  }
}
