import { Map, Tree } from "../io/input";
import actionFactory from "./actions-factory";
import { SeedActions } from "./seed-actions";
import { TresholdState } from "../constante/treshold";

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
    const tree_12 = {
      cellIndex: 12,
      size: 0,
      isMine: false,
      isDormant: false,
    };
    const tree_15 = {
      cellIndex: 15,
      size: 3,
      isMine: true,
      isDormant: false,
    };
    let trees: Partial<Tree>[] = [tree_0, tree_12, tree_15];
    const actions = [
      "WAIT",
      "COMPLETE 15",
      "GROW 15",
      "GROW 12",
      "SEED 15 12",
      "SEED 12 15",
    ];
    const InstanciateAction = actionFactory(
      actions,
      map,
      trees as Tree[],
      new TresholdState(0),
      {
        1: {},
      },
      1
    );
    expect(InstanciateAction.growActions.actions).toHaveLength(2);
    expect(InstanciateAction.growActions.actions[0].getStringAction()).toBe(
      "GROW 15"
    );
    expect(InstanciateAction.seedActions.actions).toHaveLength(2);
    expect(InstanciateAction.seedActions.actions[0].getStringAction()).toBe(
      "SEED 15 12"
    );

    expect(InstanciateAction.completeActions.actions).toHaveLength(1);
    expect(InstanciateAction.completeActions.actions[0].getStringAction()).toBe(
      "COMPLETE 15"
    );
  });
});
