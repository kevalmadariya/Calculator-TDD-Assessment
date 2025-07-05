const { NegativeNumberNotAllowedError} = require('./error');

// Characters like *, +, ?, . aren't just characters in regex — they control how patterns behave
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractDelimiter(numbers) {
    if (numbers.startsWith('//')) {
        
        // Match multi-character delimiters like //[***]\n
        const multiDelimiterMatch = numbers.match(/^\/\/\[(.+)\]\n/);
        if (multiDelimiterMatch) {
            const rawDelimiter = multiDelimiterMatch[1];
            const escapedDelimiter = escapeRegExp(rawDelimiter);
            const remainingNumbers = numbers.slice(multiDelimiterMatch[0].length);
            return { delimiter: new RegExp(escapedDelimiter), numbers: remainingNumbers };
        }

        // Match single-character delimiters like //;\n
        const singleDelimiterMatch = numbers.match(/^\/\/(.)\n/);
        if (singleDelimiterMatch) {
            const rawDelimiter = singleDelimiterMatch[1];
            const escapedDelimiter = escapeRegExp(rawDelimiter);
            const remainingNumbers = numbers.slice(singleDelimiterMatch[0].length);
            return { delimiter: new RegExp(escapedDelimiter), numbers: remainingNumbers };
        }
    }

    return { delimiter: /,|\n/, numbers }; // Default delimiters
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

    const validNumbers = numberArray.filter(num => num <= 1000);
    return validNumbers.reduce((sum, num) => sum + num, 0);}

module.exports = { add };
