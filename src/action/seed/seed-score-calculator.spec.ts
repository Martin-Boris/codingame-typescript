import { Tree } from "../../io/input";
import { SeedScoreCalculator } from "./seed-score-calculator";

describe("SeedScoreCalculator", () => {
  const cell_12 = {
    index: 12,
    richness: 3,
    neighborIndexes: [],
    neighbors: [],
  };
  describe("computeScore", () => {
    it("should compute 0 if action from tree T0 (seed)", () => {
      const tree_1_size_0 = {
        cellIndex: 1,
        size: 0,
        isMine: true,
        isDormant: false,
      } as Tree;
      let action = new SeedScoreCalculator(tree_1_size_0, cell_12, []);
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
      let action = new SeedScoreCalculator(tree_15_size_2, cell_0, [
        tree_2_size_1,
      ]);
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
      let action = new SeedScoreCalculator(tree_15_size_2, cell_0, []);
      expect(action.computeScore()).toBe(6);
    });
  });
});
