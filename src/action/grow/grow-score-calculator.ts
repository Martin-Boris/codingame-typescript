import { MAX_RICHNESS_VALUE } from "../../constante/treshold";
import { Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";

export class GrowScoreCalculator {
  protected tree: Tree;
  protected shadowMapMultipleDay: ShadowMapMultipleDay;

  constructor(
    treeCompletable: Tree,
    shadowMapMultipleDay: ShadowMapMultipleDay
  ) {
    this.tree = treeCompletable;
    this.shadowMapMultipleDay = shadowMapMultipleDay;
  }

  public computeScore(): number {
    const nbrDay = Object.keys(this.shadowMapMultipleDay).length;
    let nbrSunnyDay = nbrDay;
    Object.keys(this.shadowMapMultipleDay).forEach((day) => {
      const shadowMap = this.shadowMapMultipleDay[day];
      if (shadowMap[this.tree.cellIndex]?.shadowLevel >= this.tree.size) {
        nbrSunnyDay--;
      }
    });
    return (
      (nbrSunnyDay / nbrDay +
        0.1 * (this.tree.cell.richness / MAX_RICHNESS_VALUE)) /
      1.1
    );
  }
}
