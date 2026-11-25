import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateMidpointTheoremQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  // Direct Midpoint calculation:
  // In triangle ABC, D and E are midpoints of AB and AC.
  // Given BC = 2k, find DE = k (or vice versa).
  const isGivenBase = rng.choice([true, false]);
  const deVal = rng.choice([4, 5, 6, 7, 8, 9, 11, 13]);
  const bcVal = deVal * 2;

  const prompt = isGivenBase
    ? `In $\\triangle ABC$, $D$ and $E$ are the mid-points of sides $AB$ and $AC$ respectively. If $BC = ${bcVal}\\text{ cm}$, calculate the length of the line segment $DE$ (in cm).`
    : `In $\\triangle ABC$, $D$ and $E$ are the mid-points of sides $AB$ and $AC$ respectively. If $DE = ${deVal}\\text{ cm}$, calculate the length of side $BC$ (in cm).`;

  const expectedAnswer = isGivenBase ? `${deVal}` : `${bcVal}`;

  return {
    id: `gen_ch09_${rng.int(10000, 99999)}`,
    chapterId: 9,
    unitId: 4,
    title: 'Mid-Point Theorem Length Relation',
    type: 'numerical',
    difficulty: 'Easy',
    marks: 2,
    prompt,
    expectedAnswer,
    diagramSvgId: 'TriangleDiagram',
    diagramData: {
      type: 'midpoint',
      labels: { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E' },
      sideLabels: isGivenBase ? { BC: `${bcVal} cm` } : { DE: `${deVal} cm` },
    },
    hintLadder: {
      hint1Concept: 'Apply the Mid-Point Theorem of triangles.',
      hint2Formula: 'The line segment joining the mid-points of two sides of a triangle is parallel to the third side and half of it: $DE = \\frac{1}{2} BC$.',
      hint3Step: isGivenBase
        ? `$DE = \\frac{1}{2} \\times ${bcVal} = ${deVal}\\text{ cm}$.`
        : `$BC = 2 \\times DE = 2 \\times ${deVal} = ${bcVal}\\text{ cm}$.`,
    },
    solution: {
      steps: [
        { step: 'By the Mid-Point Theorem: the segment joining mid-points $D$ and $E$ of sides $AB$ and $AC$ satisfies $DE = \\frac{1}{2} BC$ and $DE \\parallel BC$.', markTag: '[1m]' },
        { step: isGivenBase ? `$DE = \\frac{1}{2} (${bcVal}) = ${deVal}\\text{ cm}$.` : `$BC = 2 \\times DE = 2(${deVal}) = ${bcVal}\\text{ cm}$.`, markTag: '[1m]' },
      ],
      finalAnswer: `${expectedAnswer} cm`,
      commonMistake: isGivenBase
        ? 'Doubling instead of halving, or forgetting the factor of 1/2.'
        : 'Halving instead of doubling.',
    },
    isGenerated: true,
    generatorId: 'ch09',
    generatorSeed: seed,
  };
}

export const curatedQuestionsCh09: Question[] = [
  {
    id: 'ch09_q01',
    chapterId: 9,
    unitId: 4,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Mid-Point Quadrilateral Property',
    prompt: 'The figure formed by joining the mid-points of the consecutive sides of **any quadrilateral** is always a:',
    mcqOptions: [
      { id: 'A', text: 'Parallelogram', explanation: 'Correct (Varignon’s theorem): Diagonals divide quadrilateral into triangles; opposite pairs of mid-segments are parallel and equal to half the diagonals.' },
      { id: 'B', text: 'Rectangle', explanation: 'Incorrect: only true if diagonals of the original quadrilateral are perpendicular.' },
      { id: 'C', text: 'Rhombus', explanation: 'Incorrect: only true if diagonals of the original quadrilateral are equal in length.' },
      { id: 'D', text: 'Trapezium', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Draw a diagonal of the quadrilateral to divide it into two triangles.',
      hint2Formula: 'Apply the Mid-Point Theorem in both triangles with the common diagonal as base.',
      hint3Step: 'Each opposite pair of segments is parallel to the diagonal and half its length, proving it is a parallelogram.',
    },
    solution: {
      steps: [
        { step: 'Let diagonal $AC$ divide quadrilateral $ABCD$ into $\\triangle ABC$ and $\\triangle ADC$.', markTag: '[0.5m]' },
        { step: 'By Mid-Point Theorem, $PQ = \\frac{1}{2}AC$ and $PQ \\parallel AC$; also $SR = \\frac{1}{2}AC$ and $SR \\parallel AC$. Thus $PQ = SR$ and $PQ \\parallel SR$. One pair of opposite sides equal and parallel implies a parallelogram.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Parallelogram',
      commonMistake: 'Guessing rectangle or square without checking if diagonals are perpendicular or equal.',
    },
  },
  {
    id: 'ch09_q02',
    chapterId: 9,
    unitId: 4,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Converse of Mid-Point Theorem',
    prompt: '**Assertion (A)**: The line drawn through the mid-point of one side of a triangle parallel to another side bisects the third side.\n\n**Reason (R)**: If three parallel lines make equal intercepts on one transversal, they make equal intercepts on any other transversal.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Assertion is the formal statement of the Converse of the Mid-Point Theorem.',
      hint2Formula: 'Reason is the Equal-Intercept Theorem.',
      hint3Step: 'The Converse of Mid-Point Theorem is directly proven using the Equal-Intercept Theorem by drawing a parallel line through the vertex.',
    },
    solution: {
      steps: [
        { step: 'Assertion (A) is the exact statement of the Converse of Mid-Point Theorem: True.', markTag: '[0.5m]' },
        { step: 'Reason (R) is the Equal-Intercept Theorem, which is the foundational geometric theorem used to establish A: True and explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Failing to recognize that Equal-Intercept theorem proves the converse of mid-point theorem.',
    },
  },
  {
    id: 'ch09_q03',
    chapterId: 9,
    unitId: 4,
    type: 'proof',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Proof: Perimeter of Mid-Point Triangle',
    prompt: 'In $\\triangle ABC$, points $D, E, F$ are the mid-points of sides $BC, CA, AB$ respectively. Complete the proof that the perimeter of $\\triangle DEF$ is exactly half the perimeter of $\\triangle ABC$.',
    diagramSvgId: 'TriangleDiagram',
    diagramData: {
      type: 'midpoint_triangle',
      labels: { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F' },
    },
    proofSteps: [
      {
        id: 'step1',
        stepNumber: 1,
        statement: 'In $\\triangle ABC$, $D$ and $E$ are mid-points of $BC$ and $CA$',
        reason: 'Given in hypothesis',
        availableReasonOptions: ['Given in hypothesis', 'Angle bisector property', 'Pythagoras theorem', 'Parallel postulate'],
      },
      {
        id: 'step2',
        stepNumber: 2,
        statement: 'Therefore, $DE = \\frac{1}{2} AB$',
        reason: 'Mid-Point Theorem',
        availableReasonOptions: ['Mid-Point Theorem', 'Equal-Intercept theorem', 'SAS congruency', 'Converse of Mid-Point theorem'],
      },
      {
        id: 'step3',
        stepNumber: 3,
        statement: 'Similarly, $EF = \\frac{1}{2} BC$ and $FD = \\frac{1}{2} CA$',
        reason: 'Mid-Point Theorem applied to respective sides',
        availableReasonOptions: ['Mid-Point Theorem applied to respective sides', 'Common sides', 'CPCTC', 'Angle sum property'],
      },
      {
        id: 'step4',
        stepNumber: 4,
        statement: 'Perimeter($\\triangle DEF$) $= DE + EF + FD = \\frac{1}{2}(AB + BC + CA) = \\frac{1}{2} \\times$ Perimeter($\\triangle ABC$)',
        reason: 'Adding corresponding sides',
        availableReasonOptions: ['Adding corresponding sides', 'By definition of median', 'By SSS', 'By RHS'],
      },
    ],
    proofRubric: [
      'Stated $DE = \\frac{1}{2} AB$ by Mid-Point Theorem [1m]',
      'Stated $EF = \\frac{1}{2} BC$ and $FD = \\frac{1}{2} CA$ [1m]',
      'Added the three sides of $\\triangle DEF$ [1m]',
      'Factored out $\\frac{1}{2}$ to conclude relation [1m]',
    ],
    hintLadder: {
      hint1Concept: 'Apply the Mid-Point Theorem three times, once for each pair of midpoints.',
      hint2Formula: '$DE = \\frac{1}{2}AB$, $EF = \\frac{1}{2}BC$, and $FD = \\frac{1}{2}CA$.',
      hint3Step: 'Sum the three equations to find the perimeter of $\\triangle DEF$.',
    },
    solution: {
      steps: [
        { step: 'By Mid-Point Theorem, $DE = \\frac{1}{2}AB$.', markTag: '[1m]' },
        { step: 'Similarly, $EF = \\frac{1}{2}BC$ and $FD = \\frac{1}{2}CA$.', markTag: '[1m]' },
        { step: 'Adding all three equations: $DE + EF + FD = \\frac{1}{2}(AB + BC + CA)$.', markTag: '[1m]' },
        { step: 'Hence, $\\text{Perimeter}(\\triangle DEF) = \\frac{1}{2} \\times \\text{Perimeter}(\\triangle ABC)$.', markTag: '[1m]' },
      ],
      finalAnswer: 'Proven: Perimeter(DEF) = 1/2 Perimeter(ABC)',
      commonMistake: 'Confusing perimeter relation (ratio 1/2) with area relation (ratio 1/4).',
    },
  },
  {
    id: 'ch09_q04',
    chapterId: 9,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Mid-Point in Trapezium',
    prompt: 'In a trapezium $ABCD$, $AB \\parallel DC$. $E$ and $F$ are the mid-points of non-parallel sides $AD$ and $BC$ respectively. If $AB = 14\\text{ cm}$ and $DC = 8\\text{ cm}$, calculate the length of $EF$ (in cm).',
    expectedAnswer: '11',
    hintLadder: {
      hint1Concept: 'Draw a diagonal $AC$ intersecting $EF$ at point $G$.',
      hint2Formula: 'In $\\triangle ADC$, $EG = \\frac{1}{2}DC$. In $\\triangle ABC$, $GF = \\frac{1}{2}AB$.',
      hint3Step: '$EF = EG + GF = \\frac{1}{2}(DC + AB) = \\frac{1}{2}(8 + 14) = 11\\text{ cm}$.',
    },
    solution: {
      steps: [
        { step: 'Join diagonal $AC$, meeting $EF$ at point $G$.', markTag: '[1m]' },
        { step: 'In $\\triangle ADC$, $E$ is mid-point of $AD$ and $EG \\parallel DC$, so by converse of Mid-Point Theorem, $G$ is mid-point of $AC$ and $EG = \\frac{1}{2}DC = \\frac{8}{2} = 4\\text{ cm}$.', markTag: '[1m]' },
        { step: 'In $\\triangle CAB$, $G$ and $F$ are mid-points, so $GF = \\frac{1}{2}AB = \\frac{14}{2} = 7\\text{ cm}$. Total $EF = 4 + 7 = 11\\text{ cm}$.', markTag: '[1m]' },
      ],
      finalAnswer: '11 cm',
      commonMistake: 'Subtracting the two parallel sides instead of adding them.',
    },
  },
  {
    id: 'ch09_q05',
    chapterId: 9,
    unitId: 4,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Equal-Intercept Theorem on Transversals',
    prompt: 'Three parallel lines $l, m, n$ are intersected by transversal $t_1$ at points $A, B, C$ such that $AB = BC = 5\\text{ cm}$. Another transversal $t_2$ cuts them at $P, Q, R$.\n\n**(i)** If $PQ = 6.4\\text{ cm}$, find the length of $QR$ (in cm).\n**(ii)** Find the total length of $PR$ (in cm).',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Length of QR (cm):',
        expectedAnswer: '6.4',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Total length of PR (cm):',
        expectedAnswer: '12.8',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Apply the Equal-Intercept Theorem.',
      hint2Formula: 'If parallel lines cut off equal intercepts on one transversal, they cut off equal intercepts on any other transversal.',
      hint3Step: 'Since $AB = BC$, we must have $PQ = QR = 6.4\\text{ cm}$. Then $PR = 6.4 + 6.4 = 12.8\\text{ cm}$.',
    },
    solution: {
      steps: [
        { step: 'Given $l \\parallel m \\parallel n$ and $AB = BC$. By Equal-Intercept Theorem, any transversal is divided into equal intercepts.', markTag: '[1m]' },
        { step: 'Part (i): Therefore $QR = PQ = 6.4\\text{ cm}$.', markTag: '[1m]' },
        { step: 'Part (ii): $PR = PQ + QR = 6.4 + 6.4 = 12.8\\text{ cm}$.', markTag: '[2m]' },
      ],
      finalAnswer: '(i) 6.4 cm, (ii) 12.8 cm',
      commonMistake: 'Thinking that $PQ$ must equal $AB = 5\\text{ cm}$ (the intercepts are equal to each other on the SAME transversal, not across different transversals).',
    },
  },
  {
    id: 'ch09_q06',
    chapterId: 9,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Perimeter of Mid-Point Triangle Calculation',
    prompt: 'In $\\triangle ABC$, the sides are $AB = 12\\text{ cm}, BC = 16\\text{ cm}$, and $AC = 20\\text{ cm}$. If $P, Q, R$ are the mid-points of $AB, BC, CA$ respectively, calculate the perimeter of $\\triangle PQR$ (in cm).',
    expectedAnswer: '24',
    hintLadder: {
      hint1Concept: 'Each side of the mid-point triangle is half the corresponding side of the original triangle.',
      hint2Formula: '$PQ = 10\\text{ cm}, QR = 6\\text{ cm}, RP = 8\\text{ cm}$.',
      hint3Step: 'Perimeter $= 10 + 6 + 8 = 24\\text{ cm}$ (or $\\frac{12 + 16 + 20}{2} = \\frac{48}{2} = 24$).',
    },
    solution: {
      steps: [
        { step: 'Perimeter of $\\triangle ABC = 12 + 16 + 20 = 48\\text{ cm}$.', markTag: '[1m]' },
        { step: 'By Mid-Point Theorem, each side of $\\triangle PQR$ is half the parallel side of $\\triangle ABC$.', markTag: '[1m]' },
        { step: 'Perimeter of $\\triangle PQR = \\frac{1}{2} \\times \\text{Perimeter}(\\triangle ABC) = \\frac{48}{2} = 24\\text{ cm}$.', markTag: '[1m]' },
      ],
      finalAnswer: '24 cm',
      commonMistake: 'Dividing by 4 instead of 2.',
    },
  },
];
