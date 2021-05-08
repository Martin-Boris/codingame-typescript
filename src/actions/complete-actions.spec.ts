import { Tree } from "../io/input";
import { CompleteAction } from "../action/complete-action";
import { CompleteActions } from "./complete-actions";
import { TresholdState } from "../constante/treshold";

describe("CompleteActions", () => {
  let tresholdState = new TresholdState(0);
  describe("getBestAction", () => {
    it("should return empty string if no complete action", () => {
      const actions = new CompleteActions([], tresholdState);
      expect(actions.getBestAction(0)).toBe("");
    });
    it("should complete when MAX_T3_TRESHOLD reached", () => {
      const tree_size_3 = {
        cellIndex: 0,
        size: 3,
        isMine: true,
        isDormant: false,
      } as Tree;
      const action = new CompleteAction(tree_size_3);
      const actions = new CompleteActions(
        [action, action, action, action, action, action],
        tresholdState
      );
      expect(actions.getBestAction(0)).toBe("COMPLETE 0");
    });
  });
});
