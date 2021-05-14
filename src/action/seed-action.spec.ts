import { GameState } from "../io/input";
import { Tree } from "../io/tree";
import { Trees } from "../io/trees";
import { ConsecutiveShadowMap } from "../shadow/consecutive-shadow-map";
import { ShadowsMap } from "../shadow/shadows-map";
import { CELL_0, CELL_1, CELL_12, MOCKED_MAP } from "../utils/test-data";
import { SeedAction } from "./seed-action";

describe("seedAction", () => {
  describe("toString", () => {
    it("should genere string", () => {
      const tree_cell_0_size_1 = new Tree(0, CELL_0, 1, true, false);
      const seed_cell_1 = new Tree(1, CELL_1, 0, true, false);
      const action = new SeedAction(tree_cell_0_size_1, seed_cell_1);
      expect(action.toString()).toBe("SEED 0 1");
    });
  });

  describe("initFromString", () => {
    it("should init properly from string action name", () => {
      const tree_cell_0_size_1 = new Tree(0, CELL_0, 1, true, false);
      const trees = Trees.fromTreeArray([tree_cell_0_size_1]);
      const action = SeedAction.initFromString("SEED 0 1", trees, MOCKED_MAP);
      expect(action.treeFrom).toStrictEqual(tree_cell_0_size_1);
      expect(action.seed.cell.index).toBe(1);
    });
  });

  describe("computeScore", () => {
    it("should return 0 if already a seed", () => {
      const gameState: GameState = {
        trees: new Trees(),
      } as GameState;
      const tree_cell_12_size_3 = new Tree(12, CELL_12, 3, true, false);
      const seed_cell_0 = new Tree(0, CELL_0, 0, true, false);
      const action = new SeedAction(tree_cell_12_size_3, seed_cell_0);
      gameState.trees.isAlreadyASeed = jest.fn(() => true);
      expect(action.computeScore(undefined, gameState, MOCKED_MAP)).toBe(0);
    });
    it("should return 0 if from a T1", () => {
      const gameState: GameState = {
        trees: new Trees(),
      } as GameState;
      const tree_cell_12_size_1 = new Tree(12, CELL_12, 1, true, false);
      const seed_cell_0 = new Tree(0, CELL_0, 0, true, false);
      const action = new SeedAction(tree_cell_12_size_1, seed_cell_0);
      expect(action.computeScore(undefined, gameState, MOCKED_MAP)).toBe(0);
    });
    it("should return 1 (no ally aligned,cell richness max & full sun", () => {
      const gameState: GameState = {
        trees: new Trees(),
      } as GameState;
      const tree_cell_12_size_3 = new Tree(12, CELL_12, 3, true, false);
      const seed_cell_0 = new Tree(0, CELL_0, 0, true, false);
      const shadow = new ConsecutiveShadowMap();
      const shadowsMap = new ShadowsMap();
      shadowsMap.add(32, 1);
      shadow.add(0, shadowsMap);
      const action = new SeedAction(tree_cell_12_size_3, seed_cell_0);
      expect(action.computeScore(shadow, gameState, MOCKED_MAP)).toBe(1);
    });

    it("should do the correct math calcul", () => {
      const gameState: GameState = {
        trees: new Trees(),
      } as GameState;
      const tree_cell_1_size_3 = new Tree(1, CELL_1, 3, true, false);
      const seed_cell_0 = new Tree(0, CELL_0, 0, true, false);
      seed_cell_0.computePositionScore = jest
        .fn()
        .mockImplementation(() => 0.5);
      seed_cell_0.computeSunnyScore = jest.fn().mockImplementation(() => 0.7);
      seed_cell_0.computeRichnessScore = jest.fn().mockImplementation(() => 1);
      const action = new SeedAction(tree_cell_1_size_3, seed_cell_0);
      expect(action.computeScore(undefined, gameState, MOCKED_MAP)).toBe(
        0.6190476190476191
      );
    });
  });
});
