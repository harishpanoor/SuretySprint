import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateMidpointTheoremQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const isGivenBase = rng.choice([true, false]);
  const deVal = rng.choice([4, 5, 6, 7, 8, 9, 11, 13]);
  const bcVal = deVal * 2;

  const prompt = isGivenBase
    ? `In $\\triangle ABC$, $D$ and $E$ are the mid-points of sides $AB$ and $AC$ respectively. If $BC = ${bcVal}\\text{ cm}$, calculate the length of the line segment $DE$ (in cm).`
    : `In $\\triangle ABC$, $D$ and $E$ are the mid-points of sides $AB$ and $AC$ respectively. If $DE = ${deVal}\\text{ cm}$, calculate the length of side $BC$ (in cm).`;

  const expectedAnswer = isGivenBase ? `${deVal}` : `${bcVal}`;

  return {
    id: `gen_ch11_${rng.int(10000, 99999)}`,
    chapterId: 11,
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
    generatorId: 'ch11',
    generatorSeed: seed,
  };
}

export const curatedQuestionsCh11: Question[] = [
  {
    id: 'ch11_q01',
    chapterId: 11,
    unitId: 4,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Mid-Point Theorem Statement Property',
    prompt: 'The line segment joining the mid-points of two sides of a triangle is:',
    mcqOptions: [
      { id: 'A', text: 'Parallel to the third side and equal to half of it', explanation: 'Correct: This is the fundamental statement of the Mid-Point Theorem.' },
      { id: 'B', text: 'Perpendicular to the third side and equal to it', explanation: 'Incorrect: It is parallel, not perpendicular.' },
      { id: 'C', text: 'Parallel to the third side and equal to twice of it', explanation: 'Incorrect: It is half, not twice.' },
      { id: 'D', text: 'Equal to one-third of the third side', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Recall the exact theorem: The segment joining midpoints of two sides of a triangle is parallel to the third side.',
      hint2Formula: '$DE \\parallel BC$ and $DE = \\frac{1}{2} BC$.',
      hint3Step: 'Hence option A is the correct statement.',
    },
    solution: {
      steps: [
        { step: 'By definition of the Mid-Point Theorem, the line segment joining the midpoints of two sides is parallel to the third side and half of it in length.', markTag: '[1m]' },
      ],
      finalAnswer: 'A: Parallel to the third side and equal to half of it',
      commonMistake: 'Confusing half with double.',
    },
  },
  {
    id: 'ch11_q02',
    chapterId: 11,
    unitId: 4,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Mid-Point Quadrilateral',
    prompt: '**Assertion (A)**: The quadrilateral formed by joining the mid-points of the sides of ANY quadrilateral (taken in order) is ALWAYS a parallelogram.\n\n**Reason (R)**: By drawing a diagonal, the opposite segments joining the mid-points of adjacent sides are each parallel to that diagonal and equal to half of it by the Mid-Point Theorem.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Join diagonal $AC$ of quadrilateral $ABCD$.',
      hint2Formula: 'In $\\triangle ABC$, $PQ = \\frac{1}{2}AC$ and $PQ \\parallel AC$. In $\\triangle ADC$, $SR = \\frac{1}{2}AC$ and $SR \\parallel AC$.',
      hint3Step: 'Hence $PQ = SR$ and $PQ \\parallel SR$. One pair of opposite sides is equal and parallel, so $PQRS$ is a parallelogram.',
    },
    solution: {
      steps: [
        { step: 'Join diagonal $AC$. In $\\triangle ABC$, $PQ = \\frac{1}{2}AC$ and $PQ \\parallel AC$. In $\\triangle ADC$, $SR = \\frac{1}{2}AC$ and $SR \\parallel AC$.', markTag: '[0.5m]' },
        { step: 'Thus $PQ \\parallel SR$ and $PQ = SR$. A quadrilateral with one pair of opposite sides equal and parallel is a parallelogram. Both A and R are True and R explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Believing the statement holds only for special quadrilaterals like rectangles or rhombuses.',
    },
  },
  {
    id: 'ch11_q03',
    chapterId: 11,
    unitId: 4,
    type: 'proof',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Proof: Converse of Mid-Point Theorem',
    prompt: 'In $\\triangle ABC$, $D$ is the mid-point of $AB$, and line segment $DE$ is drawn parallel to $BC$ meeting $AC$ at $E$. Prove that $E$ is the mid-point of $AC$ ($AE = EC$).',
    diagramSvgId: 'TriangleDiagram',
    diagramData: {
      type: 'midpoint_triangle',
      labels: {
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D',
        E: 'E',
        F: 'F',
      },
    },
    proofSteps: [
      {
        id: 'step1',
        stepNumber: 1,
        statement: 'Construct line through $C$ parallel to $AB$, meeting extended $DE$ at point $F$.',
        reason: 'Construction',
        availableReasonOptions: ['Construction', 'Given', 'Mid-point theorem', 'Angle sum'],
      },
      {
        id: 'step2',
        stepNumber: 2,
        statement: 'Quadrilateral $DBCF$ has $DF \\parallel BC$ and $CF \\parallel DB$, hence $DBCF$ is a parallelogram.',
        reason: 'Both pairs of opposite sides are parallel',
        availableReasonOptions: ['Both pairs of opposite sides are parallel', 'Opposite angles equal', 'Diagonals bisect', 'Adjacent angles supplementary'],
      },
      {
        id: 'step3',
        stepNumber: 3,
        statement: 'Therefore $CF = DB$. But $DB = AD$ (since $D$ is mid-point of $AB$), so $CF = AD$.',
        reason: 'Opposite sides of parallelogram are equal and D is mid-point',
        availableReasonOptions: ['Opposite sides of parallelogram are equal and D is mid-point', 'Given', 'Alternate angles', 'CPCTC'],
      },
      {
        id: 'step4',
        stepNumber: 4,
        statement: 'In $\\triangle ADE$ and $\\triangle CFE$: $\\angle EAD = \\angle ECF$ (alternate), $AD = CF$, and $\\angle ADE = \\angle CFE$ (alternate). So $\\triangle ADE \\cong \\triangle CFE$ by ASA.',
        reason: 'ASA Congruency Criterion',
        availableReasonOptions: ['ASA Congruency Criterion', 'SSS Criterion', 'RHS Criterion', 'SAS Criterion'],
      },
    ],
    proofRubric: [
      'Construction of parallel line $CF \\parallel AB$ [1m]',
      'Proved $DBCF$ is a parallelogram so $CF = AD$ [1m]',
      'Proved $\\triangle ADE \\cong \\triangle CFE$ by ASA [1m]',
      'Concluded $AE = EC$ by CPCTC so $E$ is mid-point of $AC$ [1m]',
    ],
    hintLadder: {
      hint1Concept: 'Extend $DE$ and draw $CF \\parallel BA$ to form parallelogram $DBCF$.',
      hint2Formula: 'Show $AD = CF$, then compare $\\triangle ADE$ and $\\triangle CFE$.',
      hint3Step: 'Triangles are congruent by ASA, hence $AE = EC$ by CPCTC.',
    },
    solution: {
      steps: [
        { step: 'Extend $DE$ to $F$ such that $CF \\parallel AB$. In quadrilateral $DBCF$, $DF \\parallel BC$ and $CF \\parallel DB$, so $DBCF$ is a parallelogram.', markTag: '[1m]' },
        { step: '$CF = DB = AD$ (since $D$ is mid-point of $AB$).', markTag: '[1m]' },
        { step: 'In $\\triangle ADE$ and $\\triangle CFE$: $\\angle DAE = \\angle FCE$ (alternate angles), $AD = CF$, $\\angle ADE = \\angle CFE$ (alternate angles). Thus $\\triangle ADE \\cong \\triangle CFE$ by ASA.', markTag: '[1m]' },
        { step: 'By CPCTC, $AE = EC$. Hence $E$ is the mid-point of $AC$.', markTag: '[1m]' },
      ],
      finalAnswer: 'Proven: $E$ is the mid-point of $AC$',
      commonMistake: 'Assuming $E$ is the mid-point at the beginning without proof.',
    },
  },
  {
    id: 'ch11_q04',
    chapterId: 11,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Segment in Trapezium Using Mid-Points',
    prompt: 'In a trapezium $ABCD$, $AB \\parallel DC$. $E$ and $F$ are the mid-points of the non-parallel sides $AD$ and $BC$ respectively. If $AB = 14\\text{ cm}$ and $DC = 8\\text{ cm}$, calculate the length of $EF$ (in cm).',
    expectedAnswer: '11',
    hintLadder: {
      hint1Concept: 'The line joining mid-points of non-parallel sides of a trapezium equals half the sum of parallel sides.',
      hint2Formula: '$EF = \\frac{1}{2}(AB + DC)$.',
      hint3Step: '$EF = \\frac{1}{2}(14 + 8) = \\frac{22}{2} = 11\\text{ cm}$.',
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
    id: 'ch11_q05',
    chapterId: 11,
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
    id: 'ch11_q06',
    chapterId: 11,
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
