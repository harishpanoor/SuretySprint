import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateAreaPerimeterQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 3);

  if (type === 1) {
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
      id: `gen_ch19_${rng.int(10000, 99999)}`,
      chapterId: 19,
      unitId: 6,
      title: 'Heron’s Formula Area Calculation',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `${tri.area}`,
      acceptableAnswers: [`${tri.area}`, `${tri.area} cm^2`, `${tri.area} sq cm`],
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
      generatorId: 'ch19',
      generatorSeed: seed,
    };
  } else if (type === 2) {
    // Area of trapezium: 1/2 * (a + b) * h
    const a = rng.choice([8, 10, 12, 14, 16]);
    const b = a + rng.choice([4, 6, 8, 10]);
    const h = rng.choice([6, 8, 10, 12]);
    const area = 0.5 * (a + b) * h;

    const prompt = `The parallel sides of a trapezium are $${a}\\text{ cm}$ and $${b}\\text{ cm}$, and the perpendicular distance between them is $${h}\\text{ cm}$. Calculate the **area of the trapezium** (in $\\text{cm}^2$).`;

    return {
      id: `gen_ch19_${rng.int(10000, 99999)}`,
      chapterId: 19,
      unitId: 6,
      title: 'Area of Trapezium Calculation',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${area}`,
      acceptableAnswers: [`${area}`, `${area} cm^2`, `${area} sq cm`],
      hintLadder: {
        hint1Concept: 'Apply the formula for area of a trapezium.',
        hint2Formula: '$\\text{Area} = \\frac{1}{2}(a + b) \\times h$.',
        hint3Step: `$\\text{Area} = \\frac{1}{2}(${a} + ${b}) \\times ${h} = \\frac{1}{2}(${a + b}) \\times ${h} = ${area}\\text{ cm}^2$.`,
      },
      solution: {
        steps: [
          { step: `Formula: $\\text{Area} = \\frac{1}{2}(a + b)h$.`, markTag: '[0.5m]' },
          { step: `Substitute: $\\text{Area} = \\frac{1}{2}(${a} + ${b}) \\times ${h} = \\frac{1}{2}(${a + b}) \\times ${h} = ${area}\\text{ cm}^2$.`, markTag: '[1.5m]' },
        ],
        finalAnswer: `${area} cm²`,
        commonMistake: 'Multiplying the parallel sides instead of adding them.',
      },
      isGenerated: true,
      generatorId: 'ch19',
      generatorSeed: seed,
    };
  } else {
    // Area of circular ring: pi * (R^2 - r^2)
    const rPairs = [
      { r: 7, R: 14, diffSq: 147, area: 462 },
      { r: 14, R: 21, diffSq: 245, area: 770 },
      { r: 7, R: 21, diffSq: 392, area: 1232 },
      { r: 21, R: 28, diffSq: 343, area: 1078 },
    ];
    const pair = rng.choice(rPairs);

    const prompt = `A circular lawn of radius $${pair.r}\\text{ m}$ is surrounded by a circular path of width $${pair.R - pair.r}\\text{ m}$. Find the **area of the path** (in $\\text{m}^2$) (take $\\pi = 22/7$).`;

    return {
      id: `gen_ch19_${rng.int(10000, 99999)}`,
      chapterId: 19,
      unitId: 6,
      title: 'Area of Concentric Circular Path (Ring)',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `${pair.area}`,
      acceptableAnswers: [`${pair.area}`, `${pair.area} m^2`, `${pair.area} sq m`],
      hintLadder: {
        hint1Concept: 'Outer radius $R = \\text{inner radius} + \\text{path width} = ' + pair.r + ' + ' + (pair.R - pair.r) + ' = ' + pair.R + '\\text{ m}$.',
        hint2Formula: '$\\text{Area of ring} = \\pi(R^2 - r^2) = \\pi(R - r)(R + r)$.',
        hint3Step: `$\\text{Area} = \\frac{22}{7} \\times (${pair.R - pair.r}) \\times (${pair.R + pair.r}) = ${pair.area}\\text{ m}^2$.`,
      },
      solution: {
        steps: [
          { step: `Inner radius $r = ${pair.r}\\text{ m}$, Outer radius $R = ${pair.r} + ${pair.R - pair.r} = ${pair.R}\\text{ m}$.`, markTag: '[1m]' },
          { step: `Area of path $= \\pi(R^2 - r^2) = \\frac{22}{7} \\times (${pair.R}^2 - ${pair.r}^2) = \\frac{22}{7} \\times (${pair.R - pair.r})(${pair.R + pair.r})$.`, markTag: '[1m]' },
          { step: `$\\text{Area} = \\frac{22}{7} \\times ${pair.R - pair.r} \\times ${pair.R + pair.r} = ${pair.area}\\text{ m}^2$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${pair.area} m²`,
        commonMistake: 'Calculating $\\pi (R - r)^2$ instead of $\\pi(R^2 - r^2)$.',
      },
      isGenerated: true,
      generatorId: 'ch19',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh19: Question[] = [
  {
    id: 'ch19_q01',
    chapterId: 19,
    unitId: 6,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Formula for Area of Equilateral Triangle',
    prompt: 'The area of an equilateral triangle with side length $a$ is given by:',
    mcqOptions: [
      { id: 'A', text: '$\\frac{\\sqrt{3}}{4} a^2$', explanation: 'Correct: Derived from $1/2 \\times a \\times (\\frac{\\sqrt{3}}{2} a) = \\frac{\\sqrt{3}}{4} a^2$.' },
      { id: 'B', text: '$\\frac{\\sqrt{3}}{2} a$', explanation: 'Incorrect: This is the formula for the altitude/height, not the area.' },
      { id: 'C', text: '$\\frac{1}{2} a^2$', explanation: 'Incorrect: This is for an isosceles right triangle.' },
      { id: 'D', text: '$\\sqrt{3} a^2$', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Altitude of equilateral triangle of side $a$ is $h = \\frac{\\sqrt{3}}{2} a$.',
      hint2Formula: '$\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times a \\times \\frac{\\sqrt{3}}{2} a$.',
      hint3Step: '$\\text{Area} = \\frac{\\sqrt{3}}{4} a^2$.',
    },
    solution: {
      steps: [
        { step: 'Altitude $h = \\sqrt{a^2 - (a/2)^2} = \\frac{\\sqrt{3}}{2} a$.', markTag: '[0.5m]' },
        { step: '$\\text{Area} = \\frac{1}{2} \\times a \\times \\frac{\\sqrt{3}}{2} a = \\frac{\\sqrt{3}}{4} a^2$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: (sqrt(3)/4) a^2',
      commonMistake: 'Confusing the area formula with the height formula $\\frac{\\sqrt{3}}{2} a$.',
    },
  },
  {
    id: 'ch19_q02',
    chapterId: 19,
    unitId: 6,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Circular Ring Area',
    prompt: '**Assertion (A)**: The area of a circular ring bounded by radii $R$ and $r$ ($R > r$) is $\\pi(R+r)(R-r)$.\n\n**Reason (R)**: The algebraic identity for the difference of two squares states $R^2 - r^2 = (R+r)(R-r)$, which speeds up arithmetic by avoiding large squarings.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Area of ring is $\\pi R^2 - \\pi r^2 = \\pi(R^2 - r^2)$.',
      hint2Formula: 'Difference of squares: $R^2 - r^2 = (R-r)(R+r)$.',
      hint3Step: 'This reduces computation e.g. $(28-21)(28+21) = 7 \\times 49$.',
    },
    solution: {
      steps: [
        { step: '$\\text{Area} = \\pi R^2 - \\pi r^2 = \\pi(R^2 - r^2) = \\pi(R+r)(R-r)$. Assertion is True.', markTag: '[0.5m]' },
        { step: 'Factorisation $R^2 - r^2 = (R+r)(R-r)$ simplifies multiplication significantly. Reason is True and correctly explains Assertion.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Subtracting radii first and squaring: $\\pi(R - r)^2$.',
    },
  },
  {
    id: 'ch19_q03',
    chapterId: 19,
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
    id: 'ch19_q04',
    chapterId: 19,
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
    id: 'ch19_q05',
    chapterId: 19,
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
    id: 'ch19_q06',
    chapterId: 19,
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
