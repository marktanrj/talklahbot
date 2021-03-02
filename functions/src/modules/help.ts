import Telegraf, { Context } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";

export const helpMessage = `
<b>Talk Lah Bot</b>
Gives you topics or questions to talk about!

/topic - Get random topic category
---
/random - Get random question
/dating - Get random dating question
/wur - Get random would you rather question
`;

export const helpModule = (bot: Telegraf<TelegrafContext>) => {
  bot.command(["start", "help"], helpHandler);
  bot.action("menu", helpHandler);
};

export const helpHandler = (ctx: Context) => {
  ctx.deleteMessage();
  ctx.reply(helpMessage, {
    parse_mode: "HTML",
  });
};
