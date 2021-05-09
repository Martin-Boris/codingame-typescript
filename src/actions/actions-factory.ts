import { Map, Tree } from "../io/input";
import { Action } from "../action/action";
import { CompleteAction } from "../action/complete-action";
import { GrowAction } from "../action/grow-action";
import { SeedAction } from "../action/seed/seed-action";
import { Actions } from "./actions";
import { CompleteActions } from "./complete-actions";
import { GrowActions } from "./grow-actions";
import { SeedActions } from "./seed-actions";
import { TresholdState } from "../constante/treshold";

const actionFactory = (
  actions: String[],
  map: Map,
  trees: Tree[],
  tresholdState: TresholdState
): { seedActions: Actions; growActions: Actions; completeActions: Actions } => {
  const seedActions: SeedAction[] = [];
  const growActions: GrowAction[] = [];
  const completeActions: CompleteAction[] = [];
  actions.forEach((action) => {
    if (action.includes("SEED")) {
      seedActions.push(SeedAction.initFromString(action, map, trees));
    }
    if (action.includes("GROW")) {
      growActions.push(GrowAction.initFromString(action, trees));
    }
    if (action.includes("COMPLETE")) {
      completeActions.push(CompleteAction.initFromString(action, trees));
    }
  });
  const mineTree = getMineTree(trees);
  return {
    seedActions: new SeedActions(seedActions, trees),
    growActions: new GrowActions(growActions, mineTree, tresholdState),
    completeActions: new CompleteActions(completeActions, tresholdState),
  };
};

const getMineTree = (trees: Tree[]): Tree[] => {
  return trees.filter((tree) => tree.isMine);
};

export default actionFactory;
