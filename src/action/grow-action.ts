import { GameState, Map } from "../io/input";
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
    gameState: GameState,
    map: Map
  ): number {
    if (gameState.day >= 20 && (this.tree.size === 2 || this.tree.size === 1)) {
      return 0;
    }
    return (
      (1 * this.tree.computeSunnyScore(consecutiveShadowMap) +
        1 * this.tree.computePositionScore(gameState.trees, map) +
        0.1 * this.tree.computeRichnessScore()) /
      2.1
    );
  }

  toString(): string {
    return this.type + " " + this.tree.cell.index;
  }
}
