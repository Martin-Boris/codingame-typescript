import { Tree } from "../../io/input";
import { GrowAction } from "./grow-action";

describe("GrowAction", () => {
  const tree_0 = {
    cellIndex: 0,
    size: 0,
    isMine: true,
    isDormant: false,
  };
  let trees: Partial<Tree>[] = [
    tree_0,
    {
      cellIndex: 1,
      size: 0,
      isMine: false,
      isDormant: false,
    },
  ];
  describe("initFromString", () => {
    let action = GrowAction.initFromString("GROW 0", trees as Tree[]);
    expect(action.type).toBe("GROW");
    expect(action.tree).toBe(tree_0);
  });

  describe("getStringAction", () => {
    it("should return action in string format", () => {
      let action = new GrowAction(tree_0 as Tree);
      expect(action.getStringAction()).toBe("GROW 0");
    });
  });
});
