import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateIndicesQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    const base = rng.choice([2, 3]);
    const xVal = rng.int(1, 4);

    if (base === 2) {
      const k = xVal - 2;
      const kStr = k === 0 ? 'x' : k > 0 ? `x + ${k}` : `x - ${Math.abs(k)}`;
      const prompt = `Solve the exponential equation for $x$:\n$$4^{x - 1} = 2^{${kStr}}$$`;

      return {
        id: `gen_ch07_${rng.int(10000, 99999)}`,
        chapterId: 7,
        unitId: 3,
        title: 'Solving Exponential Equation with Common Base',
        type: 'numerical',
        difficulty: 'Standard',
        marks: 3,
        prompt,
        expectedAnswer: `${xVal}`,
        hintLadder: {
          hint1Concept: 'Express both sides of the equation in powers of the same base (base 2).',
          hint2Formula: '$4 = 2^2$, so $4^{x-1} = (2^2)^{x-1} = 2^{2(x-1)} = 2^{2x - 2}$.',
          hint3Step: `Equate exponents: $2x - 2 = ${kStr}$. Solve for $x$.`,
        },
        solution: {
          steps: [
            { step: 'Convert base $4$ to base $2$: $4 = 2^2$.', markTag: '[1m]' },
            { step: `LHS: $(2^2)^{x-1} = 2^{2x - 2}$. Equation becomes: $2^{2x - 2} = 2^{${kStr}}$.`, markTag: '[1m]' },
            { step: `Since bases are equal, equate exponents: $2x - 2 = ${kStr} \\implies x = ${xVal}$.`, markTag: '[1m]' },
          ],
          finalAnswer: `${xVal}`,
          commonMistake: 'Writing $4^{x-1} = 2^{2x - 1}$ instead of $2^{2(x-1)} = 2^{2x-2}$.',
        },
        isGenerated: true,
        generatorId: 'ch07',
        generatorSeed: seed,
      };
    } else {
      const a = rng.choice([2, 3, 4]);
      const prompt = `Solve the exponential equation for $x$:\n$$9^x = 3^{x + ${a}}$$`;

      return {
        id: `gen_ch07_${rng.int(10000, 99999)}`,
        chapterId: 7,
        unitId: 3,
        title: 'Solving Exponential Equation with Power of 3',
        type: 'numerical',
        difficulty: 'Easy',
        marks: 2,
        prompt,
        expectedAnswer: `${a}`,
        hintLadder: {
          hint1Concept: 'Express $9$ as a power of $3$.',
          hint2Formula: '$9^x = (3^2)^x = 3^{2x}$.',
          hint3Step: `Equate exponents: $2x = x + ${a} \\implies x = ${a}$.`,
        },
        solution: {
          steps: [
            { step: 'Express LHS with base $3$: $9^x = (3^2)^x = 3^{2x}$.', markTag: '[1m]' },
            { step: `Equating exponents: $2x = x + ${a} \\implies x = ${a}$.`, markTag: '[1m]' },
          ],
          finalAnswer: `${a}`,
          commonMistake: 'Forgetting power of a power multiplies: $(3^2)^x = 3^{2x}$, not $3^{2+x}$.',
        },
        isGenerated: true,
        generatorId: 'ch07',
        generatorSeed: seed,
      };
    }
  } else {
    // Fractional exponent simplification
    const baseNum = rng.choice([8, 16, 27, 32, 64]);
    let root = 2;
    let power = 3;
    let expVal = 1;
    if (baseNum === 8) { root = 3; power = 2; expVal = 4; }
    if (baseNum === 27) { root = 3; power = 2; expVal = 9; }
    if (baseNum === 16) { root = 4; power = 3; expVal = 8; }
    if (baseNum === 32) { root = 5; power = 2; expVal = 4; }
    if (baseNum === 64) { root = 6; power = 2; expVal = 4; }

    const prompt = `Evaluate the numerical value without using tables or calculator:\n$$\\left(${baseNum}\\right)^{${power}/${root}}$$`;

    return {
      id: `gen_ch07_${rng.int(10000, 99999)}`,
      chapterId: 7,
      unitId: 3,
      title: 'Fractional Exponent Evaluation',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${expVal}`,
      hintLadder: {
        hint1Concept: 'Express the base as a power of its prime factor.',
        hint2Formula: `$a^{m/n} = (a^{1/n})^m$.`,
        hint3Step: `Take the ${root}-th root first, then raise the result to power ${power}.`,
      },
      solution: {
        steps: [
          { step: `Express $${baseNum}$ as a prime power: $${baseNum} = (${Math.round(Math.pow(baseNum, 1/root))})^{${root}}$.`, markTag: '[1m]' },
          { step: `$\\left((${Math.round(Math.pow(baseNum, 1/root))})^{${root}}\\right)^{${power}/${root}} = (${Math.round(Math.pow(baseNum, 1/root))})^{${power}} = ${expVal}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${expVal}`,
        commonMistake: 'Multiplying base by exponent instead of raising to the power.',
      },
      isGenerated: true,
      generatorId: 'ch07',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh07: Question[] = [
  {
    id: 'ch07_q01',
    chapterId: 7,
    unitId: 3,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Zero and Negative Exponents Law',
    prompt: 'The simplified value of $\\left(\\frac{16}{81}\\right)^{-3/4}$ is equal to:',
    mcqOptions: [
      { id: 'A', text: '$27/8$', explanation: 'Correct: $(81/16)^{3/4} = [(3/2)^4]^{3/4} = (3/2)^3 = 27/8$.' },
      { id: 'B', text: '$8/27$', explanation: 'Incorrect: did not invert for the negative exponent.' },
      { id: 'C', text: '$-27/8$', explanation: 'Incorrect: negative exponent inverts base, does not make value negative.' },
      { id: 'D', text: '$9/4$', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Negative exponent inverts the fraction: $(a/b)^{-n} = (b/a)^n$.',
      hint2Formula: '$(16/81)^{-3/4} = (81/16)^{3/4}$.',
      hint3Step: 'Notice $81 = 3^4$ and $16 = 2^4$. So $(3/2)^{4 \\times (3/4)} = (3/2)^3 = 27/8$.',
    },
    solution: {
      steps: [
        { step: 'Invert base for negative exponent: $\\left(\\frac{16}{81}\\right)^{-3/4} = \\left(\\frac{81}{16}\\right)^{3/4}$.', markTag: '[0.5m]' },
        { step: 'Express in prime powers: $\\left[\\left(\\frac{3}{2}\\right)^4\\right]^{3/4} = \\left(\\frac{3}{2}\\right)^3 = \\frac{27}{8}$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: 27/8',
      commonMistake: 'Putting a negative sign in front of the final answer.',
    },
  },
  {
    id: 'ch07_q02',
    chapterId: 7,
    unitId: 3,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Product of Powers vs Power of Sum',
    prompt: '**Assertion (A)**: $2^a \\times 2^b = 2^{a+b}$, but $2^a + 2^b \\neq 2^{a+b}$ (for positive integers $a, b$).\n\n**Reason (R)**: The Product Law of Indices applies strictly to multiplication of identical bases: $x^m \\times x^n = x^{m+n}$, and there is no addition law for exponents.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Consider numerical test like $2^2 + 2^3 = 4 + 8 = 12 \\neq 2^5 = 32$.',
      hint2Formula: 'Product law states $x^m \\times x^n = x^{m+n}$.',
      hint3Step: 'Exponents add only when multiplying terms with equal bases.',
    },
    solution: {
      steps: [
        { step: '$2^a + 2^b \\neq 2^{a+b}$ because addition cannot combine exponents into a single term. Assertion is True.', markTag: '[0.5m]' },
        { step: 'Laws of indices apply to multiplication and division, not addition. Reason is True and correctly explains Assertion.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Treating $2^a + 2^b$ as $2^{a+b}$.',
    },
  },
  {
    id: 'ch07_q03',
    chapterId: 7,
    unitId: 3,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Solving Exponential Equation with Sum of Powers',
    prompt: 'Solve the exponential equation for $x$:\n$$2^{x+1} + 2^{x-1} = 20$$',
    expectedAnswer: '3',
    hintLadder: {
      hint1Concept: 'Factor out $2^x$ using laws of indices: $2^{x+1} = 2^x \\times 2^1$ and $2^{x-1} = 2^x \\times 2^{-1}$.',
      hint2Formula: '$2^x\\left(2 + \\frac{1}{2}\\right) = 20$.',
      hint3Step: '$2^x \\times \\frac{5}{2} = 20 \\implies 2^x = \\frac{20 \\times 2}{5} = 8 = 2^3$.',
    },
    solution: {
      steps: [
        { step: 'Rewrite terms with $2^x$: $2^x \\cdot 2^1 + 2^x \\cdot 2^{-1} = 20$.', markTag: '[1m]' },
        { step: 'Factor out $2^x$: $2^x\\left(2 + \\frac{1}{2}\\right) = 2^x\\left(\\frac{5}{2}\\right) = 20$.', markTag: '[1m]' },
        { step: '$2^x = 20 \\times \\frac{2}{5} = 8 = 2^3 \\implies x = 3$.', markTag: '[1m]' },
      ],
      finalAnswer: '3',
      commonMistake: 'Adding exponents $(x+1) + (x-1)$ across an addition sign.',
    },
  },
  {
    id: 'ch07_q04',
    chapterId: 7,
    unitId: 3,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Simplifying Algebraic Exponential Fraction',
    prompt: 'Simplify the expression and find its numerical value:\n$$\\frac{9^n \\times 3^2 \\times (3^{-n/2})^{-2} - (27)^n}{3^{3n} \\times 2^3}$$',
    expectedAnswer: '1',
    acceptableAnswers: ['1', '1.0'],
    hintLadder: {
      hint1Concept: 'Express all terms in numerator and denominator with base 3.',
      hint2Formula: '$9^n = (3^2)^n = 3^{2n}$, $(3^{-n/2})^{-2} = 3^n$, and $27^n = 3^{3n}$.',
      hint3Step: 'Numerator becomes $3^{2n} \\times 3^2 \\times 3^n - 3^{3n} = 3^{3n+2} - 3^{3n} = 3^{3n}(9 - 1) = 3^{3n} \\times 8$. Then divide by $3^{3n} \\times 8$.',
    },
    solution: {
      steps: [
        { step: 'Numerator: $9^n = 3^{2n}$, $(3^{-n/2})^{-2} = 3^n$, and $27^n = 3^{3n}$.', markTag: '[1m]' },
        { step: 'Numerator $= 3^{2n} \\cdot 3^2 \\cdot 3^n - 3^{3n} = 3^{3n+2} - 3^{3n} = 3^{3n}(3^2 - 1) = 3^{3n}(8)$.', markTag: '[1m]' },
        { step: 'Denominator $= 3^{3n} \\times 2^3 = 3^{3n} \\times 8$. Value $= \\frac{8 \\cdot 3^{3n}}{8 \\cdot 3^{3n}} = 1$.', markTag: '[1m]' },
      ],
      finalAnswer: '1',
      commonMistake: 'Forgetting power of a power multiplies powers: $(-n/2) \\times (-2) = +n$.',
    },
  },
  {
    id: 'ch07_q05',
    chapterId: 7,
    unitId: 3,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Simultaneous Exponential Equations',
    prompt: 'Solve the following simultaneous exponential equations for $x$ and $y$:\n$$\\begin{cases} 2^{x+y} = 32 \\\\ 3^{3x - y} = 27 \\end{cases}$$\n\n**(i)** Find the value of $x$.\n**(ii)** Find the value of $y$.',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Value of x:',
        expectedAnswer: '2',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Value of y:',
        expectedAnswer: '3',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Convert both sides of each equation to prime bases: $32 = 2^5$ and $27 = 3^3$.',
      hint2Formula: 'Equation 1: $x + y = 5$. Equation 2: $3x - y = 3$.',
      hint3Step: 'Add equations: $4x = 8 \\implies x = 2$. Then $y = 5 - 2 = 3$.',
    },
    solution: {
      steps: [
        { step: '$2^{x+y} = 32 = 2^5 \\implies x + y = 5$.', markTag: '[1m]' },
        { step: '$3^{3x-y} = 27 = 3^3 \\implies 3x - y = 3$.', markTag: '[1m]' },
        { step: 'Adding the two linear equations: $(x+y) + (3x-y) = 5 + 3 \\implies 4x = 8 \\implies x = 2$.', markTag: '[1m]' },
        { step: 'Substitute into first equation: $2 + y = 5 \\implies y = 3$.', markTag: '[1m]' },
      ],
      finalAnswer: '(i) x = 2, (ii) y = 3',
      commonMistake: 'Writing $32 = 2^4$ instead of $2^5$.',
    },
  },
  {
    id: 'ch07_q06',
    chapterId: 7,
    unitId: 3,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 2,
    title: 'Negative Base with Fractional Index',
    prompt: 'Evaluate $(-27)^{-1/3}$. Give your answer as a simplified fraction \`a/b\`.',
    expectedAnswer: '-1/3',
    acceptableAnswers: ['-1/3', '-(1/3)', '-0.333', '-0.33'],
    hintLadder: {
      hint1Concept: 'Invert for negative exponent: $(-27)^{-1/3} = \\frac{1}{(-27)^{1/3}}$.',
      hint2Formula: '$(-27)^{1/3} = \\sqrt[3]{-27} = -3$.',
      hint3Step: 'Hence result is $\\frac{1}{-3} = -\\frac{1}{3}$.',
    },
    solution: {
      steps: [
        { step: '$(-27)^{-1/3} = \\frac{1}{(-27)^{1/3}}$.', markTag: '[1m]' },
        { step: 'Since $(-3)^3 = -27$, $(-27)^{1/3} = -3$. So value $= \\frac{1}{-3} = -\\frac{1}{3}$.', markTag: '[1m]' },
      ],
      finalAnswer: '-1/3',
      commonMistake: 'Saying cube root of a negative number is undefined (only even roots of negative numbers are undefined in real numbers).',
    },
  },
];
