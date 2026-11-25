import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateAreaPerimeterQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 3);

  if (type === 1) {
    // Heron's formula with integer sides & integer area:
    // Scalene triplets:
    // (13, 14, 15) -> s = 21, Area = sqrt(21 * 8 * 7 * 6) = 84
    // (11, 13, 20) -> s = 22, Area = sqrt(22 * 11 * 9 * 2) = 66
    // (9, 10, 17) -> s = 18, Area = sqrt(18 * 9 * 8 * 1) = 36
    // (7, 15, 20) -> s = 21, Area = sqrt(21 * 14 * 6 * 1) = 42
    // (12, 17, 25) -> s = 27, Area = sqrt(27 * 15 * 10 * 2) = 90
    const triangles = [
      { a: 13, b: 14, c: 15, s: 21, area: 84 },
      { a: 11, b: 13, c: 20, s: 22, area: 66 },
      { a: 9, b: 10, c: 17, s: 18, area: 36 },
      { a: 7, b: 15, c: 20, s: 21, area: 42 },
      { a: 12, b: 17, c: 25, s: 27, area: 90 },
      { a: 26, b: 28, c: 30, s: 42, area: 336 },
    ];
    const tri = rng.choice(triangles);

    const prompt = `Using Heron’s formula, find the **area of a triangle** (in $\\text{cm}^2$) whose sides are $a = ${tri.a}\\text{ cm}, b = ${tri.b}\\text{ cm}$, and $c = ${tri.c}\\text{ cm}$.`;

    return {
      id: `gen_ch14_${rng.int(10000, 99999)}`,
      chapterId: 14,
      unitId: 6,
      title: 'Heron’s Formula Area Calculation',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `${tri.area}`,
      hintLadder: {
        hint1Concept: 'Heron’s Formula: $\\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}$.',
        hint2Formula: `Semi-perimeter $s = \\frac{${tri.a} + ${tri.b} + ${tri.c}}{2} = ${tri.s}\\text{ cm}$.`,
        hint3Step: `$\\text{Area} = \\sqrt{${tri.s}(${tri.s - tri.a})(${tri.s - tri.b})(${tri.s - tri.c})} = \\sqrt{${tri.area * tri.area}} = ${tri.area}\\text{ cm}^2$.`,
      },
      solution: {
        steps: [
          { step: `Semi-perimeter $s = \\frac{a+b+c}{2} = \\frac{${tri.a} + ${tri.b} + ${tri.c}}{2} = ${tri.s}\\text{ cm}$.`, markTag: '[1m]' },
          { step: `Heron’s Formula: $\\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)} = \\sqrt{${tri.s}(${tri.s - tri.a})(${tri.s - tri.b})(${tri.s - tri.c})}$.`, markTag: '[1m]' },
          { step: `$\\text{Area} = \\sqrt{${tri.area * tri.area}} = ${tri.area}\\text{ cm}^2$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${tri.area} cm²`,
        commonMistake: 'Forgetting to take the square root at the final step.',
      },
      isGenerated: true,
      generatorId: 'ch14',
      generatorSeed: seed,
    };
  } else if (type === 2) {
    // Trapezium area:
    // Parallel sides a and b, distance h
    const a = rng.choice([8, 10, 12, 14, 16]);
    const b = rng.choice([18, 20, 22, 24, 26]);
    const h = rng.choice([6, 8, 10, 12]);
    const area = 0.5 * (a + b) * h;

    const prompt = `The parallel sides of a trapezium are $${a}\\text{ cm}$ and $${b}\\text{ cm}$, and the perpendicular distance between them is $${h}\\text{ cm}$. Calculate its **area** (in $\\text{cm}^2$).`;

    return {
      id: `gen_ch14_${rng.int(10000, 99999)}`,
      chapterId: 14,
      unitId: 6,
      title: 'Area of Trapezium Calculation',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${area}`,
      hintLadder: {
        hint1Concept: 'Apply the standard area formula for a trapezium.',
        hint2Formula: '$\\text{Area} = \\frac{1}{2} (a + b) \\times h$.',
        hint3Step: `$\\text{Area} = \\frac{1}{2} (${a} + ${b}) \\times ${h} = \\frac{1}{2} (${a + b}) \\times ${h} = ${area}\\text{ cm}^2$.`,
      },
      solution: {
        steps: [
          { step: `Formula: $\\text{Area} = \\frac{1}{2} (a + b) h$.`, markTag: '[1m]' },
          { step: `Substitute values: $\\text{Area} = \\frac{1}{2} (${a} + ${b}) \\times ${h} = \\frac{${a+b}}{2} \\times ${h} = ${area}\\text{ cm}^2$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${area} cm²`,
        commonMistake: 'Multiplying $a \\times b \\times h$ instead of adding parallel sides.',
      },
      isGenerated: true,
      generatorId: 'ch14',
      generatorSeed: seed,
    };
  } else {
    // Circular ring / path:
    // Outer radius R = 14, inner radius r = 7
    // Area = pi * (R^2 - r^2) = (22/7) * (R - r)(R + r)
    const pairs = [
      { R: 14, r: 7, area: 462 },
      { R: 21, r: 14, area: 770 },
      { R: 28, r: 21, area: 1078 },
      { R: 35, r: 28, area: 1386 },
    ];
    const ring = rng.choice(pairs);

    const prompt = `A circular grass lawn of radius $${ring.r}\\text{ m}$ is surrounded by a circular path of width $${ring.R - ring.r}\\text{ m}$. Calculate the **area of the path** (in $\\text{m}^2$, taking $\\pi = 22/7$).`;

    return {
      id: `gen_ch14_${rng.int(10000, 99999)}`,
      chapterId: 14,
      unitId: 6,
      title: 'Area of Circular Ring Path',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `${ring.area}`,
      hintLadder: {
        hint1Concept: 'Outer radius $R = ' + ring.r + ' + ' + (ring.R - ring.r) + ' = ' + ring.R + '\\text{ m}$. Inner radius $r = ' + ring.r + '\\text{ m}$.',
        hint2Formula: '$\\text{Area of path} = \\pi(R^2 - r^2) = \\pi(R - r)(R + r)$.',
        hint3Step: `$\\text{Area} = \\frac{22}{7} \\times (${ring.R - ring.r}) \\times (${ring.R + ring.r}) = ${ring.area}\\text{ m}^2$.`,
      },
      solution: {
        steps: [
          { step: `Inner radius $r = ${ring.r}\\text{ m}$, Outer radius $R = ${ring.r} + ${ring.R - ring.r} = ${ring.R}\\text{ m}$.`, markTag: '[1m]' },
          { step: `Area of path $= \\pi(R^2 - r^2) = \\frac{22}{7}(${ring.R}^2 - ${ring.r}^2) = \\frac{22}{7}(${ring.R - ring.r})(${ring.R + ring.r})$.`, markTag: '[1m]' },
          { step: `$\\text{Area} = \\frac{22}{7} \\times ${ring.R - ring.r} \\times ${ring.R + ring.r} = ${ring.area}\\text{ m}^2$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${ring.area} m²`,
        commonMistake: 'Using path width directly as the outer radius.',
      },
      isGenerated: true,
      generatorId: 'ch14',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh14: Question[] = [
  {
    id: 'ch14_q01',
    chapterId: 14,
    unitId: 6,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Formula for Area of Equilateral Triangle',
    prompt: 'The area of an equilateral triangle with side length $a$ is given by:',
    mcqOptions: [
      { id: 'A', text: '$\\frac{\\sqrt{3}}{4} a^2$', explanation: 'Correct: derived from base * altitude / 2.' },
      { id: 'B', text: '$\\frac{\\sqrt{3}}{2} a^2$', explanation: 'Incorrect: that would be base * altitude without 1/2.' },
      { id: 'C', text: '$\\frac{\\sqrt{3}}{2} a$', explanation: 'Incorrect: that is the altitude, not area.' },
      { id: 'D', text: '$\\frac{3}{4} a^2$', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Base is $a$, altitude is $\\frac{\\sqrt{3}}{2}a$.',
      hint2Formula: '$\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times a \\times \\frac{\\sqrt{3}}{2}a$.',
      hint3Step: 'Multiplying yields $\\frac{\\sqrt{3}}{4} a^2$.',
    },
    solution: {
      steps: [
        { step: 'Altitude $h = \\frac{\\sqrt{3}}{2}a$.', markTag: '[0.5m]' },
        { step: '$\\text{Area} = \\frac{1}{2} \\times a \\times \\left(\\frac{\\sqrt{3}}{2}a\\right) = \\frac{\\sqrt{3}}{4}a^2$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: (√3/4) a²',
      commonMistake: 'Confusing altitude $\\frac{\\sqrt{3}}{2}a$ with area $\\frac{\\sqrt{3}}{4}a^2$.',
    },
  },
  {
    id: 'ch14_q02',
    chapterId: 14,
    unitId: 6,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Perimeter and Area of Semicircle',
    prompt: '**Assertion (A)**: The perimeter of a closed protractor (semicircle) of radius $r$ is $(\\pi + 2)r$.\n\n**Reason (R)**: A closed semicircle consists of a curved semicircular arc of length $\\pi r$ plus the straight diameter of length $2r$.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Perimeter is the total boundary distance.',
      hint2Formula: 'Curved arc $= \\frac{2\\pi r}{2} = \\pi r$. Boundary also includes the diameter $2r$.',
      hint3Step: 'Total perimeter $= \\pi r + 2r = (\\pi + 2)r$.',
    },
    solution: {
      steps: [
        { step: 'Perimeter includes the curved semicircular arc $\\pi r$ and the baseline diameter $2r$. Total $= \\pi r + 2r = (\\pi + 2)r$. Assertion is True.', markTag: '[0.5m]' },
        { step: 'Reason accurately identifies both boundary components. Reason is True and correctly explains Assertion.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Thinking perimeter of a semicircle is simply $\\pi r$, forgetting to add the diameter.',
    },
  },
  {
    id: 'ch14_q03',
    chapterId: 14,
    unitId: 6,
    type: 'numerical',
    difficulty: 'Easy',
    marks: 2,
    title: 'Perimeter of a Semicircular Protractor',
    prompt: 'Find the perimeter of a semicircular protractor whose diameter is $14\\text{ cm}$ (take $\\pi = 22/7$).',
    expectedAnswer: '36',
    hintLadder: {
      hint1Concept: 'Diameter $d = 14\\text{ cm} \\implies r = 7\\text{ cm}$.',
      hint2Formula: '$\\text{Perimeter} = \\pi r + 2r$.',
      hint3Step: '$\\text{Perimeter} = \\left(\\frac{22}{7} \\times 7\\right) + 14 = 22 + 14 = 36\\text{ cm}$.',
    },
    solution: {
      steps: [
        { step: 'Radius $r = \\frac{14}{2} = 7\\text{ cm}$. Curved boundary $= \\pi r = \\frac{22}{7} \\times 7 = 22\\text{ cm}$.', markTag: '[1m]' },
        { step: 'Total perimeter $= \\text{Curved arc} + \\text{Diameter} = 22 + 14 = 36\\text{ cm}$.', markTag: '[1m]' },
      ],
      finalAnswer: '36 cm',
      commonMistake: 'Calculating only the curved arc (22 cm) and omitting the straight diameter (14 cm).',
    },
  },
  {
    id: 'ch14_q04',
    chapterId: 14,
    unitId: 6,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Area of Rhombus Given One Diagonal and Perimeter',
    prompt: 'The perimeter of a rhombus is $52\\text{ cm}$ and one of its diagonals is $24\\text{ cm}$. Find the **area of the rhombus** (in $\\text{cm}^2$).',
    expectedAnswer: '120',
    hintLadder: {
      hint1Concept: 'Side of rhombus $= 52 / 4 = 13\\text{ cm}$. Diagonals bisect at $90^\\circ$.',
      hint2Formula: 'Half-diagonals satisfy: $(d_1/2)^2 + (d_2/2)^2 = \\text{side}^2$.',
      hint3Step: '$12^2 + (d_2/2)^2 = 13^2 \\implies (d_2/2)^2 = 169 - 144 = 25 \\implies d_2 = 10\\text{ cm}$. Area $= \\frac{1}{2} \\times 24 \\times 10 = 120\\text{ cm}^2$.',
    },
    solution: {
      steps: [
        { step: 'Each side of rhombus $= \\frac{52}{4} = 13\\text{ cm}$. One half-diagonal $= \\frac{24}{2} = 12\\text{ cm}$.', markTag: '[1m]' },
        { step: 'Other half-diagonal $= \\sqrt{13^2 - 12^2} = \\sqrt{25} = 5\\text{ cm}$. Full second diagonal $d_2 = 10\\text{ cm}$.', markTag: '[1m]' },
        { step: '$\\text{Area} = \\frac{1}{2} d_1 d_2 = \\frac{1}{2} \\times 24 \\times 10 = 120\\text{ cm}^2$.', markTag: '[1m]' },
      ],
      finalAnswer: '120 cm²',
      commonMistake: 'Using half-diagonals in the area formula without multiplying by 2 first.',
    },
  },
  {
    id: 'ch14_q05',
    chapterId: 14,
    unitId: 6,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Triangle with Ratio Sides and Heron’s Formula',
    prompt: 'The sides of a triangle are in the ratio $12 : 17 : 25$ and its perimeter is $540\\text{ cm}$.\n\n**(i)** Find the semi-perimeter $s$ of the triangle (in cm).\n**(ii)** Find the area of the triangle (in $\\text{cm}^2$).',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Semi-perimeter s (cm):',
        expectedAnswer: '270',
        marks: 1.5,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Area of triangle (cm²):',
        expectedAnswer: '9000',
        marks: 2.5,
      },
    ],
    hintLadder: {
      hint1Concept: 'Let the sides be $12x, 17x, 25x$.',
      hint2Formula: '$12x + 17x + 25x = 540 \\implies 54x = 540 \\implies x = 10$. Sides are $120, 170, 250\\text{ cm}$.',
      hint3Step: '$s = 270\\text{ cm}$. $\\text{Area} = \\sqrt{270(150)(100)(20)} = \\sqrt{81000000} = 9000\\text{ cm}^2$.',
    },
    solution: {
      steps: [
        { step: 'Sum of ratios $= 12 + 17 + 25 = 54$. Ratio unit $x = \\frac{540}{54} = 10$. Sides are $a = 120, b = 170, c = 250\\text{ cm}$.', markTag: '[1m]' },
        { step: 'Part (i): Semi-perimeter $s = \\frac{540}{2} = 270\\text{ cm}$.', markTag: '[1m]' },
        { step: 'Part (ii): $\\text{Area} = \\sqrt{270(270-120)(270-170)(270-250)} = \\sqrt{270 \\times 150 \\times 100 \\times 20} = \\sqrt{81,000,000} = 9000\\text{ cm}^2$.', markTag: '[2m]' },
      ],
      finalAnswer: '(i) 270 cm, (ii) 9000 cm²',
      commonMistake: 'Making arithmetic errors while factoring under the square root.',
    },
  },
  {
    id: 'ch14_q06',
    chapterId: 14,
    unitId: 6,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Wheel Revolutions and Distance Covered',
    prompt: 'The diameter of a car wheel is $70\\text{ cm}$. How many revolutions will it make to travel a distance of $1.1\\text{ km}$ (take $\\pi = 22/7$)?',
    expectedAnswer: '500',
    hintLadder: {
      hint1Concept: 'Distance covered in 1 revolution equals circumference of the wheel.',
      hint2Formula: 'Circumference $C = \\pi d = \\frac{22}{7} \\times 70 = 220\\text{ cm} = 2.2\\text{ m}$.',
      hint3Step: 'Total distance $= 1.1\\text{ km} = 1100\\text{ m}$. $\\text{Revolutions} = \\frac{1100}{2.2} = 500$.',
    },
    solution: {
      steps: [
        { step: 'Circumference $C = \\pi d = \\frac{22}{7} \\times 70\\text{ cm} = 220\\text{ cm} = 2.2\\text{ m}$.', markTag: '[1m]' },
        { step: 'Total distance $= 1.1\\text{ km} = 1100\\text{ m}$.', markTag: '[1m]' },
        { step: '$\\text{Number of revolutions} = \\frac{\\text{Total distance}}{\\text{Circumference}} = \\frac{1100}{2.2} = 500$.', markTag: '[1m]' },
      ],
      finalAnswer: '500 revolutions',
      commonMistake: 'Forgetting to convert km to cm or m, causing order of magnitude error.',
    },
  },
];
