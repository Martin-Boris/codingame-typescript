import { Action } from "../action/action";
import { SeedAction } from "../action/seed-action";
import { Map } from "../io/input";
import { Trees } from "../io/trees";
import { Actions } from "./actions";

export class SeedActions implements Actions {
  actions: Action[];

  constructor(actions: SeedAction[]) {
    this.actions = actions;
  }

  highScoreAction(trees: Trees, map: Map, day: number): Action {
    const shadows = trees.computeConsecutiveShadow(day + 2, map);
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
