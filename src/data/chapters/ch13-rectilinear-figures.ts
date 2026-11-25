import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateRectilinearFiguresQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Polygon interior/exterior angle calculation
    const n = rng.choice([5, 6, 8, 9, 10, 12]);
    const extAngle = 360 / n;
    const intAngle = 180 - extAngle;

    const askExterior = rng.choice([true, false]);
    const prompt = askExterior
      ? `Find the measure of each **exterior angle** (in degrees) of a regular polygon having ${n} sides.`
      : `Find the measure of each **interior angle** (in degrees) of a regular polygon having ${n} sides.`;

    const expectedAnswer = askExterior ? `${extAngle}` : `${intAngle}`;

    return {
      id: `gen_ch13_${rng.int(10000, 99999)}`,
      chapterId: 13,
      unitId: 4,
      title: askExterior ? 'Regular Polygon Exterior Angle' : 'Regular Polygon Interior Angle',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer,
      acceptableAnswers: [`${expectedAnswer}`, `${expectedAnswer}°`, `${expectedAnswer} degrees`],
      hintLadder: {
        hint1Concept: 'Sum of all exterior angles of any convex polygon is $360^\\circ$.',
        hint2Formula: askExterior
          ? '$\\text{Each exterior angle} = \\frac{360^\\circ}{n}$.'
          : '$\\text{Each interior angle} = 180^\\circ - \\text{exterior angle} = 180^\\circ - \\frac{360^\\circ}{n}$.',
        hint3Step: `Substitute $n = ${n}$: ${askExterior ? `360 / ${n} = ${extAngle}^\\circ` : `180 - ${extAngle} = ${intAngle}^\\circ`}.`,
      },
      solution: {
        steps: [
          { step: `For regular polygon with $n = ${n}$ sides: sum of all exterior angles is $360^\\circ$.`, markTag: '[1m]' },
          { step: askExterior
            ? `Each exterior angle $= \\frac{360^\\circ}{${n}} = ${extAngle}^\\circ$.`
            : `Each exterior angle $= \\frac{360^\\circ}{${n}} = ${extAngle}^\\circ$. Therefore each interior angle $= 180^\\circ - ${extAngle}^\\circ = ${intAngle}^\\circ$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${expectedAnswer}°`,
        commonMistake: 'Using $(n-2) \\times 180$ for sum of exterior angles instead of $360$.',
      },
      isGenerated: true,
      generatorId: 'ch13',
      generatorSeed: seed,
    };
  } else {
    // Parallelogram adjacent angles:
    // Ratio of adjacent angles is r1:r2 where r1 + r2 = divisor of 180
    const ratios = [
      { r1: 1, r2: 2 },
      { r1: 2, r3: 3, r2: 3 },
      { r1: 1, r2: 3 },
      { r1: 4, r2: 5 },
      { r1: 7, r2: 11 },
    ];
    const r = rng.choice(ratios);
    const unitPart = 180 / (r.r1 + r.r2);
    const angle1 = r.r1 * unitPart;
    const angle2 = r.r2 * unitPart;
    const smallerAngle = Math.min(angle1, angle2);

    const prompt = `Two adjacent angles of a parallelogram are in the ratio $${r.r1} : ${r.r2}$. Find the measure of the **smaller angle** (in degrees).`;

    return {
      id: `gen_ch13_${rng.int(10000, 99999)}`,
      chapterId: 13,
      unitId: 4,
      title: 'Parallelogram Adjacent Angles Ratio',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${smallerAngle}`,
      acceptableAnswers: [`${smallerAngle}`, `${smallerAngle}°`, `${smallerAngle} degrees`],
      diagramSvgId: 'ParallelogramDiagram',
      hintLadder: {
        hint1Concept: 'Adjacent angles of a parallelogram are supplementary (sum to $180^\\circ$).',
        hint2Formula: `$${r.r1}x + ${r.r2}x = 180^\\circ$.`,
        hint3Step: `$${r.r1 + r.r2}x = 180^\\circ \\implies x = ${unitPart}^\\circ$. Smaller angle $= ${r.r1} \\times ${unitPart}^\\circ = ${smallerAngle}^\\circ$.`,
      },
      solution: {
        steps: [
          { step: `Adjacent angles in a parallelogram are interior consecutive angles between parallel lines, so their sum is $180^\\circ$.`, markTag: '[1m]' },
          { step: `Let the angles be $${r.r1}x$ and $${r.r2}x$. $${r.r1}x + ${r.r2}x = 180^\\circ \\implies ${r.r1 + r.r2}x = 180^\\circ \\implies x = ${unitPart}^\\circ$.`, markTag: '[0.5m]' },
          { step: `Smaller angle $= ${r.r1} \\times ${unitPart}^\\circ = ${smallerAngle}^\\circ$.`, markTag: '[0.5m]' },
        ],
        finalAnswer: `${smallerAngle}°`,
        commonMistake: 'Equating adjacent angles to 360° or equating them to each other (only opposite angles are equal).',
      },
      isGenerated: true,
      generatorId: 'ch13',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh13: Question[] = [
  {
    id: 'ch13_q01',
    chapterId: 13,
    unitId: 4,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Diagonals of Special Quadrilaterals',
    prompt: 'In which of the following quadrilaterals are the diagonals **equal** and **perpendicular bisectors** of each other?',
    mcqOptions: [
      { id: 'A', text: 'Square', explanation: 'Correct: In a square, diagonals are both equal in length and perpendicular bisectors of each other.' },
      { id: 'B', text: 'Rhombus', explanation: 'Incorrect: In a rhombus, diagonals are perpendicular bisectors, but generally NOT equal in length.' },
      { id: 'C', text: 'Rectangle', explanation: 'Incorrect: In a rectangle, diagonals are equal, but generally NOT perpendicular.' },
      { id: 'D', text: 'Parallelogram', explanation: 'Incorrect: Diagonals are neither necessarily equal nor perpendicular.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Review the diagonal properties of rhombuses, rectangles, and squares.',
      hint2Formula: 'Rectangle has equal diagonals. Rhombus has perpendicular diagonals.',
      hint3Step: 'A square has both properties: equal AND perpendicular.',
    },
    solution: {
      steps: [
        { step: 'A square inherits the equal diagonal property of a rectangle and the perpendicular bisector property of a rhombus.', markTag: '[1m]' },
      ],
      finalAnswer: 'A: Square',
      commonMistake: 'Selecting rhombus (diagonals are perpendicular, but not equal in a general rhombus).',
    },
  },
  {
    id: 'ch13_q02',
    chapterId: 13,
    unitId: 4,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Polygon Exterior Angles',
    prompt: '**Assertion (A)**: As the number of sides $n$ of a regular polygon increases, the measure of each interior angle increases.\n\n**Reason (R)**: The sum of all exterior angles remains constant at $360^\\circ$, so each exterior angle $\\frac{360^\\circ}{n}$ decreases as $n$ increases, making each interior angle $180^\\circ - \\frac{360^\\circ}{n}$ larger.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Look at the relation $\\text{Interior} + \\text{Exterior} = 180^\\circ$.',
      hint2Formula: '$\\text{Exterior} = 360^\\circ / n$. For $n=3$, ext $= 120^\\circ, \\text{int} = 60^\\circ$. For $n=4$, ext $= 90^\\circ, \\text{int} = 90^\\circ$.',
      hint3Step: 'As $n$ increases, exterior angle decreases, so interior angle increases.',
    },
    solution: {
      steps: [
        { step: 'Each interior angle $= 180^\\circ - \\frac{360^\\circ}{n}$. As $n$ increases, $\\frac{360^\\circ}{n}$ strictly decreases.', markTag: '[0.5m]' },
        { step: 'Subtracting a smaller number from $180^\\circ$ yields a larger interior angle. Both A and R are True and R correctly explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Thinking interior angle sum and individual interior angle behave in opposite ways.',
    },
  },
  {
    id: 'ch13_q03',
    chapterId: 13,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Finding Number of Sides of Regular Polygon',
    prompt: 'Each interior angle of a regular polygon is $144^\\circ$. Find the **number of sides** of the polygon.',
    expectedAnswer: '10',
    hintLadder: {
      hint1Concept: 'Find the exterior angle first using $\\text{Exterior} = 180^\\circ - \\text{Interior}$.',
      hint2Formula: '$\\text{Exterior angle} = 180^\\circ - 144^\\circ = 36^\\circ$.',
      hint3Step: '$n = \\frac{360^\\circ}{\\text{Exterior angle}} = \\frac{360^\\circ}{36^\\circ} = 10$.',
    },
    solution: {
      steps: [
        { step: 'Each exterior angle $= 180^\\circ - 144^\\circ = 36^\\circ$.', markTag: '[1m]' },
        { step: 'Sum of all exterior angles of any regular polygon is $360^\\circ$.', markTag: '[1m]' },
        { step: 'Number of sides $n = \\frac{360^\\circ}{36^\\circ} = 10$.', markTag: '[1m]' },
      ],
      finalAnswer: '10',
      commonMistake: 'Setting up $(n-2) \\times 180 = 144$ instead of $\\frac{(n-2) \\times 180}{n} = 144$.',
    },
  },
  {
    id: 'ch13_q04',
    chapterId: 13,
    unitId: 4,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Properties of Rhombus Angles',
    prompt: 'In a rhombus $ABCD$, the diagonals intersect at $O$. If $\\angle OAB = 35^\\circ$:\n\n**(i)** What is the measure of $\\angle AOB$ in degrees?\n**(ii)** What is the measure of $\\angle ABC$ in degrees?',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Measure of ∠AOB (degrees):',
        expectedAnswer: '90',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Measure of ∠ABC (degrees):',
        expectedAnswer: '110',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Diagonals of a rhombus intersect at right angles ($90^\\circ$).',
      hint2Formula: 'In right $\\triangle AOB$, $\\angle ABO = 90^\\circ - 35^\\circ = 55^\\circ$.',
      hint3Step: 'Diagonals bisect the vertex angles of a rhombus. Therefore $\\angle ABC = 2 \\times 55^\\circ = 110^\\circ$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): Diagonals of a rhombus are perpendicular to each other. Therefore $\\angle AOB = 90^\\circ$.', markTag: '[2m]' },
        { step: 'Part (ii): In right $\\triangle AOB$, $\\angle ABO = 90^\\circ - \\angle OAB = 90^\\circ - 35^\\circ = 55^\\circ$.', markTag: '[1m]' },
        { step: 'Diagonal $BD$ bisects $\\angle ABC$, so $\\angle ABC = 2 \\times 55^\\circ = 110^\\circ$.', markTag: '[1m]' },
      ],
      finalAnswer: '(i) 90°, (ii) 110°',
      commonMistake: 'Reporting $55^\\circ$ instead of doubling for the full angle $\\angle ABC$.',
    },
  },
  {
    id: 'ch13_q05',
    chapterId: 13,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Trapezium Consecutive Interior Angles',
    prompt: 'In a trapezium $ABCD$, $AB \\parallel DC$. If $\\angle A = 55^\\circ$ and $\\angle B = 70^\\circ$, find the measure of $\\angle D$ (in degrees).',
    expectedAnswer: '125',
    acceptableAnswers: ['125', '125°'],
    hintLadder: {
      hint1Concept: 'Identify which sides are parallel: $AB \\parallel DC$.',
      hint2Formula: 'Consecutive interior angles along transversal $AD$ sum to $180^\\circ$: $\\angle A + \\angle D = 180^\\circ$.',
      hint3Step: '$\\angle D = 180^\\circ - 55^\\circ = 125^\\circ$.',
    },
    solution: {
      steps: [
        { step: 'Since $AB \\parallel DC$ and $AD$ is a transversal, consecutive interior angles are supplementary: $\\angle A + \\angle D = 180^\\circ$.', markTag: '[1.5m]' },
        { step: '$\\angle D = 180^\\circ - 55^\\circ = 125^\\circ$.', markTag: '[1.5m]' },
      ],
      finalAnswer: '125°',
      commonMistake: 'Pairing $\\angle A$ with $\\angle B$ or $\\angle C$ instead of $\\angle D$.',
    },
  },
  {
    id: 'ch13_q06',
    chapterId: 13,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Polygon with Interior Angle Sum',
    prompt: 'The sum of the interior angles of a polygon is $1620^\\circ$. How many sides does the polygon have?',
    expectedAnswer: '11',
    hintLadder: {
      hint1Concept: 'Apply the formula for sum of interior angles: $(n - 2) \\times 180^\\circ$.',
      hint2Formula: '$(n - 2) \\times 180 = 1620$.',
      hint3Step: '$n - 2 = 1620 / 180 = 9 \\implies n = 9 + 2 = 11$.',
    },
    solution: {
      steps: [
        { step: 'Formula: $(n - 2) \\times 180^\\circ = 1620^\\circ$.', markTag: '[1m]' },
        { step: '$n - 2 = \\frac{1620}{180} = 9$.', markTag: '[1m]' },
        { step: '$n = 9 + 2 = 11$. The polygon has 11 sides.', markTag: '[1m]' },
      ],
      finalAnswer: '11',
      commonMistake: 'Forgetting to add 2 after dividing 1620 by 180.',
    },
  },
];
