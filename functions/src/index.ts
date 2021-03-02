// import * as functions from "firebase-functions";
import dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { helpModule } from "./modules/help";
import { topicModule } from "./modules/topics";

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

bot.launch();

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
