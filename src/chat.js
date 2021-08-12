import { getSentiment } from './getSentiment';

function init() {
    const submitBtn = document.getElementById('submitBtn');
    const textInput = document.getElementById('textInput');
    const chat = document.getElementById('chatHistory');
    const namebar = document.getElementById('nameBarContainer');

    submitBtn.addEventListener('click', () => {
        const text = textInput.value;
        textInput.value = '';
        displayData(text);
        displayUserMessage(text);
    });

    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const text = textInput.value;
            textInput.value = '';
            displayData(text);
            displayUserMessage(text);
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

    table.appendChild(propertyHeader);
    table.appendChild(dataHeader);

    for (let prop in sentimentData) {
        const row = document.createElement('tr');
        const property = document.createElement('td');
        const data = document.createElement('td');
        property.innerText = prop;

        if (Array.isArray(sentimentData[prop])) {
            let filtered = filterArr(sentimentData[prop]);

            console.log(filtered);

            data.innerText = filtered; //insert world list cleaned up
        } else {
            data.innerText = sentimentData[prop];
        }

        row.appendChild(property);
        row.appendChild(data);

        table.appendChild(row);
    }

    display.appendChild(table);
}

function filterArr(arr) {
    let tempArr = [];
    let obj = {};

    for (let ele of arr) {
        if (tempArr.includes(ele)) {
            obj[ele] += 1;
        } else {
            tempArr.push(ele);
            obj[ele] = 1;
        }
    }

    arr = [];

    for (let prop in obj) {
        if (obj[prop] < 2) {
            arr.unshift(`${prop}`);
        } else {
            arr.unshift(`${prop}(x${obj[prop]})`);
        }
    }

    return arr.join(', ');
}

function displayUserMessage(msg) {
    if (msg.length <= 0) {
        return -1;
    }
    const chat = document.getElementById('chatHistory');
    const msgEle = document.createElement('div');
    msgEle.innerText = msg;
    msgEle.classList.add('msg');
    msgEle.classList.add('userMsg');

    chat.prepend(msgEle);
    msgEle.scrollIntoView();
}

export { init };
