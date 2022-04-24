import { Position } from "../utils/position";
import { computeDistancebeetwen, isInWindRange } from "./distance-computation";

describe("computePowDistancebeetwen", () => {
  it("should compute distance", () => {
    const hero = new Position(5839, 679);
    const monster = new Position(7072, 777);
    expect(computeDistancebeetwen(hero, monster)).toBe(1236.8884347426003);
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
