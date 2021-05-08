import { Cell, Map, Tree } from "../io/input";
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
