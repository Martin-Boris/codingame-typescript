import { ActionController } from "./action/action-controller";
import { AIEngine as AIEngine } from "./ai-engine";
import { parseGameState, parseMap } from "./io/parser";

const map = parseMap();

while (true) {
  const gameState = parseGameState(map);

  // Debug code
  console.error(gameState.possibleMoves);

  // Possible actions: GROW cellIdx | SEED sourceIdx targetIdx | COMPLETE cellIdx | WAIT <message>)
  // console.log('WAIT');

  const actionController = new ActionController(
    gameState.possibleMoves,
    map,
    gameState.trees
  );

  const aiEngine = new AIEngine(map);
  console.log(aiEngine.computeNextMove(gameState, actionController));
}
