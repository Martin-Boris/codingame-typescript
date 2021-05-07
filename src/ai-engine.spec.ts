import { GameState, Map } from "./io/input";
import { AIEngine } from "./ai-engine";
import { ActionController } from "./controller/action-controller";

describe("ia-engine", () => {
  it("should do the first action from possible move which is not WAIT", () => {
    let aiEngine = new AIEngine({} as Map);
    let gameState: GameState = {
      possibleMoves: ["WAIT", "COMPLETE 1", "COMPLETE 2"],
    } as GameState;
    expect(
      aiEngine.computeNextMove(gameState, {} as ActionController)
    ).not.toBe("WAIT");
    expect(aiEngine.computeNextMove(gameState, {} as ActionController)).toBe(
      "COMPLETE 1"
    );
  });

  it("should do a WAIT action from possible move", () => {
    let aiEngine = new AIEngine({} as Map);
    let gameState: GameState = { possibleMoves: ["WAIT"] } as GameState;
    expect(aiEngine.computeNextMove(gameState, {} as ActionController)).toBe(
      "WAIT"
    );
  });

  it("should call selectBestOption", () => {
    let aiEngine = new AIEngine({} as Map);
    let actionController: ActionController = new ActionController([], {}, []);
    actionController.selectBestMove = jest.fn();
    let gameState: GameState = {
      possibleMoves: ["WAIT", "SEED 12 15"],
    } as GameState;
    expect(aiEngine.computeNextMove(gameState, actionController));
    expect(actionController.selectBestMove).toHaveBeenCalled();
  });
});
