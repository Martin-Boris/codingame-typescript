import { Base } from "./base";
import { Hero } from "./entities/hero";
import { Monster } from "./entities/monster";
import { Monsters } from "./entities/monsters";

export class Board {
  private allyBase: Base;
  private allyHeros: Array<Hero>;
  private monsters: Monsters;

  constructor(
    allyBase: Base,
    allyHeros: Array<Hero>,
    monsters: Array<Monster>
  ) {
    this.allyBase = allyBase;
    this.allyHeros = allyHeros;
    this.monsters = new Monsters(monsters);
  }

  public triggerHeroAction(): Array<String> {
    if (!this.monsters.isThreatningMonsters()) {
      return this.allyBase.getDefensivePositionAction();
    }
    const threatensMonster = this.monsters.findNearestThreatens();
    const action =
      "MOVE " + threatensMonster.getX() + " " + threatensMonster.getY();
    return [action, action, action];
  }
}
