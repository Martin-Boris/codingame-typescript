import { SeedAction } from "../action/seed/seed-action";
import { Cell, Tree } from "../io/input";
import { SeedActions } from "./seed-actions";

describe("SeedActions", () => {
  describe("getBestAction", () => {
    it("should return empty string in case no action available", () => {
      const actions = new SeedActions([]);
      let action = actions.getBestAction(0);
      expect(action).toBe("");
    });
    it("should choose action with best score", () => {
      let actionLowScore = new SeedAction(
        {} as Tree,
        { richness: 1 } as Cell,
        1
      );
      let actionHighScore = new SeedAction(
        {} as Tree,
        { richness: 1 } as Cell,
        2
      );
      actionHighScore.getStringAction = jest
        .fn()
        .mockImplementation(() => "test succes");
      const actions = new SeedActions([actionLowScore, actionHighScore]);
      let action = actions.getBestAction(0);
      expect(action).toBe("test succes");
    });

    it("should not execute action when best score is 0", () => {
      let actionToLowScore = new SeedAction({} as Tree, {} as Cell, 0);
      const actions = new SeedActions([actionToLowScore]);
      let action = actions.getBestAction(0);
      expect(action).toBe("");
    });
  });
});
