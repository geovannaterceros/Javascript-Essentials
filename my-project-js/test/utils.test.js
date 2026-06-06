import { describe, it, expect } from 'vitest';
import { formatTaskName, calculateCompletionRate, HabitTracker } from '../src/utils.js';

describe('formatTaskName', () => {
    it('should capitalize the first letter of a string', () => {
        expect(formatTaskName('hello')).toBe('Hello');
    });
    it('should trim whitespace from a string', () => {
        expect(formatTaskName('  hello  ')).toBe('Hello');
    });
    it('should return an empty string for invalid input', () => {
        expect(formatTaskName('')).toBe('');
        expect(formatTaskName(null)).toBe('');
        expect(formatTaskName(undefined)).toBe('');
    });
});

describe('calculateCompletionRate', () => {
    it('should return 0 for invalid input', () => {
        expect(calculateCompletionRate(-1, 5)).toBe(0);
        expect(calculateCompletionRate(3, 0)).toBe(0);
    });
    it('should return 100 when all tasks are completed', () => {
        expect(calculateCompletionRate(5, 5)).toBe(100);
    });
    it('should return 0 when no tasks are completed', () => {
        expect(calculateCompletionRate(0, 5)).toBe(0);
    });
    it('should return the correct completion rate', () => {
        expect(calculateCompletionRate(3, 5)).toBe(60);
    });
});


describe('HabitTracker', () => {
    let habitTracker = new HabitTracker();

    it('should initialize with a streak of 0', () => {
        expect(habitTracker.streak).toBe(0);
    });

    it('should increment the streak when a habit is completed', () => {
        habitTracker.completeHabit(true);
        expect(habitTracker.streak).toBe(1);
    });

    it('should reset the streak when a habit is not completed', () => {
        habitTracker.completeHabit(true);
        habitTracker.completeHabit(false);
        expect(habitTracker.streak).toBe(0);
    });

    it('should reset the streak to 0', () => {
        habitTracker.completeHabit(true);
        habitTracker.reset();
        expect(habitTracker.streak).toBe(0);
    });
});
