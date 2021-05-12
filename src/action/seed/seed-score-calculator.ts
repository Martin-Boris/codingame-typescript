import { SEED_SIZE_TIER, SIZE_TIER_1 } from "../../constante/game-constante";
import { MAX_RICHNESS_VALUE } from "../../constante/treshold";
import { Cell, Map, Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";

export class SeedScoreCalculator {
  private treeFrom: Tree;
  private cellTo: Cell;
  private trees: Tree[];
  private shadowMapMultipleDay: ShadowMapMultipleDay;
  private map: Map;

  constructor(
    treeFrom: Tree,
    cellTo: Cell,
    trees: Tree[],
    shadowMapMultipleDay: ShadowMapMultipleDay,
    map: Map
  ) {
    this.cellTo = cellTo;
    this.treeFrom = treeFrom;
    this.trees = trees;
    this.shadowMapMultipleDay = shadowMapMultipleDay;
    this.map = map;
  }

  public computeNeighborIndexes(): number {
    let nbrNeighbor = this.cellTo.neighborIndexes.reduce(
      (previousScore, neighborIndexe) =>
        this.trees.some((tree) => tree.cellIndex === neighborIndexe)
          ? previousScore - 1
          : previousScore,
      6
    );
    return nbrNeighbor / 6;
  }

  public computeRockNeighbor(): number {
    if (this.treeFrom.size <= SIZE_TIER_1) {
      return 0;
    }
    let nbrNeighbor = this.cellTo.neighborIndexes.reduce(
      (previousScore, neighborIndexe) =>
        this.map[neighborIndexe]?.richness === 0
          ? previousScore + 1
          : previousScore,
      0
    );
    return nbrNeighbor / 6;
  }

  public compute(): number {
    if (this.treeFrom.size <= SIZE_TIER_1 || this.isAlreadyASeed()) {
      return 0;
    }
  }

  public computeShadow(): number {
    if (this.treeFrom.size <= SIZE_TIER_1 || this.isAlreadyASeed()) {
      return 0;
    }
    let days = Object.keys(this.shadowMapMultipleDay);
    days.shift();
    const nbrDay = days.length;
    let nbrSunnyDay = nbrDay;
    days.forEach((day) => {
      const shadowMap = this.shadowMapMultipleDay[day];
      if (shadowMap[this.cellTo.index]?.shadowLevel >= 1) {
        nbrSunnyDay--;
      }
    });
    if (this.nbrRockOnMap() > 2) {
      return (
        (1 * (nbrSunnyDay / nbrDay) +
          0.5 * this.computeNeighborIndexes() +
          1 * this.computeRockNeighbor() +
          0.1 * (this.cellTo.richness / MAX_RICHNESS_VALUE)) /
        2.1
      );
    }
    return (
      (1 * (nbrSunnyDay / nbrDay) +
        1 * this.computeNeighborIndexes() +
        0.1 * (this.cellTo.richness / MAX_RICHNESS_VALUE)) /
      2.1
    );
  }

  private isAlreadyASeed(): boolean {
    return this.trees.some(
      (tree) => tree.size === SEED_SIZE_TIER && tree.isMine
    );
  }

  private nbrRockOnMap(): number {
    let nbrRock = 0;
    Object.keys(this.map).forEach((cellIndexe) => {
      if (this.map[cellIndexe].richness === 0) {
        nbrRock++;
      }
    });
    return nbrRock;
  }
}
