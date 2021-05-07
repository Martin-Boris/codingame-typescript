import { CompleteActions } from "../actions/complete-actions";
import { GrowActions } from "../actions/grow-actions";
import { SeedActions } from "../actions/seed-actions";
import { ActionController } from "./action-controller";

describe("actions", () => {
  describe("selectBestMove", () => {
    let completeAction: CompleteActions;
    let growAction: GrowActions;
    let seedAction: SeedActions;
    let actionController: ActionController;
    beforeEach(() => {
      completeAction = new CompleteActions([]);
      growAction = new GrowActions([]);
      seedAction = new SeedActions([], 0);
      actionController = new ActionController(
        seedAction,
        growAction,
        completeAction
      );
    });
    it("should wait", () => {
      expect(actionController.selectBestMove(0)).toBe("WAIT");
    });
    it("should Complete action", () => {
      completeAction.getBestAction = jest
        .fn()
        .mockImplementation(() => "COMPLETE 1");
      expect(actionController.selectBestMove(0)).toBe("COMPLETE 1");
    });
    it("should Grow action", () => {
      completeAction.getBestAction = jest.fn().mockImplementation(() => "");
      growAction.getBestAction = jest.fn().mockImplementation(() => "GROW 1");
      expect(actionController.selectBestMove(0)).toBe("GROW 1");
    });
    it("should seed action", () => {
      completeAction.getBestAction = jest.fn().mockImplementation(() => "");
      growAction.getBestAction = jest.fn().mockImplementation(() => "");
      seedAction.getBestAction = jest.fn().mockImplementation(() => "SEED 1");
      expect(actionController.selectBestMove(0)).toBe("SEED 1");
    });
  });
});
