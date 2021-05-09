import { Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";
import { GrowScoreT0Calculator } from "./grow-score-t0-calculator";

describe("GrowScoreT0Calculator", () => {
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
    const calculator = new GrowScoreT0Calculator(
      tree_size_2_cell_5,
      shadowMap,
      3,
      0
    );
    expect(calculator.computeScore()).toBe(0);
  });
  it("should compute a 0 score if day 21", () => {
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
    const calculator = new GrowScoreT0Calculator(
      tree_size_2_cell_5,
      shadowMap,
      21,
      0
    );
    expect(calculator.computeScore()).toBe(0);
  });
  it("should compute a 0 score if T1_TREE_TRESHOLD reached", () => {
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
    let nbrT1 = 1;
    let day = 0;
    const calculator = new GrowScoreT0Calculator(
      tree_size_2_cell_5,
      shadowMap,
      day,
      nbrT1
    );
    expect(calculator.computeScore()).toBe(0);
  });
});
