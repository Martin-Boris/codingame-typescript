import { Map, Tree } from "../../io/input";
import actionFactory from "./actions-factory";

describe("actions-factory", () => {
  it("should init action from string", () => {
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
    const tree_0 = {
      cellIndex: 0,
      size: 0,
      isMine: true,
      isDormant: false,
    };
    const tree_1 = {
      cellIndex: 1,
      size: 0,
      isMine: false,
      isDormant: false,
    };
    let trees: Partial<Tree>[] = [tree_0, tree_1];
    const actions = ["WAIT", "GROW 0", "GROW 1", "SEED 15 12", "SEED 12 15"];
    const InstanciateAction = actionFactory(actions, map, trees as Tree[]);
    expect(InstanciateAction.growActions.actions).toHaveLength(2);
    expect(InstanciateAction.growActions.actions[0].getStringAction()).toBe(
      "GROW 0"
    );
    expect(InstanciateAction.seedActions.actions).toHaveLength(2);
    expect(InstanciateAction.seedActions.actions[0].getStringAction()).toBe(
      "SEED 15 12"
    );
  });
});
