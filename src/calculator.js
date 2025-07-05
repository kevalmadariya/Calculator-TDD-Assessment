// Characters like *, +, ?, . aren't just characters in regex — they control how patterns behave
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function add(numbers) {
    if (numbers === '') return 0;

    let delimiter = /,|\n/; 

    if (numbers.startsWith('//')) {
    
        const delimiterLine = numbers.match(/^\/\/(.)\n/);
        if (delimiterLine) {
            delimiter = new RegExp(escapeRegExp(delimiterLine[1]));// Escape delimiter to handle special regex characters
            numbers = numbers.slice(delimiterLine[0].length);
        }

    }

    const numberArray = numbers.split(delimiter).map(Number);
    return numberArray.reduce((sum, num) => sum + num, 0);
}

module.exports = { add };