import { NBR_DAY_CYCLE_FOR_SHADOW_COMPUTE } from "../../constante/treshold";
import { Map, Tree } from "../../io/input";
import { ShadowCalculator } from "../../shadow/shadow-calculator";
import { ShadowMap, ShadowMapMultipleDay } from "../../shadow/shadow-map";

export class CompleteScoreCalculator {
  private tree: Tree;
  private shadowMapMultipleDay: ShadowMapMultipleDay;
  private day: number;
  private trees: Tree[];
  private map: Map;
  private nutrients: number;

  constructor(
    treeCompletable: Tree,
    shadowMapMultipleDay: ShadowMapMultipleDay,
    day: number,
    trees: Tree[],
    map: Map,
    nutrients: number
  ) {
    this.tree = treeCompletable;
    this.shadowMapMultipleDay = shadowMapMultipleDay;
    this.day = day;
    this.trees = trees;
    this.map = map;
    this.nutrients = nutrients;
  }

  public computeSunEfficiency(): number {
    const nbrDay = Object.keys(this.shadowMapMultipleDay).length;
    if (nbrDay === 0) {
      return 0;
    }
    let nbrSunnyDay = nbrDay;
    Object.keys(this.shadowMapMultipleDay).forEach((day) => {
      const shadowMap = this.shadowMapMultipleDay[day];
      if (shadowMap[this.tree.cellIndex]?.shadowLevel >= this.tree.size) {
        nbrSunnyDay--;
      }
    });
    return nbrSunnyDay / nbrDay;
  }

  public computeShadowDeny(
    treesAfterAction: Tree[],
    shadowMapAfterAction: ShadowMap,
    isAllyCompute: boolean
  ): number {
    let maxSunNextTurn = 0;
    let realSunNextTurn = 0;
    treesAfterAction
      .filter((tree) => tree.isMine === isAllyCompute)
      .forEach((tree) => {
        maxSunNextTurn += tree.size;
        if (
          (shadowMapAfterAction[tree.cellIndex] &&
            tree.size > shadowMapAfterAction[tree.cellIndex]?.shadowLevel) ||
          !shadowMapAfterAction[tree.cellIndex]
        ) {
          realSunNextTurn += tree.size;
        }
      });
    return realSunNextTurn / maxSunNextTurn;
  }

  public computeMultipleShadowDeny(isAllyCompute: boolean): number {
    const treesAfterAction = this.trees.filter(
      (tree) => tree.cellIndex != this.tree.cellIndex
    );
    const shadowAfterAction = new ShadowCalculator(treesAfterAction, this.map);
    const shadowMapAfterAction = shadowAfterAction.computeMultipleDay(
      this.day + 1,
      NBR_DAY_CYCLE_FOR_SHADOW_COMPUTE
    );
    let dayShadowdenyR = 0;
    Object.keys(shadowMapAfterAction).forEach((shadowMapDayIndex) => {
      dayShadowdenyR += this.computeShadowDeny(
        treesAfterAction,
        shadowMapAfterAction[shadowMapDayIndex],
        isAllyCompute
      );
    });
    return dayShadowdenyR / NBR_DAY_CYCLE_FOR_SHADOW_COMPUTE;
  }

  public compute(): number {
    return this.isWorth()
      ? 1 * (1 - this.computeSunEfficiency())
      : //+
        //1 * (1 - this.computeMultipleShadowDeny(true))
        //+
        // (0.5 * this.computeMultipleShadowDeny(false)) / 2
        -1;
  }

  private isWorth(): boolean {
    return this.map[this.tree.cellIndex].richness + this.nutrients - 1 > 0;
  }
}
