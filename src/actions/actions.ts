import { Action } from "../action/action";

export interface Actions {
  actions: Action[];
  getBestAction(day: number): String;
}
