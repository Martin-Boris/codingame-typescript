import { ShadowsMap } from "./shadows-map";

describe("shadowsMap", () => {
  describe("add", () => {
    it("should add shadow at correct index", () => {
      const shadowsMap = new ShadowsMap();
      shadowsMap.add(2, 3);
      expect(shadowsMap[2].shadowLevel).toBe(3);
    });
    it("should not add shadow if already a biggest shadow", () => {
      const shadowsMap = new ShadowsMap();
      shadowsMap.add(2, 3);
      shadowsMap.add(2, 2);
      expect(shadowsMap[2].shadowLevel).toBe(3);
    });

    it("should add shadow and erase previous value if shadow is bigger", () => {
      const shadowsMap = new ShadowsMap();
      shadowsMap.add(2, 2);
      shadowsMap.add(2, 3);
      expect(shadowsMap[2].shadowLevel).toBe(3);
    });
  });

  describe("isShadowed", () => {
    it("should return true", () => {
      const shadowsMap = new ShadowsMap();
      shadowsMap.add(2, 3);
      expect(shadowsMap.isShadowed(2, 3)).toBeTruthy();
    });

    it("should return false", () => {
      const shadowsMap = new ShadowsMap();
      shadowsMap.add(2, 2);
      expect(shadowsMap.isShadowed(2, 3)).toBeFalsy();
    });

    it("should return false", () => {
      const shadowsMap = new ShadowsMap();
      expect(shadowsMap.isShadowed(2, 3)).toBeFalsy();
    });
  });
});
