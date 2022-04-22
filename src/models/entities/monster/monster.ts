import { Base } from "../../base";
import { Entity } from "../entity";

export class Monster implements Entity {
  private id: number;
  private x: number;
  private y: number;
  private health: number;
  private vx: number;
  private vy: number;
  private nearBase: number;
  private threatFor: number;
  private distanceFromBase: number;

  constructor(
    id: number,
    x: number,
    y: number,
    health: number,
    vx: number,
    vy: number,
    nearBase: number,
    threatFor: number
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.health = health;
    this.vx = vx;
    this.vy = vy;
    this.nearBase = nearBase;
    this.threatFor = threatFor;
  }

  public isFocusingAlly(): boolean {
    return this.threatFor === 1 && this.nearBase === 1;
  }

  public isFuturTreat(): boolean {
    return this.nearBase === 1;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public computeDistanceFromBase(base: Base) {
    this.distanceFromBase = base.computeDistanceFrom(this.x, this.y);
  }

  public getDistanceFromBase() {
    return this.distanceFromBase;
  }
}
