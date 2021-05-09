import { Map, Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";

export class CompleteScoreCalculator {
  private tree: Tree;
  private shadowMapMultipleDay: ShadowMapMultipleDay;

  constructor(
    treeCompletable: Tree,
    shadowMapMultipleDay: ShadowMapMultipleDay
  ) {
    this.tree = treeCompletable;
    this.shadowMapMultipleDay = shadowMapMultipleDay;
  }

  public computeSunEfficiency(): number {
    const nbrDay = Object.keys(this.shadowMapMultipleDay).length;
    let nbrSunnyDay = nbrDay;
    Object.keys(this.shadowMapMultipleDay).forEach((day) => {
      const shadowMap = this.shadowMapMultipleDay[day];
      if (shadowMap[this.tree.cellIndex]?.shadowLevel >= this.tree.size) {
        nbrSunnyDay--;
      }
    });
    return nbrSunnyDay / nbrDay;
  }

  public compute(): number {
    return 1 - this.computeSunEfficiency();
  }
}
