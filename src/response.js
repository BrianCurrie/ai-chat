const response = (() => {
    let responseCounter = 0;

    const reply = (sentimentData) => {
        let msg = '';

        switch (responseCounter) {
            case 0:
                msg = `Hello! It's nice to meet you. How are you doing?`;
                break;
            case 1:
                msg = initialReply(sentimentData);
                break;
            case 2:
                msg =
                    'Would you like to talk to a member of our sales team on live chat?';
                break;
            case 3:
                msg = liveChatResponse(sentimentData);
                break;
            default:
                break;
        }

        responseCounter++;
        return msg;
    };

    const resetChat = () => {
        responseCounter = 0;
    };

    return { reply, resetChat };
})();

function initialReply(sentimentData) {
    let msg = '';

    switch (sentimentData.label) {
        case 'negative':
            msg = `I'm sorry to hear that. Do you think we can help?`;
            break;
        case 'positive':
            msg = `I'm glad to hear that! Could we help to make your day even better?`;
            break;
        case 'neutral':
            msg = `Okay, would you mind telling me more?`;
            break;
    }

    if (sentimentData.dirtiness > 0) {
        return `Please do not use that language here.`;
    } else if (sentimentData.politeness > 0) {
        msg += ` Thank you more being so polite.`;
    }

    return msg;
}

function liveChatResponse(sentimentData) {
    let msg = '';

    if (sentimentData.types.includes('approval')) {
        msg = `Perfect! Transferring you to our live chat now.`;
    } else if (sentimentData.types.includes('refusal')) {
        msg = `Okay! Feel free to contact one of our live representatives if you change your mind.`;
    } else {
        msg = `Thank you for your time! If you have any other questions please contact customer support.`;
    }

    return msg;
}

export { response };
