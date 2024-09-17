import {it, expect, describe, vi} from "vitest"
import {getPriceInCurrency, getShippingInfo, renderPage, signUp, submitOrder} from "../src/mocking.js";
import {getExchangeRate} from "../src/libs/currency.js";
import {getShippingQuote} from "../src/libs/shipping.js";
import {charge} from "../src/libs/payment.js";
import {trackPageView} from "../src/libs/analytics.js";
import {sendEmail} from "../src/libs/email.js";

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');
vi.mock('../src/libs/email', async (importOriginal) => {
    const originalModule = await importOriginal();
    return {
        ...originalModule,
        sendEmail: vi.fn()
    }
});

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

//renderPage
describe('renderPage', () => {
    it('should return correct content', async () => {
        const result = await renderPage();

        expect(result).toMatch(/content/i);
    });

    it('should call analytics', async () => {
        await renderPage();

        expect(trackPageView).toHaveBeenCalledWith('/home');
    });
});

//submitOrder testing
describe('submitOrder', () => {
    const order = { totalAmount: 10 };
    const creditCard = { creditCardNumber: '1234' };

    it('should calls charge with the right arguments', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'success' });

        await submitOrder(order, creditCard);

        expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
    });

    it('should return success when payment is successful', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'success' });

        const result = await submitOrder(order, creditCard);

        expect(result).toEqual({ success: true });
    });

    it('should return success when payment is successful', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'failed' });

        const result = await submitOrder(order, creditCard);

        expect(result).toEqual({ success: false, error: 'payment_error'});
    });



})

//signUp
describe('signUp', () => {
    const email = 'bla-bla@gmail.com';
    it('should return false if email is not valid', async () => {
        const result = await signUp('a');

        expect(result).toBe(false);
    });

    it('should return true if email is valid', async () => {
        const result = await signUp(email);

        expect(result).toBe(true);
    });

    it('should send the welcome email if email is valid', async () => {

        const result = await signUp(email);

        expect(sendEmail).toHaveBeenCalled();
        const args = vi.mocked(sendEmail).mock.calls[0];

        expect(args[0]).toBe(email);
        expect(args[1]).toMatch(/welcome/i);
    });
})

