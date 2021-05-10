import { Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";
import { CompleteScoreCalculator } from "./complete-score-calculator";

describe("CompleteScoreCalculator", () => {
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
      shadowMap
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
      shadowMap
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
      shadowMap
    );
    expect(completeScoreCalculator.computeSunEfficiency()).toBe(0);
  });

  it("should compute complete score (R=0)", () => {
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
      shadowMap
    );
    expect(completeScoreCalculator.compute()).toBe(1);
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
      shadowMap
    );
    expect(completeScoreCalculator.computeSunEfficiency()).toBe(0);
  });
});
