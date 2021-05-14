import { GameState } from "../io/input";
import { Tree } from "../io/tree";
import { Trees } from "../io/trees";
import { CELL_0, CELL_1, MOCKED_MAP } from "../utils/test-data";
import { GrowAction } from "./grow-action";

describe("GrowAction", () => {
  describe("toString", () => {
    it("should genere string", () => {
      const tree_cell_0_size_1 = new Tree(0, CELL_0, 1, true, false);
      const action = new GrowAction(tree_cell_0_size_1);
      expect(action.toString()).toBe("GROW 0");
    });
  });

  describe("initFromString", () => {
    it("should init properly from string action name", () => {
      const tree_cell_0_size_1 = new Tree(0, CELL_0, 1, true, false);
      const trees = Trees.fromTreeArray([tree_cell_0_size_1]);
      const action = GrowAction.initFromString("GROW 0", trees);
      expect(action.tree).toStrictEqual(tree_cell_0_size_1);
    });
  });

  describe("computeScore", () => {
    it("should do the correct math calcul", () => {
      const gameState: GameState = {
        trees: new Trees(),
      } as GameState;
      const tree_cell_1_size_2 = new Tree(1, CELL_1, 2, true, false);
      tree_cell_1_size_2.computePositionScore = jest
        .fn()
        .mockImplementation(() => 0.5);
      tree_cell_1_size_2.computeSunnyScore = jest
        .fn()
        .mockImplementation(() => 0.7);
      tree_cell_1_size_2.computeRichnessScore = jest
        .fn()
        .mockImplementation(() => 1);
      const action = new GrowAction(tree_cell_1_size_2);
      expect(action.computeScore(undefined, gameState, MOCKED_MAP)).toBe(
        0.6190476190476191
      );
    });

    it("should return 0 for t3 grow after turn 20", () => {
      const gameState: GameState = {
        day: 20,
      } as GameState;
      const tree_cell_0_size_2 = new Tree(0, CELL_0, 2, true, false);
      const action = new GrowAction(tree_cell_0_size_2);
      expect(action.computeScore(undefined, gameState, MOCKED_MAP)).toBe(0);
    });
  });
});
