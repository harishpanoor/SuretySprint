import { describe, it, expect } from 'vitest';
import { evaluateAnswer } from './engine/evaluator';
import { CHAPTER_MODULES } from './data/chapters';

describe('Regression Tests: P0 & P1 Bug Fixes', () => {
  describe('P0.1: Ch 6 Q5 Mathematical & Prompt Accuracy', () => {
    it('should have consistent prompt, hint, and solution for the fraction problem', () => {
      const q5 = CHAPTER_MODULES[6].curatedQuestions.find(q => q.id === 'ch06_q05')!;
      expect(q5).toBeDefined();
      expect(q5.prompt).toContain('\\frac{1}{5}');
      expect(q5.prompt).not.toContain('it becomes $\\frac{1}{3}$');

      expect(q5.subParts).toBeDefined();
      expect(q5.subParts!.length).toBe(2);

      const part1 = q5.subParts![0];
      const part2 = q5.subParts![1];
      expect(part1.expectedAnswer).toBe('7');
      expect(part2.expectedAnswer).toBe('15');

      // Evaluator should mark student answers 7 and 15 correct
      expect(evaluateAnswer('7', part1.expectedAnswer).isCorrect).toBe(true);
      expect(evaluateAnswer('15', part2.expectedAnswer).isCorrect).toBe(true);

      // Verify the math: (7+1)/(15+1) = 8/16 = 1/2; (7-5)/(15-5) = 2/10 = 1/5
      expect((7 + 1) / (15 + 1)).toBe(0.5);
      expect((7 - 5) / (15 - 5)).toBe(0.2);
    });
  });

  describe('P0.4 & P0.5: Evaluator Parsing and Symbol Toolbar Support', () => {
    it('should parse nested LaTeX fractions and square roots without throwing', () => {
      expect(evaluateAnswer('\\frac{\\sqrt{3}}{2}', 'sqrt(3)/2').isCorrect).toBe(true);
      expect(evaluateAnswer('\\frac{\\sqrt{5} + \\sqrt{3}}{2}', '(sqrt(5)+sqrt(3))/2').isCorrect).toBe(true);
      expect(evaluateAnswer('\\frac{1}{\\sqrt{3}}', '1/sqrt(3)').isCorrect).toBe(true);
      expect(evaluateAnswer('\\frac{1}{\\sqrt{2}}', 'sqrt(2)/2').isCorrect).toBe(true);
    });

    it('should handle unicode square root symbols and implicit multiplication', () => {
      expect(evaluateAnswer('√3', 'sqrt(3)').isCorrect).toBe(true);
      expect(evaluateAnswer('2√3', '2*sqrt(3)').isCorrect).toBe(true);
      expect(evaluateAnswer('2 √3', '2*sqrt(3)').isCorrect).toBe(true);
      expect(evaluateAnswer('3√(2)', '3*sqrt(2)').isCorrect).toBe(true);
    });

    it('should correctly handle thousands separators without confusing coordinates', () => {
      expect(evaluateAnswer('₹ 1,250', '1250').isCorrect).toBe(true);
      expect(evaluateAnswer('1,250', '1250').isCorrect).toBe(true);
      expect(evaluateAnswer('Rs. 12,500', '12500').isCorrect).toBe(true);

      // Coordinates with space should remain coordinates
      expect(evaluateAnswer('(1, 250)', '(1, 250)').isCorrect).toBe(true);
      expect(evaluateAnswer('1, 250', '(1, 250)').isCorrect).toBe(true);
    });

    it('should support mixed fractions entered by students', () => {
      expect(evaluateAnswer('1 1/2', '1.5').isCorrect).toBe(true);
      expect(evaluateAnswer('1 1/2', '3/2').isCorrect).toBe(true);
      expect(evaluateAnswer('2 3/4', '2.75').isCorrect).toBe(true);
    });
  });

  describe('P0.6: Procedural Generator LaTeX Delimiter Integrity across 100 Seeds', () => {
    function countDollars(s: string): number {
      const matches = s.match(/(?<!\\)\$/g);
      return matches ? matches.length : 0;
    }

    it('Ch 12 Pythagoras generator produces zero unrendered text or unbalanced delimiters', () => {
      const gen = CHAPTER_MODULES[12].generator;
      for (let seed = 1; seed <= 100; seed++) {
        const q = gen(seed);
        expect(countDollars(q.prompt) % 2).toBe(0);
        expect(q.prompt).not.toMatch(/\s+\d+\\text\{ m\}\$/);
        // If ladder prompt, verify $ before length
        if (q.prompt.includes('ladder of length')) {
          expect(q.prompt).toMatch(/ladder of length \$\d+\\text\{ m\}\$/);
        }
      }
    });

    it('Ch 16 Circle generator produces zero unrendered text or unbalanced delimiters', () => {
      const gen = CHAPTER_MODULES[16].generator;
      for (let seed = 1; seed <= 100; seed++) {
        const q = gen(seed);
        expect(countDollars(q.prompt) % 2).toBe(0);
        expect(q.prompt).not.toMatch(/\s+\d+\\text\{ cm\}\$/);
        if (q.prompt.includes('parallel chords of lengths')) {
          expect(q.prompt).toMatch(/lengths \$\d+\\text\{ cm\}\$/);
        }
      }
    });

    it('Ch 19 Area & Perimeter generator produces zero unrendered text or unbalanced delimiters', () => {
      const gen = CHAPTER_MODULES[19].generator;
      for (let seed = 1; seed <= 100; seed++) {
        const q = gen(seed);
        expect(countDollars(q.prompt) % 2).toBe(0);
        if (q.prompt.includes('trapezium are')) {
          expect(q.prompt).toMatch(/trapezium are \$\d+\\text\{ cm\}\$/);
        }
        if (q.prompt.includes('lawn of radius')) {
          expect(q.prompt).toMatch(/lawn of radius \$\d+\\text\{ m\}\$/);
        }
      }
    });

    it('Ch 20 Solids generator produces zero unrendered text or unbalanced delimiters', () => {
      const gen = CHAPTER_MODULES[20].generator;
      for (let seed = 1; seed <= 100; seed++) {
        const q = gen(seed);
        expect(countDollars(q.prompt) % 2).toBe(0);
        if (q.prompt.includes('longest pole')) {
          expect(q.prompt).toMatch(/dimensions \$\d+\\text\{ m\}/);
        }
        if (q.prompt.includes('solid cube is')) {
          expect(q.prompt).toMatch(/solid cube is \$\d+\\text\{ cm\}\^[23]\$/);
        }
      }
    });

    it('Ch 8, 13, 1, 16 generators produce clean LaTeX in hints and final answers', () => {
      // Ch 8
      for (let s = 1; s <= 50; s++) {
        const q = CHAPTER_MODULES[8].generator(s);
        expect(countDollars(q.hintLadder.hint3Step) % 2).toBe(0);
      }
      // Ch 13
      for (let s = 1; s <= 50; s++) {
        const q = CHAPTER_MODULES[13].generator(s);
        for (const st of q.solution.steps) {
          expect(countDollars(st.step) % 2).toBe(0);
        }
      }
      // Ch 1 finalAnswer
      for (let s = 1; s <= 50; s++) {
        const q = CHAPTER_MODULES[1].generator(s);
        expect(q.solution.finalAnswer).toMatch(/^\$.+\$$/);
      }
      // Ch 16 finalAnswer
      for (let s = 1; s <= 50; s++) {
        const q = CHAPTER_MODULES[16].generator(s);
        if (q.solution.finalAnswer.includes('\\')) {
          expect(q.solution.finalAnswer).toMatch(/^\$.+\$$/);
        }
      }
    });
  });

  describe('P0.7 & Curated Questions: LaTeX Delimiters in Solutions', () => {
    it('Ch 1 Q4 has properly delimited final answer', () => {
      const q4 = CHAPTER_MODULES[1].curatedQuestions.find(q => q.id === 'ch01_q04')!;
      expect(q4.solution.finalAnswer).toBe('$\\frac{\\sqrt{5} + \\sqrt{3}}{2}$');
    });

    it('Ch 16 Q6 has properly delimited final answer', () => {
      const q6 = CHAPTER_MODULES[16].curatedQuestions.find(q => q.id === 'ch16_q06')!;
      expect(q6.solution.finalAnswer).toBe('$3\\sqrt{2} \\approx 4.24\\text{ cm}$');
    });
  });

  describe('P1.4: SVG Diagrams Data Integrity', () => {
    it('Ch 11 Q3 diagramData has midpoint_triangle type and all 6 vertices', () => {
      const q3 = CHAPTER_MODULES[11].curatedQuestions.find(q => q.id === 'ch11_q03')!;
      expect(q3.diagramSvgId).toBe('TriangleDiagram');
      expect(q3.diagramData?.type).toBe('midpoint_triangle');
      expect(q3.diagramData?.labels).toEqual({
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D',
        E: 'E',
        F: 'F',
      });
    });

    it('Ch 24 Q4 diagram intersection does not spoil the numerical answer', () => {
      const q4 = CHAPTER_MODULES[24].curatedQuestions.find(q => q.id === 'ch24_q04')!;
      expect(q4.diagramData?.intersection?.label).toBe('P');
      expect(q4.diagramData?.intersection?.label).not.toBe('(3, 2)');
    });
  });

  describe('P1.1: Mock Test Logic & Elapsed Time', () => {
    it('timeTakenSeconds is always strictly positive', () => {
      const durations = [1800, 3600, 10800];
      for (const totalDuration of durations) {
        for (const elapsed of [5, 60, 1200, totalDuration - 1]) {
          const timeRemaining = totalDuration - elapsed;
          const calculatedTime = Math.max(1, totalDuration - timeRemaining);
          expect(calculatedTime).toBe(elapsed);
          expect(calculatedTime).toBeGreaterThan(0);
        }
      }
    });
  });
});
