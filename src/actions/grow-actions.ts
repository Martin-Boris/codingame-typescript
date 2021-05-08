import { GrowAction } from "../action/grow-action";
import {
  SEED_SIZE_TIER,
  SIZE_TIER_1,
  SIZE_TIER_2,
} from "../constante/game-constante";
import {
  GROW_SEED_TRESHOLD_DAY,
  GROW_T1_TRESHOLD_DAY,
  TresholdState,
} from "../constante/treshold";
import { Tree } from "../io/input";
import { Actions } from "./actions";

export class GrowActions implements Actions {
  private _actions: GrowAction[];
  private mineTrees: Tree[];
  private tresholdState: TresholdState;

  constructor(
    actions: GrowAction[],
    mineTrees: Tree[],
    tresholdState: TresholdState
  ) {
    this._actions = actions;
    this.mineTrees = mineTrees;
    this.tresholdState = tresholdState;
  }

  getBestAction(day: number): String {
    if (this._actions.length === 0) {
      return "";
    }
    let tierSizeToGrow: number = this.getTierSizeToGrow();

    const actionToExecute = this._actions.filter(
      (action) => action.tree.size === tierSizeToGrow
    )[0];

    switch (actionToExecute.tree.size) {
      case SIZE_TIER_2:
        return actionToExecute.getStringAction();
      case SEED_SIZE_TIER:
        return this.isTresholdForT2AndT1Reached(SEED_SIZE_TIER) ||
          day >= GROW_SEED_TRESHOLD_DAY
          ? ""
          : actionToExecute.getStringAction();
      case SIZE_TIER_1:
        return this.isTresholdForT2AndT1Reached(SIZE_TIER_1) ||
          day >= GROW_T1_TRESHOLD_DAY
          ? ""
          : actionToExecute.getStringAction();
      default:
        return "";
    }
  }

  private getTierSizeToGrow(): number {
    return this._actions.reduce((sizeToGrow, growAction) => {
      return growAction.tree.size > sizeToGrow
        ? growAction.tree.size
        : sizeToGrow;
    }, 0);
  }

  private isTresholdForT2AndT1Reached(treeTier: number) {
    return (
      this.mineTrees.filter((tree) => tree.size === treeTier + 1).length >
      this.tresholdState.MAX_T2_AND_T1_TRESHOLD
    );
  }

  public get actions(): GrowAction[] {
    return this._actions;
  }
}
