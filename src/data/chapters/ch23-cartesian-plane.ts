import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateCartesianPlaneQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 3);

  if (type === 1) {
    // Quadrant identification:
    const x = rng.intNonZero(-5, 5);
    const y = rng.intNonZero(-5, 5);

    let quad = '';
    if (x > 0 && y > 0) quad = 'I';
    else if (x < 0 && y > 0) quad = 'II';
    else if (x < 0 && y < 0) quad = 'III';
    else quad = 'IV';

    const prompt = `In which quadrant of the Cartesian plane does the point $P(${x}, ${y})$ lie? (Enter in Roman numerals e.g. \`I\`, \`II\`, \`III\`, or \`IV\`).`;

    return {
      id: `gen_ch23_${rng.int(10000, 99999)}`,
      chapterId: 23,
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
          { step: `According to standard Cartesian signs: Quadrant I $(+,+)$, II $(-,+)$, III $(-,-)$, IV $(+,-)$. Therefore, $P$ lies in Quadrant ${quad}.`, markTag: '[0.5m]' },
        ],
        finalAnswer: `Quadrant ${quad}`,
        commonMistake: 'Confusing Quadrant II with Quadrant IV.',
      },
      isGenerated: true,
      generatorId: 'ch23',
      generatorSeed: seed,
    };
  } else if (type === 2) {
    // Slope of a line joining two points:
    const m = rng.choice([-3, -2, -1, 1, 2, 3, 4]);
    const x1 = rng.int(-3, 3);
    const y1 = rng.int(-3, 3);
    const dx = rng.choice([1, 2, 3]);
    const x2 = x1 + dx;
    const y2 = y1 + m * dx;

    const prompt = `Find the **slope** (gradient) of the straight line passing through the points $A(${x1}, ${y1})$ and $B(${x2}, ${y2})$.`;

    return {
      id: `gen_ch23_${rng.int(10000, 99999)}`,
      chapterId: 23,
      unitId: 8,
      title: 'Slope of Line Between Two Points',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 2,
      prompt,
      expectedAnswer: `${m}`,
      diagramSvgId: 'CoordinateGridSVG',
      diagramData: {
        points: [
          { x: x1, y: y1, label: `A(${x1}, ${y1})` },
          { x: x2, y: y2, label: `B(${x2}, ${y2})` },
        ],
      },
      hintLadder: {
        hint1Concept: 'Recall the slope formula: $m = \\frac{y_2 - y_1}{x_2 - x_1}$.',
        hint2Formula: `Substitute coordinates: $m = \\frac{${y2} - (${y1})}{${x2} - (${x1})}$.`,
        hint3Step: `$m = \\frac{${y2 - y1}}{${x2 - x1}} = ${m}$.`,
      },
      solution: {
        steps: [
          { step: 'Formula for slope $m = \\frac{y_2 - y_1}{x_2 - x_1}$.', markTag: '[0.5m]' },
          { step: `Substitute: $m = \\frac{${y2} - (${y1})}{${x2} - (${x1})} = \\frac{${y2 - y1}}{${x2 - x1}}$.`, markTag: '[1m]' },
          { step: `Simplify to get $m = ${m}$.`, markTag: '[0.5m]' },
        ],
        finalAnswer: `${m}`,
        commonMistake: 'Inverting the formula to (x2 - x1)/(y2 - y1).',
      },
      isGenerated: true,
      generatorId: 'ch23',
      generatorSeed: seed,
    };
  } else {
    // Y-intercept of straight line equation:
    const m = rng.choice([2, 3, 4, 5]);
    const c = rng.choice([-6, -4, -2, 2, 4, 6]);
    // Equation: mx - y + c = 0 or y = mx + c
    const prompt = `Find the **y-intercept** ($c$) of the straight line represented by the equation $y = ${m}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)}$.`;

    return {
      id: `gen_ch23_${rng.int(10000, 99999)}`,
      chapterId: 23,
      unitId: 8,
      title: 'Y-Intercept of a Straight Line',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 1,
      prompt,
      expectedAnswer: `${c}`,
      hintLadder: {
        hint1Concept: 'Compare the equation with the slope-intercept form $y = mx + c$.',
        hint2Formula: 'In $y = mx + c$, $m$ is the slope and $c$ is the y-intercept.',
        hint3Step: `Here $m = ${m}$ and $c = ${c}$.`,
      },
      solution: {
        steps: [
          { step: 'The standard slope-intercept form of a straight line is $y = mx + c$, where $c$ represents the y-intercept.', markTag: '[0.5m]' },
          { step: `Comparing $y = ${m}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)}$ with $y = mx + c$, we get $c = ${c}$.`, markTag: '[0.5m]' },
        ],
        finalAnswer: `${c}`,
        commonMistake: 'Omitting the minus sign if the intercept is negative.',
      },
      isGenerated: true,
      generatorId: 'ch23',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh23: Question[] = [
  {
    id: 'ch23_q01',
    chapterId: 23,
    unitId: 8,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Points on the Coordinate Axes',
    prompt: 'Any point lying on the **X-axis** is of the general form:',
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
    id: 'ch23_q02',
    chapterId: 23,
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
      hint2Formula: '$x$ is plotted on the horizontal axis, $y$ on the vertical axis.',
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
    id: 'ch23_q03',
    chapterId: 23,
    unitId: 8,
    type: 'numerical',
    difficulty: 'Easy',
    marks: 1,
    title: 'Finding Abscissa of a Point',
    prompt: 'For the point $P(-7, 12)$, write the value of its **abscissa**.',
    expectedAnswer: '-7',
    hintLadder: {
      hint1Concept: 'In coordinates $(x, y)$, $x$ is the abscissa and $y$ is the ordinate.',
      hint2Formula: 'Point $(-7, 12) \\implies x = -7, y = 12$.',
      hint3Step: 'The abscissa is $-7$.',
    },
    solution: {
      steps: [
        { step: 'By definition, in an ordered pair $(x, y)$, the first coordinate $x$ is called the **abscissa** and the second coordinate $y$ is called the **ordinate**.', markTag: '[0.5m]' },
        { step: 'For $P(-7, 12)$, the abscissa is $-7$.', markTag: '[0.5m]' },
      ],
      finalAnswer: '-7',
      commonMistake: 'Giving the ordinate (12) instead of the abscissa (-7).',
    },
  },
  {
    id: 'ch23_q04',
    chapterId: 23,
    unitId: 8,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 2,
    title: 'Calculating Slope of a Line',
    prompt: 'Calculate the **slope** ($m$) of the straight line passing through points $A(2, 3)$ and $B(6, 11)$.',
    expectedAnswer: '2',
    hintLadder: {
      hint1Concept: 'Use the slope formula $m = \\frac{y_2 - y_1}{x_2 - x_1}$.',
      hint2Formula: '$m = \\frac{11 - 3}{6 - 2}$.',
      hint3Step: '$\\frac{8}{4} = 2$.',
    },
    solution: {
      steps: [
        { step: 'Slope formula: $m = \\frac{y_2 - y_1}{x_2 - x_1}$.', markTag: '[0.5m]' },
        { step: 'Substitute $A(2, 3)$ and $B(6, 11)$: $m = \\frac{11 - 3}{6 - 2} = \\frac{8}{4}$.', markTag: '[1m]' },
        { step: '$m = 2$.', markTag: '[0.5m]' },
      ],
      finalAnswer: '2',
      commonMistake: 'Inverting slope to $(6-2)/(11-3) = 1/2$.',
    },
  },
  {
    id: 'ch23_q05',
    chapterId: 23,
    unitId: 8,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 2,
    title: 'Finding Y-Intercept from General Form',
    prompt: 'Express the equation $2x - 3y + 6 = 0$ in the form $y = mx + c$, and state the value of the **y-intercept** ($c$).',
    expectedAnswer: '2',
    hintLadder: {
      hint1Concept: 'Rearrange the equation to isolate $y$ on one side.',
      hint2Formula: '$3y = 2x + 6 \\implies y = \\frac{2}{3}x + 2$.',
      hint3Step: 'Compare with $y = mx + c$: $c = 2$.',
    },
    solution: {
      steps: [
        { step: 'Given $2x - 3y + 6 = 0$. Isolate $y$: $3y = 2x + 6$.', markTag: '[1m]' },
        { step: 'Divide by $3$: $y = \\frac{2}{3}x + 2$.', markTag: '[0.5m]' },
        { step: 'Comparing with $y = mx + c$, the y-intercept is $c = 2$.', markTag: '[0.5m]' },
      ],
      finalAnswer: '2',
      commonMistake: 'Forgetting to divide the constant 6 by 3, incorrectly answering 6.',
    },
  },
  {
    id: 'ch23_q06',
    chapterId: 23,
    unitId: 8,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Quadrants and Collinearity by Slopes',
    prompt: 'Given three points on the Cartesian plane: $P(-3, 4)$, $Q(0, 2)$, and $R(3, 0)$:\n\n**(i)** In which quadrant does point $P$ lie? (Enter \`I\`, \`II\`, \`III\`, or \`IV\`)\n**(ii)** Find the slope of line segment $PQ$.\n**(iii)** Are points $P, Q,$ and $R$ collinear? (Enter \`Yes\` or \`No\`)',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Quadrant of P (I/II/III/IV):',
        expectedAnswer: 'II',
        acceptableAnswers: ['II', 'Quadrant II', '2'],
        marks: 1,
        answerType: 'expression',
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Slope of PQ (fraction -a/b):',
        expectedAnswer: '-2/3',
        acceptableAnswers: ['-2/3', '-0.67'],
        marks: 2,
        answerType: 'expression',
      },
      {
        id: 'iii',
        partLabel: '(iii)',
        prompt: 'Are P, Q, R collinear? (Yes/No):',
        expectedAnswer: 'Yes',
        acceptableAnswers: ['yes', 'Yes', 'YES'],
        marks: 1,
        answerType: 'expression',
      },
    ],
    hintLadder: {
      hint1Concept: 'For (i), $x < 0$ and $y > 0$ means Quadrant II.',
      hint2Formula: 'Slope of $PQ = \\frac{2 - 4}{0 - (-3)} = \\frac{-2}{3} = -\\frac{2}{3}$.',
      hint3Step: 'Slope of $QR = \\frac{0 - 2}{3 - 0} = -\\frac{2}{3}$. Since slopes are equal and $Q$ is common, they are collinear.',
    },
    solution: {
      steps: [
        { step: 'Part (i): Abscissa $x = -3 < 0$ and ordinate $y = 4 > 0$. Therefore, $P$ lies in **Quadrant II**.', markTag: '[1m]' },
        { step: 'Part (ii): $\\text{Slope of } PQ = \\frac{2 - 4}{0 - (-3)} = \\frac{-2}{3} = -\\frac{2}{3}$.', markTag: '[1.5m]' },
        { step: 'Part (iii): $\\text{Slope of } QR = \\frac{0 - 2}{3 - 0} = -\\frac{2}{3}$. Since $\\text{Slope}(PQ) = \\text{Slope}(QR)$ and $Q$ is a common point, $P, Q, R$ are collinear (Yes).', markTag: '[1.5m]' },
      ],
      finalAnswer: '(i) II, (ii) -2/3, (iii) Yes',
      commonMistake: 'Making a sign error when computing $0 - (-3) = +3$.',
    },
  },
  {
    id: 'ch23_q07',
    chapterId: 23,
    unitId: 8,
    type: 'expression',
    difficulty: 'Exam',
    marks: 3,
    title: 'HOTS: Fourth Vertex of a Rectangle',
    prompt: 'Three vertices of a rectangle $OABC$ are $O(0, 0), A(5, 0)$, and $C(0, 3)$. Find the coordinates of the fourth vertex $B$. Write your answer as an ordered pair \`(x, y)\`.',
    expectedAnswer: '(5, 3)',
    acceptableAnswers: ['(5, 3)', '5, 3', '(5,3)', '5,3', 'x = 5, y = 3'],
    diagramSvgId: 'CoordinateGridSVG',
    diagramData: {
      points: [
        { x: 0, y: 0, label: 'O(0, 0)' },
        { x: 5, y: 0, label: 'A(5, 0)' },
        { x: 0, y: 3, label: 'C(0, 3)' },
        { x: 5, y: 3, label: 'B(?, ?)' },
      ],
    },
    nepTags: ['HOTS', 'Brain Maths'],
    hintLadder: {
      hint1Concept: 'In a rectangle, opposite sides are equal and parallel to the coordinate axes.',
      hint2Formula: '$OA$ is along the X-axis ($y = 0$, length 5). $OC$ is along the Y-axis ($x = 0$, length 3).',
      hint3Step: 'Side $CB$ must be horizontal ($y = 3$, length 5), so $B$ has $x = 5, y = 3$. Point is $(5, 3)$.',
    },
    solution: {
      steps: [
        { step: 'Side $OA$ lies along the X-axis from $(0, 0)$ to $(5, 0)$, of length $5$ units.', markTag: '[1m]' },
        { step: 'Side $OC$ lies along the Y-axis from $(0, 0)$ to $(0, 3)$, of length $3$ units.', markTag: '[1m]' },
        { step: 'In a rectangle, opposite side $CB$ is parallel and equal to $OA$, extending horizontally from $C(0, 3)$ by $5$ units to $(5, 3)$. Thus $B = (5, 3)$.', markTag: '[1m]' },
      ],
      finalAnswer: '(5, 3)',
      commonMistake: 'Inverting coordinates to (3, 5).',
    },
  },
];
