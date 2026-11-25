import { ChapterProgress, MistakeItem, MockTestResult, Question, UserAttempt } from '../types/curriculum';

const STORAGE_KEYS = {
  SCHEMA_VERSION: 'icse9_schema_version',
  PROGRESS_PREFIX: 'icse9_progress_',
  ATTEMPTS: 'icse9_attempts',
  MISTAKES: 'icse9_mistakes',
  TEST_RESULTS: 'icse9_test_results',
  WORKING_NOTES_PREFIX: 'icse9_notes_',
};

const OLD_TO_NEW_CH_MAP: Record<number, number> = {
  1: 1,   // Rational & Irrational
  2: 2,   // CI Stage 1 (without formula)
  3: 4,   // Expansions -> Ch 4
  4: 5,   // Factorisation -> Ch 5
  5: 6,   // Simultaneous Eq -> Ch 6
  6: 7,   // Indices -> Ch 7
  7: 8,   // Logarithms -> Ch 8
  8: 9,   // Triangles Congruency -> Ch 9
  9: 11,  // Mid-point Th. -> Ch 11
  10: 12, // Pythagoras -> Ch 12
  11: 13, // Rectilinear Figures -> Ch 13
  12: 16, // Circles -> Ch 16
  13: 17, // Statistics -> Ch 17
  14: 19, // Area & Perimeter -> Ch 19
  15: 20, // Solids (Cube/Cuboid) -> Ch 20
  16: 21, // Trig Ratios -> Ch 21
  17: 23, // Coordinate Geometry -> Ch 23
  18: 25, // Distance Formula -> Ch 25
};

function migrateSchemaIfRequired() {
  if (typeof window === 'undefined') return;
  try {
    const version = localStorage.getItem(STORAGE_KEYS.SCHEMA_VERSION);
    if (!version || parseInt(version, 10) < 2) {
      // Migrate old chapter progress
      for (let oldId = 18; oldId >= 3; oldId--) {
        const oldData = localStorage.getItem(`${STORAGE_KEYS.PROGRESS_PREFIX}${oldId}`);
        const newId = OLD_TO_NEW_CH_MAP[oldId];
        if (oldData && newId && newId !== oldId) {
          try {
            const parsed = JSON.parse(oldData);
            parsed.chapterId = newId;
            localStorage.setItem(`${STORAGE_KEYS.PROGRESS_PREFIX}${newId}`, JSON.stringify(parsed));
          } catch {
            // ignore parse errors
          }
        }
      }

      // Migrate mistakes
      const mistakesStr = localStorage.getItem(STORAGE_KEYS.MISTAKES);
      if (mistakesStr) {
        try {
          const mistakes: MistakeItem[] = JSON.parse(mistakesStr);
          let changed = false;
          mistakes.forEach((m) => {
            if (m.question && OLD_TO_NEW_CH_MAP[m.question.chapterId]) {
              m.question.chapterId = OLD_TO_NEW_CH_MAP[m.question.chapterId];
              changed = true;
            }
          });
          if (changed) {
            localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
          }
        } catch {
          // ignore
        }
      }

      localStorage.setItem(STORAGE_KEYS.SCHEMA_VERSION, '2');
    }
  } catch (e) {
    console.error('Storage schema migration error', e);
  }
}

migrateSchemaIfRequired();

export const Storage = {
  // Chapter progress
  getProgress(chapterId: number): ChapterProgress {
    try {
      const data = localStorage.getItem(`${STORAGE_KEYS.PROGRESS_PREFIX}${chapterId}`);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Storage.getProgress error', e);
    }
    return {
      chapterId,
      attemptedCount: 0,
      masteredCount: 0,
      totalAvailable: 0
    };
  },

  getAllProgress(): Record<number, ChapterProgress> {
    const result: Record<number, ChapterProgress> = {};
    for (let i = 1; i <= 25; i++) {
      result[i] = this.getProgress(i);
    }
    return result;
  },

  saveProgress(chapterId: number, progress: ChapterProgress): void {
    try {
      localStorage.setItem(`${STORAGE_KEYS.PROGRESS_PREFIX}${chapterId}`, JSON.stringify(progress));
    } catch (e) {
      console.error('Storage.saveProgress error', e);
    }
  },

  recordAttempt(attempt: UserAttempt, question: Question): void {
    try {
      // 1. Append attempt log (keep last 500)
      const attemptsStr = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      const attempts: UserAttempt[] = attemptsStr ? JSON.parse(attemptsStr) : [];
      attempts.unshift(attempt);
      if (attempts.length > 500) attempts.length = 500;
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));

      // 2. Update chapter progress
      const progress = this.getProgress(attempt.chapterId);
      progress.attemptedCount += 1;
      progress.lastPracticed = attempt.timestamp;
      if (attempt.isCorrect && !attempt.solutionRevealed) {
        progress.masteredCount += 1;
      }
      this.saveProgress(attempt.chapterId, progress);

      // 3. Update Mistakes Bucket
      if (!attempt.isCorrect || attempt.solutionRevealed) {
        this.addMistake(question, attempt.userAnswer);
      } else {
        // If solved correctly without revealing solution on retry, mark mastered / remove
        this.resolveMistake(question.id);
      }
    } catch (e) {
      console.error('Storage.recordAttempt error', e);
    }
  },

  // Mistakes to Retry bucket
  getMistakes(): MistakeItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MISTAKES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addMistake(question: Question, userAnswer: string): void {
    try {
      const mistakes = this.getMistakes();
      const existingIdx = mistakes.findIndex(m => m.question.id === question.id);
      const now = Date.now();
      if (existingIdx >= 0) {
        mistakes[existingIdx].lastAttemptedAt = now;
        mistakes[existingIdx].retryCount += 1;
        mistakes[existingIdx].mastered = false;
        mistakes[existingIdx].originalAnswer = userAnswer;
      } else {
        mistakes.push({
          id: `mistake_${question.id}_${now}`,
          question,
          originalAnswer: userAnswer,
          firstFailedAt: now,
          lastAttemptedAt: now,
          retryCount: 1,
          mastered: false,
        });
      }
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('mistakesUpdated'));
    } catch (e) {
      console.error('Storage.addMistake error', e);
    }
  },

  resolveMistake(identifier: string): void {
    try {
      const mistakes = this.getMistakes();
      const item = mistakes.find(m => m.question.id === identifier || m.id === identifier);
      if (item) {
        item.mastered = true;
        localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
        if (typeof window !== 'undefined') window.dispatchEvent(new Event('mistakesUpdated'));
      }
    } catch (e) {
      console.error('Storage.resolveMistake error', e);
    }
  },

  removeMistake(id: string): void {
    try {
      const mistakes = this.getMistakes().filter(m => m.id !== id && m.question.id !== id);
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('mistakesUpdated'));
    } catch (e) {
      console.error('Storage.removeMistake error', e);
    }
  },

  clearMasteredMistakes(): void {
    try {
      const mistakes = this.getMistakes().filter(m => !m.mastered);
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('mistakesUpdated'));
    } catch (e) {
      console.error('Storage.clearMasteredMistakes error', e);
    }
  },

  // Test Results
  getTestResults(): MockTestResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveTestResult(result: MockTestResult): void {
    try {
      const results = this.getTestResults();
      results.unshift(result);
      if (results.length > 50) results.length = 50;
      localStorage.setItem(STORAGE_KEYS.TEST_RESULTS, JSON.stringify(results));
    } catch (e) {
      console.error('Storage.saveTestResult error', e);
    }
  },

  // Working Notes
  getWorkingNote(questionId: string): string {
    return localStorage.getItem(`${STORAGE_KEYS.WORKING_NOTES_PREFIX}${questionId}`) || '';
  },

  saveWorkingNote(questionId: string, text: string): void {
    localStorage.setItem(`${STORAGE_KEYS.WORKING_NOTES_PREFIX}${questionId}`, text);
  }
};
