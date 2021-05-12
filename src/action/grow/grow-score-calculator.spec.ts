import { Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";
import { GrowScoreCalculator } from "./grow-score-calculator";

describe("GrowScoreCalculator", () => {
  it("should compute score", () => {
    const tree_size_2_cell_5: Tree = {
      cellIndex: 5,
      size: 2,
      cell: {
        richness: 3,
      },
      isMine: true,
      isDormant: false,
    } as Tree;
    const shadowMap: ShadowMapMultipleDay = {
      3: { 5: { shadowLevel: 3 } },
      4: { 5: { shadowLevel: 3 } },
    };
    const calculator = new GrowScoreCalculator(tree_size_2_cell_5, shadowMap);
    expect(calculator.computeScore()).toBe(0);
  });
  it("should compute 1", () => {
    const tree_size_2_cell_5: Tree = {
      cellIndex: 5,
      size: 2,
      isMine: true,
      isDormant: false,
    } as Tree;
    const shadowMap: ShadowMapMultipleDay = {
      3: {},
      4: {},
    };
    const calculator = new GrowScoreCalculator(tree_size_2_cell_5, shadowMap);
    expect(calculator.computeScore()).toBe(1);
  });
});
