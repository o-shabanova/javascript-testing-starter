import {describe, test, it, expect} from 'vitest';
import {fizzBuzz, max} from "../src/intro.js";

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