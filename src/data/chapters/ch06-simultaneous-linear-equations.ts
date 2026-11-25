import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateSimultaneousEqQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Standard system:
    // a1 x + b1 y = c1
    // a2 x + b2 y = c2
    const x = rng.intNonZero(-4, 6);
    const y = rng.intNonZero(-4, 6);

    const a1 = rng.intNonZero(1, 4);
    const b1 = rng.intNonZero(1, 4);
    let a2 = rng.intNonZero(1, 4);
    let b2 = rng.intNonZero(-3, 3);
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
      id: `gen_ch06_${rng.int(10000, 99999)}`,
      chapterId: 6,
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
        `(${x},${y})`,
        `${x},${y}`,
      ],
      hintLadder: {
        hint1Concept: 'Eliminate one variable by multiplying the equations so that coefficients of $x$ or $y$ match in magnitude.',
        hint2Formula: `Multiply eq (1) by ${Math.abs(b2)} and eq (2) by ${Math.abs(b1)} to eliminate $y$.`,
        hint3Step: `After eliminating one variable, solve for the first variable, then substitute back into either equation to find the second.`,
      },
      solution: {
        steps: [
          { step: `Given: (1) $${eq1}$ and (2) $${eq2}$.`, markTag: '[0.5m]' },
          { step: `Eliminating $y$: solve for $x = ${x}$.`, markTag: '[1.5m]' },
          { step: `Substitute $x = ${x}$ into eq (1) to get $y = ${y}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `(${x}, ${y})`,
        commonMistake: 'Forgetting to multiply the constant term on the right-hand side when scaling equations.',
      },
      isGenerated: true,
      generatorId: 'ch06',
      generatorSeed: seed,
    };
  } else {
    // Two-digit number word problem generator
    const tens = rng.int(2, 8);
    let units = rng.int(1, 9);
    while (units === tens) {
      units = rng.int(1, 9);
    }

    const num = 10 * tens + units;
    const revNum = 10 * units + tens;
    const sumOfDigits = tens + units;
    const diff = revNum - num; // 9 * (units - tens)

    const prompt = `The sum of the digits of a two-digit number is ${sumOfDigits}. If the digits are reversed, the new number ${diff > 0 ? 'exceeds the original number by ' + diff : 'is less than the original number by ' + Math.abs(diff)}.\nFind the **original number**.`;

    return {
      id: `gen_ch06_${rng.int(10000, 99999)}`,
      chapterId: 6,
      unitId: 3,
      title: 'Two-Digit Number Word Problem',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `${num}`,
      hintLadder: {
        hint1Concept: 'Let the tens digit be $x$ and the units digit be $y$. The original number is $10x + y$ and the reversed number is $10y + x$.',
        hint2Formula: `Equation 1: $x + y = ${sumOfDigits}$. Equation 2: $(10y + x) - (10x + y) = ${diff} \\implies 9(y - x) = ${diff} \\implies y - x = ${units - tens}$.`,
        hint3Step: `Add equations: $2y = ${sumOfDigits + units - tens} \\implies y = ${units}$. Then $x = ${tens}$. Original number is ${num}.`,
      },
      solution: {
        steps: [
          { step: `Let tens digit $= x$ and units digit $= y$. Original number $= 10x + y$. Given $x + y = ${sumOfDigits}$.`, markTag: '[1m]' },
          { step: `Reversed number $= 10y + x$. Given $(10y + x) - (10x + y) = ${diff} \\implies 9(y - x) = ${diff} \\implies y - x = ${units - tens}$.`, markTag: '[1m]' },
          { step: `Solving: $x = ${tens}, y = ${units}$. Original number $= 10(${tens}) + ${units} = ${num}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${num}`,
        commonMistake: 'Writing the reversed number as the answer instead of the original number.',
      },
      isGenerated: true,
      generatorId: 'ch06',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh06: Question[] = [
  {
    id: 'ch06_q01',
    chapterId: 6,
    unitId: 3,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Condition for Unique Solution',
    prompt: 'The pair of linear equations $a_1 x + b_1 y + c_1 = 0$ and $a_2 x + b_2 y + c_2 = 0$ has a unique solution if and only if:',
    mcqOptions: [
      { id: 'A', text: '$\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$', explanation: 'Correct: The lines intersect at exactly one point.' },
      { id: 'B', text: '$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$', explanation: 'Incorrect: This is the condition for parallel lines (no solution).' },
      { id: 'C', text: '$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$', explanation: 'Incorrect: This is the condition for coincident lines (infinitely many solutions).' },
      { id: 'D', text: '$a_1 a_2 + b_1 b_2 = 0$', explanation: 'Incorrect: This is the condition for perpendicular lines, not uniqueness.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'For lines to have a single unique intersection, their slopes must differ.',
      hint2Formula: 'Slope $m_1 = -a_1/b_1$ and $m_2 = -a_2/b_2$. Unique solution means $m_1 \\neq m_2$.',
      hint3Step: 'Equating gives $\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$.',
    },
    solution: {
      steps: [
        { step: 'A system of two linear equations has a unique solution when the two straight lines intersect at a single point, which requires $\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$.', markTag: '[1m]' },
      ],
      finalAnswer: 'A: a1/a2 != b1/b2',
      commonMistake: 'Confusing unique solution condition with no solution condition.',
    },
  },
  {
    id: 'ch06_q02',
    chapterId: 6,
    unitId: 3,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Reducible Systems',
    prompt: '**Assertion (A)**: The non-linear system $\\frac{3}{x} + \\frac{4}{y} = 7$ and $\\frac{5}{x} - \\frac{2}{y} = 3$ can be solved using standard linear elimination methods.\n\n**Reason (R)**: By substituting $u = 1/x$ and $v = 1/y$, the system transforms into a pair of linear equations in $u$ and $v$.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Think about substitution for reciprocal variables.',
      hint2Formula: 'Replace $1/x$ with $u$ and $1/y$ with $v$.',
      hint3Step: 'This yields $3u + 4v = 7$ and $5u - 2v = 3$, which is linear in $u$ and $v$.',
    },
    solution: {
      steps: [
        { step: 'Substituting $u = 1/x, v = 1/y$ yields linear system $3u + 4v = 7$ and $5u - 2v = 3$.', markTag: '[0.5m]' },
        { step: 'Thus Reason R is True and correctly explains Assertion A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Trying to cross-multiply $x$ and $y$ directly to get non-linear $xy$ terms.',
    },
  },
  {
    id: 'ch06_q03',
    chapterId: 6,
    unitId: 3,
    type: 'expression',
    difficulty: 'Standard',
    marks: 3,
    title: 'Solving by Elimination Method',
    prompt: 'Solve the simultaneous equations by the method of elimination:\n$$\\begin{cases} 3x + 2y = 11 \\\\ 2x + 3y = 4 \\end{cases}$$\nAnswer in the format \`(x, y)\` or \`x, y\`.',
    expectedAnswer: '(5, -2)',
    acceptableAnswers: ['(5, -2)', '5, -2', 'x = 5, y = -2', '(5,-2)', '5,-2'],
    hintLadder: {
      hint1Concept: 'Multiply the first equation by 3 and the second equation by 2 to equate the coefficients of $y$.',
      hint2Formula: '$9x + 6y = 33$ and $4x + 6y = 8$.',
      hint3Step: 'Subtract: $(9x - 4x) = 33 - 8 \\implies 5x = 25 \\implies x = 5$. Then substitute into $3(5) + 2y = 11$.',
    },
    solution: {
      steps: [
        { step: 'Multiply eq (1) by 3: $9x + 6y = 33$. Multiply eq (2) by 2: $4x + 6y = 8$.', markTag: '[1m]' },
        { step: 'Subtracting: $5x = 25 \\implies x = 5$.', markTag: '[1m]' },
        { step: 'Substitute $x = 5$ into eq (1): $3(5) + 2y = 11 \\implies 15 + 2y = 11 \\implies 2y = -4 \\implies y = -2$.', markTag: '[1m]' },
      ],
      finalAnswer: '(5, -2)',
      commonMistake: 'Sign error when substituting back to find $y$.',
    },
  },
  {
    id: 'ch06_q04',
    chapterId: 6,
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
    id: 'ch06_q05',
    chapterId: 6,
    unitId: 3,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Fraction Word Problem',
    prompt: 'A fraction becomes $\\frac{1}{2}$ if 1 is added to both its numerator and denominator. If 5 is subtracted from both numerator and denominator, it becomes $\\frac{1}{5}$.\n\n**(i)** Find the value of the numerator ($x$).\n**(ii)** Find the value of the denominator ($y$).',
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
    id: 'ch06_q06',
    chapterId: 6,
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
