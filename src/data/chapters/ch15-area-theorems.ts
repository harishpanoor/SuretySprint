import { Question } from '../../types/curriculum';
import { createRNG } from '../../engine/rng';

export function generateAreaTheoremsQuestion(seed?: number): Question {
  const rng = createRNG(seed);
  const type = rng.int(1, 2);

  if (type === 1) {
    // Triangle and parallelogram on same base and between same parallels:
    // Area(triangle) = 1/2 * Area(parallelogram)
    const pArea = rng.choice([36, 48, 54, 60, 72, 80, 96, 100]);
    const tArea = pArea / 2;

    const askTriangle = rng.choice([true, false]);
    const prompt = askTriangle
      ? `A parallelogram $ABCD$ and a triangle $ABE$ stand on the same base $AB$ and between the same parallel lines $AB$ and $CD$.\nIf the area of parallelogram $ABCD$ is $${pArea}\\text{ cm}^2$, calculate the **area of $\\triangle ABE$** (in $\\text{cm}^2$).`
      : `A parallelogram $ABCD$ and a triangle $ABE$ stand on the same base $AB$ and between the same parallel lines $AB$ and $CD$.\nIf the area of triangle $ABE$ is $${tArea}\\text{ cm}^2$, calculate the **area of parallelogram $ABCD$** (in $\\text{cm}^2$).`;

    const expectedAnswer = askTriangle ? `${tArea}` : `${pArea}`;

    return {
      id: `gen_ch15_${rng.int(10000, 99999)}`,
      chapterId: 15,
      unitId: 4,
      title: askTriangle ? 'Triangle Area on Same Base as Parallelogram' : 'Parallelogram Area on Same Base as Triangle',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer,
      acceptableAnswers: [`${expectedAnswer}`, `${expectedAnswer} cm^2`, `${expectedAnswer} sq cm`],
      hintLadder: {
        hint1Concept: 'A triangle and a parallelogram on the same base and between the same parallels have areas in the ratio $1 : 2$.',
        hint2Formula: '$\\text{Area}(\\triangle ABE) = \\frac{1}{2} \\times \\text{Area}(\\parallel ABCD)$.',
        hint3Step: askTriangle
          ? `$\\text{Area} = \\frac{1}{2} \\times ${pArea} = ${tArea}\\text{ cm}^2$.`
          : `$\\text{Area} = 2 \\times ${tArea} = ${pArea}\\text{ cm}^2$.`,
      },
      solution: {
        steps: [
          { step: 'By the Area Theorem, the area of a triangle is half the area of a parallelogram on the same base and between the same parallels.', markTag: '[1m]' },
          { step: askTriangle
            ? `$\\text{Area}(\\triangle ABE) = \\frac{1}{2} \\times ${pArea} = ${tArea}\\text{ cm}^2$.`
            : `$\\text{Area}(\\parallel ABCD) = 2 \\times ${tArea} = ${pArea}\\text{ cm}^2$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${expectedAnswer} cm²`,
        commonMistake: askTriangle ? 'Multiplying by 2 instead of dividing by 2.' : 'Dividing by 2 instead of multiplying by 2.',
      },
      isGenerated: true,
      generatorId: 'ch15',
      generatorSeed: seed,
    };
  } else {
    // Median divides triangle into two equal areas:
    const totalArea = rng.choice([32, 40, 50, 64, 72, 84, 90]);
    const halfArea = totalArea / 2;

    const prompt = `In $\\triangle ABC$, $AD$ is a median to side $BC$. If the area of $\\triangle ABC$ is $${totalArea}\\text{ cm}^2$, find the **area of $\\triangle ABD$** (in $\\text{cm}^2$).`;

    return {
      id: `gen_ch15_${rng.int(10000, 99999)}`,
      chapterId: 15,
      unitId: 4,
      title: 'Median Area Bisection Theorem',
      type: 'numerical',
      difficulty: 'Easy',
      marks: 2,
      prompt,
      expectedAnswer: `${halfArea}`,
      acceptableAnswers: [`${halfArea}`, `${halfArea} cm^2`, `${halfArea} sq cm`],
      diagramSvgId: 'TriangleDiagram',
      hintLadder: {
        hint1Concept: 'A median divides a triangle into two triangles of equal area.',
        hint2Formula: '$\\text{Area}(\\triangle ABD) = \\frac{1}{2} \\times \\text{Area}(\\triangle ABC)$.',
        hint3Step: `$\\text{Area} = \\frac{${totalArea}}{2} = ${halfArea}\\text{ cm}^2$.`,
      },
      solution: {
        steps: [
          { step: 'A median joins a vertex to the midpoint of the opposite side. Triangles $ABD$ and $ACD$ share equal bases ($BD = CD$) and have the same perpendicular altitude from vertex $A$.', markTag: '[1m]' },
          { step: `Therefore $\\text{Area}(\\triangle ABD) = \\frac{1}{2} \\text{Area}(\\triangle ABC) = \\frac{${totalArea}}{2} = ${halfArea}\\text{ cm}^2$.`, markTag: '[1m]' },
        ],
        finalAnswer: `${halfArea} cm²`,
        commonMistake: 'Dividing by 4 instead of 2.',
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
    unitId: 4,
    type: 'mcq',
    difficulty: 'Easy',
    marks: 1,
    title: 'Parallelograms on Same Base and Between Same Parallels',
    prompt: 'Two parallelograms stand on the same base and lie between the same parallel lines. Their areas are in the ratio:',
    mcqOptions: [
      { id: 'A', text: '$1 : 1$', explanation: 'Correct: Parallelograms on the same base and between the same parallels are strictly equal in area.' },
      { id: 'B', text: '$1 : 2$', explanation: 'Incorrect: That is the ratio between a triangle and a parallelogram.' },
      { id: 'C', text: '$2 : 1$', explanation: 'Incorrect.' },
      { id: 'D', text: '$1 : 4$', explanation: 'Incorrect.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'Area of a parallelogram is $\\text{base} \\times \\text{height}$.',
      hint2Formula: 'Since base and height are identical for both parallelograms, their areas must be equal.',
      hint3Step: 'Hence the ratio of their areas is $1 : 1$.',
    },
    solution: {
      steps: [
        { step: 'Both parallelograms have the same base $b$ and lie between the same parallel lines, meaning their perpendicular height $h$ is identical.', markTag: '[0.5m]' },
        { step: '$\\text{Area} = b \\times h$ is identical for both, yielding the ratio $1 : 1$.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: 1 : 1',
      commonMistake: 'Confusing this with triangle area which has factor $1/2$.',
    },
  },
  {
    id: 'ch15_q02',
    chapterId: 15,
    unitId: 4,
    type: 'assertion_reason',
    difficulty: 'Standard',
    marks: 1,
    title: 'Assertion–Reason: Median Area Property',
    prompt: '**Assertion (A)**: A median of a triangle divides it into two triangles of equal area.\n\n**Reason (R)**: The two triangles formed by the median have equal base lengths and share the same common perpendicular height from the opposite vertex.',
    mcqOptions: [
      { id: 'A', text: 'Both A and R are true, and R is the correct explanation of A.' },
      { id: 'B', text: 'Both A and R are true, but R is NOT the correct explanation of A.' },
      { id: 'C', text: 'A is true, but R is false.' },
      { id: 'D', text: 'A is false, but R is true.' },
    ],
    correctOptionId: 'A',
    hintLadder: {
      hint1Concept: 'The median connects the vertex to the midpoint of the base.',
      hint2Formula: 'Bases are equal: $BD = DC = \\frac{1}{2} BC$.',
      hint3Step: 'The altitude from $A$ to the line $BC$ is common to both $\\triangle ABD$ and $\\triangle ACD$.',
    },
    solution: {
      steps: [
        { step: 'Let $AD$ be the median in $\\triangle ABC$. $BD = DC$ because $D$ is the midpoint of $BC$.', markTag: '[0.5m]' },
        { step: 'Both sub-triangles share the same altitude $h$ from vertex $A$. $\\text{Area} = \\frac{1}{2} \\times BD \\times h = \\frac{1}{2} \\times DC \\times h$. Both A and R are True and R correctly explains A.', markTag: '[0.5m]' },
      ],
      finalAnswer: 'A: Both A and R are true, and R is the correct explanation of A.',
      commonMistake: 'Claiming the median creates two congruent triangles (areas are equal, but shapes are generally not congruent).',
    },
  },
  {
    id: 'ch15_q03',
    chapterId: 15,
    unitId: 4,
    type: 'proof',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Proof: Area of Triangle is Half Area of Parallelogram',
    prompt: 'Prove that the area of a triangle is half the area of a parallelogram on the same base and between the same parallels.',
    diagramSvgId: 'ParallelogramDiagram',
    proofSteps: [
      {
        id: 'step1',
        stepNumber: 1,
        statement: 'Let parallelogram $ABCD$ and $\\triangle ABE$ stand on the same base $AB$ and between parallel lines $AB \\parallel CD$.',
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
    id: 'ch15_q04',
    chapterId: 15,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Triangles Formed by Intersection of Diagonals in Trapezium',
    prompt: 'In a trapezium $ABCD$ with $AB \\parallel DC$, the diagonals $AC$ and $BD$ intersect at point $O$. If the area of $\\triangle AOD$ is $18\\text{ cm}^2$, find the **area of $\\triangle BOC$** (in $\\text{cm}^2$).',
    expectedAnswer: '18',
    hintLadder: {
      hint1Concept: 'Triangles $ADC$ and $BDC$ stand on the same base $DC$ and between parallels $AB \\parallel DC$.',
      hint2Formula: '$\\text{Area}(\\triangle ADC) = \\text{Area}(\\triangle BDC)$.',
      hint3Step: 'Subtract the common triangle $\\triangle DOC$ from both sides: $\\text{Area}(\\triangle AOD) = \\text{Area}(\\triangle BOC) = 18\\text{ cm}^2$.',
    },
    solution: {
      steps: [
        { step: 'Triangles $ADC$ and $BDC$ are on the same base $DC$ and between the same parallel lines $AB \\parallel DC$. Therefore $\\text{Area}(\\triangle ADC) = \\text{Area}(\\triangle BDC)$.', markTag: '[1m]' },
        { step: 'Subtract common region $\\triangle DOC$ from both: $\\text{Area}(\\triangle ADC) - \\text{Area}(\\triangle DOC) = \\text{Area}(\\triangle BDC) - \\text{Area}(\\triangle DOC)$.', markTag: '[1m]' },
        { step: '$\\text{Area}(\\triangle AOD) = \\text{Area}(\\triangle BOC) = 18\\text{ cm}^2$.', markTag: '[1m]' },
      ],
      finalAnswer: '18 cm²',
      commonMistake: 'Thinking the areas depend on the ratio of the parallel sides.',
    },
  },
  {
    id: 'ch15_q05',
    chapterId: 15,
    unitId: 4,
    type: 'multi_part',
    difficulty: 'Exam',
    marks: 4,
    title: 'ICSE Board Multi-Part: Centroid Divides Triangle Area',
    prompt: 'In $\\triangle ABC$, $G$ is the centroid (point of intersection of the three medians $AD, BE, CF$). The total area of $\\triangle ABC$ is $72\\text{ cm}^2$.\n\n**(i)** Calculate the area of $\\triangle GBC$ (in $\\text{cm}^2$).\n**(ii)** Calculate the area of the smaller triangle $\\triangle GBD$ (in $\\text{cm}^2$).',
    subParts: [
      {
        id: 'i',
        partLabel: '(i)',
        prompt: 'Area of triangle GBC (cm²):',
        expectedAnswer: '24',
        marks: 2,
      },
      {
        id: 'ii',
        partLabel: '(ii)',
        prompt: 'Area of triangle GBD (cm²):',
        expectedAnswer: '12',
        marks: 2,
      },
    ],
    hintLadder: {
      hint1Concept: 'The centroid divides the triangle into three triangles of equal area: $\\triangle GAB, \\triangle GBC, \\triangle GCA$.',
      hint2Formula: '$\\text{Area}(\\triangle GBC) = \\frac{1}{3} \\times \\text{Area}(\\triangle ABC) = \\frac{72}{3} = 24\\text{ cm}^2$.',
      hint3Step: 'In $\\triangle GBC$, $GD$ is a median, so $\\text{Area}(\\triangle GBD) = \\frac{24}{2} = 12\\text{ cm}^2$ (which is $1/6$ of total).',
    },
    solution: {
      steps: [
        { step: 'Part (i): The centroid $G$ joins each pair of vertices to form three triangles of equal area: $\\text{Area}(\\triangle GBC) = \\frac{1}{3} \\times 72 = 24\\text{ cm}^2$.', markTag: '[2m]' },
        { step: 'Part (ii): In $\\triangle GBC$, line segment $GD$ is a median since $D$ is the midpoint of $BC$. Therefore $\\text{Area}(\\triangle GBD) = \\frac{1}{2} \\times \\text{Area}(\\triangle GBC) = \\frac{24}{2} = 12\\text{ cm}^2$.', markTag: '[2m]' },
      ],
      finalAnswer: '(i) 24 cm², (ii) 12 cm²',
      commonMistake: 'Dividing by 4 instead of 3 for part (i).',
    },
  },
  {
    id: 'ch15_q06',
    chapterId: 15,
    unitId: 4,
    type: 'numerical',
    difficulty: 'Standard',
    marks: 3,
    title: 'Area of Parallelograms Between Parallels',
    prompt: 'Parallelogram $ABCD$ and rectangle $ABEF$ are on the same base $AB = 10\\text{ cm}$ and between the same parallels $AB$ and $FC$. If the breadth of the rectangle is $BE = 6\\text{ cm}$, find the area of parallelogram $ABCD$ (in $\\text{cm}^2$).',
    expectedAnswer: '60',
    hintLadder: {
      hint1Concept: 'A rectangle is a special parallelogram.',
      hint2Formula: 'Parallelograms on the same base and between the same parallels are equal in area.',
      hint3Step: '$\\text{Area}(\\parallel ABCD) = \\text{Area}(ABEF) = 10 \\times 6 = 60\\text{ cm}^2$.',
    },
    solution: {
      steps: [
        { step: 'The rectangle $ABEF$ and parallelogram $ABCD$ stand on the same base $AB$ and lie between the same parallel lines $AB \\parallel FC$.', markTag: '[1m]' },
        { step: 'Therefore, $\\text{Area}(ABCD) = \\text{Area}(ABEF) = \\text{base} \\times \\text{height} = 10 \\times 6 = 60\\text{ cm}^2$.', markTag: '[2m]' },
      ],
      finalAnswer: '60 cm²',
      commonMistake: 'Trying to find the slant height of the parallelogram.',
    },
  },
];
