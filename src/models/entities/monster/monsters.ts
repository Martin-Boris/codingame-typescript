import { computeDistancebeetwen } from "../../../function/distance-computation";
import { Position } from "../../../utils/position";
import { Base } from "../../base";
import { ENEMY_FOCUS_RANGE, WIND_RANGE } from "../../constant/game-constant";
import { Monster } from "./monster";

export class Monsters {
  private monsters: Array<Monster>;

  constructor(monsters: Array<Monster>) {
    this.monsters = monsters;
  }

  public isImmediatThreat(): boolean {
    return (
      this.monsters.filter((monster: Monster) => monster.isFocusingAlly())
        .length > 0
    );
  }

  public isFuturOrImmediatTreat(): boolean {
    return (
      this.monsters.filter((monster: Monster) =>
        monster.isFuturOrImmediateTreat()
      ).length > 0
    );
  }

  public findNearestImmediatThreat(base: Base): Monster {
    const nearestImmediatThreat = this.monsters.filter((monster: Monster) =>
      monster.isFocusingAlly()
    );
    nearestImmediatThreat.forEach((monster) =>
      monster.computeDistanceFromBase(base)
    );
    nearestImmediatThreat.sort((monsterA, monsterB) => {
      if (monsterA.getDistanceFromBase() > monsterB.getDistanceFromBase()) {
        return 1;
      }
      return -1;
    });
    return nearestImmediatThreat[0];
  }

  public findNearestFuturOrImmediatThreat(base: Base): Monster {
    const futurOrImmediatThreat = this.monsters.filter(
      (monster: Monster) =>
        monster.isFuturOrImmediateTreat() && !monster.isAttacked()
    );
    futurOrImmediatThreat.forEach((monster) =>
      monster.computeDistanceFromBase(base)
    );
    futurOrImmediatThreat.sort((monsterA, monsterB) => {
      if (monsterA.getDistanceFromBase() > monsterB.getDistanceFromBase()) {
        return 1;
      }
      return -1;
    });
    return futurOrImmediatThreat[0];
  }

  public findNearestMonster(base: Base): Monster {
    const monsterFree = this.monsters.filter(
      (monster: Monster) => !monster.isAttacked()
    );
    monsterFree.forEach((monster) => monster.computeDistanceFromBase(base));
    monsterFree.sort((monsterA, monsterB) => {
      if (monsterA.getDistanceFromBase() > monsterB.getDistanceFromBase()) {
        return 1;
      }
      return -1;
    });
    return this.monsters[0];
  }

  isOneInWindRangeAround(position: Position) {
    return this.monsters.some(
      (monster) =>
        computeDistancebeetwen(position, monster.getPosition()) <= WIND_RANGE
    );
  }

  findOneInBaseRangeWithMoreHp(base: Base): Monster {
    const monstersInEnemyBase = this.monsters.filter(
      (monster) =>
        computeDistancebeetwen(base.getEnemyPosition(), monster.getPosition()) <
          ENEMY_FOCUS_RANGE && !monster.getShieldLife()
    );
    let maxHp = 0;
    let monsterWithMaxHp: Monster;
    monstersInEnemyBase.forEach((monster) => {
      if (monster.getHealth() > maxHp) {
        maxHp = monster.getHealth();
        monsterWithMaxHp = monster;
      }
    });
    return monsterWithMaxHp;
  }
}
