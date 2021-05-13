import { Map } from "../io/input";
import { Tree } from "../io/tree";
import { Trees } from "../io/trees";
import { ConsecutiveShadowMap } from "../shadow/consecutive-shadow-map";
import { Action } from "./action";

export class CompleteAction implements Action {
  type: "COMPLETE";
  tree: Tree;

  public static initFromString(action: String, trees: Trees) {
    const splitedAction = action.split(" ");
    const tree = trees.getTreeAt(parseInt(splitedAction[1]));
    return new CompleteAction(tree);
  }

  constructor(tree: Tree) {
    this.type = "COMPLETE";
    this.tree = tree;
  }
  computeScore(
    consecutiveShadowMap: ConsecutiveShadowMap,
    trees: Trees,
    map: Map
  ): number {
    return (
      (1 * (1 - this.tree.computeSunnyScore(consecutiveShadowMap)) +
        1 * (1 - this.tree.computePositionScore(trees, map)) +
        0.1 * this.tree.computeRichnessScore()) /
      2.1
    );
  }

  toString(): string {
    return this.type + " " + this.tree.cell.index;
  }
}
