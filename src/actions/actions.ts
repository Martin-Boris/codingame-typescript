import { Action } from "../action/action";
import { Map } from "../io/input";
import { Trees } from "../io/trees";

export interface Actions {
  actions: Action[];
  highScoreAction(trees: Trees, map: Map, day: number): Action;
}
