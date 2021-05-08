import { Tree } from "../io/input";
import { GrowAction } from "../action/grow-action";
import { GrowActions } from "./grow-actions";
import {
  TresholdState,
  GROW_SEED_TRESHOLD_DAY,
  GROW_T1_TRESHOLD_DAY,
} from "../constante/treshold";

describe("GrowActions", () => {
  const tresholdState = new TresholdState(0);
  describe("getBestAction", () => {
    it("should return empty string if no gro action available", () => {
      const actions = new GrowActions([], [], tresholdState);
      expect(actions.getBestAction(0)).toBe("");
    });

    it("should return higher tree size string action", () => {
      const tree_size_2 = {
        cellIndex: 0,
        size: 2,
        isMine: true,
        isDormant: false,
      } as Tree;
      const tree_size_1 = {
        cellIndex: 1,
        size: 1,
        isMine: true,
        isDormant: false,
      } as Tree;
      const actions = new GrowActions(
        [new GrowAction(tree_size_2), new GrowAction(tree_size_1)],
        [],
        tresholdState
      );
      expect(actions.getBestAction(0)).toBe("GROW 0");
    });
    it("should not grow for T1 or T2 if MAX_T2_AND_T1_TRESHOLD already reached", () => {
      const tree_size_2 = {
        cellIndex: 1,
        size: 2,
        isMine: true,
        isDormant: false,
      } as Tree;
      const tree_size_1 = {
        cellIndex: 1,
        size: 1,
        isMine: true,
        isDormant: false,
      } as Tree;
      const tree_size_0 = {
        cellIndex: 2,
        size: 0,
        isMine: true,
        isDormant: false,
      } as Tree;
      const actions = new GrowActions(
        [new GrowAction(tree_size_0), new GrowAction(tree_size_1)],
        [tree_size_0, tree_size_1, tree_size_2, tree_size_2, tree_size_2],
        tresholdState
      );
      expect(actions.getBestAction(0)).toBe("");
    });
    it("should not GROW a SEED if day GROW_SEED_TRESHOLD_DAY or after", () => {
      const seed = {
        cellIndex: 0,
        size: 0,
        isMine: true,
        isDormant: false,
      } as Tree;
      const actions = new GrowActions(
        [new GrowAction(seed)],
        [],
        tresholdState
      );
      expect(actions.getBestAction(GROW_SEED_TRESHOLD_DAY)).toBe("");
    });
    it("should not GROW a Tree T1 if day GROW_T1_TRESHOLD_DAY or after", () => {
      const tree_t1 = {
        cellIndex: 0,
        size: 1,
        isMine: true,
        isDormant: false,
      } as Tree;
      const actions = new GrowActions(
        [new GrowAction(tree_t1)],
        [],
        tresholdState
      );
      expect(actions.getBestAction(GROW_T1_TRESHOLD_DAY)).toBe("");
    });
  });
});
