import { CompleteAction } from "../action/complete-action";
import { Actions } from "./actions";
import { TresholdState } from "../constante/treshold";

export class CompleteActions implements Actions {
  private _actions: CompleteAction[];
  private tresholdState: TresholdState;

  constructor(actions: CompleteAction[], tresholdState: TresholdState) {
    this._actions = actions;
    this.tresholdState = tresholdState;
  }

  getBestAction(day: number): String {
    if (this._actions.length === 0 || this.isTresholdUnreched(day)) {
      return "";
    }
    return this._actions[0].getStringAction();
  }

  public get actions(): CompleteAction[] {
    return this._actions;
  }

  private isTresholdUnreched(day: number) {
    return this._actions.length < this.tresholdState.MAX_T3_TRESHOLD;
  }
}
