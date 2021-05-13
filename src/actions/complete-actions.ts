import { Action } from "../action/action";
import { Actions } from "./actions";

export class CompleteActions implements Actions {
  actions: Action[];
  highScoreAction(): Action {
    throw new Error("Method not implemented.");
  }
}
