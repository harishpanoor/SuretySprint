import { Unit, Chapter } from '../types/curriculum';

export const UNITS: Unit[] = [
  {
    id: 1,
    name: 'Pure Arithmetic',
    code: 'UNIT-1',
    chapterIds: [1],
    color: 'from-amber-500 to-orange-600',
    iconName: 'Calculator',
  },
  {
    id: 2,
    name: 'Commercial Mathematics',
    code: 'UNIT-2',
    chapterIds: [2, 3],
    color: 'from-emerald-500 to-teal-700',
    iconName: 'Coins',
  },
  {
    id: 3,
    name: 'Algebra',
    code: 'UNIT-3',
    chapterIds: [4, 5, 6, 7, 8],
    color: 'from-blue-600 to-indigo-700',
    iconName: 'Binary',
  },
  {
    id: 4,
    name: 'Geometry',
    code: 'UNIT-4',
    chapterIds: [9, 10, 11, 12, 13, 14, 15, 16],
    color: 'from-violet-600 to-purple-800',
    iconName: 'Shapes',
  },
  {
    id: 5,
    name: 'Statistics',
    code: 'UNIT-5',
    chapterIds: [17, 18],
    color: 'from-pink-600 to-rose-700',
    iconName: 'BarChart3',
  },
  {
    id: 6,
    name: 'Mensuration',
    code: 'UNIT-6',
    chapterIds: [19, 20],
    color: 'from-cyan-600 to-blue-700',
    iconName: 'Box',
  },
  {
    id: 7,
    name: 'Trigonometry',
    code: 'UNIT-7',
    chapterIds: [21, 22],
    color: 'from-amber-600 to-yellow-700',
    iconName: 'Triangle',
  },
  {
    id: 8,
    name: 'Coordinate Geometry',
    code: 'UNIT-8',
    chapterIds: [23, 24, 25],
    color: 'from-indigo-600 to-blue-800',
    iconName: 'Compass',
  },
];

export const CHAPTER_METADATA: Record<number, Omit<Chapter, 'formulaSheet'> & { formulaSheet: Chapter['formulaSheet'] }> = {
  1: {
    id: 1,
    unitId: 1,
    slug: 'rational-and-irrational-numbers',
    name: 'Rational and Irrational Numbers',
    shortName: 'Rational & Surds',
    unitName: 'Pure Arithmetic',
    description: 'Classifying numbers, surds, rationalising monomial and binomial denominators, conjugate surds, and proofs of irrationality.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'A rational number can be expressed as $p/q$ where $p, q \\in \\mathbb{Z}$ and $q \\neq 0$.',
        'An irrational number has a non-terminating, non-recurring decimal expansion.',
        'Conjugate of $(a + \\sqrt{b})$ is $(a - \\sqrt{b})$, and $(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b$.',
        'Conjugate of $(\\sqrt{a} + \\sqrt{b})$ is $(\\sqrt{a} - \\sqrt{b})$, yielding $(\\sqrt{a})^2 - (\\sqrt{b})^2 = a - b$.'
      ],
      formulas: [
        { title: 'Conjugate Rationalisation', latex: '\\frac{1}{\\sqrt{a} \\pm \\sqrt{b}} = \\frac{\\sqrt{a} \\mp \\sqrt{b}}{a - b}', description: 'Multiply numerator and denominator by conjugate surd.' },
        { title: 'Surd Multiplication', latex: '\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}', description: 'Valid for non-negative real numbers $a, b$.' },
        { title: 'Finding a and b', latex: '\\frac{\\sqrt{x}+p}{\\sqrt{x}-p} = a + b\\sqrt{x}', description: 'Equate rational parts and irrational parts independently.' }
      ],
      examTips: [
        'Always fully simplify the radical (e.g. write $\\sqrt{75}$ as $5\\sqrt{3}$).',
        'In irrationality proofs, assume $p/q$ in lowest terms and show both $p$ and $q$ share a common factor.'
      ]
    }
  },
  2: {
    id: 2,
    unitId: 2,
    slug: 'compound-interest-basic',
    name: 'Compound Interest (Stage 1) [Basic Concepts]',
    shortName: 'CI Basic Concepts',
    unitName: 'Commercial Mathematics',
    description: 'Computing Compound Interest without formula by year-by-year method, varying annual interest rates, and comparing SI with CI.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Without formula: For Year 1, $I_1 = \\frac{P_1 \\times R \\times 1}{100}$, $A_1 = P_1 + I_1$.',
        'Principal for Year 2 is $P_2 = A_1$, giving $I_2 = \\frac{P_2 \\times R \\times 1}{100}$.',
        'Total Compound Interest $CI = I_1 + I_2 + \\dots + I_n = A_n - P_1$.',
        'Simple Interest remains constant each year, whereas CI increases each year because interest earns interest.',
        'For Year 1, when compounding annually, $CI_1 = SI_1$. The difference emerges from Year 2 onwards.'
      ],
      formulas: [
        { title: 'Interest for Year 1', latex: 'I_1 = \\frac{P_1 \\times R_1 \\times 1}{100}', description: 'Interest calculated on original principal.' },
        { title: 'Principal for Year 2', latex: 'P_2 = P_1 + I_1', description: 'Accumulated amount at end of year 1.' },
        { title: 'Total CI by Summation', latex: 'CI = I_1 + I_2 + \\dots + I_n', description: 'Sum of interest earned across each successive year.' }
      ],
      examTips: [
        'In year-by-year problems, clearly label each year: "For Year 1: P = ..., I = ..., A = ...".',
        'Do not round intermediate decimal steps to avoid cumulative errors in money calculations.'
      ]
    }
  },
  3: {
    id: 3,
    unitId: 2,
    slug: 'compound-interest-formula',
    name: 'Compound Interest (Stage 2) [Applications]',
    shortName: 'CI Applications',
    unitName: 'Commercial Mathematics',
    description: 'Computing Compound Interest using formula $A = P(1 + r/100)^n$, half-yearly compounding, difference between CI and SI, and growth/depreciation.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Annual Compounding: $A = P\\left(1 + \\frac{r}{100}\\right)^n$, where $CI = A - P$.',
        'Half-Yearly Compounding: Rate is halved ($r/2$) and time periods are doubled ($2n$): $A = P\\left(1 + \\frac{r}{200}\\right)^{2n}$.',
        'Difference between CI and SI for 2 years: $\\Delta = P\\left(\\frac{r}{100}\\right)^2$.',
        'Population Growth: $V = P\\left(1 + \\frac{r}{100}\\right)^n$; Depreciation: $V = P\\left(1 - \\frac{r}{100}\\right)^n$.'
      ],
      formulas: [
        { title: 'Compound Amount Formula', latex: 'A = P\\left(1 + \\frac{r}{100}\\right)^n', description: 'Annual compounding for $n$ years at rate $r$\\%.' },
        { title: 'Half-Yearly Amount', latex: 'A = P\\left(1 + \\frac{r}{200}\\right)^{2n}', description: 'Compounded semi-annually (6 months).' },
        { title: 'Two-Year CI - SI Difference', latex: 'CI - SI = P\\left(\\frac{r}{100}\\right)^2', description: 'Direct formula for 2 years at rate $r$\\%.' },
        { title: 'Depreciation Formula', latex: 'V = P\\left(1 - \\frac{r}{100}\\right)^n', description: 'Reduction in value of machinery, vehicles, etc.' }
      ],
      examTips: [
        'Read whether compounding is yearly or half-yearly before choosing the power and rate.',
        'In depreciation problems, ensure you subtract the fraction: $(1 - r/100)$.'
      ]
    }
  },
  4: {
    id: 4,
    unitId: 3,
    slug: 'expansions',
    name: 'Expansions',
    shortName: 'Expansions',
    unitName: 'Algebra',
    description: 'Algebraic identities $(a \\pm b)^2, (a \\pm b)^3, (a+b+c)^2$, and reciprocal identities $x^2 + 1/x^2, x^3 \\pm 1/x^3$.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        '$(a+b)^2 = a^2 + 2ab + b^2$ and $(a-b)^2 = a^2 - 2ab + b^2$.',
        '$(a+b)^2 + (a-b)^2 = 2(a^2 + b^2)$ and $(a+b)^2 - (a-b)^2 = 4ab$.',
        '$(x + 1/x)^2 = x^2 + \\frac{1}{x^2} + 2 \\implies x^2 + \\frac{1}{x^2} = (x + 1/x)^2 - 2$.',
        '$(a+b+c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$.'
      ],
      formulas: [
        { title: 'Cubes of Binomials', latex: '(a \\pm b)^3 = a^3 \\pm b^3 \\pm 3ab(a \\pm b)', description: 'Useful for evaluating $x^3 \\pm 1/x^3$.' },
        { title: 'Reciprocal Cubes', latex: 'x^3 + \\frac{1}{x^3} = \\left(x + \\frac{1}{x}\\right)^3 - 3\\left(x + \\frac{1}{x}\\right)', description: 'Direct substitution formula.' },
        { title: 'Trinomial Expansion', latex: '(a+b+c)^2 = a^2+b^2+c^2 + 2(ab+bc+ca)', description: 'Remember all cross-product signs.' }
      ],
      examTips: [
        'When $x - 1/x$ is given, watch out for the $+2$ sign when finding $x^2 + 1/x^2$.',
        'Check terms carefully before squaring trinomials with negative signs like $(a - b + c)^2$.'
      ]
    }
  },
  5: {
    id: 5,
    unitId: 3,
    slug: 'factorisation',
    name: 'Factorisation',
    shortName: 'Factorisation',
    unitName: 'Algebra',
    description: 'Taking common factors, grouping, difference of two squares, splitting the middle term $ax^2+bx+c$, and sum/difference of cubes.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Always check for highest common factor (HCF) first before applying identities.',
        'Difference of squares: $a^2 - b^2 = (a - b)(a + b)$.',
        'Splitting middle term: For $ax^2 + bx + c$, find two numbers whose product is $ac$ and sum is $b$.',
        'Sum and difference of cubes: $a^3 + b^3 = (a+b)(a^2 - ab + b^2)$ and $a^3 - b^3 = (a-b)(a^2 + ab + b^2)$.'
      ],
      formulas: [
        { title: 'Sum of Cubes', latex: 'a^3 + b^3 = (a + b)(a^2 - ab + b^2)', description: 'Note the negative middle term $-ab$.' },
        { title: 'Difference of Cubes', latex: 'a^3 - b^3 = (a - b)(a^2 + ab + b^2)', description: 'Note the positive middle term $+ab$.' },
        { title: 'Difference of Two Squares', latex: 'a^2 - b^2 = (a - b)(a + b)', description: 'Can be applied iteratively e.g. $x^4 - 16$.' }
      ],
      examTips: [
        'Check if an expression can be factored further (e.g. $x^4 - 1 = (x^2+1)(x-1)(x+1)$).',
        'In $a^3 - b^3$, students commonly write $(a-b)(a^2 - ab + b^2)$ by mistake; the second factor has $+ab$.'
      ]
    }
  },
  6: {
    id: 6,
    unitId: 3,
    slug: 'simultaneous-linear-equations',
    name: 'Simultaneous (Linear) Equations [Including Problems]',
    shortName: 'Simultaneous Eq',
    unitName: 'Algebra',
    description: 'Elimination, Substitution, Cross-Multiplication, equations reducible to linear form, and authentic ICSE word problems.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Method of Elimination: Multiply equations by constants to make coefficients of one variable equal.',
        'Method of Substitution: Express one variable in terms of the other from equation 1 and substitute into equation 2.',
        'Reducible form: For $\\frac{a}{x} + \\frac{b}{y} = c$, substitute $u = 1/x$ and $v = 1/y$.',
        'Two-digit number: Let tens digit be $x$, units digit be $y$. Original number is $10x + y$; reversed is $10y + x$.'
      ],
      formulas: [
        { title: 'Cross-Multiplication Formula', latex: '\\frac{x}{b_1 c_2 - b_2 c_1} = \\frac{-y}{a_1 c_2 - a_2 c_1} = \\frac{1}{a_1 b_2 - a_2 b_1}', description: 'Standard form $a_i x + b_i y + c_i = 0$.' },
        { title: 'Upstream / Downstream Speed', latex: '\\text{Speed Downstream} = u + v, \\quad \\text{Speed Upstream} = u - v', description: '$u$ = speed in still water, $v$ = stream speed.' }
      ],
      examTips: [
        'Always write statements clearly in word problems (e.g. "Let the present age of father be $x$ years").',
        'Verify your solution $(x, y)$ by plugging back into both original equations.'
      ]
    }
  },
  7: {
    id: 7,
    unitId: 3,
    slug: 'indices',
    name: 'Indices [Exponents]',
    shortName: 'Indices',
    unitName: 'Algebra',
    description: 'Laws of positive, negative, zero, and fractional exponents; simplifying exponential expressions and solving exponential equations.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Product Law: $a^m \\times a^n = a^{m+n}$ and Quotient Law: $a^m / a^n = a^{m-n}$.',
        'Power of a Power: $(a^m)^n = a^{mn}$.',
        'Zero Index: $a^0 = 1$ for any $a \\neq 0$.',
        'Negative Index: $a^{-n} = \\frac{1}{a^n}$ and $(a/b)^{-n} = (b/a)^n$.',
        'Fractional Index: $a^{m/n} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m$.',
        'Exponential equation rule: If $a^x = a^y$ and $a \\neq 0, 1, -1$, then $x = y$.'
      ],
      formulas: [
        { title: 'Power Distribution', latex: '(ab)^n = a^n b^n, \\quad \\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}', description: 'Distributes over products and quotients.' },
        { title: 'Solving Equations with Common Base', latex: 'a^{f(x)} = a^{g(x)} \\implies f(x) = g(x)', description: 'Express both sides in powers of a prime base.' }
      ],
      examTips: [
        'Be careful with negative signs: $(-3)^2 = 9$, but $-3^2 = -9$.',
        'Express composite numbers ($4, 8, 9, 27, 16$) in prime powers ($2^2, 2^3, 3^2, 3^3, 2^4$) first.'
      ]
    }
  },
  8: {
    id: 8,
    unitId: 3,
    slug: 'logarithms',
    name: 'Logarithms',
    shortName: 'Logarithms',
    unitName: 'Algebra',
    description: 'Converting between exponential and logarithmic forms, laws of logarithms, evaluating without tables, and solving log equations.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Definition: If $a^x = N$ ($a > 0, a \\neq 1, N > 0$), then $\\log_a N = x$.',
        'Product Law: $\\log_a(mn) = \\log_a m + \\log_a n$.',
        'Quotient Law: $\\log_a(m/n) = \\log_a m - \\log_a n$.',
        'Power Law: $\\log_a(m^p) = p \\log_a m$.',
        'Special Values: $\\log_a a = 1$ and $\\log_a 1 = 0$.'
      ],
      formulas: [
        { title: 'Base Change Theorem', latex: '\\log_b a = \\frac{\\log_c a}{\\log_c b}', description: 'Allows conversion to common base 10.' },
        { title: 'Reciprocal Base Identity', latex: '\\log_b a = \\frac{1}{\\log_a b}', description: 'Frequently tested in ICSE simplify questions.' }
      ],
      examTips: [
        'Logarithm is only defined for positive real numbers. Bases must be positive and $\\neq 1$.',
        'Never write $\\log(a+b) = \\log a + \\log b$; that is a major error!'
      ]
    }
  },
  9: {
    id: 9,
    unitId: 4,
    slug: 'triangles-congruency',
    name: 'Triangles [Congruency in Triangles]',
    shortName: 'Congruency',
    unitName: 'Geometry',
    description: 'Four congruency criteria: SSS, SAS, AAS, RHS (SSA is strictly invalid); statement-reason two-column proofs.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Four Congruency Criteria: SSS (Side-Side-Side), SAS (Side-Included Angle-Side), AAS / ASA (Angle-Angle-Side / Angle-Side-Angle), and RHS (Right angle-Hypotenuse-Side).',
        'SSA (Side-Side-Angle) and AAA are strictly INVALID for triangle congruency.',
        'CPCTC: Corresponding Parts of Congruent Triangles are Congruent (used to deduce equal sides or angles after proving congruency).',
        'Always list corresponding vertices in identical order: $\\triangle ABC \\cong \\triangle DEF$.'
      ],
      formulas: [
        { title: 'Angle Sum of Triangle', latex: '\\angle A + \\angle B + \\angle C = 180^\\circ', description: 'Fundamental theorem of Euclidean triangles.' },
        { title: 'Exterior Angle Theorem', latex: '\\angle \\text{ext} = \\angle 1 + \\angle 2', description: 'Exterior angle equals sum of two opposite interior angles.' }
      ],
      examTips: [
        'In SAS, verify that the angle is strictly IN BETWEEN the two sides being compared.',
        'In RHS, identify the right angle first, then confirm hypotenuses and one pair of legs are equal.'
      ]
    }
  },
  10: {
    id: 10,
    unitId: 4,
    slug: 'isosceles-triangles',
    name: 'Isosceles Triangles [Including Inequalities]',
    shortName: 'Isosceles & Ineq',
    unitName: 'Geometry',
    description: 'Properties of isosceles and equilateral triangles, bisector of vertical angle; triangle inequalities: side opposite greater angle, $a + b > c$, perpendicular as shortest distance.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Angles opposite to equal sides of a triangle are equal, and converse: sides opposite to equal angles are equal.',
        'In an isosceles triangle, the bisector of the vertical angle bisects the base at right angles.',
        'Triangle Inequality: The sum of any two sides of a triangle is strictly greater than the third side: $a+b > c, b+c > a, c+a > b$.',
        'Side opposite to greater angle is longer, and angle opposite to longer side is greater.',
        'The perpendicular line segment drawn from an external point to a line is the shortest distance to that line.'
      ],
      formulas: [
        { title: 'Triangle Inequality', latex: 'a + b > c', description: 'Valid for every permutation of sides in non-degenerate triangles.' },
        { title: 'Difference of Two Sides', latex: '|a - b| < c', description: 'Difference between any two sides is strictly less than the third side.' },
        { title: 'Shortest Distance', latex: 'd_{\\perp} \\le d_{\\text{oblique}}', description: 'Perpendicular from external point is strictly shorter than any oblique segment.' }
      ],
      examTips: [
        'When checking if 3 lengths form a triangle, simply verify that the sum of the two smaller sides exceeds the largest side.',
        'In inequality proofs, look for exterior angles which are greater than either interior opposite angle.'
      ]
    }
  },
  11: {
    id: 11,
    unitId: 4,
    slug: 'midpoint-theorem',
    name: 'Mid-point Theorem and Its Converse [Including Intercept Theorem]',
    shortName: 'Mid-point Theorem',
    unitName: 'Geometry',
    description: 'Mid-point theorem ($MN \\parallel BC, MN = \\frac{1}{2}BC$), converse of mid-point theorem, and equal intercept theorem.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Mid-Point Theorem: The line segment joining the mid-points of two sides of a triangle is parallel to the third side and equal to half of it.',
        'Converse of Mid-Point Theorem: The line drawn through the mid-point of one side of a triangle parallel to another side bisects the third side.',
        'Equal-Intercept Theorem: If three or more parallel lines make equal intercepts on one transversal, they make equal intercepts on any other transversal.'
      ],
      formulas: [
        { title: 'Mid-Point Length Relation', latex: 'DE = \\frac{1}{2}BC \\text{ and } DE \\parallel BC', description: 'When $D$ and $E$ are mid-points of $AB$ and $AC$.' },
        { title: 'Converse Mid-Point Theorem', latex: 'AE = EC \\iff AD = DB \\text{ and } DE \\parallel BC', description: 'Line through mid-point parallel to another side bisects third side.' },
        { title: 'Equal-Intercept Theorem Ratio', latex: '\\frac{AB}{BC} = \\frac{PQ}{QR} = 1', description: 'Transversals cut by equidistant parallel lines.' }
      ],
      examTips: [
        'Identify whether you are using the Mid-point theorem directly or its Converse before starting.',
        'Check for quadrilaterals whose vertices are mid-points: they always form a parallelogram!'
      ]
    }
  },
  12: {
    id: 12,
    unitId: 4,
    slug: 'pythagoras-theorem',
    name: 'Pythagoras Theorem [Proof and Simple Applications with Converse]',
    shortName: 'Pythagoras Theorem',
    unitName: 'Geometry',
    description: 'Pythagoras theorem $h^2 = p^2 + b^2$, converse, Pythagorean triplets, altitude relations, and ladder/pole word problems.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Pythagoras Theorem: In a right-angled triangle, $\\text{Hypotenuse}^2 = \\text{Base}^2 + \\text{Perpendicular}^2$.',
        'Converse: If $c^2 = a^2 + b^2$, then the angle opposite to side $c$ is a right angle ($90^\\circ$).',
        'Common Pythagorean Triplets: $(3,4,5), (5,12,13), (7,24,25), (8,15,17), (9,40,41), (20,21,29)$.'
      ],
      formulas: [
        { title: 'Right Triangle Relation', latex: 'a^2 + b^2 = c^2', description: 'Where $c$ is the hypotenuse opposite $90^\\circ$.' },
        { title: 'Diagonal of a Rectangle', latex: 'd = \\sqrt{l^2 + b^2}', description: 'Forms two congruent right triangles.' }
      ],
      examTips: [
        'Clearly specify which right triangle you are applying the theorem to in multi-triangle figures.',
        'Check units (convert m to cm or vice-versa) before squaring.'
      ]
    }
  },
  13: {
    id: 13,
    unitId: 4,
    slug: 'rectilinear-figures',
    name: 'Rectilinear Figures [Quadrilaterals: Parallelogram, Rectangle, Rhombus, Square and Trapezium]',
    shortName: 'Rectilinear Figures',
    unitName: 'Geometry',
    description: 'Polygon interior/exterior angle sums; properties of parallelograms, rectangles, rhombuses, squares, and trapeziums.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Sum of interior angles of an $n$-sided polygon: $(2n - 4) \\times 90^\\circ$ or $(n-2) \\times 180^\\circ$.',
        'Sum of exterior angles of any convex polygon is always $360^\\circ$.',
        'In a parallelogram, opposite sides are equal, opposite angles are equal, and diagonals bisect each other.',
        'In a rectangle, diagonals are equal and bisect each other.',
        'In a rhombus, all four sides are equal, and diagonals bisect each other at right angles ($90^\\circ$).',
        'In a square, all four sides are equal, angles are $90^\\circ$, and diagonals are equal and perpendicular bisectors.'
      ],
      formulas: [
        { title: 'Polygon Interior Angle Sum', latex: 'S_i = (n - 2) \\times 180^\\circ', description: 'Each interior angle of regular polygon is $\\frac{(n-2) \\times 180^\\circ}{n}$.' },
        { title: 'Exterior Angle of Regular Polygon', latex: 'E = \\frac{360^\\circ}{n}', description: 'Interior + Exterior = $180^\\circ$.' }
      ],
      examTips: [
        'Remember that a rhombus has perpendicular diagonals that bisect each other.',
        'When proving a quadrilateral is a parallelogram, showing ONE pair of opposite sides is both equal and parallel is sufficient.'
      ]
    }
  },
  14: {
    id: 14,
    unitId: 4,
    slug: 'construction-polygons',
    name: 'Construction of Polygons [Using Ruler and Compass Only]',
    shortName: 'Constructions',
    unitName: 'Geometry',
    description: 'Ruler and compass constructions: angle bisector, perpendicular bisector, standard angles ($60^\\circ, 90^\\circ, 120^\\circ, 45^\\circ, 30^\\circ, 75^\\circ, 105^\\circ, 135^\\circ$); constructing quadrilaterals from 5 independent elements.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Strict Ruler & Compass rule: Protractors are strictly prohibited except for verifying completed angles.',
        'Standard constructible angles with compass: $60^\\circ, 120^\\circ$ (from initial arc), $90^\\circ$ (bisecting $60^\\circ-120^\\circ$), $30^\\circ$ (bisecting $60^\\circ$), $45^\\circ$ (bisecting $90^\\circ$), $75^\\circ$ (bisecting $60^\\circ-90^\\circ$), $105^\\circ$ (bisecting $90^\\circ-120^\\circ$), $135^\\circ$ (bisecting $90^\\circ-180^\\circ$).',
        'To uniquely construct any general quadrilateral, exactly 5 independent elements (sides, diagonals, angles) are required.',
        'Parallelogram requires 3 independent elements, rhombus requires 2 elements, rectangle requires 2 elements, square requires 1 element.'
      ],
      formulas: [
        { title: 'Independent Elements Count', latex: 'N = 5', description: 'Minimum independent parts to uniquely construct a general 4-gon.' },
        { title: 'Angle Bisector Construction', latex: '\\theta_{\\text{half}} = \\frac{\\theta}{2}', description: 'Drawn by intersecting equal radius arcs from arms.' }
      ],
      examTips: [
        'Always draw a neat, labelled rough sketch first with all given measurements before beginning compass construction.',
        'Do NOT erase construction arcs; examiners award marks for visible, sharp intersecting arcs.'
      ]
    }
  },
  15: {
    id: 15,
    unitId: 4,
    slug: 'area-theorems',
    name: 'Area Theorems [Proof and Use]',
    shortName: 'Area Theorems',
    unitName: 'Geometry',
    description: 'Parallelograms and triangles on the same base and between same parallels; area of triangle is half parallelogram area; median bisects triangle area.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Parallelograms on the same base and between the same parallels are equal in area.',
        'Triangles on the same base and between the same parallels are equal in area.',
        'The area of a triangle is half the area of a parallelogram on the same base and between the same parallels.',
        'A median of a triangle divides it into two triangles of equal area.',
        'Triangles with equal areas on the same base lie between the same parallels.'
      ],
      formulas: [
        { title: 'Parallelograms on Same Base', latex: '\\text{Area}(\\parallel ABCD) = \\text{Area}(\\parallel ABFE)', description: 'Same base $AB$ and between parallels $AB \\parallel DC$.' },
        { title: 'Triangle and Parallelogram Relation', latex: '\\text{Area}(\\triangle PAB) = \\frac{1}{2} \\text{Area}(\\parallel ABCD)', description: 'Base $AB$ and height equal.' },
        { title: 'Median Area Bisection', latex: '\\text{Area}(\\triangle ABD) = \\text{Area}(\\triangle ACD)', description: 'Where $AD$ is the median to side $BC$.' }
      ],
      examTips: [
        'Identify the common base and the pair of parallel lines first before quoting the area theorem.',
        'Use subtraction or addition of common sub-regions when dealing with intersecting triangles.'
      ]
    }
  },
  16: {
    id: 16,
    unitId: 4,
    slug: 'circle',
    name: 'Circle',
    shortName: 'Circle',
    unitName: 'Geometry',
    description: 'Perpendicular from centre bisects chord, equal chords are equidistant from centre, concentric circles, and distance between parallel chords.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'The perpendicular drawn from the centre of a circle to a chord bisects the chord.',
        'Converse: The line joining the centre of a circle to the mid-point of a chord is perpendicular to the chord.',
        'Equal chords of a circle are equidistant from the centre, and chords equidistant from centre are equal in length.',
        'In a right triangle formed by radius $r$, distance from centre $d$, and half-chord $c/2$: $r^2 = d^2 + (c/2)^2$.'
      ],
      formulas: [
        { title: 'Radius, Distance & Chord Relation', latex: 'r^2 = d^2 + \\left(\\frac{c}{2}\\right)^2', description: 'Crucial for all chord calculations.' },
        { title: 'Parallel Chords on Opposite Sides', latex: '\\text{Distance} = d_1 + d_2', description: 'If on the same side, $\\text{Distance} = |d_1 - d_2|$.' }
      ],
      examTips: [
        'Always read carefully whether parallel chords are on the same side of the centre or on opposite sides.',
        'Always state "Perpendicular from centre to chord bisects the chord" before taking half length.'
      ]
    }
  },
  17: {
    id: 17,
    unitId: 5,
    slug: 'statistics',
    name: 'Statistics',
    shortName: 'Statistics',
    unitName: 'Statistics',
    description: 'Raw and grouped data, arrayed data, class limits, true class boundaries, class mark, cumulative frequency, Histograms and Frequency Polygons.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Raw Data vs Grouped Data: Tally marks are grouped in clusters of 5.',
        'Continuous vs Discontinuous Intervals: If limits are $10-19, 20-29$, adjustment factor $d = \\frac{20-19}{2} = 0.5$. True boundaries are $9.5-19.5, 19.5-29.5$.',
        'Class Mark (Mid-value) $x_i = \\frac{\\text{Lower limit} + \\text{Upper limit}}{2}$.',
        'Class Size (Width) $h = \\text{Upper boundary} - \\text{Lower boundary}$.',
        'Histogram: Bars are drawn adjacent to each other with class boundaries on X-axis and frequency on Y-axis.',
        'Frequency Polygon: Formed by joining the mid-points of the tops of histogram rectangles, closed by joining to mid-points of adjacent zero-frequency classes.'
      ],
      formulas: [
        { title: 'Class Mark (Mid-Value)', latex: 'x_i = \\frac{\\text{Lower Limit} + \\text{Upper Limit}}{2}', description: 'Represents the centre of each class.' },
        { title: 'Class Width', latex: 'h = \\text{Upper Boundary} - \\text{Lower Boundary}', description: 'Uniform interval size.' }
      ],
      examTips: [
        'When drawing Histograms from discontinuous classes, always convert to continuous true class boundaries first.',
        'Remember to use a kink/zigzag mark on the X-axis if the scale does not start from zero.'
      ]
    }
  },
  18: {
    id: 18,
    unitId: 5,
    slug: 'mean-median',
    name: 'Mean and Median [For Ungrouped Data Only]',
    shortName: 'Mean & Median',
    unitName: 'Statistics',
    description: 'Arithmetic mean $\\bar{x} = \\frac{\\sum x}{n}$ and $\\bar{x} = \\frac{\\sum fx}{\\sum f}$, finding missing observation, median of ungrouped data for odd/even $n$.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Mean of raw data: $\\bar{x} = \\frac{\\sum x_i}{n}$.',
        'Mean of frequency distribution: $\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}$.',
        'If a constant $k$ is added/subtracted/multiplied to each observation, the mean is also increased/decreased/multiplied by $k$.',
        'Median for odd $n$: value of $\\left(\\frac{n+1}{2}\\right)^{\\text{th}}$ observation after sorting.',
        'Median for even $n$: average of $\\left(\\frac{n}{2}\\right)^{\\text{th}}$ and $\\left(\\frac{n}{2}+1\\right)^{\\text{th}}$ observations after sorting.'
      ],
      formulas: [
        { title: 'Raw Mean', latex: '\\bar{x} = \\frac{\\sum x_i}{n}', description: 'Sum of all observations divided by count.' },
        { title: 'Grouped Table Mean', latex: '\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}', description: 'Direct method for frequency table.' },
        { title: 'Median for Even n', latex: '\\text{Median} = \\frac{1}{2}\\left[\\left(\\frac{n}{2}\\right)^{\\text{th}} + \\left(\\frac{n}{2}+1\\right)^{\\text{th}}\\right]', description: 'Data must be arranged in ascending order.' }
      ],
      examTips: [
        'Always arrange observations in ascending order before finding median!',
        'Check whether $n$ is odd or even before selecting the median position formula.'
      ]
    }
  },
  19: {
    id: 19,
    unitId: 6,
    slug: 'area-perimeter',
    name: 'Area and Perimeter of Plane Figures',
    shortName: 'Area & Perimeter',
    unitName: 'Mensuration',
    description: 'Perimeter and area of triangles (Herons formula), quadrilaterals, circles, semi-circles, circular rings and composite plane figures.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Herons Formula: Area $= \\sqrt{s(s-a)(s-b)(s-c)}$ where semi-perimeter $s = \\frac{a+b+c}{2}$.',
        'Area of equilateral triangle: $\\frac{\\sqrt{3}}{4} a^2$ and altitude $h = \\frac{\\sqrt{3}}{2} a$.',
        'Area of trapezium: $\\frac{1}{2} (a + b) \\times h$.',
        'Area of rhombus: $\\frac{1}{2} d_1 d_2$ and side $a = \\sqrt{(d_1/2)^2 + (d_2/2)^2}$.',
        'Area of circular ring: $\\pi(R^2 - r^2) = \\pi(R - r)(R + r)$.',
        'Perimeter of semi-circle: $\\pi r + 2r = r(\\pi + 2)$.'
      ],
      formulas: [
        { title: 'Herons Formula', latex: 'A = \\sqrt{s(s-a)(s-b)(s-c)}', description: '$s = (a+b+c)/2$.' },
        { title: 'Area of Trapezium', latex: 'A = \\frac{1}{2}(a+b)h', description: '$a, b$ parallel sides, $h$ distance between them.' },
        { title: 'Circular Ring Area', latex: 'A = \\pi(R^2 - r^2)', description: 'Area of border/path around circular lawn.' }
      ],
      examTips: [
        'Use $\\pi = 22/7$ unless specified as $3.1416$.',
        'Check if path is inside or outside the region when calculating inner and outer radii.'
      ]
    }
  },
  20: {
    id: 20,
    unitId: 6,
    slug: 'solids',
    name: 'Solids [Surface Area and Volume of 3-D Solids]',
    shortName: 'Solids (3D)',
    unitName: 'Mensuration',
    description: 'Lateral and total surface area, volume, and length of space diagonal for cube and cuboid only (strictly excluding cylinders, cones, spheres).',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Cuboid: Volume $V = l \\times b \\times h$, Total Surface Area $TSA = 2(lb + bh + hl)$, Lateral Surface Area (Area of 4 walls) $LSA = 2(l + b)h$.',
        'Space diagonal of cuboid: $d = \\sqrt{l^2 + b^2 + h^2}$ (length of longest rod that can be placed inside).',
        'Cube of edge $a$: Volume $V = a^3$, $TSA = 6a^2$, $LSA = 4a^2$, Space diagonal $d = a\\sqrt{3}$.',
        'Unit conversions: $1\\text{ m}^3 = 1000\\text{ litres}$, $1\\text{ litre} = 1000\\text{ cm}^3$, $1\\text{ m}^3 = 10^6\\text{ cm}^3$.'
      ],
      formulas: [
        { title: 'Cuboid Volume & TSA', latex: 'V = lbh, \\quad TSA = 2(lb+bh+hl)', description: 'Standard 3D cuboid measurements.' },
        { title: 'Area of 4 Walls', latex: 'A = 2(l + b)h', description: 'Lateral surface area of room/tank.' },
        { title: 'Longest Rod in Room', latex: 'd = \\sqrt{l^2 + b^2 + h^2}', description: 'Internal space diagonal.' }
      ],
      examTips: [
        'Double-check units: never multiply metres by centimetres without converting first.',
        'When painting four walls and ceiling, area $= 2(l+b)h + lb$ (do not add the floor).'
      ]
    }
  },
  21: {
    id: 21,
    unitId: 7,
    slug: 'trigonometrical-ratios',
    name: 'Trigonometrical Ratios [Sine, Cosine, Tangent and their Reciprocals]',
    shortName: 'Trig Ratios',
    unitName: 'Trigonometry',
    description: 'Definitions of $\\sin, \\cos, \\tan, \\cot, \\sec, \\csc$, exact values at $0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$, fundamental identities, and complementary angle ratios.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Ratios: $\\sin\\theta = \\frac{p}{h}, \\cos\\theta = \\frac{b}{h}, \\tan\\theta = \\frac{p}{b}$, and reciprocals $\\csc\\theta = \\frac{h}{p}, \\sec\\theta = \\frac{h}{b}, \\cot\\theta = \\frac{b}{p}$.',
        'Fundamental identities: $\\sin^2\\theta + \\cos^2\\theta = 1$, $1 + \\tan^2\\theta = \\sec^2\\theta$, $1 + \\cot^2\\theta = \\csc^2\\theta$.',
        'Quotient relations: $\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}, \\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta}$.',
        'Complementary angles: $\\sin(90^\\circ - \\theta) = \\cos\\theta$, $\\tan(90^\\circ - \\theta) = \\cot\\theta$, $\\sec(90^\\circ - \\theta) = \\csc\\theta$.'
      ],
      formulas: [
        { title: 'Pythagorean Trig Identity', latex: '\\sin^2\\theta + \\cos^2\\theta = 1', description: 'Yields $\\sin\\theta = \\sqrt{1 - \\cos^2\\theta}$.' },
        { title: 'Secant-Tangent Identity', latex: '\\sec^2\\theta - \\tan^2\\theta = 1', description: 'Factorises to $(\\sec\\theta-\\tan\\theta)(\\sec\\theta+\\tan\\theta) = 1$.' },
        { title: 'Complementary Angle Pair', latex: '\\sin(90^\\circ - \\theta) = \\cos\\theta', description: 'Angles summing to $90^\\circ$.' }
      ],
      examTips: [
        'Memorise values at $0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$ accurately: e.g. $\\sin 30^\\circ = 1/2, \\cos 30^\\circ = \\sqrt{3}/2, \\tan 45^\\circ = 1$.',
        'In proof questions, express compound terms in terms of $\\sin\\theta$ and $\\cos\\theta$ if stuck.'
      ]
    }
  },
  22: {
    id: 22,
    unitId: 7,
    slug: 'solution-right-triangles',
    name: 'Solution of Right Triangles [Simple 2-D Problems Involving One Right-angled Triangle]',
    shortName: 'Right Triangles',
    unitName: 'Trigonometry',
    description: 'Solving single right-angled triangles for unknown sides/angles; simple practical 2D problems (ladder against wall, tree/tower height, shadow length).',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Solving a right triangle means finding all remaining sides and angles given 2 sides or 1 side and 1 acute angle.',
        'Angle of elevation: angle between horizontal line of sight and line to object above.',
        'Angle of depression: angle between horizontal line of sight and line to object below (equal to alternate interior angle of elevation).',
        'In a single right triangle: $\\tan\\theta = \\frac{\\text{Height}}{\\text{Distance}}$ is the most frequent relation used.'
      ],
      formulas: [
        { title: 'Height and Distance Relation', latex: '\\tan\\theta = \\frac{h}{d}', description: 'Height $h$ over horizontal distance $d$.' },
        { title: 'Ladder / Hypotenuse Relation', latex: '\\sin\\theta = \\frac{h}{L}, \\quad \\cos\\theta = \\frac{d}{L}', description: '$L$ = length of ladder/hypotenuse.' }
      ],
      examTips: [
        'Always draw a neat right triangle and mark the angle with respect to the horizontal.',
        'Never confuse angle of elevation with angle from vertical.'
      ]
    }
  },
  23: {
    id: 23,
    unitId: 8,
    slug: 'cartesian-plane',
    name: 'Co-ordinate Geometry',
    shortName: 'Cartesian Plane',
    unitName: 'Coordinate Geometry',
    description: 'Cartesian plane, axes, quadrants, plotting ordered pairs $(x, y)$, dependent/independent variables, and slope concept $m = \\frac{y_2-y_1}{x_2-x_1}$, $y = mx + c$.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Point $(x, y)$: $x$ is abscissa (perpendicular distance from y-axis), $y$ is ordinate (perpendicular distance from x-axis).',
        'Quadrants: I $(+, +)$, II $(-, +)$, III $(-, -)$, IV $(+, -)$.',
        'Points on X-axis have $y = 0$; points on Y-axis have $x = 0$. Origin is $(0, 0)$.',
        'Slope (Gradient) $m = \\frac{y_2 - y_1}{x_2 - x_1} = \\tan\\theta$.',
        'Equation of line with slope $m$ and y-intercept $c$: $y = mx + c$.'
      ],
      formulas: [
        { title: 'Slope Formula', latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1}', description: 'Gradient of straight line joining $(x_1, y_1)$ and $(x_2, y_2)$.' },
        { title: 'Slope-Intercept Form', latex: 'y = mx + c', description: '$m$ is slope, $c$ is y-intercept.' }
      ],
      examTips: [
        'Remember that slope of horizontal line is $0$ and slope of vertical line is undefined.',
        'Plot at least 3 points when graphing a line to check for arithmetic errors.'
      ]
    }
  },
  24: {
    id: 24,
    unitId: 8,
    slug: 'graphical-solution',
    name: 'Graphical Solution [Solution of Simultaneous Linear Equations, Graphically]',
    shortName: 'Graphical Solution',
    unitName: 'Coordinate Geometry',
    description: 'Plotting linear equations on grid, intersection as unique solution, intercepts, vertices and area of triangle formed by lines with axes.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Intersection point $(x_0, y_0)$ of two linear graphs gives the unique simultaneous solution.',
        'To graph a line, prepare a table of at least 3 points satisfying the equation.',
        'Triangle formed with coordinate axes: vertices are intersection point and axes intercepts.',
        'Area of triangle bounded by line and axes: $\\text{Area} = \\frac{1}{2} \\times |x\\text{-intercept}| \\times |y\\text{-intercept}|$.'
      ],
      formulas: [
        { title: 'Intersection Point', latex: '(x_0, y_0) = L_1 \\cap L_2', description: 'Coordinates of point where lines intersect.' },
        { title: 'Triangle Area with Axes', latex: '\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height}', description: 'Using graph axis lengths.' }
      ],
      examTips: [
        'Always label axes $X, X\'$ and $Y, Y\'$ and state scale clearly (e.g. $1\\text{ cm} = 1\\text{ unit}$).',
        'Read the coordinates of intersection carefully from the graph grid.'
      ]
    }
  },
  25: {
    id: 25,
    unitId: 8,
    slug: 'distance-formula',
    name: 'Distance Formula',
    shortName: 'Distance Formula',
    unitName: 'Coordinate Geometry',
    description: 'Distance between two points $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$, collinearity of three points, classifying triangles and quadrilaterals by distance.',
    hasProceduralGenerator: true,
    formulaSheet: {
      keyRules: [
        'Distance Formula: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$.',
        'Distance from origin $(0, 0)$ to point $(x, y)$: $d = \\sqrt{x^2 + y^2}$.',
        'Collinearity of $A, B, C$: Points are collinear if $AB + BC = AC$.',
        'Right triangle test: $AB^2 + BC^2 = AC^2$ satisfies converse of Pythagoras theorem.',
        'Equidistant point $P(x, y)$ from $A$ and $B$: $PA = PB \\iff PA^2 = PB^2$.'
      ],
      formulas: [
        { title: 'Distance Formula', latex: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}', description: 'Derived from Pythagoras theorem on the coordinate plane.' },
        { title: 'Distance from Origin', latex: 'd = \\sqrt{x^2 + y^2}', description: 'Special case when $(x_1, y_1) = (0,0)$.' }
      ],
      examTips: [
        'When equating distances $PA = PB$, square both sides immediately ($PA^2 = PB^2$) to avoid clumsy square roots.',
        'Carefully handle negative coordinates like $(x - (-3))^2 = (x + 3)^2$.'
      ]
    }
  }
};
