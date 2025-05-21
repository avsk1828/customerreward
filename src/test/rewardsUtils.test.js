
import { calculateRewardPoints } from './rewardsUtils';

describe('calculateRewardPoints', () => {

  test('should correctly calculate points for an amount over $100 (whole number)', () => {
    expect(calculateRewardPoints(120)).toBe(90); 
    expect(calculateRewardPoints(150)).toBe(150); 
  });

  test('should correctly calculate points for an amount over $100 (fractional)', () => {
    expect(calculateRewardPoints(120.50)).toBe(91); 
    expect(calculateRewardPoints(100.01)).toBe(50); 
  });

  test('should correctly calculate points for an amount between $50 and $100 (whole number)', () => {
    expect(calculateRewardPoints(75)).toBe(25); 
    expect(calculateRewardPoints(100)).toBe(50); 
  });

  test('should correctly calculate points for an amount between $50 and $100 (fractional)', () => {
    expect(calculateRewardPoints(75.50)).toBe(25); 
    expect(calculateRewardPoints(50.01)).toBe(0); 
  });

  test('should return 0 points for an amount equal to $50', () => {
    expect(calculateRewardPoints(50)).toBe(0);
  });

  test('should return 0 points for an amount less than $50', () => {
    expect(calculateRewardPoints(49.99)).toBe(0);
    expect(calculateRewardPoints(0)).toBe(0);
  });

  test('should return 0 points for negative amounts', () => {
    expect(calculateRewardPoints(-10)).toBe(0);
  });
});