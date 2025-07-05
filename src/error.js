class NegativeNumberNotAllowedError extends Error {
    constructor(negatives) {
        const formattedMessage = `Negative numbers are not allowed: ${negatives.join(', ')}`;
        super(formattedMessage);
        this.name = 'NegativeNumberNotAllowedError';
        this.invalidNumbers = negatives;
    }
}

module.exports = { NegativeNumberNotAllowedError};
