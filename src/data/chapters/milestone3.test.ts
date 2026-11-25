import { describe, it, expect } from 'vitest';
import { generateTrianglesCongruencyQuestion } from './ch08-triangles-congruency';
import { generateMidpointTheoremQuestion } from './ch09-midpoint-theorem';
import { generatePythagorasQuestion } from './ch10-pythagoras-theorem';
import { generateRectilinearFiguresQuestion } from './ch11-rectilinear-figures';
import { generateCircleQuestion } from './ch12-circle';
import { generateStatisticsQuestion } from './ch13-statistics';
import { evaluateAnswer } from '../../engine/evaluator';

const GENERATORS_M3 = [
  { name: 'Ch 8: Triangles & Congruency', fn: generateTrianglesCongruencyQuestion },
  { name: 'Ch 9: Mid-Point Theorem', fn: generateMidpointTheoremQuestion },
  { name: 'Ch 10: Pythagoras Theorem', fn: generatePythagorasQuestion },
  { name: 'Ch 11: Rectilinear Figures', fn: generateRectilinearFiguresQuestion },
  { name: 'Ch 12: Circle', fn: generateCircleQuestion },
  { name: 'Ch 13: Statistics', fn: generateStatisticsQuestion },
];

describe('Milestone 3: 50-Seed Generator Invariant Suite (Chapters 8-13)', () => {
  for (const gen of GENERATORS_M3) {
    describe(gen.name, () => {
      it('generates valid questions with 100% self-evaluating answers across 50 seeds', () => {
        for (let seed = 200; seed < 250; seed++) {
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
