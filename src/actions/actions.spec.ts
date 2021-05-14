import { GrowAction } from "../action/grow-action";
import { SeedAction } from "../action/seed-action";
import { GameState } from "../io/input";
import { Trees } from "../io/trees";
import { MOCKED_MAP } from "../utils/test-data";
import { Actions } from "./actions";

describe("Actions", () => {
  describe("highScoreAction", () => {
    it("should return action with hight score", () => {
      const lowScoreAction = new SeedAction(undefined, undefined);
      lowScoreAction.computeScore = jest.fn().mockImplementation(() => 0.1);
      const highScoreAction = new GrowAction(undefined);
      highScoreAction.computeScore = jest.fn().mockImplementation(() => 0.9);
      highScoreAction.toString = jest
        .fn()
        .mockImplementation(() => "SEED TEST");
      const actions = new Actions([lowScoreAction, highScoreAction]);
      const gameState: GameState = {
        day: 0,
        trees: new Trees(),
      } as GameState;
      expect(actions.bestAction(gameState, MOCKED_MAP)).toBe("SEED TEST");
    });
    it("should return empty string if no action available", () => {
      const actions = new Actions([]);
      const gameState: GameState = {
        day: 0,
        trees: new Trees(),
      } as GameState;
      expect(actions.bestAction(gameState, MOCKED_MAP)).toBe("");
    });
    it("should return empty string action score is 0", () => {
      const lowScoreAction = new SeedAction(undefined, undefined);
      lowScoreAction.computeScore = jest.fn().mockImplementation(() => 0);
      const actions = new Actions([lowScoreAction]);
      const gameState: GameState = {
        day: 0,
        trees: new Trees(),
      } as GameState;
      expect(actions.bestAction(gameState, MOCKED_MAP)).toBe("");
    });
  });
});
