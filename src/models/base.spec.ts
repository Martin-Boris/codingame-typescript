import { Base } from "./base";
import {
  BASE_POSITION_X_LEFT_CORNER,
  BASE_POSITION_X_RIGHT_CORNER,
  BASE_POSITION_Y_LEFT_CORNER,
  BASE_POSITION_Y_RIGHT_CORNER,
} from "./constant/game-constant";

describe("base unit test", () => {
  it("should generate defensive action when base is in 0,0", () => {
    const base = new Base(
      BASE_POSITION_X_LEFT_CORNER,
      BASE_POSITION_Y_LEFT_CORNER,
      100,
      100
    );
    const actions = base.getDefensivePositionAction();
    expect(actions).toEqual([
      "MOVE 4000 800",
      "MOVE 2930 2700",
      "MOVE 1200 3700",
    ]);
  });

  it("should generate defensive action when base is in 17630,9000", () => {
    const base = new Base(
      BASE_POSITION_X_RIGHT_CORNER,
      BASE_POSITION_Y_RIGHT_CORNER,
      100,
      100
    );
    const actions = base.getDefensivePositionAction();
    expect(actions).toEqual([
      "MOVE 16500 5000",
      "MOVE 14400 6000",
      "MOVE 13600 7900",
    ]);
  });
});
