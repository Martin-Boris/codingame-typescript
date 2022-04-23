import { Position } from "../../utils/position";

const BASE_POSITION_X_LEFT_CORNER: number = 0;
const BASE_POSITION_Y_LEFT_CORNER: number = 0;

const BASE_POSITION_X_RIGHT_CORNER: number = 17630;
const BASE_POSITION_Y_RIGHT_CORNER: number = 9000;

const ENEMY_HIT_RANGE: number = 300;
const ENEMY_FOCUS_RANGE: number = 5000;

const WIND_RANGE: number = 1280;
const SHIELD_RANGE: number = 2200;
const CONTROL_RANGE: number = 2200;

const LEFT_BASE_POSITION = new Position(
  BASE_POSITION_X_LEFT_CORNER,
  BASE_POSITION_Y_LEFT_CORNER
);
const RIGHT_BASE_POSITION = new Position(
  BASE_POSITION_X_RIGHT_CORNER,
  BASE_POSITION_Y_RIGHT_CORNER
);

const ATTACK_MODE_TURN_TRESHOLD: number = 120;
const ENEMY_HEALTH_TRESHOLD_FOR_SHIELD: number = 14;
const MANA_DISABLE_ATTACK_CONTROL_TRESHOLD: number = 100;
const CONTROL_HEALTH_TRESHOLD: number = 10;

export {
  BASE_POSITION_X_LEFT_CORNER,
  BASE_POSITION_Y_LEFT_CORNER,
  BASE_POSITION_X_RIGHT_CORNER,
  BASE_POSITION_Y_RIGHT_CORNER,
  WIND_RANGE,
  ENEMY_HIT_RANGE,
  LEFT_BASE_POSITION,
  RIGHT_BASE_POSITION,
  ATTACK_MODE_TURN_TRESHOLD,
  ENEMY_FOCUS_RANGE,
  ENEMY_HEALTH_TRESHOLD_FOR_SHIELD,
  SHIELD_RANGE,
  CONTROL_RANGE,
  MANA_DISABLE_ATTACK_CONTROL_TRESHOLD,
  CONTROL_HEALTH_TRESHOLD,
};
