export const generateKeyboard = (mainCategoryName: string, subcategories: string[]) => {
  const keyboardRowLength = 2;
  const finalKeyboard = [];
  let tempKeyboard = [];

  for (let i = 0; i < subcategories.length; i++) {
    const subcategory = subcategories[i];
    const buttonText = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
    tempKeyboard.push({ text: `${buttonText}`, callback_data: `${mainCategoryName}_${subcategory}` });

    if ((i + 1) % keyboardRowLength === 0) {
      finalKeyboard.push([...tempKeyboard]);
      tempKeyboard = [];
    }
  }

  finalKeyboard.push([...tempKeyboard]);

  return finalKeyboard;
};
