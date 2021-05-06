import { Actions } from "./actions";
import { Map } from "./input";

describe("actions", () => {
  const cell_15 = {
    index: 15,
    richness: 1,
    neighborIndexes: [],
    neighbors: [],
  };
  const cell_12 = {
    index: 12,
    richness: 3,
    neighborIndexes: [],
    neighbors: [],
  };
  let map: Map = { 15: cell_15, 12: cell_12 };

  it("should init only seed action from a list of action", () => {
    let actions = ["WAIT", "GROW 35", "SEED 15 12"];
    let seedActions: Actions = new Actions(actions, map);
    expect(seedActions.actions).toHaveLength(1);
    expect(seedActions.actions[0].cellFrom).toBe(cell_15);
    expect(seedActions.actions[0].cellTo).toBe(cell_12);
  });

  describe("selectBestOption", () => {
    it("should choose the more efficient seed action (high richness)", () => {
      let actions = ["WAIT", "GROW 35", "SEED 15 12", "SEED 12 15"];
      let seedActions: Actions = new Actions(actions, map);
      let action = seedActions.selectBestOption();
      expect(action.cellTo).toBe(cell_12);
    });
  });
});
