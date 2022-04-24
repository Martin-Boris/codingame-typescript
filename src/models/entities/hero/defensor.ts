import { isInWindRange } from "../../../function/distance-computation";
import { Position } from "../../../utils/position";
import { Action } from "../../action";
import { Base } from "../../base";
import { Entity } from "../entity";
import { Monsters } from "../monster/monsters";

export class Defensor extends Entity {
  private x: number;
  private y: number;
  private position: Position;
  private shieldLife: number;

  constructor(id: number, x: number, y: number, shieldLife: number) {
    super(id);
    this.x = x;
    this.y = y;
    this.position = new Position(x, y);
    this.shieldLife = shieldLife;
  }

  computeAction(monsters: Monsters, base: Base): Action {
    let monsterToAttack = monsters.findNearestFuturOrImmediatThreat(base);
    if (!monsterToAttack) {
      return new Action(this.id, base.getDefensorPosition());
    }
    if (
      isInWindRange(monsterToAttack.getPosition(), this.position) &&
      monsterToAttack.isWindEligible(base) &&
      base.getMana() >= 10
    ) {
      const action = new Action(
        this.id,
        "SPELL WIND " +
          base.getEnemyPosition().getX() +
          " " +
          base.getEnemyPosition().getY()
      );
      monsterToAttack.setAttacked();
      return action;
    }
    const action = super.computeAttackMove(
      monsters,
      monsterToAttack,
      this.position
    );
    return action;
  }

  public getX(): number {
    return this.x;
  }
  public getY(): number {
    return this.y;
  }

  public getId(): number {
    return this.id;
  }

  getPosition(): Position {
    return this.position;
  }

  getShieldLife() {
    return this.shieldLife;
  }
}
