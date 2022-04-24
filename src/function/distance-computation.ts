import { WIND_RANGE } from "../models/constant/game-constant";
import { Entity } from "../models/entities/entity";
import { Position } from "../utils/position";

const computeDistancebeetwen = (posA: Position, posB: Position) => {
  const dx = Math.abs(posA.getX() - posB.getX());
  const dy = Math.abs(posA.getY() - posB.getY());
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};

const isInWindRange = (posA: Position, posB: Position) => {
  return computeDistancebeetwen(posA, posB) < WIND_RANGE;
};

export { isInWindRange, computeDistancebeetwen };
