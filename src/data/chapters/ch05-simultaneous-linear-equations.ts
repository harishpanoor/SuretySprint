import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateSimultaneousEqQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Standard system:
    // a1 x + b1 y = c1
    // a2 x + b2 y = c2
    // Choose small clean integer solutions x, y in [-5, 8]
    const x = rng.intNonZero(-4, 6);
    const y = rng.intNonZero(-4, 6);

    const a1 = rng.intNonZero(1, 4);
    const b1 = rng.intNonZero(1, 4);
    let a2 = rng.intNonZero(1, 4);
    let b2 = rng.intNonZero(-3, 3);
    // ensure non-parallel
    while (a1 * b2 - a2 * b1 === 0) {
      b2 = rng.intNonZero(-4, 4);
    }

    const c1 = a1 * x + b1 * y;
    const c2 = a2 * x + b2 * y;

    const sign1 = b1 > 0 ? `+ ${b1 === 1 ? '' : b1}` : `- ${Math.abs(b1) === 1 ? '' : Math.abs(b1)}`;
    const sign2 = b2 > 0 ? `+ ${b2 === 1 ? '' : b2}` : `- ${Math.abs(b2) === 1 ? '' : Math.abs(b2)}`;

    const eq1 = `${a1 === 1 ? '' : a1}x ${sign1}y = ${c1}`;
    const eq2 = `${a2 === 1 ? '' : a2}x ${sign2}y = ${c2}`;

    const prompt = `Solve the following simultaneous linear equations for $x$ and $y$:\n$$\\begin{cases} ${eq1} \\\\ ${eq2} \\end{cases}$$\nGive your answer as an ordered pair \`(x, y)\` or \`x, y\`.`;
    const expectedAnswer = `(${x}, ${y})`;

    return {
      id: `gen_ch05_${rng.int(10000, 99999)}`,
      chapterId: 5,
      unitId: 3,
      title: 'Simultaneous Linear Equations by Elimination',
      type: 'expression',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer,
      acceptableAnswers: [
        `(${x}, ${y})`,
        `${x}, ${y}`,
        `x = ${x}, y = ${y}`,
        `x=${x},y=${y}`,
      ],
      hintLadder: {
        hint1Concept: 'Use the Method of Elimination: multiply one or both equations to equate coefficients of $y$ or $x$.',
        hint2Formula: `Multiply equation (1) by ${Math.abs(b2)} and equation (2) by ${Math.abs(b1)}.`,
        hint3Step: `Add or subtract equations to eliminate $y$, then solve for $x = ${x}$.`,
      },
      solution: {
        steps: [
          { step: `Equation (1): $${eq1}$, Equation (2): $${eq2}$.`, markTag: '[1m]' },
          { step: `Multiply equations to align coefficients and eliminate one variable:`, markTag: '[1m]' },
          { step: `Substituting into Equation (1) gives $x = ${x}$ and $y = ${y}$. Solution is $(${x}, ${y})$.`, markTag: '[1m]' },
        ],
        finalAnswer: `(${x}, ${y})`,
        commonMistake: 'Sign error when subtracting equations to eliminate a variable.',
      },
      isGenerated: true,
      generatorId: 'ch05',
      generatorSeed: seed,
    };
  } else {
    // Word problem: Two-digit number
    // Let tens digit be t, units digit be u
    const t = rng.int(2, 7);
    const u = rng.int(1, 8);
    const origNum = 10 * t + u;
    const sumDigits = t + u;
    const revNum = 10 * u + t;
    const diff = origNum - revNum; // 9*(t - u)

    const prompt = `The sum of the digits of a two-digit number is ${sumDigits}. If the digits are reversed, the new number is ${Math.abs(diff)} ${diff > 0 ? 'less than' : 'more than'} the original number. Find the **original number**.`;
    const expectedAnswer = `${origNum}`;

    return {
      id: `gen_ch05_${rng.int(10000, 99999)}`,
      chapterId: 5,
      unitId: 3,
      title: 'Two-Digit Number Word Problem',
      type: 'numerical',
      difficulty: 'Exam',
      marks: 4,
      prompt,
      expectedAnswer,
      hintLadder: {
        hint1Concept: 'Let the tens digit be $x$ and the units digit be $y$. The original number is $10x + y$.',
        hint2Formula: 'Equation 1: $x + y = ' + sumDigits + '$. Equation 2: $(10x + y) - (10y + x) = ' + diff + ' \\implies 9(x - y) = ' + diff + '$.',
        hint3Step: `Solve the system: $x + y = ${sumDigits}$ and $x - y = ${t - u}$. Add equations to find $x$.`,
      },
      solution: {
        steps: [
          { step: `Let tens digit $= x$ and units digit $= y$. Original number $= 10x + y$. Reversing digits gives $10y + x$.`, markTag: '[1m]' },
          { step: `From condition 1: $x + y = ${sumDigits}$. From condition 2: $(10x + y) - (10y + x) = ${diff} \\implies 9(x - y) = ${diff} \\implies x - y = ${t - u}$.`, markTag: '[1m]' },
          { step: `Adding the two equations: $2x = ${sumDigits + (t - u)} \\implies x = ${t}$. Then $y = ${sumDigits} - ${t} = ${u}$.`, markTag: '[1m]' },
          { step: `Original number $= 10(${t}) + ${u} = ${origNum}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${origNum}`,
        commonMistake: 'Giving the reversed number or writing the number as $xy$ instead of $10x + y$.',
      },
      isGenerated: true,
      generatorId: 'ch05',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh05: Question[] = [
  {
    id: 'ch05_q01',
    chapterId: 5,
    unitId: 3,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Condition for Unique Solution',
    prompt: 'A pair of linear equations $a_1 x + b_1 y + c_1 = 0$ and $a_2 x + b_2 y + c_2 = 0$ has a **unique solution** if and only if:',
    mcqOptions: [
      { id: 'A', text: '$\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$', explanation: 'Correct: The two lines intersect at exactly one point.' },
      { id: 'B', text: '$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$', explanation: 'Incorrect: this represents parallel lines (no solution).' },
      { id: 'C', text: '$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$', explanation: 'Incorrect: this represents coincident lines (infinitely many solutions).' },
      { id: 'D', text: '$a_1 b_2 + a_2 b_1 = 0$', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'A unique solution requires lines to intersect at a single point (different slopes).',
      hint2Formula: 'Slopes are $m_1 = -a_1/b_1$ and $m_2 = -a_2/b_2$.',
      hint3Step: '$m_1 \\neq m_2 \\implies \\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$.',
    },
    solution: {
      steps: [
        { step: 'Lines intersect at a single unique point if their slopes are distinct: $-a_1/b_1 \\neq -a_2/b_2$.', markTag: '[0.5m]' },
        { step: 'Rearranging gives $\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: a1/a2 ≠ b1/b2',
      commonMistake: 'Confusing unique solution condition with no-solution (parallel lines) condition.',
    },
  },
  {
    id: 'ch05_q02',
    chapterId: 5,
    unitId: 3,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Speed in Still Water and Stream',
    prompt: '**Assertion (A)**: If a boat travels downstream with speed $14\\text{ km/h}$ and upstream with speed $8\\text{ km/h}$, then the speed of the stream is $3\\text{ km/h}$.\n\n**Reason (R)**: Speed of stream $v = \\frac{\\text{Downstream Speed} - \\text{Upstream Speed}}{2}$.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Let boat speed in still water be $u$ and stream speed be $v$.',
      hint2Formula: 'Downstream $= u + v = 14$ and Upstream $= u - v = 8$.',
      hint3Step: 'Subtracting: $2v = 14 - 8 = 6 \\implies v = 3\\text{ km/h}$.',
    },
    solution: {
      steps: [
        { step: 'Given: $u + v = 14$ and $u - v = 8$.', markTag: '[0.5m]' },
        { step: 'Subtracting: $2v = 14 - 8 = 6 \\implies v = 3\\text{ km/h}$. Assertion is True and Reason correctly explains it.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Adding the speeds and dividing by 2 (which gives boat speed in still water, $11\\text{ km/h}$).',
    },
  },
  {
    id: 'ch05_q03',
    chapterId: 5,
    unitId: 3,
    type: 'expression',
    difficulty: 'Standard',
    marks: 3,
    title: 'Solving by Cross-Multiplication Method',
    prompt: 'Solve the system of equations using cross-multiplication or elimination:\n$$\\begin{cases} 2x + 3y = 11 \\\\ 3x - 2y = 10 \\end{cases}$$\nAnswer as an ordered pair \`(x, y)\` or \`x, y\`.',
    expectedAnswer: '(4, 1)',
    acceptableAnswers: ['(4, 1)', '4, 1', 'x = 4, y = 1', '4,1', '(4,1)'],
    hintLadder: {
      hint1Concept: 'Multiply (1) by 2 and (2) by 3 to eliminate $y$.',
      hint2Formula: '$4x + 6y = 22$ and $9x - 6y = 30$.',
      hint3Step: 'Add equations: $13x = 52 \\implies x = 4$. Then $2(4) + 3y = 11 \\implies 3y = 3 \\implies y = 1$.',
    },
    solution: {
      steps: [
        { step: 'Multiply (1) by 2: $4x + 6y = 22$. Multiply (2) by 3: $9x - 6y = 30$.', markTag: '[1m]' },
        { step: 'Adding the two equations: $13x = 52 \\implies x = 4$.', markTag: '[1m]' },
        { step: 'Substitute $x=4$ into (1): $2(4) + 3y = 11 \\implies 8 + 3y = 11 \\implies 3y = 3 \\implies y = 1$.', markTag: '[1m]' },
      ],
      finalAnswer: '(4, 1)',
      commonMistake: 'Sign error when substituting back to find $y$.',
    },
  },
  {
    id: 'ch05_q04',
    chapterId: 5,
    unitId: 3,
    type: 'expression',
    difficulty: 'Exam',
    marks: 3,
    title: 'Equations Reducible to Linear Form',
    prompt: 'Solve the equations reducible to linear form for $x$ and $y$ ($x, y \\neq 0$):\n$$\\begin{cases} \\frac{2}{x} + \\frac{3}{y} = 13 \\\\ \\frac{5}{x} - \\frac{4}{y} = -2 \\end{cases}$$\nAnswer as ordered pair \`(x, y)\` or \`x, y\`.',
    expectedAnswer: '(1/2, 1/3)',
    acceptableAnswers: [
      '(1/2, 1/3)',
      '1/2, 1/3',
      '(0.5, 0.333)',
      '(0.5, 1/3)',
      'x = 1/2, y = 1/3',
    ],
    hintLadder: {
      hint1Concept: 'Substitute $u = 1/x$ and $v = 1/y$ to convert to standard linear form.',
      hint2Formula: '$2u + 3v = 13$ and $5u - 4v = -2$.',
      hint3Step: 'Multiply (1) by 4 and (2) by 3: $8u + 12v = 52$ and $15u - 12v = -6$. Add: $23u = 46 \\implies u = 2 \\implies x = 1/2$.',
    },
    solution: {
      steps: [
        { step: 'Let $u = 1/x$ and $v = 1/y$. System becomes: $2u + 3v = 13$ and $5u - 4v = -2$.', markTag: '[1m]' },
        { step: 'Multiply eq (1) by 4 and eq (2) by 3: $8u + 12v = 52$ and $15u - 12v = -6$. Adding gives $23u = 46 \\implies u = 2, v = 3$.', markTag: '[1m]' },
        { step: 'Since $x = 1/u$ and $y = 1/v$: $x = 1/2, y = 1/3$.', markTag: '[1m]' },
      ],
      finalAnswer: 'x = 1/2, \\; y = 1/3',
      commonMistake: 'Forgetting to take the reciprocal at the end and reporting $x = 2, y = 3$.',
    },
  },
  {
    id: 'ch05_q05',
    chapterId: 5,
    unitId: 3,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Fraction Word Problem',
    prompt: 'A fraction becomes $\\frac{1}{2}$ if 1 is added to both its numerator and denominator. If 5 is subtracted from both numerator and denominator, it becomes $\\frac{1}{5}$.\n\n**(i)** Write the pair of linear equations representing these statements.\n**(ii)** Find the original fraction (numerator / denominator).',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Value of the numerator (x):',
        expectedAnswer: '7',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Value of the denominator (y):',
        expectedAnswer: '15',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Let the fraction be $x/y$.',
      hint2Formula: 'Condition 1: $\\frac{x+1}{y+1} = \\frac{1}{2} \\implies 2x - y = -1$. Condition 2: $\\frac{x-5}{y-5} = \\frac{1}{5} \\implies 5x - y = 20$.',
      hint3Step: 'Subtract the two equations: $(5x - y) - (2x - y) = 20 - (-1) \\implies 3x = 21 \\implies x = 7$. Then $y = 2(7) + 1 = 15$. The fraction is $7/15$.',
    },
    solution: {
      steps: [
        { step: 'Let the fraction be $\\frac{x}{y}$. Given $\\frac{x+1}{y+1} = \\frac{1}{2} \\implies 2x + 2 = y + 1 \\implies 2x - y = -1$.', markTag: '[1m]' },
        { step: 'Also $\\frac{x-5}{y-5} = \\frac{1}{5} \\implies 5x - 25 = y - 5 \\implies 5x - y = 20$.', markTag: '[1m]' },
        { step: 'Subtracting: $3x = 21 \\implies x = 7$. Substituting gives $y = 2(7) + 1 = 15$.', markTag: '[2m]' },
      ],
      finalAnswer: 'Numerator = 7, Denominator = 15 (Fraction = 7/15)',
      commonMistake: 'Writing $(x+1)/(y+1)$ as $x/y + 1$.',
    },
  },
  {
    id: 'ch05_q06',
    chapterId: 5,
    unitId: 3,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 4,
    title: 'Ages Word Problem',
    prompt: 'Ten years ago, a father was 12 times as old as his son, and 10 years hence he will be twice as old as his son will be. Find the **present age of the father** (in years).',
    expectedAnswer: '34',
    hintLadder: {
      hint1Concept: 'Let father’s present age be $x$ and son’s present age be $y$.',
      hint2Formula: 'Ten years ago: $x - 10 = 12(y - 10)$. Ten years hence: $x + 10 = 2(y + 10)$.',
      hint3Step: '$x - 12y = -110$ and $x - 2y = 10$. Subtract: $10y = 120 \\implies y = 12$. Then $x = 2(12) + 10 = 34$.',
    },
    solution: {
      steps: [
        { step: 'Let father’s present age be $x$ and son’s be $y$. 10 years ago: $x - 10 = 12(y - 10) \\implies x - 12y = -110$.', markTag: '[1m]' },
        { step: '10 years hence: $x + 10 = 2(y + 10) \\implies x - 2y = 10$.', markTag: '[1m]' },
        { step: 'Subtracting: $(x - 2y) - (x - 12y) = 10 - (-110) \\implies 10y = 120 \\implies y = 12$.', markTag: '[1m]' },
        { step: 'Father’s present age $x = 2(12) + 10 = 34$ years.', markTag: '[1m]' },
      ],
      finalAnswer: '34 years',
      commonMistake: 'Forgetting to subtract 10 from BOTH father and son when setting up the past age equation.',
    },
  },
];
