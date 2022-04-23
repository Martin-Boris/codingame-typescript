import { computeDistancebeetwen } from "../../../function/distance-computation";
import { Position } from "../../../utils/position";
import { Base } from "../../base";
import { ENEMY_HIT_RANGE } from "../../constant/game-constant";
import { Entity } from "../entity";

export class Monster implements Entity {
  private id: number;
  private position: Position;
  private health: number;
  private vx: number;
  private vy: number;
  private nearBase: number;
  private threatFor: number;
  private distanceFromBase: number;
  private attacked: boolean;
  private shieldLife: number;

  constructor(
    id: number,
    x: number,
    y: number,
    health: number,
    vx: number,
    vy: number,
    nearBase: number,
    threatFor: number,
    shieldLife: number
  ) {
    this.id = id;
    this.position = new Position(x, y);
    this.health = health;
    this.vx = vx;
    this.vy = vy;
    this.nearBase = nearBase;
    this.threatFor = threatFor;
    this.shieldLife = shieldLife;
  }

  public isFocusingAlly(): boolean {
    return this.threatFor === 1 && this.nearBase === 1;
  }

  public isFuturOrImmediateTreat(): boolean {
    return this.threatFor === 1;
  }

  public isFuturTreat(): boolean {
    return this.threatFor === 1 && this.nearBase != 1;
  }

  public isFriendly(): boolean {
    return this.threatFor === 0;
  }

  public getX(): number {
    return this.position.getX();
  }

  public getY(): number {
    return this.position.getY();
  }

  public computeDistanceFromBase(base: Base) {
    this.distanceFromBase = base.computePowDistanceFrom(this.position);
  }

  public getDistanceFromBase() {
    return this.distanceFromBase;
  }

  public getId() {
    return this.id;
  }

  setAttacked() {
    this.attacked = true;
  }

  isAttacked() {
    return this.attacked;
  }

  isWindEligible(base: Base): boolean {
    return base.computeDistanceFrom(this.position) < 3202 && !this.shieldLife;
  }

  getPosition(): Position {
    return this.position;
  }

  getHealth(): number {
    return this.health;
  }

  getShieldLife(): number {
    return this.shieldLife;
  }

  isFuturEnemyThreat(): boolean {
    return this.threatFor === 2;
  }
}
