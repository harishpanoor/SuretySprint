import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateDistanceFormulaQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Distance between two points with integer distance:
    // dx and dy form a Pythagorean triplet like (3, 4, 5), (6, 8, 10), (5, 12, 13)
    const triplets = [
      { dx: 3, dy: 4, d: 5 },
      { dx: 4, dy: 3, d: 5 },
      { dx: 6, dy: 8, d: 10 },
      { dx: 8, dy: 6, d: 10 },
      { dx: 5, dy: 12, d: 13 },
      { dx: 12, dy: 5, d: 13 },
      { dx: 9, dy: 12, d: 15 },
    ];
    const trip = rng.choice(triplets);

    const x1 = rng.int(-4, 3);
    const y1 = rng.int(-4, 3);
    // Signs can be positive or negative
    const sx = rng.choice([1, -1]);
    const sy = rng.choice([1, -1]);
    const x2 = x1 + sx * trip.dx;
    const y2 = y1 + sy * trip.dy;

    const prompt = `Calculate the **distance** between the points $A(${x1}, ${y1})$ and $B(${x2}, ${y2})$ on the Cartesian plane.`;

    return {
      id: `gen_ch18_${rng.int(10000, 99999)}`,
      chapterId: 18,
      unitId: 8,
      title: 'Distance Between Two Cartesian Points',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${trip.d}`,
      diagramSvgId: 'CoordinateGridSVG',
      diagramData: {
        points: [
          { x: x1, y: y1, label: `A(${x1}, ${y1})` },
          { x: x2, y: y2, label: `B(${x2}, ${y2})` },
        ],
      },
      hintLadder: {
        hint1Concept: 'Apply the standard Distance Formula between two points.',
        hint2Formula: '$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.',
        hint3Step: `Difference in $x$: $(${x2} - (${x1})) = ${x2 - x1}$. Difference in $y$: $(${y2} - (${y1})) = ${y2 - y1}$. Square and sum them.`,
      },
      solution: {
        steps: [
          { step: `Distance Formula: $AB = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.`, markTag: '[0.5m]' },
          { step: `Substitute points: $AB = \\sqrt{(${x2} - (${x1}))^2 + (${y2} - (${y1}))^2} = \\sqrt{(${x2 - x1})^2 + (${y2 - y1})^2}$.`, markTag: '[1m]' },
          { step: `$AB = \\sqrt{${(x2 - x1)**2} + ${(y2 - y1)**2}} = \\sqrt{${trip.d * trip.d}} = ${trip.d}\\text{ units}$.`, markTag: '[0.5m]' },
        ],
        finalAnswer: `${trip.d} units`,
        commonMistake: 'Making a sign error when subtracting negative coordinates (e.g. 2 - (-3) = 5, not -1).',
      },
      isGenerated: true,
      generatorId: 'ch18',
      generatorSeed: seed,
    };
  } else {
    // Equidistant point on X-axis: P(x, 0) equidistant from A(x1, y1) and B(x2, y2)
    // PA^2 = PB^2 -> (x - x1)^2 + y1^2 = (x - x2)^2 + y2^2
    // -2 x1 x + x1^2 + y1^2 = -2 x2 x + x2^2 + y2^2
    // 2(x2 - x1) x = (x2^2 + y2^2) - (x1^2 + y1^2)
    // Choose clean points:
    const cases = [
      { A: [2, -5], B: [-2, 9], ansX: -7 },
      { A: [5, 4], B: [-1, 6], ansX: 2 },
      { A: [3, 2], B: [-5, -2], ansX: -2 },
      { A: [7, 6], B: [-3, 4], ansX: 3 },
    ];
    const c = rng.choice(cases);

    const prompt = `Find the point on the **X-axis** which is equidistant from the points $A(${c.A[0]}, ${c.A[1]})$ and $B(${c.B[0]}, ${c.B[1]})$. State your answer as an ordered pair \`(x, 0)\`.`;

    return {
      id: `gen_ch18_${rng.int(10000, 99999)}`,
      chapterId: 18,
      unitId: 8,
      title: 'Equidistant Point on X-Axis',
      type: 'expression',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `(${c.ansX}, 0)`,
      acceptableAnswers: [
        `(${c.ansX}, 0)`,
        `${c.ansX}, 0`,
        `(${c.ansX},0)`,
        `x = ${c.ansX}, y = 0`,
      ],
      hintLadder: {
        hint1Concept: 'Any point on the X-axis has $y = 0$, so let the point be $P(x, 0)$.',
        hint2Formula: 'Equidistant means $PA = PB \\implies PA^2 = PB^2$.',
        hint3Step: `$(x - ${c.A[0]})^2 + (0 - (${c.A[1]}))^2 = (x - (${c.B[0]}))^2 + (0 - ${c.B[1]})^2$. Expand and solve for $x$.`,
      },
      solution: {
        steps: [
          { step: `Let point on X-axis be $P(x, 0)$. Since $P$ is equidistant from $A$ and $B$, $PA^2 = PB^2$.`, markTag: '[1m]' },
          { step: `$(x - ${c.A[0]})^2 + (0 - (${c.A[1]}))^2 = (x - (${c.B[0]}))^2 + (0 - ${c.B[1]})^2$.`, markTag: '[1m]' },
          { step: `Expanding both sides and cancelling $x^2$ gives $x = ${c.ansX}$. Thus $P = (${c.ansX}, 0)$.`, markTag: '[1m]' },
        ],
        finalAnswer: `(${c.ansX}, 0)`,
        commonMistake: 'Letting the point on the X-axis be $(0, y)$ instead of $(x, 0)$.',
      },
      isGenerated: true,
      generatorId: 'ch18',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh18: Question[] = [
  {
    id: 'ch18_q01',
    chapterId: 18,
    unitId: 8,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Distance of Point from Origin',
    prompt: 'The distance of the point $P(-6, 8)$ from the origin $(0, 0)$ is:',
    mcqOptions: [
      { id: 'A', text: '$10\\text{ units}$', explanation: 'Correct: $\\sqrt{(-6)^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$.' },
      { id: 'B', text: '$2\\text{ units}$', explanation: 'Incorrect: $8 - 6 = 2$, which is not Euclidean distance.' },
      { id: 'C', text: '$14\\text{ units}$', explanation: 'Incorrect: $6 + 8 = 14$.' },
      { id: 'D', text: '$-10\\text{ units}$', explanation: 'Incorrect: distance is always non-negative.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Distance from origin formula: $d = \\sqrt{x^2 + y^2}$.',
      hint2Formula: '$d = \\sqrt{(-6)^2 + 8^2}$.',
      hint3Step: '$\\sqrt{36 + 64} = \\sqrt{100} = 10$.',
    },
    solution: {
      steps: [
        { step: 'Distance from origin: $d = \\sqrt{x^2 + y^2} = \\sqrt{(-6)^2 + (8)^2}$.', markTag: '[0.5m]' },
        { step: '$= \\sqrt{36 + 64} = \\sqrt{100} = 10\\text{ units}$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: 10 units',
      commonMistake: 'Squaring negative number as negative, writing $-36 + 64 = 28$.',
    },
  },
  {
    id: 'ch18_q02',
    chapterId: 18,
    unitId: 8,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Collinearity of Three Points',
    prompt: '**Assertion (A)**: Three points $A, B, C$ are collinear if and only if $AB + BC = AC$ (where $B$ lies between $A$ and $C$).\n\n**Reason (R)**: If three points do not lie on a single straight line, they form a triangle where the Triangle Inequality $AB + BC > AC$ must strictly hold.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Think of collinearity as the degenerate boundary case of the triangle inequality.',
      hint2Formula: 'If non-collinear, $AB + BC > AC$. When flattened into a line, equality $AB + BC = AC$ is achieved.',
      hint3Step: 'Reason explains the geometric basis of collinear distance check.',
    },
    solution: {
      steps: [
        { step: 'Points are collinear if the distance between outer points equals sum of distances of adjacent segments ($AB + BC = AC$). Assertion is True.', markTag: '[0.5m]' },
        { step: 'Reason accurately states that non-collinear points satisfy strict triangle inequality ($AB + BC > AC$). Reason is True and correctly explains Assertion.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Thinking collinearity can be tested by comparing coordinates directly without distances or slopes.',
    },
  },
  {
    id: 'ch18_q03',
    chapterId: 18,
    unitId: 8,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Finding Unknown Coordinate Given Distance',
    prompt: 'Find the positive value of $y$ such that the distance between $P(2, -3)$ and $Q(10, y)$ is $10\\text{ units}$.',
    expectedAnswer: '3',
    hintLadder: {
      hint1Concept: 'Use the distance formula: $PQ^2 = (10 - 2)^2 + (y - (-3))^2$.',
      hint2Formula: '$10^2 = 8^2 + (y + 3)^2 \\implies 100 = 64 + (y + 3)^2$.',
      hint3Step: '$(y + 3)^2 = 36 \\implies y + 3 = 6$ (for positive $y$) $\\implies y = 3$.',
    },
    solution: {
      steps: [
        { step: '$PQ^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2 \\implies 10^2 = (10 - 2)^2 + (y - (-3))^2$.', markTag: '[1m]' },
        { step: '$100 = 8^2 + (y + 3)^2 = 64 + (y + 3)^2 \\implies (y + 3)^2 = 36$.', markTag: '[1m]' },
        { step: 'Taking square root: $y + 3 = \\pm 6$. For positive $y$: $y = 6 - 3 = 3$.', markTag: '[1m]' },
      ],
      finalAnswer: '3',
      commonMistake: 'Writing $(y - 3)^2$ instead of $(y - (-3))^2 = (y + 3)^2$.',
    },
  },
  {
    id: 'ch18_q04',
    chapterId: 18,
    unitId: 8,
    type: 'expression',
    difficulty: 'Standard',
    marks: 3,
    title: 'Identifying Triangle Type Using Distance Formula',
    prompt: 'The vertices of a triangle are $A(0, 0), B(3, 0)$, and $C(0, 4)$. Using the distance formula, classify the triangle as \`scalene\`, \`isosceles\`, \`equilateral\`, or \`right-angled scalene\`.',
    expectedAnswer: 'right-angled scalene',
    acceptableAnswers: [
      'right-angled scalene',
      'right angled scalene',
      'right-angled',
      'right angled',
      'scalene right',
    ],
    hintLadder: {
      hint1Concept: 'Compute lengths $AB, BC, CA$ using distance formula.',
      hint2Formula: '$AB = 3$, $AC = 4$, $BC = \\sqrt{3^2 + 4^2} = 5$.',
      hint3Step: 'Sides are $3, 4, 5$ (all unequal: scalene) and $3^2 + 4^2 = 5^2$ (Pythagoras holds: right-angled).',
    },
    solution: {
      steps: [
        { step: '$AB = \\sqrt{(3-0)^2 + 0^2} = 3$. $AC = \\sqrt{0^2 + (4-0)^2} = 4$.', markTag: '[1m]' },
        { step: '$BC = \\sqrt{(3-0)^2 + (0-4)^2} = \\sqrt{9 + 16} = 5$.', markTag: '[1m]' },
        { step: 'Since $3^2 + 4^2 = 5^2$ ($AB^2 + AC^2 = BC^2$) and all sides are distinct, it is a right-angled scalene triangle.', markTag: '[1m]' },
      ],
      finalAnswer: 'Right-angled scalene',
      commonMistake: 'Mentioning only scalene without recognizing the $90^\\circ$ right angle.',
    },
  },
  {
    id: 'ch18_q05',
    chapterId: 18,
    unitId: 8,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Proving an Isosceles Triangle',
    prompt: 'The coordinates of the vertices of $\\triangle ABC$ are $A(5, -2), B(6, 4)$, and $C(7, -2)$:\n\n**(i)** Find the length of side $AB$.\n**(ii)** Find the length of side $AC$.\n**(iii)** Is $\\triangle ABC$ an isosceles triangle? (Enter \`Yes\` or \`No\`)',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Length of AB (exact or decimal to 2 d.p.):',
        expectedAnswer: '6.08',
        tolerance: 0.05,
        acceptableAnswers: ['sqrt(37)', '\\sqrt{37}', '6.08', '6.082'],
        marks: 1.5,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Length of AC:',
        expectedAnswer: '2',
        marks: 1.5,
      },
      {
        id: 'iii',
        partLabel: '(iii)',
        prompt: 'Is it isosceles? (Yes/No):',
        expectedAnswer: 'Yes',
        acceptableAnswers: ['yes', 'Yes', 'YES'],
        marks: 1,
      },
    ],
    hintLadder: {
      hint1Concept: 'Compute $AB = \\sqrt{(6-5)^2 + (4-(-2))^2} = \\sqrt{1 + 36} = \\sqrt{37} \\approx 6.08$.',
      hint2Formula: '$BC = \\sqrt{(7-6)^2 + (-2-4)^2} = \\sqrt{1 + 36} = \\sqrt{37}$. $AC = \\sqrt{(7-5)^2 + 0^2} = 2$.',
      hint3Step: 'Since $AB = BC = \\sqrt{37}$, two sides are equal, so it is an isosceles triangle.',
    },
    solution: {
      steps: [
        { step: 'Part (i): $AB = \\sqrt{(6-5)^2 + (4 - (-2))^2} = \\sqrt{1^2 + 6^2} = \\sqrt{37} \\approx 6.08$.', markTag: '[1.5m]' },
        { step: 'Part (ii): $AC = \\sqrt{(7-5)^2 + (-2 - (-2))^2} = \\sqrt{2^2 + 0} = 2$.', markTag: '[1.5m]' },
        { step: 'Part (iii): Also $BC = \\sqrt{(7-6)^2 + (-2-4)^2} = \\sqrt{1 + 36} = \\sqrt{37}$. Since $AB = BC = \\sqrt{37}$, $\\triangle ABC$ is isosceles (Yes).', markTag: '[1m]' },
      ],
      finalAnswer: '(i) √37 ≈ 6.08, (ii) 2, (iii) Yes',
      commonMistake: 'Checking only $AB$ and $AC$ without computing $BC$, incorrectly concluding it is not isosceles.',
    },
  },
  {
    id: 'ch18_q06',
    chapterId: 18,
    unitId: 8,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Radius of Circle Given Centre and Boundary Point',
    prompt: 'A circle with centre $C(2, -3)$ passes through the point $P(5, 1)$ on its circumference. Find the **diameter of the circle** (in units).',
    expectedAnswer: '10',
    hintLadder: {
      hint1Concept: 'The distance between centre $C$ and circumference point $P$ is the radius $r$.',
      hint2Formula: '$r = \\sqrt{(5 - 2)^2 + (1 - (-3))^2} = \\sqrt{3^2 + 4^2} = 5$.',
      hint3Step: 'Diameter $= 2r = 2 \\times 5 = 10\\text{ units}$.',
    },
    solution: {
      steps: [
        { step: 'Radius $r = CP = \\sqrt{(5-2)^2 + (1 - (-3))^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5\\text{ units}$.', markTag: '[1.5m]' },
        { step: 'Diameter $= 2 \\times r = 2 \\times 5 = 10\\text{ units}$.', markTag: '[1.5m]' },
      ],
      finalAnswer: '10 units',
      commonMistake: 'Reporting the radius (5) instead of the requested diameter (10).',
    },
  },
];
