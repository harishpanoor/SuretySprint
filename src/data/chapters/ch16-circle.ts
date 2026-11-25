import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateCircleQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

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
    const findChord = rng.choice([true, false]);
    if (findChord) {
      const prompt = `A chord of a circle is at a distance of $${item.d}\\text{ cm}$ from the centre. If the radius of the circle is $${item.r}\\text{ cm}$, calculate the length of the chord (in cm).`;
      return {
        id: `gen_ch16_${rng.int(10000, 99999)}`,
        chapterId: 16,
        unitId: 4,
        title: 'Finding Chord Length from Radius and Distance',
        type: 'numerical',
        difficulty: 'Easy',
        marks: 2,
        prompt,
        expectedAnswer: `${item.c}`,
        acceptableAnswers: [`${item.c}`, `${item.c} cm`],
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
            { step: 'In right $\\triangle OMA$, by Pythagoras theorem: $AM = \\sqrt{OA^2 - OM^2} = \\sqrt{' + item.r + '^2 - ' + item.d + '^2} = \\sqrt{' + (item.r * item.r - item.d * item.d) + '} = ' + item.halfC + '\\text{ cm}$.', markTag: '[1m]' },
            { step: 'Chord $AB = 2 \\times AM = 2 \\times ' + item.halfC + ' = ' + item.c + '\\text{ cm}$.', markTag: '[0.5m]' },
          ],
          finalAnswer: `${item.c} cm`,
          commonMistake: 'Forgetting to double the half-chord length to get the full chord.',
        },
        isGenerated: true,
        generatorId: 'ch16',
        generatorSeed: seed,
      };
    } else {
      const prompt = `A chord of length $${item.c}\\text{ cm}$ is drawn in a circle of radius $${item.r}\\text{ cm}$. Calculate its perpendicular distance from the centre (in cm).`;
      return {
        id: `gen_ch16_${rng.int(10000, 99999)}`,
        chapterId: 16,
        unitId: 4,
        title: 'Finding Perpendicular Distance of Chord from Centre',
        type: 'numerical',
        difficulty: 'Easy',
        marks: 2,
        prompt,
        expectedAnswer: `${item.d}`,
        acceptableAnswers: [`${item.d}`, `${item.d} cm`],
        diagramSvgId: 'CircleDiagram',
        diagramData: {
          radiusLabel: `r = ${item.r}`,
          distLabel: 'd = ?',
          chordLabel: `AB = ${item.c}`,
        },
        hintLadder: {
          hint1Concept: 'The perpendicular from the centre bisects the chord.',
          hint2Formula: 'Half-chord $AM = \\frac{' + item.c + '}{2} = ' + item.halfC + '\\text{ cm}$.',
          hint3Step: 'Distance $d = \\sqrt{r^2 - AM^2} = \\sqrt{' + item.r + '^2 - ' + item.halfC + '^2} = ' + item.d + '\\text{ cm}$.',
        },
        solution: {
          steps: [
            { step: 'Perpendicular from centre $O$ bisects chord $AB$: $AM = \\frac{' + item.c + '}{2} = ' + item.halfC + '\\text{ cm}$.', markTag: '[0.5m]' },
            { step: 'In right $\\triangle OMA$: $OM = \\sqrt{OA^2 - AM^2} = \\sqrt{' + item.r + '^2 - ' + item.halfC + '^2} = \\sqrt{' + (item.r * item.r - item.halfC * item.halfC) + '} = ' + item.d + '\\text{ cm}$.', markTag: '[1.5m]' },
          ],
          finalAnswer: `${item.d} cm`,
          commonMistake: 'Using the full chord length in the Pythagorean equation instead of half.',
        },
        isGenerated: true,
        generatorId: 'ch16',
        generatorSeed: seed,
      };
    }
  } else {
    // Parallel chords on opposite sides:
    // Chords of length c1 and c2 in circle of radius r
    const r = 10;
    const c1 = 12; // half = 6 -> d1 = 8
    const c2 = 16; // half = 8 -> d2 = 6
    const totalDist = 8 + 6; // 14 cm

    const prompt = `Two parallel chords $AB$ and $CD$ of lengths $${c1}\\text{ cm}$ and $${c2}\\text{ cm}$ respectively are drawn on **opposite sides** of the centre of a circle of radius $${r}\\text{ cm}$.\nCalculate the **distance between the two parallel chords** (in cm).`;

    return {
      id: `gen_ch16_${rng.int(10000, 99999)}`,
      chapterId: 16,
      unitId: 4,
      title: 'Distance Between Parallel Chords on Opposite Sides',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 3,
      prompt,
      expectedAnswer: `${totalDist}`,
      acceptableAnswers: [`${totalDist}`, `${totalDist} cm`],
      hintLadder: {
        hint1Concept: 'Calculate the perpendicular distance of each chord from the centre separately.',
        hint2Formula: '$d_1 = \\sqrt{10^2 - 6^2} = 8\\text{ cm}$ and $d_2 = \\sqrt{10^2 - 8^2} = 6\\text{ cm}$.',
        hint3Step: 'Since chords are on opposite sides of the centre, the distance between them is $d_1 + d_2 = 8 + 6 = 14\\text{ cm}$.',
      },
      solution: {
        steps: [
          { step: 'For chord $AB = 12\\text{ cm}$: half-chord $= 6\\text{ cm}$. Distance $d_1 = \\sqrt{10^2 - 6^2} = \\sqrt{64} = 8\\text{ cm}$.', markTag: '[1m]' },
          { step: 'For chord $CD = 16\\text{ cm}$: half-chord $= 8\\text{ cm}$. Distance $d_2 = \\sqrt{10^2 - 8^2} = \\sqrt{36} = 6\\text{ cm}$.', markTag: '[1m]' },
          { step: 'Since chords lie on opposite sides of centre $O$, distance between them $= d_1 + d_2 = 8 + 6 = 14\\text{ cm}$.', markTag: '[1m]' },
        ],
        finalAnswer: `${totalDist} cm`,
        commonMistake: 'Subtracting the distances ($8 - 6 = 2\\text{ cm}$) as if the chords were on the same side.',
      },
      isGenerated: true,
      generatorId: 'ch16',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh16: Question[] = [
  {
    id: 'ch16_q01',
    chapterId: 16,
    unitId: 4,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Chord-Centre Theorem Statement',
    prompt: 'The perpendicular drawn from the centre of a circle to a chord:',
    mcqOptions: [
      { id: 'A', text: 'Bisects the chord', explanation: 'Correct: The perpendicular from centre to chord bisects the chord.' },
      { id: 'B', text: 'Is always equal to the radius', explanation: 'Incorrect: Perpendicular is less than or equal to radius.' },
      { id: 'C', text: 'Divides the chord in the ratio 2 : 1', explanation: 'Incorrect: It divides the chord in ratio 1 : 1.' },
      { id: 'D', text: 'Is parallel to the diameter', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Recall the fundamental chord property of circles.',
      hint2Formula: 'If $OM \\perp AB$, then $AM = MB$.',
      hint3Step: 'Thus the perpendicular bisects the chord.',
    },
    solution: {
      steps: [
        { step: 'By the Chord-Centre Theorem, the perpendicular line drawn from the centre of a circle to any chord bisects the chord.', markTag: '[1m]' },
      ],
      finalAnswer: 'A: Bisects the chord',
      commonMistake: 'Thinking it bisects the circle rather than the chord.',
    },
  },
  {
    id: 'ch16_q02',
    chapterId: 16,
    unitId: 4,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Equal Chords and Distance from Centre',
    prompt: '**Assertion (A)**: If two chords of a circle are equal in length, their perpendicular distances from the centre are strictly equal.\n\n**Reason (R)**: In the right triangles formed by the centre, chord midpoints, and endpoints, the hypotenuses are radii of the circle and the bases are equal half-chords, making the triangles congruent by the RHS criterion.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Let chords be $AB = CD$. Then half-chords $AM = CN$.',
      hint2Formula: 'In right triangles $\\triangle OMA$ and $\\triangle ONC$: $OA = OC = r$, $AM = CN$, and angles are $90^\\circ$.',
      hint3Step: 'By RHS, $\\triangle OMA \\cong \\triangle ONC$, so $OM = ON$.',
    },
    solution: {
      steps: [
        { step: 'Hypotenuses are radii ($OA = OC = r$) and legs are equal half-chords ($AM = CN$). By RHS, the right triangles are congruent.', markTag: '[0.5m]' },
        { step: 'By CPCTC, the distances $OM = ON$ are equal. Both A and R are True and R correctly explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Believing that longer chords are farther from the centre (longer chords are actually closer to the centre).',
    },
  },
  {
    id: 'ch16_q03',
    chapterId: 16,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Easy',
    marks: 2,
    title: 'Finding Radius from Chord Length and Distance',
    prompt: 'A chord of length $16\\text{ cm}$ is at a distance of $6\\text{ cm}$ from the centre of a circle. Calculate the **radius** of the circle (in cm).',
    expectedAnswer: '10',
    acceptableAnswers: ['10', '10 cm'],
    diagramSvgId: 'CircleDiagram',
    hintLadder: {
      hint1Concept: 'The perpendicular from the centre bisects the chord.',
      hint2Formula: 'Half-chord is $16/2 = 8\\text{ cm}$. In the right triangle, $r^2 = 6^2 + 8^2$.',
      hint3Step: '$r^2 = 36 + 64 = 100 \\implies r = 10\\text{ cm}$.',
    },
    solution: {
      steps: [
        { step: 'Perpendicular from centre bisects chord: $\\text{half-chord} = \\frac{16}{2} = 8\\text{ cm}$.', markTag: '[0.5m]' },
        { step: 'In right triangle formed by radius $r$, distance $d = 6\\text{ cm}$, and half-chord: $r = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\text{ cm}$.', markTag: '[1.5m]' },
      ],
      finalAnswer: '10 cm',
      commonMistake: 'Using full chord 16 cm in the formula, getting $\\sqrt{36 + 256} = \\sqrt{292}$.',
    },
  },
  {
    id: 'ch16_q04',
    chapterId: 16,
    unitId: 4,
    type: 'proof',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Proof: Line from Centre to Mid-Point of Chord is Perpendicular',
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
    id: 'ch16_q05',
    chapterId: 16,
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
    id: 'ch16_q06',
    chapterId: 16,
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
