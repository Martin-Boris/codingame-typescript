import { ConsecutiveShadowMap } from "../shadow/consecutive-shadow-map";
import { ShadowsMap } from "../shadow/shadows-map";
import {
  CELL_0,
  CELL_1,
  CELL_2,
  CELL_13,
  MOCKED_MAP,
  CELL_28,
  CELL_25,
  CELL_10,
} from "../utils/test-data";
import { Tree } from "./tree";
import { Trees } from "./trees";

describe("Tree", () => {
  describe("computePositionScore", () => {
    it("should compute score, case no allies", () => {
      const tree_cell_0_size_0 = new Tree(0, CELL_0, 0, true, false);
      const treesOnMap: Trees = new Trees();
      expect(
        tree_cell_0_size_0.computePositionScore(treesOnMap, MOCKED_MAP)
      ).toBe(1);
    });
    it("should compute score, in case  ally directly align with it", () => {
      const tree_cell_0_size_0 = new Tree(0, CELL_0, 0, true, false);
      const tree_cell_1_size_0 = new Tree(1, CELL_1, 0, true, false);
      const tree_cell_2_size_0 = new Tree(2, CELL_2, 0, true, false);
      const treesOnMap: Trees = Trees.fromTreeArray([
        tree_cell_1_size_0,
        tree_cell_2_size_0,
      ]);
      expect(
        tree_cell_0_size_0.computePositionScore(treesOnMap, MOCKED_MAP)
      ).toBe(0.84);
    });
    it("should compute score, in case ally directly align with it and also ennemies", () => {
      const tree_cell_0_size_0 = new Tree(0, CELL_0, 0, true, false);
      const tree_cell_1_size_0 = new Tree(1, CELL_1, 0, true, false);
      const tree_cell_2_size_0 = new Tree(2, CELL_2, 0, false, false);
      const treesOnMap: Trees = Trees.fromTreeArray([
        tree_cell_1_size_0,
        tree_cell_2_size_0,
      ]);
      expect(
        tree_cell_0_size_0.computePositionScore(treesOnMap, MOCKED_MAP)
      ).toBe(0.92);
    });

    it("should compute score, in case ally not directly align with it (2cell)", () => {
      const tree_cell_0_size_0 = new Tree(0, CELL_0, 0, true, false);
      const tree_cell_1_size_0 = new Tree(1, CELL_1, 0, true, false);
      const tree_cell_13_size_0 = new Tree(13, CELL_13, 0, true, false);
      const treesOnMap: Trees = Trees.fromTreeArray([
        tree_cell_1_size_0,
        tree_cell_13_size_0,
      ]);
      expect(
        tree_cell_0_size_0.computePositionScore(treesOnMap, MOCKED_MAP)
      ).toBe(0.8533333333333333);
    });

    it("should compute score, in case ally not directly align with it (3cell)", () => {
      const tree_cell_0_size_0 = new Tree(0, CELL_0, 0, true, false);
      const tree_cell_1_size_0 = new Tree(1, CELL_1, 0, true, false);
      const tree_cell_13_size_0 = new Tree(13, CELL_13, 0, true, false);
      const tree_cell_28_size_0 = new Tree(28, CELL_28, 0, true, false);
      const tree_cell_25_size_0 = new Tree(25, CELL_25, 0, false, false);
      const treesOnMap: Trees = Trees.fromTreeArray([
        tree_cell_1_size_0,
        tree_cell_13_size_0,
        tree_cell_28_size_0,
        tree_cell_25_size_0,
      ]);
      expect(
        tree_cell_0_size_0.computePositionScore(treesOnMap, MOCKED_MAP)
      ).toBe(0.8);
    });
  });

  describe("computeSunnyScore", () => {
    it("should compute sunny score", () => {
      const tree_cell_0_size_0 = new Tree(0, CELL_0, 0, true, false);
      const shadowsMapFor6Days = new ConsecutiveShadowMap();
      const shadowsMap = new ShadowsMap();
      const day = 0;
      shadowsMap.add(0, 2);
      shadowsMapFor6Days.add(day, shadowsMap);
      shadowsMapFor6Days.add(day + 1, new ShadowsMap());
      expect(tree_cell_0_size_0.computeSunnyScore(shadowsMapFor6Days)).toBe(
        0.5
      );
    });
  });

  describe("richness score", () => {
    it("should compute 1", () => {
      const tree_cell_0_size_0 = new Tree(0, CELL_0, 0, true, false);
      expect(tree_cell_0_size_0.computeRichnessScore()).toBe(1);
    });

    it("should compute 1/3", () => {
      const tree_cell_10_size_0 = new Tree(0, CELL_10, 0, true, false);
      expect(tree_cell_10_size_0.computeRichnessScore()).toBe(
        0.6666666666666666
      );
    });
  });
});
