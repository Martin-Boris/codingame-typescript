import { ConsecutiveShadowMap } from "../shadow/consecutive-shadow-map";
import { ShadowsMap } from "../shadow/shadows-map";
import { Cell } from "./cell";
import { Map } from "./input";
import { Trees, NBR_DAY_SHADOW_GENERATION } from "./trees";

export class Tree {
  cellIndex: number;
  cell: Cell;
  size: number;
  isMine: boolean;
  isDormant: boolean;

  constructor(
    cellIndex: number,
    cell: Cell,
    size: number,
    isMine: boolean,
    isDormant: boolean
  ) {
    this.cellIndex = cellIndex;
    this.cell = cell;
    this.size = size;
    this.isMine = isMine;
    this.isDormant = isDormant;
  }

  // near 1 ==> good position, near 0 ==> bad position
  public computePositionScore(trees: Trees, map: Map): number {
    let ponderateAlingedAllies = 0;
    this.cell.neighborIndexes.forEach((neighborIndexe, indexDirection) => {
      if (trees.isTreeWithIndex(neighborIndexe, true)) {
        ponderateAlingedAllies += 1.5;
      }
      const secondLayerNeighCellIndex =
        map[neighborIndexe].neighborIndexes[indexDirection];
      if (trees.isTreeWithIndex(secondLayerNeighCellIndex, true)) {
        ponderateAlingedAllies += 1.25;
      }
      const thirdLayerNeighCellIndex =
        map[secondLayerNeighCellIndex].neighborIndexes[indexDirection];
      if (trees.isTreeWithIndex(thirdLayerNeighCellIndex, true)) {
        ponderateAlingedAllies += 1;
      }
    });
    return 1 - ponderateAlingedAllies / 18.75;
  }

  public computeSadow(day: number, map: Map): ShadowsMap {
    let shadows = new ShadowsMap();
    const sunDirectionIndex = day % 6;
    let i = 0;
    let shadowProjectionIndex = this.cell.neighborIndexes[sunDirectionIndex];
    while (i < this.size && shadowProjectionIndex != -1) {
      shadows[shadowProjectionIndex] = { shadowLevel: this.size };
      shadowProjectionIndex =
        map[shadowProjectionIndex].neighborIndexes[sunDirectionIndex];
      i++;
    }
    return shadows;
  }

  // near 1 ==> sun //  near 0 ==> less sun
  public computeSunnyScore(
    consecutiveShadowsMap: ConsecutiveShadowMap
  ): number {
    let numberOfDay = Object.keys(consecutiveShadowsMap).length;
    let numberOfSunnyDay = numberOfDay;
    Object.values(consecutiveShadowsMap).forEach((shadowsMap: ShadowsMap) => {
      if (shadowsMap.isShadowed(this.cell.index, this.size)) {
        numberOfSunnyDay--;
      }
    });
    return numberOfSunnyDay / numberOfDay;
  }

  public computeRichnessScore(): number {
    return this.cell.computeRichnessScore();
  }
}
