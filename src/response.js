const response = (() => {
    const greeting = () =>
        `Hello! It's nice to meet you. How has your day been?`;

    const reply = (sentimentData) => {
        switch (sentimentData.label) {
            case 'negative':
                return `I'm sorry to hear that.`;
            case 'positive':
                return `I'm glad to hear that!`;
            case 'neutral':
                return `Neutral`;
        }
    };

    return { greeting, reply };
})();

export { response };
