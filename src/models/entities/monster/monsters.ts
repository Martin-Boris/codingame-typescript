import { Base } from "../../base";
import { Monster } from "./monster";

export class Monsters {
  private immediatTreat: Array<Monster>;
  private futurOrImmediatTreat: Array<Monster>;
  private friendly: Array<Monster>;

  constructor(monsters: Array<Monster>) {
    this.immediatTreat = monsters.filter((monster: Monster) =>
      monster.isFocusingAlly()
    );
    this.futurOrImmediatTreat = monsters.filter((monster: Monster) =>
      monster.isFuturOrImmediateTreat()
    );

    this.friendly = monsters.filter((monster: Monster) => monster.isFriendly());
  }

  public isImmediatThreat(): boolean {
    return this.immediatTreat.length > 0;
  }

  public isFuturOrImmediatTreat(): boolean {
    return this.futurOrImmediatTreat.length > 0;
  }

  public findNearestImmediatThreat(base: Base): Monster {
    this.immediatTreat.forEach((monster) =>
      monster.computeDistanceFromBase(base)
    );
    this.immediatTreat.sort((monsterA, monsterB) => {
      if (monsterA.getDistanceFromBase() > monsterB.getDistanceFromBase()) {
        return 1;
      }
      return -1;
    });
    return this.immediatTreat[0];
  }

  public findNearestFuturOrImmediatThreat(base: Base): Monster {
    this.futurOrImmediatTreat.forEach((monster) =>
      monster.computeDistanceFromBase(base)
    );
    this.futurOrImmediatTreat.sort((monsterA, monsterB) => {
      if (monsterA.getDistanceFromBase() > monsterB.getDistanceFromBase()) {
        return 1;
      }
      return -1;
    });
    return this.futurOrImmediatTreat[0];
  }

  public findNearestFriendly(base: Base): Monster {
    this.friendly.forEach((monster) => monster.computeDistanceFromBase(base));
    this.friendly.sort((monsterA, monsterB) => {
      if (monsterA.getDistanceFromBase() > monsterB.getDistanceFromBase()) {
        return 1;
      }
      return -1;
    });
    return this.friendly[0];
  }

  public remove(monsterToRemove: Monster) {
    this.futurOrImmediatTreat = this.futurOrImmediatTreat.filter(
      (monster) => monster.getId() != monsterToRemove.getId()
    );
  }
}
