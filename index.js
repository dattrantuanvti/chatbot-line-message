const express = require("express");
require("dotenv").config();
const middleware = require("@line/bot-sdk").middleware;

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const app = express();

app.post("/webhook", middleware(config), (req, res) => {
  const event = req.body.events[0];

  if (event.type === "message") {
    const message = event.message;

    if (message.type === "text" && message.text === "bye") {
      if (event.source.type === "room") {
        client.leaveRoom(event.source.roomId);
      } else if (event.source.type === "group") {
        client.leaveGroup(event.source.groupId);
      } else {
        client.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "text",
              text: "I cannot leave a 1-on-1 chat!",
            },
          ],
        });
      }
    }
  }
  return res.status(200).json({ event });
});

// listen on port
app.listen(8080);
