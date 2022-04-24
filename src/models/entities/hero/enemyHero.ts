import { Position } from "../../../utils/position";

export class EnemyHero {
  private id: number;
  private position: Position;
  private shieldLife: number;
  private isControlled: number;

  constructor(
    id: number,
    x: number,
    y: number,
    shieldLife: number,
    isControlled: number
  ) {
    this.id = id;
    this.position = new Position(x, y);
    this.shieldLife = shieldLife;
    this.isControlled = isControlled;
  }

  isNotShield(): boolean {
    return this.shieldLife === 0;
  }

  getPosition(): Position {
    return this.position;
  }

  getId(): number {
    return this.id;
  }
}
