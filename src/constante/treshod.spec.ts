import { TresholdState } from "./treshold";

describe("TresholdSate", () => {
  it("should properly init MAX_T3_TRESHOLD in last days", () => {
    const tresholdState = new TresholdState(23);
    expect(tresholdState.MAX_T3_TRESHOLD).toBe(0);
  });
  it("should properly init MAX_T3_TRESHOLD in early days", () => {
    const tresholdState = new TresholdState(0);
    expect(tresholdState.MAX_T3_TRESHOLD).toBe(4);
  });
  it("should properly init MAX_T3_TRESHOLD in end days (20+)", () => {
    const tresholdState = new TresholdState(20);
    expect(tresholdState.MAX_T3_TRESHOLD).toBe(2);
  });

  it("should properly init MAX_T2_AND_T1_TRESHOLD in early days", () => {
    const tresholdState = new TresholdState(0);
    expect(tresholdState.MAX_T2_AND_T1_TRESHOLD).toBe(2);
  });
  it("should properly init MAX_T2_AND_T1_TRESHOLD in end days", () => {
    const tresholdState = new TresholdState(20);
    expect(tresholdState.MAX_T2_AND_T1_TRESHOLD).toBe(1);
  });
});
