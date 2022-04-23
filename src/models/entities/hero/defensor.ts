import { isInWindRange } from "../../../function/distance-computation";
import { Position } from "../../../utils/position";
import { Action } from "../../action";
import { Base } from "../../base";
import { Entity } from "../entity";
import { Monsters } from "../monster/monsters";

export class Defensor implements Entity {
  private id: number;
  private x: number;
  private y: number;
  private position: Position;

  constructor(id: number, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.position = new Position(x, y);
  }

  computeAction(monsters: Monsters, base: Base): Action {
    let monsterToAttack = monsters.findNearestFuturOrImmediatThreat(base);
    if (!monsterToAttack) {
      return new Action(this.id, base.getDefensorPosition());
    }
    if (
      isInWindRange(monsterToAttack.getPosition(), this.position) &&
      monsterToAttack.needAWind(base)
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
    const action = new Action(
      this.id,
      "MOVE " + monsterToAttack.getX() + " " + monsterToAttack.getY()
    );
    monsterToAttack.setAttacked();
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
}
