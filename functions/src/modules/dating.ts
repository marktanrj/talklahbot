import Telegraf, { Context } from "telegraf";
// import { selectRandomFromList } from "../utils/random";
import { TelegrafContext } from "telegraf/typings/context";
import * as _ from "lodash";
import { compiledData } from "../extract/extractData";

const datingData = compiledData["dating"];
const datingSubCategories = Object.keys(datingData);

export const datingModule = (bot: Telegraf<TelegrafContext>) => {
  bot.command("dating", datingHandler);
  bot.action("menu_dating", datingHandler);
};

const datingHelpMessage = `
Dating topics and questions to break the ice!
`;

export const datingHandler = (ctx: Context) => {
  const k = generateKeyboard(datingSubCategories);
  ctx.reply(datingHelpMessage, {
    reply_markup: {
      inline_keyboard: [[{ text: "Back to menu", callback_data: "menu" }], ...k],
    },
  });
};

function generateKeyboard(datingSubCategories: string[]) {
  const finalKeyboard = [];
  let tempKeyboard = [];

  for (let i = 1; i < datingSubCategories.length; i++) {
    const subcategory = datingSubCategories[i];
    const buttonText = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
    tempKeyboard.push({ text: `${buttonText}`, callback_data: `dating_${subcategory}` });

    if (i % 2 === 0) {
      finalKeyboard.push([...tempKeyboard]);
      tempKeyboard = [];
    }
  }

  finalKeyboard.push([...tempKeyboard]);

  return finalKeyboard;
}

// export const randomDatingQuestion = (ctx: Context) => {
//   ctx.deleteMessage();
//   const item = selectRandomFromList(allDatingQuestions);
//   ctx.reply(item, {
//     reply_markup: {
//       inline_keyboard: [[{ text: "Back to dating menu", callback_data: "menu_dating" }]],
//     },
//   });
// };
