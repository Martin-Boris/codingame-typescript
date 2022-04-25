import { Base } from "../models/base";
import { Position } from "../utils/position";

const POSITION_ATK_1 = [new Position(5000, 2200), new Position(12300, 6800)];
const POSITION_ATK_2 = [new Position(2200, 4700), new Position(15430, 3900)];
const POSITION_ATK_3 = [new Position(2200, 2200), new Position(15430, 6800)];

let targetPosition = POSITION_ATK_1;

const computeRoamingAttackPosition = (
  atkPosition: Position,
  base: Base
): Position => {
  const indexToLookFor = base.getPosition().isPositionLeft() ? 1 : 0;
  if (atkPosition.equals(targetPosition[indexToLookFor])) {
    if (targetPosition[indexToLookFor].equals(POSITION_ATK_1[indexToLookFor])) {
      targetPosition = POSITION_ATK_2;
    } else if (
      targetPosition[indexToLookFor].equals(POSITION_ATK_2[indexToLookFor])
    ) {
      targetPosition = POSITION_ATK_3;
    } else if (
      targetPosition[indexToLookFor].equals(POSITION_ATK_3[indexToLookFor])
    ) {
      targetPosition = POSITION_ATK_1;
    }
  }
  return targetPosition[indexToLookFor];
};

export { computeRoamingAttackPosition };
