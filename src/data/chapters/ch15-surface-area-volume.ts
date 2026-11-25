import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateSurfaceAreaVolumeQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 3);

  if (type === 1) {
    // Cuboid TSA and Volume:
    // l, b, h integers
    const l = rng.choice([8, 10, 12, 15]);
    const b = rng.choice([5, 6, 8, 10]);
    const h = rng.choice([4, 5, 6]);

    const vol = l * b * h;
    const tsa = 2 * (l * b + b * h + h * l);
    const lsa = 2 * (l + b) * h;

    const ask = rng.choice(['Volume', 'TSA', 'LSA']);
    let prompt = '';
    let expectedAnswer = '';

    if (ask === 'Volume') {
      prompt = `Find the **Volume** (in $\\text{cm}^3$) of a cuboid measuring $${l}\\text{ cm}$ in length, $${b}\\text{ cm}$ in breadth, and $${h}\\text{ cm}$ in height.`;
      expectedAnswer = `${vol}`;
    } else if (ask === 'TSA') {
      prompt = `Find the **Total Surface Area (TSA)** (in $\\text{cm}^2$) of a cuboid measuring $${l}\\text{ cm} \\times ${b}\\text{ cm} \\times ${h}\\text{ cm}$.`;
      expectedAnswer = `${tsa}`;
    } else {
      prompt = `Find the **Lateral Surface Area (Area of 4 walls)** (in $\\text{m}^2$) of a rectangular room measuring length $${l}\\text{ m}$, breadth $${b}\\text{ m}$, and height $${h}\\text{ m}$.`;
      expectedAnswer = `${lsa}`;
    }

    return {
      id: `gen_ch15_${rng.int(10000, 99999)}`,
      chapterId: 15,
      unitId: 6,
      title: `Cuboid ${ask} Calculation`,
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer,
      hintLadder: {
        hint1Concept: `Use the standard cuboid formula for ${ask}.`,
        hint2Formula: ask === 'Volume'
          ? '$V = l \\times b \\times h$.'
          : ask === 'TSA'
          ? '$\\text{TSA} = 2(lb + bh + hl)$.'
          : '$\\text{LSA} = 2(l + b)h$.',
        hint3Step: `Substitute $l = ${l}, b = ${b}, h = ${h}$.`,
      },
      solution: {
        steps: [
          { step: `Dimensions: $l = ${l}, b = ${b}, h = ${h}$.`, markTag: '[0.5m]' },
          { step: ask === 'Volume'
            ? `$V = ${l} \\times ${b} \\times ${h} = ${vol}\\text{ cm}^3$.`
            : ask === 'TSA'
            ? `$\\text{TSA} = 2((${l})(${b}) + (${b})(${h}) + (${h})(${l})) = 2(${l*b} + ${b*h} + ${h*l}) = ${tsa}\\text{ cm}^2$.`
            : `$\\text{LSA} = 2(${l} + ${b})(${h}) = 2(${l+b})(${h}) = ${lsa}\\text{ m}^2$.`, markTag: '[1.5m]' },
        ],
        finalAnswer: expectedAnswer,
        commonMistake: ask === 'LSA'
          ? 'Calculating TSA instead of LSA (area of 4 walls).'
          : 'Mixing up square and cubic units.',
      },
      isGenerated: true,
      generatorId: 'ch15',
      generatorSeed: seed,
    };
  } else if (type === 2) {
    // Diagonal of a cuboid:
    // l^2 + b^2 + h^2 = d^2
    // Triplet: (2, 3, 6) -> d = 7
    // (1, 4, 8) -> d = 9
    // (4, 12, 3) -> d = 13
    // (6, 10, ? )
    const triplets = [
      { l: 6, b: 3, h: 2, d: 7 },
      { l: 12, b: 4, h: 3, d: 13 },
      { l: 8, b: 4, h: 1, d: 9 },
      { l: 9, b: 12, h: 8, d: 17 },
    ];
    const item = rng.choice(triplets);

    const prompt = `Find the length of the **longest pole (diagonal)** (in metres) that can be placed in a room measuring $${item.l}\\text{ m}$ long, $${item.b}\\text{ m}$ broad, and $${item.h}\\text{ m}$ high.`;

    return {
      id: `gen_ch15_${rng.int(10000, 99999)}`,
      chapterId: 15,
      unitId: 6,
      title: 'Longest Rod / Diagonal of a Cuboid',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `${item.d}`,
      hintLadder: {
        hint1Concept: 'The longest pole corresponds to the space diagonal of the cuboid.',
        hint2Formula: '$d = \\sqrt{l^2 + b^2 + h^2}$.',
        hint3Step: `$d = \\sqrt{${item.l}^2 + ${item.b}^2 + ${item.h}^2} = \\sqrt{${item.l*item.l} + ${item.b*item.b} + ${item.h*item.h}} = ${item.d}\\text{ m}$.`,
      },
      solution: {
        steps: [
          { step: `Length of the longest rod $= \\text{Diagonal } d = \\sqrt{l^2 + b^2 + h^2}$.`, markTag: '[1m]' },
          { step: `$d = \\sqrt{${item.l}^2 + ${item.b}^2 + ${item.h}^2} = \\sqrt{${item.l*item.l} + ${item.b*item.b} + ${item.h*item.h}} = \\sqrt{${item.d*item.d}} = ${item.d}\\text{ m}$.`, markTag: '[2m]' },
        ],
        finalAnswer: `${item.d} m`,
        commonMistake: 'Taking the face diagonal $\\sqrt{l^2+b^2}$ instead of the 3D space diagonal.',
      },
      isGenerated: true,
      generatorId: 'ch15',
      generatorSeed: seed,
    };
  } else {
    // Cube volume to surface area:
    // Volume = a^3, TSA = 6a^2
    const a = rng.choice([3, 4, 5, 6, 8, 10]);
    const vol = a * a * a;
    const tsa = 6 * a * a;

    const prompt = `The volume of a solid cube is $${vol}\\text{ cm}^3$. Calculate its **Total Surface Area (TSA)** (in $\\text{cm}^2$).`;

    return {
      id: `gen_ch15_${rng.int(10000, 99999)}`,
      chapterId: 15,
      unitId: 6,
      title: 'Cube Volume to Surface Area Conversion',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${tsa}`,
      hintLadder: {
        hint1Concept: 'Find edge length $a$ of the cube first by taking cube root of volume.',
        hint2Formula: '$a = \\sqrt[3]{V} = \\sqrt[3]{' + vol + '} = ' + a + '\\text{ cm}$.',
        hint3Step: '$\\text{TSA} = 6a^2 = 6 \\times ' + a + '^2 = 6 \\times ' + (a*a) + ' = ' + tsa + '\\text{ cm}^2$.',
      },
      solution: {
        steps: [
          { step: `Volume $V = a^3 = ${vol}\\text{ cm}^3 \\implies a = \\sqrt[3]{${vol}} = ${a}\\text{ cm}$.`, markTag: '[1m]' },
          { step: `Total Surface Area $\\text{TSA} = 6a^2 = 6(${a})^2 = 6 \\times ${a*a} = ${tsa}\\text{ cm}^2$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${tsa} cm²`,
        commonMistake: 'Using $4a^2$ (LSA) instead of $6a^2$ (TSA).',
      },
      isGenerated: true,
      generatorId: 'ch15',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh15: Question[] = [
  {
    id: 'ch15_q01',
    chapterId: 15,
    unitId: 6,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Ratio of Volumes when Edge is Doubled',
    prompt: 'If each edge of a cube is doubled in length, by what factor does its **volume** increase?',
    mcqOptions: [
      { id: 'A', text: '8 times', explanation: 'Correct: $V\' = (2a)^3 = 8a^3 = 8V$.' },
      { id: 'B', text: '4 times', explanation: 'Incorrect: that is the surface area increase ($(2a)^2 = 4a^2$).' },
      { id: 'C', text: '2 times', explanation: 'Incorrect.' },
      { id: 'D', text: '6 times', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Original volume $V = a^3$. New edge is $2a$.',
      hint2Formula: '$V\' = (2a)^3 = 2^3 \\times a^3$.',
      hint3Step: '$2^3 = 8$, so volume becomes 8 times.',
    },
    solution: {
      steps: [
        { step: 'Original volume $V_1 = a^3$. New edge $a\' = 2a$.', markTag: '[0.5m]' },
        { step: 'New volume $V_2 = (2a)^3 = 8a^3 = 8V_1$. Volume increases by a factor of 8.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: 8 times',
      commonMistake: 'Confusing volume factor ($2^3 = 8$) with surface area factor ($2^2 = 4$).',
    },
  },
  {
    id: 'ch15_q02',
    chapterId: 15,
    unitId: 6,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Internal Dimensions of Open Box',
    prompt: '**Assertion (A)**: An open wooden box of external height $H$ and uniform wood thickness $t$ has internal height $h = H - t$, whereas its internal length is $l = L - 2t$.\n\n**Reason (R)**: An open box has a bottom base but no top lid, so thickness is subtracted once from height, but twice from length and breadth.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Consider how thickness affects dimensions in closed vs open boxes.',
      hint2Formula: 'Closed box has two walls on all 3 axes: $L-2t, B-2t, H-2t$.',
      hint3Step: 'Open box has only the bottom floor, so height is reduced by $t$ once.',
    },
    solution: {
      steps: [
        { step: 'Length has two opposite side walls: $l = L - 2t$. Height has only a bottom floor: $h = H - t$. Assertion is True.', markTag: '[0.5m]' },
        { step: 'Reason accurately explains the physical structure of an open box. Reason is True and correctly explains Assertion.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Subtracting $2t$ from height in an open box problem.',
    },
  },
  {
    id: 'ch15_q03',
    chapterId: 15,
    unitId: 6,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Painting 4 Walls and Ceiling Cost',
    prompt: 'A room is $10\\text{ m}$ long, $8\\text{ m}$ broad, and $5\\text{ m}$ high. Find the total area to be painted (in $\\text{m}^2$) including its four walls and the ceiling (floor is not painted).',
    expectedAnswer: '260',
    hintLadder: {
      hint1Concept: 'Total area $= \\text{Area of 4 walls (LSA)} + \\text{Area of ceiling}$.',
      hint2Formula: '$\\text{Area of 4 walls} = 2(l + b)h$. $\\text{Area of ceiling} = l \\times b$.',
      hint3Step: '$2(10 + 8)(5) + 10(8) = 2(18)(5) + 80 = 180 + 80 = 260\\text{ m}^2$.',
    },
    solution: {
      steps: [
        { step: 'Area of 4 walls $= 2(l + b)h = 2(10 + 8) \\times 5 = 2 \\times 18 \\times 5 = 180\\text{ m}^2$.', markTag: '[1m]' },
        { step: 'Area of ceiling $= l \\times b = 10 \\times 8 = 80\\text{ m}^2$.', markTag: '[1m]' },
        { step: 'Total surface to be painted $= 180 + 80 = 260\\text{ m}^2$.', markTag: '[1m]' },
      ],
      finalAnswer: '260 m²',
      commonMistake: 'Calculating Total Surface Area $2(lb + bh + hl) = 340$, which incorrectly includes the floor.',
    },
  },
  {
    id: 'ch15_q04',
    chapterId: 15,
    unitId: 6,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Melting and Recasting Cubes',
    prompt: 'Three metal cubes of edges $3\\text{ cm}, 4\\text{ cm}$, and $5\\text{ cm}$ are melted together to form a single new solid cube. Find the **edge length of the new cube** (in cm).',
    expectedAnswer: '6',
    hintLadder: {
      hint1Concept: 'Total volume is conserved during melting.',
      hint2Formula: '$V_{\\text{new}} = 3^3 + 4^3 + 5^3$.',
      hint3Step: '$27 + 64 + 125 = 216\\text{ cm}^3$. Edge $a = \\sqrt[3]{216} = 6\\text{ cm}$.',
    },
    solution: {
      steps: [
        { step: 'Sum of volumes of three cubes $= 3^3 + 4^3 + 5^3 = 27 + 64 + 125 = 216\\text{ cm}^3$.', markTag: '[1.5m]' },
        { step: 'Let edge of new cube be $A$. $A^3 = 216 \\implies A = \\sqrt[3]{216} = 6\\text{ cm}$.', markTag: '[1.5m]' },
      ],
      finalAnswer: '6 cm',
      commonMistake: 'Adding the side lengths directly: $3 + 4 + 5 = 12$.',
    },
  },
  {
    id: 'ch15_q05',
    chapterId: 15,
    unitId: 6,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Wooden Box with Thickness',
    prompt: 'A closed wooden box has external dimensions $22\\text{ cm} \\times 17\\text{ cm} \\times 12\\text{ cm}$. The thickness of the wood is $1\\text{ cm}$ throughout.\n\n**(i)** Find the internal volume (capacity) of the box (in $\\text{cm}^3$).\n**(ii)** Find the volume of wood used to make the box (in $\\text{cm}^3$).',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Internal volume of box (cm³):',
        expectedAnswer: '3000',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Volume of wood (cm³):',
        expectedAnswer: '1488',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Since the box is closed, subtract $2 \\times 1 = 2\\text{ cm}$ from each external dimension.',
      hint2Formula: 'Internal: $l = 22 - 2 = 20, b = 17 - 2 = 15, h = 12 - 2 = 10$.',
      hint3Step: '(i) $V_{\\text{internal}} = 20 \\times 15 \\times 10 = 3000\\text{ cm}^3$. (ii) $V_{\\text{wood}} = (22 \\times 17 \\times 12) - 3000 = 4488 - 3000 = 1488\\text{ cm}^3$.',
    },
    solution: {
      steps: [
        { step: 'External volume $V_{\\text{ext}} = 22 \\times 17 \\times 12 = 4488\\text{ cm}^3$.', markTag: '[1m]' },
        { step: 'Part (i): Internal dimensions: $l = 22 - 2(1) = 20, b = 17 - 2(1) = 15, h = 12 - 2(1) = 10\\text{ cm}$. Internal volume $= 20 \\times 15 \\times 10 = 3000\\text{ cm}^3$.', markTag: '[1.5m]' },
        { step: 'Part (ii): Volume of wood $= V_{\\text{ext}} - V_{\\text{int}} = 4488 - 3000 = 1488\\text{ cm}^3$.', markTag: '[1.5m]' },
      ],
      finalAnswer: '(i) 3000 cm³, (ii) 1488 cm³',
      commonMistake: 'Subtracting 1 cm instead of 2 cm from each dimension for a closed box.',
    },
  },
  {
    id: 'ch15_q06',
    chapterId: 15,
    unitId: 6,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Rainfall Volume into Tank',
    prompt: 'A rainfall of $5\\text{ cm}$ falls on a flat roof of dimensions $20\\text{ m} \\times 10\\text{ m}$. If all this water drains into a cylindrical tank of base area $10\\text{ m}^2$, find the rise in water level in the tank (in metres).',
    expectedAnswer: '1',
    hintLadder: {
      hint1Concept: 'Volume of rainfall on roof $=$ Volume of water in cylindrical tank.',
      hint2Formula: 'Roof Area $= 20 \\times 10 = 200\\text{ m}^2$. Rainfall height $= 5\\text{ cm} = 0.05\\text{ m}$.',
      hint3Step: 'Total water volume $= 200 \\times 0.05 = 10\\text{ m}^3$. Tank rise $h = \\frac{\\text{Volume}}{\\text{Base area}} = \\frac{10}{10} = 1\\text{ m}$.',
    },
    solution: {
      steps: [
        { step: 'Roof area $= 20 \\times 10 = 200\\text{ m}^2$. Rainfall depth $= 5\\text{ cm} = 0.05\\text{ m}$.', markTag: '[1m]' },
        { step: 'Volume of water collected $= 200 \\times 0.05 = 10\\text{ m}^3$.', markTag: '[1m]' },
        { step: 'Tank volume $= \\text{Base area} \\times h \\implies 10 = 10 \\times h \\implies h = 1\\text{ m}$.', markTag: '[1m]' },
      ],
      finalAnswer: '1 m',
      commonMistake: 'Forgetting to convert 5 cm to 0.05 m.',
    },
  },
];
