import { findBestMove } from "./ai";
import { Cell, Map } from "./io/input";
import { Move } from "./io/move";

describe('Index', () => {

    describe('Best move', () => {

        it('should prefer completing moves with higher richness', () => {
            const map: Map = [
                cell({ index: 0, richness: 0 }),
                cell({ index: 1, richness: 2 }),
                cell({ index: 2, richness: 4 }),
                cell({ index: 3, richness: 2 })
            ]

            const moves: Move[] = [
                { type: 'WAIT' },
                { type: 'COMPLETE', cellId: 0 },
                { type: 'COMPLETE', cellId: 1 },
                { type: 'COMPLETE', cellId: 2 },
                { type: 'COMPLETE', cellId: 3 }
            ]

            const bestMove = findBestMove(moves, map);

            expect(bestMove).toEqual({ type: 'COMPLETE', cellId: 2 });
        });

    });

});

function cell(customData: Partial<Cell>): Cell {
    return {
        index: 0,
        richness: 0,
        neighborIndexes: [],
        neighbors: [],
        ...customData
    };
}