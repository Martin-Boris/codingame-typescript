import { SeedAction } from "../action/seed-action";
import { SEED_TRESHOLD_DAY } from "../constante/treshold";
import { SeedActions } from "./seed-actions";

describe("SeedActions", () => {
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
  describe("getBestAction", () => {
    it("should return empty string in no action available", () => {
      const actions = new SeedActions([], 0);
      let action = actions.getBestAction(0);
      expect(action).toBe("");
    });
    it("should choose the first seed action", () => {
      let seed_15_12 = new SeedAction(cell_15, cell_12);
      let seed_12_15 = new SeedAction(cell_12, cell_15);
      const actions = new SeedActions([seed_15_12, seed_12_15], 0);
      let action = actions.getBestAction(0);
      expect(action).toBe("SEED 15 12");
    });
    it("should return empty string in case there already is a seed", () => {
      let seed_15_12 = new SeedAction(cell_15, cell_12);
      let seed_12_15 = new SeedAction(cell_12, cell_15);
      const actions = new SeedActions([seed_15_12, seed_12_15], 1);
      let action = actions.getBestAction(0);
      expect(action).toBe("");
    });
    it("should return empty string in case SEED_TRESHOLD_DAY reached", () => {
      let seed_15_12 = new SeedAction(cell_15, cell_12);
      let seed_12_15 = new SeedAction(cell_12, cell_15);
      const actions = new SeedActions([seed_15_12, seed_12_15], 0);
      let action = actions.getBestAction(SEED_TRESHOLD_DAY + 1);
      expect(action).toBe("");
    });
  });
});
