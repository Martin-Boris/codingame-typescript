import { Entity } from "../models/entities/entity";

export const computeDistancebeetwen = (entityA: Entity, entityB: Entity) => {
  const dx = Math.abs(entityA.getX() - entityB.getX());
  const dy = Math.abs(entityA.getY() - entityB.getY());
  return Math.pow(dx, 2) + Math.pow(dy, 2);
};
