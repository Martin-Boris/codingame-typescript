import { Action } from "./action";
import { Map } from "./input";

export class Actions {
  private _actions: Action[] = [];

  constructor(actions: String[], map: Map) {
    actions.forEach((action) => {
      if (Action.isSEEDActionFromString(action)) {
        this._actions.push(new Action(action, map));
      }
    });
  }

  selectBestOption(): Action {
    return this._actions.reduce((bestOption, action) => {
      if (action.cellTo.richness > bestOption.cellTo.richness) {
        return action;
      }
      return bestOption;
    }, this._actions[0]);
  }

  public get actions(): Action[] {
    return this._actions;
  }
}
