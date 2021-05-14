import { GameState } from "../io/input";
import { Tree } from "../io/tree";
import { Trees } from "../io/trees";
import { CELL_0, CELL_1, MOCKED_MAP } from "../utils/test-data";
import { CompleteAction } from "./complete-action";

describe("CompleteAction", () => {
  describe("toString", () => {
    it("should genere string", () => {
      const tree_cell_0_size_1 = new Tree(0, CELL_0, 1, true, false);
      const action = new CompleteAction(tree_cell_0_size_1);
      expect(action.toString()).toBe("COMPLETE 0");
    });
  });

  describe("initFromString", () => {
    it("should init properly from string action name", () => {
      const tree_cell_0_size_3 = new Tree(0, CELL_0, 3, true, false);
      const trees = Trees.fromTreeArray([tree_cell_0_size_3]);
      const action = CompleteAction.initFromString("COMPLETE 0", trees);
      expect(action.tree).toStrictEqual(tree_cell_0_size_3);
    });
  });

  describe("computeScore", () => {
    it("should do the correct math calcul", () => {
      const gameState: GameState = {
        day: 15,
        trees: new Trees(),
      } as GameState;
      const tree_cell_1_size_3 = new Tree(1, CELL_1, 3, true, false);
      tree_cell_1_size_3.computePositionScore = jest
        .fn()
        .mockImplementation(() => 0.5);
      tree_cell_1_size_3.computeSunnyScore = jest
        .fn()
        .mockImplementation(() => 0.7);
      tree_cell_1_size_3.computeRichnessScore = jest
        .fn()
        .mockImplementation(() => 1);
      const action = new CompleteAction(tree_cell_1_size_3);
      expect(action.computeScore(undefined, gameState, MOCKED_MAP)).toBe(
        0.42857142857142855
      );
    });
    it("should return 0 in case before J14 (day13)", () => {
      const gameState: GameState = {
        day: 0,
        trees: new Trees(),
      } as GameState;
      const tree_cell_1_size_3 = new Tree(1, CELL_1, 3, true, false);
      const action = new CompleteAction(tree_cell_1_size_3);
      expect(action.computeScore(undefined, gameState, MOCKED_MAP)).toBe(0);
    });

    it("should return 0 in case after J14 (day13) but already complete during the day", () => {
      const gameState: GameState = {
        day: 13,
        trees: new Trees(),
        lastDayComplete: 13,
      } as GameState;
      const tree_cell_1_size_3 = new Tree(1, CELL_1, 3, true, false);
      const action = new CompleteAction(tree_cell_1_size_3);
      expect(action.computeScore(undefined, gameState, MOCKED_MAP)).toBe(0);
    });
  });
});
