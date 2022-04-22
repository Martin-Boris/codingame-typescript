import { Entity } from "../entity";
export class Hero implements Entity {
  private id: number;
  private x: number;
  private y: number;

  constructor(id: number, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
  public getX(): number {
    return this.x;
  }
  public getY(): number {
    return this.y;
  }
}
