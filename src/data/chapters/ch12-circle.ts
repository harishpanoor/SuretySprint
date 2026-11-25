import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateCircleQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  // Standard right triangle relation in circle: r^2 = d^2 + (c/2)^2
  // Triplets for (d, c/2, r): (3, 4, 5), (6, 8, 10), (5, 12, 13), (8, 15, 17), (9, 12, 15), (12, 16, 20)
  const circleTriplets = [
    { d: 3, halfC: 4, c: 8, r: 5 },
    { d: 6, halfC: 8, c: 16, r: 10 },
    { d: 8, halfC: 6, c: 12, r: 10 },
    { d: 5, halfC: 12, c: 24, r: 13 },
    { d: 12, halfC: 5, c: 10, r: 13 },
    { d: 8, halfC: 15, c: 30, r: 17 },
    { d: 15, halfC: 8, c: 16, r: 17 },
    { d: 9, halfC: 12, c: 24, r: 15 },
  ];
  const item = rng.choice(circleTriplets);

  if (type === 1) {
    // Find chord length or radius
    const findChord = rng.choice([true, false]);
    if (findChord) {
      const prompt = `A chord of a circle is at a distance of $${item.d}\\text{ cm}$ from the centre. If the radius of the circle is $${item.r}\\text{ cm}$, calculate the length of the chord (in cm).`;
      return {
        id: `gen_ch12_${rng.int(10000, 99999)}`,
        chapterId: 12,
        unitId: 4,
        title: 'Finding Chord Length from Radius and Distance',
        type: 'numerical',
        difficulty: 'Easy',
        marks: 2,
        prompt,
        expectedAnswer: `${item.c}`,
        diagramSvgId: 'CircleDiagram',
        diagramData: {
          radiusLabel: `r = ${item.r}`,
          distLabel: `d = ${item.d}`,
          chordLabel: 'AB = ?',
        },
        hintLadder: {
          hint1Concept: 'The perpendicular from the centre of a circle to a chord bisects the chord.',
          hint2Formula: 'In right triangle $OMA$: $r^2 = d^2 + AM^2 \\implies AM = \\sqrt{r^2 - d^2}$.',
          hint3Step: `$AM = \\sqrt{${item.r}^2 - ${item.d}^2} = \\sqrt{${item.r * item.r} - ${item.d * item.d}} = ${item.halfC}\\text{ cm}$. Full chord $AB = 2 \\times AM = ${item.c}\\text{ cm}$.`,
        },
        solution: {
          steps: [
            { step: 'Let perpendicular from centre $O$ to chord $AB$ be $OM = ' + item.d + '\\text{ cm}$. $OM$ bisects $AB$ so $AB = 2 AM$.', markTag: '[0.5m]' },
            { step: `In right $\\triangle OMA$: $AM = \\sqrt{OA^2 - OM^2} = \\sqrt{${item.r}^2 - ${item.d}^2} = \\sqrt{${item.halfC*item.halfC}} = ${item.halfC}\\text{ cm}$.`, markTag: '[1m]' },
            { step: `Length of chord $AB = 2 \\times ${item.halfC} = ${item.c}\\text{ cm}$.`, markTag: '[0.5m]' },
          ],
          finalAnswer: `${item.c} cm`,
          commonMistake: 'Forgetting to double $AM$ to get the full chord length.',
        },
        isGenerated: true,
        generatorId: 'ch12',
        generatorSeed: seed,
      };
    } else {
      const prompt = `A chord of length $${item.c}\\text{ cm}$ is drawn in a circle at a perpendicular distance of $${item.d}\\text{ cm}$ from the centre. Find the **radius of the circle** (in cm).`;
      return {
        id: `gen_ch12_${rng.int(10000, 99999)}`,
        chapterId: 12,
        unitId: 4,
        title: 'Finding Circle Radius from Chord and Distance',
        type: 'numerical',
        difficulty: 'Easy',
        marks: 2,
        prompt,
        expectedAnswer: `${item.r}`,
        diagramSvgId: 'CircleDiagram',
        diagramData: {
          radiusLabel: 'r = ?',
          distLabel: `d = ${item.d}`,
          chordLabel: `${item.c} cm`,
        },
        hintLadder: {
          hint1Concept: 'Perpendicular from centre bisects chord.',
          hint2Formula: 'Half-chord $AM = ' + item.c + ' / 2 = ' + item.halfC + '\\text{ cm}$.',
          hint3Step: '$r = \\sqrt{d^2 + AM^2} = \\sqrt{' + item.d + '^2 + ' + item.halfC + '^2} = \\sqrt{' + (item.d*item.d + item.halfC*item.halfC) + '} = ' + item.r + '\\text{ cm}$.',
        },
        solution: {
          steps: [
            { step: 'Perpendicular from centre bisects chord: $AM = \\frac{' + item.c + '}{2} = ' + item.halfC + '\\text{ cm}$.', markTag: '[1m]' },
            { step: `By Pythagoras Theorem in $\\triangle OMA$: $r = \\sqrt{${item.d}^2 + ${item.halfC}^2} = \\sqrt{${item.r*item.r}} = ${item.r}\\text{ cm}$.`, markTag: '[1m]' },
          ],
          finalAnswer: `${item.r} cm`,
          commonMistake: 'Using the full chord length in the Pythagorean formula instead of half-chord.',
        },
        isGenerated: true,
        generatorId: 'ch12',
        generatorSeed: seed,
      };
    }
  } else {
    // Parallel chords problem:
    // Radius = 10, chords 12 and 16
    // d1 = 8, d2 = 6
    // If opposite sides: distance = d1 + d2 = 14
    // If same side: distance = d1 - d2 = 2
    const isOpposite = rng.choice([true, false]);
    const r = 10;
    const c1 = 16;
    const c2 = 12;
    const distAns = isOpposite ? 14 : 2;

    const prompt = `Two parallel chords of lengths $${c1}\\text{ cm}$ and $${c2}\\text{ cm}$ are drawn in a circle of radius $${r}\\text{ cm}$. Calculate the distance between the two chords (in cm) if they lie on the **${isOpposite ? 'opposite sides' : 'same side'}** of the centre.`;

    return {
      id: `gen_ch12_${rng.int(10000, 99999)}`,
      chapterId: 12,
      unitId: 4,
      title: 'Distance Between Parallel Chords in a Circle',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `${distAns}`,
      diagramSvgId: 'CircleDiagram',
      diagramData: {
        isTwoParallelChords: true,
        radiusLabel: 'r = 10',
      },
      hintLadder: {
        hint1Concept: 'Find the distance of each chord from the centre using Pythagoras theorem separately.',
        hint2Formula: '$d_1 = \\sqrt{10^2 - 8^2} = 6\\text{ cm}$ and $d_2 = \\sqrt{10^2 - 6^2} = 8\\text{ cm}$.',
        hint3Step: isOpposite
          ? 'Since chords lie on opposite sides of the centre, total distance $= d_1 + d_2 = 6 + 8 = 14\\text{ cm}$.'
          : 'Since chords lie on the same side of the centre, distance between them $= d_2 - d_1 = 8 - 6 = 2\\text{ cm}$.',
      },
      solution: {
        steps: [
          { step: 'For chord of $16\\text{ cm}$: half-length $= 8\\text{ cm}$. Distance $d_1 = \\sqrt{10^2 - 8^2} = \\sqrt{36} = 6\\text{ cm}$.', markTag: '[1m]' },
          { step: 'For chord of $12\\text{ cm}$: half-length $= 6\\text{ cm}$. Distance $d_2 = \\sqrt{10^2 - 6^2} = \\sqrt{64} = 8\\text{ cm}$.', markTag: '[1m]' },
          { step: isOpposite
            ? `Chords on opposite sides: $\\text{Distance} = d_1 + d_2 = 6 + 8 = 14\\text{ cm}$.`
            : `Chords on same side: $\\text{Distance} = |d_2 - d_1| = 8 - 6 = 2\\text{ cm}$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${distAns} cm`,
        commonMistake: isOpposite
          ? 'Subtracting the distances instead of adding when chords are on opposite sides.'
          : 'Adding the distances when chords are on the same side.',
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
    title: 'Equal Chords Distance from Centre',
    prompt: 'Two chords $AB$ and $CD$ of a circle with centre $O$ are each $10\\text{ cm}$ in length. Which statement is correct?',
    mcqOptions: [
      { id: 'A', text: 'They are equidistant from the centre $O$.', explanation: 'Correct: Equal chords of a circle are equidistant from the centre.' },
      { id: 'B', text: 'They must be parallel to each other.', explanation: 'Incorrect: equal chords can lie at any angle.' },
      { id: 'C', text: 'They must intersect at right angles.', explanation: 'Incorrect.' },
      { id: 'D', text: 'Their distance from the centre is equal to radius.', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Fundamental theorem on equal chords in a circle.',
      hint2Formula: 'If chord $AB = CD$, then perpendicular distance $OM = ON$.',
      hint3Step: 'Equal chords are equidistant from the centre.',
    },
    solution: {
      steps: [
        { step: 'Theorem: Equal chords of a circle (or of congruent circles) are equidistant from the centre.', markTag: '[0.5m]' },
        { step: 'Since $AB = CD = 10\\text{ cm}$, their perpendicular distances from $O$ are equal.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: They are equidistant from the centre O',
      commonMistake: 'Assuming equal chords must be parallel.',
    },
  },
  {
    id: 'ch12_q02',
    chapterId: 12,
    unitId: 4,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Perpendicular from Centre to Chord',
    prompt: '**Assertion (A)**: The perpendicular drawn from the centre of a circle to a chord bisects the chord.\n\n**Reason (R)**: The radii drawn to the endpoints of the chord form an isosceles triangle with the chord, in which the altitude to the base bisects the base.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Join $OA$ and $OB$. Both are radii ($OA = OB = r$).',
      hint2Formula: '$\\triangle OAB$ is isosceles with $OA = OB$.',
      hint3Step: 'In an isosceles triangle, the altitude $OM \\perp AB$ bisects the base: $AM = MB$.',
    },
    solution: {
      steps: [
        { step: 'In $\\triangle OAB$, $OA = OB = r$ (radii). Thus $\\triangle OAB$ is isosceles. Altitude $OM$ bisects $AB$ by RHS congruence.', markTag: '[0.5m]' },
        { step: 'Assertion is True and Reason correctly explains the geometric proof.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Thinking the theorem requires coordinate geometry instead of simple triangle congruency.',
    },
  },
  {
    id: 'ch12_q03',
    chapterId: 12,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Concentric Circles Chord Calculation',
    prompt: 'Two concentric circles have radii $13\\text{ cm}$ and $5\\text{ cm}$. A chord of the larger circle touches the smaller circle (or is tangent to it). Find the length of this chord (in cm).',
    expectedAnswer: '24',
    hintLadder: {
      hint1Concept: 'Radius of smaller circle is perpendicular to the tangent chord at the point of contact.',
      hint2Formula: 'In right triangle, $R = 13$, $r = 5$. Half-chord $AM = \\sqrt{R^2 - r^2}$.',
      hint3Step: '$AM = \\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12\\text{ cm}$. Full chord $= 2 \\times 12 = 24\\text{ cm}$.',
    },
    solution: {
      steps: [
        { step: 'Let $O$ be common centre. Chord $AB$ of outer circle touches inner circle at $M$. $OM \\perp AB$ and $OM = 5\\text{ cm}$.', markTag: '[1m]' },
        { step: 'In right $\\triangle OMA$: $AM = \\sqrt{OA^2 - OM^2} = \\sqrt{13^2 - 5^2} = \\sqrt{144} = 12\\text{ cm}$.', markTag: '[1m]' },
        { step: 'Since $OM \\perp AB$ from centre, it bisects $AB$. Length of chord $AB = 2 \\times 12 = 24\\text{ cm}$.', markTag: '[1m]' },
      ],
      finalAnswer: '24 cm',
      commonMistake: 'Giving 12 cm (the half-chord) as the final answer.',
    },
  },
  {
    id: 'ch12_q04',
    chapterId: 12,
    unitId: 4,
    type: 'proof',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Proof: Line Bisecting Chord is Perpendicular',
    prompt: 'Prove that the line joining the centre of a circle to the mid-point of a chord is perpendicular to the chord.',
    diagramSvgId: 'CircleDiagram',
    proofSteps: [
      {
        id: 'step1',
        stepNumber: 1,
        statement: 'In circle with centre $O$, let $M$ be the mid-point of chord $AB$. Join $OA$ and $OB$.',
        reason: 'Construction and hypothesis',
        availableReasonOptions: ['Construction and hypothesis', 'Midpoint theorem', 'Pythagoras theorem', 'Parallel postulate'],
      },
      {
        id: 'step2',
        stepNumber: 2,
        statement: 'In $\\triangle OMA$ and $\\triangle OMB$, side $OA = OB$',
        reason: 'Radii of the same circle',
        availableReasonOptions: ['Radii of the same circle', 'Common side', 'Opposite sides', 'Given'],
      },
      {
        id: 'step3',
        stepNumber: 3,
        statement: '$AM = BM$ and $OM = OM$',
        reason: 'M is mid-point of AB, and OM is common side',
        availableReasonOptions: ['M is mid-point of AB, and OM is common side', 'Radii', 'Parallel lines', 'Angle bisector'],
      },
      {
        id: 'step4',
        stepNumber: 4,
        statement: 'Therefore $\\triangle OMA \\cong \\triangle OMB$ by SSS, so $\\angle OMA = \\angle OMB = 90^\\circ$',
        reason: 'CPCTC and linear pair sum = 180°',
        availableReasonOptions: ['CPCTC and linear pair sum = 180°', 'By SAS', 'By RHS', 'Vertically opposite angles'],
      },
    ],
    proofRubric: [
      'Identified $OA = OB$ as radii [1m]',
      'Identified $AM = BM$ ($M$ is midpoint) and $OM$ common [1m]',
      'Proved $\\triangle OMA \\cong \\triangle OMB$ by SSS [1m]',
      'Concluded $\\angle OMA = 90^\\circ$ since linear pair angles are equal [1m]',
    ],
    hintLadder: {
      hint1Concept: 'Show that $\\triangle OMA \\cong \\triangle OMB$ using SSS.',
      hint2Formula: '$OA = OB$ (radii), $AM = BM$ ($M$ is midpoint), $OM = OM$ (common).',
      hint3Step: 'Since $\\angle OMA = \\angle OMB$ and $\\angle OMA + \\angle OMB = 180^\\circ$, each must be $90^\\circ$.',
    },
    solution: {
      steps: [
        { step: 'In $\\triangle OMA$ and $\\triangle OMB$: $OA = OB$ (radii of circle).', markTag: '[1m]' },
        { step: '$AM = BM$ ($M$ is given as mid-point of $AB$), and $OM = OM$ (common).', markTag: '[1m]' },
        { step: '$\\triangle OMA \\cong \\triangle OMB$ by SSS Congruency Criterion.', markTag: '[1m]' },
        { step: 'By CPCTC, $\\angle OMA = \\angle OMB$. Since $AMB$ is a line, $\\angle OMA + \\angle OMB = 180^\\circ \\implies \\angle OMA = 90^\\circ$. Hence $OM \\perp AB$.', markTag: '[1m]' },
      ],
      finalAnswer: 'Proven: OM ⊥ AB',
      commonMistake: 'Assuming $\\angle OMA = 90^\\circ$ at the start instead of proving it.',
    },
  },
  {
    id: 'ch12_q05',
    chapterId: 12,
    unitId: 4,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Parallel Chords on Same Side',
    prompt: 'In a circle of radius $5\\text{ cm}$, two parallel chords $AB$ and $CD$ have lengths $8\\text{ cm}$ and $6\\text{ cm}$ respectively, lying on the same side of the centre $O$.\n\n**(i)** Find the distance of chord $AB$ from centre $O$ (in cm).\n**(ii)** Find the distance between the two parallel chords (in cm).',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Distance of chord AB from centre (cm):',
        expectedAnswer: '3',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Distance between chords AB and CD (cm):',
        expectedAnswer: '1',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Find the distance of each chord from centre $O$ using Pythagoras.',
      hint2Formula: '$d_1 = \\sqrt{5^2 - 4^2} = 3\\text{ cm}$ and $d_2 = \\sqrt{5^2 - 3^2} = 4\\text{ cm}$.',
      hint3Step: 'Since they are on the same side, distance $= 4 - 3 = 1\\text{ cm}$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): For chord $AB = 8\\text{ cm}$, half-chord $= 4\\text{ cm}$. Distance $d_1 = \\sqrt{5^2 - 4^2} = \\sqrt{9} = 3\\text{ cm}$.', markTag: '[2m]' },
        { step: 'Part (ii): For chord $CD = 6\\text{ cm}$, half-chord $= 3\\text{ cm}$. Distance $d_2 = \\sqrt{5^2 - 3^2} = \\sqrt{16} = 4\\text{ cm}$.', markTag: '[1m]' },
        { step: 'Distance between parallel chords on same side $= d_2 - d_1 = 4 - 3 = 1\\text{ cm}$.', markTag: '[1m]' },
      ],
      finalAnswer: '(i) 3 cm, (ii) 1 cm',
      commonMistake: 'Adding $3 + 4 = 7\\text{ cm}$ instead of subtracting for same-side chords.',
    },
  },
  {
    id: 'ch12_q06',
    chapterId: 12,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Intersecting Chords at Right Angles',
    prompt: 'Two chords $AB$ and $CD$ of length $8\\text{ cm}$ each intersect inside a circle at right angles. If the radius of the circle is $5\\text{ cm}$, find the distance of their point of intersection from the centre of the circle (in cm).',
    expectedAnswer: '4.24',
    tolerance: 0.05,
    acceptableAnswers: ['3*sqrt(2)', '3\\sqrt{2}', '4.24', '4.242', 'sqrt(18)'],
    hintLadder: {
      hint1Concept: 'Distance of each chord from centre $O$ is $d = \\sqrt{5^2 - 4^2} = 3\\text{ cm}$.',
      hint2Formula: 'The perpendiculars from $O$ to chords $AB$ and $CD$ form a square of side $3\\text{ cm}$ with the intersection point $P$.',
      hint3Step: 'Distance $OP$ is the diagonal of the square: $OP = 3\\sqrt{2} \\approx 4.24\\text{ cm}$.',
    },
    solution: {
      steps: [
        { step: 'Since chords are equal ($8\\text{ cm}$), their distances from centre $O$ are both $d = \\sqrt{5^2 - 4^2} = 3\\text{ cm}$.', markTag: '[1m]' },
        { step: 'Let perpendiculars be $OM \\perp AB$ and $ON \\perp CD$. In quadrilateral $OMPN$, three angles are $90^\\circ$ and adjacent sides $OM = ON = 3\\text{ cm}$, so $OMPN$ is a square of side $3\\text{ cm}$.', markTag: '[1m]' },
        { step: 'Distance $OP = \\text{diagonal of square} = 3\\sqrt{2} \\approx 4.24\\text{ cm}$.', markTag: '[1m]' },
      ],
      finalAnswer: '$3\\sqrt{2} \\approx 4.24\\text{ cm}$',
      commonMistake: 'Assuming the intersection point is at the centre of the circle.',
    },
  },
];
