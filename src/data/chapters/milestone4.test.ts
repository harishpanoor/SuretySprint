import { describe, it, expect } from 'vitest';
import { generateAreaPerimeterQuestion } from './ch14-area-perimeter';
import { generateSurfaceAreaVolumeQuestion } from './ch15-surface-area-volume';
import { generateTrigonometryQuestion } from './ch16-trigonometry';
import { generateCartesianPlaneQuestion } from './ch17-cartesian-plane';
import { generateDistanceFormulaQuestion } from './ch18-distance-formula';
import { evaluateAnswer } from '../../engine/evaluator';
import { CHAPTER_MODULES } from './index';

const GENERATORS_M4 = [
  { name: 'Ch 14: Area & Perimeter', fn: generateAreaPerimeterQuestion },
  { name: 'Ch 15: Surface Area & Volume', fn: generateSurfaceAreaVolumeQuestion },
  { name: 'Ch 16: Trigonometry', fn: generateTrigonometryQuestion },
  { name: 'Ch 17: Cartesian Plane', fn: generateCartesianPlaneQuestion },
  { name: 'Ch 18: Distance Formula', fn: generateDistanceFormulaQuestion },
];

describe('Milestone 4: 50-Seed Generator Invariant Suite (Chapters 14-18)', () => {
  for (const gen of GENERATORS_M4) {
    describe(gen.name, () => {
      it('generates valid questions with 100% self-evaluating answers across 50 seeds', () => {
        for (let seed = 300; seed < 350; seed++) {
          const q = gen.fn(seed);

          // Invariants
          expect(q.id).toBeDefined();
          expect(q.prompt).toBeTruthy();
          expect(q.prompt).not.toContain('NaN');
          expect(q.prompt).not.toContain('undefined');

          expect(q.hintLadder.hint1Concept).toBeTruthy();
          expect(q.hintLadder.hint2Formula).toBeTruthy();
          expect(q.hintLadder.hint3Step).toBeTruthy();
          expect(q.solution.steps.length).toBeGreaterThanOrEqual(2);
          expect(q.solution.finalAnswer).toBeTruthy();

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

describe('Full 18-Chapter Curriculum Completeness', () => {
  it('has all 18 chapters registered with formula sheets, generators, and >=6 curated questions', () => {
    for (let id = 1; id <= 18; id++) {
      const mod = CHAPTER_MODULES[id];
      expect(mod, `Chapter ${id} must exist`).toBeDefined();
      expect(mod.chapter.id).toBe(id);
      expect(mod.chapter.formulaSheet.formulas.length).toBeGreaterThanOrEqual(2);
      expect(mod.chapter.formulaSheet.keyRules.length).toBeGreaterThanOrEqual(2);
      expect(mod.curatedQuestions.length).toBeGreaterThanOrEqual(6);

      // Verify each curated question has hint ladder and solution
      for (const q of mod.curatedQuestions) {
        expect(q.prompt).toBeTruthy();
        expect(q.hintLadder.hint1Concept).toBeTruthy();
        expect(q.hintLadder.hint2Formula).toBeTruthy();
        expect(q.hintLadder.hint3Step).toBeTruthy();
        expect(q.solution.steps.length).toBeGreaterThanOrEqual(1);
        expect(q.solution.finalAnswer).toBeTruthy();
      }
    }
  });
});
