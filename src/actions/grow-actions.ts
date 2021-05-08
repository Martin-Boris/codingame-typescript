import { GrowAction } from "../action/grow-action";
import {
  SEDD_SIZE_TIER,
  SIZE_TIER_1,
  SIZE_TIER_2,
} from "../constante/game-constante";
import { Tree } from "../io/input";
import { Actions } from "./actions";

export class GrowActions implements Actions {
  actions: GrowAction[];
  mineTrees: Tree[];

  constructor(actions: GrowAction[], mineTrees: Tree[]) {
    this.actions = actions;
    this.mineTrees = mineTrees;
  }

  getBestAction(): String {
    if (this.actions.length === 0) {
      return "";
    }
    let tierSizeToGrow: number = this.getTierSizeToGrow();

    const actionToExecute = this.actions.filter(
      (action) => action.tree.size === tierSizeToGrow
    )[0];

    switch (actionToExecute.tree.size) {
      case SIZE_TIER_2:
        return actionToExecute.getStringAction();
      case SEDD_SIZE_TIER:
        return this.isAlreadyANextTierTree(SEDD_SIZE_TIER)
          ? ""
          : actionToExecute.getStringAction();
      case SIZE_TIER_1:
        return this.isAlreadyANextTierTree(SIZE_TIER_1)
          ? ""
          : actionToExecute.getStringAction();
      default:
        return "";
    }
  }

  private getTierSizeToGrow(): number {
    return this.actions.reduce((sizeToGrow, growAction) => {
      return growAction.tree.size > sizeToGrow
        ? growAction.tree.size
        : sizeToGrow;
    }, 0);
  }

  private isAlreadyANextTierTree(treeTier: number) {
    return this.mineTrees.some((tree) => tree.size === treeTier + 1);
  }
}
