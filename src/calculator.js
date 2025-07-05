
function add(numbers) {
    if (numbers === '') return 0;

    //replace new line with ',' and handle as comma seprated value handle
    const numberArray = numbers.replace(/\n/g, ',').split(',').map(Number);
    return numberArray.reduce((sum, num) => sum + num, 0);
}

module.exports = { add };