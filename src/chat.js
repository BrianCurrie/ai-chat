import { getSentiment } from './getSentiment';

function init() {
    const submitBtn = document.getElementById('submitBtn');
    const textInput = document.getElementById('textInput');
    const display = document.getElementById('sentiment');

    submitBtn.addEventListener('click', () => {
        const text = textInput.value;
        const sentiment = getSentiment(text);
        display.innerText = `Sentiment score: ${sentiment.score}, Comparative: ${sentiment.comparative}`;
        textInput.value = '';
        displayUserMessage(text);
        reply(sentiment);
    });

    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const text = textInput.value;
            const sentiment = getSentiment(text);
            display.innerText = `Sentiment score: ${sentiment.score}, Comparative: ${sentiment.comparative}`;
            textInput.value = '';
            displayUserMessage(text);
            reply(sentiment);
        }
    });
}

function displayUserMessage(msg) {
    const chat = document.getElementById('chatHistory');
    const msgEle = document.createElement('div');
    msgEle.innerText = msg;
    msgEle.classList.add('msg');
    msgEle.classList.add('userMsg');

    chat.prepend(msgEle);
    msgEle.scrollIntoView();
}

function reply(sentiment) {
    const chat = document.getElementById('chatHistory');
    const msgEle = document.createElement('div');
    msgEle.innerText = createReply(sentiment);
    msgEle.classList.add('msg');
    msgEle.classList.add('botMsg');

    chat.prepend(msgEle);
    msgEle.scrollIntoView();
}

function createReply(sentiment) {
    const score = sentiment.score;
    let msg;
    if (score === 0) {
        msg = 'Neutral';
    } else if (score > 0) {
        msg = 'Positive';
    } else {
        msg = 'Negative';
    }

    return msg;
}

export { init };
