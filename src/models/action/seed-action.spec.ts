import { Map } from "../../io/input";
import { SeedAction } from "./seed-action";

describe("SeedAction", () => {
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
  describe("initFromString", () => {
    it("should initialize Seed action properly from string", () => {
      let action = SeedAction.initFromString("SEED 15 12", map);
      expect(action.type).toBe("SEED");
      expect(action.cellFrom).toBe(cell_15);
      expect(action.cellTo).toBe(cell_12);
    });
  });

  describe("isSEEDActionFromString", () => {
    it("should return true if seed action", () => {
      expect(SeedAction.isSEEDActionFromString("SEED 12 15")).toBeTruthy();
    });
    it("should return true if seed action", () => {
      expect(SeedAction.isSEEDActionFromString("WAIT")).toBeFalsy();
    });
  });

  describe("getStringAction", () => {
    let action = new SeedAction(cell_15, cell_12);
    expect(action.getStringAction()).toBe("SEED 15 12");
  });
});
