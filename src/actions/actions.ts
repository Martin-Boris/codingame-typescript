import { Action } from "../action/action";
import { GameState, Map } from "../io/input";
import { Trees } from "../io/trees";

export class Actions {
  actions: Action[];

  constructor(actions: Action[]) {
    this.actions = actions;
  }

  public bestAction(gameState: GameState, map: Map): String {
    if (this.actions.length === 0) {
      return "";
    }
    const shadows = gameState.trees.computeConsecutiveShadow(
      gameState.day + 1,
      map
    );

    // this.actions.forEach((action) => {
    //   console.error({
    //     score: action.computeScore(shadows, gameState, map),
    //     action: action.toString(),
    //   });
    // });
    const score: { score: number; action: Action }[] = this.actions.map(
      (action) => {
        return {
          score: action.computeScore(shadows, gameState, map),
          action,
        };
      }
    );

    const actionToReturn = score.reduce(
      (previousAction, actionWithScore) =>
        previousAction.score < actionWithScore.score
          ? actionWithScore
          : previousAction,
      score[0]
    );

    return actionToReturn.score === 0 ? "" : actionToReturn.action.toString();
  }
}
