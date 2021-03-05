import Telegraf, { Context } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import * as _ from "lodash";
import { compiledData } from "../extract/extractData";
import { getRandQnFromSub } from "../utils/getRandQnFromSub";
import { generateKeyboard } from "../utils/generateKeyboard";

const datingData = compiledData["dating"];
const datingSubCategories = Object.keys(datingData);

export const datingModule = (bot: Telegraf<TelegrafContext>) => {
  bot.command("dating", datingHandler);
  bot.action("menu_dating", datingHandler);

  datingSubCategories.forEach((subcategory) => {
    bot.action(`dating_${subcategory}`, getRandQnFromSub("dating", datingData, subcategory));
  });
};

const datingHelpMessage = `
Dating topics and questions to break the ice!
`;

export const datingHandler = (ctx: Context) => {
  ctx.deleteMessage();
  const keyboard = generateKeyboard("dating", datingSubCategories);
  ctx.reply(datingHelpMessage, {
    reply_markup: {
      inline_keyboard: [...keyboard, [{ text: "Back to Menu", callback_data: "menu" }]],
    },
  });
};
