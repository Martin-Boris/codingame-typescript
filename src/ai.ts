import { GameState, Map } from "./io/input";
import { Move } from "./io/move";
import { parseGameState } from "./io/parser";
import find from "./utils/find";
import findGreatest from "./utils/findGreatest";

export function findBestMove(moves: Move[], map: Map, gameState: GameState) {
    return findGreatest(moves, move => {
        if (move.type === 'COMPLETE') {
            return map[move.cellId].richness + gameState.day;
        } else if (move.type === 'GROW') {
            const tree = find(gameState.trees, tree => tree.cellId === move.cellId);
            return tree.size * 2;
        } else {
            return -1;
        }
    });
}
