import { SeedActions } from "../actions/seed-actions";
import { Map } from "../io/input";
import { Tree } from "../io/tree";
import { Trees } from "../io/trees";
import { ConsecutiveShadowMap } from "../shadow/consecutive-shadow-map";
import { Action } from "./action";

export class SeedAction implements Action {
  type: "SEED";
  treeFrom: Tree;
  seed: Tree;

  public static initFromString(
    action: String,
    trees: Trees,
    map: Map
  ): SeedAction {
    const splitedAction = action.split(" ");
    const treeFrom = trees.getTreeAt(parseInt(splitedAction[1]));
    const seedCellIndex = parseInt(splitedAction[2]);
    const seed = new Tree(seedCellIndex, map[seedCellIndex], 0, true, false);
    return new SeedAction(treeFrom, seed);
  }

  constructor(treeFrom: Tree, seed: Tree) {
    this.type = "SEED";
    this.treeFrom = treeFrom;
    this.seed = seed;
  }

  public computeScore(
    consecutiveShadowMap: ConsecutiveShadowMap,
    trees: Trees,
    map: Map
  ): number {
    if (trees.isAlreadyASeed()) {
      return 0;
    }
    return (
      (1 * this.seed.computeSunnyScore(consecutiveShadowMap) +
        1 * this.seed.computePositionScore(trees, map) +
        0.1 * this.seed.computeRichnessScore()) /
      2.1
    );
  }

  public toString(): string {
    return (
      this.type + " " + this.treeFrom.cell.index + " " + this.seed.cell.index
    );
  }
}
