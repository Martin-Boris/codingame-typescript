import { SIZE_TIER_1 } from "../../constante/game-constante";
import { Cell, Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";

export class SeedScoreCalculator {
  private treeFrom: Tree;
  private cellTo: Cell;
  private trees: Tree[];

  constructor(treeFrom: Tree, cellTo: Cell, trees: Tree[]) {
    this.cellTo = cellTo;
    this.treeFrom = treeFrom;
    this.trees = trees;
  }

  public computeScore(): number {
    if (this.treeFrom.size <= SIZE_TIER_1) {
      return 0;
    }
    return this.cellTo.neighborIndexes.reduce(
      (previousScore, neighborIndexe) =>
        this.trees.some((tree) => tree.cellIndex === neighborIndexe)
          ? previousScore - 1
          : previousScore,
      6
    );
  }
}
