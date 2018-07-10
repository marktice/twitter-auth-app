const express = require('express');
const bodyParser = require('body-parser');
const Twit = require('twit');

// configuration
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

// global twitter api
const Twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Oh hi mark' });
});

app.post('/', (req, res) => {
  const tweet = req.body;

  Twitter.post('statuses/update', tweet)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.listen(PORT, () => {
  console.info(`server running on port ${PORT}`);
  console.log('Welcome to our example twitter app');
});
