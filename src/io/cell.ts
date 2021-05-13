export class Cell {
  index: number;
  richness: number;
  neighborIndexes: number[];

  constructor(index: number, richness: number, neighborIndexes: number[]) {
    this.index = index;
    this.richness = richness;
    this.neighborIndexes = neighborIndexes;
  }

  public computeRichnessScore(): number {
    return this.richness / 3;
  }
}
