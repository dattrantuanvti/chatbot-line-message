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

  switch (event.type) {
    case "join":
    case "follow":
      return client.replyMessage(event.replyToken, {
        type: "text",
        text: "Hello, Wellcome you!",
      });
    case "message":
      switch (event.message.type) {
        case "text":
          switch (event.message.text) {
            case "hello":
              return client.replyMessage(event.replyToken, {
                type: "text",
                text: "Can we help you?",
              });
            case "I want book ticket":
              return client.replyMessage(event.replyToken, {
                type: "text",
                text: "Where do you want to book tickets?",
              });
          }
      }
  }
});

// listen on port
app.listen(8080);
