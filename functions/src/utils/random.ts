import * as _ from "lodash";

export const selectRandomFromList = (arr: string[]): string => {
  const randomItem = _.sample(arr) as string;
  return randomItem;
};
