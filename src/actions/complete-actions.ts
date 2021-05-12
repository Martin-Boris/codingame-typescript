import { CompleteAction } from "../action/complete/complete-action";
import { Actions } from "./actions";
import { TresholdState } from "../constante/treshold";

export class CompleteActions implements Actions {
  private _actions: CompleteAction[];
  private tresholdState: TresholdState;
  private nutrients: number;

  constructor(
    actions: CompleteAction[],
    tresholdState: TresholdState,
    nutrients: number
  ) {
    this._actions = actions;
    this.tresholdState = tresholdState;
    this.nutrients = nutrients;
  }

  getBestAction(): String {
    this._actions.forEach((action) => {
      console.error({ score: action.score, action: action.getStringAction() });
    });
    let highscoreComplete = this.actions.find((action) => action.score >= 0.75);
    if (this.nutrients > 10 && highscoreComplete) {
      return highscoreComplete.getStringAction();
    }
    if (this._actions.length === 0 || this.isTresholdUnreched()) {
      return "";
    }
    const actionToExe = this._actions.reduce((hightScoreAction, action) => {
      return action.score > hightScoreAction.score ? action : hightScoreAction;
    }, this._actions[0]);

    return actionToExe.score > 0 ? actionToExe.getStringAction() : "";
  }

  public get actions(): CompleteAction[] {
    return this._actions;
  }

  private isTresholdUnreched() {
    return this._actions.length < this.tresholdState.MAX_T3_TRESHOLD;
  }
}
