export type Difficulty = 'Easy' | 'Standard' | 'Exam';

export type NEPTag = 'HOTS' | 'Life Skills' | 'Experiential Learning' | 'Subject Integration' | 'Brain Maths';

export type QuestionType =
  | 'mcq'
  | 'assertion_reason'
  | 'numerical'
  | 'expression'
  | 'multi_part'
  | 'proof';

export interface MCQOption {
  id: string; // e.g. 'A', 'B', 'C', 'D'
  text: string; // KaTeX supported
  explanation?: string;
}

export interface MultiSubPart {
  id: string; // e.g. 'i', 'ii', 'iii'
  partLabel: string; // e.g. '(i)'
  prompt: string;
  expectedAnswer: string;
  marks: number;
  tolerance?: number;
  acceptableAnswers?: string[];
  answerType?: 'numerical' | 'expression' | 'text';
}

export interface ProofStep {
  id: string;
  stepNumber: number;
  statement: string; // e.g. "AB = CD"
  reason: string; // e.g. "Given" or "Opposite sides of a parallelogram"
  availableReasonOptions?: string[]; // distractors for interactive selection
}

export interface HintLadderData {
  hint1Concept: string; // Concept clue: names theorem, identity, or approach
  hint2Formula: string; // Formula/setup: exact formula or starting equation
  hint3Step: string;    // Key next step: substitution or first simplification
}

export interface SolutionStep {
  step: string;
  markTag?: string; // e.g. "[1m]"
}

export interface WorkedSolution {
  steps: SolutionStep[];
  finalAnswer: string;
  commonMistake?: string; // "Common Mistake to Avoid"
}

export interface Question {
  id: string;
  chapterId: number; // 1 to 18
  unitId: number;    // 1 to 8
  title?: string;
  type: QuestionType;
  difficulty: Difficulty;
  marks: number; // 1 to 4
  prompt: string; // KaTeX enabled markdown/text
  diagramSvgId?: string; // ID of inline SVG component to render
  diagramData?: Record<string, any>;
  
  // Specific answer fields depending on type:
  mcqOptions?: MCQOption[];
  correctOptionId?: string; // for MCQ and Assertion-Reason
  
  expectedAnswer?: string; // for numerical / expression
  tolerance?: number;      // e.g. 0.02 for decimal rounding
  acceptableAnswers?: string[]; // alternative equivalent strings

  subParts?: MultiSubPart[]; // for multi_part questions
  
  proofSteps?: ProofStep[]; // for proof questions
  proofRubric?: string[];   // self-grading rubric points

  hintLadder: HintLadderData;
  solution: WorkedSolution;

  nepTags?: NEPTag[];
  section?: 'A' | 'B';
  groupNumber?: number;
  questionLabel?: string;

  isGenerated?: boolean;
  generatorId?: string;
  generatorSeed?: number;
}

export interface ChapterFormula {
  title: string;
  latex: string;
  description?: string;
}

export interface Chapter {
  id: number; // 1 to 25
  unitId: number; // 1 to 8
  slug: string;
  name: string;
  shortName: string;
  unitName: string;
  description: string;
  formulaSheet: {
    keyRules: string[];
    formulas: ChapterFormula[];
    examTips: string[];
  };
  hasProceduralGenerator: boolean;
}

export interface Unit {
  id: number;
  name: string;
  code: string;
  chapterIds: number[];
  color: string;
  iconName: string;
}

export interface UserAttempt {
  questionId: string;
  chapterId: number;
  timestamp: number;
  isCorrect: boolean;
  userAnswer: string;
  hintsRevealed: number; // 0, 1, 2, 3
  solutionRevealed: boolean;
  timeSpentSeconds: number;
}

export interface ChapterProgress {
  chapterId: number;
  attemptedCount: number;
  masteredCount: number;
  totalAvailable: number;
  lastPracticed?: number;
}

export interface MistakeItem {
  id: string; // unique mistake id or questionId
  question: Question;
  originalAnswer: string;
  firstFailedAt: number;
  lastAttemptedAt: number;
  retryCount: number;
  mastered: boolean;
}

export interface MockTestConfig {
  mode: 'chapter' | 'custom' | 'full_icse';
  chapterIds: number[];
  title: string;
  totalMarks: number;
  durationMinutes: number;
}

export interface MockTestResult {
  id: string;
  timestamp: number;
  mode: 'chapter' | 'custom' | 'full_icse';
  totalMarks: number;
  score: number;
  timeTakenSeconds: number;
  chapterScores: Record<number, { score: number; maxMarks: number; chapterName: string }>;
  answers: Record<string, { userAnswer: string; isCorrect: boolean; marksAwarded: number }>;
}
