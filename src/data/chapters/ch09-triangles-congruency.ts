import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateTrianglesCongruencyQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Finding unknown side or angle using CPCTC:
    // Triangles ABC and DEF are congruent: ABC ~= DEF
    // If AB = 2x + a and DE = b, find x.
    const xVal = rng.int(3, 9);
    const coeff = rng.choice([2, 3]);
    const offset = rng.int(1, 6);
    const deVal = coeff * xVal + offset;

    const prompt = `If $\\triangle ABC \\cong \\triangle DEF$ such that side $AB = ${coeff}x + ${offset}\\text{ cm}$ and corresponding side $DE = ${deVal}\\text{ cm}$, calculate the value of $x$.`;

    return {
      id: `gen_ch09_${rng.int(10000, 99999)}`,
      chapterId: 9,
      unitId: 4,
      title: 'Finding Unknown Variable Using CPCTC',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${xVal}`,
      hintLadder: {
        hint1Concept: 'Corresponding parts of congruent triangles are equal (CPCTC).',
        hint2Formula: 'Since $\\triangle ABC \\cong \\triangle DEF$, corresponding side $AB = DE$.',
        hint3Step: `Set up the linear equation: $${coeff}x + ${offset} = ${deVal}$. Solve for $x$.`,
      },
      solution: {
        steps: [
          { step: `Given $\\triangle ABC \\cong \\triangle DEF$, by CPCTC: $AB = DE$.`, markTag: '[1m]' },
          { step: `$${coeff}x + ${offset} = ${deVal} \\implies ${coeff}x = ${deVal - offset} \\implies x = ${xVal}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${xVal}`,
        commonMistake: 'Equating $AB$ to the wrong side like $EF$ instead of corresponding side $DE$.',
      },
      isGenerated: true,
      generatorId: 'ch09',
      generatorSeed: seed,
    };
  } else {
    // Angle equality from CPCTC:
    // Angle A in triangle ABC corresponds to Angle D in DEF
    const angleA = rng.choice([40, 50, 60, 70, 75]);
    const angleB = rng.choice([30, 45, 55, 65]);
    const angleC = 180 - angleA - angleB;

    const prompt = `It is given that $\\triangle ABC \\cong \\triangle PQR$. If $\\angle A = ${angleA}^\\circ$ and $\\angle B = ${angleB}^\\circ$, find the measure of $\\angle R$ (in degrees).`;

    return {
      id: `gen_ch09_${rng.int(10000, 99999)}`,
      chapterId: 9,
      unitId: 4,
      title: 'Corresponding Angle from CPCTC and Angle Sum',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${angleC}`,
      hintLadder: {
        hint1Concept: 'Find the third angle of $\\triangle ABC$ using the angle sum property first.',
        hint2Formula: '$\\angle C = 180^\\circ - (\\angle A + \\angle B) = 180^\\circ - (${angleA}^\\circ + ${angleB}^\\circ)$.',
        hint3Step: 'Since $\\triangle ABC \\cong \\triangle PQR$, corresponding angle $\\angle R = \\angle C$.',
      },
      solution: {
        steps: [
          { step: `In $\\triangle ABC$: $\\angle C = 180^\\circ - (${angleA}^\\circ + ${angleB}^\\circ) = ${angleC}^\\circ$.`, markTag: '[1m]' },
          { step: `Since $\\triangle ABC \\cong \\triangle PQR$, by CPCTC: $\\angle R = \\angle C = ${angleC}^\\circ$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${angleC}°`,
        commonMistake: 'Equating $\\angle R$ directly to $\\angle A$ or $\\angle B$ instead of $\\angle C$.',
      },
      isGenerated: true,
      generatorId: 'ch09',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh09: Question[] = [
  {
    id: 'ch09_q01',
    chapterId: 9,
    unitId: 4,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Valid Criteria for Congruency of Triangles',
    prompt: 'Which of the following is **NOT** a valid criterion for the congruency of two triangles?',
    mcqOptions: [
      { id: 'A', text: 'AAA (Angle-Angle-Angle)', explanation: 'Correct: AAA only establishes similarity (same shape), not congruency (same size).' },
      { id: 'B', text: 'SAS (Side-Angle-Side)', explanation: 'Incorrect: SAS is a standard valid criterion where the angle is strictly included.' },
      { id: 'C', text: 'RHS (Right-angle, Hypotenuse, Side)', explanation: 'Incorrect: RHS is a valid criterion for right-angled triangles.' },
      { id: 'D', text: 'SSS (Side-Side-Side)', explanation: 'Incorrect: SSS is a valid criterion.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Congruency means identical shape AND identical size.',
      hint2Formula: 'Two triangles can have identical angles of $60^\\circ$ each, but one can be huge and the other tiny.',
      hint3Step: 'Therefore AAA only guarantees similarity, not congruency.',
    },
    solution: {
      steps: [
        { step: 'Congruence requires equal corresponding side lengths. Triangles with angles $60^\\circ, 60^\\circ, 60^\\circ$ can have different dimensions.', markTag: '[0.5m]' },
        { step: 'Hence AAA proves similarity, but NOT congruency. Criteria SSS, SAS, AAS, and RHS are valid.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: AAA (Angle-Angle-Angle)',
      commonMistake: 'Confusing AAS (which has a known side length) with AAA (which has no known side length).',
    },
  },
  {
    id: 'ch09_q02',
    chapterId: 9,
    unitId: 4,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: SSA is Not Sufficient',
    prompt: '**Assertion (A)**: Two triangles with two pairs of equal sides and one pair of equal angles are NOT always congruent.\n\n**Reason (R)**: SSA (Side-Side-Angle) is not a valid criterion because the non-included angle can allow two different triangle shapes to be constructed.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'For SAS, the angle must be strictly IN BETWEEN the two sides.',
      hint2Formula: 'If the angle is not included (SSA), an ambiguous case exists in geometry.',
      hint3Step: 'Hence SSA does not ensure unique congruency, making both Assertion and Reason True.',
    },
    solution: {
      steps: [
        { step: 'In geometry, the SSA configuration allows an arc to intersect the base line at two distinct points, creating two non-congruent triangles (ambiguous case).', markTag: '[0.5m]' },
        { step: 'Therefore Assertion is True and Reason correctly explains why SSA is invalid.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Assuming any 3 matching pieces of information guarantee congruency.',
    },
  },
  {
    id: 'ch09_q03',
    chapterId: 9,
    unitId: 4,
    type: 'proof',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Proof: Congruence in Parallelogram Diagonals',
    prompt: 'In quadrilateral $ABCD$, opposite sides are equal ($AB = CD$ and $AD = BC$). Prove that $\\triangle ABC \\cong \\triangle CDA$ by completing the statements and reasons.',
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
    id: 'ch09_q04',
    chapterId: 9,
    unitId: 4,
    type: 'proof',
    difficulty: 'Exam',
    marks: 4,
    title: 'RHS Congruence Proof with Perpendiculars',
    prompt: 'In $\\triangle ABC$, the altitudes $BD$ and $CE$ to sides $AC$ and $AB$ are equal ($BD = CE$). Prove that $\\triangle BCD \\cong \\triangle CBE$.',
    diagramSvgId: 'TriangleDiagram',
    proofSteps: [
      {
        id: 'step1',
        stepNumber: 1,
        statement: 'In right triangles $\\triangle BDC$ and $\\triangle CEB$, $\\angle BDC = \\angle CEB = 90^\\circ$',
        reason: 'Given: BD and CE are altitudes',
        availableReasonOptions: ['Given: BD and CE are altitudes', 'Linear pair', 'Alternate angles', 'Vertically opposite'],
      },
      {
        id: 'step2',
        stepNumber: 2,
        statement: 'Hypotenuse $BC = BC$',
        reason: 'Common hypotenuse to both right triangles',
        availableReasonOptions: ['Common hypotenuse to both right triangles', 'Given equal', 'Mid-point theorem', 'Isosceles property'],
      },
      {
        id: 'step3',
        stepNumber: 3,
        statement: 'Side $BD = CE$',
        reason: 'Given in hypothesis',
        availableReasonOptions: ['Given in hypothesis', 'CPCTC', 'Angle bisector property', 'Opposite sides'],
      },
      {
        id: 'step4',
        stepNumber: 4,
        statement: 'Therefore, $\\triangle BDC \\cong \\triangle CEB$',
        reason: 'RHS Congruency Criterion',
        availableReasonOptions: ['RHS Congruency Criterion', 'SAS Criterion', 'SSS Criterion', 'AAS Criterion'],
      },
    ],
    proofRubric: [
      'Stated right angles $90^\\circ$ from altitudes [1m]',
      'Identified common hypotenuse $BC$ [1m]',
      'Stated equal legs $BD = CE$ [1m]',
      'Concluded congruency by RHS [1m]',
    ],
    hintLadder: {
      hint1Concept: 'Look at the right-angled sub-triangles sharing the base $BC$.',
      hint2Formula: 'In $\\triangle BDC$ and $\\triangle CEB$, the hypotenuse is $BC$ for both.',
      hint3Step: 'Both have a right angle, identical hypotenuse $BC$, and one equal leg $BD = CE$. Apply RHS.',
    },
    solution: {
      steps: [
        { step: '$\\angle BDC = \\angle CEB = 90^\\circ$ (since $BD \\perp AC$ and $CE \\perp AB$).', markTag: '[1m]' },
        { step: 'Hypotenuse $BC = BC$ (common side).', markTag: '[1m]' },
        { step: 'Side $BD = CE$ (given).', markTag: '[1m]' },
        { step: '$\\therefore \\triangle BDC \\cong \\triangle CEB$ by RHS Criterion.', markTag: '[1m]' },
      ],
      finalAnswer: 'Proven: $\\triangle BDC \\cong \\triangle CEB$ by RHS',
      commonMistake: 'Claiming SAS when the right angle is not the included angle between $BC$ and $BD$.',
    },
  },
  {
    id: 'ch09_q05',
    chapterId: 9,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Solving for Unknowns from CPCTC',
    prompt: 'Given $\\triangle PQR \\cong \\triangle XYZ$. If $\\angle P = (2x + 10)^\\circ, \\angle X = 50^\\circ, QR = 3y - 5\\text{ cm}$, and $YZ = 16\\text{ cm}$, find the value of $x + y$.',
    expectedAnswer: '27',
    acceptableAnswers: ['27', '27.0'],
    hintLadder: {
      hint1Concept: 'Equate corresponding angles and corresponding sides from CPCTC.',
      hint2Formula: '$\\angle P = \\angle X \\implies 2x + 10 = 50$, and $QR = YZ \\implies 3y - 5 = 16$.',
      hint3Step: '$2x = 40 \\implies x = 20$. $3y = 21 \\implies y = 7$. Then $x + y = 20 + 7 = 27$.',
    },
    solution: {
      steps: [
        { step: 'By CPCTC: $\\angle P = \\angle X \\implies 2x + 10 = 50 \\implies 2x = 40 \\implies x = 20$.', markTag: '[1m]' },
        { step: 'By CPCTC: $QR = YZ \\implies 3y - 5 = 16 \\implies 3y = 21 \\implies y = 7$.', markTag: '[1m]' },
        { step: 'Sum $x + y = 20 + 7 = 27$.', markTag: '[1m]' },
      ],
      finalAnswer: '27',
      commonMistake: 'Calculating only $x$ or only $y$ instead of their sum $x+y$.',
    },
  },
  {
    id: 'ch09_q06',
    chapterId: 9,
    unitId: 4,
    type: 'mcq',
    difficulty: 'Standard',
    marks: 1,
    title: 'Identifying Congruency Criterion from Diagram Marks',
    prompt: 'In two triangles $\\triangle ABC$ and $\\triangle DEF$, $AB = DE, \\angle B = \\angle E$, and $BC = EF$. Which congruency criterion directly proves that $\\triangle ABC \\cong \\triangle DEF$?',
    mcqOptions: [
      { id: 'A', text: 'SAS (Side-Angle-Side)', explanation: 'Correct: Two sides and the included angle between them are equal.' },
      { id: 'B', text: 'AAS (Angle-Angle-Side)', explanation: 'Incorrect: Only one angle is given.' },
      { id: 'C', text: 'SSS (Side-Side-Side)', explanation: 'Incorrect: Only two sides are given.' },
      { id: 'D', text: 'RHS', explanation: 'Incorrect: No right angle is specified.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Notice that angle B is situated directly between sides AB and BC.',
      hint2Formula: 'In $\\triangle DEF$, angle E is situated directly between sides DE and EF.',
      hint3Step: 'Since two sides and the included angle match, SAS applies.',
    },
    solution: {
      steps: [
        { step: 'Sides $AB$ and $BC$ enclose $\\angle B$. Sides $DE$ and $EF$ enclose $\\angle E$.', markTag: '[0.5m]' },
        { step: 'Since the equal angles are strictly included between the equal sides, the criterion is SAS.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: SAS (Side-Angle-Side)',
      commonMistake: 'Writing ASA when two sides and one angle are given.',
    },
  },
];
