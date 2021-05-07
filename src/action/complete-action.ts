import { Tree } from "../io/input";
import { Action } from "./action";

export class CompleteAction implements Action {
  private _type: "COMPLETE";
  private _tree: Tree;

  static initFromString(action: String, trees: Tree[]) {
    const tree: Tree = trees.find(
      (tree) => tree.cellIndex === parseInt(action.split(" ")[1])
    );
    return new CompleteAction(tree);
  }

  constructor(tree: Tree) {
    this._type = "COMPLETE";
    this._tree = tree;
  }

  getStringAction(): string {
    return this._type + " " + this._tree.cellIndex;
  }

  public get type(): "COMPLETE" {
    return this._type;
  }

  public get tree(): Tree {
    return this._tree;
  }
}
