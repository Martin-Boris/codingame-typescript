import { GrowAction } from "../action/grow-action";
import { Actions } from "./actions";

export class GrowActions implements Actions {
  actions: GrowAction[];

  constructor(actions: GrowAction[]) {
    this.actions = actions;
  }

  getBestAction(): String {
    throw new Error("Method not implemented.");
  }
}
