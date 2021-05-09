import { Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";
import { GrowScoreCalculator } from "./grow-score-calculator";

export class GrowScoreT1Calculator extends GrowScoreCalculator {
  private day: number;

  constructor(
    treeCompletable: Tree,
    shadowMapMultipleDay: ShadowMapMultipleDay,
    day: number
  ) {
    super(treeCompletable, shadowMapMultipleDay);
    this.day = day;
  }

  computeScore(): number {
    if (this.day >= 22) {
      return 0;
    }
    return super.computeScore();
  }
}
