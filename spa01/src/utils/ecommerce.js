export function checkout(cartTotal, paymentProcessorFn) {
    if (cartTotal <= 0) return 'Invalid Cart';
    
    // Call the external payment processor dependency
    const receiptId = paymentProcessorFn(cartTotal);
    
    return `Success! Your receipt is ${receiptId}`;
}