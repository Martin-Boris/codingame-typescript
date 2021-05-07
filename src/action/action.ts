export interface Action {
  type: "SEED" | "GROW" | "COMPLETE";
  getStringAction(): string;
}
