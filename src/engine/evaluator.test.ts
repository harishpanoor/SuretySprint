import { describe, it, expect } from 'vitest';
import { evaluateAnswer, normalizeMathString } from './evaluator';

describe('Evaluator Engine', () => {
  describe('normalizeMathString', () => {
    it('normalizes LaTeX fraction to standard fraction', () => {
      expect(normalizeMathString('\\frac{3}{4}')).toBe('((3)/(4))');
      expect(normalizeMathString('\\frac{x+1}{x-1}')).toBe('((x+1)/(x-1))');
    });

    it('normalizes sqrt', () => {
      expect(normalizeMathString('\\sqrt{5}')).toBe('sqrt(5)');
      expect(normalizeMathString('\\sqrt{16}')).toBe('sqrt(16)');
    });

    it('strips units and currency', () => {
      expect(normalizeMathString('₹ 5000')).toBe('5000');
      expect(normalizeMathString('Rs 1250.50')).toBe('1250.50');
      expect(normalizeMathString('45 cm^2')).toBe('45');
      expect(normalizeMathString('30°')).toBe('30');
      expect(normalizeMathString('12.5%')).toBe('12.5');
    });

    it('removes leading variable assignments', () => {
      expect(normalizeMathString('x = 5')).toBe('5');
      expect(normalizeMathString('CI = 1200')).toBe('1200');
      expect(normalizeMathString('Area = 48')).toBe('48');
    });
  });

  describe('Fractions and Decimals', () => {
    it('evaluates fraction equivalent to decimal', () => {
      expect(evaluateAnswer('3/4', '0.75').isCorrect).toBe(true);
      expect(evaluateAnswer('0.75', '3/4').isCorrect).toBe(true);
      expect(evaluateAnswer('\\frac{3}{4}', '0.75').isCorrect).toBe(true);
      expect(evaluateAnswer('1/2', '0.5').isCorrect).toBe(true);
      expect(evaluateAnswer('7/8', '0.875').isCorrect).toBe(true);
    });

    it('evaluates mixed and negative fractions', () => {
      expect(evaluateAnswer('-5/2', '-2.5').isCorrect).toBe(true);
      expect(evaluateAnswer('-2.5', '-\\frac{5}{2}').isCorrect).toBe(true);
    });
  });

  describe('Negative numbers and signs', () => {
    it('evaluates negative values properly', () => {
      expect(evaluateAnswer('-12', '-12').isCorrect).toBe(true);
      expect(evaluateAnswer('-12.0', '-12').isCorrect).toBe(true);
      expect(evaluateAnswer('-(5+7)', '-12').isCorrect).toBe(true);
      expect(evaluateAnswer('-12', '12').isCorrect).toBe(false);
    });
  });

  describe('Surds and radicals', () => {
    it('evaluates surd forms and numerical approximations', () => {
      expect(evaluateAnswer('2*sqrt(3)', 'sqrt(12)').isCorrect).toBe(true);
      expect(evaluateAnswer('2\\sqrt{3}', 'sqrt(12)').isCorrect).toBe(true);
      expect(evaluateAnswer('3.464', '2*sqrt(3)', { tolerance: 0.01 }).isCorrect).toBe(true);
      expect(evaluateAnswer('sqrt(2)', '1.414', { tolerance: 0.01 }).isCorrect).toBe(true);
    });
  });

  describe('Algebraic expressions', () => {
    it('evaluates commutativity and factored forms', () => {
      expect(evaluateAnswer('(x+2)(x-3)', '(x-3)(x+2)').isCorrect).toBe(true);
      expect(evaluateAnswer('x^2 - x - 6', '(x+2)(x-3)').isCorrect).toBe(true);
      expect(evaluateAnswer('(a+b)^2', 'a^2 + 2*a*b + b^2').isCorrect).toBe(true);
      expect(evaluateAnswer('(2*x + 1)(x - 4)', '2*x^2 - 7*x - 4').isCorrect).toBe(true);
    });

    it('detects incorrect algebraic forms', () => {
      expect(evaluateAnswer('(x+2)(x+3)', 'x^2 - x - 6').isCorrect).toBe(false);
    });
  });

  describe('Coordinate pairs', () => {
    it('evaluates coordinate pairs in various formats', () => {
      expect(evaluateAnswer('(2, -5)', '(2, -5)').isCorrect).toBe(true);
      expect(evaluateAnswer('2, -5', '(2, -5)').isCorrect).toBe(true);
      expect(evaluateAnswer('(2,-5)', '2, -5').isCorrect).toBe(true);
      expect(evaluateAnswer('(2, 5)', '(2, -5)').isCorrect).toBe(false);
      expect(evaluateAnswer('(-5, 2)', '(2, -5)').isCorrect).toBe(false);
    });
  });

  describe('Unordered roots and comma sets', () => {
    it('evaluates roots regardless of order', () => {
      expect(evaluateAnswer('2, -3', '-3, 2').isCorrect).toBe(true);
      expect(evaluateAnswer('x = 2, 3', '3, 2').isCorrect).toBe(true);
      expect(evaluateAnswer('-3, 2', 'x = 2 or x = -3').isCorrect).toBe(true);
    });
  });

  describe('Rounding tolerance', () => {
    it('handles rounding tolerance', () => {
      expect(evaluateAnswer('1240.50', '1240.48', { tolerance: 0.05 }).isCorrect).toBe(true);
      expect(evaluateAnswer('1240.50', '1240.00', { tolerance: 0.05 }).isCorrect).toBe(false);
    });
  });
});
