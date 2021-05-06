import { findBestMove } from "./ai";
import { formatMove } from "./io/move";
import { parseGameState, parseMap } from "./io/parser";

const map = parseMap();

while (true) {
    const gameState = parseGameState(map);
    const bestMove = findBestMove(gameState.possibleMoves, map, gameState);
    console.log(formatMove(bestMove));
}
