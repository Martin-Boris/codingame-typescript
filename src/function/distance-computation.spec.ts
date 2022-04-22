import { Hero } from "../models/entities/hero/hero";
import { Monster } from "../models/entities/monster/monster";
import { computeDistancebeetwen } from "./distance-computation";

describe("computeDistancebeetwen", () => {
  it("should compute distance beetwen the two entity", () => {
    const hero: Hero = new Hero(1, 10, 15);
    const monster = new Monster(1, 200, 10, 30, -100, 350, 1, 2);
    expect(computeDistancebeetwen(hero, monster)).toBe(36125);
  });
});
