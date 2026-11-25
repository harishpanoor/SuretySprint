import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateStatisticsQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Mean of raw data:
    // Generate n values (n in [5, 6, 7]) whose sum is divisible by n to give a clean integer mean
    const n = rng.choice([5, 6, 7]);
    const targetMean = rng.int(12, 28);
    const targetSum = targetMean * n;

    // Pick n-1 random offsets, adjust last one
    const numbers: number[] = [];
    let currentSum = 0;
    for (let i = 0; i < n - 1; i++) {
      const val = targetMean + rng.int(-8, 8);
      numbers.push(val);
      currentSum += val;
    }
    const lastVal = targetSum - currentSum;
    numbers.push(lastVal);

    // Shuffle
    const shuffled = rng.shuffle(numbers);
    const prompt = `Calculate the **Mean (Arithmetic Average)** of the following data set:\n$$${shuffled.join(',\\;\\;')}$$`;

    return {
      id: `gen_ch13_${rng.int(10000, 99999)}`,
      chapterId: 13,
      unitId: 5,
      title: 'Arithmetic Mean of Ungrouped Data',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${targetMean}`,
      hintLadder: {
        hint1Concept: 'The arithmetic mean is the sum of all observations divided by the total number of observations.',
        hint2Formula: '$\\bar{x} = \\frac{\\sum x_i}{n}$.',
        hint3Step: `Add all ${n} observations: $\\sum x_i = ${targetSum}$. Then divide by $n = ${n}$.`,
      },
      solution: {
        steps: [
          { step: `Sum of observations: $\\sum x_i = ${shuffled.join(' + ')} = ${targetSum}$.`, markTag: '[1m]' },
          { step: `Number of observations $n = ${n}$. Mean $\\bar{x} = \\frac{\\sum x_i}{n} = \\frac{${targetSum}}{${n}} = ${targetMean}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${targetMean}`,
        commonMistake: 'Making an addition error in summing the observations or dividing by (n-1).',
      },
      isGenerated: true,
      generatorId: 'ch13',
      generatorSeed: seed,
    };
  } else {
    // Median of raw data:
    // Odd n (e.g. n = 7): median is middle element
    const n = 7;
    const sortedVals: number[] = [];
    let start = rng.int(8, 20);
    for (let i = 0; i < n; i++) {
      sortedVals.push(start);
      start += rng.int(2, 5);
    }
    const medianVal = sortedVals[3]; // (7+1)/2 = 4th element (0-indexed 3)
    const scrambled = rng.shuffle(sortedVals);

    const prompt = `Find the **Median** of the following set of observations:\n$$${scrambled.join(',\\;\\;')}$$`;

    return {
      id: `gen_ch13_${rng.int(10000, 99999)}`,
      chapterId: 13,
      unitId: 5,
      title: 'Median of Ungrouped Data (Odd N)',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${medianVal}`,
      hintLadder: {
        hint1Concept: 'First arrange all observations in ascending (or descending) order.',
        hint2Formula: 'For odd $n = 7$, the median is the $\\left(\\frac{n+1}{2}\\right)^{\\text{th}} = 4^{\\text{th}}$ observation.',
        hint3Step: `Sorted array: $${sortedVals.join(', ')} $. The $4^{\\text{th}}$ observation is $${medianVal}$.`,
      },
      solution: {
        steps: [
          { step: `Arrange in ascending order: $${sortedVals.join(',\\; ')}$.`, markTag: '[1m]' },
          { step: `Total observations $n = 7$ (odd). $\\text{Median} = \\left(\\frac{7+1}{2}\\right)^{\\text{th}} = 4^{\\text{th}}$ value $= ${medianVal}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${medianVal}`,
        commonMistake: 'Picking the middle number of the given list without sorting it first!',
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
    unitId: 5,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Class Mark Calculation',
    prompt: 'The **class mark (or mid-value)** of the class interval $20 - 30$ is:',
    mcqOptions: [
      { id: 'A', text: '$25$', explanation: 'Correct: $(20 + 30)/2 = 50/2 = 25$.' },
      { id: 'B', text: '$10$', explanation: 'Incorrect: that is the class size (30 - 20 = 10).' },
      { id: 'C', text: '$20$', explanation: 'Incorrect: lower limit.' },
      { id: 'D', text: '$30$', explanation: 'Incorrect: upper limit.' },
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
    id: 'ch13_q02',
    chapterId: 13,
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
    id: 'ch13_q03',
    chapterId: 13,
    unitId: 5,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Median of Even Number of Observations',
    prompt: 'Find the **Median** of the following data:\n$$15,\\; 28,\\; 12,\\; 25,\\; 18,\\; 32,\\; 20,\\; 22$$',
    expectedAnswer: '21',
    hintLadder: {
      hint1Concept: 'There are $n = 8$ observations (even). Arrange in ascending order first.',
      hint2Formula: 'Sorted list: $12, 15, 18, 20, 22, 25, 28, 32$.',
      hint3Step: 'For even $n$, $\\text{Median} = \\frac{\\left(\\frac{n}{2}\\right)^{\\text{th}} + \\left(\\frac{n}{2}+1\\right)^{\\text{th}}}{2} = \\frac{4^{\\text{th}} + 5^{\\text{th}}}{2} = \\frac{20 + 22}{2} = 21$.',
    },
    solution: {
      steps: [
        { step: 'Arrange in ascending order: $12, 15, 18, 20, 22, 25, 28, 32$. Total $n = 8$ (even).', markTag: '[1m]' },
        { step: 'The middle two terms are the $4^{\\text{th}}$ term ($20$) and $5^{\\text{th}}$ term ($22$).', markTag: '[1m]' },
        { step: '$\\text{Median} = \\frac{20 + 22}{2} = \\frac{42}{2} = 21$.', markTag: '[1m]' },
      ],
      finalAnswer: '21',
      commonMistake: 'Picking either 20 or 22 instead of taking their average.',
    },
  },
  {
    id: 'ch13_q04',
    chapterId: 13,
    unitId: 5,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Mean of Frequency Distribution',
    prompt: 'Find the mean of the distribution:\n\n| Variable ($x$) | 10 | 15 | 20 | 25 | 30 |\n|---|---|---|---|---|---|\n| Frequency ($f$) | 4 | 6 | 8 | 7 | 5 |',
    expectedAnswer: '20.5',
    hintLadder: {
      hint1Concept: 'Use direct formula $\\bar{x} = \\frac{\\sum f x}{\\sum f}$.',
      hint2Formula: 'Compute $f x$ for each column: $40 + 90 + 160 + 175 + 150 = 615$.',
      hint3Step: 'Total frequency $\\sum f = 4 + 6 + 8 + 7 + 5 = 30$. Mean $= 615 / 30 = 20.5$.',
    },
    solution: {
      steps: [
        { step: 'Compute $fx$ products: $10(4) = 40, 15(6) = 90, 20(8) = 160, 25(7) = 175, 30(5) = 150$. Sum $\\sum fx = 615$.', markTag: '[1m]' },
        { step: 'Sum of frequencies $\\sum f = 4 + 6 + 8 + 7 + 5 = 30$.', markTag: '[1m]' },
        { step: 'Mean $\\bar{x} = \\frac{\\sum fx}{\\sum f} = \\frac{615}{30} = 20.5$.', markTag: '[1m]' },
      ],
      finalAnswer: '20.5',
      commonMistake: 'Dividing $\\sum fx$ by 5 (number of rows) instead of $\\sum f = 30$.',
    },
  },
  {
    id: 'ch13_q05',
    chapterId: 13,
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
    id: 'ch13_q06',
    chapterId: 13,
    unitId: 5,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Finding Missing Frequency from Given Mean',
    prompt: 'The mean of the numbers $8,\\; 5,\\; 12,\\; p,\\; 15,\\; 9$ is $11$. Find the value of $p$.',
    expectedAnswer: '17',
    hintLadder: {
      hint1Concept: 'Use the mean formula $\\bar{x} = \\frac{\\sum x}{n}$.',
      hint2Formula: 'There are $6$ numbers. Sum $= 8 + 5 + 12 + p + 15 + 9 = 49 + p$.',
      hint3Step: '$\\frac{49 + p}{6} = 11 \\implies 49 + p = 66 \\implies p = 66 - 49 = 17$.',
    },
    solution: {
      steps: [
        { step: 'Number of observations $n = 6$. Total sum $= 8 + 5 + 12 + 15 + 9 + p = 49 + p$.', markTag: '[1m]' },
        { step: 'Given $\\text{Mean} = 11 \\implies \\frac{49 + p}{6} = 11$.', markTag: '[1m]' },
        { step: '$49 + p = 66 \\implies p = 66 - 49 = 17$.', markTag: '[1m]' },
      ],
      finalAnswer: 'p = 17',
      commonMistake: 'Counting 5 observations instead of 6.',
    },
  },
];
