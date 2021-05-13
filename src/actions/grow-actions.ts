import { Action } from "../action/action";
import { GrowAction } from "../action/grow-action";
import { Map } from "../io/input";
import { Trees } from "../io/trees";
import { Actions } from "./actions";

export class GrowActions implements Actions {
  actions: Action[];

  constructor(actions: GrowAction[]) {
    this.actions = actions;
  }

  highScoreAction(trees: Trees, map: Map, day: number): Action {
    const shadows = trees.computeConsecutiveShadow(day + 1, map);
    const score: { score: number; action: Action }[] = this.actions.map(
      (action) => {
        return { score: action.computeScore(shadows, trees, map), action };
      }
    );

    const actionToReturn = score.reduce(
      (previousAction, actionWithScore) =>
        previousAction.score < actionWithScore.score
          ? actionWithScore
          : previousAction,
      score[0]
    );

    return actionToReturn.action;
  }
}
