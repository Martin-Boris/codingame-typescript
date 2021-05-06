import { Map } from "./io/input";
import { Move } from "./io/move";
import findGreatest from "./utils/findGreatest";

export function findBestMove(moves: Move[], map: Map) {
    return findGreatest(moves, move => {
        if (move.type === 'COMPLETE') {
            return map[move.cellId].richness;
        } else {
            return -1;
        }
    });
}
