import { T2_TREE_TRESHOLD } from "../../constante/treshold";
import { Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";
import { GrowScoreCalculator } from "./grow-score-calculator";

export class GrowScoreT1Calculator extends GrowScoreCalculator {
  private day: number;
  private nbrT2: number;

  constructor(
    treeCompletable: Tree,
    shadowMapMultipleDay: ShadowMapMultipleDay,
    day: number,
    nbrT2: number
  ) {
    super(treeCompletable, shadowMapMultipleDay);
    this.day = day;
    this.nbrT2 = nbrT2;
  }

  computeScore(): number {
    if (this.day >= 22) {
      return 0;
    }
    if (this.nbrT2 > T2_TREE_TRESHOLD) {
      return 0;
    }
    return super.computeScore();
  }
}
