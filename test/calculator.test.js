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

})
