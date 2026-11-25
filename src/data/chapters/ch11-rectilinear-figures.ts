import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateRectilinearFiguresQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Polygon interior/exterior angle calculation:
    // Regular polygon with n sides (n in [5, 6, 8, 9, 10, 12])
    const n = rng.choice([5, 6, 8, 9, 10, 12]);
    const extAngle = 360 / n;
    const intAngle = 180 - extAngle;

    const askExterior = rng.choice([true, false]);
    const prompt = askExterior
      ? `Find the measure of each **exterior angle** (in degrees) of a regular polygon having ${n} sides.`
      : `Find the measure of each **interior angle** (in degrees) of a regular polygon having ${n} sides.`;

    const expectedAnswer = askExterior ? `${extAngle}` : `${intAngle}`;

    return {
      id: `gen_ch11_${rng.int(10000, 99999)}`,
      chapterId: 11,
      unitId: 4,
      title: askExterior ? 'Regular Polygon Exterior Angle' : 'Regular Polygon Interior Angle',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer,
      hintLadder: {
        hint1Concept: 'Sum of all exterior angles of any convex polygon is $360^\\circ$.',
        hint2Formula: askExterior
          ? '$\\text{Each exterior angle} = \\frac{360^\\circ}{n}$.'
          : '$\\text{Each interior angle} = 180^\\circ - \\text{exterior angle} = 180^\\circ - \\frac{360^\\circ}{n}$.',
        hint3Step: `Substitute $n = ${n}$: ${askExterior ? `360 / ${n} = ${extAngle}^\\circ` : `180 - ${extAngle} = ${intAngle}^\\circ`}.`,
      },
      solution: {
        steps: [
          { step: `For regular polygon with $n = ${n}$ sides: sum of all exterior angles is $360^\\circ$.`, markTag: '[1m]' },
          { step: askExterior
            ? `Each exterior angle $= \\frac{360^\\circ}{${n}} = ${extAngle}^\\circ$.`
            : `Each exterior angle $= \\frac{360^\\circ}{${n}} = ${extAngle}^\\circ$. Therefore each interior angle $= 180^\\circ - ${extAngle}^\\circ = ${intAngle}^\\circ$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${expectedAnswer}°`,
        commonMistake: 'Using $(n-2) \\times 180$ for sum of exterior angles instead of $360$.',
      },
      isGenerated: true,
      generatorId: 'ch11',
      generatorSeed: seed,
    };
  } else {
    // Parallelogram adjacent angles:
    // Adjacent angles are in ratio r1 : r2
    const pairs = [
      { r1: 1, r2: 2, a1: 60, a2: 120 },
      { r1: 2, r2: 3, a1: 72, a2: 108 },
      { r1: 1, r2: 3, a1: 45, a2: 135 },
      { r1: 4, r2: 5, a1: 80, a2: 100 },
      { r1: 3, r2: 7, a1: 54, a2: 126 },
    ];
    const p = rng.choice(pairs);

    const prompt = `Two adjacent angles of a parallelogram are in the ratio $${p.r1} : ${p.r2}$. Calculate the measure of the smaller angle (in degrees).`;

    return {
      id: `gen_ch11_${rng.int(10000, 99999)}`,
      chapterId: 11,
      unitId: 4,
      title: 'Parallelogram Adjacent Angles Ratio',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${p.a1}`,
      diagramSvgId: 'ParallelogramDiagram',
      hintLadder: {
        hint1Concept: 'Adjacent angles of a parallelogram are supplementary (sum $= 180^\\circ$).',
        hint2Formula: `Let angles be ${p.r1}x and ${p.r2}x. Then ${p.r1}x + ${p.r2}x = 180^\\circ$.`,
        hint3Step: `${p.r1 + p.r2}x = 180^\\circ \\implies x = ${180 / (p.r1 + p.r2)}^\\circ$. Smaller angle $= ${p.r1} \\times ${180 / (p.r1 + p.r2)}^\\circ = ${p.a1}^\\circ$.`,
      },
      solution: {
        steps: [
          { step: `Adjacent angles of a parallelogram are supplementary: sum $= 180^\\circ$.`, markTag: '[0.5m]' },
          { step: `Let angles be $${p.r1}x$ and $${p.r2}x$: $${p.r1}x + ${p.r2}x = 180^\\circ \\implies ${p.r1 + p.r2}x = 180^\\circ \\implies x = ${180 / (p.r1 + p.r2)}^\\circ$.`, markTag: '[1m]' },
          { step: `Smaller angle $= ${p.r1}x = ${p.r1} \\times ${180 / (p.r1 + p.r2)}^\\circ = ${p.a1}^\\circ$.`, markTag: '[0.5m]' },
        ],
        finalAnswer: `${p.a1}°`,
        commonMistake: 'Equating adjacent angles to 360° or reporting the larger angle.',
      },
      isGenerated: true,
      generatorId: 'ch11',
      generatorSeed: seed,
    };
  }
}

export const curatedQuestionsCh11: Question[] = [
  {
    id: 'ch11_q01',
    chapterId: 11,
    unitId: 4,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Area Theorem for Triangles on Same Base',
    prompt: 'Two triangles on the same base and between the same parallel lines are:',
    mcqOptions: [
      { id: 'A', text: 'Equal in area', explanation: 'Correct: Area = 1/2 * base * height. Base is identical and distance between parallels (height) is identical.' },
      { id: 'B', text: 'Congruent', explanation: 'Incorrect: their shapes and side lengths may differ completely.' },
      { id: 'C', text: 'Similar', explanation: 'Incorrect: their angles are not necessarily equal.' },
      { id: 'D', text: 'Equal in perimeter', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Recall the formula for area of a triangle: $\\frac{1}{2} \\times \\text{base} \\times \\text{height}$.',
      hint2Formula: 'Distance between two parallel lines is constant everywhere (height is equal).',
      hint3Step: 'Since base and height are both equal, their areas must be equal.',
    },
    solution: {
      steps: [
        { step: 'Area of triangle $= \\frac{1}{2} \\times b \\times h$. Since base is common and both vertices lie on the same parallel line, height is identical.', markTag: '[0.5m]' },
        { step: 'Therefore, the triangles have equal area (they are not necessarily congruent or similar).', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Equal in area',
      commonMistake: 'Thinking equal area implies congruence.',
    },
  },
  {
    id: 'ch11_q02',
    chapterId: 11,
    unitId: 4,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Interior Angle Sum of Polygon',
    prompt: '**Assertion (A)**: The sum of the interior angles of a regular hexagon is $720^\\circ$.\n\n**Reason (R)**: The sum of interior angles of an $n$-sided polygon is given by $(n - 2) \\times 180^\\circ$.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'A hexagon has $n = 6$ sides.',
      hint2Formula: 'Formula: $(n-2) \\times 180^\\circ$.',
      hint3Step: '$(6 - 2) \\times 180^\\circ = 4 \\times 180^\\circ = 720^\\circ$.',
    },
    solution: {
      steps: [
        { step: 'Hexagon has $n = 6$ sides. Sum $= (6 - 2) \\times 180^\\circ = 4 \\times 180^\\circ = 720^\\circ$. Assertion is True.', markTag: '[0.5m]' },
        { step: 'Reason gives the general formula $(n - 2) \\times 180^\\circ$. Reason is True and correctly explains Assertion.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Using $(n - 2) \\times 90^\\circ$ instead of $180^\\circ$.',
    },
  },
  {
    id: 'ch11_q03',
    chapterId: 11,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Finding Number of Sides from Interior Angle',
    prompt: 'Each interior angle of a regular polygon is $140^\\circ$. Find the **number of sides** of the polygon.',
    expectedAnswer: '9',
    hintLadder: {
      hint1Concept: 'Find the exterior angle first using the linear pair.',
      hint2Formula: '$\\text{Exterior angle} = 180^\\circ - 140^\\circ = 40^\\circ$.',
      hint3Step: '$n = \\frac{360^\\circ}{\\text{Exterior angle}} = \\frac{360^\\circ}{40^\\circ} = 9$.',
    },
    solution: {
      steps: [
        { step: 'Each exterior angle $= 180^\\circ - 140^\\circ = 40^\\circ$.', markTag: '[1m]' },
        { step: 'Sum of all exterior angles is $360^\\circ$. Number of sides $n = \\frac{360^\\circ}{40^\\circ} = 9$.', markTag: '[2m]' },
      ],
      finalAnswer: '9 sides',
      commonMistake: 'Trying to solve $(n-2) \\times 180 / n = 140$ with algebraic errors instead of using the simple exterior angle method.',
    },
  },
  {
    id: 'ch11_q04',
    chapterId: 11,
    unitId: 4,
    type: 'proof',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Proof: Area of Triangle and Parallelogram',
    prompt: 'If a triangle and a parallelogram are on the same base and between the same parallels, prove that the area of the triangle is equal to half the area of the parallelogram.',
    diagramSvgId: 'ParallelogramDiagram',
    proofSteps: [
      {
        id: 'step1',
        stepNumber: 1,
        statement: 'Let parallelogram $ABCD$ and $\\triangle ABE$ share common base $AB$ between parallel lines $AB$ and $CD$',
        reason: 'Given in hypothesis',
        availableReasonOptions: ['Given in hypothesis', 'By construction', 'Midpoint theorem', 'Pythagoras theorem'],
      },
      {
        id: 'step2',
        stepNumber: 2,
        statement: 'Diagonal $AC$ divides parallelogram $ABCD$ into two congruent triangles $\\triangle ABC \\cong \\triangle CDA$',
        reason: 'Diagonal divides parallelogram into two congruent triangles',
        availableReasonOptions: ['Diagonal divides parallelogram into two congruent triangles', 'Opposite angles equal', 'Angle bisector property', 'Linear pair'],
      },
      {
        id: 'step3',
        stepNumber: 3,
        statement: 'Therefore, $\\text{Area}(\\triangle ABC) = \\frac{1}{2} \\text{Area}(ABCD)$',
        reason: 'Congruent triangles have equal areas',
        availableReasonOptions: ['Congruent triangles have equal areas', 'By definition of height', 'Sum of angles', 'By SSS'],
      },
      {
        id: 'step4',
        stepNumber: 4,
        statement: 'Since $\\triangle ABE$ and $\\triangle ABC$ have same base $AB$ and same height, $\\text{Area}(\\triangle ABE) = \\text{Area}(\\triangle ABC) = \\frac{1}{2} \\text{Area}(ABCD)$',
        reason: 'Triangles on same base and between same parallels have equal area',
        availableReasonOptions: ['Triangles on same base and between same parallels have equal area', 'By AAS congruency', 'By CPCTC', 'Exterior angle theorem'],
      },
    ],
    proofRubric: [
      'Stated parallelogram base and parallel lines [1m]',
      'Showed diagonal bisects parallelogram area [1m]',
      'Equated area of $\\triangle ABE$ to $\\triangle ABC$ on same base and height [1m]',
      'Concluded $\\text{Area}(\\triangle) = \\frac{1}{2} \\text{Area}(\\parallel\\text{gram})$ [1m]',
    ],
    hintLadder: {
      hint1Concept: 'Draw a diagonal of the parallelogram to establish half-area.',
      hint2Formula: 'Triangles on the same base and between same parallels have equal area.',
      hint3Step: 'Equate the given triangle area to the diagonal triangle area.',
    },
    solution: {
      steps: [
        { step: 'Let diagonal $AC$ divide parallelogram $ABCD$ into two congruent triangles: $\\text{Area}(\\triangle ABC) = \\frac{1}{2} \\text{Area}(ABCD)$.', markTag: '[1.5m]' },
        { step: 'Both $\\triangle ABE$ and $\\triangle ABC$ stand on the same base $AB$ and between the same parallels $AB \\parallel CD$, so $\\text{Area}(\\triangle ABE) = \\text{Area}(\\triangle ABC)$.', markTag: '[1.5m]' },
        { step: 'Hence, $\\text{Area}(\\triangle ABE) = \\frac{1}{2} \\text{Area}(ABCD)$.', markTag: '[1m]' },
      ],
      finalAnswer: 'Proven: Area(Triangle) = 1/2 Area(Parallelogram)',
      commonMistake: 'Assuming the triangle and parallelogram must be congruent.',
    },
  },
  {
    id: 'ch11_q05',
    chapterId: 11,
    unitId: 4,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Properties of Rhombus Angles',
    prompt: 'In a rhombus $ABCD$, the diagonals intersect at $O$. If $\\angle OAB = 35^\\circ$:\n\n**(i)** What is the measure of $\\angle AOB$ in degrees?\n**(ii)** What is the measure of $\\angle ABC$ in degrees?',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Measure of ∠AOB (degrees):',
        expectedAnswer: '90',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Measure of ∠ABC (degrees):',
        expectedAnswer: '110',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'Diagonals of a rhombus intersect at right angles ($90^\\circ$).',
      hint2Formula: 'In right $\\triangle AOB$, $\\angle ABO = 90^\\circ - 35^\\circ = 55^\\circ$.',
      hint3Step: 'Diagonals bisect the vertex angles of a rhombus. Therefore $\\angle ABC = 2 \\times 55^\\circ = 110^\\circ$.',
    },
    solution: {
      steps: [
        { step: 'Part (i): Diagonals of a rhombus are perpendicular to each other. Therefore $\\angle AOB = 90^\\circ$.', markTag: '[2m]' },
        { step: 'Part (ii): In right $\\triangle AOB$, $\\angle ABO = 90^\\circ - \\angle OAB = 90^\\circ - 35^\\circ = 55^\\circ$.', markTag: '[1m]' },
        { step: 'Diagonal $BD$ bisects $\\angle ABC$, so $\\angle ABC = 2 \\times 55^\\circ = 110^\\circ$.', markTag: '[1m]' },
      ],
      finalAnswer: '(i) 90°, (ii) 110°',
      commonMistake: 'Reporting $55^\\circ$ instead of doubling for the full angle $\\angle ABC$.',
    },
  },
  {
    id: 'ch11_q06',
    chapterId: 11,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Median Divides Triangle into Two Equal Areas',
    prompt: 'In $\\triangle ABC$, $AD$ is a median to side $BC$. If the area of $\\triangle ABC$ is $48\\text{ cm}^2$, calculate the area of $\\triangle ABD$ (in $\\text{cm}^2$).',
    expectedAnswer: '24',
    hintLadder: {
      hint1Concept: 'A median of a triangle divides it into two triangles of equal area.',
      hint2Formula: '$\\text{Area}(\\triangle ABD) = \\frac{1}{2} \\times \\text{Area}(\\triangle ABC)$.',
      hint3Step: '$\\text{Area} = \\frac{48}{2} = 24\\text{ cm}^2$.',
    },
    solution: {
      steps: [
        { step: 'A median connects a vertex to the midpoint of the opposite side. Triangles $ABD$ and $ACD$ have equal bases ($BD = CD$) and share the same altitude from vertex $A$.', markTag: '[1.5m]' },
        { step: 'Hence, $\\text{Area}(\\triangle ABD) = \\frac{1}{2} \\text{Area}(\\triangle ABC) = \\frac{48}{2} = 24\\text{ cm}^2$.', markTag: '[1.5m]' },
      ],
      finalAnswer: '24 cm²',
      commonMistake: 'Assuming the two triangles must be congruent.',
    },
  },
];
