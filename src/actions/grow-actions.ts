import { GrowAction } from "../action/grow/grow-action";
import { Tree } from "../io/input";
import { Actions } from "./actions";

export class GrowActions implements Actions {
  private _actions: GrowAction[];

  constructor(actions: GrowAction[]) {
    this._actions = actions;
  }

  getBestAction(): String {
    if (this._actions.length === 0) {
      return "";
    }

    this._actions.forEach((action) => {
      console.error({ score: action.score, action: action.getStringAction() });
    });

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
