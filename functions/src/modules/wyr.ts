import Telegraf, { Context } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import * as _ from "lodash";
import { compiledData } from "../extract/extractData";
import { getRandQnFromSub } from "../utils/getRandQnFromSub";
import { generateKeyboard } from "../utils/generateKeyboard";

const wyrData = compiledData["wouldYouRather"];
const wyrSubCategories = Object.keys(wyrData);

export const wyrModule = (bot: Telegraf<TelegrafContext>) => {
  bot.command("wyr", wyrHandler);
  bot.action("menu_wyr", wyrHandler);

  wyrSubCategories.forEach((subcategory) => {
    bot.action(`wyr_${subcategory}`, getRandQnFromSub("wyr", wyrData, subcategory));
  });
};

const wyrHelpMessage = `
Would You Rather topics and questions to break the ice!
`;

export const wyrHandler = (ctx: Context) => {
  ctx.deleteMessage();
  const keyboard = generateKeyboard("wyr", wyrSubCategories);
  ctx.reply(wyrHelpMessage, {
    reply_markup: {
      inline_keyboard: [...keyboard, [{ text: "Back to Menu", callback_data: "menu" }]],
    },
  });
};
