import { SEED_SIZE_TIER, SIZE_TIER_1 } from "../../constante/game-constante";
import { MAX_RICHNESS_VALUE } from "../../constante/treshold";
import { Cell, Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";

export class SeedScoreCalculator {
  private treeFrom: Tree;
  private cellTo: Cell;
  private trees: Tree[];
  private shadowMapMultipleDay: ShadowMapMultipleDay;

  constructor(
    treeFrom: Tree,
    cellTo: Cell,
    trees: Tree[],
    shadowMapMultipleDay: ShadowMapMultipleDay
  ) {
    this.cellTo = cellTo;
    this.treeFrom = treeFrom;
    this.trees = trees;
    this.shadowMapMultipleDay = shadowMapMultipleDay;
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

  public computeShadow(): number {
    if (this.treeFrom.size <= SIZE_TIER_1 || this.isAlreadyASeed()) {
      return 0;
    }
    let days = [...Object.keys(this.shadowMapMultipleDay)];
    days.shift();
    const nbrDay = days.length;
    let nbrSunnyDay = nbrDay;
    days.forEach((day) => {
      const shadowMap = this.shadowMapMultipleDay[day];
      if (shadowMap[this.cellTo.index]?.shadowLevel >= 1) {
        nbrSunnyDay--;
      }
    });
    return (
      (1 * (nbrSunnyDay / nbrDay) +
        1 * (this.cellTo.richness / MAX_RICHNESS_VALUE)) /
      2
    );
  }

  private isAlreadyASeed(): boolean {
    return this.trees.some(
      (tree) => tree.size === SEED_SIZE_TIER && tree.isMine
    );
  }
}
