import { SeedAction } from "../action/seed-action";
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
    it("should choose the first seed action from a tree more than T1", () => {
      let seed_15_12 = new SeedAction(tree_15_size_1, cell_12);
      let seed_12_15 = new SeedAction(tree_12_size_2, cell_15);
      const actions = new SeedActions([seed_15_12, seed_12_15], []);
      let action = actions.getBestAction(0);
      expect(action).toBe("SEED 12 15");
    });
    it("should return empty string in case there already is a seed", () => {
      let seed_15_12 = new SeedAction(tree_15_size_1, cell_12);
      let seed_12_15 = new SeedAction(tree_12_size_2, cell_15);
      const actions = new SeedActions([seed_15_12, seed_12_15], [tree_seed]);
      let action = actions.getBestAction(0);
      expect(action).toBe("");
    });
    it("should return empty string in case SEED_TRESHOLD_DAY reached", () => {
      let seed_15_12 = new SeedAction(tree_15_size_1, cell_12);
      let seed_12_15 = new SeedAction(tree_12_size_2, cell_15);
      const actions = new SeedActions([seed_15_12, seed_12_15], []);
      let action = actions.getBestAction(SEED_TRESHOLD_DAY + 1);
      expect(action).toBe("");
    });
    it("should choose action with best score", () => {
      let actionLowScore = new SeedAction({} as Tree, {} as Cell);
      let actionHighScore = new SeedAction({} as Tree, {} as Cell);
      actionLowScore.computeScore = jest.fn().mockImplementation(() => 1);
      actionHighScore.computeScore = jest.fn().mockImplementation(() => 2);
      actionHighScore.getStringAction = jest
        .fn()
        .mockImplementation(() => "test succes");
      const actions = new SeedActions([actionLowScore, actionHighScore], []);
      let action = actions.getBestAction(0);
      expect(action).toBe("test succes");
    });

    it("should not execute action when best score is 0", () => {
      let actionToLowScore = new SeedAction({} as Tree, {} as Cell);
      actionToLowScore.computeScore = jest.fn().mockImplementation(() => 0);
      const actions = new SeedActions([actionToLowScore], []);
      let action = actions.getBestAction(0);
      expect(action).toBe("");
    });
  });
});
