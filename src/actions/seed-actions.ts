import { SeedAction } from "../action/seed/seed-action";
import { Actions } from "./actions";

export class SeedActions implements Actions {
  private _actions: SeedAction[];

  constructor(actions: SeedAction[]) {
    this._actions = actions;
  }

  getBestAction(day: number): String {
    if (this._actions.length === 0) {
      return "";
    }

    const bestAction = this._actions.reduce(
      (bestAction, action) =>
        action.score > bestAction.score ? action : bestAction,
      this._actions[0]
    );

    return bestAction.score === 0 ? "" : bestAction.getStringAction();
  }

  public get actions(): SeedAction[] {
    return this._actions;
  }
}
