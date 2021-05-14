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
    if (this.tree.size === 0 && gameState.trees.getTreesNumberOfTier(1) >= 3) {
      return 0;
    }
    if (gameState.day >= 20 && this.tree.size === 1) {
      return 0;
    }
    if (gameState.day >= 21 && this.tree.size === 2) {
      return 0;
    }
    if (
      gameState.day < 23 &&
      this.tree.size === 2 &&
      gameState.nutrients + this.tree.cell.getPointEarn() <
        (7 + gameState.trees.getTreesNumberOfTier(3) + 4) / 3
    ) {
      return 0;
    }
    return (
      (1 * this.tree.computeSunnyScore(consecutiveShadowMap) +
        1 * this.tree.computePositionScore(gameState.trees, map) +
        0.1 * this.tree.computeRichnessScore() +
        (0.5 * this.tree.size) / 3) /
      2.6
    );
  }

  toString(): string {
    return this.type + " " + this.tree.cell.index;
  }
}
