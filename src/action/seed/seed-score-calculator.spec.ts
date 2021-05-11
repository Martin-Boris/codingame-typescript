import { Cell, Tree } from "../../io/input";
import { ShadowMap, ShadowMapMultipleDay } from "../../shadow/shadow-map";
import { SeedScoreCalculator } from "./seed-score-calculator";

describe("SeedScoreCalculator", () => {
  const cell_12 = {
    index: 12,
    richness: 3,
    neighborIndexes: [],
    neighbors: [],
  };
  describe("computeScore", () => {
    const shadowMap: ShadowMapMultipleDay = {
      3: {},
      4: {},
    };
    it("should compute 0 if action from tree T0 (seed)", () => {
      const tree_1_size_0 = {
        cellIndex: 1,
        size: 0,
        isMine: true,
        isDormant: false,
      } as Tree;
      let action = new SeedScoreCalculator(
        tree_1_size_0,
        cell_12,
        [],
        shadowMap
      );
      expect(action.computeScore()).toBe(0);
    });
    it("should compute 5 score when seed position near another tree", () => {
      const tree_15_size_2 = {
        cellIndex: 15,
        size: 2,
        isMine: true,
        isDormant: false,
      } as Tree;
      const cell_0 = {
        index: 12,
        richness: 3,
        neighborIndexes: [1, 2, 3, 4, 5, 6],
        neighbors: [],
      };
      let tree_2_size_1 = {
        cellIndex: 2,
        size: 1,
        isMine: true,
        isDormant: false,
      } as Tree;
      let action = new SeedScoreCalculator(
        tree_15_size_2,
        cell_0,
        [tree_2_size_1],
        shadowMap
      );
      expect(action.computeScore()).toBe(5);
    });
    it("should compute 6 score when seed position near any other tree", () => {
      const tree_15_size_2 = {
        cellIndex: 15,
        size: 2,
        isMine: true,
        isDormant: false,
      } as Tree;
      const cell_0 = {
        index: 12,
        richness: 3,
        neighborIndexes: [1, 2, 3, 4, 5, 6],
        neighbors: [],
      };
      let action = new SeedScoreCalculator(
        tree_15_size_2,
        cell_0,
        [],
        shadowMap
      );
      expect(action.computeScore()).toBe(6);
    });
  });
  describe("computeShadow", () => {
    it("should compute 0 if action from tree T0 (seed)", () => {
      const shadowMap: ShadowMapMultipleDay = {
        3: {},
        4: {},
      };
      const tree_1_size_0 = {
        cellIndex: 1,
        size: 0,
        isMine: true,
        isDormant: false,
      } as Tree;
      let action = new SeedScoreCalculator(
        tree_1_size_0,
        cell_12,
        [],
        shadowMap
      );
      expect(action.computeShadow()).toBe(0);
    });
    it("should compute score from shadowmap and richness", () => {
      const shadowMap: ShadowMapMultipleDay = {
        3: { 12: { shadowLevel: 3 } },
        4: { 12: { shadowLevel: 3 } },
        5: {},
      };
      const tree_15_size_2 = {
        cellIndex: 15,
        size: 2,
        isMine: true,
        isDormant: false,
      } as Tree;
      const cell_0 = {
        index: 12,
        richness: 3,
        neighborIndexes: [1, 2, 3, 4, 5, 6],
        neighbors: [],
      };
      let action = new SeedScoreCalculator(
        tree_15_size_2,
        cell_0,
        [],
        shadowMap
      );
      expect(action.computeShadow()).toBe(0.75);
    });

    it("should return 0 in case there already is a seed", () => {
      const tree_seed = {
        cellIndex: 2,
        size: 0,
        isMine: true,
        isDormant: false,
      } as Tree;
      let action = new SeedScoreCalculator(
        {} as Tree,
        {} as Cell,
        [tree_seed],
        {} as ShadowMap
      );
      expect(action.computeShadow()).toBe(0);
    });
  });
});
