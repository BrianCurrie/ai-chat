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
        displayMessage(text);
    });

    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const text = textInput.value;
            const sentiment = getSentiment(text);
            display.innerText = `Sentiment score: ${sentiment.score}, Comparative: ${sentiment.comparative}`;
            textInput.value = '';
            displayMessage(text);
        }
    });
}

function displayMessage(msg) {
    const chat = document.getElementById('chatHistory');
    const msgEle = document.createElement('div');
    msgEle.innerText = msg;

    chat.prepend(msgEle);
}

export { init };
