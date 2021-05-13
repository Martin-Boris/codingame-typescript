import { Map } from "../io/input";
import { Tree } from "../io/tree";
import { Trees } from "../io/trees";
import { ConsecutiveShadowMap } from "../shadow/consecutive-shadow-map";
import { Action } from "./action";

export class GrowAction implements Action {
  type: "GROW";
  tree: Tree;

  public static initFromString(action: string, trees: Trees): GrowAction {
    const splitedAction = action.split(" ");
    const tree = trees.getTreeAt(parseInt(splitedAction[1]));
    return new GrowAction(tree);
  }

  constructor(tree: Tree) {
    this.type = "GROW";
    this.tree = tree;
  }
  computeScore(
    consecutiveShadowMap: ConsecutiveShadowMap,
    trees: Trees,
    map: Map
  ): number {
    return (
      (1 * this.tree.computeSunnyScore(consecutiveShadowMap) +
        1 * this.tree.computePositionScore(trees, map) +
        0.1 * this.tree.computeRichnessScore()) /
      2.1
    );
  }

  toString(): string {
    return this.type + " " + this.tree.cell.index;
  }
}
