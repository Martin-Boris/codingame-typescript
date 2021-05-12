import { Map, Tree } from "../io/input";
import { ShadowMap, ShadowMapMultipleDay } from "./shadow-map";

export class ShadowCalculator {
  private trees: Tree[];
  private map: Map;

  constructor(trees: Tree[], map: Map) {
    this.trees = trees;
    this.map = map;
  }
  public compute(day: number): ShadowMap {
    let shadowMap: ShadowMap = {};
    this.trees.forEach((tree) => {
      const sunIndex = day % 6;
      let i = 1;
      let shadowProjectionIndex = tree.cell.neighborIndexes[sunIndex];
      while (i <= tree.size && shadowProjectionIndex != -1) {
        const previousShadowLevel = shadowMap[shadowProjectionIndex]
          ? shadowMap[shadowProjectionIndex].shadowLevel
          : 0;
        shadowMap[shadowProjectionIndex] = {
          shadowLevel:
            previousShadowLevel < tree.size ? tree.size : previousShadowLevel,
        };
        shadowProjectionIndex =
          this.map[shadowProjectionIndex].neighborIndexes[sunIndex];
        i++;
      }
    });
    return shadowMap;
  }

  public computeMultipleDay(
    startDay: number,
    nbrOfDayCycle: number
  ): ShadowMapMultipleDay {
    let multipleDayShadowMap: ShadowMapMultipleDay = {};
    const endDay = startDay + nbrOfDayCycle;
    while (startDay < endDay && startDay <= 23) {
      multipleDayShadowMap[startDay] = this.compute(startDay);
      startDay++;
    }
    return multipleDayShadowMap;
  }
}
