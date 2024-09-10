import {it, expect, describe, vi} from "vitest"
import {getPriceInCurrency, getShippingInfo} from "../src/mocking.js";
import {getExchangeRate} from "../src/libs/currency.js";
import {getShippingQuote} from "../src/libs/shipping.js";

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');

describe ('test suite', () => {
    it('test case', () => {
        //Create a mock for the following function
        //sendText(massage) {}
        const sendMassage = vi.fn();
        sendMassage.mockReturnValue('ok');

        //Call the mock function
        const result = sendMassage('message');

        //Assert that mock function
        expect(sendMassage).toHaveBeenCalledWith('message');

        //Assert the result of function
        expect(result).toBe('ok');

    })
});
//getShippingInfo testing
describe ('testing getShippingInfo', () => {
    it('should return unavailable if quote can not be fetched ', () => {
        vi.mocked(getShippingQuote).mockReturnValue(null);

        const result = getShippingInfo('London');

        expect(result).toMatch(/unavailable/i);
    });

    it('should return calculated shipping cost if quote can be fetched', () => {
        vi.mocked(getShippingQuote).mockReturnValue({cost:15, estimatedDays:3});
        const result = getShippingInfo('London');

        // expect(result).toMatch('$15');
        // expect(result).toMatch(/3 days/i);
        expect(result).toMatch(/shipping cost: \$15 \(3 days\)/i);
    })
})
