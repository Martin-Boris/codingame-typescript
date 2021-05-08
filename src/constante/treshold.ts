const SEED_TRESHOLD_DAY: number = 19;
const COMPLETE_TRESHOLD_DAY: number = 20;
const GROW_T1_TRESHOLD_DAY: number = 21;
const GROW_SEED_TRESHOLD_DAY: number = 20;

export {
  SEED_TRESHOLD_DAY,
  GROW_T1_TRESHOLD_DAY,
  COMPLETE_TRESHOLD_DAY,
  GROW_SEED_TRESHOLD_DAY,
};

export class TresholdState {
  private _MAX_T3_TRESHOLD: number;
  private _MAX_T2_AND_T1_TRESHOLD: number;

  constructor(day: number) {
    if (day < 20) {
      this._MAX_T3_TRESHOLD = 5;
      this._MAX_T2_AND_T1_TRESHOLD = 2;
    }
    if (day === 23) {
      this._MAX_T3_TRESHOLD = 0;
      this._MAX_T2_AND_T1_TRESHOLD = 1;
    } else if (day >= 20) {
      this._MAX_T3_TRESHOLD = 2;
      this._MAX_T2_AND_T1_TRESHOLD = 1;
    }
  }

  public get MAX_T3_TRESHOLD(): number {
    return this._MAX_T3_TRESHOLD;
  }

  public get MAX_T2_AND_T1_TRESHOLD(): number {
    return this._MAX_T2_AND_T1_TRESHOLD;
  }
}
