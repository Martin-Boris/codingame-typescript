import { SeedAction } from "../action/seed/seed-action";
import { SEED_TRESHOLD_DAY } from "../constante/treshold";
import { Cell, Tree } from "../io/input";
import { SeedActions } from "./seed-actions";

describe("SeedActions", () => {
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
  const tree_seed = {
    cellIndex: 2,
    size: 0,
    isMine: true,
    isDormant: false,
  } as Tree;
  const tree_15_size_1 = {
    cellIndex: 15,
    size: 1,
    isMine: true,
    isDormant: false,
  } as Tree;
  const tree_12_size_2 = {
    cellIndex: 12,
    size: 2,
    isMine: true,
    isDormant: false,
  } as Tree;
  describe("getBestAction", () => {
    it("should return empty string in case no action available", () => {
      const actions = new SeedActions([], []);
      let action = actions.getBestAction(0);
      expect(action).toBe("");
    });
    it("should return empty string in case there already is a seed", () => {
      let seed_15_12 = new SeedAction(tree_15_size_1, cell_12, 1);
      const actions = new SeedActions([seed_15_12], [tree_seed]);
      let action = actions.getBestAction(0);
      expect(action).toBe("");
    });
    it("should choose action with best score", () => {
      let actionLowScore = new SeedAction(
        {} as Tree,
        { richness: 1 } as Cell,
        1
      );
      let actionHighScore = new SeedAction(
        {} as Tree,
        { richness: 1 } as Cell,
        2
      );
      actionHighScore.getStringAction = jest
        .fn()
        .mockImplementation(() => "test succes");
      const actions = new SeedActions([actionLowScore, actionHighScore], []);
      let action = actions.getBestAction(0);
      expect(action).toBe("test succes");
    });

    it("should choose action with best score and best richness", () => {
      let actionLowScore = new SeedAction(
        {} as Tree,
        { richness: 1 } as Cell,
        2
      );
      let actionHighScore = new SeedAction(
        {} as Tree,
        { richness: 2 } as Cell,
        2
      );
      actionHighScore.getStringAction = jest
        .fn()
        .mockImplementation(() => "test succes");
      const actions = new SeedActions([actionLowScore, actionHighScore], []);
      let action = actions.getBestAction(0);
      expect(action).toBe("test succes");
    });

    it("should not execute action when best score is 0", () => {
      let actionToLowScore = new SeedAction({} as Tree, {} as Cell, 0);
      const actions = new SeedActions([actionToLowScore], []);
      let action = actions.getBestAction(0);
      expect(action).toBe("");
    });
  });
});
