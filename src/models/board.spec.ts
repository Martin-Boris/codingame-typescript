import { Board } from "./board";
import { Hero } from "./entities/hero";
import { Monster } from "./entities/monster";

describe("Board unit Test", () => {
  const allyHero = [
    new Hero(1, 1131, 1131),
    new Hero(1, 1414, 849),
    new Hero(1, 849, 1414),
  ];
  it("should return WAIT action in case no monster attacking ally base", () => {
    const monsterWithoutTarget = new Monster(
      1,
      12000,
      3000,
      30,
      -100,
      350,
      0,
      0
    );
    const monsterTargetingEnemy = new Monster(
      2,
      12000,
      3000,
      30,
      -100,
      350,
      1,
      2
    );
    const monsters = [monsterWithoutTarget, monsterTargetingEnemy];

    const board = new Board(100, 100, allyHero, monsters);
    const actions = board.triggerHeroAction();
    expect(actions[0]).toBe("MOVE 6000 1000");
    expect(actions[1]).toBe("MOVE 5000 3000");
    expect(actions[2]).toBe("MOVE 2500 5000");
  });
  it("should return action to focus first attacker monster", () => {
    const monsterTargetingAlly = new Monster(1, 500, 5000, 30, 0, -400, 1, 1);
    const monsterTargetingEnemy = new Monster(
      2,
      12000,
      3000,
      30,
      -100,
      350,
      1,
      2
    );
    const monsters = [monsterTargetingAlly, monsterTargetingEnemy];
    const board = new Board(100, 100, allyHero, monsters);
    const actions = board.triggerHeroAction();
    expect(actions[0]).toBe("MOVE 500 5000");
    expect(actions[1]).toBe("MOVE 500 5000");
    expect(actions[2]).toBe("MOVE 500 5000");
  });
});
