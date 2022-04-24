import { computeDistancebeetwen } from "../../../function/distance-computation";
import { Position } from "../../../utils/position";
import { Base } from "../../base";
import { CONTROL_RANGE } from "../../constant/game-constant";
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
}
