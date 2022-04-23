import { Position } from "../utils/position";
import {
  BASE_POSITION_X_RIGHT_CORNER,
  BASE_POSITION_Y_RIGHT_CORNER,
  LEFT_BASE_POSITION,
  RIGHT_BASE_POSITION,
} from "./constant/game-constant";

export class Base {
  private health: number;
  private mana: number;
  private position: Position;

  constructor(x: number, y: number, health: number, mana: number) {
    this.position = new Position(x, y);
    this.health = health;
    this.mana = mana;
  }

  public getDefensivePositionAction(): Array<String> {
    if (this.position.isPositionLeft()) {
      return ["MOVE 4000 800", "MOVE 2930 2700", "MOVE 1200 3700"];
    }
    return ["MOVE 16500 5000", "MOVE 14400 6000", "MOVE 13600 7900"];
  }

  public computePowDistanceFrom(position: Position): number {
    if (this.position.isPositionLeft()) {
      return Math.pow(position.getX(), 2) + Math.pow(position.getY(), 2);
    }
    const dx = BASE_POSITION_X_RIGHT_CORNER - position.getX();
    const dy = BASE_POSITION_Y_RIGHT_CORNER - position.getY();
    return Math.pow(dx, 2) + Math.pow(dy, 2);
  }

  public computeDistanceFrom(position: Position): number {
    if (this.position.isPositionLeft()) {
      return Math.sqrt(
        Math.pow(position.getX(), 2) + Math.pow(position.getY(), 2)
      );
    }
    const dx = BASE_POSITION_X_RIGHT_CORNER - position.getX();
    const dy = BASE_POSITION_Y_RIGHT_CORNER - position.getY();
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

  public getDefensorPosition(): String {
    if (this.position.isPositionLeft()) {
      return "MOVE 3496 2960";
    }
    return "MOVE 14389 6370";
  }

  public getBralwerPosition(): String {
    if (this.position.isPositionLeft()) {
      return "MOVE 7721 2706";
    }
    return "MOVE 12149 3876";
  }

  public getAttackerPosition(): String {
    if (this.position.isPositionLeft()) {
      return "MOVE 4666 6116";
    }
    return "MOVE 9604 6523";
  }

  getEnemyPosition(): Position {
    if (this.position.isPositionLeft()) {
      return RIGHT_BASE_POSITION;
    }
    return LEFT_BASE_POSITION;
  }

  transpositionCoeff(): number {
    if (this.position.isPositionLeft()) {
      return 1;
    }
    return -1;
  }
}
