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
  const event = req.body.events[0];
  console.log(event.source.userId);
  client.pushMessage({
    to: event.source.userId,
    messages: [{ type: "text", text: "hello, world" }],
  });
});

// listen on port
app.listen(8080);
