import { Context } from "telegraf";
import { getRandomItemFromList } from "./getRandomItemFromList";

export const getRandQnFromSub = (mainCategoryName: string, dataset: { [x: string]: string[] }, subcategory: string) => (ctx: Context) => {
  ctx.deleteMessage();
  const item = getRandomItemFromList(dataset[subcategory]);
  const buttonText = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
  ctx.reply(item, {
    reply_markup: {
      inline_keyboard: [
        [{ text: `Another ${buttonText} Question`, callback_data: `${mainCategoryName}_${subcategory}` }],
        [
          {
            text: `Back to ${mainCategoryName.charAt(0).toUpperCase() + mainCategoryName.slice(1)} Menu`,
            callback_data: `menu_${mainCategoryName}`,
          },
        ],
      ],
    },
  });
};
