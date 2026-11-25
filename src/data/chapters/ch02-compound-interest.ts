import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateCompoundInterestQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 3);

  if (type === 1) {
    // Basic CI with formula: P in multiples of 1000, R in [5, 10, 12, 15], n in [2, 3]
    const P = rng.choice([4000, 5000, 6000, 8000, 10000, 12000, 15000, 20000]);
    const R = rng.choice([5, 8, 10, 12]);
    const n = 2; // Keep 2 years for clean integer or nice decimal numbers

    const A = Math.round(P * Math.pow(1 + R / 100, n) * 100) / 100;
    const CI = Math.round((A - P) * 100) / 100;

    const askAmount = rng.choice([true, false]);
    const prompt = askAmount
      ? `Calculate the **Amount** on a principal of ₹${P.toLocaleString()} invested for ${n} years at ${R}% per annum compounded annually.`
      : `Calculate the **Compound Interest** on a sum of ₹${P.toLocaleString()} for ${n} years at ${R}% per annum compounded annually.`;

    const expectedAnswer = askAmount ? `${A}` : `${CI}`;

    return {
      id: `gen_ch02_${rng.int(10000, 99999)}`,
      chapterId: 2,
      unitId: 2,
      title: askAmount ? 'Compound Amount Calculation' : 'Compound Interest Calculation',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 3,
      prompt,
      expectedAnswer,
      tolerance: 0.5,
      acceptableAnswers: [
        `Rs ${expectedAnswer}`,
        `₹ ${expectedAnswer}`,
        `${expectedAnswer}`
      ],
      hintLadder: {
        hint1Concept: 'Apply the standard compound interest formula $A = P\\left(1 + \\frac{R}{100}\\right)^n$.',
        hint2Formula: `$A = ${P}\\left(1 + \\frac{${R}}{100}\\right)^2 = ${P} \\times \\left(\\frac{${100+R}}{100}\\right)^2$.`,
        hint3Step: askAmount
          ? `Evaluate $A = ${P} \\times ${((100+R)/100).toFixed(2)}^2$.`
          : `Find Amount $A$, then Compound Interest $CI = A - P = A - ${P}$.`,
      },
      solution: {
        steps: [
          { step: `Given: $P = ${P}$, $R = ${R}\\%$, $n = ${n}$ years.`, markTag: '[1m]' },
          { step: `Formula: $A = P\\left(1 + \\frac{R}{100}\\right)^n = ${P}\\left(1 + \\frac{${R}}{100}\\right)^2 = ${P} \\times \\frac{${100+R}}{100} \\times \\frac{${100+R}}{100} = ₹${A}$.`, markTag: '[1m]' },
          { step: askAmount ? `Total Amount $= ₹${A}$.` : `Compound Interest $CI = A - P = ${A} - ${P} = ₹${CI}$.`, markTag: '[1m]' },
        ],
        finalAnswer: askAmount ? `₹${A}` : `₹${CI}`,
        commonMistake: 'Calculating simple interest instead of compounding, or forgetting to subtract $P$ when CI is asked.',
      },
      isGenerated: true,
      generatorId: 'ch02',
      generatorSeed: seed,
    };
  } else if (type === 2) {
    // CI - SI difference for 2 years: Diff = P * (R/100)^2
    const P = rng.choice([2500, 5000, 10000, 12500, 16000, 20000]);
    const R = rng.choice([4, 5, 8, 10]);
    const diff = Math.round(P * Math.pow(R / 100, 2) * 100) / 100;

    const prompt = `The difference between the compound interest and simple interest on a certain sum of money invested for 2 years at ${R}% per annum is ₹${diff}. Find the **sum of money (Principal)**.`;
    const expectedAnswer = `${P}`;

    return {
      id: `gen_ch02_${rng.int(10000, 99999)}`,
      chapterId: 2,
      unitId: 2,
      title: 'Difference Between CI and SI for 2 Years',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer,
      tolerance: 1.0,
      acceptableAnswers: [`Rs ${P}`, `₹ ${P}`, `${P}`],
      hintLadder: {
        hint1Concept: 'Use the 2-year difference formula between CI and SI.',
        hint2Formula: '$\\text{CI} - \\text{SI} = P\\left(\\frac{R}{100}\\right)^2$.',
        hint3Step: `${diff} = P \\times \\left(\\frac{${R}}{100}\\right)^2 = P \\times \\frac{${R*R}}{10000} \\implies P = \\frac{${diff} \\times 10000}{${R*R}}$.`,
      },
      solution: {
        steps: [
          { step: `For 2 years, $\\text{CI} - \\text{SI} = P\\left(\\frac{R}{100}\\right)^2$.`, markTag: '[1m]' },
          { step: `Substitute given values: $${diff} = P \\left(\\frac{${R}}{100}\\right)^2 = P \\times \\frac{${R*R}}{10000}$.`, markTag: '[1m]' },
          { step: `$P = \\frac{${diff} \\times 10000}{${R*R}} = ₹${P}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `₹${P}`,
        commonMistake: 'Using the formula for 3 years or confusing $R/100$ with $R/10$.',
      },
      isGenerated: true,
      generatorId: 'ch02',
      generatorSeed: seed,
    };
  } else {
    // Depreciation problem
    const P = rng.choice([20000, 25000, 40000, 50000, 80000, 100000]);
    const r = rng.choice([10, 20]);
    const n = 2;
    const factor = Math.pow(1 - r / 100, n);
    const V = Math.round(P * factor);

    const prompt = `A machine was bought for ₹${P.toLocaleString()}. Its value depreciates at the rate of ${r}% per annum. Find its value after ${n} years.`;
    const expectedAnswer = `${V}`;

    return {
      id: `gen_ch02_${rng.int(10000, 99999)}`,
      chapterId: 2,
      unitId: 2,
      title: 'Depreciation of Machinery',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer,
      tolerance: 1.0,
      acceptableAnswers: [`Rs ${V}`, `₹ ${V}`, `${V}`],
      hintLadder: {
        hint1Concept: 'Depreciation decreases value over time, so use the minus formula.',
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
        commonMistake: 'Using $+ r/100$ instead of $- r/100$ because the question mentions a percentage rate.',
      },
      isGenerated: true,
      generatorId: 'ch02',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh02: Question[] = [
  {
    id: 'ch02_q01',
    chapterId: 2,
    unitId: 2,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Compounding Frequency Property',
    prompt: 'If interest is compounded **half-yearly**, then the annual rate of interest $R\\%$ per annum and time $n$ years become:',
    mcqOptions: [
      { id: 'A', text: 'Rate $R/2 \\%$, Time $2n$ periods', explanation: 'Correct: Interest is calculated twice a year at half the annual rate.' },
      { id: 'B', text: 'Rate $2R \\%$, Time $n/2$ periods', explanation: 'Incorrect: rate cannot double when time is halved.' },
      { id: 'C', text: 'Rate $R/2 \\%$, Time $n$ periods', explanation: 'Incorrect: number of compounding periods must double.' },
      { id: 'D', text: 'Rate $R \\%$, Time $2n$ periods', explanation: 'Incorrect: rate must also be halved for each half-year.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'In half-yearly compounding, each year consists of 2 half-years.',
      hint2Formula: 'Rate per conversion period is $R/2$ and total periods is $2 \\times n$.',
      hint3Step: 'Therefore, $R \\to R/2$ and $n \\to 2n$.',
    },
    solution: {
      steps: [
        { step: 'A year has two six-month conversion periods, so number of periods is $2n$.', markTag: '[0.5m]' },
        { step: 'Annual interest rate $R\\%$ applies to a full year, so rate per half-year is $R/2\\%$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Rate R/2 %, Time 2n periods',
      commonMistake: 'Doubling the rate and halving the time.',
    },
  },
  {
    id: 'ch02_q02',
    chapterId: 2,
    unitId: 2,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: CI vs SI in Year 1',
    prompt: '**Assertion (A)**: For a given principal and rate of interest compounded annually, the Simple Interest and Compound Interest for the **first year** are strictly equal.\n\n**Reason (R)**: During the first year, interest is calculated on the same initial principal for both SI and CI.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Think about what principal is used for year 1 in SI versus CI.',
      hint2Formula: 'In Year 1, $I = \\frac{P \\times R \\times 1}{100}$ for both.',
      hint3Step: 'Compounding only adds interest to the principal at the end of Year 1, affecting Year 2 onwards.',
    },
    solution: {
      steps: [
        { step: 'For Year 1: $\\text{SI}_1 = \\frac{P \\times R \\times 1}{100}$ and $\\text{CI}_1 = \\frac{P \\times R \\times 1}{100}$. They are equal, so Assertion is True.', markTag: '[0.5m]' },
        { step: 'Interest for Year 1 is computed on the initial principal $P$ in both schemes. Reason is True and correctly explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Assuming compound interest is always strictly greater even in the very first year.',
    },
  },
  {
    id: 'ch02_q03',
    chapterId: 2,
    unitId: 2,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Successive Varying Rates of Interest',
    prompt: 'Calculate the compound amount on ₹10,000 in 2 years, if the rates of interest for the successive years are 8% and 10% respectively.',
    expectedAnswer: '11880',
    acceptableAnswers: ['11880', 'Rs 11880', '₹ 11880', '11,880'],
    hintLadder: {
      hint1Concept: 'Apply the successive varying rates formula.',
      hint2Formula: '$A = P\\left(1 + \\frac{R_1}{100}\\right)\\left(1 + \\frac{R_2}{100}\\right)$.',
      hint3Step: '$A = 10000 \\times \\left(1 + \\frac{8}{100}\\right) \\times \\left(1 + \\frac{10}{100}\\right) = 10000 \\times 1.08 \\times 1.10$.',
    },
    solution: {
      steps: [
        { step: 'Formula: $A = P\\left(1 + \\frac{R_1}{100}\\right)\\left(1 + \\frac{R_2}{100}\\right)$.', markTag: '[1m]' },
        { step: 'Substitute $P = 10000, R_1 = 8\\%, R_2 = 10\\%$: $A = 10000 \\times \\frac{108}{100} \\times \\frac{110}{100}$.', markTag: '[1m]' },
        { step: '$A = 10000 \\times 1.08 \\times 1.10 = ₹11,880$.', markTag: '[1m]' },
      ],
      finalAnswer: '₹11,880',
      commonMistake: 'Averaging the rates as $(8+10)/2 = 9\\%$ and applying 9% for 2 years.',
    },
  },
  {
    id: 'ch02_q04',
    chapterId: 2,
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
        { step: 'Half-yearly rate $R/2 = 10/2 = 5\\%$. Number of conversion periods $2n = 2 \\times 1.5 = 3$.', markTag: '[1m]' },
        { step: '$A = 8000 \\left(1 + \\frac{5}{100}\\right)^3 = 8000 \\times \\left(\\frac{21}{20}\\right)^3 = 8000 \\times \\frac{9261}{8000} = ₹9,261$.', markTag: '[1m]' },
        { step: 'Compound Interest $CI = A - P = 9261 - 8000 = ₹1,261$.', markTag: '[1m]' },
      ],
      finalAnswer: '₹1,261',
      commonMistake: 'Forgetting to subtract $P = 8000$ to get $CI$, reporting Amount ₹9261 instead.',
    },
  },
  {
    id: 'ch02_q05',
    chapterId: 2,
    unitId: 2,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Year-by-Year CI Without Formula',
    prompt: 'A sum of ₹12,000 is lent at 10% per annum compound interest.\n\n**(i)** Calculate the interest for the first year.\n**(ii)** Calculate the compound interest for the second year.',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Interest for the first year (₹):',
        expectedAnswer: '1200',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Compound interest for the second year (₹):',
        expectedAnswer: '1320',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Compute year 1 interest, add it to principal to get principal for year 2.',
      hint2Formula: '$I_1 = \\frac{P_1 \\times R \\times 1}{100}$, then $P_2 = P_1 + I_1$.',
      hint3Step: '$P_2 = 12000 + 1200 = 13200$. Then $I_2 = \\frac{13200 \\times 10 \\times 1}{100} = 1320$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): For Year 1, $P_1 = 12000$. Interest $I_1 = \\frac{12000 \\times 10 \\times 1}{100} = ₹1,200$.', markTag: '[1m]' },
        { step: 'Amount at end of Year 1 $= 12000 + 1200 = ₹13,200$. This becomes $P_2$.', markTag: '[1m]' },
        { step: 'Part (ii): For Year 2, Interest $I_2 = \\frac{13200 \\times 10 \\times 1}{100} = ₹1,320$.', markTag: '[2m]' },
      ],
      finalAnswer: '(i) ₹1,200, (ii) ₹1,320',
      commonMistake: 'Reporting the total two-year compound interest (2520) in part (ii) instead of the interest for the second year alone (1320).',
    },
  },
  {
    id: 'ch02_q06',
    chapterId: 2,
    unitId: 2,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Finding the Rate of Interest',
    prompt: 'At what rate percent per annum will ₹4,000 amount to ₹4,840 in 2 years, interest compounded annually?',
    expectedAnswer: '10',
    acceptableAnswers: ['10', '10%', '10 %'],
    hintLadder: {
      hint1Concept: 'Substitute $A = 4840, P = 4000, n = 2$ into the compound amount formula.',
      hint2Formula: '$A/P = (1 + R/100)^2$.',
      hint3Step: '$\\frac{4840}{4000} = \\frac{121}{100} = \\left(\\frac{11}{10}\\right)^2 \\implies 1 + \\frac{R}{100} = \\frac{11}{10} \\implies \\frac{R}{100} = 0.1$.',
    },
    solution: {
      steps: [
        { step: 'Using $A = P\\left(1 + \\frac{R}{100}\\right)^n$: $4840 = 4000 \\left(1 + \\frac{R}{100}\\right)^2$.', markTag: '[1m]' },
        { step: '$\\left(1 + \\frac{R}{100}\\right)^2 = \\frac{4840}{4000} = \\frac{121}{100} = \\left(\\frac{11}{10}\\right)^2$.', markTag: '[1m]' },
        { step: 'Taking square root: $1 + \\frac{R}{100} = \\frac{11}{10} \\implies \\frac{R}{100} = \\frac{1}{10} \\implies R = 10\\%$.', markTag: '[1m]' },
      ],
      finalAnswer: '10%',
      commonMistake: 'Forgetting to take the square root of $121/100$ and setting $1 + R/100 = 121/100$.',
    },
  },
];
