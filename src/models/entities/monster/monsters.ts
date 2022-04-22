import { Base } from "../../base";
import { Monster } from "./monster";

export class Monsters {
  private immediatTreat: Array<Monster>;
  private futurOrImmediatTreat: Array<Monster>;

  constructor(monsters: Array<Monster>) {
    this.immediatTreat = monsters.filter((monster: Monster) =>
      monster.isFocusingAlly()
    );
    this.futurOrImmediatTreat = monsters.filter((monster: Monster) => {
      monster.isFuturTreat();
    });
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
}
