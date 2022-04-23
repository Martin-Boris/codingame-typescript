export class Position {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  isPositionLeft(): boolean {
    return this.x === 0 && this.y === 0;
  }

  convertIntoMoveAction(): String {
    return "MOVE " + this.x + " " + this.y;
  }

  equals(position: Position): boolean {
    return this.x === position.getX() && this.y === position.getY();
  }
}
