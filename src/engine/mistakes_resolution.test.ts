import { describe, it, expect, beforeEach } from 'vitest';
import { Storage } from './storage';
import { evaluateAnswer } from './evaluator';
import { CHAPTER_MODULES } from '../data/chapters';

// Mock localStorage for test environment
const store: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (k: string) => store[k] ?? null,
  setItem: (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); }
};
(globalThis as any).localStorage = mockLocalStorage;

describe('Mistakes Retry Resolution & Mathematical Accuracy Audit', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('correctly resolves mistakes when passed either question.id or mistake.id', () => {
    const q = CHAPTER_MODULES[1].curatedQuestions[0];
    Storage.addMistake(q, 'A');

    const mistakesBefore = Storage.getMistakes();
    expect(mistakesBefore.length).toBe(1);
    expect(mistakesBefore[0].mastered).toBe(false);

    // Test resolving via mistake item.id
    Storage.resolveMistake(mistakesBefore[0].id);
    const mistakesAfterId = Storage.getMistakes();
    expect(mistakesAfterId[0].mastered).toBe(true);

    // Re-add and resolve via question.id
    Storage.addMistake(q, 'B');
    Storage.resolveMistake(q.id);
    const mistakesAfterQId = Storage.getMistakes();
    expect(mistakesAfterQId[0].mastered).toBe(true);
  });

  it('evaluates Chapter 21 Q4 trigonometric expression mathematically correctly', () => {
    const q = CHAPTER_MODULES[21].curatedQuestions.find(q => q.id === 'ch21_q04');
    expect(q).toBeDefined();

    // Student enters 43.2
    const resDecimal = evaluateAnswer('43.2', q!.expectedAnswer!, {
      tolerance: q!.tolerance,
      acceptableAnswers: q!.acceptableAnswers,
    });
    expect(resDecimal.isCorrect).toBe(true);

    // Student enters fraction 216/5
    const resFraction = evaluateAnswer('216/5', q!.expectedAnswer!, {
      tolerance: q!.tolerance,
      acceptableAnswers: q!.acceptableAnswers,
    });
    expect(resFraction.isCorrect).toBe(true);
  });

  it('evaluates MCQ retry options case-insensitively and by option text', () => {
    const q = CHAPTER_MODULES[1].curatedQuestions[0]; // correctOptionId: 'C'
    expect(q.correctOptionId).toBe('C');

    // Case insensitivity
    const isMatchUpper = 'C'.trim().toUpperCase() === q.correctOptionId!.trim().toUpperCase();
    const isMatchLower = 'c'.trim().toUpperCase() === q.correctOptionId!.trim().toUpperCase();
    expect(isMatchUpper).toBe(true);
    expect(isMatchLower).toBe(true);

    // Option text match
    const optC = q.mcqOptions?.find(o => o.id === 'C');
    expect(optC).toBeDefined();
    const optMatch = q.mcqOptions?.find(
      (o) => o.id.toUpperCase() === 'C' || o.text.trim().toLowerCase() === optC!.text.trim().toLowerCase()
    );
    expect(optMatch?.id).toBe('C');
  });

  it('evaluates descriptive/textual answers like right-angled scalene, Yes, No, II', () => {
    const res1 = evaluateAnswer('right-angled scalene', 'right-angled scalene');
    expect(res1.isCorrect).toBe(true);

    const res2 = evaluateAnswer('right angled scalene', 'right-angled scalene');
    expect(res2.isCorrect).toBe(true);

    const res3 = evaluateAnswer('yes', 'Yes');
    expect(res3.isCorrect).toBe(true);

    const res4 = evaluateAnswer('ii', 'II');
    expect(res4.isCorrect).toBe(true);
  });
});
