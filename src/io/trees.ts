import { ConsecutiveShadowMap } from "../shadow/consecutive-shadow-map";
import { ShadowsMap } from "../shadow/shadows-map";
import { Map } from "./input";
import { Tree } from "./tree";

export const NBR_DAY_SHADOW_GENERATION = 6;

export class Trees {
  trees: Tree[] = [];

  public static fromTreeArray(trees: Tree[]) {
    return trees.reduce((previousValue, tree) => {
      previousValue.add(tree);
      return previousValue;
    }, new Trees());
  }

  public add(tree: Tree): void {
    this.trees.push(tree);
  }

  public isTreeWithIndex(index: number, mine: boolean): boolean {
    return this.trees.some(
      (tree) => tree.cell.index === index && tree.isMine === mine
    );
  }

  public computeShadow(day: number, map: Map): ShadowsMap {
    let shadowMap: ShadowsMap = new ShadowsMap();
    this.trees.forEach((tree) => {
      const sunIndex = day % 6;
      let i = 0;
      let shadowProjectionIndex = tree.cell.neighborIndexes[sunIndex];
      while (i < tree.size && shadowProjectionIndex != -1) {
        shadowMap.add(shadowProjectionIndex, tree.size);
        shadowProjectionIndex =
          map[shadowProjectionIndex].neighborIndexes[sunIndex];
        i++;
      }
    });
    return shadowMap;
  }

  public computeConsecutiveShadow(day: number, map: Map) {
    const shadowsMapFor6Days = new ConsecutiveShadowMap();
    const endDay = day + NBR_DAY_SHADOW_GENERATION;
    while (day < endDay && day <= 23) {
      shadowsMapFor6Days.add(day, this.computeShadow(day, map));
      day++;
    }
    return shadowsMapFor6Days;
  }

  public getTreeAt(cellIndex: number): Tree {
    return this.trees.find((tree) => tree.cell.index === cellIndex);
  }

  public isAlreadyASeed(): boolean {
    return this.trees.some((tree) => tree.isMine && tree.size === 0);
  }
}
