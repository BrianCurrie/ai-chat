import Sentiment from 'sentiment';
import Compendium from 'compendium-js';

function getSentiment(str) {
    if (!str) {
        console.log('String not given');
        return -1;
    }

    const input = str.toLowerCase();
    const sentiment = new Sentiment();
    const result = sentiment.analyze(input);
    const compendProfile = Compendium.analyse(input)[0].profile;
    const data = parseData(result, compendProfile);

    console.log(result, compendProfile);
    return data;
}

function parseData(sentiment, compendium) {
    const data = {
        label: compendium.label,
        sentiment: compendium.sentiment,
        politeness: compendium.politeness,
        dirtiness: compendium.dirtiness,
        negated: compendium.negated,
        negative_words: sentiment.negative,
        positive_words: sentiment.positive,
    };

    return data;
}

export { getSentiment };