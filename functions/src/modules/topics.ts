import Telegraf, { Context } from "telegraf";
import fs from "fs";
import { getRandomItemFromList } from "../utils/getRandomItemFromList";
import { TelegrafContext } from "telegraf/typings/context";

const rawTopics = fs.readFileSync("./src/data/topics.json", "utf-8");
const topics: string[] = JSON.parse(rawTopics);

export const topicModule = (bot: Telegraf<TelegrafContext>) => {
  bot.command("topic", topicsHandler);
  bot.action("re-topic", topicsHandler);
};

export const topicsHandler = (ctx: Context) => {
  ctx.deleteMessage();
  const item = getRandomItemFromList(topics);
  ctx.reply(item, {
    reply_markup: {
      inline_keyboard: [[{ text: "Another Topic", callback_data: "re-topic" }], [{ text: "Back to menu", callback_data: "menu" }]],
    },
  });
};
