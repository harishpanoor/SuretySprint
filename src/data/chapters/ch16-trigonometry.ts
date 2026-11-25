import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateTrigonometryQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 3);

  if (type === 1) {
    // Exact standard angles evaluation:
    // e.g. 2*sin(30)*cos(30) or sin^2(45) + cos^2(45) or 2*tan(45)^2 + cos(30)^2 - sin(60)^2
    const problems = [
      {
        expr: '2\\tan^2(45^\\circ) + \\cos^2(30^\\circ) - \\sin^2(60^\\circ)',
        ans: '2',
        hint: 'tan(45) = 1, cos(30) = sqrt(3)/2, sin(60) = sqrt(3)/2',
        work: '2(1)^2 + (3/4) - (3/4) = 2',
      },
      {
        expr: '\\frac{2\\tan(30^\\circ)}{1 + \\tan^2(30^\\circ)}',
        ans: '0.866',
        ansDisplay: '\\frac{\\sqrt{3}}{2}',
        acceptable: ['sqrt(3)/2', '\\frac{\\sqrt{3}}{2}', '0.866', '0.8660'],
        hint: 'tan(30) = 1/sqrt(3), tan^2(30) = 1/3',
        work: '(2/sqrt(3)) / (1 + 1/3) = (2/sqrt(3)) / (4/3) = 6 / (4*sqrt(3)) = sqrt(3)/2',
      },
      {
        expr: '\\sin(30^\\circ)\\cos(60^\\circ) + \\cos(30^\\circ)\\sin(60^\\circ)',
        ans: '1',
        hint: 'sin(30) = 1/2, cos(60) = 1/2, cos(30) = sqrt(3)/2, sin(60) = sqrt(3)/2',
        work: '(1/2)(1/2) + (sqrt(3)/2)(sqrt(3)/2) = 1/4 + 3/4 = 1',
      },
      {
        expr: '\\frac{\\tan(60^\\circ) - \\tan(30^\\circ)}{1 + \\tan(60^\\circ)\\tan(30^\\circ)}',
        ans: '0.577',
        ansDisplay: '\\frac{1}{\\sqrt{3}}',
        acceptable: ['1/sqrt(3)', '\\frac{1}{\\sqrt{3}}', '0.577', '0.58'],
        hint: 'tan(60) = sqrt(3), tan(30) = 1/sqrt(3)',
        work: '(sqrt(3) - 1/sqrt(3)) / (1 + 1) = (2/sqrt(3)) / 2 = 1/sqrt(3)',
      },
    ];
    const p = rng.choice(problems);

    const prompt = `Evaluate the numerical value of the trigonometric expression without using tables:\n$$${p.expr}$$`;

    return {
      id: `gen_ch16_${rng.int(10000, 99999)}`,
      chapterId: 16,
      unitId: 7,
      title: 'Standard Angle Trigonometric Evaluation',
      type: 'expression',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: p.ans,
      tolerance: 0.02,
      acceptableAnswers: p.acceptable,
      hintLadder: {
        hint1Concept: 'Substitute standard angle values: $30^\\circ, 45^\\circ, 60^\\circ$.',
        hint2Formula: p.hint,
        hint3Step: p.work,
      },
      solution: {
        steps: [
          { step: `Substitute standard values into $${p.expr}$:`, markTag: '[1m]' },
          { step: p.work, markTag: '[1m]' },
        ],
        finalAnswer: p.ansDisplay ? `$${p.ansDisplay}$` : p.ans,
        commonMistake: 'Mixing up standard values of sine and cosine at 30° and 60°.',
      },
      isGenerated: true,
      generatorId: 'ch16',
      generatorSeed: seed,
    };
  } else if (type === 2) {
    // Complementary angle cancellation:
    // sin(A)/cos(90 - A) = 1
    // or (sin(theta)/cos(90-theta)) + (cos(theta)/sin(90-theta)) = 2
    const theta = rng.choice([20, 25, 35, 40, 50, 65, 70]);
    const comp = 90 - theta;

    const prompt = `Evaluate without using tables:\n$$\\frac{\\sin(${theta}^\\circ)}{\\cos(${comp}^\\circ)} + \\frac{\\tan(${comp}^\\circ)}{\\cot(${theta}^\\circ)}$$`;

    return {
      id: `gen_ch16_${rng.int(10000, 99999)}`,
      chapterId: 16,
      unitId: 7,
      title: 'Complementary Angle Evaluation',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: '2',
      hintLadder: {
        hint1Concept: 'Use complementary angle identities.',
        hint2Formula: '$\\cos(' + comp + '^\\circ) = \\cos(90^\\circ - ' + theta + '^\\circ) = \\sin(' + theta + '^\\circ)$ and $\\cot(' + theta + '^\\circ) = \\tan(' + comp + '^\\circ)$.',
        hint3Step: '$\\frac{\\sin(' + theta + ')}{\\sin(' + theta + ')} + \\frac{\\tan(' + comp + ')}{\\tan(' + comp + ')} = 1 + 1 = 2$.',
      },
      solution: {
        steps: [
          { step: `Using complementary identities: $\\cos(${comp}^\\circ) = \\cos(90^\\circ - ${theta}^\\circ) = \\sin(${theta}^\\circ)$.`, markTag: '[0.5m]' },
          { step: `Also $\\cot(${theta}^\\circ) = \\cot(90^\\circ - ${comp}^\\circ) = \\tan(${comp}^\\circ)$.`, markTag: '[0.5m]' },
          { step: `Expression $= \\frac{\\sin(${theta}^\\circ)}{\\sin(${theta}^\\circ)} + \\frac{\\tan(${comp}^\\circ)}{\\tan(${comp}^\\circ)} = 1 + 1 = 2$.`, markTag: '[1m]' },
        ],
        finalAnswer: '2',
        commonMistake: 'Attempting to look up values in log/trig tables instead of applying $\\sin(90^\\circ - A) = \\cos A$.',
      },
      isGenerated: true,
      generatorId: 'ch16',
      generatorSeed: seed,
    };
  } else {
    // Solving 2D right triangle:
    // Given hypotenuse c and angle 30, find opposite side = c * sin(30) = c / 2
    const c = rng.choice([8, 12, 16, 20, 24]);
    const opp = c / 2;

    const prompt = `In a right-angled $\\triangle ABC$, $\\angle B = 90^\\circ$ and $\\angle C = 30^\\circ$. If the hypotenuse $AC = ${c}\\text{ cm}$, find the length of the side $AB$ opposite to $\\angle C$ (in cm).`;

    return {
      id: `gen_ch16_${rng.int(10000, 99999)}`,
      chapterId: 16,
      unitId: 7,
      title: 'Solving Right Triangle with 30° Angle',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${opp}`,
      diagramSvgId: 'RightTriangleDiagram',
      diagramData: {
        vertexA: 'A',
        vertexB: 'B',
        vertexC: 'C',
        hypotenuseLabel: `${c} cm`,
        altitudeLabel: 'AB = ?',
        angleLabel: '30°',
      },
      hintLadder: {
        hint1Concept: '$\\sin C = \\frac{\\text{Opposite Side}}{\\text{Hypotenuse}} = \\frac{AB}{AC}$.',
        hint2Formula: '$\\sin(30^\\circ) = \\frac{1}{2}$.',
        hint3Step: `$\\frac{1}{2} = \\frac{AB}{${c}} \\implies AB = \\frac{${c}}{2} = ${opp}\\text{ cm}$.`,
      },
      solution: {
        steps: [
          { step: `In right $\\triangle ABC$, $\\sin C = \\frac{AB}{AC}$.`, markTag: '[1m]' },
          { step: `$\\sin(30^\\circ) = \\frac{1}{2} = \\frac{AB}{${c}} \\implies AB = \\frac{${c}}{2} = ${opp}\\text{ cm}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${opp} cm`,
        commonMistake: 'Using $\\cos(30^\\circ)$ instead of $\\sin(30^\\circ)$ for the opposite side.',
      },
      isGenerated: true,
      generatorId: 'ch16',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh16: Question[] = [
  {
    id: 'ch16_q01',
    chapterId: 16,
    unitId: 7,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Complementary Angle Identity',
    prompt: 'Which of the following identities is true for any acute angle $A$?',
    mcqOptions: [
      { id: 'A', text: '$\\tan(90^\\circ - A) = \\cot A$', explanation: 'Correct complementary angle pair.' },
      { id: 'B', text: '$\\sin(90^\\circ - A) = \\sin A$', explanation: 'Incorrect: $\\sin(90^\\circ - A) = \\cos A$.' },
      { id: 'C', text: '$\\tan(90^\\circ - A) = \\tan A$', explanation: 'Incorrect.' },
      { id: 'D', text: '$\\sec(90^\\circ - A) = \\cos A$', explanation: 'Incorrect: $\\sec(90^\\circ - A) = \\csc A$.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Complementary ratios swap between co-functions.',
      hint2Formula: 'Sine swaps with cosine, tangent with cotangent, secant with cosecant.',
      hint3Step: '$\\tan(90^\\circ - A) = \\cot A$.',
    },
    solution: {
      steps: [
        { step: 'In right triangle, complementary angle switches opposite and adjacent legs: $\\tan(90^\\circ - A) = \\frac{\\text{adj}}{\\text{opp}} = \\cot A$.', markTag: '[1m]' },
      ],
      finalAnswer: 'A: tan(90° - A) = cot A',
      commonMistake: 'Confusing reciprocal identity ($1/\\tan A$) with complementary identity.',
    },
  },
  {
    id: 'ch16_q02',
    chapterId: 16,
    unitId: 7,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Maximum Value of Sine and Cosine',
    prompt: '**Assertion (A)**: For any acute angle $\\theta$ ($0^\\circ < \\theta < 90^\\circ$), $\\sin \\theta < 1$ and $\\cos \\theta < 1$.\n\n**Reason (R)**: In any right-angled triangle, the hypotenuse is the longest side, so both perpendicular and base are strictly less than the hypotenuse.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: '$\\sin \\theta = \\frac{\\text{Perpendicular}}{\\text{Hypotenuse}}$.',
      hint2Formula: 'Since hypotenuse is strictly the longest side, fraction $< 1$.',
      hint3Step: 'Both $\\sin \\theta$ and $\\cos \\theta$ are proper fractions for acute angles.',
    },
    solution: {
      steps: [
        { step: '$\\sin \\theta = \\frac{p}{h}$ and $\\cos \\theta = \\frac{b}{h}$. Hypotenuse is the longest side ($h > p$ and $h > b$), so $\\frac{p}{h} < 1$ and $\\frac{b}{h} < 1$. Assertion is True.', markTag: '[0.5m]' },
        { step: 'Reason correctly states that hypotenuse is the longest side in a right triangle, explaining Assertion. Both are True and R explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Thinking $\\sin \\theta$ can exceed 1 for acute angles.',
    },
  },
  {
    id: 'ch16_q03',
    chapterId: 16,
    unitId: 7,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Finding Other Ratios Given Sin theta',
    prompt: 'If $\\sin \\theta = \\frac{3}{5}$ for an acute angle $\\theta$, find the numerical value of $4\\tan \\theta - 5\\cos \\theta$.',
    expectedAnswer: '-1',
    hintLadder: {
      hint1Concept: 'Use Pythagorean triplet $3, 4, 5$.',
      hint2Formula: 'Perpendicular $p = 3$, hypotenuse $h = 5 \\implies$ base $b = \\sqrt{5^2 - 3^2} = 4$.',
      hint3Step: '$\\tan \\theta = \\frac{3}{4}$, $\\cos \\theta = \\frac{4}{5}$. Then $4\\left(\\frac{3}{4}\\right) - 5\\left(\\frac{4}{5}\\right) = 3 - 4 = -1$.',
    },
    solution: {
      steps: [
        { step: 'Given $\\sin \\theta = \\frac{3}{5}$. By Pythagoras, base $b = \\sqrt{5^2 - 3^2} = \\sqrt{16} = 4$.', markTag: '[1m]' },
        { step: 'Therefore $\\tan \\theta = \\frac{3}{4}$ and $\\cos \\theta = \\frac{4}{5}$.', markTag: '[1m]' },
        { step: 'Evaluate: $4\\tan \\theta - 5\\cos \\theta = 4\\left(\\frac{3}{4}\\right) - 5\\left(\\frac{4}{5}\\right) = 3 - 4 = -1$.', markTag: '[1m]' },
      ],
      finalAnswer: '-1',
      commonMistake: 'Making a sign error and writing $+1$ instead of $-1$.',
    },
  },
  {
    id: 'ch16_q04',
    chapterId: 16,
    unitId: 7,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Evaluation of Complementary Trigonometric Square Sum',
    prompt: 'Evaluate without using tables:\n$$\\frac{\\cos(70^\\circ)}{\\sin(20^\\circ)} + \\frac{\\cos(55^\\circ)\\csc(35^\\circ)}{\\tan(5^\\circ)\\tan(25^\\circ)\\tan(45^\\circ)\\tan(65^\\circ)\\tan(85^\\circ)}$$',
    expectedAnswer: '2',
    hintLadder: {
      hint1Concept: 'Apply complementary angle identities to both numerator and denominator.',
      hint2Formula: '$\\cos(70^\\circ) = \\sin(20^\\circ)$, so first fraction is $1$. In second fraction, $\\cos(55^\\circ)\\csc(35^\\circ) = \\cos(55^\\circ)\\sec(55^\\circ) = 1$.',
      hint3Step: 'In denominator: $\\tan(5)\\tan(85) = 1, \\tan(25)\\tan(65) = 1, \\tan(45) = 1$. Denominator $= 1$. Total $= 1 + 1 = 2$.',
    },
    solution: {
      steps: [
        { step: 'First term: $\\frac{\\cos(70^\\circ)}{\\sin(20^\\circ)} = \\frac{\\sin(90-70)}{\\sin(20)} = 1$.', markTag: '[1m]' },
        { step: 'Second term numerator: $\\cos(55^\\circ)\\csc(35^\\circ) = \\cos(55^\\circ) \\times \\frac{1}{\\sin(35^\\circ)} = \\frac{\\cos(55)}{\\cos(55)} = 1$.', markTag: '[1m]' },
        { step: 'Denominator: $\\tan(5)\\tan(85) = \\tan(5)\\cot(5) = 1$, $\\tan(25)\\tan(65) = 1$, $\\tan(45) = 1$. Total $= 1 + \\frac{1}{1} = 2$.', markTag: '[1m]' },
      ],
      finalAnswer: '2',
      commonMistake: 'Forgetting that $\\csc(35^\\circ) = 1/\\sin(35^\\circ) = 1/\\cos(55^\\circ)$.',
    },
  },
  {
    id: 'ch16_q05',
    chapterId: 16,
    unitId: 7,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Solving Trigonometric Equations',
    prompt: 'Solve for acute angle $\\theta$ ($0^\\circ \\le \\theta \\le 90^\\circ$):\n\n**(i)** $2\\cos(3\\theta) = 1$\n**(ii)** $\\sqrt{3}\\tan(2\\theta) - 3 = 0$',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Value of θ for 2cos(3θ) = 1 (degrees):',
        expectedAnswer: '20',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Value of θ for √3 tan(2θ) - 3 = 0 (degrees):',
        expectedAnswer: '30',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Isolate the trigonometric ratio first, then find the corresponding standard angle.',
      hint2Formula: '(i) $\\cos(3\\theta) = 1/2 = \\cos(60^\\circ)$. (ii) $\\tan(2\\theta) = 3/\\sqrt{3} = \\sqrt{3} = \\tan(60^\\circ)$.',
      hint3Step: '(i) $3\\theta = 60^\\circ \\implies \\theta = 20^\\circ$. (ii) $2\\theta = 60^\\circ \\implies \\theta = 30^\\circ$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): $2\\cos(3\\theta) = 1 \\implies \\cos(3\\theta) = \\frac{1}{2}$. Since $\\cos(60^\\circ) = \\frac{1}{2}$, $3\\theta = 60^\\circ \\implies \\theta = 20^\\circ$.', markTag: '[2m]' },
        { step: 'Part (ii): $\\sqrt{3}\\tan(2\\theta) = 3 \\implies \\tan(2\\theta) = \\frac{3}{\\sqrt{3}} = \\sqrt{3}$. Since $\\tan(60^\\circ) = \\sqrt{3}$, $2\\theta = 60^\\circ \\implies \\theta = 30^\\circ$.', markTag: '[2m]' },
      ],
      finalAnswer: '(i) 20°, (ii) 30°',
      commonMistake: 'Forgetting to divide by the multiplier coefficient (3 and 2) to find $\\theta$.',
    },
  },
  {
    id: 'ch16_q06',
    chapterId: 16,
    unitId: 7,
    type: 'expression',
    difficulty: 'Exam',
    marks: 3,
    title: 'Fundamental Identity Simplification',
    prompt: 'Simplify the trigonometric expression:\n$$(1 + \\cot^2 A)(1 - \\cos A)(1 + \\cos A)$$',
    expectedAnswer: '1',
    hintLadder: {
      hint1Concept: 'Apply difference of squares to $(1 - \\cos A)(1 + \\cos A)$.',
      hint2Formula: '$(1 - \\cos A)(1 + \\cos A) = 1 - \\cos^2 A = \\sin^2 A$.',
      hint3Step: 'Identity: $1 + \\cot^2 A = \\csc^2 A$. Then $\\csc^2 A \\times \\sin^2 A = 1$.',
    },
    solution: {
      steps: [
        { step: 'Multiply: $(1 - \\cos A)(1 + \\cos A) = 1 - \\cos^2 A = \\sin^2 A$.', markTag: '[1m]' },
        { step: 'Use identity: $1 + \\cot^2 A = \\csc^2 A = \\frac{1}{\\sin^2 A}$.', markTag: '[1m]' },
        { step: 'Product $= \\csc^2 A \\times \\sin^2 A = \\frac{1}{\\sin^2 A} \\times \\sin^2 A = 1$.', markTag: '[1m]' },
      ],
      finalAnswer: '1',
      commonMistake: 'Expanding into multiple terms instead of using identities $1 - \\cos^2 A = \\sin^2 A$ and $1 + \\cot^2 A = \\csc^2 A$.',
    },
  },
];
