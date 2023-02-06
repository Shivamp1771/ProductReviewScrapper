const Sentiment = require("sentiment");
const { removeStopwords, eng } = require("stopword");
const sentiment = new Sentiment();

class SentimentService {
  constructor() {}

  async getSentiments(text) {
    const newString = removeStopwords(text.split(" "), eng);
    const result = await sentiment.analyze(newString.join(" "));
    return result;
  }
}

module.exports = SentimentService;
