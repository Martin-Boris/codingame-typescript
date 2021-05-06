import { formatMove, Move } from "./io/move";
import { parseGameState, parseMap } from "./io/parser";
import find from "./utils/find";

const map = parseMap();

while (true) {
    const gameState = parseGameState(map);

    let bestMoveRichness = 0;
    let bestMove: Move = { type: 'WAIT' };

    for (const move of gameState.possibleMoves) {
        if (move.type === 'COMPLETE') {
            const cellRichness = map[move.cellId].richness;
            if (cellRichness > bestMoveRichness) {
                bestMoveRichness = cellRichness;
                bestMove = move;
            }
        }
    }

    console.log(formatMove(bestMove));
}
