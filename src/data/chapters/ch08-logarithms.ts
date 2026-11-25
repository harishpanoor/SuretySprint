import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateLogarithmsQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    const base = rng.choice([2, 3, 5, 10]);
    const p = rng.choice([2, 3, 4]);
    const power = Math.pow(base, p);
    const k = rng.int(1, 15);
    const xVal = power - k;

    const prompt = `Solve the logarithmic equation for $x$:\n$$\\log_{${base}} (x + ${k}) = ${p}$$`;

    return {
      id: `gen_ch08_${rng.int(10000, 99999)}`,
      chapterId: 8,
      unitId: 3,
      title: 'Solving Logarithmic Equation by Converting to Exponential Form',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${xVal}`,
      hintLadder: {
        hint1Concept: 'Convert logarithmic equation into its equivalent exponential form.',
        hint2Formula: 'If $\\log_a N = x$, then $a^x = N$.',
        hint3Step: `Here base is ${base}, exponent is ${p}: $x + ${k} = ${base}^{${p}} = ${power}$.`,
      },
      solution: {
        steps: [
          { step: `Convert to exponential form: $\\log_{${base}}(x + ${k}) = ${p} \\iff x + ${k} = ${base}^{${p}}$.`, markTag: '[1m]' },
          { step: `$x + ${k} = ${power} \\implies x = ${power} - ${k} = ${xVal}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${xVal}`,
        commonMistake: `Writing $x + ${k} = ${base} \\times ${p}$ instead of raising base to the power: $${base}^{${p}}$.`,
      },
      isGenerated: true,
      generatorId: 'ch08',
      generatorSeed: seed,
    };
  } else {
    const kind = rng.choice([1, 2]);
    if (kind === 1) {
      const pair = rng.choice([
        { a: 25, b: 4, ans: 2 },
        { a: 20, b: 50, ans: 3 },
        { a: 125, b: 8, ans: 3 },
        { a: 250, b: 4, ans: 3 },
        { a: 500, b: 20, ans: 4 },
      ]);

      const prompt = `Evaluate the expression without using logarithmic tables or a calculator:\n$$\\log_{10}(${pair.a}) + \\log_{10}(${pair.b})$$`;

      return {
        id: `gen_ch08_${rng.int(10000, 99999)}`,
        chapterId: 8,
        unitId: 3,
        title: 'Product Law Evaluation Without Tables',
        type: 'numerical',
        difficulty: 'Easy',
        marks: 2,
        prompt,
        expectedAnswer: `${pair.ans}`,
        hintLadder: {
          hint1Concept: 'Apply the Product Law of Logarithms.',
          hint2Formula: '$\\log_{10}(m) + \\log_{10}(n) = \\log_{10}(mn)$.',
          hint3Step: `$\\log_{10}(${pair.a} \\times ${pair.b}) = \\log_{10}(${pair.a * pair.b})$.`,
        },
        solution: {
          steps: [
            { step: `Use Product Law: $\\log_{10}(${pair.a}) + \\log_{10}(${pair.b}) = \\log_{10}(${pair.a} \\times ${pair.b})$.`, markTag: '[1m]' },
            { step: `$\\log_{10}(${pair.a * pair.b}) = \\log_{10}(10^{${pair.ans}}) = ${pair.ans}$.`, markTag: '[1m]' },
          ],
          finalAnswer: `${pair.ans}`,
          commonMistake: 'Adding the numbers inside the log instead of multiplying.',
        },
        isGenerated: true,
        generatorId: 'ch08',
        generatorSeed: seed,
      };
    } else {
      const b = rng.choice([2, 3]);
      const exp = rng.choice([3, 4, 5]);
      const val = Math.pow(b, exp);
      const prompt = `Find the value of $\\log_{${b}}(${val})$.`;

      return {
        id: `gen_ch08_${rng.int(10000, 99999)}`,
        chapterId: 8,
        unitId: 3,
        title: 'Basic Logarithm Evaluation',
        type: 'numerical',
        difficulty: 'Easy',
        marks: 1,
        prompt,
        expectedAnswer: `${exp}`,
        hintLadder: {
          hint1Concept: `Express ${val} as a power of base ${b}.`,
          hint2Formula: `$\\log_b(b^p) = p \\log_b(b) = p$.`,
          hint3Step: `${val} = ${b}^${exp}, so $\\log_{${b}}(${b}^{${exp}}) = ${exp}$.`,
        },
        solution: {
          steps: [
            { step: `Write $${val}$ in terms of base $${b}$: $${val} = ${b}^{${exp}}$.`, markTag: '[0.5m]' },
            { step: `$\\log_{${b}}(${b}^{${exp}}) = ${exp} \\log_{${b}}(${b}) = ${exp} \\times 1 = ${exp}$.`, markTag: '[0.5m]' },
          ],
          finalAnswer: `${exp}`,
          commonMistake: 'Dividing the number by base instead of finding the exponent.',
        },
        isGenerated: true,
        generatorId: 'ch08',
        generatorSeed: seed,
      };
    }
  }
}

export const curatedQuestionsCh08: Question[] = [
  {
    id: 'ch08_q01',
    chapterId: 8,
    unitId: 3,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Converting Exponential Form to Logarithmic Form',
    prompt: 'The logarithmic form of $5^{-2} = \\frac{1}{25}$ is:',
    mcqOptions: [
      { id: 'A', text: '$\\log_5\\left(\\frac{1}{25}\\right) = -2$', explanation: 'Correct: base 5, argument 1/25, exponent -2.' },
      { id: 'B', text: '$\\log_{-2}\\left(\\frac{1}{25}\\right) = 5$', explanation: 'Incorrect: base cannot be negative.' },
      { id: 'C', text: '$\\log_5(-2) = \\frac{1}{25}$', explanation: 'Incorrect: log of a negative number is undefined in real numbers.' },
      { id: 'D', text: '$\\log_{25}(5) = -2$', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Definition: If $a^x = N$, then $\\log_a N = x$.',
      hint2Formula: 'Base is $a = 5$, exponent is $x = -2$, value is $N = 1/25$.',
      hint3Step: 'Substitute into $\\log_a N = x$: $\\log_5(1/25) = -2$.',
    },
    solution: {
      steps: [
        { step: 'Given $a^x = N \\iff \\log_a N = x$. Here $a=5, x=-2, N=\\frac{1}{25}$.', markTag: '[0.5m]' },
        { step: 'Therefore, $\\log_5\\left(\\frac{1}{25}\\right) = -2$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: log5(1/25) = -2',
      commonMistake: 'Placing the negative exponent as the argument of the logarithm.',
    },
  },
  {
    id: 'ch08_q02',
    chapterId: 8,
    unitId: 3,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Logarithm of Sum vs Product',
    prompt: '**Assertion (A)**: $\\log_{10}(2 + 3) \\neq \\log_{10} 2 + \\log_{10} 3$.\n\n**Reason (R)**: The Product Law of Logarithms states $\\log_a(mn) = \\log_a m + \\log_a n$, which applies to the product of numbers, not their sum.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Compute LHS: $\\log_{10}(5)$. Compute RHS: $\\log_{10}(2 \\times 3) = \\log_{10}(6)$.',
      hint2Formula: '$\\log(m+n) \\neq \\log m + \\log n$.',
      hint3Step: 'Reason explains the proper product rule of logs.',
    },
    solution: {
      steps: [
        { step: 'LHS $= \\log_{10}(5)$, while RHS $= \\log_{10}(2) + \\log_{10}(3) = \\log_{10}(6)$. Since $5 \\neq 6$, Assertion is True.', markTag: '[0.5m]' },
        { step: 'Reason gives the valid law of logarithms $\\log(mn) = \\log m + \\log n$. Both are True and R correctly explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Treating logarithm as a distributive algebraic operator like $k(a+b) = ka + kb$.',
    },
  },
  {
    id: 'ch08_q03',
    chapterId: 8,
    unitId: 3,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Evaluation of Classic Log Expression Without Tables',
    prompt: 'Evaluate without tables:\n$$2\\log_{10} 5 + \\log_{10} 8 - \\frac{1}{2}\\log_{10} 4$$',
    expectedAnswer: '2',
    hintLadder: {
      hint1Concept: 'Use the Power Law $k\\log x = \\log(x^k)$ first to bring coefficients inside.',
      hint2Formula: '$2\\log 5 = \\log(5^2) = \\log 25$, and $\\frac{1}{2}\\log 4 = \\log(4^{1/2}) = \\log 2$.',
      hint3Step: 'Combine: $\\log(25) + \\log(8) - \\log(2) = \\log\\left(\\frac{25 \\times 8}{2}\\right) = \\log(100) = 2$.',
    },
    solution: {
      steps: [
        { step: 'Apply power law: $2\\log 5 = \\log(5^2) = \\log 25$, and $\\frac{1}{2}\\log 4 = \\log(\\sqrt{4}) = \\log 2$.', markTag: '[1m]' },
        { step: 'Combine using product & quotient laws: $\\log_{10}\\left(\\frac{25 \\times 8}{2}\\right)$.', markTag: '[1m]' },
        { step: '$\\frac{200}{2} = 100$. $\\log_{10}(100) = \\log_{10}(10^2) = 2$.', markTag: '[1m]' },
      ],
      finalAnswer: '2',
      commonMistake: 'Applying product and quotient laws before moving the multiplier coefficients inside the log.',
    },
  },
  {
    id: 'ch08_q04',
    chapterId: 8,
    unitId: 3,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Solving Logarithmic Equation with Difference of Logs',
    prompt: 'Solve the equation for $x$:\n$$\\log(x + 5) - \\log(x - 1) = \\log 4$$',
    expectedAnswer: '3',
    hintLadder: {
      hint1Concept: 'Apply Quotient Law on the LHS.',
      hint2Formula: '$\\log\\left(\\frac{x + 5}{x - 1}\\right) = \\log 4$.',
      hint3Step: 'Equate arguments: $\\frac{x + 5}{x - 1} = 4 \\implies x + 5 = 4(x - 1)$.',
    },
    solution: {
      steps: [
        { step: 'Using quotient law: $\\log\\left(\\frac{x+5}{x-1}\\right) = \\log 4$.', markTag: '[1m]' },
        { step: 'Equating arguments: $\\frac{x+5}{x-1} = 4 \\implies x + 5 = 4x - 4$.', markTag: '[1m]' },
        { step: '$3x = 9 \\implies x = 3$. Checking validity: $x+5=8 > 0$ and $x-1=2 > 0$ (Valid).', markTag: '[1m]' },
      ],
      finalAnswer: '3',
      commonMistake: 'Forgetting to verify that the solution gives positive arguments in both logs.',
    },
  },
  {
    id: 'ch08_q05',
    chapterId: 8,
    unitId: 3,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Expressing in Terms of log x and log y',
    prompt: 'Given $\\log 2 = a$ and $\\log 3 = b$ (base 10):\n\n**(i)** Find the value of $\\log 6$ in terms of $a$ and $b$.\n**(ii)** Find the value of $\\log 5$ in terms of $a$.',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Expression for log 6:',
        expectedAnswer: 'a + b',
        acceptableAnswers: ['a + b', 'b + a'],
        marks: 2,
        answerType: 'expression',
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Expression for log 5:',
        expectedAnswer: '1 - a',
        acceptableAnswers: ['1 - a', '-a + 1'],
        marks: 2,
        answerType: 'expression',
      },
    ],
    hintLadder: {
      hint1Concept: 'Express 6 and 5 in terms of 2, 3, and 10.',
      hint2Formula: '$6 = 2 \\times 3 \\implies \\log 6 = \\log 2 + \\log 3$.',
      hint3Step: '$5 = 10 / 2 \\implies \\log 5 = \\log 10 - \\log 2 = 1 - a$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): $6 = 2 \\times 3$, so $\\log 6 = \\log(2 \\times 3) = \\log 2 + \\log 3 = a + b$.', markTag: '[2m]' },
        { step: 'Part (ii): $5 = \\frac{10}{2}$, so $\\log 5 = \\log\\left(\\frac{10}{2}\\right) = \\log 10 - \\log 2 = 1 - a$ (since $\\log_{10} 10 = 1$).', markTag: '[2m]' },
      ],
      finalAnswer: '(i) a + b, (ii) 1 - a',
      commonMistake: 'Writing $\\log 5 = \\log(2+3) = a + b$ instead of using $10/2$.',
    },
  },
  {
    id: 'ch08_q06',
    chapterId: 8,
    unitId: 3,
    type: 'expression',
    difficulty: 'Exam',
    marks: 3,
    title: 'Reciprocal Base Identity',
    prompt: 'Simplify the expression:\n$$\\frac{1}{\\log_{xy}(xyz)} + \\frac{1}{\\log_{yz}(xyz)} + \\frac{1}{\\log_{zx}(xyz)}$$',
    expectedAnswer: '2',
    nepTags: ['HOTS', 'Brain Maths'],
    hintLadder: {
      hint1Concept: 'Use the base reciprocal identity: $\\frac{1}{\\log_b a} = \\log_a b$.',
      hint2Formula: 'The sum becomes $\\log_{xyz}(xy) + \\log_{xyz}(yz) + \\log_{xyz}(zx)$.',
      hint3Step: 'Combine into a single log: $\\log_{xyz}((xy)(yz)(zx)) = \\log_{xyz}(x^2 y^2 z^2) = \\log_{xyz}((xyz)^2) = 2$.',
    },
    solution: {
      steps: [
        { step: 'Apply base change property $\\frac{1}{\\log_b a} = \\log_a b$: LHS $= \\log_{xyz}(xy) + \\log_{xyz}(yz) + \\log_{xyz}(zx)$.', markTag: '[1m]' },
        { step: 'Using product law: $\\log_{xyz}(xy \\cdot yz \\cdot zx) = \\log_{xyz}(x^2 y^2 z^2) = \\log_{xyz}((xyz)^2)$.', markTag: '[1m]' },
        { step: 'Using power law: $2 \\log_{xyz}(xyz) = 2(1) = 2$.', markTag: '[1m]' },
      ],
      finalAnswer: '2',
      commonMistake: 'Trying to evaluate each term separately without converting to common base $xyz$.',
    },
  },
];
