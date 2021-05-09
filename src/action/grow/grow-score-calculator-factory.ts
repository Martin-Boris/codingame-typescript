import { Tree } from "../../io/input";
import { ShadowMapMultipleDay } from "../../shadow/shadow-map";
import { GrowScoreT0Calculator } from "./grow-score-t0-calculator";
import { GrowScoreT1Calculator } from "./grow-score-t1-calculator";
import { GrowScoreT2Calculator } from "./grow-score-t2-calculator";
import { GrowScoreCalculator } from "./grow-score-calculator";

const initGrowScoreCalculator = (
  tree: Tree,
  shadowMapMultipleDay: ShadowMapMultipleDay,
  day: number,
  trees: Tree[]
): GrowScoreCalculator => {
  switch (tree.size) {
    case 0:
      return new GrowScoreT0Calculator(
        tree,
        shadowMapMultipleDay,
        day,
        nbrTierTree(1, trees)
      );
    case 1:
      return new GrowScoreT1Calculator(
        tree,
        shadowMapMultipleDay,
        day,
        nbrTierTree(2, trees)
      );
    case 2:
      return new GrowScoreT2Calculator(tree, shadowMapMultipleDay, day);
  }
  return new GrowScoreCalculator(tree, shadowMapMultipleDay);
};

const nbrTierTree = (tier: number, trees: Tree[]) =>
  trees.filter((tree) => tree.size === tier && tree.isMine).length;

export default initGrowScoreCalculator;
