import { Position } from "../../../utils/position";
import { Action } from "../../action";
import { Base } from "../../base";
import {
  ATTACK_MODE_TURN_TRESHOLD,
  ENEMY_HEALTH_TRESHOLD_FOR_SHIELD,
} from "../../constant/game-constant";
import { Monsters } from "../monster/monsters";

export class Attacker {
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

  computeAction(monsters: Monsters, base: Base, turnCount: number): Action {
    if (turnCount < ATTACK_MODE_TURN_TRESHOLD) {
      return this.earlyGameActionComputing(monsters, base, turnCount);
    }
    return this.lateGameActionComputing(monsters, base, turnCount);
  }

  private earlyGameActionComputing(
    monsters: Monsters,
    base: Base,
    turnCount: number
  ): Action {
    let monsterToAttack = monsters.findNearestFuturOrImmediatThreat(base);
    if (!monsterToAttack) {
      monsterToAttack = monsters.findNearestMonster(base);
    }
    if (!monsterToAttack) {
      return new Action(
        this.id,
        base.getAttackerPosition(turnCount).convertIntoMoveAction()
      );
    }
    const action = new Action(
      this.id,
      "MOVE " + monsterToAttack.getX() + " " + monsterToAttack.getY()
    );
    monsterToAttack.setAttacked();
    return action;
  }

  private lateGameActionComputing(
    monsters: Monsters,
    base: Base,
    turnCount: number
  ): Action {
    const attackingPosition = base.getAttackerPosition(turnCount);
    if (!this.position.equals(attackingPosition)) {
      return new Action(this.id, attackingPosition.convertIntoMoveAction());
    }
    const monstersAttackinEnemy = monsters.findOneInBaseRangeWithMoreHp(base);
    if (
      monstersAttackinEnemy &&
      monstersAttackinEnemy.getHealth() >= ENEMY_HEALTH_TRESHOLD_FOR_SHIELD
    ) {
      return new Action(
        this.id,
        "SPELL SHIELD " + monstersAttackinEnemy.getId()
      );
    }
    if (monsters.isOneInWindRangeAround(this.position)) {
      return new Action(
        this.id,
        "SPELL WIND " +
          base.getEnemyPosition().getX() +
          " " +
          base.getEnemyPosition().getY()
      );
    }
    return new Action(this.id, "WAIT");
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
