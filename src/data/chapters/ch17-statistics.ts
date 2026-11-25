import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateStatisticsQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Class mark and class size calculation:
    const lower = rng.choice([10, 20, 30, 40, 50]);
    const width = rng.choice([10, 20, 15, 25]);
    const upper = lower + width;
    const classMark = (lower + upper) / 2;

    const askMark = rng.choice([true, false]);
    const prompt = askMark
      ? `Find the **class mark (or mid-value)** of the class interval $${lower} - ${upper}$.`
      : `Find the **class width (or class size)** of the class interval $${lower} - ${upper}$.`;

    const expectedAnswer = askMark ? `${classMark}` : `${width}`;

    return {
      id: `gen_ch17_${rng.int(10000, 99999)}`,
      chapterId: 17,
      unitId: 5,
      title: askMark ? 'Class Mark Calculation' : 'Class Width Calculation',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 1,
      prompt,
      expectedAnswer,
      hintLadder: {
        hint1Concept: askMark
          ? 'The class mark is the average of the lower and upper class limits.'
          : 'The class width is the difference between upper and lower class limits.',
        hint2Formula: askMark
          ? '$\\text{Class Mark} = \\frac{\\text{Lower limit} + \\text{Upper limit}}{2}$.'
          : '$\\text{Class Width} = \\text{Upper limit} - \\text{Lower limit}$.',
        hint3Step: askMark
          ? `$\\frac{${lower} + ${upper}}{2} = \\frac{${lower + upper}}{2} = ${classMark}$.`
          : `$${upper} - ${lower} = ${width}$.`,
      },
      solution: {
        steps: [
          {
            step: askMark
              ? 'Formula: $\\text{Class Mark} = \\frac{\\text{Lower limit} + \\text{Upper limit}}{2}$.'
              : 'Formula: $\\text{Class Width} = \\text{Upper limit} - \\text{Lower limit}$.',
            markTag: '[0.5m]',
          },
          {
            step: askMark
              ? `Substitute limits: $\\frac{${lower} + ${upper}}{2} = \\frac{${lower + upper}}{2} = ${classMark}$.`
              : `Substitute limits: $${upper} - ${lower} = ${width}$.`,
            markTag: '[0.5m]',
          },
        ],
        finalAnswer: `${expectedAnswer}`,
        commonMistake: askMark
          ? 'Subtracting the limits instead of averaging them.'
          : 'Adding the limits instead of subtracting.',
      },
      isGenerated: true,
      generatorId: 'ch17',
      generatorSeed: seed,
    };
  } else {
    // True class limits conversion for discontinuous intervals:
    // e.g. 11-20, 21-30 -> adjustment factor is (21-20)/2 = 0.5
    const start = rng.choice([11, 21, 31, 41]);
    const span = 9;
    const end = start + span; // e.g. 11 to 20
    const lowerBoundary = start - 0.5;
    const upperBoundary = end + 0.5;

    const prompt = `For the discontinuous class interval $${start} - ${end}$, determine the **lower true class boundary** (in decimal form).`;
    const expectedAnswer = `${lowerBoundary}`;

    return {
      id: `gen_ch17_${rng.int(10000, 99999)}`,
      chapterId: 17,
      unitId: 5,
      title: 'True Class Boundary Calculation',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer,
      acceptableAnswers: [`${lowerBoundary}`],
      hintLadder: {
        hint1Concept: 'For discontinuous class intervals with a 1-unit gap, the adjustment factor is $0.5$.',
        hint2Formula: 'Lower boundary $= \\text{Lower limit} - 0.5$.',
        hint3Step: `$${start} - 0.5 = ${lowerBoundary}$.`,
      },
      solution: {
        steps: [
          { step: `Adjustment factor $d = \\frac{1}{2} = 0.5$.`, markTag: '[1m]' },
          { step: `Lower class boundary $= ${start} - 0.5 = ${lowerBoundary}$. (Upper boundary is $${end} + 0.5 = ${upperBoundary}$).`, markTag: '[1m]' },
        ],
        finalAnswer: `${lowerBoundary}`,
        commonMistake: 'Adding 0.5 to the lower limit instead of subtracting.',
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
    unitId: 5,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Class Mark Definition',
    prompt: 'The **class mark (or mid-value)** of the class interval $20 - 30$ is:',
    mcqOptions: [
      { id: 'A', text: '$25$', explanation: 'Correct: $(20 + 30)/2 = 50/2 = 25$.' },
      { id: 'B', text: '$10$', explanation: 'Incorrect: That is the class width ($30 - 20 = 10$).' },
      { id: 'C', text: '$20$', explanation: 'Incorrect: That is the lower class limit.' },
      { id: 'D', text: '$30$', explanation: 'Incorrect: That is the upper class limit.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Class mark is the average of the lower and upper class limits.',
      hint2Formula: '$\\text{Class Mark} = \\frac{\\text{Lower limit} + \\text{Upper limit}}{2}$.',
      hint3Step: '$\\frac{20 + 30}{2} = \\frac{50}{2} = 25$.',
    },
    solution: {
      steps: [
        { step: 'Formula: $\\text{Class Mark} = \\frac{\\text{Lower Limit} + \\text{Upper Limit}}{2}$.', markTag: '[0.5m]' },
        { step: '$\\frac{20 + 30}{2} = \\frac{50}{2} = 25$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: 25',
      commonMistake: 'Confusing class mark (midpoint) with class size (width).',
    },
  },
  {
    id: 'ch17_q02',
    chapterId: 17,
    unitId: 5,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Continuous Class Boundaries',
    prompt: '**Assertion (A)**: To draw a histogram for discontinuous class intervals $11-20, 21-30, 31-40$, the intervals must first be converted to continuous boundaries $10.5-20.5, 20.5-30.5, 30.5-40.5$.\n\n**Reason (R)**: In a histogram, the rectangles must be drawn adjacent to each other with no gaps between them.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Think about how a histogram represents continuous data versus a bar chart.',
      hint2Formula: 'Adjustment factor $= \\frac{21 - 20}{2} = 0.5$. Subtract from lower limit, add to upper limit.',
      hint3Step: 'Because a histogram has contiguous bars, gaps between $20$ and $21$ must be eliminated.',
    },
    solution: {
      steps: [
        { step: 'Discontinuous data has gaps ($20$ to $21$). Adjustment $= \\frac{21-20}{2} = 0.5$ converts them to $10.5-20.5, 20.5-30.5$. Assertion is True.', markTag: '[0.5m]' },
        { step: 'Histograms represent continuous distributions with no spaces between bars. Reason is True and correctly explains Assertion.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Drawing histograms with separated bars like a bar chart.',
    },
  },
  {
    id: 'ch17_q03',
    chapterId: 17,
    unitId: 5,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Reading Histogram & Frequency Polygon',
    prompt: 'The following histogram displays the marks distribution of 40 students:\n\n- Class 0–10: Frequency 5\n- Class 10–20: Frequency 9\n- Class 20–30: Frequency 14\n- Class 30–40: Frequency 8\n- Class 40–50: Frequency 4\n\n**(i)** Which class interval is the **modal class** (highest frequency)? (Enter format e.g. \`20-30\`)\n**(ii)** What is the class mark of the modal class?',
    diagramSvgId: 'StatsChartSVG',
    diagramData: {
      type: 'both',
      bins: [
        { label: '0-10', frequency: 5 },
        { label: '10-20', frequency: 9 },
        { label: '20-30', frequency: 14 },
        { label: '30-40', frequency: 8 },
        { label: '40-50', frequency: 4 },
      ],
      xTitle: 'Marks',
      yTitle: 'Students',
    },
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Modal class interval:',
        expectedAnswer: '20-30',
        acceptableAnswers: ['20 - 30', '20-30'],
        marks: 2,
        answerType: 'text',
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Class mark of the modal class:',
        expectedAnswer: '25',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Modal class is the interval with the highest frequency.',
      hint2Formula: 'Highest frequency is 14, corresponding to $20 - 30$.',
      hint3Step: 'Class mark $= \\frac{20 + 30}{2} = 25$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): The highest frequency is $14$, which corresponds to interval $20 - 30$. Modal class $= 20 - 30$.', markTag: '[2m]' },
        { step: 'Part (ii): $\\text{Class mark} = \\frac{20 + 30}{2} = \\frac{50}{2} = 25$.', markTag: '[2m]' },
      ],
      finalAnswer: '(i) 20-30, (ii) 25',
      commonMistake: 'Giving the frequency 14 instead of the class interval in part (i).',
    },
  },
  {
    id: 'ch17_q04',
    chapterId: 17,
    unitId: 5,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 2,
    title: 'Cumulative Frequency Calculation',
    prompt: 'In a frequency distribution of marks:\n\n- Class 0–10: Frequency 4\n- Class 10–20: Frequency 7\n- Class 20–30: Frequency 11\n- Class 30–40: Frequency 6\n\nFind the **cumulative frequency** of the class $20 - 30$.',
    expectedAnswer: '22',
    hintLadder: {
      hint1Concept: 'Cumulative frequency of a class is the running sum of all frequencies up to and including that class.',
      hint2Formula: '$cf = f_1 + f_2 + f_3$.',
      hint3Step: '$4 + 7 + 11 = 22$.',
    },
    solution: {
      steps: [
        { step: 'Add frequencies of all classes up to $20 - 30$: $4 + 7 + 11 = 22$.', markTag: '[2m]' },
      ],
      finalAnswer: '22',
      commonMistake: 'Reporting the individual frequency 11 instead of the cumulative frequency 22.',
    },
  },
  {
    id: 'ch17_q05',
    chapterId: 17,
    unitId: 5,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Closing a Frequency Polygon',
    prompt: 'To complete a Frequency Polygon drawn on a histogram, the ends of the polygon are joined to:',
    mcqOptions: [
      { id: 'A', text: 'The mid-points of the preceding and succeeding imaginary classes with frequency zero on the X-axis', explanation: 'Correct: This closes the polygon with the horizontal axis.' },
      { id: 'B', text: 'The origin (0, 0)', explanation: 'Incorrect: Classes do not always start from 0.' },
      { id: 'C', text: 'The top corners of the first and last rectangles', explanation: 'Incorrect: Mid-points of imaginary classes on the axis must be used.' },
      { id: 'D', text: 'The highest point on the Y-axis', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'A polygon must be a closed geometric figure.',
      hint2Formula: 'The area under the frequency polygon must equal the area of the histogram.',
      hint3Step: 'Hence it must extend to the mid-points of the adjacent zero-frequency classes on the baseline.',
    },
    solution: {
      steps: [
        { step: 'To close the frequency polygon, lines are drawn from the first and last mid-points to the mid-points of the immediate preceding and succeeding classes having zero frequency on the horizontal axis.', markTag: '[1m]' },
      ],
      finalAnswer: 'A: The mid-points of the preceding and succeeding imaginary classes with frequency zero on the X-axis',
      commonMistake: 'Leaving the ends floating in mid-air or dropping them vertically to the corners.',
    },
  },
  {
    id: 'ch17_q06',
    chapterId: 17,
    unitId: 5,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Class Mark to Class Interval Reconstruction',
    prompt: 'The class marks of a distribution are $15, 25, 35, 45, 55$. What is the **upper class limit** of the second class interval?',
    expectedAnswer: '30',
    hintLadder: {
      hint1Concept: 'Find the class size $h$ from the difference between consecutive class marks.',
      hint2Formula: '$h = 25 - 15 = 10$. Then class limits are $\\text{Class mark} \\pm h/2$.',
      hint3Step: 'For the second class (mark 25): limits are $25 - 5 = 20$ and $25 + 5 = 30$. Upper limit $= 30$.',
    },
    solution: {
      steps: [
        { step: 'Difference between consecutive class marks: $h = 25 - 15 = 10$ (uniform class size).', markTag: '[1m]' },
        { step: 'Half class size $= h/2 = 5$.', markTag: '[1m]' },
        { step: 'Second class has midpoint $25$. Lower limit $= 25 - 5 = 20$, Upper limit $= 25 + 5 = 30$.', markTag: '[1m]' },
      ],
      finalAnswer: '30',
      commonMistake: 'Reporting the class mark 25 itself as the limit.',
    },
  },
];
