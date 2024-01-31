require("dotenv").config();
const express = require("express");
const JSONParseError = require("@line/bot-sdk").JSONParseError;
const SignatureValidationFailed =
  require("@line/bot-sdk").SignatureValidationFailed;
const MessagingApiClient =
  require("@line/bot-sdk").messagingApi.MessagingApiClient;

const app = express();

const client = new MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

app.post("/webhook", (req, res) => {
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
              text: "Nhân viên sẽ hỗ trợ bạn trong ít phút!",
            },
          ],
        });
      }
    }
  }
  return res.json(req.body.events); // req.body will be webhook event object
});

// Handle errors
app.use((err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    return res.status(401).send(err.signature);
  } else if (err instanceof JSONParseError) {
    return res.status(400).send(err.raw);
  }
  next(err);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("App is listening on PORT " + PORT);
});
