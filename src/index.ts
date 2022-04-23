import { Base } from "./models/base";
import { Board } from "./models/board";
import { Hero } from "./models/entities/hero/hero";
import { Monster } from "./models/entities/monster/monster";
import { Monsters } from "./models/entities/monster/monsters";

var inputs = readline().split(" ");
const baseX = parseInt(inputs[0]);
const baseY = parseInt(inputs[1]);
const heroesPerPlayer = parseInt(readline());

let turnCount = 0;

while (true) {
  let health: number;
  let mana: number;
  const monsters: Array<Monster> = new Array();
  const allyHeros: Array<Hero> = new Array();

  turnCount++;
  for (let i = 0; i < 2; i++) {
    var inputs = readline().split(" ");
    if (i == 0) {
      health = parseInt(inputs[0]); // Your base health
      mana = parseInt(inputs[1]); // Ignore in the first league; Spend ten mana to cast a spell
    } else {
      const enemyHealth = parseInt(inputs[0]); // Your base health
      const enemyMana = parseInt(inputs[1]); // Ignore in the first league; Spend ten mana to cast a spell
    }
  }
  const entityCount = parseInt(readline()); // Amount of heros and monsters you can see
  for (let i = 0; i < entityCount; i++) {
    var inputs = readline().split(" ");
    const id = parseInt(inputs[0]); // Unique identifier
    const type = parseInt(inputs[1]); // 0=monster, 1=your hero, 2=opponent hero
    const x = parseInt(inputs[2]); // Position of this entity
    const y = parseInt(inputs[3]);
    const shieldLife = parseInt(inputs[4]); // Ignore for this league; Count down until shield spell fades
    const isControlled = parseInt(inputs[5]); // Ignore for this league; Equals 1 when this entity is under a control spell
    const health = parseInt(inputs[6]); // Remaining health of this monster
    const vx = parseInt(inputs[7]); // Trajectory of this monster
    const vy = parseInt(inputs[8]);
    const nearBase = parseInt(inputs[9]); // 0=monster with no target yet, 1=monster targeting a base
    const threatFor = parseInt(inputs[10]); // Given this monster's trajectory, is it a threat to 1=your base, 2=your opponent's base, 0=neither
    if (type === 1) {
      allyHeros.push({ id, x, y });
    } else if (type === 0) {
      monsters.push(
        new Monster(id, x, y, health, vx, vy, nearBase, threatFor, shieldLife)
      );
    }
  }
  const allyBase = new Base(baseX, baseY, health, mana);
  const board: Board = new Board(
    allyBase,
    allyHeros,
    new Monsters(monsters),
    turnCount
  );

  const actions = board.triggerAction();
  actions.forEach((action) => {
    console.log(action + "  " + turnCount);
  });
}
