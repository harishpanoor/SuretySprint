import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateFactorisationQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Quadratic trinomial: (x + p)(x + q) = x^2 + (p+q)x + pq
    // Keep p and q distinct non-zero integers in [-6, 6]
    let p = rng.intNonZero(-6, 6);
    let q = rng.intNonZero(-6, 6);
    while (p === q) {
      q = rng.intNonZero(-6, 6);
    }

    const b = p + q;
    const c = p * q;
    const bStr = b === 0 ? '' : b > 0 ? (b === 1 ? '+ x' : `+ ${b}x`) : (b === -1 ? '- x' : `- ${Math.abs(b)}x`);
    const cStr = c > 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
    const expr = `x^2 ${bStr} ${cStr}`;

    const factor1 = p > 0 ? `(x+${p})` : `(x-${Math.abs(p)})`;
    const factor2 = q > 0 ? `(x+${q})` : `(x-${Math.abs(q)})`;
    const factoredStr = `${factor1}${factor2}`;
    const factoredRev = `${factor2}${factor1}`;

    const prompt = `Factorise the quadratic expression completely:\n$$${expr}$$`;

    return {
      id: `gen_ch04_${rng.int(10000, 99999)}`,
      chapterId: 4,
      unitId: 3,
      title: 'Factorising Quadratic Trinomial',
      type: 'expression',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: factoredStr,
      acceptableAnswers: [factoredStr, factoredRev],
      hintLadder: {
        hint1Concept: 'Split the middle term by finding two integers whose sum is the coefficient of $x$ and product is the constant term.',
        hint2Formula: `Find two numbers $p$ and $q$ such that $p + q = ${b}$ and $p \\times q = ${c}$.`,
        hint3Step: `The two numbers are $${p}$ and $${q}$. Split the middle term: $x^2 ${p > 0 ? '+ ' + p : '- ' + Math.abs(p)}x ${q > 0 ? '+ ' + q : '- ' + Math.abs(q)}x ${cStr}$.`,
      },
      solution: {
        steps: [
          { step: `For $x^2 ${bStr} ${cStr}$, product $= ${c}$ and sum $= ${b}$.`, markTag: '[1m]' },
          { step: `The two numbers are $${p}$ and $${q}$. Splitting middle term: $x^2 ${p > 0 ? '+' + p : '-' + Math.abs(p)}x ${q > 0 ? '+' + q : '-' + Math.abs(q)}x ${cStr}$.`, markTag: '[1m]' },
          { step: `Group terms: $x(x ${p > 0 ? '+' + p : '-' + Math.abs(p)}) ${q > 0 ? '+' + q : '-' + Math.abs(q)}(x ${p > 0 ? '+' + p : '-' + Math.abs(p)}) = ${factoredStr}$.`, markTag: '[1m]' },
        ],
        finalAnswer: factoredStr,
        commonMistake: 'Getting the signs of the two factors inverted when the constant term is negative.',
      },
      isGenerated: true,
      generatorId: 'ch04',
      generatorSeed: seed,
    };
  } else {
    // Difference of two squares: k^2 x^2 - m^2 = (kx - m)(kx + m)
    const k = rng.choice([2, 3, 4, 5]);
    const m = rng.choice([1, 3, 5, 7]);
    const k2 = k * k;
    const m2 = m * m;

    const expr = `${k2}x^2 - ${m2}`;
    const ans1 = `(${k}*x - ${m})(${k}*x + ${m})`;
    const ans2 = `(${k}*x + ${m})(${k}*x - ${m})`;

    const prompt = `Factorise completely using the difference of two squares identity:\n$$${expr}$$`;

    return {
      id: `gen_ch04_${rng.int(10000, 99999)}`,
      chapterId: 4,
      unitId: 3,
      title: 'Difference of Two Squares',
      type: 'expression',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: ans1,
      acceptableAnswers: [
        ans1,
        ans2,
        `(${k}x - ${m})(${k}x + ${m})`,
        `(${k}x + ${m})(${k}x - ${m})`,
      ],
      hintLadder: {
        hint1Concept: 'Recognize both terms as perfect squares and apply difference of two squares.',
        hint2Formula: '$a^2 - b^2 = (a - b)(a + b)$.',
        hint3Step: `Here $a^2 = (${k}x)^2$ and $b^2 = ${m}^2$.`,
      },
      solution: {
        steps: [
          { step: `Rewrite expression in square form: $(${k}x)^2 - (${m})^2$.`, markTag: '[1m]' },
          { step: `Apply identity $a^2 - b^2 = (a-b)(a+b)$ with $a = ${k}x, b = ${m}$: $(${k}x - ${m})(${k}x + ${m})$.`, markTag: '[1m]' },
        ],
        finalAnswer: `(${k}x - ${m})(${k}x + ${m})`,
        commonMistake: 'Writing $kx^2$ instead of $(kx)^2$, or forgetting to take square root of coefficient.',
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
    title: 'Sum of Cubes Factorisation',
    prompt: 'The completely factorised form of $8x^3 + 27y^3$ is:',
    mcqOptions: [
      { id: 'A', text: '$(2x + 3y)(4x^2 - 6xy + 9y^2)$', explanation: 'Correct: $a^3 + b^3 = (a+b)(a^2 - ab + b^2)$ where $a=2x, b=3y$.' },
      { id: 'B', text: '$(2x + 3y)(4x^2 + 6xy + 9y^2)$', explanation: 'Incorrect: middle term of quadratic factor must have negative sign.' },
      { id: 'C', text: '$(2x - 3y)(4x^2 + 6xy + 9y^2)$', explanation: 'Incorrect: binomial factor must have plus sign.' },
      { id: 'D', text: '$(2x + 3y)^3$', explanation: 'Incorrect: $(a+b)^3 \\neq a^3 + b^3$.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Express both terms as cubes of monomials.',
      hint2Formula: '$a^3 + b^3 = (a+b)(a^2 - ab + b^2)$.',
      hint3Step: '$8x^3 = (2x)^3$ and $27y^3 = (3y)^3$. Note the middle term is $-ab = -(2x)(3y) = -6xy$.',
    },
    solution: {
      steps: [
        { step: '$8x^3 + 27y^3 = (2x)^3 + (3y)^3$.', markTag: '[0.5m]' },
        { step: 'Using identity $a^3 + b^3 = (a+b)(a^2 - ab + b^2)$: $(2x + 3y)((2x)^2 - (2x)(3y) + (3y)^2) = (2x + 3y)(4x^2 - 6xy + 9y^2)$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: $(2x + 3y)(4x^2 - 6xy + 9y^2)$',
      commonMistake: 'Putting a positive sign $+6xy$ inside the second bracket.',
    },
  },
  {
    id: 'ch04_q02',
    chapterId: 4,
    unitId: 3,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Difference of Fourth Powers',
    prompt: '**Assertion (A)**: The expression $x^4 - 81$ can be factorised into three factors: $(x^2 + 9)(x + 3)(x - 3)$.\n\n**Reason (R)**: The sum of two squares $x^2 + 9$ cannot be factorised into linear factors with real coefficients.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Apply difference of squares twice: $(x^2)^2 - 9^2 = (x^2+9)(x^2-9)$.',
      hint2Formula: '$x^2 - 9 = (x-3)(x+3)$, but $x^2+9$ has no real roots.',
      hint3Step: 'Hence $x^4 - 81$ stops at 3 factors in the real numbers.',
    },
    solution: {
      steps: [
        { step: '$x^4 - 81 = (x^2 - 9)(x^2 + 9) = (x-3)(x+3)(x^2+9)$. Assertion is True.', markTag: '[0.5m]' },
        { step: '$x^2 + 9 > 0$ for all real $x$, so it has no real linear factors. Reason is True and explains why factorisation stops at 3 factors.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Attempting to factorise $x^2 + 9$ as $(x+3)(x+3)$ or $(x+3)^2$.',
    },
  },
  {
    id: 'ch04_q03',
    chapterId: 4,
    unitId: 3,
    type: 'expression',
    difficulty: 'Standard',
    marks: 3,
    title: 'Grouping Method Factorisation',
    prompt: 'Factorise by grouping:\n$$ab(x^2 + y^2) - xy(a^2 + b^2)$$',
    expectedAnswer: '(ax - by)(bx - ay)',
    acceptableAnswers: [
      '(ax - by)(bx - ay)',
      '(bx - ay)(ax - by)',
      '(by - ax)(ay - bx)',
      '(ay - bx)(by - ax)'
    ],
    hintLadder: {
      hint1Concept: 'Expand the parentheses first, then regroup the terms.',
      hint2Formula: '$abx^2 + aby^2 - a^2xy - b^2xy$.',
      hint3Step: 'Group as $(abx^2 - a^2xy) + (aby^2 - b^2xy) = ax(bx - ay) - by(bx - ay)$.',
    },
    solution: {
      steps: [
        { step: 'Expand: $abx^2 + aby^2 - a^2xy - b^2xy$.', markTag: '[1m]' },
        { step: 'Regroup: $(abx^2 - a^2xy) - (b^2xy - aby^2) = ax(bx - ay) - by(bx - ay)$.', markTag: '[1m]' },
        { step: 'Take common binomial $(bx - ay)$: $(bx - ay)(ax - by)$.', markTag: '[1m]' },
      ],
      finalAnswer: '(bx - ay)(ax - by)',
      commonMistake: 'Forgetting to change sign when factoring out $-by$ in the second pair.',
    },
  },
  {
    id: 'ch04_q04',
    chapterId: 4,
    unitId: 3,
    type: 'expression',
    difficulty: 'Standard',
    marks: 3,
    title: 'Splitting the Middle Term with Leading Coefficient',
    prompt: 'Factorise completely:\n$$6x^2 + 11x - 10$$',
    expectedAnswer: '(2*x + 5)(3*x - 2)',
    acceptableAnswers: [
      '(2*x + 5)(3*x - 2)',
      '(3*x - 2)(2*x + 5)',
      '(2x + 5)(3x - 2)',
      '(3x - 2)(2x + 5)',
    ],
    hintLadder: {
      hint1Concept: 'Multiply leading coefficient $a=6$ and constant $c=-10$ to find product $ac = -60$.',
      hint2Formula: 'Find two numbers with product $-60$ and sum $+11$.',
      hint3Step: 'The numbers are $+15$ and $-4$. Split $11x = 15x - 4x$.',
    },
    solution: {
      steps: [
        { step: '$ac = 6 \\times (-10) = -60$ and $b = 11$. Numbers are $+15$ and $-4$.', markTag: '[1m]' },
        { step: 'Split: $6x^2 + 15x - 4x - 10 = 3x(2x + 5) - 2(2x + 5)$.', markTag: '[1m]' },
        { step: 'Factored form: $(2x + 5)(3x - 2)$.', markTag: '[1m]' },
      ],
      finalAnswer: '(2x + 5)(3x - 2)',
      commonMistake: 'Using numbers $+6$ and $+5$ (whose sum is 11 but product is $+30$, not $-60$).',
    },
  },
  {
    id: 'ch04_q05',
    chapterId: 4,
    unitId: 3,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Iterative Difference of Squares',
    prompt: 'Consider the algebraic expression $x^8 - y^8$:\n\n**(i)** How many linear and quadratic irreducible factors does it decompose into over the reals?\n**(ii)** Factorise $x^4 - 16$ completely.',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Total number of real irreducible factors of $x^8 - y^8$:',
        expectedAnswer: '4',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Factorised form of $x^4 - 16$:',
        expectedAnswer: '(x^2 + 4)(x + 2)(x - 2)',
        acceptableAnswers: [
          '(x^2 + 4)(x + 2)(x - 2)',
          '(x^2+4)(x+2)(x-2)',
          '(x - 2)(x + 2)(x^2 + 4)',
        ],
        marks: 2,
        answerType: 'expression',
      },
    ],
    hintLadder: {
      hint1Concept: 'Apply difference of squares repeatedly.',
      hint2Formula: '$x^8 - y^8 = (x^4 + y^4)(x^2 + y^2)(x + y)(x - y)$.',
      hint3Step: 'There are 4 factors. For (ii), $x^4 - 16 = (x^2+4)(x^2-4) = (x^2+4)(x+2)(x-2)$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): $x^8 - y^8 = (x^4 - y^4)(x^4 + y^4) = (x^2 - y^2)(x^2 + y^2)(x^4 + y^4) = (x - y)(x + y)(x^2 + y^2)(x^4 + y^4)$. Total factors $= 4$.', markTag: '[2m]' },
        { step: 'Part (ii): $x^4 - 16 = (x^2)^2 - 4^2 = (x^2 + 4)(x^2 - 4) = (x^2 + 4)(x + 2)(x - 2)$.', markTag: '[2m]' },
      ],
      finalAnswer: '(i) 4, (ii) (x^2 + 4)(x + 2)(x - 2)',
      commonMistake: 'Stopping at $(x^2-4)(x^2+4)$ in part (ii) without further factorising $(x^2-4)$.',
    },
  },
  {
    id: 'ch04_q06',
    chapterId: 4,
    unitId: 3,
    type: 'expression',
    difficulty: 'Exam',
    marks: 3,
    title: 'Difference of Cubes with Polynomial Terms',
    prompt: 'Factorise completely:\n$$a^3 - \\frac{1}{a^3} - 2a + \\frac{2}{a}$$',
    expectedAnswer: '(a - 1/a)(a^2 + 1/a^2 - 1)',
    acceptableAnswers: [
      '(a - 1/a)(a^2 + 1/a^2 - 1)',
      '(a - 1/a)(a^2 - 1 + 1/a^2)',
      '(a - 1/a)(a^2 + 1/a^2 - 1.0)',
    ],
    hintLadder: {
      hint1Concept: 'Group the first two terms as difference of cubes, and factor out $-2$ from the remaining two terms.',
      hint2Formula: '$a^3 - 1/a^3 = (a - 1/a)(a^2 + 1 + 1/a^2)$ and $-2a + 2/a = -2(a - 1/a)$.',
      hint3Step: 'Factor out the common factor $(a - 1/a)$ from both parts.',
    },
    solution: {
      steps: [
        { step: 'Group: $\\left(a^3 - \\frac{1}{a^3}\\right) - 2\\left(a - \\frac{1}{a}\\right)$.', markTag: '[1m]' },
        { step: 'Use identity: $\\left(a - \\frac{1}{a}\\right)\\left(a^2 + 1 + \\frac{1}{a^2}\\right) - 2\\left(a - \\frac{1}{a}\\right)$.', markTag: '[1m]' },
        { step: 'Take $(a - 1/a)$ common: $\\left(a - \\frac{1}{a}\\right)\\left(a^2 + 1 + \\frac{1}{a^2} - 2\\right) = \\left(a - \\frac{1}{a}\\right)\\left(a^2 + \\frac{1}{a^2} - 1\\right)$.', markTag: '[1m]' },
      ],
      finalAnswer: '(a - 1/a)(a^2 + 1/a^2 - 1)',
      commonMistake: 'Writing $-2(a + 1/a)$ when factoring out $-2$ from $-2a + 2/a$.',
    },
  },
];
