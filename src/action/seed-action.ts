import { Cell, Map } from "../io/input";
import { Action } from "./action";

export class SeedAction implements Action {
  private _type: "SEED";
  private _cellFrom: Cell;
  private _cellTo: Cell;

  public static isSEEDActionFromString(action: String) {
    return action.includes("SEED");
  }

  public static initFromString(action: String, map: Map): SeedAction {
    const partialAction = action.split(" ");
    let cellFrom = map[parseInt(partialAction[1])];
    let cellTo = map[parseInt(partialAction[2])];
    return new SeedAction(cellFrom, cellTo);
  }

  constructor(cellFrom: Cell, cellTo: Cell) {
    this._type = "SEED";
    this._cellFrom = cellFrom;
    this._cellTo = cellTo;
  }

  get type() {
    return this._type;
  }

  public get cellFrom(): Cell {
    return this._cellFrom;
  }

  public get cellTo(): Cell {
    return this._cellTo;
  }

  public getStringAction() {
    return this.type + " " + this._cellFrom.index + " " + this._cellTo.index;
  }
}
