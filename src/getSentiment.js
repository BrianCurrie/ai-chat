import Sentiment from 'sentiment';

function getSentiment(str) {
    const sentiment = new Sentiment();
    const result = sentiment.analyze(str);
    return result;
}

export { getSentiment };
