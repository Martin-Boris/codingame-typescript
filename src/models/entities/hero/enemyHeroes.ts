import { computeDistancebeetwen } from "../../../function/distance-computation";
import { Position } from "../../../utils/position";
import { Base } from "../../base";
import {
  CONTROL_RANGE,
  MANA_DISABLE_ATTACK_CONTROL_TRESHOLD,
} from "../../constant/game-constant";
import { EnemyHero } from "./enemyHero";

export class EnemyHeroes {
  private enemyHeros: Array<EnemyHero>;

  constructor(enemyHeroes: Array<EnemyHero>) {
    this.enemyHeros = enemyHeroes;
  }

  findEligibleHeroToControl(base: Base, position: Position) {
    const eligibleEnemy = this.enemyHeros.filter(
      (enemy) =>
        enemy.isNotShield() &&
        computeDistancebeetwen(enemy.getPosition(), position) < CONTROL_RANGE
    );
    return eligibleEnemy[0];
  }

  isAtLeastOneHeroAttackingBase(base: Base): boolean {
    return this.enemyHeros.some(
      (hero) =>
        computeDistancebeetwen(base.getPosition(), hero.getPosition()) < 7000
    );
  }
}
