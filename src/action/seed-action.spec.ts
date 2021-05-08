import { Map, Tree } from "../io/input";
import { SeedAction } from "./seed-action";

describe("SeedAction", () => {
  const cell_15 = {
    index: 15,
    richness: 1,
    neighborIndexes: [],
    neighbors: [],
  };
  const cell_12 = {
    index: 12,
    richness: 3,
    neighborIndexes: [],
    neighbors: [],
  };
  const tree_15_size_2 = {
    cellIndex: 15,
    size: 0,
    isMine: true,
    isDormant: false,
  } as Tree;
  const tree_1_size_0 = {
    cellIndex: 1,
    size: 0,
    isMine: false,
    isDormant: false,
  } as Tree;
  let trees: Tree[] = [tree_15_size_2, tree_1_size_0];

  let map: Map = { 15: cell_15, 12: cell_12 };
  describe("initFromString", () => {
    it("should initialize Seed action properly from string", () => {
      let action = SeedAction.initFromString("SEED 15 12", map, trees);
      expect(action.type).toBe("SEED");
      expect(action.treeFrom).toBe(tree_15_size_2);
      expect(action.cellTo).toBe(cell_12);
    });
  });

  describe("getStringAction", () => {
    let action = new SeedAction(tree_15_size_2, cell_12);
    expect(action.getStringAction()).toBe("SEED 15 12");
  });
});
