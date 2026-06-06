import { describe, it, expect } from 'vitest';
import { sum, subtract, multiply, divide, power } from '../src/module/math.js';

describe('Math functions', () => {
    it('should return the sum of two numbers', () => {
        expect(sum(2, 3)).toBe(5);
    });
    it('should return the difference of two numbers', () => {
        expect(subtract(5, 3)).toBe(2);
    });
    it('should return the product of two numbers', () => {
        expect(multiply(2, 3)).toBe(6);
    });
    it('should return the quotient of two numbers', () => {
        expect(divide(10, 2)).toBe(5);
    });
    it('should throw an error when dividing by zero', () => {
        expect(() => divide(10, 0)).toThrow("No se puede dividir por cero");
    });
    it('should return the power of a number', () => {
        expect(power(2, 3)).toBe(8);
    });
});
