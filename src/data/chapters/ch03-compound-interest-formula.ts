import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateCompoundInterestFormulaQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 3);

  if (type === 1) {
    // Formula CI with annual compounding: P in [4000, 5000, 8000, 10000, 12000, 15000], R in [5, 10, 12]
    const P = rng.choice([4000, 5000, 8000, 10000, 12000, 15000, 20000]);
    const R = rng.choice([5, 8, 10, 12]);
    const n = 2;

    const A = Math.round(P * Math.pow(1 + R / 100, n) * 100) / 100;
    const CI = Math.round((A - P) * 100) / 100;

    const askAmount = rng.choice([true, false]);
    const prompt = askAmount
      ? `Using the formula, calculate the **Amount** on a principal of ₹${P.toLocaleString()} invested for ${n} years at ${R}% per annum compounded annually.`
      : `Using the formula, calculate the **Compound Interest** on a sum of ₹${P.toLocaleString()} for ${n} years at ${R}% per annum compounded annually.`;

    const expectedAnswer = askAmount ? `${A}` : `${CI}`;

    return {
      id: `gen_ch03_${rng.int(10000, 99999)}`,
      chapterId: 3,
      unitId: 2,
      title: askAmount ? 'Compound Amount Using Formula' : 'Compound Interest Using Formula',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 3,
      prompt,
      expectedAnswer,
      tolerance: 0.5,
      acceptableAnswers: [
        `Rs ${expectedAnswer}`,
        `₹ ${expectedAnswer}`,
        `${expectedAnswer}`,
        expectedAnswer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      ],
      hintLadder: {
        hint1Concept: 'Apply the compound amount formula $A = P\\left(1 + \\frac{r}{100}\\right)^n$.',
        hint2Formula: `$A = ${P}\\left(1 + \\frac{${R}}{100}\\right)^2 = ${P} \\times \\left(\\frac{${100+R}}{100}\\right)^2$.`,
        hint3Step: askAmount
          ? `Evaluate $A = ${P} \\times \\left(\\frac{${100+R}}{100}\\right)^2 = ₹${A}$.`
          : `Find Amount $A = ₹${A}$, then Compound Interest $CI = A - P = ${A} - ${P} = ₹${CI}$.`,
      },
      solution: {
        steps: [
          { step: `Given: $P = ₹${P}$, $r = ${R}\\%$, $n = ${n}$ years.`, markTag: '[1m]' },
          { step: `Using $A = P\\left(1 + \\frac{r}{100}\\right)^n$: $A = ${P}\\left(1 + \\frac{${R}}{100}\\right)^2 = ${P} \\times \\frac{${100+R}}{100} \\times \\frac{${100+R}}{100} = ₹${A}$.`, markTag: '[1m]' },
          { step: askAmount ? `Amount $= ₹${A}$.` : `$\\text{CI} = A - P = ${A} - ${P} = ₹${CI}$.`, markTag: '[1m]' },
        ],
        finalAnswer: askAmount ? `₹${A}` : `₹${CI}`,
        commonMistake: 'Forgetting to subtract principal $P$ when asked for Compound Interest.',
      },
      isGenerated: true,
      generatorId: 'ch03',
      generatorSeed: seed,
    };
  } else if (type === 2) {
    // Difference between CI and SI for 2 years: Diff = P * (R/100)^2
    const P = rng.choice([2500, 5000, 10000, 12500, 16000, 20000]);
    const R = rng.choice([4, 5, 8, 10]);
    const diff = Math.round(P * Math.pow(R / 100, 2) * 100) / 100;

    const prompt = `The difference between the compound interest and simple interest on a certain sum of money invested for 2 years at ${R}% per annum compounded annually is ₹${diff}.\nFind the **Principal (sum of money)**.`;
    const expectedAnswer = `${P}`;

    return {
      id: `gen_ch03_${rng.int(10000, 99999)}`,
      chapterId: 3,
      unitId: 2,
      title: 'Difference Between CI and SI for 2 Years',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer,
      tolerance: 1.0,
      acceptableAnswers: [`Rs ${P}`, `₹ ${P}`, `${P}`, P.toLocaleString()],
      hintLadder: {
        hint1Concept: 'Use the standard 2-year difference formula between CI and SI.',
        hint2Formula: '$\\text{CI} - \\text{SI} = P\\left(\\frac{r}{100}\\right)^2$.',
        hint3Step: `$${diff} = P \\times \\left(\\frac{${R}}{100}\\right)^2 \\implies P = \\frac{${diff} \\times 10000}{${R * R}}$.`,
      },
      solution: {
        steps: [
          { step: `For 2 years: $\\text{CI} - \\text{SI} = P\\left(\\frac{r}{100}\\right)^2$.`, markTag: '[1m]' },
          { step: `Substitute given values: $${diff} = P \\left(\\frac{${R}}{100}\\right)^2 = P \\times \\frac{${R*R}}{10000}$.`, markTag: '[1m]' },
          { step: `$P = \\frac{${diff} \\times 10000}{${R*R}} = ₹${P}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `₹${P}`,
        commonMistake: 'Dividing by $R$ instead of $R^2$.',
      },
      isGenerated: true,
      generatorId: 'ch03',
      generatorSeed: seed,
    };
  } else {
    // Depreciation problem
    const P = rng.choice([20000, 25000, 40000, 50000, 80000, 100000]);
    const r = rng.choice([10, 20]);
    const n = 2;
    const factor = Math.pow(1 - r / 100, n);
    const V = Math.round(P * factor);

    const prompt = `A machine was purchased for ₹${P.toLocaleString()}. Its value depreciates at the rate of ${r}% per annum. Find its value after ${n} years.`;
    const expectedAnswer = `${V}`;

    return {
      id: `gen_ch03_${rng.int(10000, 99999)}`,
      chapterId: 3,
      unitId: 2,
      title: 'Depreciation of Machinery',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer,
      tolerance: 1.0,
      acceptableAnswers: [`Rs ${V}`, `₹ ${V}`, `${V}`, V.toLocaleString()],
      hintLadder: {
        hint1Concept: 'Depreciation decreases value over time, so use the minus sign in the formula.',
        hint2Formula: '$V = P\\left(1 - \\frac{r}{100}\\right)^n$.',
        hint3Step: `$V = ${P} \\times \\left(1 - \\frac{${r}}{100}\\right)^2 = ${P} \\times \\left(\\frac{${100-r}}{100}\\right)^2$.`,
      },
      solution: {
        steps: [
          { step: `Formula for depreciation: $V = P\\left(1 - \\frac{r}{100}\\right)^n$.`, markTag: '[1m]' },
          { step: `Substitute $P = ${P}, r = ${r}\\%, n = ${n}$: $V = ${P}\\left(\\frac{${100-r}}{100}\\right)^2$.`, markTag: '[1m]' },
          { step: `$V = ${P} \\times ${((100-r)/100)*((100-r)/100)} = ₹${V}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `₹${V}`,
        commonMistake: 'Using $+ r/100$ instead of $- r/100$ in depreciation.',
      },
      isGenerated: true,
      generatorId: 'ch03',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh03: Question[] = [
  {
    id: 'ch03_q01',
    chapterId: 3,
    unitId: 2,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Compounding Frequency Conversion',
    prompt: 'If interest is compounded **half-yearly**, then the annual rate of interest $r\\%$ per annum and time $n$ years become:',
    mcqOptions: [
      { id: 'A', text: 'Rate $r/2 \\%$, Time $2n$ periods', explanation: 'Correct: Interest is compounded twice a year at half the annual rate.' },
      { id: 'B', text: 'Rate $2r \\%$, Time $n/2$ periods', explanation: 'Incorrect: rate does not double when compounding periods increase.' },
      { id: 'C', text: 'Rate $r/2 \\%$, Time $n$ periods', explanation: 'Incorrect: the number of compounding periods must double.' },
      { id: 'D', text: 'Rate $r \\%$, Time $2n$ periods', explanation: 'Incorrect: rate must also be halved for each half-year.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'In half-yearly compounding, each year consists of 2 half-years.',
      hint2Formula: 'Rate per conversion period is $r/2$ and total periods is $2 \\times n$.',
      hint3Step: 'Therefore, $r \\to r/2$ and $n \\to 2n$.',
    },
    solution: {
      steps: [
        { step: 'A year contains two six-month conversion periods, so number of periods is $2n$.', markTag: '[0.5m]' },
        { step: 'Annual interest rate $r\\%$ applies to a full year, so rate per half-year is $r/2\\%$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Rate r/2 %, Time 2n periods',
      commonMistake: 'Doubling the rate and halving the time.',
    },
  },
  {
    id: 'ch03_q02',
    chapterId: 3,
    unitId: 2,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Half-Yearly Compounding Calculation',
    prompt: 'Find the compound interest on ₹8,000 at 10% per annum for $1\\frac{1}{2}$ years, compounded half-yearly.',
    expectedAnswer: '1261',
    acceptableAnswers: ['1261', 'Rs 1261', '₹ 1261', '1,261'],
    hintLadder: {
      hint1Concept: 'Convert rate to half-yearly and time to number of half-years.',
      hint2Formula: 'Rate $r = 10/2 = 5\\%$ per half-year; Time $n = 1.5 \\times 2 = 3$ half-years.',
      hint3Step: '$A = 8000 \\times (1.05)^3 = 8000 \\times \\frac{21}{20} \\times \\frac{21}{20} \\times \\frac{21}{20} = 9261$. Then $CI = 9261 - 8000$.',
    },
    solution: {
      steps: [
        { step: 'Half-yearly rate $r/2 = 10/2 = 5\\%$. Number of conversion periods $2n = 2 \\times 1.5 = 3$.', markTag: '[1m]' },
        { step: '$A = 8000 \\left(1 + \\frac{5}{100}\\right)^3 = 8000 \\times \\left(\\frac{21}{20}\\right)^3 = 8000 \\times \\frac{9261}{8000} = ₹9,261$.', markTag: '[1m]' },
        { step: 'Compound Interest $CI = A - P = 9261 - 8000 = ₹1,261$.', markTag: '[1m]' },
      ],
      finalAnswer: '₹1,261',
      commonMistake: 'Forgetting to subtract $P = 8000$ to get $CI$, reporting Amount ₹9261 instead.',
    },
  },
  {
    id: 'ch03_q03',
    chapterId: 3,
    unitId: 2,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Finding the Rate of Interest with Formula',
    prompt: 'At what rate percent per annum will ₹4,000 amount to ₹4,840 in 2 years, interest compounded annually?',
    expectedAnswer: '10',
    acceptableAnswers: ['10', '10%', '10 %'],
    hintLadder: {
      hint1Concept: 'Substitute $A = 4840, P = 4000, n = 2$ into the compound amount formula.',
      hint2Formula: '$A/P = (1 + r/100)^2$.',
      hint3Step: '$\\frac{4840}{4000} = \\frac{121}{100} = \\left(\\frac{11}{10}\\right)^2 \\implies 1 + \\frac{r}{100} = \\frac{11}{10} \\implies r = 10$.',
    },
    solution: {
      steps: [
        { step: 'Using $A = P\\left(1 + \\frac{r}{100}\\right)^n$: $4840 = 4000 \\left(1 + \\frac{r}{100}\\right)^2$.', markTag: '[1m]' },
        { step: '$\\left(1 + \\frac{r}{100}\\right)^2 = \\frac{4840}{4000} = \\frac{121}{100} = \\left(\\frac{11}{10}\\right)^2$.', markTag: '[1m]' },
        { step: 'Taking square root: $1 + \\frac{r}{100} = \\frac{11}{10} \\implies \\frac{r}{100} = \\frac{1}{10} \\implies r = 10\\%$.', markTag: '[1m]' },
      ],
      finalAnswer: '10%',
      commonMistake: 'Forgetting to take the square root of $121/100$ and setting $1 + r/100 = 121/100$.',
    },
  },
  {
    id: 'ch03_q04',
    chapterId: 3,
    unitId: 2,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Depreciation of a Vehicle',
    prompt: 'The cost of a scooter is ₹60,000. If its value depreciates at the rate of 10% per annum, find its value after 2 years.',
    expectedAnswer: '48600',
    acceptableAnswers: ['48600', 'Rs 48600', '₹ 48600', '48,600'],
    nepTags: ['Life Skills'],
    hintLadder: {
      hint1Concept: 'Use the depreciation formula with a minus sign.',
      hint2Formula: '$V = P\\left(1 - \\frac{r}{100}\\right)^n$.',
      hint3Step: '$V = 60000 \\times \\left(1 - \\frac{10}{100}\\right)^2 = 60000 \\times 0.9 \\times 0.9 = 60000 \\times 0.81$.',
    },
    solution: {
      steps: [
        { step: 'Depreciation formula: $V = P\\left(1 - \\frac{r}{100}\\right)^n$.', markTag: '[1m]' },
        { step: 'Substitute $P = 60000, r = 10, n = 2$: $V = 60000\\left(1 - \\frac{10}{100}\\right)^2 = 60000\\left(\\frac{9}{10}\\right)^2$.', markTag: '[1m]' },
        { step: '$V = 60000 \\times \\frac{81}{100} = ₹48,600$.', markTag: '[1m]' },
      ],
      finalAnswer: '₹48,600',
      commonMistake: 'Adding $10\\%$ instead of subtracting, getting ₹72,600.',
    },
  },
  {
    id: 'ch03_q05',
    chapterId: 3,
    unitId: 2,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Population Growth (HOTS)',
    prompt: 'The population of a city was 1,60,000 two years ago. If the population grew at the rate of 5% in the first year and 10% in the second year, find the present population of the city.',
    expectedAnswer: '184800',
    acceptableAnswers: ['184800', '1,84,800', '184,800'],
    nepTags: ['HOTS', 'Experiential Learning'],
    hintLadder: {
      hint1Concept: 'Population growth follows compound interest with varying rates.',
      hint2Formula: '$V = P\\left(1 + \\frac{r_1}{100}\\right)\\left(1 + \\frac{r_2}{100}\\right)$.',
      hint3Step: '$V = 160000 \\times \\left(1 + \\frac{5}{100}\\right) \\times \\left(1 + \\frac{10}{100}\\right) = 160000 \\times 1.05 \\times 1.10$.',
    },
    solution: {
      steps: [
        { step: 'Formula for population growth with varying rates: $V = P\\left(1 + \\frac{r_1}{100}\\right)\\left(1 + \\frac{r_2}{100}\\right)$.', markTag: '[1m]' },
        { step: '$V = 160000 \\times \\frac{105}{100} \\times \\frac{110}{100} = 160000 \\times \\frac{21}{20} \\times \\frac{11}{10}$.', markTag: '[1m]' },
        { step: '$V = 800 \\times 21 \\times 11 = 1,84,800$.', markTag: '[1m]' },
      ],
      finalAnswer: '1,84,800',
      commonMistake: 'Averaging the two growth rates as 7.5% and squaring $(1.075)^2$.',
    },
  },
  {
    id: 'ch03_q06',
    chapterId: 3,
    unitId: 2,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Finding Principal from CI-SI Difference',
    prompt: 'The difference between the compound interest and the simple interest on a certain sum of money for 2 years at 8% per annum compounded annually is ₹64. Find the **sum of money (Principal)**.',
    expectedAnswer: '10000',
    acceptableAnswers: ['10000', 'Rs 10000', '₹ 10000', '10,000'],
    hintLadder: {
      hint1Concept: 'Apply the 2-year difference formula directly.',
      hint2Formula: '$\\text{CI} - \\text{SI} = P\\left(\\frac{r}{100}\\right)^2$.',
      hint3Step: `$64 = P \\times \\left(\\frac{8}{100}\\right)^2 = P \\times \\frac{64}{10000} \\implies P = 10,000$.`,
    },
    solution: {
      steps: [
        { step: 'Difference formula for 2 years: $\\text{CI} - \\text{SI} = P\\left(\\frac{r}{100}\\right)^2$.', markTag: '[1m]' },
        { step: '$64 = P \\times \\left(\\frac{8}{100}\\right)^2 = P \\times \\frac{64}{10000}$.', markTag: '[1m]' },
        { step: '$P = \\frac{64 \\times 10000}{64} = ₹10,000$.', markTag: '[1m]' },
      ],
      finalAnswer: '₹10,000',
      commonMistake: 'Using $\\frac{r}{100}$ instead of $\\left(\\frac{r}{100}\\right)^2$.',
    },
  },
  {
    id: 'ch03_q07',
    chapterId: 3,
    unitId: 2,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Multi-Part: Finding Principal and SI from CI',
    prompt: 'The compound interest on a sum of money for 2 years at 10% per annum compounded annually is ₹2,100.\n\n**(i)** Find the Principal sum of money.\n**(ii)** Find the Simple Interest on the same sum for the same period and rate.',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Principal sum of money (₹):',
        expectedAnswer: '10000',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Simple Interest (₹):',
        expectedAnswer: '2000',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Express CI in terms of $P$: $\\text{CI} = P[(1+r/100)^n - 1]$.',
      hint2Formula: '$2100 = P[(1.10)^2 - 1] = P[1.21 - 1] = 0.21 P$.',
      hint3Step: '$P = 2100 / 0.21 = 10000$. Then $\\text{SI} = \\frac{10000 \\times 10 \\times 2}{100} = 2000$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): $\\text{CI} = P\\left[\\left(1 + \\frac{10}{100}\\right)^2 - 1\\right] = P[1.21 - 1] = 0.21 P$.', markTag: '[1m]' },
        { step: '$0.21 P = 2100 \\implies P = \\frac{2100}{0.21} = ₹10,000$.', markTag: '[1m]' },
        { step: 'Part (ii): $\\text{SI} = \\frac{P \\times r \\times t}{100} = \\frac{10000 \\times 10 \\times 2}{100} = ₹2,000$.', markTag: '[2m]' },
      ],
      finalAnswer: '(i) ₹10,000, (ii) ₹2,000',
      commonMistake: 'Confusing CI with Amount $A$, writing $A = 2100$.',
    },
  },
];
