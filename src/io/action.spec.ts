import { Action } from "./action";
import { Map } from "./input";

describe("action", () => {
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
  it("should initialize Seed action properly from string", () => {
    let action = new Action("SEED 15 12", map);
    expect(action.type).toBe("SEED");
    expect(action.cellFrom).toBe(cell_15);
    expect(action.cellTo).toBe(cell_12);
  });

  describe("isSEEDActionFromString", () => {
    it("should return true if seed action", () => {
      expect(Action.isSEEDActionFromString("SEED 12 15")).toBeTruthy();
    });
    it("should return true if seed action", () => {
      expect(Action.isSEEDActionFromString("WAIT")).toBeFalsy();
    });
  });
});
