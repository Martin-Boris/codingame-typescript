import { Tree } from "../io/input";
import { Action } from "./action";

export class GrowAction implements Action {
  private _type: "GROW";
  private _tree: Tree;

  public static initFromString(action: String, trees: Tree[]): GrowAction {
    const tree: Tree = trees.find(
      (tree) => tree.cellIndex === parseInt(action.split(" ")[1])
    );
    return new GrowAction(tree);
  }

  constructor(tree: Tree) {
    this._type = "GROW";
    this._tree = tree;
  }

  getStringAction(): string {
    return this._type + " " + this._tree.cellIndex;
  }

  public get type(): "GROW" {
    return this._type;
  }

  public get tree(): Tree {
    return this._tree;
  }
}
