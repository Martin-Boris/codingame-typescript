import { CompleteAction } from "../action/complete/complete-action";
import { Actions } from "./actions";
import { TresholdState } from "../constante/treshold";

export class CompleteActions implements Actions {
  private _actions: CompleteAction[];
  private tresholdState: TresholdState;

  constructor(actions: CompleteAction[], tresholdState: TresholdState) {
    this._actions = actions;
    this.tresholdState = tresholdState;
  }

  getBestAction(): String {
    if (this._actions.length === 0 || this.isTresholdUnreched()) {
      return "";
    }
    return this._actions
      .reduce(
        (hightScoreAction, action) =>
          action.score > hightScoreAction.score ? action : hightScoreAction,
        this._actions[0]
      )
      .getStringAction();
  }

  public get actions(): CompleteAction[] {
    return this._actions;
  }

  private isTresholdUnreched() {
    return this._actions.length < this.tresholdState.MAX_T3_TRESHOLD;
  }
}
