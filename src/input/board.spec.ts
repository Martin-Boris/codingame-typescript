import { Board } from "./board";

describe("Board", () => {
  describe("initFromString", () => {
    it("should init board", () => {
      const stringBoard = [
        ".........",
        ".........",
        ".........",
        ".........",
        ".........",
        ".........",
        ".0.....1.",
      ];
      expect(Board.fromStringRow(stringBoard).grid).toStrictEqual([
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 0, 2, 2, 2, 2, 2, 1, 2],
      ]);
    });
  });
});
