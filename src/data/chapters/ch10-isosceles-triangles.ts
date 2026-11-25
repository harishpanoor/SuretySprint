import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateIsoscelesTrianglesQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Isosceles angle chasing:
    // In isosceles triangle ABC, AB = AC. If angle A = verticalAngle, find angle B and C.
    const verticalAngle = rng.choice([30, 40, 50, 70, 80, 100]);
    const baseAngle = (180 - verticalAngle) / 2;

    const prompt = `In an isosceles $\\triangle ABC$, the sides $AB = AC$. If the vertical angle $\\angle A = ${verticalAngle}^\\circ$, calculate the measure of the base angle $\\angle B$ (in degrees).`;

    return {
      id: `gen_ch10_${rng.int(10000, 99999)}`,
      chapterId: 10,
      unitId: 4,
      title: 'Isosceles Triangle Base Angle Calculation',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${baseAngle}`,
      acceptableAnswers: [`${baseAngle}`, `${baseAngle}°`, `${baseAngle} degrees`],
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
      generatorId: 'ch10',
      generatorSeed: seed,
    };
  } else {
    // Triangle Inequality generator:
    // Determine the range of third side x given two sides a and b
    const a = rng.choice([5, 6, 7, 8, 9]);
    const b = rng.choice([10, 11, 12, 14]);
    const diff = Math.abs(a - b);
    const sum = a + b;

    const prompt = `Two sides of a triangle are ${a}\\text{ cm} and ${b}\\text{ cm}. Between which two integer values must the length of the third side $x$ strictly lie?\nState the **maximum possible integer length** of the third side (in cm).`;
    const maxVal = sum - 1;

    return {
      id: `gen_ch10_${rng.int(10000, 99999)}`,
      chapterId: 10,
      unitId: 4,
      title: 'Triangle Inequality Maximum Third Side',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `${maxVal}`,
      acceptableAnswers: [`${maxVal}`, `${maxVal} cm`],
      hintLadder: {
        hint1Concept: 'The third side of a triangle must be strictly less than the sum of the other two sides and strictly greater than their difference.',
        hint2Formula: '$|a - b| < x < a + b$.',
        hint3Step: `$${diff} < x < ${sum}$. The largest integer strictly less than ${sum} is ${maxVal}.`,
      },
      solution: {
        steps: [
          { step: 'By the Triangle Inequality Theorem, the length of the third side $x$ must satisfy $|a - b| < x < a + b$.', markTag: '[1m]' },
          { step: `Substitute values: $|${a} - ${b}| < x < ${a} + ${b} \\implies ${diff} < x < ${sum}$.`, markTag: '[1m]' },
          { step: `The maximum integer length strictly less than ${sum}\\text{ cm} is ${maxVal}\\text{ cm}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${maxVal} cm`,
        commonMistake: 'Taking $a + b$ directly without realizing that equality gives a degenerate line segment, not a triangle.',
      },
      isGenerated: true,
      generatorId: 'ch10',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh10: Question[] = [
  {
    id: 'ch10_q01',
    chapterId: 10,
    unitId: 4,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Sides Forming a Valid Triangle',
    prompt: 'Which set of three side lengths can **NOT** form a triangle?',
    mcqOptions: [
      { id: 'A', text: '$3\\text{ cm}, 4\\text{ cm}, 8\\text{ cm}$', explanation: 'Correct: $3 + 4 = 7 < 8$, violating the triangle inequality sum rule.' },
      { id: 'B', text: '$6\\text{ cm}, 8\\text{ cm}, 10\\text{ cm}$', explanation: 'Incorrect: $6 + 8 = 14 > 10$, valid triangle.' },
      { id: 'C', text: '$5\\text{ cm}, 5\\text{ cm}, 5\\text{ cm}$', explanation: 'Incorrect: Equilateral triangle with $5+5 > 5$.' },
      { id: 'D', text: '$7\\text{ cm}, 9\\text{ cm}, 12\\text{ cm}$', explanation: 'Incorrect: $7 + 9 = 16 > 12$, valid triangle.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'The sum of the two smaller sides must be strictly greater than the longest side.',
      hint2Formula: '$a + b > c$ where $c$ is the longest side.',
      hint3Step: 'For option A: $3 + 4 = 7$, which is not greater than $8$.',
    },
    solution: {
      steps: [
        { step: 'By the Triangle Inequality Theorem, the sum of any two sides must be strictly greater than the third side.', markTag: '[0.5m]' },
        { step: 'For sides $3, 4, 8$: $3 + 4 = 7 < 8$. Hence no triangle can be formed.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: 3 cm, 4 cm, 8 cm',
      commonMistake: 'Allowing equality $a + b = c$, which yields a straight line segment, not a triangle.',
    },
  },
  {
    id: 'ch10_q02',
    chapterId: 10,
    unitId: 4,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Shortest Distance from External Point',
    prompt: '**Assertion (A)**: The perpendicular segment drawn from an external point to a given line is the shortest among all line segments joining the point to that line.\n\n**Reason (R)**: In any right-angled triangle formed with an oblique line segment, the oblique segment acts as the hypotenuse, and the side opposite the $90^\\circ$ angle is strictly the greatest side.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Drop a perpendicular from point $P$ to line $L$ at point $M$. Take any other point $Q$ on $L$.',
      hint2Formula: 'In right-angled $\\triangle PMQ$, $\\angle M = 90^\\circ$. The side opposite $90^\\circ$ is hypotenuse $PQ$.',
      hint3Step: 'Since $90^\\circ$ is the largest angle, $PQ > PM$. Thus perpendicular $PM$ is the shortest.',
    },
    solution: {
      steps: [
        { step: 'Let $P$ be external point, $PM \\perp L$, and $Q$ be any other point on $L$. $\\triangle PMQ$ is a right triangle with right angle at $M$.', markTag: '[0.5m]' },
        { step: 'Hypotenuse $PQ$ is opposite the largest angle ($90^\\circ$), so $PQ > PM$. Thus $PM$ is the shortest segment. R correctly explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Thinking oblique line segments can be shorter than the perpendicular.',
    },
  },
  {
    id: 'ch10_q03',
    chapterId: 10,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Easy',
    marks: 2,
    title: 'Base Angle in Isosceles Triangle',
    prompt: 'In $\\triangle ABC$, $AB = AC$. The side $BA$ is produced to $D$ such that exterior angle $\\angle CAD = 110^\\circ$. Find the measure of base angle $\\angle B$ (in degrees).',
    expectedAnswer: '55',
    acceptableAnswers: ['55', '55°', '55 degrees'],
    diagramSvgId: 'TriangleDiagram',
    hintLadder: {
      hint1Concept: 'Angles on a straight line sum to $180^\\circ$.',
      hint2Formula: 'Interior vertical angle $\\angle BAC = 180^\\circ - 110^\\circ = 70^\\circ$.',
      hint3Step: 'Since $AB = AC$, base angles $\\angle B = \\angle C = (180^\\circ - 70^\\circ)/2 = 55^\\circ$.',
    },
    solution: {
      steps: [
        { step: '$\\angle BAC + \\angle CAD = 180^\\circ$ (linear pair) $\\implies \\angle BAC = 180^\\circ - 110^\\circ = 70^\\circ$.', markTag: '[1m]' },
        { step: 'In $\\triangle ABC$, $AB = AC \\implies \\angle B = \\angle C$. Sum $= 180^\\circ \\implies 2\\angle B = 180^\\circ - 70^\\circ = 110^\\circ \\implies \\angle B = 55^\\circ$.', markTag: '[1m]' },
      ],
      finalAnswer: '55°',
      commonMistake: 'Equating base angle directly to exterior angle 110°.',
    },
  },
  {
    id: 'ch10_q04',
    chapterId: 10,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Side Opposite Greater Angle in Triangle',
    prompt: 'In $\\triangle ABC$, $\\angle A = 50^\\circ$ and $\\angle B = 60^\\circ$.\nFind the measure of $\\angle C$ and state which side of $\\triangle ABC$ is the **longest side**.\n(Answer with the two letters of the longest side, e.g. \`AB\`).',
    expectedAnswer: 'AB',
    acceptableAnswers: ['AB', 'side AB', 'BA'],
    hintLadder: {
      hint1Concept: 'Find the third angle $\\angle C$ using angle sum property first.',
      hint2Formula: '$\\angle C = 180^\\circ - (50^\\circ + 60^\\circ) = 70^\\circ$.',
      hint3Step: 'The longest side is strictly opposite the largest angle. Compare the three angles: $50^\\circ, 60^\\circ, 70^\\circ$.',
    },
    solution: {
      steps: [
        { step: 'Angle sum: $\\angle C = 180^\\circ - (50^\\circ + 60^\\circ) = 70^\\circ$.', markTag: '[1m]' },
        { step: 'Comparing angles: $\\angle C (70^\\circ) > \\angle B (60^\\circ) > \\angle A (50^\\circ)$.', markTag: '[1m]' },
        { step: 'By the Triangle Inequality Theorem, the side opposite the greatest angle is longest. The side opposite $\\angle C$ is side $AB$.', markTag: '[1m]' },
      ],
      finalAnswer: 'AB',
      commonMistake: 'Selecting $BC$ (opposite $\\angle A$) or $AC$ (opposite $\\angle B$) instead of $AB$.',
    },
  },
  {
    id: 'ch10_q05',
    chapterId: 10,
    unitId: 4,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Bisector of Vertical Angle',
    prompt: 'In an isosceles triangle $ABC$ with $AB = AC = 10\\text{ cm}$ and base $BC = 12\\text{ cm}$, the bisector of the vertical angle $\\angle A$ meets the base $BC$ at $D$.\n\n**(i)** What is the length of $BD$ (in cm)?\n**(ii)** Calculate the length of the altitude $AD$ (in cm).',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Length of BD (cm):',
        expectedAnswer: '6',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Length of AD (cm):',
        expectedAnswer: '8',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'In an isosceles triangle, the angle bisector of the vertical angle bisects the base perpendicularly.',
      hint2Formula: '$BD = BC / 2 = 12 / 2 = 6\\text{ cm}$ and $\\angle ADB = 90^\\circ$.',
      hint3Step: 'Apply Pythagoras theorem in right triangle $\\triangle ABD$: $AD = \\sqrt{AB^2 - BD^2} = \\sqrt{10^2 - 6^2} = \\sqrt{64} = 8$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): The vertical angle bisector of an isosceles triangle bisects the base at right angles. So $BD = \\frac{BC}{2} = \\frac{12}{2} = 6\\text{ cm}$.', markTag: '[2m]' },
        { step: 'Part (ii): In right triangle $\\triangle ABD$, by Pythagoras theorem: $AD = \\sqrt{AB^2 - BD^2} = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8\\text{ cm}$.', markTag: '[2m]' },
      ],
      finalAnswer: '(i) 6 cm, (ii) 8 cm',
      commonMistake: 'Adding $10^2 + 6^2$ instead of subtracting $10^2 - 6^2$ when finding the leg $AD$.',
    },
  },
  {
    id: 'ch10_q06',
    chapterId: 10,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Range of Third Side in Triangle',
    prompt: 'Two sides of a triangle are $7\\text{ cm}$ and $11\\text{ cm}$. How many different integer values can the third side take?',
    expectedAnswer: '13',
    hintLadder: {
      hint1Concept: 'Use the inequality: $|a - b| < x < a + b$.',
      hint2Formula: '$11 - 7 < x < 11 + 7 \\implies 4 < x < 18$.',
      hint3Step: 'The integers are $5, 6, 7, \\dots, 17$. Count: $17 - 5 + 1 = 13$.',
    },
    solution: {
      steps: [
        { step: 'By the triangle inequality: difference of two sides $< x <$ sum of two sides.', markTag: '[1m]' },
        { step: '$11 - 7 < x < 11 + 7 \\implies 4 < x < 18$.', markTag: '[1m]' },
        { step: 'Possible integer values are $5, 6, 7, \\dots, 17$. Total count $= 17 - 5 + 1 = 13$.', markTag: '[1m]' },
      ],
      finalAnswer: '13',
      commonMistake: 'Including 4 and 18, which would yield degenerate segments of zero area.',
    },
  },
];
