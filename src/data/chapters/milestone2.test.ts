import { describe, it, expect } from 'vitest';
import { generateRationalSurdQuestion } from './ch01-rational-irrational';
import { generateCompoundInterestQuestion } from './ch02-compound-interest';
import { generateExpansionsQuestion } from './ch03-expansions';
import { generateFactorisationQuestion } from './ch04-factorisation';
import { generateSimultaneousEqQuestion } from './ch05-simultaneous-linear-equations';
import { generateIndicesQuestion } from './ch06-indices';
import { generateLogarithmsQuestion } from './ch07-logarithms';
import { evaluateAnswer } from '../../engine/evaluator';

const GENERATORS = [
  { name: 'Ch 1: Rational & Surds', fn: generateRationalSurdQuestion },
  { name: 'Ch 2: Compound Interest', fn: generateCompoundInterestQuestion },
  { name: 'Ch 3: Expansions', fn: generateExpansionsQuestion },
  { name: 'Ch 4: Factorisation', fn: generateFactorisationQuestion },
  { name: 'Ch 5: Simultaneous Equations', fn: generateSimultaneousEqQuestion },
  { name: 'Ch 6: Indices', fn: generateIndicesQuestion },
  { name: 'Ch 7: Logarithms', fn: generateLogarithmsQuestion },
];

describe('Milestone 2: 50-Seed Generator Invariant Suite (Chapters 1-7)', () => {
  for (const gen of GENERATORS) {
    describe(gen.name, () => {
      it('generates valid questions with 100% self-evaluating answers across 50 seeds', () => {
        for (let seed = 100; seed < 150; seed++) {
          const q = gen.fn(seed);

          // 1. Invariant: valid metadata
          expect(q.id).toBeDefined();
          expect(q.prompt).toBeTruthy();
          expect(q.prompt).not.toContain('NaN');
          expect(q.prompt).not.toContain('undefined');

          // 2. Invariant: valid solution & hints
          expect(q.hintLadder.hint1Concept).toBeTruthy();
          expect(q.hintLadder.hint2Formula).toBeTruthy();
          expect(q.hintLadder.hint3Step).toBeTruthy();
          expect(q.solution.steps.length).toBeGreaterThanOrEqual(2);
          expect(q.solution.finalAnswer).toBeTruthy();

          // 3. Invariant: Expected answer evaluates to 100% correct with evaluateAnswer
          expect(q.expectedAnswer).toBeTruthy();
          const evalRes = evaluateAnswer(q.expectedAnswer!, q.expectedAnswer!, {
            tolerance: q.tolerance ?? 0.05,
            acceptableAnswers: q.acceptableAnswers,
          });

          if (!evalRes.isCorrect) {
            console.error(`Failed self-evaluation on seed ${seed} for ${gen.name}:`, {
              expected: q.expectedAnswer,
              acceptable: q.acceptableAnswers,
            });
          }
          expect(evalRes.isCorrect).toBe(true);
        }
      });
    });
  }
});
