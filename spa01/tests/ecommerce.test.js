// ecommerce.test.js
import { test, expect, vi } from 'vitest';
import { checkout } from '../src/utils/ecommerce.js';

test('checkout processes payment successfully with a mock', () => {
    // 1. Create a mock function that simulates a successful payment response
    const mockPaymentProcessor = vi.fn((amount) => 'REC-12345');

    //const mockPaymentProcessor = (amount) => 'REC-12345';

    // 2. Execute the code under test, passing the mock in
    const result = checkout(100, mockPaymentProcessor);
    const result2 = checkout(200, mockPaymentProcessor);

    // 3. Assertion 1: Check the output of our function
    expect(result).toBe('Success! Your receipt is REC-12345');

    // 4. Assertion 2 (Behavioral): Verify the mock was interacted with correctly
    expect(mockPaymentProcessor).toHaveBeenCalledTimes(2);
    expect(mockPaymentProcessor).toHaveBeenCalledWith(100);
});

test('checkout with card 0 with a mock', () => {
    // 1. Create a mock function that simulates a successful payment response
    const mockPaymentProcessor = vi.fn();
    
    // 2. Execute the code under test, passing the mock in
    const result = checkout(0, mockPaymentProcessor);

    // 3. Assertion 1: Check the output of our function
    expect(result).toBe('Invalid Cart');

    // 4. Assertion 2 (Behavioral): Verify the mock was interacted with correctly
    expect(mockPaymentProcessor).toHaveBeenCalledTimes(0);
    //expect(mockPaymentProcessor).toHaveBeenCalledWith(-10);
});