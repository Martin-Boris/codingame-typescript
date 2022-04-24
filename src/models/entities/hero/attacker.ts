import { Monster } from "../../../../dist/codingame";
import { computeDistancebeetwen } from "../../../function/distance-computation";
import { generateRandomNumber } from "../../../function/random";
import { Position } from "../../../utils/position";
import { Action } from "../../action";
import { Base } from "../../base";
import {
  ATTACK_MODE_TURN_TRESHOLD,
  ENEMY_HEALTH_TRESHOLD_FOR_SHIELD,
  MANA_DISABLE_ATTACK_CONTROL_TRESHOLD,
  MANA_DISABLE_ATTACK_WIND_TRESHOLD,
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
    const monsterToAttack = monsters.findNearestMonster(
      base,
      this.position,
      2200
    );
    if (
      monsterToAttack &&
      computeDistancebeetwen(this.position, base.getPosition()) > 7000
    ) {
      const action = new Action(
        this.id,
        "MOVE " + monsterToAttack.getX() + " " + monsterToAttack.getY()
      );
      monsterToAttack.setAttacked();
      return action;
    }
    return new Action(
      this.id,
      this.computeEarlyGameRoamingPosition().convertIntoMoveAction()
    );
  }

  private lateGameActionComputing(
    monsters: Monsters,
    base: Base,
    turnCount: number,
    enemyHeroes: EnemyHeroes
  ): Action {
    //moving into attack position
    if (computeDistancebeetwen(this.position, base.getEnemyPosition()) > 6800) {
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
        this.computeRoamingAttackPosition(base).convertIntoMoveAction()
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
    if (
      monsters.isOneInWindRangeAround(this.position) &&
      base.getMana() > MANA_DISABLE_ATTACK_WIND_TRESHOLD
    ) {
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
      this.computeRoamingAttackPosition(base).convertIntoMoveAction()
    );
  }

  public getX(): number {
    return this.x;
  }
  public getY(): number {
    return this.y;
  }

  public computeRoamingAttackPosition(base: Base): Position {
    const a = -3677 / 3630;
    let xMin: number;
    let xMax: number;
    let b: number;
    if (base.getPosition().isPositionLeft()) {
      b = 6807260 / 363;
      xMin = 11800;
      xMax = 15430;
    } else {
      b = 9865243 / 1210;
      xMin = 2200;
      xMax = 5877;
    }
    const x = generateRandomNumber(xMin, xMax);
    return new Position(x, Math.round(a * x + b));
  }

  public computeEarlyGameRoamingPosition(): Position {
    const a = -4600 / 3419;
    const xMin: number = 6881;
    const xMax: number = 10300;
    const b: number = 54901800 / 3419;
    const x = generateRandomNumber(xMin, xMax);
    return new Position(x, Math.round(a * x + b));
  }

  public getId(): number {
    return this.id;
  }

  getPosition(): Position {
    return this.position;
  }
}
