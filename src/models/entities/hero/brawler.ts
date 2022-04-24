import { computeDistancebeetwen } from "../../../function/distance-computation";
import { Position } from "../../../utils/position";
import { Action } from "../../action";
import { Base } from "../../base";
import { SHIELD_RANGE } from "../../constant/game-constant";
import { Entity } from "../entity";
import { Monsters } from "../monster/monsters";
import { Defensor } from "./defensor";
import { EnemyHeroes } from "./enemyHeroes";
import { Hero } from "./hero";

export class Brawler extends Entity {
  private x: number;
  private y: number;
  private position: Position;
  private shieldLife: number;

  constructor(id: number, x: number, y: number, shieldLife: number) {
    super(id);
    this.x = x;
    this.y = y;
    this.position = new Position(x, y);
    this.shieldLife = shieldLife;
  }

  computeAction(
    monsters: Monsters,
    base: Base,
    defensor: Defensor,
    enemyHero: EnemyHeroes
  ): Action {
    let monsterToAttack = monsters.findNearestFuturOrImmediatThreat(base);
    if (enemyHero.isAtLeastOneHeroAttackingBase(base)) {
      if (
        !defensor.getShieldLife() &&
        computeDistancebeetwen(this.position, defensor.getPosition()) <
          SHIELD_RANGE &&
        base.getMana() >= 10
      ) {
        return new Action(defensor.getId(), "SPELL SHIELD " + defensor.getId());
      }
      if (!this.shieldLife) {
        return new Action(this.id, "SPELL SHIELD " + this.id);
      }
    }
    if (!monsterToAttack) {
      monsterToAttack = monsters.findNearestMonster(base, this.position, 800);
    }
    if (!monsterToAttack) {
      return new Action(this.id, base.getBralwerPosition());
    }
    const action = super.computeAttackMove(
      monsters,
      monsterToAttack,
      this.position
    );
    return action;
  }

  public getX(): number {
    return this.x;
  }
  public getY(): number {
    return this.y;
  }

  public getId(): number {
    return this.id;
  }

  getPosition(): Position {
    return this.position;
  }
}
