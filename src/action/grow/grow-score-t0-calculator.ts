import { T1_TREE_TRESHOLD } from "../../constante/treshold";
import { Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";
import { GrowScoreCalculator } from "./grow-score-calculator";

export class GrowScoreT0Calculator extends GrowScoreCalculator {
  private day: number;
  private nbrT1: number;

  constructor(
    treeCompletable: Tree,
    shadowMapMultipleDay: ShadowMapMultipleDay,
    day: number,
    nbrT1: number
  ) {
    super(treeCompletable, shadowMapMultipleDay);
    this.day = day;
    this.nbrT1 = nbrT1;
  }

  computeScore(): number {
    if (this.day >= 21) {
      return 0;
    }
    if (this.nbrT1 >= T1_TREE_TRESHOLD) {
      return 0;
    }
    return super.computeScore();
  }
}
