import { GameState, Map } from "./io/input";
import { AIEngine } from "./ai-engine";

describe("ia-engine", () => {
  it("should do the first action from possible move which is not WAIT", () => {
    let aiEngine = new AIEngine({} as Map);
    let gameState: GameState = {
      possibleMoves: ["WAIT", "COMPLETE 1", "COMPLETE 2"],
    } as GameState;
    expect(aiEngine.computeNextMove(gameState)).not.toBe("WAIT");
    expect(aiEngine.computeNextMove(gameState)).toBe("COMPLETE 1");
  });

  it("should do a WAIT action from possible move", () => {
    let aiEngine = new AIEngine({} as Map);
    let gameState: GameState = { possibleMoves: ["WAIT"] } as GameState;
    expect(aiEngine.computeNextMove(gameState)).toBe("WAIT");
  });
});
