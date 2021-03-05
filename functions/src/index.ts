import dotenv from "dotenv";
import * as functions from "firebase-functions";
import { Telegraf } from "telegraf";
import { datingModule } from "./modules/dating";
import { helpModule } from "./modules/help";
import { topicModule } from "./modules/topics";
import { wyrModule } from "./modules/wyr";

const isCloudEnvironment = process.env.GCLOUD_PROJECT;
if (isCloudEnvironment) {
  dotenv.config({
    path: "./.env.production",
  });
} else {
  dotenv.config({
    path: "./.env.development",
  });
}

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

helpModule(bot);
topicModule(bot);
datingModule(bot);
wyrModule(bot);

if (!isCloudEnvironment) {
  bot.launch();
}

//firebase functions
export const talklahbot = functions.region("asia-east2").https.onRequest((request, response) => {
  bot.handleUpdate(request.body);
  response.send("");
});
