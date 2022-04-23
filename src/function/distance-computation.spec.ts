import { Defensor } from "../models/entities/hero/defensor";
import { Monster } from "../models/entities/monster/monster";
import { Position } from "../utils/position";
import {
  computePowDistancebeetwen,
  isInWindRange,
} from "./distance-computation";

describe("computePowDistancebeetwen", () => {
  it("should compute distance beetwen the two entity", () => {
    const hero = new Defensor(1, 10, 15);
    const monster = new Monster(1, 200, 10, 30, -100, 350, 1, 2);
    expect(computePowDistancebeetwen(hero, monster)).toBe(36125);
  });

  it("isInWindRange, should be in wind range", () => {
    const position1 = new Position(10, 10);
    const position2 = new Position(12, 12);
    expect(isInWindRange(position1, position2)).toBeTruthy();
  });

  it("isInWindRange, should not be in wind range", () => {
    const position1 = new Position(10, 10);
    const position2 = new Position(12000, 12000);
    expect(isInWindRange(position1, position2)).toBeFalsy();
  });
});
