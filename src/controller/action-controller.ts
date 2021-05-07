import { Map, Tree } from "../io/input";
import { GrowAction } from "../models/action/grow-action";
import { SeedAction } from "../models/action/seed-action";

export class ActionController {
  private _seedAvailableActions: SeedAction[] = [];
  private _growAvailableActions: GrowAction[] = [];
  private _MineTrees: Tree[] = [];

  constructor(actions: String[], map: Map, trees: Tree[]) {
    this._MineTrees = trees.filter((tree) => tree.isMine);
    actions.forEach((action) => {
      if (SeedAction.isSEEDActionFromString(action)) {
        this._seedAvailableActions.push(new SeedAction(action, map));
      }
      if (action.includes("GROW")) {
        this._growAvailableActions.push(new GrowAction(action, trees));
      }
    });
  }

  selectBestMove(): String {
    if (this._growAvailableActions.length > 0) {
      return this._growAvailableActions
        .reduce((bestOption, growAction) => {
          return growAction.tree.size > bestOption.tree.size
            ? growAction
            : bestOption;
        }, this._growAvailableActions[0])
        .getStringAction();
    }

    if (this._MineTrees.some((tree) => tree.size === 0)) {
      return "WAIT";
    }
  }

  public get seedAvailableActions(): SeedAction[] {
    return this._seedAvailableActions;
  }

  public get mineTrees(): Tree[] {
    return this._MineTrees;
  }

  public get growAvailableActions(): GrowAction[] {
    return this._growAvailableActions;
  }
}
