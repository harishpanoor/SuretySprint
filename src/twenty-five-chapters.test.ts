import { describe, it, expect } from 'vitest';
import katex from 'katex';
import { CHAPTER_MODULES, getAllChapters } from './data/chapters';
import { UNITS } from './data/syllabus';
import { evaluateAnswer } from './engine/evaluator';

function verifyKaTeXCompiles(text: string) {
  if (!text) return;
  const matches = text.matchAll(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g);
  for (const m of matches) {
    const raw = m[0];
    const isBlock = raw.startsWith('$$');
    const math = isBlock ? raw.slice(2, -2) : raw.slice(1, -1);
    try {
      katex.renderToString(math.trim(), { displayMode: isBlock, throwOnError: true, strict: 'ignore' });
    } catch (e: any) {
      throw new Error(`KaTeX render error in segment "${raw}": ${e.message}`);
    }
  }
}

describe('Official CISCE 25-Chapter Syllabus Test Suite', () => {
  const chapters = getAllChapters();

  it('contains exactly 25 chapters spanning 8 units', () => {
    expect(chapters.length).toBe(25);
    expect(UNITS.length).toBe(8);

    const unitChapterIds = UNITS.flatMap((u) => u.chapterIds);
    expect(unitChapterIds.length).toBe(25);
    for (let id = 1; id <= 25; id++) {
      expect(CHAPTER_MODULES[id]).toBeDefined();
      expect(unitChapterIds).toContain(id);
    }
  });

  describe('Chapter Metadata & Formula Sheets Completeness', () => {
    chapters.forEach((ch) => {
      it(`Ch ${ch.id}: ${ch.shortName} has complete metadata and formula sheet`, () => {
        expect(ch.id).toBeGreaterThanOrEqual(1);
        expect(ch.id).toBeLessThanOrEqual(25);
        expect(ch.name).toBeTruthy();
        expect(ch.shortName).toBeTruthy();
        expect(ch.description).toBeTruthy();

        // Formula sheet
        expect(ch.formulaSheet).toBeDefined();
        expect(ch.formulaSheet.keyRules.length).toBeGreaterThanOrEqual(2);
        expect(ch.formulaSheet.formulas.length).toBeGreaterThanOrEqual(2);
        expect(ch.formulaSheet.examTips.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('Curated Questions Quality & ICSE Exam Format', () => {
    function countDollars(str: string): number {
      const matches = str.match(/(?<!\\)\$/g);
      return matches ? matches.length : 0;
    }

    chapters.forEach((ch) => {
      const mod = CHAPTER_MODULES[ch.id];
      it(`Ch ${ch.id}: ${ch.shortName} has 6-8 high-quality curated questions with 3-step hints`, () => {
        expect(mod.curatedQuestions.length).toBeGreaterThanOrEqual(6);
        expect(mod.curatedQuestions.length).toBeLessThanOrEqual(8);

        mod.curatedQuestions.forEach((q) => {
          expect(q.id).toBeTruthy();
          expect(q.chapterId).toBe(ch.id);
          expect(q.title).toBeTruthy();
          expect(q.prompt).toBeTruthy();
          expect(q.marks).toBeGreaterThanOrEqual(1);

          // KaTeX Compilation verification
          verifyKaTeXCompiles(q.prompt);
          verifyKaTeXCompiles(q.hintLadder.hint1Concept);
          verifyKaTeXCompiles(q.hintLadder.hint2Formula);
          verifyKaTeXCompiles(q.hintLadder.hint3Step);
          q.solution.steps.forEach((st) => verifyKaTeXCompiles(st.step));
          if (q.mcqOptions) {
            q.mcqOptions.forEach((opt) => verifyKaTeXCompiles(opt.text));
          }

          // Invariant: Delimiter balance in prompt
          expect(countDollars(q.prompt) % 2).toBe(0);

          // 3-step Hint Ladder
          expect(q.hintLadder).toBeDefined();
          expect(q.hintLadder.hint1Concept).toBeTruthy();
          expect(q.hintLadder.hint2Formula).toBeTruthy();
          expect(q.hintLadder.hint3Step).toBeTruthy();
          expect(countDollars(q.hintLadder.hint1Concept) % 2).toBe(0);
          expect(countDollars(q.hintLadder.hint2Formula) % 2).toBe(0);
          expect(countDollars(q.hintLadder.hint3Step) % 2).toBe(0);

          // Solution verification
          expect(q.solution).toBeDefined();
          expect(q.solution.steps.length).toBeGreaterThanOrEqual(1);
          expect(q.solution.finalAnswer).toBeTruthy();

          // MCQ options check
          if (q.type === 'mcq' || q.type === 'assertion_reason') {
            expect(q.mcqOptions).toBeDefined();
            expect(q.mcqOptions!.length).toBe(4);
            expect(q.correctOptionId).toMatch(/^[ABCD]$/);
            const optIds = q.mcqOptions!.map((o) => o.id);
            expect(optIds).toContain(q.correctOptionId);
          }

          // Multi-part check
          if (q.type === 'multi_part') {
            expect(q.subParts).toBeDefined();
            expect(q.subParts!.length).toBeGreaterThanOrEqual(2);
            q.subParts!.forEach((p) => {
              expect(p.id).toBeTruthy();
              expect(p.expectedAnswer).toBeTruthy();
            });
          }

          // Proof check
          if (q.type === 'proof') {
            expect(q.proofSteps).toBeDefined();
            expect(q.proofSteps!.length).toBeGreaterThanOrEqual(3);
          }
        });
      });
    });
  });

  describe('100-Seed Generator Stress Test Across All 25 Chapters', () => {
    function countDollars(str: string): number {
      const matches = str.match(/(?<!\\)\$/g);
      return matches ? matches.length : 0;
    }

    chapters.forEach((ch) => {
      const mod = CHAPTER_MODULES[ch.id];
      it(`Ch ${ch.id}: ${ch.shortName} generator runs 100 seeds without errors or NaN`, () => {
        for (let seed = 1; seed <= 100; seed++) {
          const q = mod.generator(seed);

          expect(q.id).toBeTruthy();
          expect(q.chapterId).toBe(ch.id);
          expect(q.prompt).toBeTruthy();
          expect(q.prompt).not.toContain('NaN');
          expect(q.prompt).not.toContain('Infinity');
          expect(q.prompt).not.toContain('undefined');

          // Delimiter balance
          expect(countDollars(q.prompt) % 2).toBe(0);
          expect(countDollars(q.hintLadder.hint1Concept) % 2).toBe(0);
          expect(countDollars(q.hintLadder.hint2Formula) % 2).toBe(0);
          expect(countDollars(q.hintLadder.hint3Step) % 2).toBe(0);

          // KaTeX compilation for generated question
          verifyKaTeXCompiles(q.prompt);
          verifyKaTeXCompiles(q.hintLadder.hint2Formula);
          verifyKaTeXCompiles(q.hintLadder.hint3Step);

          // Solution steps
          expect(q.solution.steps.length).toBeGreaterThanOrEqual(2);
          expect(q.solution.finalAnswer).toBeTruthy();

          // Self-evaluates correctly
          if (q.expectedAnswer) {
            const res = evaluateAnswer(q.expectedAnswer, q.expectedAnswer, {
              tolerance: q.tolerance ?? 0.05,
              acceptableAnswers: q.acceptableAnswers,
            });
            if (!res.isCorrect) {
              console.error(`Ch ${ch.id} seed ${seed} self-eval failure:`, {
                expected: q.expectedAnswer,
                acceptable: q.acceptableAnswers,
              });
            }
            expect(res.isCorrect).toBe(true);
          }
        }
      });
    });
  });
});
