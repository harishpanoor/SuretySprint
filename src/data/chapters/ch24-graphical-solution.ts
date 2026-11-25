import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateGraphicalSolutionQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Reading intersection of two lines on grid:
    const x0 = rng.int(-3, 3);
    const y0 = rng.int(-3, 3);
    // Line 1: slope +1 -> y - y0 = 1 * (x - x0) -> y = x + (y0 - x0)
    // Line 2: slope -1 -> y - y0 = -1 * (x - x0) -> y = -x + (y0 + x0)
    const c1 = y0 - x0;
    const c2 = y0 + x0;

    const prompt = `From the coordinate grid, find the **intersection point** of the two linear graphs $y = x ${c1 >= 0 ? '+ ' + c1 : '- ' + Math.abs(c1)}$ and $y = -x ${c2 >= 0 ? '+ ' + c2 : '- ' + Math.abs(c2)}$. State your answer as an ordered pair \`(x, y)\`.`;

    return {
      id: `gen_ch24_${rng.int(10000, 99999)}`,
      chapterId: 24,
      unitId: 8,
      title: 'Graphical Intersection of Two Lines',
      type: 'expression',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `(${x0}, ${y0})`,
      acceptableAnswers: [
        `(${x0}, ${y0})`,
        `${x0}, ${y0}`,
        `x = ${x0}, y = ${y0}`,
        `(${x0},${y0})`,
        `${x0},${y0}`,
      ],
      diagramSvgId: 'CoordinateGridSVG',
      diagramData: {
        lines: [
          { m: 1, c: c1, color: '#2563eb' },
          { m: -1, c: c2, color: '#dc2626' },
        ],
        intersection: { x: x0, y: y0, label: `(${x0}, ${y0})` },
      },
      hintLadder: {
        hint1Concept: 'The simultaneous solution is the coordinates $(x, y)$ of the point where the two lines cross.',
        hint2Formula: 'Equating both expressions: $x ' + (c1 >= 0 ? '+ ' + c1 : '- ' + Math.abs(c1)) + ' = -x ' + (c2 >= 0 ? '+ ' + c2 : '- ' + Math.abs(c2)) + '$.',
        hint3Step: `Solving gives $2x = ${c2 - c1} \\implies x = ${x0}$, and $y = ${y0}$.`,
      },
      solution: {
        steps: [
          { step: `Equate the two equations: $x ${c1 >= 0 ? '+ ' + c1 : '- ' + Math.abs(c1)} = -x ${c2 >= 0 ? '+ ' + c2 : '- ' + Math.abs(c2)}$.`, markTag: '[1m]' },
          { step: `Bring like terms together: $2x = ${c2 - c1} \\implies x = ${x0}$.`, markTag: '[1m]' },
          { step: `Substitute $x = ${x0}$: $y = ${x0} ${c1 >= 0 ? '+ ' + c1 : '- ' + Math.abs(c1)} = ${y0}$. The intersection point is $(${x0}, ${y0})$.`, markTag: '[1m]' },
        ],
        finalAnswer: `(${x0}, ${y0})`,
        commonMistake: 'Swapping x and y coordinates, writing (y, x) instead of (x, y).',
      },
      isGenerated: true,
      generatorId: 'ch24',
      generatorSeed: seed,
    };
  } else {
    // Intercept with coordinate axes:
    // ax + by = C where a, b > 0 and C is a multiple of a and b
    const a = rng.choice([2, 3, 4]);
    const b = rng.choice([3, 4, 5]);
    const lcm = a * b;
    const k = rng.choice([1, 2]);
    const C = lcm * k;
    const xInt = C / a;
    const yInt = C / b;

    const askX = rng.choice([true, false]);
    const axisName = askX ? 'X-axis' : 'Y-axis';
    const expected = askX ? `(${xInt}, 0)` : `(0, ${yInt})`;

    const prompt = `Find the coordinates of the point where the line $${a}x + ${b}y = ${C}$ intersects the **${axisName}**. Write your answer as an ordered pair \`(x, y)\`.`;

    return {
      id: `gen_ch24_${rng.int(10000, 99999)}`,
      chapterId: 24,
      unitId: 8,
      title: 'Axis Intercept of a Linear Equation',
      type: 'expression',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: expected,
      acceptableAnswers: [
        expected,
        askX ? `${xInt}, 0` : `0, ${yInt}`,
        askX ? `(${xInt},0)` : `(0,${yInt})`,
      ],
      hintLadder: {
        hint1Concept: askX ? 'At the X-axis, the ordinate $y = 0$.' : 'At the Y-axis, the abscissa $x = 0$.',
        hint2Formula: askX ? `Substitute $y = 0$: $${a}x + ${b}(0) = ${C}$.` : `Substitute $x = 0$: $${a}(0) + ${b}y = ${C}$.`,
        hint3Step: askX ? `$${a}x = ${C} \\implies x = ${xInt}$, so point is $(${xInt}, 0)$.` : `$${b}y = ${C} \\implies y = ${yInt}$, so point is $(0, ${yInt})$.`,
      },
      solution: {
        steps: [
          { step: askX ? `To find the intersection with the X-axis, set $y = 0$ in $${a}x + ${b}y = ${C}$.` : `To find the intersection with the Y-axis, set $x = 0$ in $${a}x + ${b}y = ${C}$.`, markTag: '[1m]' },
          { step: askX ? `$${a}x = ${C} \\implies x = ${xInt}$. The intercept point is $(${xInt}, 0)$.` : `$${b}y = ${C} \\implies y = ${yInt}$. The intercept point is $(0, ${yInt})$.`, markTag: '[1m]' },
        ],
        finalAnswer: expected,
        commonMistake: askX ? 'Setting x = 0 instead of y = 0.' : 'Setting y = 0 instead of x = 0.',
      },
      isGenerated: true,
      generatorId: 'ch24',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh24: Question[] = [
  {
    id: 'ch24_q01',
    chapterId: 24,
    unitId: 8,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Condition for Unique Solution in Graphical Method',
    prompt: 'Two straight lines $a_1 x + b_1 y = c_1$ and $a_2 x + b_2 y = c_2$ intersect at exactly one point if and only if:',
    mcqOptions: [
      { id: 'A', text: '$\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$', explanation: 'Correct: unequal slopes guarantee exactly one intersection point (unique solution).' },
      { id: 'B', text: '$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$', explanation: 'Incorrect: this represents parallel lines (no solution).' },
      { id: 'C', text: '$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$', explanation: 'Incorrect: this represents coincident lines (infinitely many solutions).' },
      { id: 'D', text: '$a_1 a_2 + b_1 b_2 = 0$', explanation: 'Incorrect: this is the condition for perpendicular lines, which is a special subcase but not the general condition for uniqueness.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Recall the algebraic conditions for nature of linear systems.',
      hint2Formula: 'Slopes must be distinct: $-\\frac{a_1}{b_1} \\neq -\\frac{a_2}{b_2} \\implies \\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$.',
      hint3Step: 'This gives a unique intersection point on the Cartesian graph.',
    },
    solution: {
      steps: [
        { step: 'The slopes of the two lines are $m_1 = -\\frac{a_1}{b_1}$ and $m_2 = -\\frac{a_2}{b_2}$.', markTag: '[0.5m]' },
        { step: 'For lines to intersect at a unique point, their slopes must differ ($m_1 \\neq m_2$), which gives $\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: a1/a2 ≠ b1/b2',
      commonMistake: 'Confusing unique solution condition with parallel lines condition.',
    },
  },
  {
    id: 'ch24_q02',
    chapterId: 24,
    unitId: 8,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Graphical Solution of Simultaneous Equations',
    prompt: '**Assertion (A)**: The point of intersection $(x_0, y_0)$ of two straight line graphs represents the simultaneous solution of both linear equations.\n\n**Reason (R)**: A point lies on a straight line graph if and only if its coordinates satisfy the equation of that line.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'What does every point on a line graph represent?',
      hint2Formula: 'Every point on Line 1 satisfies Eq 1; every point on Line 2 satisfies Eq 2.',
      hint3Step: 'The intersection point lies on both lines simultaneously, so it satisfies both equations.',
    },
    solution: {
      steps: [
        { step: 'Assertion is True: The common point $(x_0, y_0)$ satisfies both equations at the same time, making it the simultaneous solution.', markTag: '[0.5m]' },
        { step: 'Reason is True: By definition of a graph, coordinates of any point on the line satisfy its algebraic equation. R correctly explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Thinking that graphical solutions are only approximations and not exact solutions.',
    },
  },
  {
    id: 'ch24_q03',
    chapterId: 24,
    unitId: 8,
    type: 'expression',
    difficulty: 'Standard',
    marks: 2,
    title: 'Y-Intercept of a Linear Graph',
    prompt: 'At what point does the linear graph $3x + 4y = 24$ intersect the **Y-axis**? Give your answer as an ordered pair \`(x, y)\`.',
    expectedAnswer: '(0, 6)',
    acceptableAnswers: ['(0, 6)', '0, 6', 'x = 0, y = 6', '(0,6)', '0,6'],
    hintLadder: {
      hint1Concept: 'Any point on the Y-axis has $x = 0$.',
      hint2Formula: 'Substitute $x = 0$ into the equation $3x + 4y = 24$.',
      hint3Step: '$3(0) + 4y = 24 \\implies 4y = 24 \\implies y = 6$. The point is $(0, 6)$.',
    },
    solution: {
      steps: [
        { step: 'On the Y-axis, the $x$-coordinate is always $0$. Set $x = 0$ in $3x + 4y = 24$.', markTag: '[1m]' },
        { step: '$3(0) + 4y = 24 \\implies 4y = 24 \\implies y = 6$. The intersection point is $(0, 6)$.', markTag: '[1m]' },
      ],
      finalAnswer: '(0, 6)',
      commonMistake: 'Setting $y = 0$ instead and finding the X-intercept $(8, 0)$.',
    },
  },
  {
    id: 'ch24_q04',
    chapterId: 24,
    unitId: 8,
    type: 'expression',
    difficulty: 'Standard',
    marks: 3,
    title: 'Reading Graphical Intersection of Simultaneous Equations',
    prompt: 'Solve graphically by identifying the intersection point of the lines $x - y = 1$ and $2x + y = 8$.\nState your answer as an ordered pair \`(x, y)\`.',
    expectedAnswer: '(3, 2)',
    acceptableAnswers: ['(3, 2)', '3, 2', 'x = 3, y = 2', '(3,2)', '3,2'],
    diagramSvgId: 'CoordinateGridSVG',
    diagramData: {
      lines: [
        { m: 1, c: -1, color: '#2563eb' },
        { m: -2, c: 8, color: '#dc2626' },
      ],
      intersection: { x: 3, y: 2, label: 'P' },
    },
    hintLadder: {
      hint1Concept: 'Add the two equations to eliminate $y$.',
      hint2Formula: '$(x - y) + (2x + y) = 1 + 8 \\implies 3x = 9 \\implies x = 3$.',
      hint3Step: 'Substitute $x = 3$: $3 - y = 1 \\implies y = 2$. Intersection point is $(3, 2)$.',
    },
    solution: {
      steps: [
        { step: 'Line 1: $y = x - 1$. Points: $(0, -1), (1, 0), (3, 2)$.', markTag: '[1m]' },
        { step: 'Line 2: $y = 8 - 2x$. Points: $(1, 6), (2, 4), (3, 2)$.', markTag: '[1m]' },
        { step: 'Both lines intersect at the common point $(3, 2)$. The simultaneous solution is $x = 3, y = 2$.', markTag: '[1m]' },
      ],
      finalAnswer: '(3, 2)',
      commonMistake: 'Plotting points with reversed coordinates (2, 3).',
    },
  },
  {
    id: 'ch24_q05',
    chapterId: 24,
    unitId: 8,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Area of Triangle Formed by Line and Axes',
    prompt: 'Consider the straight line graph represented by the equation $2x + 3y = 12$:\n\n**(i)** Find the coordinates of its X-intercept point $A$.\n**(ii)** Find the area of $\\triangle OAB$ formed by the line and the coordinate axes (in $\\text{sq units}$).',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Coordinates of X-intercept A (x, y):',
        expectedAnswer: '(6, 0)',
        acceptableAnswers: ['(6, 0)', '6, 0', '(6,0)'],
        marks: 2,
        answerType: 'expression',
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Area of triangle OAB (sq units):',
        expectedAnswer: '12',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'For X-intercept, set $y = 0$. For Y-intercept, set $x = 0$.',
      hint2Formula: 'X-intercept $A$: $2x + 3(0) = 12 \\implies x = 6 \\implies (6, 0)$. Y-intercept $B$: $2(0) + 3y = 12 \\implies y = 4 \\implies (0, 4)$.',
      hint3Step: '$\\triangle OAB$ is a right triangle with base $OA = 6$ and height $OB = 4$. Area $= \\frac{1}{2} \\times 6 \\times 4 = 12$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): At X-axis, $y = 0 \\implies 2x + 0 = 12 \\implies x = 6$. X-intercept point $A$ is $(6, 0)$.', markTag: '[2m]' },
        { step: 'Part (ii): At Y-axis, $x = 0 \\implies 3y = 12 \\implies y = 4$. Point $B$ is $(0, 4)$.', markTag: '[1m]' },
        { step: 'The coordinate axes meet at $90^\\circ$ at origin $O(0, 0)$. $\\text{Area}(\\triangle OAB) = \\frac{1}{2} \\times OA \\times OB = \\frac{1}{2} \\times 6 \\times 4 = 12\\text{ sq units}$.', markTag: '[1m]' },
      ],
      finalAnswer: '(i) (6, 0), (ii) 12 sq units',
      commonMistake: 'Forgetting to divide by 2 when computing triangle area $6 \\times 4 = 24$.',
    },
  },
  {
    id: 'ch24_q06',
    chapterId: 24,
    unitId: 8,
    type: 'expression',
    difficulty: 'Easy',
    marks: 2,
    title: 'Intersection of Horizontal and Vertical Lines',
    prompt: 'Find the coordinates of the point of intersection of the lines $x = 4$ and $y = -3$. State your answer as an ordered pair \`(x, y)\`.',
    expectedAnswer: '(4, -3)',
    acceptableAnswers: ['(4, -3)', '4, -3', '(4,-3)', '4,-3', 'x = 4, y = -3'],
    hintLadder: {
      hint1Concept: 'The line $x = 4$ is vertical; every point on it has $x = 4$.',
      hint2Formula: 'The line $y = -3$ is horizontal; every point on it has $y = -3$.',
      hint3Step: 'The point where both conditions hold simultaneously is $(4, -3)$.',
    },
    solution: {
      steps: [
        { step: 'The equation $x = 4$ is a straight line parallel to the Y-axis at a distance of $4$ units to the right.', markTag: '[0.5m]' },
        { step: 'The equation $y = -3$ is a straight line parallel to the X-axis at a distance of $3$ units below.', markTag: '[0.5m]' },
        { step: 'Their intersection is the point $(4, -3)$.', markTag: '[1m]' },
      ],
      finalAnswer: '(4, -3)',
      commonMistake: 'Swapping coordinates to (-3, 4).',
    },
  },
  {
    id: 'ch24_q07',
    chapterId: 24,
    unitId: 8,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 4,
    title: 'HOTS: Area of Triangle Formed by Intersecting Lines and Y-Axis',
    prompt: 'The lines $x + y = 4$ and $x - y = 0$ intersect at point $P$. Find the **area of the triangle** bounded by these two lines and the Y-axis (in $\\text{sq units}$).',
    expectedAnswer: '4',
    nepTags: ['HOTS', 'Brain Maths'],
    hintLadder: {
      hint1Concept: 'Find the three vertices of the triangle.',
      hint2Formula: 'Line 1: $x + y = 4$ cuts Y-axis at $(0, 4)$. Line 2: $x - y = 0$ cuts Y-axis at $(0, 0)$. Base along Y-axis is from $(0,0)$ to $(0,4)$, length $= 4$.',
      hint3Step: 'Intersection point $P$: $x = y \\implies 2x = 4 \\implies x = 2, y = 2$. Altitude perpendicular to Y-axis is $x = 2$. Area $= \\frac{1}{2} \\times 4 \\times 2 = 4$.',
    },
    solution: {
      steps: [
        { step: 'Vertices on Y-axis: For $x + y = 4$, set $x = 0 \\implies y = 4$, point $A(0, 4)$. For $y = x$, set $x = 0 \\implies y = 0$, point $O(0, 0)$.', markTag: '[1m]' },
        { step: 'Intersection $P$: $x + x = 4 \\implies 2x = 4 \\implies x = 2$, and $y = 2$. Vertex $P$ is $(2, 2)$.', markTag: '[1m]' },
        { step: 'Base of triangle lies along Y-axis: $b = OA = 4 - 0 = 4$ units.', markTag: '[1m]' },
        { step: 'Height corresponding to base along Y-axis is the horizontal distance (abscissa) of $P$: $h = 2$ units. $\\text{Area} = \\frac{1}{2} \\times 4 \\times 2 = 4\\text{ sq units}$.', markTag: '[1m]' },
      ],
      finalAnswer: '4',
      commonMistake: 'Using the slanted length of the line instead of the perpendicular height $x = 2$.',
    },
  },
];
