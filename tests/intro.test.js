import {describe, test, it, expect} from 'vitest';
import {findFactorial, fizzBuzz, max} from "../src/intro.js";

describe('max', () => {
    it('should return the first argument if it is greater', () => {
        expect(max(2, 1)).toBe(2);
    });

    it('should return the second argument if it is greater', () => {
        expect(max(1, 2)).toBe(2);
    });

    it('should return the first argument if arguments are equal', () => {
        expect(max(2, 2)).toBe(2);
    });
})

describe('fizzBuzz', () => {
    it ('should return FizzBuzz if arg is divisible by 3 and 5', () => {
        expect(fizzBuzz(15)).toBe('FizzBuzz');
    });

    it ('should return Fizz if (n % 3 === 0)', () => {
        expect(fizzBuzz(6)).toBe('Fizz');
    });

    it ('should return Buzz if (n % 5 === 0)', () => {
        expect(fizzBuzz(20)).toBe('Buzz');
    });

    it (`should return 'n.toString()' in other cases`, ()=> {
        expect(fizzBuzz(1)).toBe('1');
        expect(fizzBuzz(1001)).toBe('1001');
        expect(fizzBuzz(-7)).toBe('-7');
    });
});

describe('findFactorial', () => {
    it('should return 1 if n===0', () => {
        expect(findFactorial(0)).toBe(1);
    });

    it('should return 1 if n===0', () => {
        expect(findFactorial(1)).toBe(1);
    });

    it('should return  if n===0', () => {
        expect(findFactorial(1)).toBe(1);
    });

    it(`should return 'undefined' or handle error if n is negative number`, () => {
        expect(findFactorial(-2)).toBeUndefined();
    });

    it(`should return 'undefined' or handle error if n is non-integer number`, () => {
        expect(findFactorial(2.2)).toBeUndefined();
    });

    it('should return 2 for n=2', ()=> {
        expect(findFactorial(2)).toBe(2);
    });

    it(`should return correct number`, () => {
        expect(findFactorial(20)).toBe(2432902008176640000);
    });
})