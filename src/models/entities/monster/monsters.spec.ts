import { Base } from "../../base";
import { Monster } from "./monster";
import { Monsters } from "./monsters";

describe("Monsters unit test", () => {
  it("isImmediatThreat: should return true if there is at least one monster threatning the ally base", () => {
    const monsterThreatningAllyBase = new Monster(
      1,
      12000,
      3000,
      30,
      -100,
      350,
      1,
      1
    );
    const monsters = new Monsters([monsterThreatningAllyBase]);
    expect(monsters.isImmediatThreat()).toBeTruthy();
  });
  it("isImmediatThreat: should return false if there is no one monster threatning the ally base", () => {
    const monsterThreatningEnemyBase = new Monster(
      1,
      12000,
      3000,
      30,
      -100,
      350,
      1,
      2
    );
    const monsterWithoutTarget = new Monster(
      1,
      12000,
      3000,
      30,
      -100,
      350,
      0,
      1
    );
    const monsters = new Monsters([
      monsterThreatningEnemyBase,
      monsterWithoutTarget,
    ]);
    expect(monsters.isImmediatThreat()).toBeFalsy();
  });

  it("findNearestThreatens: should return nearest monster threatning the ally base", () => {
    const monsterThreatningAllyBase = new Monster(
      1,
      12000,
      3000,
      30,
      -100,
      350,
      1,
      1
    );
    const nearestMonsterThreatningAllyBase = new Monster(
      1,
      5000,
      200,
      30,
      -100,
      350,
      1,
      1
    );
    const monsters = new Monsters([
      monsterThreatningAllyBase,
      nearestMonsterThreatningAllyBase,
    ]);
    const base: Base = new Base(0, 0, 100, 100);
    expect(monsters.findNearestImmediatThreat(base)).toBe(
      nearestMonsterThreatningAllyBase
    );
  });
});
