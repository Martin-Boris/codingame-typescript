import { SeedAction } from "../action/seed-action";
import { Actions } from "./actions";
import { SEED_TRESHOLD_DAY } from "../constante/treshold";
import { Tree } from "../io/input";
import { SEED_SIZE_TIER, SIZE_TIER_1 } from "../constante/game-constante";

export class SeedActions implements Actions {
  private _actions: SeedAction[];
  private _mineTree: Tree[];

  constructor(actions: SeedAction[], mineTree: Tree[]) {
    this._actions = actions;
    this._mineTree = mineTree;
  }

  getBestAction(day: number): String {
    if (
      this.isAlreadyASeed() ||
      this._actions.length === 0 ||
      day > SEED_TRESHOLD_DAY
    ) {
      return "";
    }
    let seedActionFiltered = this._actions.filter(
      (action) => action.treeFrom.size > SIZE_TIER_1
    );
    return seedActionFiltered.length === 0
      ? ""
      : seedActionFiltered[0].getStringAction();
  }

  public get actions(): SeedAction[] {
    return this._actions;
  }

  public get mineTree(): Tree[] {
    return this._mineTree;
  }

  private isAlreadyASeed(): boolean {
    return this._mineTree.some((tree) => tree.size === SEED_SIZE_TIER);
  }
}
