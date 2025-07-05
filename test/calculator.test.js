const { add } = require('../src/calculator')
const { NegativeNumberNotAllowedError } = require('../src/error');

//init
describe('Sanity checks', () => {
    test('Testing environment is operational', () => {
        expect(1).toBe(1);
    });
});

describe('Add method tests', () => {

    test('Returns 0 as sum for an empty string ', () => {
        expect(add('')).toBe(0)
    });// 1

    test('Returns number it self for a single number string', () => {
        expect(add('7')).toBe(7);
    });// 2

    test('Returns addition of comma-separated numbers in string', () => {
        expect(add('1,2,3')).toBe(6);
    });// 3

    test('Returns addition of numbers in string which are separated by new line', () => {
        expect(add("1\n2,3")).toBe(6);
    });// 4

    test('Returns addition of numbers using custom delimiter', () => {
        expect(add("//;\n1;2")).toBe(3);
    });// 5

    test('Throws NegativeNumberError listing all negative numbers separated by commas', () => {
        expect(() => add('1,-2,-3,4,-5')).toThrow(NegativeNumberNotAllowedError);
    });// 6

     test('Ignores numbers greater than 1000 while using custom delimiter', () => {
        expect(add('//;\n1000;1001;3')).toBe(1003);
    });// 7

    test('Supports delimiters of any length and ignores numbers greater than 1000', () => {
        expect(add('//[***]\n1***1001***3')).toBe(4);
    });// 8

    test('Supports multiple delimiters of any length', () => {
        expect(add('//[***][%%]\n1***2%%3')).toBe(6);
    });// 9

    test('Tracks how many times add() was called using GetCalledCount', () => {
        add('1,2'); // Call 1
        add('4');   // Call 2
        add('');    // Call 3
        expect(GetCalledCount()).toBe(3);
    });//10

})
