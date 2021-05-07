import { GrowAction } from "../action/grow-action";
import { Actions } from "./actions";

export class GrowActions implements Actions {
  actions: GrowAction[];

  constructor(actions: GrowAction[]) {
    this.actions = actions;
  }

  getBestAction(): String {
    if (this.actions.length === 0) {
      return "";
    }
    return this.actions
      .reduce((bestOption, growAction) => {
        return growAction.tree.size > bestOption.tree.size
          ? growAction
          : bestOption;
      }, this.actions[0])
      .getStringAction();
  }
}
