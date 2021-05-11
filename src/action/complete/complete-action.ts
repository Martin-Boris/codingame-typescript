import { Map, Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";
import { Action } from "../action";
import { CompleteScoreCalculator } from "./complete-score-calculator";

export class CompleteAction implements Action {
  private _type: "COMPLETE";
  private _tree: Tree;
  private _score: number;

  static initFromString(
    action: String,
    trees: Tree[],
    shadowMapMultipleDay: ShadowMapMultipleDay,
    day: number,
    map: Map
  ) {
    const tree: Tree = trees.find(
      (tree) => tree.cellIndex === parseInt(action.split(" ")[1])
    );
    const completeScoreCalculator = new CompleteScoreCalculator(
      tree,
      shadowMapMultipleDay,
      day,
      trees,
      map
    );
    return new CompleteAction(tree, completeScoreCalculator.compute());
  }

  constructor(tree: Tree, score: number) {
    this._type = "COMPLETE";
    this._tree = tree;
    this._score = score;
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

  public get score(): number {
    return this._score;
  }
}
