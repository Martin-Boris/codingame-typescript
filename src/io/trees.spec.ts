import { CELL_1, CELL_12, CELL_16, MOCKED_MAP } from "../utils/test-data";
import { Tree } from "./tree";
import { Trees } from "./trees";

describe("Trees", () => {
  describe("add", () => {
    it("should add tree into trees", () => {
      const trees = new Trees();
      const tree_cell_1_size_1 = new Tree(1, CELL_1, 1, true, false);
      trees.add(tree_cell_1_size_1);
      expect(trees.trees).toHaveLength(1);
    });
  });

  describe("computeShadow", () => {
    it("should compute shadow", () => {
      const tree_cell_1_size_1 = new Tree(1, CELL_1, 1, true, false);
      const tree_cell_12_size_3 = new Tree(12, CELL_12, 3, false, false);
      const tree_cell_16_size_2 = new Tree(16, CELL_16, 2, false, false);
      const trees = Trees.fromTreeArray([
        tree_cell_1_size_1,
        tree_cell_12_size_3,
        tree_cell_16_size_2,
      ]);
      const day = 0;
      const shadowsMap = trees.computeShadow(day, MOCKED_MAP);
      expect(shadowsMap).toMatchObject({
        "17": { shadowLevel: 2 },
        "2": { shadowLevel: 3 },
        "3": { shadowLevel: 3 },
        "35": { shadowLevel: 2 },
        "7": { shadowLevel: 1 },
        "8": { shadowLevel: 3 },
      });
    });
  });

  describe("computeConsecutiveShadow", () => {
    it("should compute shadow for a full sun cycle", () => {
      const tree_cell_1_size_1 = new Tree(1, CELL_1, 1, true, false);
      const tree_cell_12_size_3 = new Tree(12, CELL_12, 3, false, false);
      const tree_cell_16_size_2 = new Tree(16, CELL_16, 2, false, false);
      const trees = Trees.fromTreeArray([
        tree_cell_1_size_1,
        tree_cell_12_size_3,
        tree_cell_16_size_2,
      ]);
      const day = 0;
      const shadowsMapFor6Days = trees.computeConsecutiveShadow(
        day,
        MOCKED_MAP
      );
      expect(JSON.stringify(shadowsMapFor6Days)).toStrictEqual(
        '{"0":{"2":{"shadowLevel":3},"3":{"shadowLevel":3},"7":{"shadowLevel":1},"8":{"shadowLevel":3},"17":{"shadowLevel":2},"35":{"shadowLevel":2}},"1":{"1":{"shadowLevel":2},"6":{"shadowLevel":2},"8":{"shadowLevel":1},"11":{"shadowLevel":3},"24":{"shadowLevel":3}},"2":{"2":{"shadowLevel":1},"4":{"shadowLevel":2},"5":{"shadowLevel":2},"26":{"shadowLevel":3}},"3":{"0":{"shadowLevel":1},"15":{"shadowLevel":2},"27":{"shadowLevel":3},"30":{"shadowLevel":2}},"4":{"6":{"shadowLevel":1},"13":{"shadowLevel":3},"29":{"shadowLevel":3},"32":{"shadowLevel":2}},"5":{"4":{"shadowLevel":3},"5":{"shadowLevel":3},"16":{"shadowLevel":3},"18":{"shadowLevel":1},"33":{"shadowLevel":2}}}'
      );
    });
  });

  describe("isAlreadyASeed", () => {
    it("should return true", () => {
      const seed_cell_16 = new Tree(16, CELL_16, 0, true, false);
      const trees = Trees.fromTreeArray([seed_cell_16]);
      expect(trees.isAlreadyASeed()).toBeTruthy();
    });
    it("should return false", () => {
      const seed_cell_16 = new Tree(16, CELL_16, 0, false, false);
      const trees = Trees.fromTreeArray([seed_cell_16]);
      expect(trees.isAlreadyASeed()).toBeFalsy();
    });
  });
});
