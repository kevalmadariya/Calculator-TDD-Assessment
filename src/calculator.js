const { NegativeNumberNotAllowedError} = require('./error');

let addCallCount = 0; 

function ResetCalledCount() {
    addCallCount = 0;
}


// Characters like *, +, ?, . aren't just characters in regex — they control how patterns behave
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


function extractDelimiter(numbers) {
    if (numbers.startsWith('//')) {
        
        const multiDelimiterMatch = numbers.match(/^\/\/((?:\[[^\]]+\])+)\n/);//Change for multiDelimiterMatch
        if (multiDelimiterMatch) {

            const delimiterPart = multiDelimiterMatch[1]; // e.g. [***][%]
            const delimiterMatches = [...delimiterPart.matchAll(/\[(.*?)\]/g)];
            const delimiters = delimiterMatches.map(match => escapeRegExp(match[1])); 
            const delimiterRegex = new RegExp(delimiters.join('|'));
            const remainingNumbers = numbers.slice(multiDelimiterMatch[0].length);

            return { delimiter: delimiterRegex, numbers: remainingNumbers };
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
    return numbers.split(delimiter);
}


// Main add function
function add(numbers) {

    addCallCount++; // Track number of calls

    if (numbers === '') return 0;

    const { delimiter, numbers: cleanedNumbers } = extractDelimiter(numbers);
    const numberParts = splitNumbers(cleanedNumbers, delimiter);
    const numberArray = numberParts.map(Number);

    const negatives = numberArray.filter(num => num < 0);
    if (negatives.length > 0) {
        throw new NegativeNumberNotAllowedError(negatives);
    }

    const validNumbers = numberArray.filter(num => num <= 1000);
    return validNumbers.reduce((sum, num) => sum + num, 0);
}


function GetCalledCount() {
    return addCallCount;
}


module.exports = { add, GetCalledCount, ResetCalledCount };
