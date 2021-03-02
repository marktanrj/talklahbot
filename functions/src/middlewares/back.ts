import { Context } from "telegraf";
import { helpMessage } from "../modules/help";

export const backHandler = (ctx: Context) => {
  ctx.deleteMessage();
  ctx.reply(helpMessage);
};
