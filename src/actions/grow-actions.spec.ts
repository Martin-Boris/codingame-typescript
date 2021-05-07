import { Tree } from "../io/input";
import { GrowAction } from "../action/grow-action";
import { GrowActions } from "./grow-actions";

describe("GrowActions", () => {
  describe("getBestAction", () => {
    it("should return empty string if no gro action available", () => {
      const actions = new GrowActions([]);
      expect(actions.getBestAction()).toBe("");
    });

    it("should return higher tree size string action", () => {
      const tree_size_3 = {
        cellIndex: 0,
        size: 3,
        isMine: true,
        isDormant: false,
      } as Tree;
      const tree_size_1 = {
        cellIndex: 1,
        size: 1,
        isMine: true,
        isDormant: false,
      } as Tree;
      const actions = new GrowActions([
        new GrowAction(tree_size_3),
        new GrowAction(tree_size_1),
      ]);
      expect(actions.getBestAction()).toBe("GROW 0");
    });
  });
});
