import { CompleteAction } from "./action/complete-action";
import { GrowAction } from "./action/grow-action";
import { SeedAction } from "./action/seed-action";
import { Actions } from "./actions/actions";
import { GameState, Map } from "./io/input";

export function initActions(
  gameState: GameState,
  map: Map
): {
  seedActions: Actions;
  growActions: Actions;
  completeActions: Actions;
} {
  const seedActions: SeedAction[] = [];
  const growActions: GrowAction[] = [];
  const completeActions: CompleteAction[] = [];
  gameState.possibleMoves.forEach((action) => {
    if (action.includes("SEED")) {
      seedActions.push(SeedAction.initFromString(action, gameState.trees, map));
    }

    if (action.includes("GROW")) {
      growActions.push(GrowAction.initFromString(action, gameState.trees));
    }

    if (action.includes("COMPLETE")) {
      completeActions.push(
        CompleteAction.initFromString(action, gameState.trees)
      );
    }
  });
  return {
    seedActions: new Actions(seedActions),
    growActions: new Actions(growActions),
    completeActions: new Actions(completeActions),
  };
}
