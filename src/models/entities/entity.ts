import { computeDistancebeetwen } from "../../function/distance-computation";
import { Position } from "../../utils/position";
import { Action } from "../action";
import { Base } from "../base";
import { Monster } from "./monster/monster";
import { Monsters } from "./monster/monsters";

export class Entity {
  private _id;

  constructor(id: number) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  computeAttackMove(
    monsters: Monsters,
    monsterToAttack: Monster,
    atkPosition: Position,
    base: Base
  ) {
    const monsterInRange = monsters.findMonsterInRange(monsterToAttack, 1550);
    if (
      monsterInRange &&
      computeDistancebeetwen(atkPosition, monsterToAttack.getPosition()) < 400
    ) {
      const action = new Action(
        this.id,
        "MOVE " +
          Math.round((monsterToAttack.getX() + monsterInRange.getX()) / 2) +
          " " +
          Math.round((monsterToAttack.getY() + monsterInRange.getY()) / 2)
      );
      if (monsterInRange.isKillableAlone(atkPosition, base)) {
        monsterInRange.setAttacked();
      }
      if (monsterToAttack.isKillableAlone(atkPosition, base)) {
        monsterToAttack.setAttacked();
      }
      return action;
    }
    const action = new Action(
      this.id,
      "MOVE " + monsterToAttack.getX() + " " + monsterToAttack.getY()
    );
    if (monsterToAttack.isKillableAlone(atkPosition, base)) {
      monsterToAttack.setAttacked();
    }
    return action;
  }
}
