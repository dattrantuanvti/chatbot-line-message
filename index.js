const express = require("express");
require("dotenv").config();
const line = require("@line/bot-sdk");
const middleware = require("@line/bot-sdk").middleware;

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

const app = express();

app.post("/webhook", middleware(config), (req, res) => {
  console.log(req.body.events[0].source.userId);
  client.pushMessage({
    to: "U31cec3047ce58b64fd8fc10537c56b69",
    messages: [
      {
        type: "text",
        text: "Chào mừng bạn đến với channel của chúng tao",
      },
    ],
  });
});

// listen on port
app.listen(8080);
