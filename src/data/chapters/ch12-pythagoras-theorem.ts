import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generatePythagorasQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  const triplets = [
    { a: 3, b: 4, c: 5 },
    { a: 6, b: 8, c: 10 },
    { a: 5, b: 12, c: 13 },
    { a: 8, b: 15, c: 17 },
    { a: 7, b: 24, c: 25 },
    { a: 9, b: 12, c: 15 },
    { a: 12, b: 16, c: 20 },
    { a: 15, b: 20, c: 25 },
  ];
  const t = rng.choice(triplets);

  if (type === 1) {
    const findHyp = rng.choice([true, false]);
    if (findHyp) {
      const prompt = `In a right-angled $\\triangle ABC$, $\\angle B = 90^\\circ$. If $AB = ${t.a}\\text{ cm}$ and $BC = ${t.b}\\text{ cm}$, find the length of the hypotenuse $AC$ (in cm).`;
      return {
        id: `gen_ch12_${rng.int(10000, 99999)}`,
        chapterId: 12,
        unitId: 4,
        title: 'Finding Hypotenuse in Right Triangle',
        type: 'numerical',
        difficulty: 'Easy',
        marks: 2,
        prompt,
        expectedAnswer: `${t.c}`,
        acceptableAnswers: [`${t.c}`, `${t.c} cm`],
        diagramSvgId: 'RightTriangleDiagram',
        diagramData: {
          vertexA: 'A',
          vertexB: 'B',
          vertexC: 'C',
          baseLabel: `${t.b} cm`,
          altitudeLabel: `${t.a} cm`,
          hypotenuseLabel: 'AC = ?',
        },
        hintLadder: {
          hint1Concept: 'Apply Pythagoras Theorem in $\\triangle ABC$.',
          hint2Formula: '$AC^2 = AB^2 + BC^2$.',
          hint3Step: `$AC^2 = ${t.a}^2 + ${t.b}^2 = ${t.a * t.a} + ${t.b * t.b} = ${t.c * t.c} \\implies AC = \\sqrt{${t.c * t.c}}$.`,
        },
        solution: {
          steps: [
            { step: `By Pythagoras Theorem: $AC^2 = AB^2 + BC^2 = ${t.a}^2 + ${t.b}^2 = ${t.a * t.a} + ${t.b * t.b} = ${t.c * t.c}$.`, markTag: '[1m]' },
            { step: `Taking square root: $AC = \\sqrt{${t.c * t.c}} = ${t.c}\\text{ cm}$.`, markTag: '[1m]' },
          ],
          finalAnswer: `${t.c} cm`,
          commonMistake: 'Adding $a + b$ directly instead of squaring first.',
        },
        isGenerated: true,
        generatorId: 'ch12',
        generatorSeed: seed,
      };
    } else {
      const prompt = `In a right-angled $\\triangle ABC$, $\\angle B = 90^\\circ$. If hypotenuse $AC = ${t.c}\\text{ cm}$ and base $BC = ${t.b}\\text{ cm}$, find the length of side $AB$ (in cm).`;
      return {
        id: `gen_ch12_${rng.int(10000, 99999)}`,
        chapterId: 12,
        unitId: 4,
        title: 'Finding Perpendicular in Right Triangle',
        type: 'numerical',
        difficulty: 'Easy',
        marks: 2,
        prompt,
        expectedAnswer: `${t.a}`,
        acceptableAnswers: [`${t.a}`, `${t.a} cm`],
        diagramSvgId: 'RightTriangleDiagram',
        diagramData: {
          vertexA: 'A',
          vertexB: 'B',
          vertexC: 'C',
          baseLabel: `${t.b} cm`,
          altitudeLabel: 'AB = ?',
          hypotenuseLabel: `${t.c} cm`,
        },
        hintLadder: {
          hint1Concept: 'Rearrange Pythagoras theorem to solve for a leg.',
          hint2Formula: '$AB^2 = AC^2 - BC^2$.',
          hint3Step: `$AB^2 = ${t.c}^2 - ${t.b}^2 = ${t.c * t.c} - ${t.b * t.b} = ${t.a * t.a} \\implies AB = \\sqrt{${t.a * t.a}}$.`,
        },
        solution: {
          steps: [
            { step: `In right $\\triangle ABC$, $AB^2 = AC^2 - BC^2 = ${t.c}^2 - ${t.b}^2 = ${t.c * t.c} - ${t.b * t.b} = ${t.a * t.a}$.`, markTag: '[1m]' },
            { step: `$AB = \\sqrt{${t.a * t.a}} = ${t.a}\\text{ cm}$.`, markTag: '[1m]' },
          ],
          finalAnswer: `${t.a} cm`,
          commonMistake: 'Adding $c^2 + b^2$ instead of subtracting $c^2 - b^2$.',
        },
        isGenerated: true,
        generatorId: 'ch12',
        generatorSeed: seed,
      };
    }
  } else {
    // Ladder problem: ladder length L = t.c, foot at distance d = t.b, height h = t.a
    const prompt = `A ladder of length $${t.c}\\text{ m}$ is placed against a vertical wall so that its foot is $${t.b}\\text{ m}$ away from the wall on level ground. How high up the wall does the ladder reach (in metres)?`;
    return {
      id: `gen_ch12_${rng.int(10000, 99999)}`,
      chapterId: 12,
      unitId: 4,
      title: 'Ladder Against a Wall Word Problem',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `${t.a}`,
      acceptableAnswers: [`${t.a}`, `${t.a} m`],
      hintLadder: {
        hint1Concept: 'The wall, ground, and ladder form a right-angled triangle with the ladder as the hypotenuse.',
        hint2Formula: '$\\text{Height}^2 + \\text{Distance}^2 = \\text{Ladder}^2$.',
        hint3Step: `$h^2 + ${t.b}^2 = ${t.c}^2 \\implies h^2 = ${t.c * t.c} - ${t.b * t.b} = ${t.a * t.a}$.`,
      },
      solution: {
        steps: [
          { step: `Let height reached be $h\\text{ m}$. The ladder acts as hypotenuse $L = ${t.c}\\text{ m}$ and foot distance $d = ${t.b}\\text{ m}$.`, markTag: '[1m]' },
          { step: `By Pythagoras Theorem: $h^2 + ${t.b}^2 = ${t.c}^2 \\implies h^2 = ${t.c * t.c} - ${t.b * t.b} = ${t.a * t.a}$.`, markTag: '[1m]' },
          { step: `$h = \\sqrt{${t.a * t.a}} = ${t.a}\\text{ m}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${t.a} m`,
        commonMistake: 'Treating the ladder length as one of the legs instead of the hypotenuse.',
      },
      isGenerated: true,
      generatorId: 'ch12',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh12: Question[] = [
  {
    id: 'ch12_q01',
    chapterId: 12,
    unitId: 4,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Recognising Pythagorean Triplets',
    prompt: 'Which of the following sets of numbers forms a valid **Pythagorean Triplet**?',
    mcqOptions: [
      { id: 'A', text: '$(7, 24, 25)$', explanation: 'Correct: $7^2 + 24^2 = 49 + 576 = 625 = 25^2$.' },
      { id: 'B', text: '$(5, 10, 12)$', explanation: 'Incorrect: $25 + 100 = 125 \\neq 144$.' },
      { id: 'C', text: '$(6, 9, 11)$', explanation: 'Incorrect: $36 + 81 = 117 \\neq 121$.' },
      { id: 'D', text: '$(8, 12, 15)$', explanation: 'Incorrect: $64 + 144 = 208 \\neq 225$.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Check whether $a^2 + b^2 = c^2$ for the two smaller numbers and the largest number.',
      hint2Formula: '$7^2 = 49, 24^2 = 576, 25^2 = 625$.',
      hint3Step: '$49 + 576 = 625$, which satisfies $a^2 + b^2 = c^2$.',
    },
    solution: {
      steps: [
        { step: 'Check $(7, 24, 25)$: $7^2 + 24^2 = 49 + 576 = 625$.', markTag: '[0.5m]' },
        { step: 'Since $25^2 = 625$, $7^2 + 24^2 = 25^2$ holds. Thus $(7, 24, 25)$ is a Pythagorean triplet.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: (7, 24, 25)',
      commonMistake: 'Assuming consecutive integers like $(5, 6, 7)$ form a triplet (only $(3, 4, 5)$ are consecutive).',
    },
  },
  {
    id: 'ch12_q02',
    chapterId: 12,
    unitId: 4,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Converse of Pythagoras Theorem',
    prompt: '**Assertion (A)**: If a triangle has sides of lengths $9\\text{ cm}, 40\\text{ cm}$, and $41\\text{ cm}$, the angle opposite the $41\\text{ cm}$ side is strictly $90^\\circ$.\n\n**Reason (R)**: By the Converse of Pythagoras Theorem, if the square of the longest side of a triangle is equal to the sum of the squares of the other two sides, the angle opposite the longest side is a right angle.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Evaluate $9^2 + 40^2$ and compare with $41^2$.',
      hint2Formula: '$9^2 + 40^2 = 81 + 1600 = 1681$. $41^2 = 1681$.',
      hint3Step: 'Since $9^2 + 40^2 = 41^2$, the converse of Pythagoras proves the triangle is right-angled at the vertex opposite $41\\text{ cm}$.',
    },
    solution: {
      steps: [
        { step: '$9^2 + 40^2 = 81 + 1600 = 1681$ and $41^2 = 1681$. So $a^2 + b^2 = c^2$ holds.', markTag: '[0.5m]' },
        { step: 'By the converse of Pythagoras Theorem, the triangle is right-angled opposite the largest side. Both A and R are True and R correctly explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Confusing Pythagoras Theorem (given right triangle, prove $a^2+b^2=c^2$) with its Converse (given $a^2+b^2=c^2$, prove right triangle).',
    },
  },
  {
    id: 'ch12_q03',
    chapterId: 12,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Easy',
    marks: 2,
    title: 'Diagonal of a Rectangle',
    prompt: 'The length and breadth of a rectangle are $12\\text{ cm}$ and $5\\text{ cm}$ respectively. Calculate the length of its diagonal (in cm).',
    expectedAnswer: '13',
    hintLadder: {
      hint1Concept: 'The diagonal divides the rectangle into two congruent right-angled triangles.',
      hint2Formula: '$d = \\sqrt{l^2 + b^2}$.',
      hint3Step: '$d = \\sqrt{12^2 + 5^2} = \\sqrt{144 + 25} = \\sqrt{169} = 13\\text{ cm}$.',
    },
    solution: {
      steps: [
        { step: 'In rectangle $ABCD$, adjacent sides are at $90^\\circ$. Diagonal $d = \\sqrt{l^2 + b^2}$.', markTag: '[1m]' },
        { step: '$d = \\sqrt{12^2 + 5^2} = \\sqrt{144 + 25} = \\sqrt{169} = 13\\text{ cm}$.', markTag: '[1m]' },
      ],
      finalAnswer: '13 cm',
      commonMistake: 'Calculating perimeter $2(12+5) = 34$ instead of diagonal.',
    },
  },
  {
    id: 'ch12_q04',
    chapterId: 12,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Two Right Triangles with Common Altitude',
    prompt: 'In $\\triangle ABC$, altitude $AD \\perp BC$. If $AB = 25\\text{ cm}, AC = 17\\text{ cm}$, and $AD = 15\\text{ cm}$, find the length of the base $BC$ (in cm) given that $D$ lies between $B$ and $C$.',
    expectedAnswer: '28',
    hintLadder: {
      hint1Concept: 'Altitude $AD$ splits $\\triangle ABC$ into two right triangles $\\triangle ABD$ and $\\triangle ACD$.',
      hint2Formula: '$BD = \\sqrt{AB^2 - AD^2}$ and $CD = \\sqrt{AC^2 - AD^2}$.',
      hint3Step: '$BD = \\sqrt{25^2 - 15^2} = \\sqrt{400} = 20\\text{ cm}$. $CD = \\sqrt{17^2 - 15^2} = \\sqrt{64} = 8\\text{ cm}$. Then $BC = 20 + 8 = 28\\text{ cm}$.',
    },
    solution: {
      steps: [
        { step: 'In right $\\triangle ABD$: $BD = \\sqrt{AB^2 - AD^2} = \\sqrt{25^2 - 15^2} = \\sqrt{625 - 225} = \\sqrt{400} = 20\\text{ cm}$.', markTag: '[1m]' },
        { step: 'In right $\\triangle ACD$: $CD = \\sqrt{AC^2 - AD^2} = \\sqrt{17^2 - 15^2} = \\sqrt{289 - 225} = \\sqrt{64} = 8\\text{ cm}$.', markTag: '[1m]' },
        { step: 'Total base $BC = BD + CD = 20 + 8 = 28\\text{ cm}$.', markTag: '[1m]' },
      ],
      finalAnswer: '28 cm',
      commonMistake: 'Subtracting $20 - 8 = 12$ instead of adding when $D$ lies between $B$ and $C$.',
    },
  },
  {
    id: 'ch12_q05',
    chapterId: 12,
    unitId: 4,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Rhombus Diagonals and Perimeter',
    prompt: 'The diagonals of a rhombus are $16\\text{ cm}$ and $12\\text{ cm}$ long.\n\n**(i)** Find the length of each side of the rhombus (in cm).\n**(ii)** Find the perimeter of the rhombus (in cm).',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Side of the rhombus (cm):',
        expectedAnswer: '10',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Perimeter of the rhombus (cm):',
        expectedAnswer: '40',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Diagonals of a rhombus bisect each other at right angles ($90^\\circ$).',
      hint2Formula: 'Half-diagonals are $d_1/2 = 8\\text{ cm}$ and $d_2/2 = 6\\text{ cm}$. In the right triangle, $\\text{side}^2 = 8^2 + 6^2$.',
      hint3Step: '$\\text{side} = \\sqrt{64 + 36} = \\sqrt{100} = 10\\text{ cm}$. Perimeter $= 4 \\times 10 = 40\\text{ cm}$.',
    },
    solution: {
      steps: [
        { step: 'Diagonals of a rhombus bisect each other at right angles. Half-diagonals are $OA = \\frac{16}{2} = 8\\text{ cm}$ and $OB = \\frac{12}{2} = 6\\text{ cm}$.', markTag: '[1m]' },
        { step: 'Part (i): In right $\\triangle AOB$: $\\text{Side } AB = \\sqrt{OA^2 + OB^2} = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10\\text{ cm}$.', markTag: '[1m]' },
        { step: 'Part (ii): All four sides of a rhombus are equal. $\\text{Perimeter} = 4 \\times 10 = 40\\text{ cm}$.', markTag: '[2m]' },
      ],
      finalAnswer: '(i) 10 cm, (ii) 40 cm',
      commonMistake: 'Using the full diagonal lengths ($16^2 + 12^2$) in the Pythagorean equation instead of half-lengths.',
    },
  },
  {
    id: 'ch12_q06',
    chapterId: 12,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Exam',
    marks: 3,
    title: 'Broken Tree Word Problem',
    prompt: 'A tree $18\\text{ m}$ high is broken by the wind at a certain height such that its top touches the ground at a distance of $12\\text{ m}$ from its base. At what height from the ground did the tree break (in metres)?',
    expectedAnswer: '5',
    hintLadder: {
      hint1Concept: 'Let the break height be $x$. Then the broken fallen part (hypotenuse) is $18 - x$.',
      hint2Formula: 'In right triangle: $x^2 + 12^2 = (18 - x)^2$.',
      hint3Step: '$x^2 + 144 = 324 - 36x + x^2 \\implies 144 = 324 - 36x \\implies 36x = 180 \\implies x = 5\\text{ m}$.',
    },
    solution: {
      steps: [
        { step: 'Total height $= 18\\text{ m}$. Let height of breaking point be $x\\text{ m}$. The broken fallen part forms hypotenuse $= (18 - x)\\text{ m}$.', markTag: '[1m]' },
        { step: 'By Pythagoras Theorem: $x^2 + 12^2 = (18 - x)^2 \\implies x^2 + 144 = 324 - 36x + x^2$.', markTag: '[1m]' },
        { step: 'Cancelling $x^2$: $36x = 324 - 144 = 180 \\implies x = \\frac{180}{36} = 5\\text{ m}$.', markTag: '[1m]' },
      ],
      finalAnswer: '5 m',
      commonMistake: 'Assuming the hypotenuse is 18 instead of $(18 - x)$.',
    },
  },
];
