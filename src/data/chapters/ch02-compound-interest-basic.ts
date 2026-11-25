import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateCompoundInterestBasicQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Year-by-year CI without formula: P in multiples of 1000, R in [5, 8, 10, 12]
    const P1 = rng.choice([5000, 6000, 8000, 10000, 12000, 15000]);
    const R = rng.choice([5, 8, 10, 12]);
    const I1 = Math.round((P1 * R) / 100);
    const P2 = P1 + I1;
    const I2 = Math.round((P2 * R) / 100);
    const totalCI = I1 + I2;

    const askSecondYear = rng.choice([true, false]);
    const prompt = askSecondYear
      ? `A sum of ₹${P1.toLocaleString()} is invested for 2 years at ${R}% per annum compound interest, compounded annually.\nUsing the **year-by-year method (without formula)**, find the **interest for the second year**.`
      : `Calculate the total **Compound Interest** on ₹${P1.toLocaleString()} for 2 years at ${R}% per annum compounded annually using the **year-by-year method without using the formula**.`;

    const expectedAnswer = askSecondYear ? `${I2}` : `${totalCI}`;

    return {
      id: `gen_ch02_${rng.int(10000, 99999)}`,
      chapterId: 2,
      unitId: 2,
      title: askSecondYear ? 'CI for Second Year (Without Formula)' : 'Total CI by Year-by-Year Method',
      type: 'numerical',
      difficulty: 'Standard',
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
        hint1Concept: 'Compute interest for Year 1 first using $I_1 = \\frac{P_1 \\times R \\times 1}{100}$.',
        hint2Formula: 'The principal for Year 2 is $P_2 = P_1 + I_1$. Then $I_2 = \\frac{P_2 \\times R \\times 1}{100}$.',
        hint3Step: askSecondYear
          ? `Interest for Year 1 is ₹${I1}. Principal for Year 2 is ₹${P2}. Now compute ${R}% of ${P2}.`
          : `Total CI is $I_1 + I_2 = ${I1} + ${I2} = ₹${totalCI}$.`,
      },
      solution: {
        steps: [
          { step: `For Year 1: $P_1 = ₹${P1}$, $R = ${R}\\%$. Interest $I_1 = \\frac{${P1} \\times ${R} \\times 1}{100} = ₹${I1}$.`, markTag: '[1m]' },
          { step: `Amount at end of Year 1: $A_1 = P_1 + I_1 = ${P1} + ${I1} = ₹${P2}$. This becomes principal for Year 2 ($P_2$).`, markTag: '[1m]' },
          { step: askSecondYear
              ? `For Year 2: Interest $I_2 = \\frac{${P2} \\times ${R} \\times 1}{100} = ₹${I2}$.`
              : `For Year 2: $I_2 = \\frac{${P2} \\times ${R} \\times 1}{100} = ₹${I2}$. Total $\\text{CI} = I_1 + I_2 = ${I1} + ${I2} = ₹${totalCI}$.`,
            markTag: '[1m]' },
        ],
        finalAnswer: askSecondYear ? `₹${I2}` : `₹${totalCI}`,
        commonMistake: 'Calculating simple interest $I = \\frac{P \\times R \\times 2}{100}$ directly instead of using the compound interest year-by-year steps.',
      },
      isGenerated: true,
      generatorId: 'ch02',
      generatorSeed: seed,
    };
  } else {
    // Varying rates for successive years without formula
    const P1 = rng.choice([8000, 10000, 12000, 15000, 20000]);
    const R1 = rng.choice([5, 8, 10]);
    const R2 = rng.choice([8, 10, 12]);
    const I1 = Math.round((P1 * R1) / 100);
    const P2 = P1 + I1;
    const I2 = Math.round((P2 * R2) / 100);
    const finalAmount = P2 + I2;

    const prompt = `A sum of ₹${P1.toLocaleString()} is lent for 2 years at compound interest. The rate of interest is ${R1}% for the first year and ${R2}% for the second year.\nFind the **amount** at the end of the second year using the year-by-year method.`;

    const expectedAnswer = `${finalAmount}`;

    return {
      id: `gen_ch02_${rng.int(10000, 99999)}`,
      chapterId: 2,
      unitId: 2,
      title: 'Successive Varying Rates Without Formula',
      type: 'numerical',
      difficulty: 'Standard',
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
        hint1Concept: 'Calculate interest for Year 1 with rate $R_1$, add to $P_1$ to get $P_2$.',
        hint2Formula: 'Then calculate interest for Year 2 on $P_2$ using rate $R_2$.',
        hint3Step: `Year 1 Interest: $\\frac{${P1} \\times ${R1}}{100} = ₹${I1}$. Principal for Year 2: ₹${P2}. Now apply ${R2}\\% on ₹${P2}.`,
      },
      solution: {
        steps: [
          { step: `For 1st year: $P_1 = ₹${P1}, R_1 = ${R1}\\%$. $I_1 = \\frac{${P1} \\times ${R1} \\times 1}{100} = ₹${I1}$.`, markTag: '[1m]' },
          { step: `Amount at end of 1st year: $A_1 = ${P1} + ${I1} = ₹${P2}$. This is $P_2$.`, markTag: '[1m]' },
          { step: `For 2nd year: $R_2 = ${R2}\\%$. $I_2 = \\frac{${P2} \\times ${R2} \\times 1}{100} = ₹${I2}$. Total Amount $A_2 = ${P2} + ${I2} = ₹${finalAmount}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `₹${finalAmount}`,
        commonMistake: 'Using rate $R_1$ for both years or taking the average of the two rates.',
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
    type: 'assertion_reason',
    difficulty: 'Easy',
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
        { step: 'For Year 1: $\\text{SI}_1 = \\frac{P \\times R \\times 1}{100}$ and $\\text{CI}_1 = \\frac{P \\times R \\times 1}{100}$. They are identical, so Assertion is True.', markTag: '[0.5m]' },
        { step: 'Interest for Year 1 is computed on the initial principal $P$ in both schemes. Reason is True and correctly explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Assuming compound interest is always strictly greater even in the very first year.',
    },
  },
  {
    id: 'ch02_q02',
    chapterId: 2,
    unitId: 2,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Concept of Compounding Without Formula',
    prompt: 'In the year-by-year method of calculating compound interest, the principal for any given year is equal to:',
    mcqOptions: [
      { id: 'A', text: 'The initial principal invested at the start', explanation: 'Incorrect: that is for Simple Interest.' },
      { id: 'B', text: 'The accumulated amount at the end of the preceding year', explanation: 'Correct: $P_{n} = A_{n-1} = P_{n-1} + I_{n-1}$.' },
      { id: 'C', text: 'The interest earned in the previous year only', explanation: 'Incorrect: principal includes the previous principal plus interest.' },
      { id: 'D', text: 'Half of the original principal', explanation: 'Incorrect: unrelated to compounding.' },
    ],
    correctOptionId: 'B',
    hintLadder: {
      hint1Concept: 'Compounding means interest is added to principal at the end of each period.',
      hint2Formula: 'Principal for year $n$ equals $A_{n-1} = P_{n-1} + I_{n-1}$.',
      hint3Step: 'Therefore, the accumulated amount of the previous year becomes the new principal.',
    },
    solution: {
      steps: [
        { step: 'By definition of compound interest, interest earned during a period is added to the principal to form the new principal for the next period.', markTag: '[1m]' },
      ],
      finalAnswer: 'B: The accumulated amount at the end of the preceding year',
      commonMistake: 'Confusing compound interest with simple interest where principal remains constant.',
    },
  },
  {
    id: 'ch02_q03',
    chapterId: 2,
    unitId: 2,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Year-by-Year CI on ₹8,000 for 2 Years',
    prompt: 'Calculate the compound interest on ₹8,000 in 2 years at 5% per annum, without using the formula.',
    expectedAnswer: '820',
    acceptableAnswers: ['820', 'Rs 820', '₹ 820', '820.00'],
    hintLadder: {
      hint1Concept: 'Calculate interest for Year 1, add to principal, then calculate interest for Year 2.',
      hint2Formula: '$I_1 = \\frac{8000 \\times 5 \\times 1}{100} = 400$. Then $P_2 = 8400$.',
      hint3Step: '$I_2 = \\frac{8400 \\times 5 \\times 1}{100} = 420$. Total CI $= I_1 + I_2$.',
    },
    solution: {
      steps: [
        { step: 'For Year 1: $P_1 = ₹8000, R = 5\\%, T = 1\\text{ yr}$. $I_1 = \\frac{8000 \\times 5 \\times 1}{100} = ₹400$.', markTag: '[1m]' },
        { step: 'Amount at end of Year 1: $A_1 = 8000 + 400 = ₹8,400$. This becomes $P_2$.', markTag: '[1m]' },
        { step: 'For Year 2: $I_2 = \\frac{8400 \\times 5 \\times 1}{100} = ₹420$. Total $\\text{CI} = I_1 + I_2 = 400 + 420 = ₹820$.', markTag: '[1m]' },
      ],
      finalAnswer: '₹820',
      commonMistake: 'Reporting the Amount ₹8,820 instead of the Compound Interest ₹820.',
    },
  },
  {
    id: 'ch02_q04',
    chapterId: 2,
    unitId: 2,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Year-by-Year CI Without Formula',
    prompt: 'A sum of ₹12,000 is lent at 10% per annum compound interest, compounded annually.\n\n**(i)** Calculate the interest for the first year.\n**(ii)** Calculate the compound interest for the second year.',
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
        { step: 'Part (i): For Year 1, $P_1 = ₹12,000$. Interest $I_1 = \\frac{12000 \\times 10 \\times 1}{100} = ₹1,200$.', markTag: '[1m]' },
        { step: 'Amount at end of Year 1 $= 12000 + 1200 = ₹13,200$. This becomes $P_2$.', markTag: '[1m]' },
        { step: 'Part (ii): For Year 2, Interest $I_2 = \\frac{13200 \\times 10 \\times 1}{100} = ₹1,320$.', markTag: '[2m]' },
      ],
      finalAnswer: '(i) ₹1,200, (ii) ₹1,320',
      commonMistake: 'Reporting the total two-year compound interest (2520) in part (ii) instead of the interest for the second year alone (1320).',
    },
  },
  {
    id: 'ch02_q05',
    chapterId: 2,
    unitId: 2,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Successive Rates Year-by-Year',
    prompt: 'A sum of ₹10,000 is lent for 2 years at compound interest, compounded annually. The rate of interest is 8% for the first year and 10% for the second year. Find the **amount** at the end of the second year without using the formula.',
    expectedAnswer: '11880',
    acceptableAnswers: ['11880', 'Rs 11880', '₹ 11880', '11,880'],
    hintLadder: {
      hint1Concept: 'Compute Year 1 with 8%, then compute Year 2 on the new principal with 10%.',
      hint2Formula: '$I_1 = \\frac{10000 \\times 8}{100} = 800 \\implies P_2 = 10800$.',
      hint3Step: '$I_2 = \\frac{10800 \\times 10}{100} = 1080$. Amount $A_2 = 10800 + 1080$.',
    },
    solution: {
      steps: [
        { step: 'For Year 1: $P_1 = ₹10,000, R_1 = 8\\%$. $I_1 = \\frac{10000 \\times 8 \\times 1}{100} = ₹800$.', markTag: '[1m]' },
        { step: 'Amount $A_1 = 10000 + 800 = ₹10,800$. This is $P_2$ for Year 2.', markTag: '[1m]' },
        { step: 'For Year 2: $R_2 = 10\\%$. $I_2 = \\frac{10800 \\times 10 \\times 1}{100} = ₹1,080$. Total Amount $A_2 = 10800 + 1080 = ₹11,880$.', markTag: '[1m]' },
      ],
      finalAnswer: '₹11,880',
      commonMistake: 'Calculating 10% on the original 10,000 rather than on the updated principal 10,800.',
    },
  },
  {
    id: 'ch02_q06',
    chapterId: 2,
    unitId: 2,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Finding Rate from Consecutive Year Amounts',
    prompt: 'A certain sum of money invested at compound interest amounts to ₹2,420 at the end of the second year and to ₹2,662 at the end of the third year. Find the **rate of interest percent per annum**.',
    expectedAnswer: '10',
    acceptableAnswers: ['10', '10%', '10 %'],
    hintLadder: {
      hint1Concept: 'In compound interest, the interest for the 3rd year is the difference between $A_3$ and $A_2$, earned on $A_2$.',
      hint2Formula: 'Interest for 3rd year $I_3 = A_3 - A_2$. Rate $R = \\frac{I_3 \\times 100}{A_2 \\times 1}$.',
      hint3Step: '$I_3 = 2662 - 2420 = ₹242$. $R = \\frac{242 \\times 100}{2420} = 10\\%$.',
    },
    solution: {
      steps: [
        { step: 'Principal for the 3rd year is the amount at the end of the 2nd year: $P_3 = A_2 = ₹2,420$.', markTag: '[1m]' },
        { step: 'Interest earned in the 3rd year: $I_3 = A_3 - A_2 = 2662 - 2420 = ₹242$.', markTag: '[1m]' },
        { step: 'Using $I_3 = \\frac{P_3 \\times R \\times 1}{100}$: $242 = \\frac{2420 \\times R}{100} \\implies R = \\frac{242 \\times 100}{2420} = 10\\%$.', markTag: '[1m]' },
      ],
      finalAnswer: '10%',
      commonMistake: 'Trying to set up equations for $P$ instead of observing that $A_2$ directly serves as principal for $A_3$.',
    },
  },
  {
    id: 'ch02_q07',
    chapterId: 2,
    unitId: 2,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Difference Between CI and SI for 2 Years (Concept)',
    prompt: 'A sum of ₹5,000 is invested at 8% per annum for 2 years. Calculate the difference between the Compound Interest (compounded annually) and the Simple Interest for the 2 years without using the direct formula.',
    expectedAnswer: '32',
    acceptableAnswers: ['32', 'Rs 32', '₹ 32', '32.00'],
    hintLadder: {
      hint1Concept: 'Calculate SI for 2 years, then calculate CI year-by-year, and find their difference.',
      hint2Formula: '$\\text{SI} = \\frac{5000 \\times 8 \\times 2}{100} = ₹800$. For CI: $I_1 = 400, P_2 = 5400, I_2 = 432$.',
      hint3Step: 'Total $\\text{CI} = 400 + 432 = ₹832$. Difference $= 832 - 800 = ₹32$.',
    },
    solution: {
      steps: [
        { step: 'Simple Interest for 2 years: $\\text{SI} = \\frac{5000 \\times 8 \\times 2}{100} = ₹800$.', markTag: '[1m]' },
        { step: 'For CI: Year 1 interest $I_1 = \\frac{5000 \\times 8 \\times 1}{100} = ₹400$. Principal for Year 2 $P_2 = ₹5,400$. Year 2 interest $I_2 = \\frac{5400 \\times 8 \\times 1}{100} = ₹432$.', markTag: '[1m]' },
        { step: 'Total $\\text{CI} = 400 + 432 = ₹832$. Difference $= \\text{CI} - \\text{SI} = 832 - 800 = ₹32$.', markTag: '[1m]' },
      ],
      finalAnswer: '₹32',
      commonMistake: 'Calculating difference as $I_2 - I_1$ (which also equals 32 by coincidence) without showing $\\text{CI} - \\text{SI}$.',
    },
  },
];
