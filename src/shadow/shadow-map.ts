export interface ShadowMap {
  [cellIndex: number]: { shadowLevel: number };
}

export interface ShadowMapMultipleDay {
  [day: number]: ShadowMap;
}
