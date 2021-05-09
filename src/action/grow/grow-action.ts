import { Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";
import { Action } from "../action";
import initGrowScoreCalculator from "./grow-score-calculator-factory";

export class GrowAction implements Action {
  private _type: "GROW";
  private _tree: Tree;
  private _score: number;

  public static initFromString(
    action: String,
    trees: Tree[],
    shadowMapMultipleDay: ShadowMapMultipleDay,
    day: number
  ): GrowAction {
    const tree: Tree = trees.find(
      (tree) => tree.cellIndex === parseInt(action.split(" ")[1])
    );
    let calculator = initGrowScoreCalculator(tree, shadowMapMultipleDay, day);
    return new GrowAction(tree, calculator.computeScore());
  }

  constructor(tree: Tree, score: number) {
    this._type = "GROW";
    this._tree = tree;
    this._score = score;
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

  public get score(): number {
    return this._score;
  }
}
