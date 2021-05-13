export class ShadowsMap {
  [cellIndex: number]: { shadowLevel: number };

  public add(cellIndex: number, shadowLevel: number): void {
    if (!this[cellIndex] || this[cellIndex].shadowLevel < shadowLevel) {
      this[cellIndex] = { shadowLevel };
    }
  }

  public isShadowed(cellIndex: number, treeSize: number): boolean {
    return this[cellIndex]?.shadowLevel >= treeSize;
  }
}
