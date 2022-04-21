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

  public findNearestThreatens(): Monster {
    return this.treatningMonster[0];
  }
}
