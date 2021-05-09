import { SeedAction } from "../action/seed/seed-action";
import { Actions } from "./actions";
import { SEED_TRESHOLD_DAY } from "../constante/treshold";
import { Tree } from "../io/input";
import { SEED_SIZE_TIER } from "../constante/game-constante";

export class SeedActions implements Actions {
  private _actions: SeedAction[];
  private _trees: Tree[];

  constructor(actions: SeedAction[], trees: Tree[]) {
    this._actions = actions;
    this._trees = trees;
  }

  getBestAction(day: number): String {
    if (
      this._actions.length === 0 ||
      this.isAlreadyASeed() ||
      day > SEED_TRESHOLD_DAY
    ) {
      return "";
    }

    const score = this._actions.reduce(
      (bestScore, action) =>
        action.score > bestScore ? action.score : bestScore,
      this._actions[0].score
    );

    if (score === 0) {
      return "";
    }

    const actionsWithBestScore = this._actions.filter(
      (action) => action.score === score
    );

    return actionsWithBestScore
      .reduce(
        (bestAction, action) =>
          action.cellTo.richness > bestAction.cellTo.richness
            ? action
            : bestAction,
        actionsWithBestScore[0]
      )
      .getStringAction();
  }

  public get actions(): SeedAction[] {
    return this._actions;
  }

  private isAlreadyASeed(): boolean {
    return this._trees.some(
      (tree) => tree.size === SEED_SIZE_TIER && tree.isMine
    );
  }
}
