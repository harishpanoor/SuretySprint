import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateRationalSurdQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  // Type 1: Rationalise denominator of form k / (sqrt(a) - sqrt(b)) or a / (b + sqrt(c))
  const kind = rng.int(1, 2);

  if (kind === 1) {
    // k / (sqrt(a) - sqrt(b)) where a - b = 1 or 2
    const b = rng.choice([2, 3, 5, 7]);
    const diff = rng.choice([1, 2]);
    const a = b + diff;
    const k = diff === 1 ? rng.int(1, 3) : 2;

    const numeratorStr = k === 1 ? '1' : `${k}`;
    const prompt = `Rationalise the denominator and simplify:\n$$\\frac{${numeratorStr}}{\\sqrt{${a}} - \\sqrt{${b}}}$$`;
    
    // (sqrt(a) + sqrt(b)) * (k / diff)
    const factor = k / diff;
    let expectedAnswer = '';
    let answerDisplay = '';
    if (factor === 1) {
      expectedAnswer = `sqrt(${a}) + sqrt(${b})`;
      answerDisplay = `\\sqrt{${a}} + \\sqrt{${b}}`;
    } else {
      expectedAnswer = `${factor}*(sqrt(${a}) + sqrt(${b}))`;
      answerDisplay = `${factor}(\\sqrt{${a}} + \\sqrt{${b}})`;
    }

    return {
      id: `gen_ch01_${rng.int(10000, 99999)}`,
      chapterId: 1,
      unitId: 1,
      title: 'Rationalising Binomial Surd Denominator',
      type: 'expression',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer,
      acceptableAnswers: [
        `sqrt(${a}) + sqrt(${b})`,
        `\\sqrt{${a}} + \\sqrt{${b}}`,
        `${answerDisplay}`
      ],
      hintLadder: {
        hint1Concept: 'Multiply both numerator and denominator by the conjugate of the denominator.',
        hint2Formula: 'The conjugate of $(\\sqrt{a} - \\sqrt{b})$ is $(\\sqrt{a} + \\sqrt{b})$. Use $(x-y)(x+y) = x^2 - y^2$.',
        hint3Step: `Denominator becomes $(\\sqrt{${a}})^2 - (\\sqrt{${b}})^2 = ${a} - ${b} = ${diff}$.`,
      },
      solution: {
        steps: [
          { step: `Multiply numerator and denominator by conjugate $(\\sqrt{${a}} + \\sqrt{${b}})$:`, markTag: '[1m]' },
          { step: `$$\\frac{${numeratorStr}(\\sqrt{${a}} + \\sqrt{${b}})}{(\\sqrt{${a}} - \\sqrt{${b}})(\\sqrt{${a}} + \\sqrt{${b}})}$$`, markTag: '[1m]' },
          { step: `Denominator $= ${a} - ${b} = ${diff}$. Cancelling gives: $${answerDisplay}$`, markTag: '[1m]' },
        ],
        finalAnswer: `$${answerDisplay}$`,
        commonMistake: 'Students often forget to change the sign in the conjugate, multiplying by $\\sqrt{a} - \\sqrt{b}$ instead of $\\sqrt{a} + \\sqrt{b}$.',
      },
      isGenerated: true,
      generatorId: 'ch01',
      generatorSeed: seed,
    };
  } else {
    // Finding a and b: (sqrt(x) + 1)/(sqrt(x) - 1) = a + b*sqrt(x)
    const x = rng.choice([2, 3, 5]);
    // ((sqrt(x)+1)^2) / (x - 1) = (x + 1 + 2*sqrt(x)) / (x - 1)
    const denom = x - 1;
    const aVal = (x + 1) / denom;
    const bVal = 2 / denom;

    const prompt = `Find rational values of $a$ and $b$ such that:\n$$\\frac{\\sqrt{${x}} + 1}{\\sqrt{${x}} - 1} = a + b\\sqrt{${x}}$$\nState your answer as an ordered pair \`a, b\` or \`(a, b)\`.`;
    const expectedAnswer = `(${aVal}, ${bVal})`;

    return {
      id: `gen_ch01_${rng.int(10000, 99999)}`,
      chapterId: 1,
      unitId: 1,
      title: 'Finding Rational Coefficients a and b',
      type: 'expression',
      difficulty: 'Exam',
      marks: 3,
      prompt,
      expectedAnswer,
      acceptableAnswers: [
        `${aVal}, ${bVal}`,
        `a = ${aVal}, b = ${bVal}`,
        `(${aVal}, ${bVal})`
      ],
      hintLadder: {
        hint1Concept: 'Rationalise the LHS by multiplying numerator and denominator by $(\\sqrt{' + x + '} + 1)$.',
        hint2Formula: 'LHS $= \\frac{(\\sqrt{' + x + '} + 1)^2}{(\\sqrt{' + x + '})^2 - 1^2} = \\frac{' + (x + 1) + ' + 2\\sqrt{' + x + '}}{' + (x - 1) + '}$.',
        hint3Step: `Separate into rational and irrational components: $\\frac{${x+1}}{${x-1}} + \\frac{2}{${x-1}}\\sqrt{${x}}$.`,
      },
      solution: {
        steps: [
          { step: `Rationalise LHS by multiplying by conjugate $(\\sqrt{${x}} + 1)$:`, markTag: '[1m]' },
          { step: `$$\\frac{(\\sqrt{${x}} + 1)^2}{(\\sqrt{${x}})^2 - 1^2} = \\frac{${x} + 1 + 2\\sqrt{${x}}}{${x - 1}} = \\frac{${x+1}}{${x-1}} + \\frac{2}{${x-1}}\\sqrt{${x}}$$`, markTag: '[1m]' },
          { step: `Comparing with $a + b\\sqrt{${x}}$: $a = ${aVal}$, $b = ${bVal}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `$a = ${aVal}, \\; b = ${bVal}$`,
        commonMistake: 'Do not forget that $a$ and $b$ must be equated separately to the rational and radical parts respectively.',
      },
      isGenerated: true,
      generatorId: 'ch01',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh01: Question[] = [
  {
    id: 'ch01_q01',
    chapterId: 1,
    unitId: 1,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Classification of Real Numbers',
    prompt: 'Which of the following numbers is an **irrational number**?',
    mcqOptions: [
      { id: 'A', text: '$\\sqrt{0.04}$', explanation: '$\\sqrt{0.04} = 0.2 = 2/10$, which is rational.' },
      { id: 'B', text: '$\\sqrt{12} / \\sqrt{3}$', explanation: '$\\sqrt{12}/\\sqrt{3} = \\sqrt{4} = 2$, which is rational.' },
      { id: 'C', text: '$2 + \\sqrt{3}$', explanation: 'Sum of a rational and an irrational is strictly irrational.' },
      { id: 'D', text: '$3.141414...$', explanation: 'A repeating decimal $3.\\overline{14}$ is rational ($311/99$).' },
    ],
    correctOptionId: 'C',
    hintLadder: {
      hint1Concept: 'Check which number has a non-terminating, non-repeating decimal expansion or cannot be simplified to $p/q$.',
      hint2Formula: 'Sum of a rational number and an irrational number is always irrational.',
      hint3Step: '$\\sqrt{0.04} = 0.2$ (rational), $\\sqrt{12}/\\sqrt{3} = 2$ (rational), while $\\sqrt{3}$ is irrational, making $2 + \\sqrt{3}$ irrational.',
    },
    solution: {
      steps: [
        { step: 'Check Option A: $\\sqrt{0.04} = 0.2 = \\frac{1}{5}$ (Rational).', markTag: '[0.5m]' },
        { step: 'Check Option B: $\\frac{\\sqrt{12}}{\\sqrt{3}} = \\sqrt{\\frac{12}{3}} = \\sqrt{4} = 2$ (Rational).', markTag: '[0.5m]' },
        { step: 'Check Option C: $2$ is rational and $\\sqrt{3}$ is irrational. Their sum $2 + \\sqrt{3}$ is irrational.', markTag: '[1m]' },
      ],
      finalAnswer: 'C: $2 + \\sqrt{3}$',
      commonMistake: 'Confusing terminating decimals with surds, or thinking that any number involving a root is automatically irrational before simplifying.',
    },
  },
  {
    id: 'ch01_q02',
    chapterId: 1,
    unitId: 1,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Product of Surds',
    prompt: '**Assertion (A)**: The product of $(3 + \\sqrt{5})$ and $(3 - \\sqrt{5})$ is a rational number.\n\n**Reason (R)**: The product of two conjugate binomial surds $(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b$, which is free of radicals when $a, b$ are rational.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Evaluate the product $(3 + \\sqrt{5})(3 - \\sqrt{5})$ using difference of squares.',
      hint2Formula: '$(a+b)(a-b) = a^2 - b^2$. Here $3^2 - (\\sqrt{5})^2 = 9 - 5 = 4$.',
      hint3Step: 'Since $4$ is rational, (A) is true. Reason (R) gives the general algebraic identity explaining why.',
    },
    solution: {
      steps: [
        { step: 'Compute $(3+\\sqrt{5})(3-\\sqrt{5}) = 3^2 - (\\sqrt{5})^2 = 9 - 5 = 4$, which is rational. Assertion is True.', markTag: '[0.5m]' },
        { step: 'Reason states $(a+\\sqrt{b})(a-\\sqrt{b}) = a^2 - b$. This identity directly explains why the product is rational. Reason is True and correctly explains Assertion.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Failing to link the general algebraic rule in R to the specific calculation in A.',
    },
  },
  {
    id: 'ch01_q03',
    chapterId: 1,
    unitId: 1,
    type: 'numerical',
    difficulty: 'Easy',
    marks: 2,
    title: 'Inserting a Rational Number Between Surds',
    prompt: 'Find the integer value $k$ such that the square of $\\sqrt{7}$ and $\\sqrt{11}$ satisfy $(\\sqrt{7})^2 < k^2 < (\\sqrt{11})^2$. What is the value of $k$?',
    expectedAnswer: '3',
    hintLadder: {
      hint1Concept: 'Square the numbers to compare them as plain integers.',
      hint2Formula: '$(\\sqrt{7})^2 = 7$ and $(\\sqrt{11})^2 = 11$.',
      hint3Step: 'Find a perfect square between 7 and 11. $k^2 = 9 \\implies k = 3$.',
    },
    solution: {
      steps: [
        { step: 'Given: $\\sqrt{7} \\approx 2.645$ and $\\sqrt{11} \\approx 3.316$.', markTag: '[1m]' },
        { step: 'Squaring the inequality: $7 < k^2 < 11$. The only perfect square is $9$, so $k = \\sqrt{9} = 3$.', markTag: '[1m]' },
      ],
      finalAnswer: '3',
      commonMistake: 'Forgetting to square or confusing $\\sqrt{7}$ with $7$.',
    },
  },
  {
    id: 'ch01_q04',
    chapterId: 1,
    unitId: 1,
    type: 'expression',
    difficulty: 'Standard',
    marks: 3,
    title: 'Rationalising Denominator with Binomial Conjugate',
    prompt: 'Rationalise the denominator of:\n$$\\frac{1}{\\sqrt{5} - \\sqrt{3}}$$\nGive your answer in the form $\\frac{\\sqrt{5} + \\sqrt{3}}{k}$ or simplified expression.',
    expectedAnswer: '(sqrt(5) + sqrt(3))/2',
    acceptableAnswers: [
      '(\\sqrt{5} + \\sqrt{3})/2',
      '\\frac{\\sqrt{5} + \\sqrt{3}}{2}',
      '0.5*(sqrt(5)+sqrt(3))',
      '0.5*(sqrt(5) + sqrt(3))',
      '(sqrt(5)+sqrt(3))/2'
    ],
    hintLadder: {
      hint1Concept: 'Multiply numerator and denominator by $(\\sqrt{5} + \\sqrt{3})$.',
      hint2Formula: 'Denominator becomes $(\\sqrt{5})^2 - (\\sqrt{3})^2 = 5 - 3 = 2$.',
      hint3Step: 'Numerator is $1 \\times (\\sqrt{5} + \\sqrt{3}) = \\sqrt{5} + \\sqrt{3}$.',
    },
    solution: {
      steps: [
        { step: 'Multiply numerator and denominator by conjugate $(\\sqrt{5} + \\sqrt{3})$:$$\\frac{1(\\sqrt{5}+\\sqrt{3})}{(\\sqrt{5}-\\sqrt{3})(\\sqrt{5}+\\sqrt{3})}$$', markTag: '[1m]' },
        { step: 'Denominator $= (\\sqrt{5})^2 - (\\sqrt{3})^2 = 5 - 3 = 2$.', markTag: '[1m]' },
        { step: 'Result: $\\frac{\\sqrt{5} + \\sqrt{3}}{2}$.', markTag: '[1m]' },
      ],
      finalAnswer: '$\\frac{\\sqrt{5} + \\sqrt{3}}{2}$',
      commonMistake: 'Subtracting in the numerator or writing denominator as $5 + 3 = 8$.',
    },
  },
  {
    id: 'ch01_q05',
    chapterId: 1,
    unitId: 1,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Rationalising and Value Evaluation',
    prompt: 'Given that $x = \\frac{\\sqrt{3} + 1}{\\sqrt{3} - 1}$ and $y = \\frac{\\sqrt{3} - 1}{\\sqrt{3} + 1}$:\n\n**(i)** Find the value of $x + y$.\n**(ii)** Find the value of $x y$.',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Value of $x + y$:',
        expectedAnswer: '4',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Value of $xy$:',
        expectedAnswer: '1',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Rationalise $x$ and $y$ separately, or combine using common denominator $(a-b)(a+b)$.',
      hint2Formula: '$x = \\frac{(\\sqrt{3}+1)^2}{3-1} = \\frac{4+2\\sqrt{3}}{2} = 2 + \\sqrt{3}$ and $y = 2 - \\sqrt{3}$.',
      hint3Step: 'Then $x + y = (2 + \\sqrt{3}) + (2 - \\sqrt{3}) = 4$, and $xy = (2+\\sqrt{3})(2-\\sqrt{3}) = 4 - 3 = 1$.',
    },
    solution: {
      steps: [
        { step: 'Rationalising $x$: $x = \\frac{(\\sqrt{3}+1)^2}{3-1} = \\frac{3+1+2\\sqrt{3}}{2} = 2 + \\sqrt{3}$.', markTag: '[1m]' },
        { step: 'Rationalising $y$: $y = \\frac{(\\sqrt{3}-1)^2}{3-1} = \\frac{3+1-2\\sqrt{3}}{2} = 2 - \\sqrt{3}$.', markTag: '[1m]' },
        { step: 'Part (i): $x + y = (2+\\sqrt{3}) + (2-\\sqrt{3}) = 4$.', markTag: '[1m]' },
        { step: 'Part (ii): $xy = (2+\\sqrt{3})(2-\\sqrt{3}) = 4 - 3 = 1$.', markTag: '[1m]' },
      ],
      finalAnswer: '(i) 4, (ii) 1',
      commonMistake: 'Forgetting to divide both terms in $4 + 2\\sqrt{3}$ by 2, obtaining $2 + 2\\sqrt{3}$.',
    },
  },
  {
    id: 'ch01_q06',
    chapterId: 1,
    unitId: 1,
    type: 'expression',
    difficulty: 'Exam',
    marks: 3,
    title: 'Finding a and b in Surd Identity',
    prompt: 'If $\\frac{3 + \\sqrt{7}}{3 - \\sqrt{7}} = a + b\\sqrt{7}$, find the values of rational numbers $a$ and $b$.\nAnswer in format \`a, b\` or \`(a, b)\`.',
    expectedAnswer: '(8, 3)',
    acceptableAnswers: ['8, 3', 'a = 8, b = 3', '(8, 3)', '8,3'],
    hintLadder: {
      hint1Concept: 'Multiply numerator and denominator by the conjugate $(3 + \\sqrt{7})$.',
      hint2Formula: 'Numerator $= (3+\\sqrt{7})^2 = 9 + 7 + 6\\sqrt{7} = 16 + 6\\sqrt{7}$. Denominator $= 3^2 - 7 = 2$.',
      hint3Step: 'Divide by 2: $\\frac{16 + 6\\sqrt{7}}{2} = 8 + 3\\sqrt{7}$. Compare coefficients.',
    },
    solution: {
      steps: [
        { step: 'LHS $= \\frac{(3+\\sqrt{7})(3+\\sqrt{7})}{(3-\\sqrt{7})(3+\\sqrt{7})} = \\frac{(3+\\sqrt{7})^2}{9 - 7}$', markTag: '[1m]' },
        { step: 'Numerator $= 9 + 7 + 6\\sqrt{7} = 16 + 6\\sqrt{7}$. Denominator $= 2$.', markTag: '[1m]' },
        { step: 'LHS $= \\frac{16}{2} + \\frac{6\\sqrt{7}}{2} = 8 + 3\\sqrt{7}$. Equating to $a + b\\sqrt{7}$ yields $a = 8, b = 3$.', markTag: '[1m]' },
      ],
      finalAnswer: 'a = 8, \\; b = 3',
      commonMistake: 'Dividing only 16 by 2 and not $6\\sqrt{7}$, yielding $b = 6$.',
    },
  },
];
