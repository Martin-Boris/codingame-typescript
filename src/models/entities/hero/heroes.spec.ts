import { Monster } from "../monster/monster";
import { Hero } from "./hero";
import { Heroes } from "./heroes";

describe("heroes unit test", () => {
  it("should return nearest hero", () => {
    const hero = new Hero(1, 10, 100);
    const nearestHero = new Hero(0, 500, 555);
    const monster = new Monster(2, 545, 520, null, null, null, null, null);
    const heroes = new Heroes([hero, nearestHero]);
    expect(heroes.findNearestHero(monster)).toBe(nearestHero);
  });
});
