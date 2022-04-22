import {
  BASE_POSITION_X_RIGHT_CORNER,
  BASE_POSITION_Y_RIGHT_CORNER,
} from "./constant/game-constant";

export class Base {
  private x: number;
  private y: number;
  private health: number;
  private mana: number;

  constructor(x: number, y: number, health: number, mana: number) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.mana = mana;
  }

  public getDefensivePositionAction(): Array<String> {
    if (this.x === 0 && this.y === 0) {
      return ["MOVE 4000 800", "MOVE 2930 2700", "MOVE 1200 3700"];
    }
    return ["MOVE 16500 5000", "MOVE 14400 6000", "MOVE 13600 7900"];
  }

  public computeDistanceFrom(x: number, y: number): number {
    if (this.x === 0 && this.y === 0) {
      return x * x + y * y;
    }
    const dx = BASE_POSITION_X_RIGHT_CORNER - x;
    const dy = BASE_POSITION_Y_RIGHT_CORNER - y;
    return dx * dx + dy * dy;
  }
}
