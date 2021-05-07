import { ActionController } from "./controller/action-controller";
import { parseGameState, parseMap } from "./io/parser";
import actionFactory from "./actions/actions-factory";

const map = parseMap();

while (true) {
  const gameState = parseGameState(map);

  // Debug code
  console.error(gameState.possibleMoves);

  // Possible actions: GROW cellIdx | SEED sourceIdx targetIdx | COMPLETE cellIdx | WAIT <message>)
  // console.log('WAIT');

  const instanciateAction = actionFactory(
    gameState.possibleMoves,
    map,
    gameState.trees
  );

  const actionController = new ActionController(
    instanciateAction.seedActions,
    instanciateAction.growActions,
    instanciateAction.completeActions
  );

  console.log(actionController.selectBestMove(gameState.day));
}
