import { Action } from "./io/action";
import { Actions } from "./io/actions";
import { GameState, Map } from "./io/input";

export class AIEngine {
  private map: Map;

  constructor(map: Map) {
    this.map = map;
  }

  public computeNextMove(gameState: GameState, map: Map): string {
    if (gameState.possibleMoves.length === 1) {
      return gameState.possibleMoves[0];
    }
    const activeActions = gameState.possibleMoves.filter(
      (move) => move != "WAIT"
    );
    if (Action.isSEEDActionFromString(activeActions[0])) {
      return new Actions(activeActions, map)
        .selectBestOption()
        .getStringAction();
    }
    return activeActions[0];
  }
}
