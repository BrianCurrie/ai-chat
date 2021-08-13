import { getSentiment } from './getSentiment';
import { response } from './response';

let windowActive = false;

function init() {
    const submitBtn = document.getElementById('submitBtn');
    const textInput = document.getElementById('textInput');
    const chat = document.getElementById('chatHistory');
    const namebar = document.getElementById('nameBarContainer');

    submitBtn.addEventListener('click', () => {
        const text = textInput.value;
        textInput.value = '';
        displayData(text);
        displayMsg(text, 'user');
        displayMsg(response.reply(getSentiment(text)), 'bot');
    });

    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const text = textInput.value;
            textInput.value = '';
            displayData(text);
            displayMsg(text, 'user');
            displayMsg(response.reply(getSentiment(text)), 'bot');
        }
    });

    namebar.addEventListener('click', (e) => {
        if (e.target.id === 'minimize') {
            if (chat.style.display !== 'none') {
                chat.style.display = 'none';
                namebar.classList.add('pointer');
            }
        } else {
            if (chat.style.display === 'none') {
                chat.style.display = 'flex';
                namebar.classList.remove('pointer');
            }
        }
    });

    window.addEventListener('focus', () => {
        windowActive = true;
    });

    displayMsg(response.reply(''), 'bot');
}

function displayData(text) {
    const display = document.getElementById('sentiment');
    const sentimentData = getSentiment(text);
    const table = document.createElement('table');

    if (sentimentData === -1) {
        console.log('No data to display');
        return -1;
    }

    display.innerText = ``;

    const tableHeaders = document.createElement('tr');
    const propertyHeader = document.createElement('th');
    const dataHeader = document.createElement('th');
    propertyHeader.innerText = 'Property';
    dataHeader.innerText = 'Data';

    tableHeaders.appendChild(propertyHeader);
    tableHeaders.appendChild(dataHeader);
    table.appendChild(tableHeaders);

    for (let prop in sentimentData) {
        const row = document.createElement('tr');
        const property = document.createElement('td');
        const data = document.createElement('td');
        property.innerText = prop;

        if (Array.isArray(sentimentData[prop])) {
            let str = arrToReducedStr(sentimentData[prop]);
            data.innerText = str;
            console.log(sentimentData[prop]);
        } else {
            data.innerText = sentimentData[prop];
        }

        row.appendChild(property);
        row.appendChild(data);

        table.appendChild(row);
    }

    display.appendChild(table);
}

function arrToReducedStr(arr) {
    let obj = {};
    let str = '';

    for (let ele of arr) {
        if (obj.hasOwnProperty(ele)) {
            obj[ele] += 1;
        } else {
            obj[ele] = 1;
        }
    }

    for (let prop in obj) {
        if (obj[prop] < 2) {
            str = `${prop}, ` + str;
        } else {
            str = `${prop}(x${obj[prop]}), ` + str;
        }
    }

    return str.slice(0, -2);
}

function displayMsg(msg, sender) {
    if (msg.length <= 0) {
        return -1;
    }
    const chat = document.getElementById('chatHistory');
    const msgEle = document.createElement('div');
    const msgEleInner = document.createElement('div');
    msgEle.classList.add('msg');
    msgEleInner.innerText = msg;
    msgEleInner.classList.add('msgInner');
    msgEle.prepend(msgEleInner);

    if (sender === 'user') {
        msgEle.classList.add('userMsg');
        chat.prepend(msgEle);
        msgEle.scrollIntoView();
    } else {
        const audioObj = new Audio('./audio/notification_alert.mp3');
        setTimeout(function () {
            if (windowActive) {
                audioObj.play();
            }
            msgEle.classList.add('botMsg');
            chat.prepend(msgEle);
            msgEle.scrollIntoView();
        }, 2000);
    }
}

export { init };
