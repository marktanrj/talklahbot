import * as _ from "lodash";

export const getRandomItemFromList = (arr: string[]): string => {
  const randomItem = _.sample(arr) as string;
  return randomItem;
};
