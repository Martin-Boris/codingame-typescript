import { Map, Tree } from "../io/input";
import { ShadowMap } from "./shadow-map";

export class ShadowCalculator {
  private day: number;
  private trees: Tree[];
  private map: Map;

  constructor(day: number, trees: Tree[], map: Map) {
    this.day = day;
    this.trees = trees;
    this.map = map;
  }
  public compute(): ShadowMap {
    let shadowMap: ShadowMap = {};
    this.trees.forEach((tree) => {
      const sunIndex = this.day % 6;
      let i = 1;
      let shadowProjectionIndex = tree.cell.neighborIndexes[sunIndex];
      while (i <= tree.size && shadowProjectionIndex != -1) {
        const previousShadowLevel = shadowMap[shadowProjectionIndex]
          ? shadowMap[shadowProjectionIndex].shadowLevel
          : 0;
        shadowMap[shadowProjectionIndex] = {
          shadowLevel: previousShadowLevel + tree.size,
        };
        shadowProjectionIndex = this.map[shadowProjectionIndex].neighborIndexes[
          sunIndex
        ];
        i++;
      }
    });
    return shadowMap;
  }
}
