import { SeedAction } from "../action/seed-action";
import { Trees } from "../io/trees";
import { MOCKED_MAP } from "../utils/test-data";
import { SeedActions } from "./seed-actions";

describe("SeedActions", () => {
  describe("highScoreAction", () => {
    it("should return action with hight score", () => {
      const lowScoreAction = new SeedAction(undefined, undefined);
      lowScoreAction.computeScore = jest.fn().mockImplementation(() => 0.1);
      const highScoreAction = new SeedAction(undefined, undefined);
      highScoreAction.computeScore = jest.fn().mockImplementation(() => 0.9);
      highScoreAction.toString = jest
        .fn()
        .mockImplementation(() => "SEED TEST");
      const actions = new SeedActions([lowScoreAction, highScoreAction]);
      expect(actions.highScoreAction(new Trees(), MOCKED_MAP, 0)).toBe(
        highScoreAction
      );
    });
  });
});
