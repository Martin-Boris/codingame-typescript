import { Map, Tree } from "../io/input";
import { Action } from "../action/action";
import { CompleteAction } from "../action/complete-action";
import { GrowAction } from "../action/grow-action";
import { SeedAction } from "../action/seed-action";
import { Actions } from "./actions";
import { CompleteActions } from "./complete-actions";
import { GrowActions } from "./grow-actions";
import { SeedActions } from "./seed-actions";

const actionFactory = (
  actions: String[],
  map: Map,
  trees: Tree[]
): { seedActions: Actions; growActions: Actions; completeActions: Actions } => {
  const seedActions: SeedAction[] = [];
  const growActions: GrowAction[] = [];
  const completeActions: CompleteAction[] = [];
  const numberOfseed = getNumberOfSeed(trees);
  actions.forEach((action) => {
    if (action.includes("SEED")) {
      seedActions.push(SeedAction.initFromString(action, map));
    }
    if (action.includes("GROW")) {
      growActions.push(GrowAction.initFromString(action, trees));
    }
    if (action.includes("COMPLETE")) {
      completeActions.push(CompleteAction.initFromString(action, trees));
    }
  });
  return {
    seedActions: new SeedActions(seedActions, numberOfseed),
    growActions: new GrowActions(growActions),
    completeActions: new CompleteActions(completeActions),
  };
};

const getNumberOfSeed = (trees: Tree[]): number => {
  return trees.filter((tree) => tree.isMine && tree.size === 0).length;
};

export default actionFactory;
