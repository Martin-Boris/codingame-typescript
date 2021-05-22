const EMPTY_CELL = 2;

export class Board {
  grid: number[][] = [];

  constructor(grid: number[][]) {
    this.grid = grid;
  }

  public static fromStringRow(row: string[]): Board {
    let grid: number[][] = [];
    row.forEach((row, rowIndex) => {
      const formatedRow: number[] = row.split("").map((value) => {
        if (value == ".") {
          return EMPTY_CELL;
        }
        return parseInt(value);
      });
      grid[rowIndex] = formatedRow;
    });
    return new Board(grid);
  }
}
