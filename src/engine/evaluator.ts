import * as math from 'mathjs';

export interface EvaluationResult {
  isCorrect: boolean;
  message?: string;
  normalizedUserAnswer: string;
  normalizedExpectedAnswer: string;
}

/**
 * Recursively parses and converts LaTeX \frac{num}{den} to ((num)/(den))
 * with full support for arbitrarily nested braces.
 */
function replaceLatexFractions(str: string): string {
  let result = str;
  while (true) {
    const fracIdx = result.indexOf('\\frac');
    if (fracIdx === -1) break;

    const open1 = result.indexOf('{', fracIdx);
    if (open1 === -1) break;

    let depth = 0;
    let close1 = -1;
    for (let i = open1; i < result.length; i++) {
      if (result[i] === '{') depth++;
      else if (result[i] === '}') {
        depth--;
        if (depth === 0) {
          close1 = i;
          break;
        }
      }
    }
    if (close1 === -1) break;

    let open2 = -1;
    for (let i = close1 + 1; i < result.length; i++) {
      if (/\s/.test(result[i])) continue;
      if (result[i] === '{') {
        open2 = i;
        break;
      }
      break;
    }
    if (open2 === -1) break;

    depth = 0;
    let close2 = -1;
    for (let i = open2; i < result.length; i++) {
      if (result[i] === '{') depth++;
      else if (result[i] === '}') {
        depth--;
        if (depth === 0) {
          close2 = i;
          break;
        }
      }
    }
    if (close2 === -1) break;

    const num = result.slice(open1 + 1, close1);
    const den = result.slice(open2 + 1, close2);

    result = result.slice(0, fracIdx) + `((${num})/(${den}))` + result.slice(close2 + 1);
  }
  return result;
}

/**
 * Converts LaTeX \sqrt{...} to sqrt(...) with support for nested braces.
 */
function replaceLatexSqrt(str: string): string {
  let result = str;
  while (true) {
    const sqrtIdx = result.indexOf('\\sqrt');
    if (sqrtIdx === -1) break;
    const open = result.indexOf('{', sqrtIdx);
    if (open === -1 || open > sqrtIdx + 7) {
      result = result.replace(/\\sqrt\s*([0-9a-zA-Z]+)/, 'sqrt($1)');
      break;
    }
    let depth = 0;
    let close = -1;
    for (let i = open; i < result.length; i++) {
      if (result[i] === '{') depth++;
      else if (result[i] === '}') {
        depth--;
        if (depth === 0) {
          close = i;
          break;
        }
      }
    }
    if (close === -1) break;
    const inner = result.slice(open + 1, close);
    result = result.slice(0, sqrtIdx) + `sqrt(${inner})` + result.slice(close + 1);
  }
  return result;
}

/**
 * Normalizes input strings by converting common KaTeX/LaTeX patterns
 * and cleaning formatting, punctuation, units, etc.
 */
export function normalizeMathString(str: string): string {
  if (!str) return '';
  let s = str.trim();

  // Strip enclosing $ or $$ if user pasted LaTeX
  s = s.replace(/^\$+|\$+$/g, '').trim();

  // Common units and currency symbols to strip
  s = s.replace(/₹|Rs\.?|INR/gi, '');
  s = s.replace(/[°%]/g, '');
  s = s.replace(/\b(cm\^2|cm\^3|sq\.?\s*cm|cubic\s*cm|sq\s*units|units\^2|units|cm|m\^2|m\^3|sq\.?\s*m|m|km|km\/h|km\/hr|degrees?)\b/gi, '');

  // Strip thousands separator commas like in 1,250 or 12,500 (not followed by a space)
  while (/(\d),(\d{3})(?=\D|$)/.test(s)) {
    s = s.replace(/(\d),(\d{3})(?=\D|$)/g, '$1$2');
  }

  // Unicode square root normalization
  s = s.replace(/√\s*\{([^{}]+)\}/g, 'sqrt($1)');
  s = s.replace(/√\s*\(([^()]+)\)/g, 'sqrt($1)');
  s = s.replace(/√\s*([0-9a-zA-Z]+)/g, 'sqrt($1)');
  s = s.replace(/√/g, 'sqrt');

  // LaTeX fraction and sqrt parsing with nested brace support
  s = replaceLatexFractions(s);
  s = replaceLatexSqrt(s);

  // Mixed fractions: 1 1/2 -> (1 + 1/2)
  s = s.replace(/(\d+)\s+(\d+)\/(\d+)/g, '($1 + $2/$3)');

  // Implicit multiplication: 2sqrt(3) -> 2*sqrt(3), 2(3) -> 2*(3)
  s = s.replace(/(\d)\s*sqrt\(/g, '$1*sqrt(');
  s = s.replace(/(\d)\s*\(/g, '$1*(');

  // LaTeX operators & symbols
  s = s.replace(/\\times|\\cdot/g, '*');
  s = s.replace(/\\div/g, '/');
  s = s.replace(/\\pm/g, '+-');
  s = s.replace(/\\pi/g, 'pi');
  s = s.replace(/\\left|\\right/g, '');

  // Remove leading variable names like "x = ", "CI = ", "A = ", "Area = ", "ans = "
  s = s.replace(/^(?:[a-zA-Z]+|\w+)\s*=\s*/, '');

  // Replace unicode minus and multiplication
  s = s.replace(/[\u2212\u2013\u2014]/g, '-');
  s = s.replace(/[\u00D7\u22C5]/g, '*');

  // Collapse whitespaces
  s = s.replace(/\s+/g, ' ').trim();

  return s;
}

/**
 * Parses coordinate format: (x, y) or x, y
 */
function parseCoordinate(str: string): [number, number] | null {
  const cleaned = str.replace(/[()[\]]/g, '').trim();
  const parts = cleaned.split(',').map(p => p.trim());
  if (parts.length === 2) {
    try {
      const x = Number(math.evaluate(parts[0]));
      const y = Number(math.evaluate(parts[1]));
      if (!isNaN(x) && !isNaN(y)) {
        return [x, y];
      }
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Parses comma-separated values (roots, sets, etc.)
 * e.g., "x = 2, 3" or "2, -3" or "sqrt(2), -sqrt(2)"
 */
function parseCommaSet(str: string): number[] | null {
  // Strip "x ="
  const cleaned = str.replace(/^[a-zA-Z]\s*=\s*/, '').replace(/or/gi, ',');
  const parts = cleaned.split(',').map(p => p.trim().replace(/^[a-zA-Z]\s*=\s*/, '')).filter(Boolean);
  if (parts.length > 1) {
    const nums: number[] = [];
    for (const p of parts) {
      try {
        const val = Number(math.evaluate(p));
        if (isNaN(val)) return null;
        nums.push(val);
      } catch {
        return null;
      }
    }
    return nums.sort((a, b) => a - b);
  }
  return null;
}

/**
 * Checks algebraic equivalence across random test points using mathjs
 */
function checkAlgebraicEquivalence(expr1: string, expr2: string): boolean {
  try {
    const node1 = math.parse(expr1);
    const node2 = math.parse(expr2);

    const compiled1 = node1.compile();
    const compiled2 = node2.compile();

    // Test across several non-trivial random points
    const testPoints = [
      { x: 2.3, y: 1.7, a: 3.1, b: 2.2, c: 1.5, z: 0.8 },
      { x: -1.8, y: 3.4, a: -2.5, b: 4.1, c: -1.2, z: 2.6 },
      { x: 0.7, y: -2.9, a: 1.4, b: -3.3, c: 2.8, z: -1.1 },
      { x: 3.5, y: 0.6, a: -1.1, b: 0.9, c: 3.4, z: 1.9 },
      { x: -2.1, y: -1.3, a: 2.7, b: -1.8, c: -2.4, z: -0.7 }
    ];

    for (const scope of testPoints) {
      try {
        const val1 = Number(compiled1.evaluate(scope));
        const val2 = Number(compiled2.evaluate(scope));

        if (isNaN(val1) || isNaN(val2)) continue;
        if (!isFinite(val1) || !isFinite(val2)) continue;

        const diff = Math.abs(val1 - val2);
        const maxMag = Math.max(Math.abs(val1), Math.abs(val2), 1);
        if (diff / maxMag > 1e-4) {
          return false;
        }
      } catch {
        // If evaluation fails at a particular point (e.g. division by zero), continue to next
      }
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Main Answer Evaluation function
 */
export function evaluateAnswer(
  userAnswer: string,
  expectedAnswer: string,
  options: {
    tolerance?: number;
    acceptableAnswers?: string[];
    isExpression?: boolean;
  } = {}
): EvaluationResult {
  const normUser = normalizeMathString(userAnswer);
  const normExp = normalizeMathString(expectedAnswer);

  const result: EvaluationResult = {
    isCorrect: false,
    normalizedUserAnswer: normUser,
    normalizedExpectedAnswer: normExp
  };

  if (!normUser) {
    return result;
  }

  // 1. Direct normalized match
  if (normUser.toLowerCase() === normExp.toLowerCase()) {
    result.isCorrect = true;
    return result;
  }

  // 1b. Cleaned textual match (ignoring hyphens and punctuation for pure word classifications like "right-angled scalene")
  if (/^[a-zA-Z\s-]+$/.test(normExp.trim()) && /^[a-zA-Z\s-]+$/.test(normUser.trim())) {
    const cleanWordText = (t: string) => t.toLowerCase().replace(/[^a-z]/g, ' ').replace(/\s+/g, ' ').trim();
    if (cleanWordText(normUser) === cleanWordText(normExp)) {
      result.isCorrect = true;
      return result;
    }
  }

  // 2. Check acceptable alternative answers
  if (options.acceptableAnswers && options.acceptableAnswers.length > 0) {
    for (const alt of options.acceptableAnswers) {
      const normAlt = normalizeMathString(alt);
      if (normUser.toLowerCase() === normAlt.toLowerCase()) {
        result.isCorrect = true;
        return result;
      }
      if (/^[a-zA-Z\s-]+$/.test(normAlt.trim()) && /^[a-zA-Z\s-]+$/.test(normUser.trim())) {
        const cleanWordText = (t: string) => t.toLowerCase().replace(/[^a-z]/g, ' ').replace(/\s+/g, ' ').trim();
        if (cleanWordText(normUser) === cleanWordText(normAlt)) {
          result.isCorrect = true;
          return result;
        }
      }
    }
  }

  // 3. Coordinate comparison (e.g. (2, -5))
  const userCoord = parseCoordinate(normUser);
  const expCoord = parseCoordinate(normExp);
  if (userCoord && expCoord) {
    const tol = options.tolerance ?? 1e-4;
    if (Math.abs(userCoord[0] - expCoord[0]) <= tol && Math.abs(userCoord[1] - expCoord[1]) <= tol) {
      result.isCorrect = true;
      return result;
    }
  }

  // 4. Set/Roots comparison (e.g. roots: "2, -3" vs "-3, 2")
  const userSet = parseCommaSet(normUser);
  const expSet = parseCommaSet(normExp);
  if (userSet && expSet && userSet.length === expSet.length) {
    const tol = options.tolerance ?? 1e-4;
    const allMatch = userSet.every((val, i) => Math.abs(val - expSet[i]) <= tol);
    if (allMatch) {
      result.isCorrect = true;
      return result;
    }
  }

  // 5. Algebraic expression equivalence (e.g. (x+2)(x-3) vs (x-3)(x+2))
  if (/[a-zA-Z]/.test(normExp) && !/^pi$/i.test(normExp)) {
    if (checkAlgebraicEquivalence(normUser, normExp)) {
      result.isCorrect = true;
      return result;
    }
    if (options.acceptableAnswers) {
      for (const alt of options.acceptableAnswers) {
        if (checkAlgebraicEquivalence(normUser, normalizeMathString(alt))) {
          result.isCorrect = true;
          return result;
        }
      }
    }
  }

  // 6. Numerical evaluation (fractions, surds, decimals, rounding tolerance)
  try {
    const userVal = Number(math.evaluate(normUser));
    const expVal = Number(math.evaluate(normExp));

    if (!isNaN(userVal) && !isNaN(expVal)) {
      const tol = options.tolerance ?? 0.01;
      const diff = Math.abs(userVal - expVal);
      if (diff <= tol) {
        result.isCorrect = true;
        return result;
      }
    }
  } catch {
    // If math.evaluate fails, keep isCorrect as false
  }

  // 7. Check acceptable answers numerically as fallback
  if (options.acceptableAnswers) {
    for (const alt of options.acceptableAnswers) {
      try {
        const userVal = Number(math.evaluate(normUser));
        const altVal = Number(math.evaluate(normalizeMathString(alt)));
        if (!isNaN(userVal) && !isNaN(altVal)) {
          const tol = options.tolerance ?? 0.01;
          if (Math.abs(userVal - altVal) <= tol) {
            result.isCorrect = true;
            return result;
          }
        }
      } catch {
        // continue
      }
    }
  }

  return result;
}
