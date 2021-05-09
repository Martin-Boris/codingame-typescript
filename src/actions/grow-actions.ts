import { GrowAction } from "../action/grow/grow-action";
import { Tree } from "../io/input";
import { Actions } from "./actions";

export class GrowActions implements Actions {
  private _actions: GrowAction[];
  private mineTrees: Tree[];

  constructor(actions: GrowAction[], mineTrees: Tree[]) {
    this._actions = actions;
    this.mineTrees = mineTrees;
  }

  getBestAction(): String {
    if (this._actions.length === 0) {
      return "";
    }
    let bestAction = this._actions.reduce(
      (hightScoreAction, action) =>
        action.score > hightScoreAction.score ? action : hightScoreAction,
      this._actions[0]
    );
    return bestAction.score === 0 ? "" : bestAction.getStringAction();
  }

  private getTierSizeToGrow(): number {
    return this._actions.reduce((sizeToGrow, growAction) => {
      return growAction.tree.size > sizeToGrow
        ? growAction.tree.size
        : sizeToGrow;
    }, 0);
  }

  public get actions(): GrowAction[] {
    return this._actions;
  }
}
