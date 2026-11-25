import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateTrigonometricalRatiosQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Exact standard angles evaluation:
    const problems = [
      {
        expr: '2\\tan^2(45^\\circ) + \\cos^2(30^\\circ) - \\sin^2(60^\\circ)',
        ans: '2',
        hint: 'tan(45) = 1, cos(30) = sqrt(3)/2, sin(60) = sqrt(3)/2',
        work: '2(1)^2 + (3/4) - (3/4) = 2',
      },
      {
        expr: '\\sin(30^\\circ)\\cos(60^\\circ) + \\cos(30^\\circ)\\sin(60^\\circ)',
        ans: '1',
        hint: 'sin(30) = 1/2, cos(60) = 1/2, cos(30) = sqrt(3)/2, sin(60) = sqrt(3)/2',
        work: '(1/2)(1/2) + (sqrt(3)/2)(sqrt(3)/2) = 1/4 + 3/4 = 1',
      },
      {
        expr: '4\\sin(30^\\circ)\\cos(60^\\circ)',
        ans: '1',
        hint: 'sin(30) = 1/2, cos(60) = 1/2',
        work: '4 \\times (1/2) \\times (1/2) = 1',
      },
      {
        expr: '\\tan^2(60^\\circ) - 2\\cos^2(45^\\circ)',
        ans: '2',
        hint: 'tan(60) = sqrt(3), cos(45) = 1/sqrt(2)',
        work: '(sqrt(3))^2 - 2(1/sqrt(2))^2 = 3 - 2(1/2) = 3 - 1 = 2',
      },
    ];
    const p = rng.choice(problems);

    const prompt = `Evaluate the numerical value of the trigonometric expression without using tables:\n$$${p.expr}$$`;

    return {
      id: `gen_ch21_${rng.int(10000, 99999)}`,
      chapterId: 21,
      unitId: 7,
      title: 'Standard Angle Trigonometric Evaluation',
      type: 'expression',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: p.ans,
      acceptableAnswers: [p.ans, `${p.ans}.0`],
      hintLadder: {
        hint1Concept: 'Substitute standard angle values for $30^\\circ, 45^\\circ, 60^\\circ$.',
        hint2Formula: p.hint,
        hint3Step: p.work,
      },
      solution: {
        steps: [
          { step: `Substitute standard values: $${p.expr}$.`, markTag: '[1m]' },
          { step: p.work, markTag: '[1m]' },
        ],
        finalAnswer: p.ans,
        commonMistake: 'Mixing up standard values of sine and cosine at 30° and 60°.',
      },
      isGenerated: true,
      generatorId: 'ch21',
      generatorSeed: seed,
    };
  } else {
    // Complementary angle cancellation:
    const theta = rng.choice([20, 25, 35, 40, 50, 65, 70]);
    const comp = 90 - theta;

    const prompt = `Evaluate without using tables:\n$$\\frac{\\sin(${theta}^\\circ)}{\\cos(${comp}^\\circ)} + \\frac{\\tan(${comp}^\\circ)}{\\cot(${theta}^\\circ)}$$`;

    return {
      id: `gen_ch21_${rng.int(10000, 99999)}`,
      chapterId: 21,
      unitId: 7,
      title: 'Complementary Angle Evaluation',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: '2',
      hintLadder: {
        hint1Concept: 'Use complementary angle identities.',
        hint2Formula: `$\\cos(${comp}^\\circ) = \\sin(${theta}^\\circ)$ and $\\cot(${theta}^\\circ) = \\tan(${comp}^\\circ)$.`,
        hint3Step: `$\\frac{\\sin(${theta})}{\\sin(${theta})} + \\frac{\\tan(${comp})}{\\tan(${comp})} = 1 + 1 = 2$.`,
      },
      solution: {
        steps: [
          { step: `Using complementary identities: $\\cos(${comp}^\\circ) = \\cos(90^\\circ - ${theta}^\\circ) = \\sin(${theta}^\\circ)$.`, markTag: '[0.5m]' },
          { step: `Also $\\cot(${theta}^\\circ) = \\cot(90^\\circ - ${comp}^\\circ) = \\tan(${comp}^\\circ)$.`, markTag: '[0.5m]' },
          { step: `Expression $= \\frac{\\sin(${theta}^\\circ)}{\\sin(${theta}^\\circ)} + \\frac{\\tan(${comp}^\\circ)}{\\tan(${comp}^\\circ)} = 1 + 1 = 2$.`, markTag: '[1m]' },
        ],
        finalAnswer: '2',
        commonMistake: 'Attempting to look up values in tables instead of applying $\\sin(90^\\circ - A) = \\cos A$.',
      },
      isGenerated: true,
      generatorId: 'ch21',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh21: Question[] = [
  {
    id: 'ch21_q01',
    chapterId: 21,
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
        { step: 'In a right triangle, complementary angle switches opposite and adjacent legs: $\\tan(90^\\circ - A) = \\frac{\\text{adj}}{\\text{opp}} = \\cot A$.', markTag: '[1m]' },
      ],
      finalAnswer: 'A: tan(90° - A) = cot A',
      commonMistake: 'Confusing reciprocal identity ($1/\\tan A$) with complementary identity.',
    },
  },
  {
    id: 'ch21_q02',
    chapterId: 21,
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
      hint1Concept: '$\\sin\\theta = \\text{perpendicular}/\\text{hypotenuse}$ and $\\cos\\theta = \\text{base}/\\text{hypotenuse}$.',
      hint2Formula: 'In a right-angled triangle, hypotenuse $> p$ and hypotenuse $> b$.',
      hint3Step: 'Therefore both ratios are strictly less than 1 for acute angles.',
    },
    solution: {
      steps: [
        { step: 'By definition, $\\sin\\theta = p/h$ and $\\cos\\theta = b/h$. Since $h$ is the longest side in a right triangle, $p < h$ and $b < h$.', markTag: '[0.5m]' },
        { step: 'Thus $\\sin\\theta < 1$ and $\\cos\\theta < 1$ for acute angles. Reason is True and correctly explains Assertion.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Assuming $\\tan\\theta$ is also bounded by 1 (tangent can take any positive real value).',
    },
  },
  {
    id: 'ch21_q03',
    chapterId: 21,
    unitId: 7,
    type: 'numerical',
    difficulty: 'Easy',
    marks: 2,
    title: 'Standard Angle Evaluation with Powers',
    prompt: 'Evaluate without tables:\n$$4\\sin^2(30^\\circ) + 2\\cos^2(45^\\circ) - \\tan^2(45^\\circ)$$',
    expectedAnswer: '1',
    hintLadder: {
      hint1Concept: 'Substitute exact values: $\\sin 30^\\circ = 1/2, \\cos 45^\\circ = 1/\\sqrt{2}, \\tan 45^\\circ = 1$.',
      hint2Formula: '$4(1/2)^2 + 2(1/\\sqrt{2})^2 - 1^2$.',
      hint3Step: '$4(1/4) + 2(1/2) - 1 = 1 + 1 - 1 = 1$.',
    },
    solution: {
      steps: [
        { step: '$\\sin 30^\\circ = \\frac{1}{2} \\implies \\sin^2 30^\\circ = \\frac{1}{4}$.', markTag: '[0.5m]' },
        { step: '$\\cos 45^\\circ = \\frac{1}{\\sqrt{2}} \\implies \\cos^2 45^\\circ = \\frac{1}{2}$. $\\tan 45^\\circ = 1 \\implies \\tan^2 45^\\circ = 1$.', markTag: '[0.5m]' },
        { step: 'Expression $= 4\\left(\\frac{1}{4}\\right) + 2\\left(\\frac{1}{2}\\right) - 1 = 1 + 1 - 1 = 1$.', markTag: '[1m]' },
      ],
      finalAnswer: '1',
      commonMistake: 'Writing $\\sin^2(30^\\circ) = \\frac{1}{2}$ without squaring.',
    },
  },
  {
    id: 'ch21_q04',
    chapterId: 21,
    unitId: 7,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Finding Remaining Ratios from Given Ratio',
    prompt: 'If $\\cos\\theta = \\frac{5}{13}$ and $\\theta$ is an acute angle, find the value of:\n$$\\frac{\\sin\\theta + \\tan\\theta}{1 - \\sin\\theta}$$',
    expectedAnswer: '43.2',
    tolerance: 0.05,
    acceptableAnswers: ['43.2', '216/5', '43.20', '43 1/5'],
    hintLadder: {
      hint1Concept: 'In right triangle, base $= 5k$, hypotenuse $= 13k$.',
      hint2Formula: 'Perpendicular $p = \\sqrt{13^2 - 5^2} = 12k$. So $\\sin\\theta = 12/13$ and $\\tan\\theta = 12/5$.',
      hint3Step: 'Numerator $= \\frac{12}{13} + \\frac{12}{5} = \\frac{216}{65}$. Denominator $= 1 - \\frac{12}{13} = \\frac{1}{13}$. Value $= \\frac{216}{65} \\times 13 = \\frac{216}{5} = 43.2$.',
    },
    solution: {
      steps: [
        { step: 'Given $\\cos\\theta = 5/13$. Hypotenuse $= 13$, base $= 5$. Perpendicular $p = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12$.', markTag: '[1m]' },
        { step: '$\\sin\\theta = \\frac{12}{13}$ and $\\tan\\theta = \\frac{12}{5}$.', markTag: '[1m]' },
        { step: 'Substitute into expression: $\\frac{\\frac{12}{13} + \\frac{12}{5}}{1 - \\frac{12}{13}} = \\frac{\\frac{216}{65}}{\\frac{1}{13}} = \\frac{216}{65} \\times 13 = \\frac{216}{5} = 43.2$.', markTag: '[1m]' },
      ],
      finalAnswer: '43.2 (or 216/5)',
      commonMistake: 'Forgetting to use Pythagorean theorem to determine the perpendicular side.',
    },
  },
  {
    id: 'ch21_q05',
    chapterId: 21,
    unitId: 7,
    type: 'expression',
    difficulty: 'Exam',
    marks: 3,
    title: 'Fundamental Pythagorean Identity Verification',
    prompt: 'Simplify the expression completely using fundamental trigonometric identities:\n$$(\\sec\\theta - \\tan\\theta)(\\sec\\theta + \\tan\\theta)$$',
    expectedAnswer: '1',
    acceptableAnswers: ['1', '1.0'],
    hintLadder: {
      hint1Concept: 'Apply $(a - b)(a + b) = a^2 - b^2$.',
      hint2Formula: 'Expression becomes $\\sec^2\\theta - \\tan^2\\theta$.',
      hint3Step: 'Recall identity $1 + \\tan^2\\theta = \\sec^2\\theta \\implies \\sec^2\\theta - \\tan^2\\theta = 1$.',
    },
    solution: {
      steps: [
        { step: 'Expand using difference of squares: $(\\sec\\theta - \\tan\\theta)(\\sec\\theta + \\tan\\theta) = \\sec^2\\theta - \\tan^2\\theta$.', markTag: '[1.5m]' },
        { step: 'By fundamental identity $1 + \\tan^2\\theta = \\sec^2\\theta \\implies \\sec^2\\theta - \\tan^2\\theta = 1$.', markTag: '[1.5m]' },
      ],
      finalAnswer: '1',
      commonMistake: 'Writing $-1$ instead of $1$.',
    },
  },
  {
    id: 'ch21_q06',
    chapterId: 21,
    unitId: 7,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Complementary Angle Product with Tangents',
    prompt: 'Evaluate the product without using tables:\n$$\\tan(15^\\circ)\\tan(30^\\circ)\\tan(60^\\circ)\\tan(75^\\circ)$$',
    expectedAnswer: '1',
    acceptableAnswers: ['1', '1.0'],
    hintLadder: {
      hint1Concept: 'Pair complementary angles: $15^\\circ$ with $75^\\circ$, and $30^\\circ$ with $60^\\circ$.',
      hint2Formula: '$\\tan(75^\\circ) = \\cot(15^\\circ) = \\frac{1}{\\tan(15^\\circ)}$. So $\\tan(15^\\circ)\\tan(75^\\circ) = 1$.',
      hint3Step: '$\\tan(30^\\circ)\\tan(60^\\circ) = \\frac{1}{\\sqrt{3}} \\times \\sqrt{3} = 1$. Product $= 1 \\times 1 = 1$.',
    },
    solution: {
      steps: [
        { step: '$\\tan 75^\\circ = \\tan(90^\\circ - 15^\\circ) = \\cot 15^\\circ = \\frac{1}{\\tan 15^\\circ}$.', markTag: '[1m]' },
        { step: 'Therefore $\\tan 15^\\circ \\times \\tan 75^\\circ = \\tan 15^\\circ \\times \\frac{1}{\\tan 15^\\circ} = 1$.', markTag: '[1m]' },
        { step: '$\\tan 30^\\circ \\times \\tan 60^\\circ = \\frac{1}{\\sqrt{3}} \\times \\sqrt{3} = 1$. Total product $= 1 \\times 1 = 1$.', markTag: '[1m]' },
      ],
      finalAnswer: '1',
      commonMistake: 'Trying to convert to decimals using approximation instead of exact complementary cancellation.',
    },
  },
];
