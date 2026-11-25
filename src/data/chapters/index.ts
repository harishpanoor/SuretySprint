import { Chapter, Question } from '../../types/curriculum';
import { CHAPTER_METADATA } from '../syllabus';

// Import all 25 chapters
import { generateRationalSurdQuestion, curatedQuestionsCh01 } from './ch01-rational-irrational';
import { generateCompoundInterestBasicQuestion, curatedQuestionsCh02 } from './ch02-compound-interest-basic';
import { generateCompoundInterestFormulaQuestion, curatedQuestionsCh03 } from './ch03-compound-interest-formula';
import { generateExpansionsQuestion, curatedQuestionsCh04 } from './ch04-expansions';
import { generateFactorisationQuestion, curatedQuestionsCh05 } from './ch05-factorisation';
import { generateSimultaneousEqQuestion, curatedQuestionsCh06 } from './ch06-simultaneous-linear-equations';
import { generateIndicesQuestion, curatedQuestionsCh07 } from './ch07-indices';
import { generateLogarithmsQuestion, curatedQuestionsCh08 } from './ch08-logarithms';
import { generateTrianglesCongruencyQuestion, curatedQuestionsCh09 } from './ch09-triangles-congruency';
import { generateIsoscelesTrianglesQuestion, curatedQuestionsCh10 } from './ch10-isosceles-triangles';
import { generateMidpointTheoremQuestion, curatedQuestionsCh11 } from './ch11-midpoint-theorem';
import { generatePythagorasQuestion, curatedQuestionsCh12 } from './ch12-pythagoras-theorem';
import { generateRectilinearFiguresQuestion, curatedQuestionsCh13 } from './ch13-rectilinear-figures';
import { generateConstructionPolygonsQuestion, curatedQuestionsCh14 } from './ch14-construction-polygons';
import { generateAreaTheoremsQuestion, curatedQuestionsCh15 } from './ch15-area-theorems';
import { generateCircleQuestion, curatedQuestionsCh16 } from './ch16-circle';
import { generateStatisticsQuestion, curatedQuestionsCh17 } from './ch17-statistics';
import { generateMeanMedianQuestion, curatedQuestionsCh18 } from './ch18-mean-median';
import { generateAreaPerimeterQuestion, curatedQuestionsCh19 } from './ch19-area-perimeter';
import { generateSolidsQuestion, curatedQuestionsCh20 } from './ch20-solids';
import { generateTrigonometricalRatiosQuestion, curatedQuestionsCh21 } from './ch21-trigonometrical-ratios';
import { generateSolutionRightTrianglesQuestion, curatedQuestionsCh22 } from './ch22-solution-right-triangles';
import { generateCartesianPlaneQuestion, curatedQuestionsCh23 } from './ch23-cartesian-plane';
import { generateGraphicalSolutionQuestion, curatedQuestionsCh24 } from './ch24-graphical-solution';
import { generateDistanceFormulaQuestion, curatedQuestionsCh25 } from './ch25-distance-formula';

export interface ChapterModule {
  chapter: Chapter;
  curatedQuestions: Question[];
  generator: (seed?: number) => Question;
}

export const CHAPTER_MODULES: Record<number, ChapterModule> = {
  1: {
    chapter: CHAPTER_METADATA[1] as Chapter,
    curatedQuestions: curatedQuestionsCh01,
    generator: generateRationalSurdQuestion,
  },
  2: {
    chapter: CHAPTER_METADATA[2] as Chapter,
    curatedQuestions: curatedQuestionsCh02,
    generator: generateCompoundInterestBasicQuestion,
  },
  3: {
    chapter: CHAPTER_METADATA[3] as Chapter,
    curatedQuestions: curatedQuestionsCh03,
    generator: generateCompoundInterestFormulaQuestion,
  },
  4: {
    chapter: CHAPTER_METADATA[4] as Chapter,
    curatedQuestions: curatedQuestionsCh04,
    generator: generateExpansionsQuestion,
  },
  5: {
    chapter: CHAPTER_METADATA[5] as Chapter,
    curatedQuestions: curatedQuestionsCh05,
    generator: generateFactorisationQuestion,
  },
  6: {
    chapter: CHAPTER_METADATA[6] as Chapter,
    curatedQuestions: curatedQuestionsCh06,
    generator: generateSimultaneousEqQuestion,
  },
  7: {
    chapter: CHAPTER_METADATA[7] as Chapter,
    curatedQuestions: curatedQuestionsCh07,
    generator: generateIndicesQuestion,
  },
  8: {
    chapter: CHAPTER_METADATA[8] as Chapter,
    curatedQuestions: curatedQuestionsCh08,
    generator: generateLogarithmsQuestion,
  },
  9: {
    chapter: CHAPTER_METADATA[9] as Chapter,
    curatedQuestions: curatedQuestionsCh09,
    generator: generateTrianglesCongruencyQuestion,
  },
  10: {
    chapter: CHAPTER_METADATA[10] as Chapter,
    curatedQuestions: curatedQuestionsCh10,
    generator: generateIsoscelesTrianglesQuestion,
  },
  11: {
    chapter: CHAPTER_METADATA[11] as Chapter,
    curatedQuestions: curatedQuestionsCh11,
    generator: generateMidpointTheoremQuestion,
  },
  12: {
    chapter: CHAPTER_METADATA[12] as Chapter,
    curatedQuestions: curatedQuestionsCh12,
    generator: generatePythagorasQuestion,
  },
  13: {
    chapter: CHAPTER_METADATA[13] as Chapter,
    curatedQuestions: curatedQuestionsCh13,
    generator: generateRectilinearFiguresQuestion,
  },
  14: {
    chapter: CHAPTER_METADATA[14] as Chapter,
    curatedQuestions: curatedQuestionsCh14,
    generator: generateConstructionPolygonsQuestion,
  },
  15: {
    chapter: CHAPTER_METADATA[15] as Chapter,
    curatedQuestions: curatedQuestionsCh15,
    generator: generateAreaTheoremsQuestion,
  },
  16: {
    chapter: CHAPTER_METADATA[16] as Chapter,
    curatedQuestions: curatedQuestionsCh16,
    generator: generateCircleQuestion,
  },
  17: {
    chapter: CHAPTER_METADATA[17] as Chapter,
    curatedQuestions: curatedQuestionsCh17,
    generator: generateStatisticsQuestion,
  },
  18: {
    chapter: CHAPTER_METADATA[18] as Chapter,
    curatedQuestions: curatedQuestionsCh18,
    generator: generateMeanMedianQuestion,
  },
  19: {
    chapter: CHAPTER_METADATA[19] as Chapter,
    curatedQuestions: curatedQuestionsCh19,
    generator: generateAreaPerimeterQuestion,
  },
  20: {
    chapter: CHAPTER_METADATA[20] as Chapter,
    curatedQuestions: curatedQuestionsCh20,
    generator: generateSolidsQuestion,
  },
  21: {
    chapter: CHAPTER_METADATA[21] as Chapter,
    curatedQuestions: curatedQuestionsCh21,
    generator: generateTrigonometricalRatiosQuestion,
  },
  22: {
    chapter: CHAPTER_METADATA[22] as Chapter,
    curatedQuestions: curatedQuestionsCh22,
    generator: generateSolutionRightTrianglesQuestion,
  },
  23: {
    chapter: CHAPTER_METADATA[23] as Chapter,
    curatedQuestions: curatedQuestionsCh23,
    generator: generateCartesianPlaneQuestion,
  },
  24: {
    chapter: CHAPTER_METADATA[24] as Chapter,
    curatedQuestions: curatedQuestionsCh24,
    generator: generateGraphicalSolutionQuestion,
  },
  25: {
    chapter: CHAPTER_METADATA[25] as Chapter,
    curatedQuestions: curatedQuestionsCh25,
    generator: generateDistanceFormulaQuestion,
  },
};

export function getChapterModule(chapterId: number): ChapterModule {
  const mod = CHAPTER_MODULES[chapterId];
  if (!mod) {
    throw new Error(`Chapter ${chapterId} not found`);
  }
  return mod;
}

export function getAllChapters(): Chapter[] {
  return Object.values(CHAPTER_MODULES).map((m) => m.chapter);
}

export function getCuratedQuestions(chapterId: number): Question[] {
  return getChapterModule(chapterId).curatedQuestions;
}

export function generateQuestion(chapterId: number, seed?: number): Question {
  return getChapterModule(chapterId).generator(seed);
}
