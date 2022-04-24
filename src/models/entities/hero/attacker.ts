import { Position } from "../../../utils/position";
import { Action } from "../../action";
import { Base } from "../../base";
import {
  ATTACK_MODE_TURN_TRESHOLD,
  ENEMY_HEALTH_TRESHOLD_FOR_SHIELD,
  MANA_DISABLE_ATTACK_CONTROL_TRESHOLD,
} from "../../constant/game-constant";
import { Monsters } from "../monster/monsters";
import { EnemyHeroes } from "./enemyHeroes";

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

  computeAction(
    monsters: Monsters,
    base: Base,
    turnCount: number,
    enemyHeroes: EnemyHeroes
  ): Action {
    if (turnCount < ATTACK_MODE_TURN_TRESHOLD) {
      return this.earlyGameActionComputing(monsters, base, turnCount);
    }
    return this.lateGameActionComputing(monsters, base, turnCount, enemyHeroes);
  }

  private earlyGameActionComputing(
    monsters: Monsters,
    base: Base,
    turnCount: number
  ): Action {
    let monsterToAttack = monsters.findNearestFuturThreat(base);
    if (!monsterToAttack) {
      monsterToAttack = monsters.findNearestMonster(base, this.position, 800);
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
    turnCount: number,
    enemyHeroes: EnemyHeroes
  ): Action {
    const attackingPosition = base.getAttackerPosition(turnCount);

    //moving into attack position
    if (!this.position.equals(attackingPosition)) {
      const monsterEligibleTocontrol = monsters.findOneEligibleToControl(
        this.position
      );
      if (
        monsterEligibleTocontrol &&
        base.getMana() > MANA_DISABLE_ATTACK_CONTROL_TRESHOLD
      ) {
        return new Action(
          this.id,
          "SPELL CONTROL " +
            monsterEligibleTocontrol.getId() +
            " " +
            base.getEnemyPosition().getX() +
            " " +
            base.getEnemyPosition().getY()
        );
      }
      return new Action(
        this.id,
        attackingPosition.convertIntoMoveAction() + " " + base.getMana()
      );
    }
    //look to control enemy
    const enemyHeroEligibleTocontrol = enemyHeroes.findEligibleHeroToControl(
      base,
      this.position
    );
    if (
      enemyHeroEligibleTocontrol &&
      base.getMana() > MANA_DISABLE_ATTACK_CONTROL_TRESHOLD
    ) {
      return new Action(
        this.id,
        "SPELL CONTROL " +
          enemyHeroEligibleTocontrol.getId() +
          " " +
          base.getPosition().getX() +
          " " +
          base.getPosition().getY()
      );
    }

    //look for a spell shield on monsters
    const monstersAttackinEnemy =
      monsters.findOneInBaseRangeWithMoreHpEligibleToShield(
        base,
        this.position
      );
    if (
      monstersAttackinEnemy &&
      monstersAttackinEnemy.getHealth() >= ENEMY_HEALTH_TRESHOLD_FOR_SHIELD
    ) {
      return new Action(
        this.id,
        "SPELL SHIELD " + monstersAttackinEnemy.getId()
      );
    }
    //look for a wind on monster
    if (monsters.isOneInWindRangeAround(this.position)) {
      return new Action(
        this.id,
        "SPELL WIND " +
          base.getEnemyPosition().getX() +
          " " +
          base.getEnemyPosition().getY()
      );
    }
    //look for control on monsters
    const monsterEligibleTocontrol = monsters.findOneEligibleToControl(
      this.position
    );
    if (monsterEligibleTocontrol) {
      return new Action(
        this.id,
        "SPELL CONTROL " +
          monsterEligibleTocontrol.getId() +
          " " +
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
