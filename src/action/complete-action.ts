import { GameState, Map } from "../io/input";
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
    gameState: GameState,
    map: Map
  ): number {
    if (
      gameState.day >= 23 &&
      this.computeCompleteNotWorthForTheDay(gameState)
    ) {
      return 0;
    }
    if (
      gameState.day >= 20 &&
      this.computeCompleteNotWorthUntilTheEnd(gameState, consecutiveShadowMap)
    ) {
      return 0;
    }
    if (gameState.day < 13 || gameState.lastDayComplete === gameState.day) {
      return 0;
    }
    return (
      (1 * (1 - this.tree.computeSunnyScore(consecutiveShadowMap)) +
        1 * (1 - this.tree.computePositionScore(gameState.trees, map)) +
        0.1 * this.tree.computeRichnessScore()) /
      2.1
    );
  }

  toString(): string {
    return this.type + " " + this.tree.cell.index;
  }

  private computeCompleteNotWorthForTheDay(gameState: GameState): boolean {
    return (
      Math.floor((gameState.sun - 4) / 3) +
        gameState.nutrients +
        (this.tree.cell.richness - 1) <=
      Math.floor(gameState.sun / 3)
    );
  }

  private computeCompleteNotWorthUntilTheEnd(
    gameState: GameState,
    consecutiveShadowMap: ConsecutiveShadowMap
  ): boolean {
    return (
      Math.floor((gameState.sun - 4) / 3) +
        gameState.nutrients +
        (this.tree.cell.richness - 1) <=
      Math.floor(
        (gameState.sun +
          this.tree.getSunProductionUntilTheEnd(consecutiveShadowMap)) /
          3
      )
    );
  }
}
