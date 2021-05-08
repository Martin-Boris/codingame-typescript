import { Cell, Map, Tree } from "../io/input";
import { SIZE_TIER_1 } from "../constante/game-constante";
import { Action } from "./action";

export class SeedAction implements Action {
  private _type: "SEED";
  private _treeFrom: Tree;
  private _cellTo: Cell;

  public static initFromString(
    action: String,
    map: Map,
    trees: Tree[]
  ): SeedAction {
    const partialAction = action.split(" ");
    let cellTo = map[parseInt(partialAction[2])];
    const tree = trees.find(
      (tree) => tree.cellIndex === parseInt(partialAction[1])
    );
    return new SeedAction(tree, cellTo);
  }

  constructor(treeFrom: Tree, cellTo: Cell) {
    this._type = "SEED";
    this._treeFrom = treeFrom;
    this._cellTo = cellTo;
  }

  public computeScore(trees: Tree[]): number {
    if (this._treeFrom.size <= SIZE_TIER_1) {
      return 0;
    }
    return this._cellTo.neighborIndexes.reduce(
      (previousScore, neighborIndexe) =>
        trees.some((tree) => tree.cellIndex === neighborIndexe)
          ? previousScore - 1
          : previousScore,
      6
    );
  }

  get type() {
    return this._type;
  }

  public get treeFrom(): Tree {
    return this._treeFrom;
  }

  public get cellTo(): Cell {
    return this._cellTo;
  }

  public getStringAction() {
    return (
      this.type + " " + this._treeFrom.cellIndex + " " + this._cellTo.index
    );
  }
}
