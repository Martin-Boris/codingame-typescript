import { Base } from "./base";
import { Hero } from "./entities/hero/hero";
import { Monster } from "./entities/monster/monster";
import { Monsters } from "./entities/monster/monsters";

export class Board {
  private allyBase: Base;
  private allyHeros: Array<Hero>;
  private monsters: Monsters;

  constructor(allyBase: Base, allyHeros: Array<Hero>, monsters: Monsters) {
    this.allyBase = allyBase;
    this.allyHeros = allyHeros;
    this.monsters = monsters;
  }

  public triggerAction(): Array<String> {
    if (!this.monsters.isImmediatThreat()) {
      return this.allyBase.getDefensivePositionAction();
    }
    const threatensMonster = this.monsters.findNearestFuturOrImmediatThreat(
      this.allyBase
    );
    const action =
      "MOVE " + threatensMonster.getX() + " " + threatensMonster.getY();
    return [action, action, action];
  }

  public triggerActionV2(): Array<String> {
    while (allyHeros.length > 0) {}
  }
}
