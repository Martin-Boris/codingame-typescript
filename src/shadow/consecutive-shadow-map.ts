import { Tree } from "../io/tree";
import { ShadowsMap } from "./shadows-map";

export class ConsecutiveShadowMap {
  [day: number]: ShadowsMap;

  public add(day: number, shadowsMap: ShadowsMap) {
    this[day] = shadowsMap;
  }
}
