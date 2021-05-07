import { Tree } from "../io/input";
import { CompleteAction } from "../action/complete-action";
import { CompleteActions } from "./complete-actions";
import { COMPLETE_TRESHOLD_DAY } from "../constante/treshold";

describe("CompleteActions", () => {
  describe("getBestAction", () => {
    it("should return empty string if no complete action", () => {
      const actions = new CompleteActions([]);
      expect(actions.getBestAction(0)).toBe("");
    });
    it("should return empty string if before SEED_TRESHOLD_DAY", () => {
      const actions = new CompleteActions([]);
      expect(actions.getBestAction(0)).toBe("");
    });
    it("should complete first action when COMPLETE_TRESHOLD_DAY reached", () => {
      const tree_size_3 = {
        cellIndex: 0,
        size: 3,
        isMine: true,
        isDormant: false,
      } as Tree;
      const action = new CompleteAction(tree_size_3);
      const actions = new CompleteActions([action]);
      expect(actions.getBestAction(COMPLETE_TRESHOLD_DAY + 1)).toBe(
        "COMPLETE 0"
      );
    });
    it("should complete when MAX_T3_TRESHOLD reached", () => {
      const tree_size_3 = {
        cellIndex: 0,
        size: 3,
        isMine: true,
        isDormant: false,
      } as Tree;
      const action = new CompleteAction(tree_size_3);
      const actions = new CompleteActions([
        action,
        action,
        action,
        action,
        action,
        action,
      ]);
      expect(actions.getBestAction(0)).toBe("COMPLETE 0");
    });
  });
});
