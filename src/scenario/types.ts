export type ScenarioItem<T extends string = string> = {
  key: T;
  message: string;
};

export type Scenario<T extends string = string> = Generator<
  ScenarioItem<T>,
  ScenarioItem<T>,
  ScenarioItem<T>
>;
