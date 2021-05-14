import { GameState, Map } from "../io/input";
import { Trees } from "../io/trees";
import { ConsecutiveShadowMap } from "../shadow/consecutive-shadow-map";

export interface Action {
  type: "SEED" | "GROW" | "COMPLETE";
  toString(): string;
  computeScore(
    consecutiveShadowMap: ConsecutiveShadowMap,
    gameState: GameState,
    map: Map
  ): number;
}
