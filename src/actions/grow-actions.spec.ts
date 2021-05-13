import { GrowAction } from "../action/grow-action";
import { SeedAction } from "../action/seed-action";
import { Trees } from "../io/trees";
import { MOCKED_MAP } from "../utils/test-data";
import { GrowActions } from "./grow-actions";
import { SeedActions } from "./seed-actions";

describe("GrowActions", () => {
  describe("highScoreAction", () => {
    it("should return action with hight score", () => {
      const lowScoreAction = new GrowAction(undefined);
      lowScoreAction.computeScore = jest.fn().mockImplementation(() => 0.1);
      const highScoreAction = new GrowAction(undefined);
      highScoreAction.computeScore = jest.fn().mockImplementation(() => 0.9);
      highScoreAction.toString = jest
        .fn()
        .mockImplementation(() => "SEED TEST");
      const actions = new GrowActions([lowScoreAction, highScoreAction]);
      expect(actions.highScoreAction(new Trees(), MOCKED_MAP, 0)).toBe(
        highScoreAction
      );
    });
  });
});
