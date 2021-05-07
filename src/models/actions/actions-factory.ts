import { Map, Tree } from "../../io/input";
import { GrowAction } from "../action/grow-action";
import { SeedAction } from "../action/seed-action";
import { Actions } from "./actions";
import { GrowActions } from "./grow-actions";
import { SeedActions } from "./seed-actions";

const actionFactory = (
  actions: String[],
  map: Map,
  trees: Tree[]
): { seedActions: Actions; growActions: Actions } => {
  const seedActions: SeedAction[] = [];
  const growActions: GrowAction[] = [];
  actions.forEach((action) => {
    if (action.includes("SEED")) {
      seedActions.push(SeedAction.initFromString(action, map));
    }
    if (action.includes("GROW")) {
      growActions.push(GrowAction.initFromString(action, trees));
    }
  });
  return {
    seedActions: new SeedActions(seedActions),
    growActions: new GrowActions(growActions),
  };
};

export default actionFactory;
