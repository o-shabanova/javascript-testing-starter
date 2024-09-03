import {describe, it, expect} from "vitest";
import {getCoupons, isPriceInRange, isValidUsername, validateUserInput} from "../src/core.js";

describe ('testing getCoupons', () => {
    const coupons = getCoupons();
    it('returns array that is not empty', () => {
        expect(Array.isArray(coupons)).toBe(true);
        expect(getCoupons()).not.toHaveLength(0);
    });
    it('should has two properties in each object - code = string and discount = number between 0 and 1', () => {

        const expectedValues = ['SAVE20NOW', 'DISCOUNT50OFF'];
        // Check if every object in the array has a 'code' property of type string and a 'discount' property of type number between 0 and 1
        const isValid = coupons.every(coupon =>
            typeof coupon.code === 'string' &&
            typeof coupon.discount === 'number' &&
            coupon.discount >= 0 &&
            coupon.discount <= 1 &&
        expectedValues.some(value => coupon.code.includes(value))
        );

        expect(isValid).toBe(true);
    })

    //solution by Mosh
    it('should return an array with valid coupon codes', () => {
        // const coupons = getCoupons();
        coupons.forEach( coupon => {
            expect(coupon).toHaveProperty('code');
            expect(typeof coupon.code).toBe('string');
            expect(coupon.code).toBeTruthy();
        })
    });
    //our test cases should have single responsibilities
    // to easier maintain
    // what`s going wrong if necessary
    it('should return array with valid discounts', () => {
        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('discount');
            expect(typeof coupon.discount).toBe('number');
            expect(coupon.discount).toBeGreaterThan(0);
            expect(coupon.discount).toBeLessThan(1);
        })
    })
});

describe ('testing validateUserInput', () => {

    const user = validateUserInput("Olga", 18);
    it('should call function with valid input', () => {
        expect(validateUserInput("Olga", 18)).toMatch(/successful/i);
    });
    it('return an error if username not a string', () => {
        expect(validateUserInput(123, 18)).toMatch(/invalid/i);
    });
    it('return an error if username less than 3 letters', () => {
        expect(validateUserInput('mo', 18)).toMatch(/invalid/i);
    });
    it('return an error if username longer than 50 letters', () => {
        expect(validateUserInput('m'.repeat(51), 18)).toMatch(/invalid/i);
    });
    it('return an error if age not a number', () => {
        expect(validateUserInput('olga', '18')).toMatch(/invalid/i);
    });

    it('return an error if age less than 18', () => {
        expect(validateUserInput('olga', 17)).toMatch(/invalid/i);
    });

    it('return an error if both username and age are invalid', () => {
        expect(validateUserInput('ol', '17')).toMatch(/invalid username/i);
        expect(validateUserInput('ol', '17')).toMatch(/invalid age/i);

    });
});

//isValidUsername testing

describe('isValidUsername testing', () => {
    const minLength = 5;
    const maxLength = 15;
    it('should return false if userLength is too short', () => {
        //чому це не працює?
        expect(isValidUsername('Ole')).toBe(false);
        expect(isValidUsername('a'.repeat(minLength - 1))).toBe(false);

    });
    it('should return false if userLength is too long', () => {
        expect(isValidUsername('a'.repeat(maxLength + 1))).toBe(false);
    });

    it('should return true if userLength is exactly equal min or max', () => {
        expect(isValidUsername('a'.repeat(maxLength))).toBe(true);
        expect(isValidUsername('a'.repeat(minLength))).toBe(true);

    });

    it('should return false for invalid input types', () => {
        expect(isValidUsername(null)).toBe(false);
        expect(isValidUsername(undefined)).toBe(false);
        expect(isValidUsername(1)).toBe(false);

    });

})