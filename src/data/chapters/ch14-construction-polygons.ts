import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateConstructionPolygonsQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Number of independent measurements required:
    const shapes = [
      { name: 'general quadrilateral', elements: 5, reason: 'A general quadrilateral has 8 parts (4 sides, 4 angles) and requires 5 independent parts to be fixed.' },
      { name: 'parallelogram', elements: 3, reason: 'Opposite sides and angles are equal, so only 3 independent parts (e.g. 2 adjacent sides and 1 included angle, or 2 sides and 1 diagonal) are needed.' },
      { name: 'rectangle', elements: 2, reason: 'All angles are already fixed at 90°, so only 2 measurements (length and breadth, or 1 side and 1 diagonal) are needed.' },
      { name: 'rhombus', elements: 2, reason: 'All 4 sides are equal, so only 2 independent measurements (e.g. 1 side and 1 angle, or 2 diagonals) are needed.' },
      { name: 'square', elements: 1, reason: 'All 4 angles are 90° and all 4 sides are equal, so only 1 measurement (side length or diagonal length) is needed.' },
    ];
    const s = rng.choice(shapes);

    const prompt = `State the **minimum number of independent elements (measurements)** required to construct a unique **${s.name}** using ruler and compasses only.`;

    return {
      id: `gen_ch14_${rng.int(10000, 99999)}`,
      chapterId: 14,
      unitId: 4,
      title: 'Independent Elements Required for Construction',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 1,
      prompt,
      expectedAnswer: `${s.elements}`,
      hintLadder: {
        hint1Concept: `Consider how many geometric constraints and symmetries exist in a ${s.name}.`,
        hint2Formula: 'General 4-gon: 5 elements; Parallelogram: 3; Rectangle/Rhombus: 2; Square: 1.',
        hint3Step: `For a ${s.name}, exactly ${s.elements} independent parts are required.`,
      },
      solution: {
        steps: [
          { step: `Properties of a ${s.name}: ${s.reason}`, markTag: '[0.5m]' },
          { step: `Therefore, the minimum number of independent elements required is ${s.elements}.`, markTag: '[0.5m]' },
        ],
        finalAnswer: `${s.elements}`,
        commonMistake: 'Giving 5 for every quadrilateral without considering the geometric symmetries of special figures.',
      },
      isGenerated: true,
      generatorId: 'ch14',
      generatorSeed: seed,
    };
  } else {
    // Constructible angle identifying:
    const angleScenarios = [
      { angle: 75, bisection: 'Bisecting the angle between 60° and 90° (since 60 + 15 = 75°)' },
      { angle: 105, bisection: 'Bisecting the angle between 90° and 120° (since 90 + 15 = 105°)' },
      { angle: 135, bisection: 'Bisecting the angle between 90° and 180° (since 90 + 45 = 135°)' },
      { angle: 45, bisection: 'Bisecting the 90° angle (since 90 / 2 = 45°)' },
      { angle: 30, bisection: 'Bisecting the 60° angle (since 60 / 2 = 30°)' },
    ];
    const a = rng.choice(angleScenarios);

    const bisectedAngle = a.angle === 75 || a.angle === 105 ? 30 : a.angle === 135 || a.angle === 45 ? 90 : 60;

    return {
      id: `gen_ch14_${rng.int(10000, 99999)}`,
      chapterId: 14,
      unitId: 4,
      title: 'Compass Construction of Standard Angles',
      type: 'numerical',
      difficulty: 'Standard',
      marks: 2,
      prompt: `In the construction of an angle of $${a.angle}^\\circ$ with ruler and compasses, between which standard arc or line is the angle bisected? What is the size of the interval angle (in degrees) that is bisected?`,
      expectedAnswer: `${bisectedAngle}`,
      hintLadder: {
        hint1Concept: 'Standard compass angles are built from $60^\\circ, 120^\\circ, 90^\\circ, 180^\\circ$.',
        hint2Formula: `${a.bisection}.`,
        hint3Step: `The interval between the two reference rays being bisected is ${bisectedAngle}^\\circ.`,
      },
      solution: {
        steps: [
          { step: `Explanation: ${a.bisection}.`, markTag: '[1m]' },
          { step: `The angle between the two reference rays being bisected is ${bisectedAngle}^\\circ$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${bisectedAngle}°`,
        commonMistake: 'Attempting to use a protractor which is strictly prohibited in ICSE constructions.',
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
    unitId: 4,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Constructibility of Angles Using Compass Only',
    prompt: 'Which of the following angle measures **CANNOT** be constructed using ruler and compasses alone (without a protractor)?',
    mcqOptions: [
      { id: 'A', text: '$40^\\circ$', explanation: 'Correct: $40^\\circ$ cannot be obtained by repeated bisection of $60^\\circ$ or combinations with $90^\\circ$ (Gauss-Wantzel theorem).' },
      { id: 'B', text: '$135^\\circ$', explanation: 'Incorrect: $135^\\circ = 90^\\circ + 45^\\circ$, easily constructible.' },
      { id: 'C', text: '$22.5^\\circ$', explanation: 'Incorrect: $22.5^\\circ = 45^\\circ / 2$, obtained by bisecting $45^\\circ$.' },
      { id: 'D', text: '$105^\\circ$', explanation: 'Incorrect: $105^\\circ = 90^\\circ + 15^\\circ$, obtained by bisecting the arc between $90^\\circ$ and $120^\\circ$.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Angles constructible with ruler and compass must be multiples of $1.5^\\circ$ or $3^\\circ$ derived from $60^\\circ$ and $90^\\circ$.',
      hint2Formula: '$40^\\circ$ requires trisecting an angle of $120^\\circ$, which is impossible by classical ruler and compass.',
      hint3Step: 'Hence $40^\\circ$ cannot be constructed.',
    },
    solution: {
      steps: [
        { step: 'Angles constructible by ruler and compasses must be multiples of $7.5^\\circ$, $15^\\circ$, $22.5^\\circ$, etc., derived by bisecting $60^\\circ$ and $90^\\circ$.', markTag: '[0.5m]' },
        { step: '$40^\\circ$ is not a multiple of $15^\\circ$ or $7.5^\\circ$ and cannot be constructed without a protractor.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: 40°',
      commonMistake: 'Confusing $45^\\circ$ with $40^\\circ$.',
    },
  },
  {
    id: 'ch14_q02',
    chapterId: 14,
    unitId: 4,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Construction of a Parallelogram',
    prompt: '**Assertion (A)**: A parallelogram can be uniquely constructed if the lengths of two adjacent sides and one diagonal are given.\n\n**Reason (R)**: The diagonal divides the parallelogram into two triangles, each of which can be uniquely constructed using the SSS criterion.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Think about constructing $\\triangle ABC$ using sides $AB, BC$ and diagonal $AC$.',
      hint2Formula: 'In $\\triangle ABC$, all 3 sides are known $\\implies$ unique construction by SSS.',
      hint3Step: 'Then vertex $D$ is located by drawing arcs of radii equal to opposite sides from $A$ and $C$.',
    },
    solution: {
      steps: [
        { step: 'Given $AB, BC$, and diagonal $AC$: $\\triangle ABC$ has three known sides and is uniquely constructed by SSS.', markTag: '[0.5m]' },
        { step: 'Opposite sides of a parallelogram are equal ($CD = AB$ and $AD = BC$), so vertex $D$ is uniquely fixed by intersecting arcs. R correctly explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Believing 5 elements are always needed even when parallelogram symmetries reduce the requirement to 3.',
    },
  },
  {
    id: 'ch14_q03',
    chapterId: 14,
    unitId: 4,
    type: 'mcq',
    difficulty: 'Standard',
    marks: 2,
    title: 'Chronological Step-Ordering for Rhombus Construction',
    prompt: 'To construct a rhombus $ABCD$ given diagonal $AC = 8\\text{ cm}$ and diagonal $BD = 6\\text{ cm}$ using ruler and compasses only, what is the correct chronological sequence of steps?\n\n1. Draw line segment $AC = 8\\text{ cm}$.\n2. From midpoint $O$, draw arcs of radius $3\\text{ cm}$ on both sides of the perpendicular bisector to locate $B$ and $D$.\n3. Construct the perpendicular bisector of $AC$ intersecting it at point $O$.\n4. Join $AB, BC, CD$, and $DA$.',
    mcqOptions: [
      { id: 'A', text: '1 → 3 → 2 → 4', explanation: 'Correct: Base diagonal first, then perpendicular bisector, then mark half of second diagonal, then join vertices.' },
      { id: 'B', text: '1 → 2 → 3 → 4', explanation: 'Incorrect: Cannot mark off distance from O before constructing the perpendicular bisector and finding O.' },
      { id: 'C', text: '3 → 1 → 2 → 4', explanation: 'Incorrect: Must draw line segment AC first before bisecting it.' },
      { id: 'D', text: '1 → 4 → 2 → 3', explanation: 'Incorrect: Vertices must be located before joining them.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Diagonals of a rhombus bisect each other at right angles.',
      hint2Formula: 'Draw the longer diagonal $AC = 8\\text{ cm}$ first.',
      hint3Step: 'Bisect $AC$ perpendicularly to find midpoint $O$. Cut $OB = OD = 3\\text{ cm}$. Join vertices.',
    },
    solution: {
      steps: [
        { step: 'Step 1: Draw diagonal $AC = 8\\text{ cm}$.', markTag: '[0.5m]' },
        { step: 'Step 3: Construct perpendicular bisector of $AC$ meeting it at $O$.', markTag: '[0.5m]' },
        { step: 'Step 2: With centre $O$ and radius $\\frac{6}{2} = 3\\text{ cm}$, cut arcs on both sides of the bisector to fix $B$ and $D$.', markTag: '[0.5m]' },
        { step: 'Step 4: Join $AB, BC, CD, DA$ to complete rhombus $ABCD$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: 1 → 3 → 2 → 4',
      commonMistake: 'Attempting to mark off radius 3 cm before constructing the bisector.',
    },
  },
  {
    id: 'ch14_q04',
    chapterId: 14,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Easy',
    marks: 1,
    title: 'Elements Required for Rectangle Construction',
    prompt: 'How many independent measurements are required to uniquely construct a rectangle?',
    expectedAnswer: '2',
    acceptableAnswers: ['2', 'two'],
    hintLadder: {
      hint1Concept: 'All 4 angles of a rectangle are fixed at $90^\\circ$.',
      hint2Formula: 'Only length and breadth (or 1 side and 1 diagonal) vary.',
      hint3Step: 'Therefore, exactly 2 independent measurements are needed.',
    },
    solution: {
      steps: [
        { step: 'Since all interior angles of a rectangle are known to be $90^\\circ$, only 2 independent dimensions (length and breadth) are required to fix the rectangle.', markTag: '[1m]' },
      ],
      finalAnswer: '2',
      commonMistake: 'Writing 4 because a rectangle has 4 sides.',
    },
  },
  {
    id: 'ch14_q05',
    chapterId: 14,
    unitId: 4,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Trapezium Construction Protocols',
    prompt: 'A trapezium $ABCD$ with $AB \\parallel DC$ has $AB = 7\\text{ cm}, BC = 5\\text{ cm}, CD = 4\\text{ cm}$, and $\\angle B = 60^\\circ$.\n\n**(i)** At vertex $B$, what standard angle must be constructed using compass arcs (in degrees)?\n**(ii)** To locate the line containing $DC$, what is the measure of alternate interior angle $\\angle C$ that must be constructed (in degrees)?',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Angle at vertex B (degrees):',
        expectedAnswer: '60',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Measure of angle C (degrees):',
        expectedAnswer: '120',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Angle $B = 60^\\circ$ is directly constructible using the initial radius arc.',
      hint2Formula: 'Since $AB \\parallel DC$, consecutive interior angles are supplementary: $\\angle B + \\angle C = 180^\\circ$.',
      hint3Step: '$\\angle C = 180^\\circ - 60^\\circ = 120^\\circ$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): Construct base $AB = 7\\text{ cm}$. At $B$, construct $\\angle B = 60^\\circ$ using a compass arc with the same radius.', markTag: '[2m]' },
        { step: 'Part (ii): Cut $BC = 5\\text{ cm}$. Since $AB \\parallel DC$, consecutive interior angles sum to $180^\\circ$, so $\\angle C = 180^\\circ - 60^\\circ = 120^\\circ$.', markTag: '[2m]' },
      ],
      finalAnswer: '(i) 60°, (ii) 120°',
      commonMistake: 'Making $\\angle C = 60^\\circ$, which would make the lines non-parallel.',
    },
  },
  {
    id: 'ch14_q06',
    chapterId: 14,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 2,
    title: 'Compass Construction of 75-degree Angle',
    prompt: 'An angle of $75^\\circ$ is constructed with ruler and compasses by bisecting the angle between two standard rays. Name the **larger of the two standard ray angles** (in degrees).',
    expectedAnswer: '90',
    acceptableAnswers: ['90', '90°'],
    hintLadder: {
      hint1Concept: '$75^\\circ$ is halfway between $60^\\circ$ and $90^\\circ$.',
      hint2Formula: '$\\frac{60^\\circ + 90^\\circ}{2} = \\frac{150^\\circ}{2} = 75^\\circ$.',
      hint3Step: 'The two bounding angles are $60^\\circ$ and $90^\\circ$. The larger is $90^\\circ$.',
    },
    solution: {
      steps: [
        { step: 'An angle of $75^\\circ$ is constructed by bisecting the $30^\\circ$ region between the $60^\\circ$ ray and the $90^\\circ$ ray.', markTag: '[1m]' },
        { step: 'The larger of the two standard rays is $90^\\circ$.', markTag: '[1m]' },
      ],
      finalAnswer: '90°',
      commonMistake: 'Writing $120^\\circ$ (bisecting between $90^\\circ$ and $120^\\circ$ yields $105^\\circ$, not $75^\\circ$).',
    },
  },
];
