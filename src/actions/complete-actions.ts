import { CompleteAction } from "../action/complete-action";
import { Actions } from "./actions";
import { MAX_T3_TRESHOLD, COMPLETE_TRESHOLD_DAY } from "../constante/treshold";

export class CompleteActions implements Actions {
  private _actions: CompleteAction[];

  constructor(actions: CompleteAction[]) {
    this._actions = actions;
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
    return (
      day < COMPLETE_TRESHOLD_DAY && this._actions.length < MAX_T3_TRESHOLD
    );
  }
}
