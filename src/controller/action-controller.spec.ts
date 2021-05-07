import { Map, Tree } from "../io/input";
import { ActionController } from "./action-controller";

describe("actions", () => {
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
  let map: Map = { 15: cell_15, 12: cell_12 };
  let tree_35 = {
    cellIndex: 35,
    size: 0,
    isMine: true,
    isDormant: false,
  };
  let trees: Partial<Tree>[] = [
    tree_35,
    {
      cellIndex: 1,
      size: 0,
      isMine: false,
      isDormant: false,
    },
  ];

  describe("initialisation", () => {
    it("should init only seed action from a list of action", () => {
      let actions = ["WAIT", "GROW 35", "SEED 15 12"];
      let actionController: ActionController = new ActionController(
        actions,
        map,
        []
      );
      expect(actionController.seedAvailableActions).toHaveLength(1);
      expect(actionController.seedAvailableActions[0].cellFrom).toBe(cell_15);
      expect(actionController.seedAvailableActions[0].cellTo).toBe(cell_12);
    });

    it("should init only mine treew from a list of trees", () => {
      let actions = ["WAIT", "GROW 35", "SEED 15 12"];
      let seedActions: ActionController = new ActionController(
        actions,
        map,
        trees as Tree[]
      );
      expect(seedActions.mineTrees).toHaveLength(1);
      expect(seedActions.mineTrees[0].size).toBe(0);
      expect(seedActions.mineTrees[0].isMine).toBeTruthy();
    });

    it("should init grow action from list of action", () => {
      let actions = ["WAIT", "GROW 35", "SEED 15 12"];
      let seedActions: ActionController = new ActionController(
        actions,
        map,
        trees as Tree[]
      );
      expect(seedActions.growAvailableActions).toHaveLength(1);
      expect(seedActions.growAvailableActions[0].type).toBe("GROW");
      expect(seedActions.growAvailableActions[0].tree).toBe(tree_35);
    });
  });

  describe("selectBestMove", () => {
    it("should select WAIT if there is already a seed", () => {
      let actions = ["WAIT", "SEED 15 12", "SEED 12 15"];
      let seedActions: ActionController = new ActionController(
        actions,
        map,
        trees as Tree[]
      );
      let action = seedActions.selectBestMove();
      expect(action).toBe("WAIT");
    });
    it("should select the more efficient tree to grow", () => {
      let trees: Partial<Tree>[] = [
        {
          cellIndex: 35,
          size: 1,
          isMine: true,
          isDormant: false,
        },
        {
          cellIndex: 1,
          size: 2,
          isMine: true,
          isDormant: false,
        },
      ];
      let actions = ["WAIT", "GROW 35", "GROW 1"];
      let actionController: ActionController = new ActionController(
        actions,
        map,
        trees as Tree[]
      );
      expect(actionController.selectBestMove()).toBe("GROW 1");
    });
  });
});
