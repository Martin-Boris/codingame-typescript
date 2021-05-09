import { Tree } from "../io/input";
import { CompleteAction } from "../action/complete/complete-action";
import { CompleteActions } from "./complete-actions";
import { TresholdState } from "../constante/treshold";

describe("CompleteActions", () => {
  let tresholdState = new TresholdState(0);
  describe("getBestAction", () => {
    it("should return empty string if no complete action", () => {
      const actions = new CompleteActions([], tresholdState);
      expect(actions.getBestAction()).toBe("");
    });
    it("should complete when MAX_T3_TRESHOLD reached", () => {
      const tree_size_3 = {
        cellIndex: 0,
        size: 3,
        isMine: true,
        isDormant: false,
      } as Tree;
      const action = new CompleteAction(tree_size_3, 1);
      const actions = new CompleteActions(
        [action, action, action, action, action, action],
        tresholdState
      );
      expect(actions.getBestAction()).toBe("COMPLETE 0");
    });
    it("should complete higher score action", () => {
      const lowScoreAction = new CompleteAction({} as Tree, 0.2);
      const highScoreAction = new CompleteAction({} as Tree, 1);
      highScoreAction.getStringAction = jest
        .fn()
        .mockImplementation(() => "COMPLETE 1");
      const actions = new CompleteActions(
        [
          lowScoreAction,
          lowScoreAction,
          lowScoreAction,
          lowScoreAction,
          highScoreAction,
        ],
        tresholdState
      );
      expect(actions.getBestAction()).toBe("COMPLETE 1");
    });
  });
});
