import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateSolutionRightTrianglesQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Single right triangle with 30°:
    // Given hypotenuse L, find opposite height = L * sin(30) = L / 2
    const L = rng.choice([8, 10, 12, 14, 16, 20, 24]);
    const height = L / 2;

    const prompt = `A ladder of length $${L}\\text{ m}$ is leaning against a vertical wall, making an angle of $30^\\circ$ with the level ground.\nFind the **height** up the wall that the ladder reaches (in metres).`;

    return {
      id: `gen_ch22_${rng.int(10000, 99999)}`,
      chapterId: 22,
      unitId: 7,
      title: 'Ladder Leaning on Wall with 30° Elevation',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${height}`,
      acceptableAnswers: [`${height}`, `${height} m`, `${height} metres`],
      diagramSvgId: 'RightTriangleDiagram',
      diagramData: {
        vertexA: 'A',
        vertexB: 'B',
        vertexC: 'C',
        hypotenuseLabel: `${L} m`,
        altitudeLabel: 'h = ?',
        angleLabel: '30°',
      },
      hintLadder: {
        hint1Concept: 'In the right triangle, height is opposite to the $30^\\circ$ angle and the ladder is the hypotenuse.',
        hint2Formula: '$\\sin(30^\\circ) = \\frac{\\text{Height}}{\\text{Hypotenuse}} = \\frac{h}{L}$.',
        hint3Step: `$\\frac{1}{2} = \\frac{h}{${L}} \\implies h = \\frac{${L}}{2} = ${height}\\text{ m}$.`,
      },
      solution: {
        steps: [
          { step: `Let the wall be $AB$, ground be $BC$, and ladder be $AC = ${L}\\text{ m}$. In right $\\triangle ABC$, $\\angle C = 30^\\circ$.`, markTag: '[0.5m]' },
          { step: `$\\sin(30^\\circ) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} = \\frac{AB}{AC}$.`, markTag: '[0.5m]' },
          { step: `$\\frac{1}{2} = \\frac{AB}{${L}} \\implies AB = \\frac{${L}}{2} = ${height}\\text{ m}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${height} m`,
        commonMistake: 'Using $\\cos(30^\\circ)$ instead of $\\sin(30^\\circ)$ for the opposite side.',
      },
      isGenerated: true,
      generatorId: 'ch22',
      generatorSeed: seed,
    };
  } else {
    // 45° angle shadow problem:
    // When angle of elevation is 45°, height = shadow length!
    const h = rng.choice([12, 15, 18, 20, 25, 30]);

    const prompt = `A vertical tree casts a shadow of length $${h}\\text{ m}$ on level ground when the angle of elevation of the sun is $45^\\circ$. Calculate the **height of the tree** (in metres).`;

    return {
      id: `gen_ch22_${rng.int(10000, 99999)}`,
      chapterId: 22,
      unitId: 7,
      title: 'Tree Height with 45° Sun Elevation',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${h}`,
      acceptableAnswers: [`${h}`, `${h} m`, `${h} metres`],
      diagramSvgId: 'RightTriangleDiagram',
      diagramData: {
        vertexA: 'A',
        vertexB: 'B',
        vertexC: 'C',
        baseLabel: `${h} m`,
        altitudeLabel: 'h = ?',
        angleLabel: '45°',
      },
      hintLadder: {
        hint1Concept: '$\\tan\\theta = \\frac{\\text{Height}}{\\text{Shadow Length}}$.',
        hint2Formula: '$\\tan(45^\\circ) = 1$.',
        hint3Step: `$\\frac{h}{${h}} = 1 \\implies h = ${h}\\text{ m}$.`,
      },
      solution: {
        steps: [
          { step: `In right $\\triangle ABC$, $\\tan(45^\\circ) = \\frac{\\text{Tree Height}}{\\text{Shadow Length}}$.`, markTag: '[1m]' },
          { step: `Since $\\tan(45^\\circ) = 1$, $\\text{Height} = \\text{Shadow Length} = ${h}\\text{ m}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${h} m`,
        commonMistake: 'Multiplying by $\\sqrt{3}$ or $1/\\sqrt{3}$ instead of recognizing $\\tan 45^\\circ = 1$.',
      },
      isGenerated: true,
      generatorId: 'ch22',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh22: Question[] = [
  {
    id: 'ch22_q01',
    chapterId: 22,
    unitId: 7,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Ratio of Height to Shadow at 45° Elevation',
    prompt: 'When the angle of elevation of the sun is $45^\\circ$, the ratio of the height of a vertical pole to the length of its shadow is:',
    mcqOptions: [
      { id: 'A', text: '$1 : 1$', explanation: 'Correct: $\\tan 45^\\circ = 1 = \\text{Height} / \\text{Shadow} \\implies \\text{Height} = \\text{Shadow}$.' },
      { id: 'B', text: '$1 : \\sqrt{3}$', explanation: 'Incorrect: That is for $30^\\circ$.' },
      { id: 'C', text: '$\\sqrt{3} : 1$', explanation: 'Incorrect: That is for $60^\\circ$.' },
      { id: 'D', text: '$1 : 2$', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Recall $\\tan\\theta = \\text{Height} / \\text{Shadow}$.',
      hint2Formula: '$\\tan(45^\\circ) = 1$.',
      hint3Step: '$\\text{Ratio} = 1 / 1 = 1 : 1$.',
    },
    solution: {
      steps: [
        { step: '$\\tan(45^\\circ) = \\frac{\\text{Height}}{\\text{Shadow}} = 1$. Therefore $\\text{Height} = \\text{Shadow}$, ratio is $1 : 1$.', markTag: '[1m]' },
      ],
      finalAnswer: 'A: 1 : 1',
      commonMistake: 'Confusing $45^\\circ$ with $30^\\circ$ or $60^\\circ$.',
    },
  },
  {
    id: 'ch22_q02',
    chapterId: 22,
    unitId: 7,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Angle of Elevation vs Depression',
    prompt: '**Assertion (A)**: The angle of elevation of an object as seen by an observer on the ground is equal to the angle of depression of the observer as seen from the object.\n\n**Reason (R)**: The horizontal line of sight at the observer and the horizontal line of sight at the object are parallel, making the angle of elevation and angle of depression alternate interior angles.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Draw horizontal lines through the observer and the elevated object.',
      hint2Formula: 'The line of sight acts as a transversal between the two parallel horizontal lines.',
      hint3Step: 'Alternate interior angles between parallel lines are equal.',
    },
    solution: {
      steps: [
        { step: 'Both horizontal sightlines are parallel to the level ground.', markTag: '[0.5m]' },
        { step: 'The line of sight is a transversal, so angle of elevation $=$ angle of depression by alternate interior angles. Both A and R are True and R correctly explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Measuring the angle of depression from the vertical wall instead of the horizontal line of sight.',
    },
  },
  {
    id: 'ch22_q03',
    chapterId: 22,
    unitId: 7,
    type: 'numerical',
    difficulty: 'Easy',
    marks: 2,
    title: 'Solving Right Triangle for Unknown Side',
    prompt: 'In a right-angled $\\triangle ABC$, $\\angle B = 90^\\circ$ and $\\angle C = 30^\\circ$. If the hypotenuse $AC = 20\\text{ cm}$, find the length of the side $AB$ (in cm).',
    expectedAnswer: '10',
    acceptableAnswers: ['10', '10 cm'],
    diagramSvgId: 'RightTriangleDiagram',
    hintLadder: {
      hint1Concept: '$\\sin C = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} = \\frac{AB}{AC}$.',
      hint2Formula: '$\\sin(30^\\circ) = \\frac{1}{2}$.',
      hint3Step: '$\\frac{1}{2} = \\frac{AB}{20} \\implies AB = 10\\text{ cm}$.',
    },
    solution: {
      steps: [
        { step: 'In right $\\triangle ABC$, $\\sin C = \\frac{AB}{AC}$.', markTag: '[1m]' },
        { step: '$\\sin(30^\\circ) = \\frac{1}{2} = \\frac{AB}{20} \\implies AB = \\frac{20}{2} = 10\\text{ cm}$.', markTag: '[1m]' },
      ],
      finalAnswer: '10 cm',
      commonMistake: 'Using $\\cos 30^\\circ$ which gives $10\\sqrt{3}$.',
    },
  },
  {
    id: 'ch22_q04',
    chapterId: 22,
    unitId: 7,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Tower Height from Distance at 60° Elevation',
    prompt: 'From a point on the ground $30\\text{ m}$ away from the foot of a vertical tower, the angle of elevation of the top of the tower is $60^\\circ$. Find the height of the tower (take $\\sqrt{3} = 1.732$). Give your answer to 2 decimal places.',
    expectedAnswer: '51.96',
    tolerance: 0.1,
    acceptableAnswers: ['30*sqrt(3)', '30\\sqrt{3}', '51.96', '51.96 m'],
    nepTags: ['Life Skills'],
    hintLadder: {
      hint1Concept: '$\\tan\\theta = \\frac{\\text{Height}}{\\text{Distance}}$.',
      hint2Formula: '$\\tan(60^\\circ) = \\frac{h}{30}$.',
      hint3Step: '$\\sqrt{3} = \\frac{h}{30} \\implies h = 30\\sqrt{3} = 30 \\times 1.732 = 51.96\\text{ m}$.',
    },
    solution: {
      steps: [
        { step: 'Let tower height be $h\\text{ m}$. In right triangle: $\\tan(60^\\circ) = \\frac{h}{30}$.', markTag: '[1m]' },
        { step: '$\\sqrt{3} = \\frac{h}{30} \\implies h = 30\\sqrt{3}\\text{ m}$.', markTag: '[1m]' },
        { step: '$h = 30 \\times 1.732 = 51.96\\text{ m}$.', markTag: '[1m]' },
      ],
      finalAnswer: '51.96 m',
      commonMistake: 'Dividing 30 by $\\sqrt{3}$ instead of multiplying.',
    },
  },
  {
    id: 'ch22_q05',
    chapterId: 22,
    unitId: 7,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Ladder Leaning on Wall',
    prompt: 'A ladder $10\\text{ m}$ long reaches a window $8\\text{ m}$ above the ground on one side of a street.\n\n**(i)** How far is the foot of the ladder from the base of the wall (in metres)?\n**(ii)** If the ladder is turned to the other side of the street without moving its foot, it reaches a window $6\\text{ m}$ high. What is the total width of the street (in metres)?',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Distance from base of first wall (m):',
        expectedAnswer: '6',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Total width of the street (m):',
        expectedAnswer: '14',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Apply Pythagoras theorem to find the ground distance for both sides.',
      hint2Formula: 'Side 1: $d_1 = \\sqrt{10^2 - 8^2} = \\sqrt{36} = 6\\text{ m}$.',
      hint3Step: 'Side 2: $d_2 = \\sqrt{10^2 - 6^2} = \\sqrt{64} = 8\\text{ m}$. Total street width $= d_1 + d_2 = 6 + 8 = 14\\text{ m}$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): For first wall, distance of foot from wall $d_1 = \\sqrt{10^2 - 8^2} = \\sqrt{100 - 64} = \\sqrt{36} = 6\\text{ m}$.', markTag: '[2m]' },
        { step: 'Part (ii): For second wall, distance of foot from wall $d_2 = \\sqrt{10^2 - 6^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8\\text{ m}$.', markTag: '[1m]' },
        { step: 'Total width of street $= d_1 + d_2 = 6 + 8 = 14\\text{ m}$.', markTag: '[1m]' },
      ],
      finalAnswer: '(i) 6 m, (ii) 14 m',
      commonMistake: 'Assuming the foot of the ladder is in the exact middle of the street.',
    },
  },
  {
    id: 'ch22_q06',
    chapterId: 22,
    unitId: 7,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Finding Sun Elevation from Shadow and Pole',
    prompt: 'A vertical pole of height $20\\text{ m}$ casts a shadow of length $20\\sqrt{3}\\text{ m}$ on level ground. Find the **angle of elevation of the sun** (in degrees).',
    expectedAnswer: '30',
    acceptableAnswers: ['30', '30°', '30 degrees'],
    hintLadder: {
      hint1Concept: '$\\tan\\theta = \\frac{\\text{Height}}{\\text{Shadow Length}}$.',
      hint2Formula: '$\\tan\\theta = \\frac{20}{20\\sqrt{3}} = \\frac{1}{\\sqrt{3}}$.',
      hint3Step: 'Since $\\tan(30^\\circ) = \\frac{1}{\\sqrt{3}}$, the angle of elevation is $30^\\circ$.',
    },
    solution: {
      steps: [
        { step: 'Let angle of elevation be $\\theta$. $\\tan\\theta = \\frac{\\text{Height}}{\\text{Shadow}} = \\frac{20}{20\\sqrt{3}} = \\frac{1}{\\sqrt{3}}$.', markTag: '[1.5m]' },
        { step: 'Since $\\tan(30^\\circ) = \\frac{1}{\\sqrt{3}}$, we have $\\theta = 30^\\circ$.', markTag: '[1.5m]' },
      ],
      finalAnswer: '30°',
      commonMistake: 'Writing $60^\\circ$ by inverting the ratio to $\\sqrt{3}$.',
    },
  },
];
