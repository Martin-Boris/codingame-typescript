import { Map, Tree } from "../io/input";
import { CompleteAction } from "../action/complete/complete-action";
import { GrowAction } from "../action/grow/grow-action";
import { SeedAction } from "../action/seed/seed-action";
import { Actions } from "./actions";
import { CompleteActions } from "./complete-actions";
import { GrowActions } from "./grow-actions";
import { SeedActions } from "./seed-actions";
import { TresholdState } from "../constante/treshold";
import { ShadowMapMultipleDay } from "../shadow/shadow-map";

const actionFactory = (
  actions: String[],
  map: Map,
  trees: Tree[],
  tresholdState: TresholdState,
  shadowMapMultipleDay: ShadowMapMultipleDay,
  day: number,
  nutrients: number
): { seedActions: Actions; growActions: Actions; completeActions: Actions } => {
  const seedActions: SeedAction[] = [];
  const growActions: GrowAction[] = [];
  const completeActions: CompleteAction[] = [];
  actions.forEach((action) => {
    if (action.includes("SEED")) {
      seedActions.push(
        SeedAction.initFromString(action, map, trees, shadowMapMultipleDay)
      );
    }
    if (action.includes("GROW")) {
      growActions.push(
        GrowAction.initFromString(action, trees, shadowMapMultipleDay, day)
      );
    }
    if (action.includes("COMPLETE")) {
      completeActions.push(
        CompleteAction.initFromString(
          action,
          trees,
          shadowMapMultipleDay,
          day,
          map,
          nutrients
        )
      );
    }
  });
  return {
    seedActions: new SeedActions(seedActions),
    growActions: new GrowActions(growActions),
    completeActions: new CompleteActions(
      completeActions,
      tresholdState,
      nutrients
    ),
  };
};

const getMineTree = (trees: Tree[]): Tree[] => {
  return trees.filter((tree) => tree.isMine);
};

export default actionFactory;
