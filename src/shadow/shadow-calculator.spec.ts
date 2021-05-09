import { Cell, Map, Tree } from "../io/input";
import { ShadowCalculator } from "./shadow-calculator";

describe("ShadowCalculator", () => {
  describe("compute", () => {
    it("should compute shadow map from one tree T1 at day 1", () => {
      const tree_size_1_cell_5: Tree = {
        cellIndex: 5,
        cell: cell_5,
        size: 1,
        isMine: true,
        isDormant: false,
      };
      const day = 1;
      const shadowCalculator = new ShadowCalculator(
        [tree_size_1_cell_5],
        partial_3_cell_map
      );
      expect(shadowCalculator.compute(day)).toStrictEqual({
        0: { shadowLevel: 1 },
      });
    });
    it("should compute shadow map from one tree T1 at day 3", () => {
      const tree_size_1_cell_5: Tree = {
        cellIndex: 5,
        cell: cell_5,
        size: 1,
        isMine: true,
        isDormant: false,
      };
      const day = 3;
      const shadowCalculator = new ShadowCalculator(
        [tree_size_1_cell_5],
        partial_3_cell_map
      );
      expect(shadowCalculator.compute(day)).toStrictEqual({});
    });
    it("should compute shadow map from one tree T3 at day 1", () => {
      const tree_size_3_cell_5: Tree = {
        cellIndex: 5,
        cell: cell_5,
        size: 3,
        isMine: true,
        isDormant: false,
      };
      const day = 1;
      const shadowCalculator = new ShadowCalculator(
        [tree_size_3_cell_5],
        partial_3_cell_map
      );
      expect(shadowCalculator.compute(day)).toStrictEqual({
        0: { shadowLevel: 3 },
        2: { shadowLevel: 3 },
      });
    });
    it("should compute shadow map from aligned tree T3 and T2 at day 1", () => {
      const tree_size_3_cell_5: Tree = {
        cellIndex: 5,
        cell: cell_5,
        size: 3,
        isMine: true,
        isDormant: false,
      };
      const tree_size_2_cell_0: Tree = {
        cellIndex: 0,
        cell: cell_0,
        size: 2,
        isMine: true,
        isDormant: false,
      };
      const day = 1;
      const shadowCalculator = new ShadowCalculator(
        [tree_size_3_cell_5, tree_size_2_cell_0],
        partial_3_cell_map
      );
      expect(shadowCalculator.compute(day)).toStrictEqual({
        0: { shadowLevel: 3 },
        2: { shadowLevel: 3 },
      });
    });
  });
  describe("computeMultipleDay", () => {
    it("should compute shadow map for 3days from day 1", () => {
      const tree_size_1_cell_5: Tree = {
        cellIndex: 5,
        cell: cell_5,
        size: 1,
        isMine: true,
        isDormant: false,
      };
      const day = 1;
      const shadowCalculator = new ShadowCalculator(
        [tree_size_1_cell_5],
        partial_3_cell_map
      );
      expect(shadowCalculator.computeMultipleDay(day, 3)).toStrictEqual({
        1: {
          0: { shadowLevel: 1 },
        },
        2: {},
        3: {},
      });
    });
    it("should not compute day shadow more than day 23", () => {
      const tree_size_1_cell_2: Tree = {
        cellIndex: 2,
        cell: cell_2,
        size: 1,
        isMine: true,
        isDormant: false,
      };
      const day = 22;
      const shadowCalculator = new ShadowCalculator(
        [tree_size_1_cell_2],
        partial_3_cell_map
      );
      expect(shadowCalculator.computeMultipleDay(day, 3)).toStrictEqual({
        22: {
          0: { shadowLevel: 1 },
        },
        23: {},
      });
    });
  });
});

const cell_2: Cell = {
  index: 1,
  richness: 3,
  neighborIndexes: [-1, -1, -1, -1, 0, -1],
  // neighbors: [undefined, undefined, undefined, undefined,cell_0, undefined]
} as Cell;
const cell_5: Cell = {
  index: 1,
  richness: 3,
  neighborIndexes: [-1, 0, -1, -1, -1, -1],
  //neighbors: [undefined, cell_0, undefined, undefined, undefined, undefined];
} as Cell;

const cell_0: Cell = {
  index: 0,
  richness: 3,
  neighborIndexes: [-1, 2, -1, -1, 5, -1],
  //neighbors: [undefined, cell_2, undefined, undefined, cell_5, undefined]
} as Cell;

const partial_3_cell_map: Map = {
  0: {
    index: 0,
    richness: 3,
    neighbors: [undefined, cell_2, undefined, undefined, cell_5, undefined],
    neighborIndexes: [-1, 2, -1, -1, 5, -1],
  },
  2: {
    index: 2,
    richness: 3,
    neighbors: [undefined, undefined, undefined, undefined, cell_0, undefined],
    neighborIndexes: [-1, -1, -1, -1, 0, -1],
  },
  5: {
    index: 5,
    richness: 3,
    neighbors: [undefined, cell_0, undefined, undefined, undefined, undefined],
    neighborIndexes: [-1, 0, -1, -1, -1, -1],
  },
};
