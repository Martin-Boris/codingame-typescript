import { Base } from "../../base";
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

  public remove(monsterToRemove: Monster) {
    const newMonsters = [];
    this.monsters.forEach((monster) => {
      if (monster.getId() != monsterToRemove) {
        newMonsters.push(monster);
      }
    });
    this.monsters = newMonsters;
  }
}
