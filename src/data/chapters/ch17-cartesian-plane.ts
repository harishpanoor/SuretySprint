import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateCartesianPlaneQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Quadrant identification:
    // Generate point (x, y) with non-zero coordinates
    const x = rng.intNonZero(-4, 4);
    const y = rng.intNonZero(-4, 4);

    let quad = '';
    if (x > 0 && y > 0) quad = 'I';
    else if (x < 0 && y > 0) quad = 'II';
    else if (x < 0 && y < 0) quad = 'III';
    else quad = 'IV';

    const prompt = `In which quadrant of the Cartesian plane does the point $P(${x}, ${y})$ lie? (Enter in Roman numerals e.g. \`I\`, \`II\`, \`III\`, or \`IV\`).`;

    return {
      id: `gen_ch17_${rng.int(10000, 99999)}`,
      chapterId: 17,
      unitId: 8,
      title: 'Cartesian Quadrant Identification',
      type: 'expression',
      difficulty: 'Easy',
      marks: 1,
      prompt,
      expectedAnswer: quad,
      acceptableAnswers: [
        quad,
        `Quadrant ${quad}`,
        `quadrant ${quad}`,
        `${quad} quadrant`,
      ],
      diagramSvgId: 'CoordinateGridSVG',
      diagramData: {
        points: [{ x, y, label: `P(${x}, ${y})` }],
      },
      hintLadder: {
        hint1Concept: 'Look at the signs of the abscissa ($x$) and ordinate ($y$).',
        hint2Formula: 'Quadrant signs: I $(+, +)$, II $(-, +)$, III $(-, -)$, IV $(+, -)$.',
        hint3Step: `$x = ${x}$ (${x > 0 ? 'positive' : 'negative'}) and $y = ${y}$ (${y > 0 ? 'positive' : 'negative'}), so it lies in Quadrant ${quad}.`,
      },
      solution: {
        steps: [
          { step: `Point $P(${x}, ${y})$ has abscissa $x = ${x}$ (${x > 0 ? '> 0' : '< 0'}) and ordinate $y = ${y}$ (${y > 0 ? '> 0' : '< 0'}).`, markTag: '[0.5m]' },
          { step: `According to standard signs: Quadrant I $(+,+)$, II $(-,+)$, III $(-,-)$, IV $(+,-)$. Therefore, $P$ lies in Quadrant ${quad}.`, markTag: '[0.5m]' },
        ],
        finalAnswer: `Quadrant ${quad}`,
        commonMistake: 'Confusing Quadrant II with Quadrant IV.',
      },
      isGenerated: true,
      generatorId: 'ch17',
      generatorSeed: seed,
    };
  } else {
    // Reading intersection of two lines on grid:
    // e.g. x + y = 4 and x - y = 2 -> (3, 1)
    const x0 = rng.int(-2, 3);
    const y0 = rng.int(-2, 3);
    // Line 1: y - y0 = m1(x - x0)
    // Line 2: y - y0 = m2(x - x0)
    const m1 = 1;
    const m2 = -1;
    const c1 = y0 - m1 * x0;
    const c2 = y0 - m2 * x0;

    const prompt = `From the coordinate grid below, determine the coordinates of the **intersection point** of the two linear graphs $y = x ${c1 >= 0 ? '+ ' + c1 : '- ' + Math.abs(c1)}$ and $y = -x ${c2 >= 0 ? '+ ' + c2 : '- ' + Math.abs(c2)}$. Answer as an ordered pair \`(x, y)\`.`;

    return {
      id: `gen_ch17_${rng.int(10000, 99999)}`,
      chapterId: 17,
      unitId: 8,
      title: 'Graphical Simultaneous Solution',
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
      ],
      diagramSvgId: 'CoordinateGridSVG',
      diagramData: {
        lines: [
          { m: m1, c: c1, color: '#2563eb' },
          { m: m2, c: c2, color: '#dc2626' },
        ],
        intersection: { x: x0, y: y0, label: `(${x0}, ${y0})` },
      },
      hintLadder: {
        hint1Concept: 'The solution is the coordinates $(x, y)$ of the point where the two lines cross each other.',
        hint2Formula: 'Read the abscissa (projection on X-axis) and ordinate (projection on Y-axis).',
        hint3Step: `The lines intersect at $x = ${x0}$ and $y = ${y0}$, which gives $(${x0}, ${y0})$.`,
      },
      solution: {
        steps: [
          { step: 'Equate the equations to find intersection: $x + ' + c1 + ' = -x + ' + c2 + ' \\implies 2x = ' + (c2 - c1) + ' \\implies x = ' + x0 + '$.', markTag: '[1.5m]' },
          { step: 'Substitute $x = ' + x0 + ' \\implies y = ' + y0 + '$. The intersection point on the graph is $(${x0}, ${y0})$.', markTag: '[1.5m]' },
        ],
        finalAnswer: `(${x0}, ${y0})`,
        commonMistake: 'Swapping x and y coordinates, writing (y, x) instead of (x, y).',
      },
      isGenerated: true,
      generatorId: 'ch17',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh17: Question[] = [
  {
    id: 'ch17_q01',
    chapterId: 17,
    unitId: 8,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Points on the Coordinate Axes',
    prompt: 'Any point lying on the **X-axis** is of the form:',
    mcqOptions: [
      { id: 'A', text: '$(x, 0)$', explanation: 'Correct: any point on the X-axis has ordinate (y-coordinate) equal to 0.' },
      { id: 'B', text: '$(0, y)$', explanation: 'Incorrect: this represents points on the Y-axis.' },
      { id: 'C', text: '$(x, x)$', explanation: 'Incorrect: represents the line y = x.' },
      { id: 'D', text: '$(0, 0)$ only', explanation: 'Incorrect: (0, 0) is the origin, but points exist all along the X-axis.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Distance of any point from the X-axis is its y-coordinate.',
      hint2Formula: 'Points on the X-axis have zero vertical distance.',
      hint3Step: 'Therefore $y = 0$, giving $(x, 0)$.',
    },
    solution: {
      steps: [
        { step: 'The distance of a point from the X-axis is given by its ordinate $y$.', markTag: '[0.5m]' },
        { step: 'For points lying directly on the X-axis, the vertical displacement is zero ($y = 0$). Thus coordinates are $(x, 0)$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: (x, 0)',
      commonMistake: 'Confusing points on X-axis $(x, 0)$ with points on Y-axis $(0, y)$.',
    },
  },
  {
    id: 'ch17_q02',
    chapterId: 17,
    unitId: 8,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Dependent and Independent Variables',
    prompt: '**Assertion (A)**: In the linear relation $y = 3x - 4$, $x$ is called the independent variable and $y$ is called the dependent variable.\n\n**Reason (R)**: The value of $y$ depends on the arbitrarily chosen values assigned to $x$, and on the Cartesian plane, independent variables are plotted along the horizontal X-axis.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'We choose arbitrary values for $x$ and calculate the resulting $y$.',
      hint2Formula: '$x$ is plotted on horizontal axis, $y$ on vertical axis.',
      hint3Step: 'Reason explains why $x$ is independent and $y$ is dependent.',
    },
    solution: {
      steps: [
        { step: 'In $y = 3x - 4$, we assign values to $x$ and compute corresponding values for $y$. Thus $x$ is independent and $y$ is dependent. Assertion is True.', markTag: '[0.5m]' },
        { step: 'Reason accurately describes the mathematical definition and Cartesian convention. Reason is True and correctly explains Assertion.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Thinking both variables are mutually independent.',
    },
  },
  {
    id: 'ch17_q03',
    chapterId: 17,
    unitId: 8,
    type: 'numerical',
    difficulty: 'Easy',
    marks: 2,
    title: 'Finding Abscissa and Ordinate',
    prompt: 'For the point $P(-6, 9)$, write the value of its **abscissa**.',
    expectedAnswer: '-6',
    hintLadder: {
      hint1Concept: 'In coordinates $(x, y)$, $x$ is the abscissa and $y$ is the ordinate.',
      hint2Formula: 'Point $(-6, 9) \\implies x = -6, y = 9$.',
      hint3Step: 'The abscissa is $-6$.',
    },
    solution: {
      steps: [
        { step: 'By definition, in an ordered pair $(x, y)$, the first coordinate $x$ is called the **abscissa** and the second coordinate $y$ is called the **ordinate**.', markTag: '[1m]' },
        { step: 'For $P(-6, 9)$, the abscissa is $-6$.', markTag: '[1m]' },
      ],
      finalAnswer: '-6',
      commonMistake: 'Giving the ordinate (9) instead of the abscissa (-6).',
    },
  },
  {
    id: 'ch17_q04',
    chapterId: 17,
    unitId: 8,
    type: 'expression',
    difficulty: 'Standard',
    marks: 3,
    title: 'Linear Graph Intersection with Coordinate Axes',
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
        { step: '$3(0) + 4y = 24 \\implies 4y = 24 \\implies y = 6$.', markTag: '[1m]' },
        { step: 'The graph intersects the Y-axis at point $(0, 6)$.', markTag: '[1m]' },
      ],
      finalAnswer: '(0, 6)',
      commonMistake: 'Setting $y = 0$ instead and finding the X-intercept $(8, 0)$.',
    },
  },
  {
    id: 'ch17_q05',
    chapterId: 17,
    unitId: 8,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Graphical Triangle Formed by Line and Axes',
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
    id: 'ch17_q06',
    chapterId: 17,
    unitId: 8,
    type: 'expression',
    difficulty: 'Exam',
    marks: 3,
    title: 'Reading Graphical Intersection of Simultaneous Equations',
    prompt: 'Solve graphically by identifying the intersection point of lines $x - y = 1$ and $2x + y = 8$.\nState your answer as an ordered pair \`(x, y)\`.',
    expectedAnswer: '(3, 2)',
    acceptableAnswers: ['(3, 2)', '3, 2', 'x = 3, y = 2', '(3,2)'],
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
        { step: 'Both lines intersect at common point $(3, 2)$. The simultaneous solution is $x = 3, y = 2$.', markTag: '[1m]' },
      ],
      finalAnswer: '(3, 2)',
      commonMistake: 'Plotting points with reversed coordinates (2, 3).',
    },
  },
];
