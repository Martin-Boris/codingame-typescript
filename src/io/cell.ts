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

  public getPointEarn(): number {
    switch (this.richness) {
      case 1:
        return 0;
      case 2:
        return 2;
      case 3:
        return 4;
      case 0:
        return 0;
    }
  }
}
