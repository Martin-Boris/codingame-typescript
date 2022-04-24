import { computeDistancebeetwen } from "../../../function/distance-computation";
import { Position } from "../../../utils/position";
import { Base } from "../../base";
import {
  CONTROL_HEALTH_TRESHOLD,
  CONTROL_RANGE,
  ENEMY_FOCUS_RANGE,
  SHIELD_RANGE,
  WIND_RANGE,
} from "../../constant/game-constant";
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
        monster.isFuturOrImmediateTreat() &&
        (!monster.isAttacked() || monster.getShieldLife())
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

  public findNearestFuturThreat(position: Position): Monster {
    const futurOrImmediatThreat = this.monsters.filter((monster: Monster) =>
      monster.isFuturTreat()
    );
    let minDistance = Number.MAX_VALUE;
    let monsterToFocus: Monster;
    futurOrImmediatThreat.forEach((monster) => {
      const distance = computeDistancebeetwen(monster.getPosition(), position);
      if (distance < minDistance) {
        monsterToFocus = monster;
      }
    });
    return monsterToFocus;
  }

  public findNearestMonster(
    base: Base,
    position: Position,
    maxDistance: number
  ): Monster {
    const monsterFree = this.monsters.filter(
      (monster: Monster) =>
        !monster.isAttacked() &&
        computeDistancebeetwen(monster.getPosition(), position) <= maxDistance
    );
    let minDistance = Number.MAX_VALUE;
    let monsterToFocus: Monster;
    monsterFree.forEach((monster) => {
      const distance = computeDistancebeetwen(monster.getPosition(), position);
      if (distance < minDistance) {
        monsterToFocus = monster;
      }
    });
    return monsterToFocus;
  }

  isOneInWindRangeAround(position: Position) {
    return this.monsters.some(
      (monster) =>
        computeDistancebeetwen(position, monster.getPosition()) <= WIND_RANGE
    );
  }

  findOneInBaseRangeWithMoreHpEligibleToShield(
    base: Base,
    heroPosition: Position
  ): Monster {
    const monstersInEnemyBase = this.monsters.filter(
      (monster) =>
        computeDistancebeetwen(base.getEnemyPosition(), monster.getPosition()) <
          ENEMY_FOCUS_RANGE &&
        !monster.getShieldLife() &&
        computeDistancebeetwen(monster.getPosition(), heroPosition) <=
          SHIELD_RANGE
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

  findOneEligibleToControl(heroPosition: Position) {
    const monstersEligibleToControl = this.monsters.filter(
      (monster) =>
        !monster.isFuturEnemyThreat() &&
        computeDistancebeetwen(monster.getPosition(), heroPosition) <=
          CONTROL_RANGE &&
        !monster.isFocusingAlly() &&
        monster.getHealth() > CONTROL_HEALTH_TRESHOLD &&
        !monster.getShieldLife()
    );
    return monstersEligibleToControl[0];
  }

  isOneFocusingEnemyBase(): boolean {
    return this.monsters.some((monster) => monster.isFocusingEnemyBase());
  }

  findMonsterInRange(monsterToAttack: Monster, range: number): Monster {
    const monstersInRange = this.monsters.filter(
      (monster) =>
        monsterToAttack.getId() != monster.getId() &&
        computeDistancebeetwen(
          monsterToAttack.getPosition(),
          monster.getPosition()
        ) <= range
    );
    return monstersInRange[0];
  }

  findMonsterOnEnemyBase(base: Base): Array<Monster> {
    return this.monsters.filter((monster) => monster.isFocusingEnemyBase());
  }
}
