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

    const bestAction = this._actions.reduce(
      (bestAction, action) =>
        action.score > bestAction.score ? action : bestAction,
      this._actions[0]
    );
    return bestAction.score > 0 ? bestAction.getStringAction() : "";
  }

  public get actions(): SeedAction[] {
    return this._actions;
  }

  public get mineTree(): Tree[] {
    return this._trees;
  }

  private isAlreadyASeed(): boolean {
    return this._trees.some(
      (tree) => tree.size === SEED_SIZE_TIER && tree.isMine
    );
  }
}
