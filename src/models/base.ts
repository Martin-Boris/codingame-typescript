export class Base {
  private x: number;
  private y: number;
  private health: number;
  private mana: number;

  constructor(x: number, y: number, health: number, mana: number) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.mana = mana;
  }

  public getDefensivePositionAction(): Array<String> {
    if (this.x === 0 && this.y === 0) {
      return ["MOVE 6000 1000", "MOVE 5000 3000", "MOVE 2500 5000"];
    }
    return ["MOVE 15000 4000", "MOVE 13800 5800", "MOVE 12700 7900"];
  }
}
