import { Cell, Map, Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";
import { Action } from "../action";
import { SeedScoreCalculator } from "./seed-score-calculator";

export class SeedAction implements Action {
  private _type: "SEED";
  private _treeFrom: Tree;
  private _cellTo: Cell;
  private _score: number;

  public static initFromString(
    action: String,
    map: Map,
    trees: Tree[],
    shadowMapMultipleDay: ShadowMapMultipleDay
  ): SeedAction {
    const partialAction = action.split(" ");
    let cellTo = map[parseInt(partialAction[2])];
    const treeFrom = trees.find(
      (tree) => tree.cellIndex === parseInt(partialAction[1])
    );
    const seedScoreCalculator = new SeedScoreCalculator(
      treeFrom,
      cellTo,
      trees,
      shadowMapMultipleDay
    );
    const score = seedScoreCalculator.computeScore();
    const scoreFronShadow = seedScoreCalculator.computeShadow();
    return new SeedAction(treeFrom, cellTo, scoreFronShadow);
  }

  constructor(treeFrom: Tree, cellTo: Cell, score: number) {
    this._type = "SEED";
    this._treeFrom = treeFrom;
    this._cellTo = cellTo;
    this._score = score;
  }

  get type() {
    return this._type;
  }

  get score(): number {
    return this._score;
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
