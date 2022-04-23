import { Position } from "../../utils/position";

export interface Entity {
  getX(): number;
  getY(): number;
  getPosition(): Position;
}
