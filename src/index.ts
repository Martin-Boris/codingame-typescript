import { initActions } from "./actions-factory";
import { Cell } from "./io/cell";
import { parseGameState, parseMap } from "./io/parser";

const map = parseMap();

while (true) {
  const gameState = parseGameState(map);

  // Debug code
  // console.error(gameState.possibleMoves);

  // Possible actions: GROW cellIdx | SEED sourceIdx targetIdx | COMPLETE cellIdx | WAIT <message>)
  // console.log('WAIT');
  //console.log(gameState.possibleMoves[0]);
  const actions = initActions();
  const bestCompleteAction = actions.completeActions.highScoreAction();
  const bestGrowAction = actions.growActions.highScoreAction();
  const bestSeedAction = actions.seedActions.highScoreAction();
  if (bestCompleteAction) {
    console.log(bestCompleteAction.toString());
  }
  if (bestSeedAction) {
    console.log(bestSeedAction.toString());
  }
  if (bestGrowAction) {
    console.log(bestGrowAction.toString());
  }
  console.log("WAIT");
}
