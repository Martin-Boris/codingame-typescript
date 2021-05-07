import { Action } from "../action/action";
import { SeedAction } from "../action/seed-action";
import { Actions } from "./actions";

export class SeedActions implements Actions {
  private _actions: SeedAction[];

  constructor(actions: SeedAction[]) {
    this._actions = actions;
  }

  getBestAction(): String {
    return this._actions
      .reduce((bestOption, action) => {
        return action.cellTo.richness > bestOption.cellTo.richness
          ? action
          : bestOption;
      }, this._actions[0])
      .getStringAction();
  }

  public get actions(): SeedAction[] {
    return this._actions;
  }
}
