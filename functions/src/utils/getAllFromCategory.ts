import * as _ from "lodash";

export const compileAllFromSubCategory = (dataCategoryData: { [x: string]: string[] }) => {
  const singleList = _.reduce(
    Object.keys(dataCategoryData),
    (arr: string[], header) => {
      arr = [...arr, ...dataCategoryData[header]];
      return arr;
    },
    []
  );
  return singleList;
};
