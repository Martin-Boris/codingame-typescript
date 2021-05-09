import { Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";
import { GrowScoreT1Calculator } from "./grow-score-t1-calculator";
import { GrowScoreT2Calculator } from "./grow-score-t2-calculator";

describe("GrowScoreT1Calculator", () => {
  it("should compute score (depend on nimber of sunny day)", () => {
    const tree_size_2_cell_5: Tree = {
      cellIndex: 5,
      size: 2,
      isMine: true,
      isDormant: false,
    } as Tree;
    const shadowMap: ShadowMapMultipleDay = {
      3: { 5: { shadowLevel: 3 } },
      4: { 5: { shadowLevel: 3 } },
    };
    const calculator = new GrowScoreT1Calculator(
      tree_size_2_cell_5,
      shadowMap,
      3,
      0
    );
    expect(calculator.computeScore()).toBe(0);
  });
  it("should compute a 0 score if day 22", () => {
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
    const calculator = new GrowScoreT1Calculator(
      tree_size_2_cell_5,
      shadowMap,
      22,
      0
    );
    expect(calculator.computeScore()).toBe(0);
  });
  it("should compute a 0 score if T2_TREE_TRESHOLD reached", () => {
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
    const calculator = new GrowScoreT1Calculator(
      tree_size_2_cell_5,
      shadowMap,
      22,
      2
    );
    expect(calculator.computeScore()).toBe(0);
  });
});
