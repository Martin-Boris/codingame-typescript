import { Cell, Map, Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";
import { CompleteScoreCalculator } from "./complete-score-calculator";

describe("CompleteScoreCalculator", () => {
  const day0 = 0;
  const emptyMap = {} as Map;
  it("should compute sun efficiency (R=0.75)", () => {
    const tree_size_3_cell_5: Tree = {
      cellIndex: 5,
      size: 3,
      isMine: true,
      isDormant: false,
    } as Tree;
    const shadowMap: ShadowMapMultipleDay = {
      1: { 5: { shadowLevel: 2 } },
      2: { 5: { shadowLevel: 3 } },
      3: {},
      4: {},
    };
    const completeScoreCalculator = new CompleteScoreCalculator(
      tree_size_3_cell_5,
      shadowMap,
      day0,
      [],
      emptyMap
    );
    expect(completeScoreCalculator.computeSunEfficiency()).toBe(0.75);
  });

  it("should compute sun efficiency (R=1)", () => {
    const tree_size_3_cell_5: Tree = {
      cellIndex: 5,
      size: 3,
      isMine: true,
      isDormant: false,
    } as Tree;
    const shadowMap: ShadowMapMultipleDay = {
      3: {},
      4: {},
    };
    const completeScoreCalculator = new CompleteScoreCalculator(
      tree_size_3_cell_5,
      shadowMap,
      day0,
      [],
      emptyMap
    );
    expect(completeScoreCalculator.computeSunEfficiency()).toBe(1);
  });

  it("should compute sun efficiency (R=0)", () => {
    const tree_size_3_cell_5: Tree = {
      cellIndex: 5,
      size: 3,
      isMine: true,
      isDormant: false,
    } as Tree;
    const shadowMap: ShadowMapMultipleDay = {
      3: { 5: { shadowLevel: 3 } },
      4: { 5: { shadowLevel: 3 } },
    };
    const completeScoreCalculator = new CompleteScoreCalculator(
      tree_size_3_cell_5,
      shadowMap,
      day0,
      [],
      emptyMap
    );
    expect(completeScoreCalculator.computeSunEfficiency()).toBe(0);
  });

  it("should compute score 0 in case shadowmap empty", () => {
    const tree_size_3_cell_5: Tree = {
      cellIndex: 5,
      size: 3,
      isMine: true,
      isDormant: false,
    } as Tree;
    const shadowMap: ShadowMapMultipleDay = {};
    const completeScoreCalculator = new CompleteScoreCalculator(
      tree_size_3_cell_5,
      shadowMap,
      day0,
      [],
      emptyMap
    );
    expect(completeScoreCalculator.computeSunEfficiency()).toBe(0);
  });

  describe("computeFriendlyShadowDeny", () => {
    it("should compute score on friendly shadow deny for the next turn", () => {
      const tree_size_3_cell_27: Tree = {
        cellIndex: 27,
        size: 3,
        isMine: true,
        isDormant: false,
      } as Tree;
      const tree_size_3_cell_5: Tree = {
        cellIndex: 5,
        size: 1,
        isMine: true,
        isDormant: false,
        cell: cell_5,
      };
      const tree_size_2_cell_2: Tree = {
        cellIndex: 2,
        size: 2,
        isMine: true,
        isDormant: false,
        cell: cell_2,
      };
      const tree_size_2_cell_0: Tree = {
        cellIndex: 0,
        size: 1,
        isMine: true,
        isDormant: false,
        cell: cell_0,
      };
      const shadowMap: ShadowMapMultipleDay = {};
      const completeScoreCalculator = new CompleteScoreCalculator(
        tree_size_3_cell_27,
        shadowMap,
        day0,
        [
          tree_size_3_cell_27,
          tree_size_2_cell_2,
          tree_size_3_cell_5,
          tree_size_2_cell_0,
        ],
        partial_3_cell_map
      );
      expect(completeScoreCalculator.computeShadowDeny(true)).toBe(0.5);
    });
    it("should compute score on ennemies shadow deny for the next turn", () => {
      const tree_size_3_cell_27: Tree = {
        cellIndex: 27,
        size: 3,
        isMine: true,
        isDormant: false,
      } as Tree;
      const tree_size_3_cell_5: Tree = {
        cellIndex: 5,
        size: 1,
        isMine: true,
        isDormant: false,
        cell: cell_5,
      };
      const shadowMap: ShadowMapMultipleDay = {};
      const completeScoreCalculator = new CompleteScoreCalculator(
        tree_size_3_cell_27,
        shadowMap,
        day0,
        [tree_size_3_cell_5, tree_size_3_cell_27],
        partial_3_cell_map
      );
      expect(completeScoreCalculator.computeShadowDeny(true)).toBe(0);
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
