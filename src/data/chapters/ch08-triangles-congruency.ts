import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateTrianglesCongruencyQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Isosceles angle chasing:
    // In isosceles triangle ABC, AB = AC. If angle A = verticalAngle, find angle B and C.
    const verticalAngle = rng.choice([30, 40, 50, 70, 80, 100]);
    const baseAngle = (180 - verticalAngle) / 2;

    const prompt = `In an isosceles $\\triangle ABC$, the sides $AB = AC$. If the vertical angle $\\angle A = ${verticalAngle}^\\circ$, calculate the measure of the base angle $\\angle B$ (in degrees).`;

    return {
      id: `gen_ch08_${rng.int(10000, 99999)}`,
      chapterId: 8,
      unitId: 4,
      title: 'Isosceles Triangle Base Angle Calculation',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${baseAngle}`,
      diagramSvgId: 'TriangleDiagram',
      diagramData: {
        type: 'isosceles',
        labels: { A: 'A', B: 'B', C: 'C' },
        angleLabels: { A: `${verticalAngle}°` },
      },
      hintLadder: {
        hint1Concept: 'In an isosceles triangle, angles opposite to equal sides are equal.',
        hint2Formula: 'Since $AB = AC$, $\\angle B = \\angle C$. Also, $\\angle A + \\angle B + \\angle C = 180^\\circ$.',
        hint3Step: `$${verticalAngle}^\\circ + 2\\angle B = 180^\\circ \\implies 2\\angle B = 180^\\circ - ${verticalAngle}^\\circ$.`,
      },
      solution: {
        steps: [
          { step: `In $\\triangle ABC$, $AB = AC \\implies \\angle B = \\angle C$ (angles opposite to equal sides).`, markTag: '[1m]' },
          { step: `By angle sum property: $\\angle A + \\angle B + \\angle C = 180^\\circ \\implies ${verticalAngle}^\\circ + 2\\angle B = 180^\\circ$.`, markTag: '[0.5m]' },
          { step: `$2\\angle B = ${180 - verticalAngle}^\\circ \\implies \\angle B = ${baseAngle}^\\circ$.`, markTag: '[0.5m]' },
        ],
        finalAnswer: `${baseAngle}°`,
        commonMistake: 'Forgetting to divide by 2 after subtracting from 180°.',
      },
      isGenerated: true,
      generatorId: 'ch08',
      generatorSeed: seed,
    };
  } else {
    // Exterior angle property with isosceles:
    // Exterior angle at C is extAngle. If AB = AC, find angle A.
    const baseAngle = rng.choice([35, 45, 55, 65, 75]);
    const extAngle = 180 - baseAngle;
    const verticalAngle = 180 - 2 * baseAngle;

    const prompt = `In $\\triangle ABC$, side $BC$ is produced to $D$ such that exterior angle $\\angle ACD = ${extAngle}^\\circ$. If $AB = AC$, calculate the vertex angle $\\angle A$ (in degrees).`;

    return {
      id: `gen_ch08_${rng.int(10000, 99999)}`,
      chapterId: 8,
      unitId: 4,
      title: 'Exterior Angle and Isosceles Vertex Angle',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `${verticalAngle}`,
      diagramSvgId: 'TriangleDiagram',
      diagramData: {
        type: 'isosceles',
        labels: { A: 'A', B: 'B', C: 'C' },
        angleLabels: { C: `${baseAngle}°` },
      },
      hintLadder: {
        hint1Concept: 'Find the interior angle $\\angle ACB$ on the linear pair first.',
        hint2Formula: '$\\angle ACB = 180^\\circ - \\angle ACD = 180^\\circ - ' + extAngle + '^\\circ = ' + baseAngle + '^\\circ$.',
        hint3Step: 'Since $AB = AC$, $\\angle B = \\angle ACB = ' + baseAngle + '^\\circ$. Then $\\angle A = 180^\\circ - 2(' + baseAngle + '^\\circ)$.',
      },
      solution: {
        steps: [
          { step: `Linear pair: $\\angle ACB = 180^\\circ - ${extAngle}^\\circ = ${baseAngle}^\\circ$.`, markTag: '[1m]' },
          { step: `Since $AB = AC$, $\\angle B = \\angle ACB = ${baseAngle}^\\circ$.`, markTag: '[1m]' },
          { step: `By angle sum property: $\\angle A = 180^\\circ - (\\angle B + \\angle ACB) = 180^\\circ - 2(${baseAngle}^\\circ) = ${verticalAngle}^\\circ$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${verticalAngle}°`,
        commonMistake: 'Confusing exterior angle with the interior angle directly.',
      },
      isGenerated: true,
      generatorId: 'ch08',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh08: Question[] = [
  {
    id: 'ch08_q01',
    chapterId: 8,
    unitId: 4,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Valid Criteria for Congruency',
    prompt: 'Which of the following is **NOT** a valid criterion for the congruency of two triangles?',
    mcqOptions: [
      { id: 'A', text: 'AAA (Angle-Angle-Angle)', explanation: 'Correct: AAA guarantees similarity (same shape), but not congruency (same size).' },
      { id: 'B', text: 'SAS (Side-Angle-Side)', explanation: 'Valid congruence criterion (angle must be included).' },
      { id: 'C', text: 'RHS (Right-angle, Hypotenuse, Side)', explanation: 'Valid criterion for right-angled triangles.' },
      { id: 'D', text: 'AAS (Angle-Angle-Side)', explanation: 'Valid criterion.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Recall which criteria guarantee that triangles are identical in size and shape.',
      hint2Formula: 'Two triangles can have identical angles of 60°, 60°, 60° but have completely different sizes (e.g. side 2 vs side 10).',
      hint3Step: 'AAA implies similarity, not congruence.',
    },
    solution: {
      steps: [
        { step: 'Congruence requires equal corresponding sides. Two equilateral triangles with angles $60^\\circ, 60^\\circ, 60^\\circ$ can have different side lengths.', markTag: '[0.5m]' },
        { step: 'Hence AAA proves similarity, but NOT congruency. Criteria SSS, SAS, ASA, AAS, and RHS are valid.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: AAA (Angle-Angle-Angle)',
      commonMistake: 'Confusing AAS with AAA.',
    },
  },
  {
    id: 'ch08_q02',
    chapterId: 8,
    unitId: 4,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Bisector of Vertical Angle in Isosceles',
    prompt: '**Assertion (A)**: The bisector of the vertical angle of an isosceles triangle is perpendicular to the base and bisects the base.\n\n**Reason (R)**: The two sub-triangles formed by the angle bisector are congruent by the SAS congruency criterion.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Let $AD$ be the bisector of $\\angle A$ in $\\triangle ABC$ where $AB = AC$.',
      hint2Formula: 'In $\\triangle ABD$ and $\\triangle ACD$: $AB = AC$, $\\angle BAD = \\angle CAD$, and $AD = AD$ (common).',
      hint3Step: 'Therefore $\\triangle ABD \\cong \\triangle ACD$ by SAS. Then $BD = CD$ and $\\angle ADB = \\angle ADC = 90^\\circ$.',
    },
    solution: {
      steps: [
        { step: 'In $\\triangle ABD$ and $\\triangle ACD$: $AB = AC$ (given), $\\angle BAD = \\angle CAD$ ($AD$ bisects $\\angle A$), $AD = AD$ (common). By SAS, $\\triangle ABD \\cong \\triangle ACD$. Reason is True.', markTag: '[0.5m]' },
        { step: 'By CPCTC, $BD = CD$ and $\\angle ADB = \\angle ADC$. Since they form a linear pair, each is $90^\\circ$. Assertion is True and correctly explained by R.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Claiming SSS before knowing that $BD = CD$.',
    },
  },
  {
    id: 'ch08_q03',
    chapterId: 8,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Easy',
    marks: 2,
    title: 'Angle Chasing in Isosceles Right Triangle',
    prompt: 'In a right-angled triangle $ABC$, right-angled at $B$, the two legs are equal ($AB = BC$). What is the measure of $\\angle A$ in degrees?',
    expectedAnswer: '45',
    diagramSvgId: 'RightTriangleDiagram',
    diagramData: {
      vertexA: 'A',
      vertexB: 'B',
      vertexC: 'C',
      baseLabel: 'BC',
      altitudeLabel: 'AB',
    },
    hintLadder: {
      hint1Concept: 'An isosceles right triangle has two equal acute angles.',
      hint2Formula: '$\\angle B = 90^\\circ$ and $\\angle A + \\angle C = 90^\\circ$.',
      hint3Step: 'Since $AB = BC$, $\\angle A = \\angle C$. So $2\\angle A = 90^\\circ \\implies \\angle A = 45^\\circ$.',
    },
    solution: {
      steps: [
        { step: 'In $\\triangle ABC$, $\\angle B = 90^\\circ$. Therefore $\\angle A + \\angle C = 180^\\circ - 90^\\circ = 90^\\circ$.', markTag: '[1m]' },
        { step: 'Since $AB = BC$, the angles opposite are equal: $\\angle A = \\angle C$. Thus $2\\angle A = 90^\\circ \\implies \\angle A = 45^\\circ$.', markTag: '[1m]' },
      ],
      finalAnswer: '45°',
      commonMistake: 'Dividing 180 by 3 thinking it is an equilateral triangle.',
    },
  },
  {
    id: 'ch08_q04',
    chapterId: 8,
    unitId: 4,
    type: 'proof',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Proof: Congruence in Parallelogram Diagonals',
    prompt: 'In the figure, $ABCD$ is a quadrilateral where opposite sides are equal ($AB = CD$ and $AD = BC$). Prove that $\\triangle ABC \\cong \\triangle CDA$ by completing the statements and reasons.',
    diagramSvgId: 'ParallelogramDiagram',
    proofSteps: [
      {
        id: 'step1',
        stepNumber: 1,
        statement: 'In $\\triangle ABC$ and $\\triangle CDA$, side $AB = CD$',
        reason: 'Given in hypothesis',
        availableReasonOptions: ['Given in hypothesis', 'Common side', 'Vertically opposite angles', 'Linear pair'],
      },
      {
        id: 'step2',
        stepNumber: 2,
        statement: 'Side $BC = DA$',
        reason: 'Given in hypothesis',
        availableReasonOptions: ['Given in hypothesis', 'Alternate angles', 'Opposite angles', 'Corresponding side'],
      },
      {
        id: 'step3',
        stepNumber: 3,
        statement: 'Side $AC = CA$',
        reason: 'Common side to both triangles',
        availableReasonOptions: ['Common side to both triangles', 'Given', 'Midpoint property', 'Parallel lines'],
      },
      {
        id: 'step4',
        stepNumber: 4,
        statement: 'Therefore, $\\triangle ABC \\cong \\triangle CDA$',
        reason: 'SSS Congruency Criterion',
        availableReasonOptions: ['SSS Congruency Criterion', 'SAS Criterion', 'RHS Criterion', 'AAS Criterion'],
      },
    ],
    proofRubric: [
      'Stated $AB = CD$ with reason "Given" [1m]',
      'Stated $BC = DA$ with reason "Given" [1m]',
      'Stated $AC = CA$ with reason "Common side" [1m]',
      'Concluded $\\triangle ABC \\cong \\triangle CDA$ by SSS criterion [1m]',
    ],
    hintLadder: {
      hint1Concept: 'Look at the three pairs of corresponding sides for triangles $ABC$ and $CDA$.',
      hint2Formula: 'Two pairs of sides are given equal, and diagonal $AC$ is shared.',
      hint3Step: 'Since all 3 pairs of corresponding sides are equal, apply SSS.',
    },
    solution: {
      steps: [
        { step: '$AB = CD$ (Given)', markTag: '[1m]' },
        { step: '$BC = DA$ (Given)', markTag: '[1m]' },
        { step: '$AC = CA$ (Common side)', markTag: '[1m]' },
        { step: '$\\triangle ABC \\cong \\triangle CDA$ by SSS Congruency Criterion.', markTag: '[1m]' },
      ],
      finalAnswer: 'Proven: $\\triangle ABC \\cong \\triangle CDA$ by SSS',
      commonMistake: 'Stating SAS when no angle equality was given or proven.',
    },
  },
  {
    id: 'ch08_q05',
    chapterId: 8,
    unitId: 4,
    type: 'multi_part',
    difficulty: 'Standard',
    marks: 3,
    title: 'ICSE Multi-Part: Triangle Inequality Verification',
    prompt: 'Check whether a triangle can have the following side lengths:\n\n**(i)** $6\\text{ cm}, 8\\text{ cm}, 15\\text{ cm}$ (Enter \`Yes\` or \`No\`)\n**(ii)** $7\\text{ cm}, 24\\text{ cm}, 25\\text{ cm}$ (Enter \`Yes\` or \`No\`)',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Can 6, 8, 15 form a triangle?',
        expectedAnswer: 'No',
        acceptableAnswers: ['no', 'No', 'NO'],
        marks: 1.5,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Can 7, 24, 25 form a triangle?',
        expectedAnswer: 'Yes',
        acceptableAnswers: ['yes', 'Yes', 'YES'],
        marks: 1.5,
      },
    ],
    hintLadder: {
      hint1Concept: 'Triangle Inequality Theorem: The sum of any two sides must be strictly greater than the third side.',
      hint2Formula: '$a + b > c$ for all combinations (check sum of two smaller sides against the largest side).',
      hint3Step: 'Part (i): $6 + 8 = 14 < 15$ (Violated). Part (ii): $7 + 24 = 31 > 25$ (Valid).',
    },
    solution: {
      steps: [
        { step: 'Part (i): Sum of two smaller sides is $6 + 8 = 14\\text{ cm}$, which is less than the third side $15\\text{ cm}$. No triangle can be formed.', markTag: '[1.5m]' },
        { step: 'Part (ii): $7 + 24 = 31 > 25$, $7 + 25 > 24$, $24 + 25 > 7$. All inequalities hold, so a triangle is formed.', markTag: '[1.5m]' },
      ],
      finalAnswer: '(i) No, (ii) Yes',
      commonMistake: 'Thinking that $6+8=14$ is close enough to 15 to form a degenerate triangle.',
    },
  },
  {
    id: 'ch08_q06',
    chapterId: 8,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Angle Bisector and Parallel Line Property',
    prompt: 'In $\\triangle ABC$, the bisector of $\\angle B$ meets $AC$ at $D$. A line through $D$ parallel to $AB$ meets $BC$ at $E$. If $\\angle B = 70^\\circ$ and $\\angle C = 50^\\circ$, calculate the measure of $\\angle BDE$ in degrees.',
    expectedAnswer: '35',
    hintLadder: {
      hint1Concept: 'Use the angle bisector value and alternate interior angles.',
      hint2Formula: '$\\angle ABD = \\angle EBD = 70^\\circ / 2 = 35^\\circ$.',
      hint3Step: 'Since $DE \\parallel AB$, alternate interior angles $\\angle BDE = \\angle ABD = 35^\\circ$.',
    },
    solution: {
      steps: [
        { step: '$BD$ bisects $\\angle B \\implies \\angle ABD = \\frac{70^\\circ}{2} = 35^\\circ$.', markTag: '[1m]' },
        { step: 'Given $DE \\parallel AB$ with transversal $BD$. Alternate interior angles are equal: $\\angle BDE = \\angle ABD$.', markTag: '[1m]' },
        { step: 'Therefore $\\angle BDE = 35^\\circ$. (Note: $\\triangle BDE$ is isosceles with $DE = BE$).', markTag: '[1m]' },
      ],
      finalAnswer: '35°',
      commonMistake: 'Attempting to use $\\angle C = 50^\\circ$ instead of recognizing the alternate interior angle directly.',
    },
  },
];
