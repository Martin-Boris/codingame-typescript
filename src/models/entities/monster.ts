export class Monster {
  private id: number;
  private x: number;
  private y: number;
  private health: number;
  private vx: number;
  private vy: number;
  private nearBase: number;
  private threatFor: number;

  constructor(
    id: number,
    x: number,
    y: number,
    health: number,
    vx: number,
    vy: number,
    nearBase: number,
    threatFor: number
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.health = health;
    this.vx = vx;
    this.vy = vy;
    this.nearBase = nearBase;
    this.threatFor = threatFor;
  }

  public isFocusingAlly(): boolean {
    return this.threatFor === 1 && this.nearBase === 1;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }
}
