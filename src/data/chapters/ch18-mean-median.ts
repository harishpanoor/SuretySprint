import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateMeanMedianQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Mean of raw data:
    const n = rng.choice([5, 6, 7]);
    const targetMean = rng.int(12, 28);
    const targetSum = targetMean * n;

    const numbers: number[] = [];
    let currentSum = 0;
    for (let i = 0; i < n - 1; i++) {
      const val = targetMean + rng.int(-8, 8);
      numbers.push(val);
      currentSum += val;
    }
    const lastVal = targetSum - currentSum;
    numbers.push(lastVal);

    const shuffled = rng.shuffle(numbers);
    const prompt = `Calculate the **Mean (Arithmetic Average)** of the following data set:\n$$${shuffled.join(',\\;\\;')}$$`;

    return {
      id: `gen_ch18_${rng.int(10000, 99999)}`,
      chapterId: 18,
      unitId: 5,
      title: 'Arithmetic Mean of Ungrouped Data',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${targetMean}`,
      acceptableAnswers: [`${targetMean}`, `${targetMean}.0`],
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
      generatorId: 'ch18',
      generatorSeed: seed,
    };
  } else {
    // Median of raw data (odd n = 7):
    const n = 7;
    const sortedVals: number[] = [];
    let start = rng.int(8, 20);
    for (let i = 0; i < n; i++) {
      sortedVals.push(start);
      start += rng.int(2, 5);
    }
    const medianVal = sortedVals[3]; // (7+1)/2 = 4th element
    const scrambled = rng.shuffle(sortedVals);

    const prompt = `Find the **Median** of the following set of observations:\n$$${scrambled.join(',\\;\\;')}$$`;

    return {
      id: `gen_ch18_${rng.int(10000, 99999)}`,
      chapterId: 18,
      unitId: 5,
      title: 'Median of Ungrouped Data (Odd N)',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${medianVal}`,
      acceptableAnswers: [`${medianVal}`, `${medianVal}.0`],
      hintLadder: {
        hint1Concept: 'First arrange all observations in ascending (or descending) order.',
        hint2Formula: 'For odd $n = 7$, the median is the $\\left(\\frac{n+1}{2}\\right)^{\\text{th}} = 4^{\\text{th}}$ observation.',
        hint3Step: `Sorted array: $${sortedVals.join(', ')}$. The $4^{\\text{th}}$ observation is $${medianVal}$.`,
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
      generatorId: 'ch18',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh18: Question[] = [
  {
    id: 'ch18_q01',
    chapterId: 18,
    unitId: 5,
    type: 'numerical',
    difficulty: 'Easy',
    marks: 2,
    title: 'Mean of First Five Prime Numbers',
    prompt: 'Find the **arithmetic mean** of the first five prime numbers.',
    expectedAnswer: '5.6',
    acceptableAnswers: ['5.6', '28/5'],
    hintLadder: {
      hint1Concept: 'List the first five prime numbers: $2, 3, 5, 7, 11$. Note that 1 is NOT prime!',
      hint2Formula: 'Sum $= 2 + 3 + 5 + 7 + 11 = 28$. Total count $n = 5$.',
      hint3Step: '$\\text{Mean} = 28 / 5 = 5.6$.',
    },
    solution: {
      steps: [
        { step: 'The first five prime numbers are $2, 3, 5, 7, 11$ (1 is neither prime nor composite).', markTag: '[1m]' },
        { step: 'Sum $= 2 + 3 + 5 + 7 + 11 = 28$. Mean $= \\frac{28}{5} = 5.6$.', markTag: '[1m]' },
      ],
      finalAnswer: '5.6',
      commonMistake: 'Including 1 as a prime number.',
    },
  },
  {
    id: 'ch18_q02',
    chapterId: 18,
    unitId: 5,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Linear Transformation of Mean',
    prompt: '**Assertion (A)**: If each observation in a data set is multiplied by 3 and then increased by 4, the mean of the new data set is $3\\bar{x} + 4$.\n\n**Reason (R)**: The arithmetic mean is a linear operator that scales and shifts identically with linear changes applied to every data point.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'If $y_i = a x_i + b$, then $\\bar{y} = a \\bar{x} + b$.',
      hint2Formula: 'Here $a = 3$ and $b = 4$.',
      hint3Step: 'Therefore the new mean is $3\\bar{x} + 4$.',
    },
    solution: {
      steps: [
        { step: '$\\frac{\\sum (3x_i + 4)}{n} = \\frac{3\\sum x_i + 4n}{n} = 3\\bar{x} + 4$. Assertion is True.', markTag: '[0.5m]' },
        { step: 'Reason gives the algebraic property of linearity of the mean. Both are True and R correctly explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Thinking that multiplying each number does not affect the mean.',
    },
  },
  {
    id: 'ch18_q03',
    chapterId: 18,
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
      hint3Step: 'For even $n$, $\\text{Median} = \\frac{4^{\\text{th}} + 5^{\\text{th}}}{2} = \\frac{20 + 22}{2} = 21$.',
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
    id: 'ch18_q04',
    chapterId: 18,
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
      commonMistake: 'Dividing $\\sum fx$ by 5 (number of columns) instead of $\\sum f = 30$.',
    },
  },
  {
    id: 'ch18_q05',
    chapterId: 18,
    unitId: 5,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Finding Missing Observation from Given Mean',
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
  {
    id: 'ch18_q06',
    chapterId: 18,
    unitId: 5,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Ordered Data with Unknown x',
    prompt: 'The following observations have been arranged in ascending order:\n$$18,\\; 20,\\; x,\\; x + 2,\\; 28,\\; 30$$\nIf the **median** of the data is $24$:\n\n**(i)** Find the value of $x$.\n**(ii)** Find the **mean** of the data.',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Value of x:',
        expectedAnswer: '23',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Mean of the data:',
        expectedAnswer: '24',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'There are 6 observations (even). The middle two are the 3rd and 4th terms.',
      hint2Formula: '$\\text{Median} = \\frac{x + (x + 2)}{2} = \\frac{2x + 2}{2} = x + 1$.',
      hint3Step: '$x + 1 = 24 \\implies x = 23$. Then substitute $x=23$ to find the mean.',
    },
    solution: {
      steps: [
        { step: 'Part (i): For $n = 6$, median is the average of $3^{\\text{rd}}$ and $4^{\\text{th}}$ terms: $\\frac{x + (x+2)}{2} = x + 1$.', markTag: '[1m]' },
        { step: '$x + 1 = 24 \\implies x = 23$.', markTag: '[1m]' },
        { step: 'Part (ii): The numbers are $18, 20, 23, 25, 28, 30$. Sum $= 144$.', markTag: '[1m]' },
        { step: '$\\text{Mean} = \\frac{144}{6} = 24$.', markTag: '[1m]' },
      ],
      finalAnswer: '(i) x = 23, (ii) Mean = 24',
      commonMistake: 'Taking $x$ alone as the median without averaging with $(x+2)$.',
    },
  },
];
