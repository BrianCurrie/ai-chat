const response = (() => {
    const greeting = () =>
        `Hello! It's nice to meet you. How has your day been?`;

    const reply = (sentimentData) => {
        let msg = '';

        switch (sentimentData.label) {
            case 'negative':
                msg = `I'm sorry to hear that.`;
                break;
            case 'positive':
                msg = `I'm glad to hear that!`;
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
    };

    return { greeting, reply };
})();

export { response };
