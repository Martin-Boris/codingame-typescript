import { ActionController } from "./controller/action-controller";
import { SeedAction } from "./models/action/seed-action";
import { GameState, Map } from "./io/input";

export class AIEngine {
  private map: Map;

  constructor(map: Map) {
    this.map = map;
  }

  public computeNextMove(
    gameState: GameState,
    actionController: ActionController
  ): String {
    if (gameState.possibleMoves.length === 1) {
      return gameState.possibleMoves[0];
    }
    const activeActions = gameState.possibleMoves.filter(
      (move) => move != "WAIT"
    );
    if (SeedAction.isSEEDActionFromString(activeActions[0])) {
      return actionController.selectBestMove();
    }
    return activeActions[0];
  }
}
