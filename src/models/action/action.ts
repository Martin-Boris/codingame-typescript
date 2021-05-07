export interface Action {
  type: "SEED" | "GROW";
  getStringAction(): string;
}
