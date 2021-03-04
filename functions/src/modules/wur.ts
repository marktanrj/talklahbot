import Telegraf, { Context } from "telegraf";
import fs from "fs";
import { selectRandomFromList } from "../utils/random";
import { TelegrafContext } from "telegraf/typings/context";
import * as _ from "lodash";

const rawWurData = fs.readFileSync("./src/data/qns_wouldYouRather.json", "utf-8");
const WurData = JSON.parse(rawWurData);
const allWurQuestions = _.reduce(
  Object.keys(WurData),
  (arr: string[], header) => {
    arr = [...arr, ...WurData[header]];
    return arr;
  },
  []
);

export const wurModule = (bot: Telegraf<TelegrafContext>) => {
  bot.command("wur", wurHandler);
  bot.action("re-wur", wurHandler);
};

export const wurHandler = (ctx: Context) => {
  ctx.deleteMessage();
  const item = selectRandomFromList(allWurQuestions);
  ctx.reply(item, {
    reply_markup: {
      inline_keyboard: [[{ text: "Another WUR question", callback_data: "re-wur" }], [{ text: "Back to menu", callback_data: "menu" }]],
    },
  });
};
