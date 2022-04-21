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
}