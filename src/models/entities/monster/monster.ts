import { computeDistancebeetwen } from "../../../function/distance-computation";
import { Position } from "../../../utils/position";
import { Base } from "../../base";
import {
  ATK_RANGE,
  ENEMY_HIT_RANGE,
  MOVE_RANGE,
  SPELL_COST,
  WIND_RANGE,
} from "../../constant/game-constant";
import { Entity } from "../entity";

export class Monster extends Entity {
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
    super(id);
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

  public isFocusingEnemyBase() {
    return this.threatFor === 2 && this.nearBase === 1;
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
    return base.computeDistanceFrom(this.position) < 3200 && !this.shieldLife;
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

  getVx(): number {
    return this.vx;
  }

  getVy(): number {
    return this.vy;
  }

  isKillableAlone(atkPosition: Position, base: Base): boolean {
    let turnNeededToKill: number = 0;
    const AtkMonsterDistance = computeDistancebeetwen(
      atkPosition,
      this.position
    );
    if (AtkMonsterDistance > ATK_RANGE) {
      const nbTurnBeforeReach = Math.ceil(
        (AtkMonsterDistance - ATK_RANGE) / MOVE_RANGE
      );
      turnNeededToKill += nbTurnBeforeReach;
    }
    turnNeededToKill += Math.ceil(this.health / 2);
    let monsterPositionPrediction = this.position;
    let killableAlone = true;
    while (turnNeededToKill > 0 && killableAlone) {
      turnNeededToKill--;
      monsterPositionPrediction = this.position.computeMouvement(
        this.vx,
        this.vy
      );
      if (
        computeDistancebeetwen(monsterPositionPrediction, base.getPosition()) <
        ENEMY_HIT_RANGE
      ) {
        killableAlone = false;
      }
    }
    return killableAlone;
  }

  isHandlableAlone(atkPosition: Position, base: Base): boolean {
    if (this.shieldLife || base.getMana() <= SPELL_COST * 3) {
      return this.isKillableAlone(atkPosition, base);
    }
    const AtkMonsterDistance = computeDistancebeetwen(
      atkPosition,
      this.position
    );
    if (AtkMonsterDistance < WIND_RANGE) {
      return true;
    }
    let nbTurnBeforeReach = Math.ceil(
      (AtkMonsterDistance - ATK_RANGE) / MOVE_RANGE
    );
    let monsterPositionPrediction = this.position;
    let handableAlone = true;
    while (nbTurnBeforeReach > 0 && handableAlone) {
      nbTurnBeforeReach--;
      monsterPositionPrediction = this.position.computeMouvement(
        this.vx,
        this.vy
      );
      if (
        computeDistancebeetwen(monsterPositionPrediction, base.getPosition()) <
        ENEMY_HIT_RANGE
      ) {
        handableAlone = false;
      }
    }
    return handableAlone;
  }
}
