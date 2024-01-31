const express = require("express");
require("dotenv").config();
const middleware = require("@line/bot-sdk").middleware;

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const app = express();

app.post("/webhook", middleware(config), (req, res) => {
  res.status(200).json({
    a: req.body.events,
    b: req.body.destination,
    c: req.body,
    res: res,
  });
});

// listen on port
app.listen(8080);
