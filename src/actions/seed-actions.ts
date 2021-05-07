import { SeedAction } from "../action/seed-action";
import { Actions } from "./actions";
import { SEED_TRESHOLD_DAY } from "../constante/treshold";

export class SeedActions implements Actions {
  private _actions: SeedAction[];
  private _numberOfSeed: Number;

  constructor(actions: SeedAction[], numberOfSeed: Number) {
    this._actions = actions;
    this._numberOfSeed = numberOfSeed;
  }

  getBestAction(day: number): String {
    if (
      this._numberOfSeed > 0 ||
      this._actions.length === 0 ||
      day > SEED_TRESHOLD_DAY
    ) {
      return "";
    }
    return this._actions[0].getStringAction();
  }

  public get actions(): SeedAction[] {
    return this._actions;
  }

  public get numberOfSeed(): Number {
    return this._numberOfSeed;
  }
}
