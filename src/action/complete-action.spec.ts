import { Tree } from "../io/input";
import { CompleteAction } from "./complete-action";

describe("CompleteAction", () => {
  const tree_0 = {
    cellIndex: 0,
    size: 3,
    isMine: true,
    isDormant: false,
  };
  let trees: Partial<Tree>[] = [tree_0];
  describe("initFromString", () => {
    let action = CompleteAction.initFromString("COMPLETE 0", trees as Tree[]);
    expect(action.type).toBe("COMPLETE");
    expect(action.tree).toBe(tree_0);
  });

  describe("getStringAction", () => {
    it("should return action in string format", () => {
      let action = new CompleteAction(tree_0 as Tree);
      expect(action.getStringAction()).toBe("COMPLETE 0");
    });
  });
});
