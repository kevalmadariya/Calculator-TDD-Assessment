const {add} = require('../src/calculator')

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

    test('Returns number it self for a single number string', () =>{
       expect(add('7')).toBe(7);
    });// 2

    test('Returns addition of comma-separated numbers in string', ()=>{
        expect(add('1,2,3')).toBe(6);
    });// 3

    test('Returns addition of numbers in string which are separated by new line', ()=>{
        expect(add("1\n2,3")).toBe(6);
    });// 4

})
