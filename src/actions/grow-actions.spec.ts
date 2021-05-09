import { Tree } from "../io/input";
import { GrowAction } from "../action/grow/grow-action";
import { GrowActions } from "./grow-actions";

describe("GrowActions", () => {
  describe("getBestAction", () => {
    it("should return empty string if no grow action available", () => {
      const actions = new GrowActions([], []);
      expect(actions.getBestAction()).toBe("");
    });

    it("should select GROW action with higher score", () => {
      const lowScoreAction = new GrowAction({} as Tree, 1);
      const highScoreAction = new GrowAction({} as Tree, 2);
      highScoreAction.getStringAction = jest
        .fn()
        .mockImplementation(() => "GROW 2");
      const actions = new GrowActions([lowScoreAction, highScoreAction], []);
      expect(actions.getBestAction()).toBe("GROW 2");
    });

    it("should select empty string if higher score action is equal to 0", () => {
      const lowScoreAction = new GrowAction({} as Tree, 0);
      const actions = new GrowActions([lowScoreAction], []);
      expect(actions.getBestAction()).toBe("");
    });
  });
});
