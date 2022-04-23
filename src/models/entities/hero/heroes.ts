import { computeDistancebeetwen } from "../../../function/distance-computation";
import { Entity } from "../entity";
import { Hero } from "./hero";

export class Heroes {
  private heroes: Array<Hero>;

  constructor(heroes: Array<Hero>) {
    this.heroes = heroes;
  }

  public isEmpty(): boolean {
    return this.heroes.length === 0;
  }

  public findNearestHero(monster: Entity): Hero {
    let nearestHero: Hero;
    let shorterDistance: number;
    this.heroes.forEach((hero) => {
      const distance = computeDistancebeetwen(monster, hero);
      if (distance < shorterDistance || !shorterDistance) {
        shorterDistance = distance;
        nearestHero = hero;
      }
    });
    return nearestHero;
  }

  remove(heroToRemove: Hero) {
    this.heroes = this.heroes.filter(
      (hero) => hero.getId() != heroToRemove.getId()
    );
  }
}
