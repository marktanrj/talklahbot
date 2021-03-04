import fs from "fs";
import * as _ from "lodash";
import path from "path";
import { compileAllFromSubCategory } from "../utils/getAllFromCategory";

const dataDirectory = "./src/data";
const allLists = fs.readdirSync(dataDirectory);

const onlyQns = allLists.filter((item) => item.includes("qns"));

export const compiledData: {
  [x: string]: string[];
} = {};
_.forEach(onlyQns, (fileName) => {
  const rawContents = fs.readFileSync(path.join(dataDirectory, fileName), "utf-8");
  const contents = JSON.parse(rawContents);
  let categoryName = fileName.slice(4, fileName.length - 5);

  const allQuestions = compileAllFromSubCategory(contents);
  contents["all"] = allQuestions;
  compiledData[categoryName] = contents;
});
