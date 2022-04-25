import { Base } from "../models/base";
import { Position } from "../utils/position";

const POSITION_1 = [new Position(6400, 2200), new Position(10420, 6800)];
const POSITION_2 = [new Position(2200, 6450), new Position(15430, 2900)];

let targetPosition = POSITION_1;

const computeRoamingBrawlerPosition = (
  brawlerPosition: Position,
  base: Base
): Position => {
  const indexToLookFor = base.getPosition().isPositionLeft() ? 0 : 1;
  if (brawlerPosition.equals(targetPosition[indexToLookFor])) {
    if (targetPosition[indexToLookFor].equals(POSITION_1[indexToLookFor])) {
      targetPosition = POSITION_2;
    } else if (
      targetPosition[indexToLookFor].equals(POSITION_2[indexToLookFor])
    ) {
      targetPosition = POSITION_1;
    }
  }
  return targetPosition[indexToLookFor];
};

export { computeRoamingBrawlerPosition };
