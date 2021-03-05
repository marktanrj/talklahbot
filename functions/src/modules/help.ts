import Telegraf, { Context } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import { datingHandler } from "./dating";
import { topicsHandler } from "./topics";
import { wyrHandler } from "./wyr";

export const helpMessage = `
<b>Talk Lah Bot</b>
Gives you topics or questions to talk about!
`;

export const helpModule = (bot: Telegraf<TelegrafContext>) => {
  bot.command(["start", "help"], helpHandler);
  bot.action("menu", helpHandler);
  bot.action("menu_randomtopic", topicsHandler);
  // bot.action("menu_randomquestion", helpHandler);
  bot.action("menu_dating", datingHandler);
  bot.action("menu_wyr", wyrHandler);
};

export const helpHandler = (ctx: Context) => {
  ctx.deleteMessage();
  ctx.reply(helpMessage, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Get Random Topic Category", callback_data: "menu_randomtopic" }],
        // [
        //   {
        //     text: "Get Random Question",
        //     callback_data: "menu_randomquestion",
        //   },
        // ],
        [
          {
            text: "Dating",
            callback_data: "menu_dating",
          },
          {
            text: "Would You Rather",
            callback_data: "menu_wyr",
          },
        ],
      ],
    },
  });
};
