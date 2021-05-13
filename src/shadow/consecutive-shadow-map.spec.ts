import { ConsecutiveShadowMap } from "./consecutive-shadow-map";
import { ShadowsMap } from "./shadows-map";

describe("ConsecutiveShadowMap", () => {
  describe("add", () => {
    it("should add a shadowMap", () => {
      const day = 0;
      const shadowsMapFor6Days = new ConsecutiveShadowMap();
      const shadowsMap = new ShadowsMap();
      shadowsMap.add(2, 2);
      shadowsMapFor6Days.add(day, shadowsMap);
      expect(JSON.stringify(shadowsMapFor6Days)).toStrictEqual(
        '{"0":{"2":{"shadowLevel":2}}}'
      );
    });
  });
});
