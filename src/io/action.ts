import { Cell, Map } from "./input";

export class Action {
  private _type: "SEED";
  private _cellFrom: Cell;
  private _cellTo: Cell;

  public static isSEEDActionFromString(action: String) {
    return action.includes("SEED");
  }

  constructor(action: String, map: Map) {
    this._type = "SEED";
    const partialAction = action.split(" ");
    this._cellFrom = map[parseInt(partialAction[1])];
    this._cellTo = map[parseInt(partialAction[2])];
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
