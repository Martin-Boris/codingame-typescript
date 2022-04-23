import { Action } from "./action";
import { Base } from "./base";
import { Heroes } from "./entities/hero/heroes";
import { Monsters } from "./entities/monster/monsters";

export class Board {
  private allyBase: Base;
  private allyHeros: Heroes;
  private monsters: Monsters;

  constructor(allyBase: Base, allyHeros: Heroes, monsters: Monsters) {
    this.allyBase = allyBase;
    this.allyHeros = allyHeros;
    this.monsters = monsters;
  }

  public triggerAction(): Array<String> {
    if (!this.monsters.isImmediatThreat()) {
      return this.allyBase.getDefensivePositionAction();
    }
    const threatensMonster = this.monsters.findNearestImmediatThreat(
      this.allyBase
    );
    const action =
      "MOVE " + threatensMonster.getX() + " " + threatensMonster.getY();
    return [action, action, action];
  }

  public triggerActionV2(): Array<String> {
    const actions: Array<Action> = [];
    while (!this.allyHeros.isEmpty()) {
      const threatenMonster = this.monsters.findNearestFuturOrImmediatThreat(
        this.allyBase
      );
      const hero = this.allyHeros.findNearestHero(threatenMonster);
      actions.push(
        new Action(
          hero.getId(),
          "MOVE " + threatenMonster.getX() + " " + threatenMonster.getY()
        )
      );
      this.allyHeros.remove(hero);
      this.monsters.remove(threatenMonster);
    }
    return actions
      .sort((actionA, actionB) => actionA.order - actionB.order)
      .map((action) => action.action);
  }
}
