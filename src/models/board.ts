import { Action } from "./action";
import { Base } from "./base";
import { Attacker } from "./entities/hero/attacker";
import { Brawler } from "./entities/hero/brawler";
import { Defensor } from "./entities/hero/defensor";
import { Hero } from "./entities/hero/hero";
import { Monsters } from "./entities/monster/monsters";

export class Board {
  private allyBase: Base;
  private monsters: Monsters;
  private defensor: Defensor;
  private brawler: Brawler;
  private attacker: Attacker;
  private turnCount: number;

  constructor(
    allyBase: Base,
    allyHeros: Array<Hero>,
    monsters: Monsters,
    turnCount: number
  ) {
    this.allyBase = allyBase;
    this.monsters = monsters;
    this.turnCount = turnCount;

    this.defensor = new Defensor(
      allyHeros[0].id,
      allyHeros[0].x,
      allyHeros[0].y
    );

    this.brawler = new Brawler(allyHeros[1].id, allyHeros[1].x, allyHeros[1].y);

    this.attacker = new Attacker(
      allyHeros[2].id,
      allyHeros[2].x,
      allyHeros[2].y
    );
  }

  public triggerAction(): Array<String> {
    const actions: Array<Action> = [];
    const defensorAction = this.defensor.computeAction(
      this.monsters,
      this.allyBase
    );
    actions.push(defensorAction);

    const brawlerAction = this.brawler.computeAction(
      this.monsters,
      this.allyBase
    );
    actions.push(brawlerAction);

    const attackerAction = this.attacker.computeAction(
      this.monsters,
      this.allyBase,
      this.turnCount
    );
    actions.push(attackerAction);

    return actions
      .sort((actionA, actionB) => actionA.order - actionB.order)
      .map((action) => action.action);
  }
}
