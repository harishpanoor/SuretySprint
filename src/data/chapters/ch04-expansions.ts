import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateExpansionsQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Reciprocal square & cube: Given x + 1/x = k, find x^2 + 1/x^2 or x^3 + 1/x^3
    const isPlus = rng.choice([true, false]);
    const k = rng.choice([3, 4, 5, 6]);
    const askCube = rng.choice([true, false]);

    if (!askCube) {
      // Find x^2 + 1/x^2
      // If x + 1/x = k -> x^2 + 1/x^2 = k^2 - 2
      // If x - 1/x = k -> x^2 + 1/x^2 = k^2 + 2
      const val = isPlus ? k * k - 2 : k * k + 2;
      const signStr = isPlus ? '+' : '-';
      const prompt = `If $x ${signStr} \\frac{1}{x} = ${k}$, find the value of $x^2 + \\frac{1}{x^2}$.`;

      return {
        id: `gen_ch04_${rng.int(10000, 99999)}`,
        chapterId: 4,
        unitId: 3,
        title: 'Reciprocal Quadratic Expansion',
        type: 'numerical',
        difficulty: 'Easy',
        marks: 2,
        prompt,
        expectedAnswer: `${val}`,
        hintLadder: {
          hint1Concept: `Square both sides of the given equation $\\left(x ${signStr} \\frac{1}{x}\\right) = ${k}$.`,
          hint2Formula: `$\\left(x ${signStr} \\frac{1}{x}\\right)^2 = x^2 + \\frac{1}{x^2} ${isPlus ? '+ 2' : '- 2'}$.`,
          hint3Step: `Substitute: $${k}^2 = x^2 + \\frac{1}{x^2} ${isPlus ? '+ 2' : '- 2'} \\implies x^2 + \\frac{1}{x^2} = ${k * k} ${isPlus ? '- 2' : '+ 2'}$.`,
        },
        solution: {
          steps: [
            { step: `Given: $x ${signStr} \\frac{1}{x} = ${k}$. Squaring both sides:`, markTag: '[1m]' },
            { step: `$\\left(x ${signStr} \\frac{1}{x}\\right)^2 = ${k}^2 \\implies x^2 + \\frac{1}{x^2} ${isPlus ? '+ 2' : '- 2'} = ${k * k}$.`, markTag: '[0.5m]' },
            { step: `$x^2 + \\frac{1}{x^2} = ${k * k} ${isPlus ? '- 2' : '+ 2'} = ${val}$.`, markTag: '[0.5m]' },
          ],
          finalAnswer: `${val}`,
          commonMistake: isPlus
            ? 'Forgetting to subtract 2, writing answer as k^2.'
            : 'Subtracting 2 instead of adding 2 when given (x - 1/x).',
        },
        isGenerated: true,
        generatorId: 'ch04',
        generatorSeed: seed,
      };
    } else {
      // Find x^3 + 1/x^3 or x^3 - 1/x^3
      // If x + 1/x = k -> x^3 + 1/x^3 = k^3 - 3k
      // If x - 1/x = k -> x^3 - 1/x^3 = k^3 + 3k
      const val = isPlus ? k * k * k - 3 * k : k * k * k + 3 * k;
      const signStr = isPlus ? '+' : '-';
      const prompt = `If $x ${signStr} \\frac{1}{x} = ${k}$, find the value of $x^3 ${signStr} \\frac{1}{x^3}$.`;

      return {
        id: `gen_ch04_${rng.int(10000, 99999)}`,
        chapterId: 4,
        unitId: 3,
        title: 'Reciprocal Cubic Expansion',
        type: 'numerical',
        difficulty: 'Standard',
        marks: 3,
        prompt,
        expectedAnswer: `${val}`,
        hintLadder: {
          hint1Concept: 'Cube both sides of the given identity or use the standard reciprocal cube formula.',
          hint2Formula: `$\\left(x ${signStr} \\frac{1}{x}\\right)^3 = x^3 ${signStr} \\frac{1}{x^3} ${isPlus ? '+ 3\\left(x + \\frac{1}{x}\\right)' : '- 3\\left(x - \\frac{1}{x}\\right)'}$.`,
          hint3Step: `Substitute $x ${signStr} 1/x = ${k}$: $${k}^3 = x^3 ${signStr} \\frac{1}{x^3} ${isPlus ? '+ 3(' + k + ')' : '- 3(' + k + ')'}$.`,
        },
        solution: {
          steps: [
            { step: `Cube both sides: $\\left(x ${signStr} \\frac{1}{x}\\right)^3 = ${k}^3 = ${k*k*k}$.`, markTag: '[1m]' },
            { step: `Expansion: $x^3 ${signStr} \\frac{1}{x^3} ${isPlus ? '+ 3\\left(x + \\frac{1}{x}\\right)' : '- 3\\left(x - \\frac{1}{x}\\right)'} = ${k*k*k}$.`, markTag: '[1m]' },
            { step: `$x^3 ${signStr} \\frac{1}{x^3} = ${k*k*k} ${isPlus ? '- 3(' + k + ')' : '+ 3(' + k + ')'} = ${val}$.`, markTag: '[1m]' },
          ],
          finalAnswer: `${val}`,
          commonMistake: `Forgetting the cross term $3(x ${signStr} 1/x)$ and writing answer as simply $${k}^3 = ${k*k*k}$.`,
        },
        isGenerated: true,
        generatorId: 'ch04',
        generatorSeed: seed,
      };
    }
  } else {
    // Trinomial expansion evaluation: (a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)
    const S = rng.choice([7, 9, 10, 11, 12]);
    const P = rng.int(10, Math.floor((S * S - 10) / 2));
    const Q = S * S - 2 * P;

    const prompt = `If $a + b + c = ${S}$ and $a^2 + b^2 + c^2 = ${Q}$, find the value of $ab + bc + ca$.`;

    return {
      id: `gen_ch04_${rng.int(10000, 99999)}`,
      chapterId: 4,
      unitId: 3,
      title: 'Trinomial Identity ab + bc + ca',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `${P}`,
      hintLadder: {
        hint1Concept: 'Use the standard trinomial expansion identity for $(a+b+c)^2$.',
        hint2Formula: '$(a+b+c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$.',
        hint3Step: `$${S}^2 = ${Q} + 2(ab + bc + ca) \\implies ${S * S} - ${Q} = 2(ab + bc + ca)$.`,
      },
      solution: {
        steps: [
          { step: 'Identity: $(a+b+c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$.', markTag: '[1m]' },
          { step: `Substitute values: $(${S})^2 = ${Q} + 2(ab + bc + ca) \\implies ${S*S} = ${Q} + 2(ab + bc + ca)$.`, markTag: '[1m]' },
          { step: `$2(ab + bc + ca) = ${S*S} - ${Q} = ${2*P} \\implies ab + bc + ca = ${P}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${P}`,
        commonMistake: 'Forgetting to divide by 2 at the end, writing 2P instead of P.',
      },
      isGenerated: true,
      generatorId: 'ch04',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh04: Question[] = [
  {
    id: 'ch04_q01',
    chapterId: 4,
    unitId: 3,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Trinomial Expansion Form',
    prompt: 'The expansion of $(a - b + c)^2$ is equal to:',
    mcqOptions: [
      { id: 'A', text: '$a^2 + b^2 + c^2 - 2ab - 2bc + 2ca$', explanation: 'Correct: $b$ is negative, so products with $b$ are negative ($-2ab, -2bc$), while $(-b)^2 = +b^2$.' },
      { id: 'B', text: '$a^2 - b^2 + c^2 - 2ab + 2bc - 2ca$', explanation: 'Incorrect: squared terms are always positive.' },
      { id: 'C', text: '$a^2 + b^2 + c^2 + 2ab - 2bc - 2ca$', explanation: 'Incorrect: $+2ab$ has wrong sign.' },
      { id: 'D', text: '$a^2 + b^2 + c^2 - 2ab + 2bc + 2ca$', explanation: 'Incorrect: the product of $-b$ and $+c$ must be negative.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Write $(a - b + c)^2$ as $[a + (-b) + c]^2$.',
      hint2Formula: '$(x+y+z)^2 = x^2 + y^2 + z^2 + 2xy + 2yz + 2zx$.',
      hint3Step: 'Substitute $x=a, y=-b, z=c$: cross products are $2(a)(-b) = -2ab$, $2(-b)(c) = -2bc$, and $2(c)(a) = 2ca$.',
    },
    solution: {
      steps: [
        { step: 'Use identity $[a + (-b) + c]^2 = a^2 + (-b)^2 + c^2 + 2(a)(-b) + 2(-b)(c) + 2(c)(a)$.', markTag: '[0.5m]' },
        { step: '$= a^2 + b^2 + c^2 - 2ab - 2bc + 2ca$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: $a^2 + b^2 + c^2 - 2ab - 2bc + 2ca$',
      commonMistake: 'Making $b^2$ negative or getting the sign of $-2bc$ wrong.',
    },
  },
  {
    id: 'ch04_q02',
    chapterId: 4,
    unitId: 3,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Value of a^3 + b^3 + c^3',
    prompt: '**Assertion (A)**: If $a + b + c = 0$, then $a^3 + b^3 + c^3 = 3abc$.\n\n**Reason (R)**: $a^3 + b^3 + c^3 - 3abc = (a+b+c)(a^2 + b^2 + c^2 - ab - bc - ca)$.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Look at the factorization identity of $a^3 + b^3 + c^3 - 3abc$.',
      hint2Formula: 'If $a+b+c = 0$, the right-hand side becomes $0 \\times (\\dots) = 0$.',
      hint3Step: 'Hence $a^3 + b^3 + c^3 - 3abc = 0 \\implies a^3 + b^3 + c^3 = 3abc$.',
    },
    solution: {
      steps: [
        { step: 'Identity: $a^3 + b^3 + c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)$ is True (Reason R).', markTag: '[0.5m]' },
        { step: 'When $a+b+c = 0$, RHS $= 0$, so $a^3 + b^3 + c^3 = 3abc$. Both are True and R correctly explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Thinking that $a^3+b^3+c^3 = 3abc$ is only an empirical observation without general algebraic identity.',
    },
  },
  {
    id: 'ch04_q03',
    chapterId: 4,
    unitId: 3,
    type: 'numerical',
    difficulty: 'Easy',
    marks: 2,
    title: 'Reciprocal Squares',
    prompt: 'If $x - \\frac{1}{x} = 5$, find the value of $x^2 + \\frac{1}{x^2}$.',
    expectedAnswer: '27',
    hintLadder: {
      hint1Concept: 'Square both sides of $\\left(x - \\frac{1}{x}\\right) = 5$.',
      hint2Formula: '$\\left(x - \\frac{1}{x}\\right)^2 = x^2 + \\frac{1}{x^2} - 2$.',
      hint3Step: '$5^2 = x^2 + \\frac{1}{x^2} - 2 \\implies 25 + 2 = x^2 + \\frac{1}{x^2}$.',
    },
    solution: {
      steps: [
        { step: 'Squaring both sides: $\\left(x - \\frac{1}{x}\\right)^2 = 5^2$.', markTag: '[1m]' },
        { step: '$x^2 - 2\\left(x\\right)\\left(\\frac{1}{x}\\right) + \\frac{1}{x^2} = 25 \\implies x^2 + \\frac{1}{x^2} - 2 = 25$.', markTag: '[0.5m]' },
        { step: '$x^2 + \\frac{1}{x^2} = 25 + 2 = 27$.', markTag: '[0.5m]' },
      ],
      finalAnswer: '27',
      commonMistake: 'Subtracting 2 from 25 to get 23 instead of adding 2.',
    },
  },
  {
    id: 'ch04_q04',
    chapterId: 4,
    unitId: 3,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Reciprocal Cubes Calculation',
    prompt: 'If $x + \\frac{1}{x} = 4$, find the value of $x^3 + \\frac{1}{x^3}$.',
    expectedAnswer: '52',
    hintLadder: {
      hint1Concept: 'Cube both sides using identity $(a+b)^3 = a^3 + b^3 + 3ab(a+b)$.',
      hint2Formula: '$\\left(x + \\frac{1}{x}\\right)^3 = x^3 + \\frac{1}{x^3} + 3\\left(x + \\frac{1}{x}\\right)$.',
      hint3Step: '$4^3 = x^3 + \\frac{1}{x^3} + 3(4) \\implies 64 = x^3 + \\frac{1}{x^3} + 12$.',
    },
    solution: {
      steps: [
        { step: 'Cubing both sides: $\\left(x + \\frac{1}{x}\\right)^3 = 4^3 = 64$.', markTag: '[1m]' },
        { step: 'Expansion: $x^3 + \\frac{1}{x^3} + 3\\left(x\\right)\\left(\\frac{1}{x}\\right)\\left(x + \\frac{1}{x}\\right) = 64$.', markTag: '[1m]' },
        { step: '$x^3 + \\frac{1}{x^3} + 3(4) = 64 \\implies x^3 + \\frac{1}{x^3} = 64 - 12 = 52$.', markTag: '[1m]' },
      ],
      finalAnswer: '52',
      commonMistake: 'Writing $4^3 = 64$ directly without subtracting $3 \\times 4 = 12$.',
    },
  },
  {
    id: 'ch04_q05',
    chapterId: 4,
    unitId: 3,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Higher Degree Reciprocals',
    prompt: 'Given that $x - \\frac{1}{x} = 3$:\n\n**(i)** Find the value of $x^2 + \\frac{1}{x^2}$.\n**(ii)** Find the value of $x^4 + \\frac{1}{x^4}$.',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Value of $x^2 + 1/x^2$:',
        expectedAnswer: '11',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Value of $x^4 + 1/x^4$:',
        expectedAnswer: '119',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'For (i), square $(x - 1/x)$. For (ii), square your answer to (i).',
      hint2Formula: '$(x - 1/x)^2 = x^2 + 1/x^2 - 2$, and $(x^2 + 1/x^2)^2 = x^4 + 1/x^4 + 2$.',
      hint3Step: '(i) $3^2 + 2 = 11$. (ii) $11^2 - 2 = 121 - 2 = 119$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): $\\left(x - \\frac{1}{x}\\right)^2 = 3^2 \\implies x^2 + \\frac{1}{x^2} - 2 = 9 \\implies x^2 + \\frac{1}{x^2} = 11$.', markTag: '[2m]' },
        { step: 'Part (ii): Square the result from (i): $\\left(x^2 + \\frac{1}{x^2}\\right)^2 = 11^2 = 121$.', markTag: '[1m]' },
        { step: '$x^4 + \\frac{1}{x^4} + 2 = 121 \\implies x^4 + \\frac{1}{x^4} = 121 - 2 = 119$.', markTag: '[1m]' },
      ],
      finalAnswer: '(i) 11, (ii) 119',
      commonMistake: 'Adding 2 in part (ii) instead of subtracting 2 because $(x^2 + 1/x^2)$ has a positive sign.',
    },
  },
  {
    id: 'ch04_q06',
    chapterId: 4,
    unitId: 3,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Conditional Evaluation with a + b + c = 0',
    prompt: 'Without directly calculating cubes, evaluate:\n$$25^3 - 15^3 - 10^3$$',
    expectedAnswer: '11250',
    nepTags: ['HOTS', 'Brain Maths'],
    hintLadder: {
      hint1Concept: 'Check if the numbers sum to zero: $25 + (-15) + (-10) = 0$.',
      hint2Formula: 'If $a + b + c = 0$, then $a^3 + b^3 + c^3 = 3abc$.',
      hint3Step: 'Here $a=25, b=-15, c=-10$. Compute $3 \\times 25 \\times (-15) \\times (-10)$.',
    },
    solution: {
      steps: [
        { step: 'Rewrite expression as $25^3 + (-15)^3 + (-10)^3$.', markTag: '[1m]' },
        { step: 'Check sum: $a + b + c = 25 + (-15) + (-10) = 0$.', markTag: '[1m]' },
        { step: 'Since sum is $0$, $a^3 + b^3 + c^3 = 3abc = 3 \\times 25 \\times (-15) \\times (-10) = 75 \\times 150 = 11,250$.', markTag: '[1m]' },
      ],
      finalAnswer: '11250',
      commonMistake: 'Making a sign error with the two negatives, resulting in $-11250$.',
    },
  },
];
