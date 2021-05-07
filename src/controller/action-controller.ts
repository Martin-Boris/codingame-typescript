import { Actions } from "../actions/actions";

export class ActionController {
  private _seedAvailableActions: Actions;
  private _growAvailableActions: Actions;
  private _completeAvailableActions: Actions;

  constructor(
    seedAvailableActions: Actions,
    growAvailableActions: Actions,
    completeAvailableActions: Actions
  ) {
    this._seedAvailableActions = seedAvailableActions;
    this._growAvailableActions = growAvailableActions;
    this._completeAvailableActions = completeAvailableActions;
  }

  selectBestMove(day: number): String {
    const bestCompleteAction = this._completeAvailableActions.getBestAction(
      day
    );
    const bestGrowAction = this._growAvailableActions.getBestAction(day);
    const bestSeedAction = this._seedAvailableActions.getBestAction(day);
    if (bestCompleteAction) {
      return bestCompleteAction;
    }
    if (bestGrowAction) {
      return bestGrowAction;
    }
    if (bestSeedAction) {
      return bestSeedAction;
    }
    return "WAIT";
  }
}
