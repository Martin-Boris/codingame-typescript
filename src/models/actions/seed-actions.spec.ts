import { SeedAction } from "../action/seed-action";
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
    it("should choose the more efficient seed action (high richness)", () => {
      let seed_15_12 = new SeedAction(cell_15, cell_12);
      let seed_12_15 = new SeedAction(cell_12, cell_15);
      const actions = new SeedActions([seed_15_12, seed_12_15]);
      let action = actions.getBestAction();
      expect(action).toBe("SEED 15 12");
    });
  });
});
