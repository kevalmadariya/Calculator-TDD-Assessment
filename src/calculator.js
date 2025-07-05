const { NegativeNumberNotAllowedError} = require('./error');

// Characters like *, +, ?, . aren't just characters in regex — they control how patterns behave
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractDelimiter(numbers) {
    if (numbers.startsWith('//')) {
        const delimiterMatch = numbers.match(/^\/\/(.+)\n/);
        if (delimiterMatch) {
            const customDelimiter = escapeRegExp(delimiterMatch[1]);
            const remainingNumbers = numbers.slice(delimiterMatch[0].length);
            return { delimiter: new RegExp(customDelimiter), numbers: remainingNumbers };
        }
    }
    return { delimiter: /,|\n/, numbers }; // default delimiters
}


// Function to split string into numbers using the provided delimiter
function splitNumbers(numbers, delimiter) {
    return numbers.split(delimiter).map(Number);
}


// Main add function
function add(numbers) {
    if (numbers === '') return 0;

    const { delimiter, numbers: cleanedNumbers } = extractDelimiter(numbers);
    const numberArray = splitNumbers(cleanedNumbers, delimiter);

    const negatives = numberArray.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new NegativeNumberNotAllowedError(negatives);
    }

    return numberArray.reduce((sum, num) => sum + num, 0);
}

module.exports = { add };
