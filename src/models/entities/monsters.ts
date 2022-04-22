import { Base } from "../base";
import { Monster } from "./monster";

export class Monsters {
  private treatningMonster: Array<Monster>;

  constructor(monsters: Array<Monster>) {
    this.treatningMonster = monsters.filter((monster: Monster) =>
      monster.isFocusingAlly()
    );
  }

  public isThreatningMonsters(): boolean {
    return this.treatningMonster.length > 0;
  }

  public findNearestThreatens(base: Base): Monster {
    this.treatningMonster.forEach((monster) =>
      monster.computeDistanceFromBase(base)
    );
    this.treatningMonster.sort((monsterA, monsterB) => {
      if (monsterA.getDistanceFromBase() > monsterB.getDistanceFromBase()) {
        return 1;
      }
      return -1;
    });
    return this.treatningMonster[0];
  }
}
