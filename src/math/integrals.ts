import type { MathQuestion } from '../types/math';

function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatTerm(coeff: number, powerStr: string = ''): string {
    if (coeff === 0) return '';
    const sign = coeff > 0 ? '+ ' : '- ';
    const abs = Math.abs(coeff);
    const coeffStr = abs === 1 && powerStr !== '' ? '' : abs;
    return `${sign}${coeffStr}${powerStr} `;
}



export function generateIntegralsQuestion(difficulty: number): MathQuestion {
  let answer = 0;
  let latex = '';

  if (difficulty < 2) {
    const roll = generateRandomNumber(0, 1);

    if (roll === 0) {
      const a = generateRandomNumber(0, 2);
      const b = a + generateRandomNumber(2, 6);
      const c = generateRandomNumber(2, 9);
      answer = c * (b - a);
      latex = `\\int_{${a}}^{${b}} ${c} \\, dx = ?`;
    } else {
      const k = generateRandomNumber(1, 3);
      const a = generateRandomNumber(0, 2);
      const b = a + generateRandomNumber(1, 4);
      answer = k * (b * b - a * a);
      latex = `\\int_{${a}}^{${b}} ${2 * k === 1 ? '' : 2 * k}x \\, dx = ?`;
    }
  }

  else if (difficulty < 3) {
    const roll = generateRandomNumber(0, 1);

    if (roll === 0) {
      const c2 = generateRandomNumber(-3, 4);
      const c1 = generateRandomNumber(-5, 6);
      const a = generateRandomNumber(0, 1);
      const b = a + generateRandomNumber(1, 3);

      const Fa = c2 * a * a + c1 * a;
      const Fb = c2 * b * b + c1 * b;
      answer = Fb - Fa;

      const poly = formatPolynomialTerms([
        { coeff: 2 * c2, power: 'x' },
        { coeff: c1, power: '' },
      ]);
      latex = `\\int_{${a}}^{${b}} (${poly}) \\, dx = ?`;
    } else {
      const c3 = generateRandomNumber(1, 3);
      const c1 = generateRandomNumber(-4, 4);
      const a = generateRandomNumber(0, 1);
      const b = a + generateRandomNumber(1, 2);

      const Fa = c3 * a * a * a + c1 * a;
      const Fb = c3 * b * b * b + c1 * b;
      answer = Fb - Fa;

      const poly = formatPolynomialTerms([
        { coeff: 3 * c3, power: 'x^2' },
        { coeff: c1, power: '' },
      ]);
      latex = `\\int_{${a}}^{${b}} (${poly}) \\, dx = ?`;
    }
  }

  else if (difficulty < 4) {
    const roll = generateRandomNumber(0, 3);

    if (roll === 0) {
      const c3 = generateRandomNumber(1, 2);
      const c2 = generateRandomNumber(-2, 3);
      const c1 = generateRandomNumber(-4, 4);
      const a = generateRandomNumber(0, 1);
      const b = a + generateRandomNumber(1, 2);

      const Fa = c3 * Math.pow(a, 3) + c2 * Math.pow(a, 2) + c1 * a;
      const Fb = c3 * Math.pow(b, 3) + c2 * Math.pow(b, 2) + c1 * b;
      answer = Fb - Fa;

      const poly = formatPolynomialTerms([
        { coeff: 3 * c3, power: 'x^2' },
        { coeff: 2 * c2, power: 'x' },
        { coeff: c1, power: '' },
      ]);
      latex = `\\int_{${a}}^{${b}} (${poly}) \\, dx = ?`;
    } else if (roll === 1) {
      const k = generateRandomNumber(2, 7);
      const m = generateRandomNumber(-4, 5);
      answer = 2 * k;
      const mStr = m !== 0 ? (m > 0 ? `+ ${m}\\cos(x)` : `- ${Math.abs(m)}\\cos(x)`) : '';
      latex = `\\int_{0}^{\\pi} (${k}\\sin(x) ${mStr}) \\, dx = ?`;
    } else if (roll === 2) {
      const a = generateRandomNumber(2, 7);
      const b = generateRandomNumber(1, 5);
      answer = a - b;
      latex = `\\int_{0}^{\\frac{\\pi}{2}} (${a}\\cos(x) - ${b}\\sin(x)) \\, dx = ?`;
    } else {
      const a = generateRandomNumber(2, 5);
      const cOdd = generateRandomNumber(1, 4);
      const cEven = generateRandomNumber(2, 6);
      answer = cEven * (2 * a);
      latex = `\\int_{-${a}}^{${a}} (${cOdd === 1 ? '' : cOdd}x^3 + ${cEven}) \\, dx = ?`;
    }
  }

  else if (difficulty < 5) {
    const roll = generateRandomNumber(0, 3);

    if (roll === 0) {
      const m = generateRandomNumber(1, 3);
      const k = generateRandomNumber(2, 7);
      answer = k * m;
      const upper = m === 1 ? 'e' : `e^{${m}}`;
      latex = `\\int_{1}^{${upper}} \\frac{${k}}{x} \\, dx = ?`;
    } else if (roll === 1) {
      const m = generateRandomNumber(3, 7);
      const k = generateRandomNumber(2, 5);
      answer = k * (m - 1);
      latex = `\\int_{0}^{\\ln(${m})} ${k}e^x \\, dx = ?`;
    } else if (roll === 2) {
      const pairs = [
        { a: 1, b: 4, diff: 1 },
        { a: 1, b: 9, diff: 2 },
        { a: 4, b: 9, diff: 1 },
        { a: 4, b: 16, diff: 2 },
      ];
      const p = pairs[generateRandomNumber(0, pairs.length - 1)];
      const k = generateRandomNumber(2, 6);
      answer = k * p.diff;
      latex = `\\int_{${p.a}}^{${p.b}} \\frac{${k}}{2\\sqrt{x}} \\, dx = ?`;
    } else {
      const k = generateRandomNumber(1, 3);
      const a = generateRandomNumber(0, 1);
      const b = 2;
      answer = k * (Math.pow(b, 4) - Math.pow(a, 4));
      latex = `\\int_{${a}}^{${b}} ${4 * k}x^3 \\, dx = ?`;
    }
  }


  else if (difficulty < 6) {
    const roll = generateRandomNumber(0, 2);

    if (roll === 0) {
      const k = generateRandomNumber(1, 3);
      const c = generateRandomNumber(1, 2);
      const a = 0;
      const b = generateRandomNumber(1, 2);

      const Fa = k * Math.pow(a + c, 3);
      const Fb = k * Math.pow(b + c, 3);
      answer = Fb - Fa;

      latex = `\\int_{${a}}^{${b}} ${3 * k}(x + ${c})^2 \\, dx = ?`;
    } else if (roll === 1) {
      const k = generateRandomNumber(1, 3);
      const a = 1;
      const b = generateRandomNumber(2, 3);

      const Fa = 0; 
      const Fb = k * Math.pow(b - 1, 4);
      answer = Fb - Fa;

      latex = `\\int_{${a}}^{${b}} ${4 * k}(x - 1)^3 \\, dx = ?`;
    } else {
      const k = generateRandomNumber(2, 8);
      answer = k;
      latex = `\\int_{0}^{\\frac{\\pi}{4}} \\frac{${k}}{\\cos^2(x)} \\, dx = ?`;
    }
  }


  else if (difficulty < 7) {
    const roll = generateRandomNumber(0, 2);

    if (roll === 0) {
      const k = generateRandomNumber(1, 3);
      const c = generateRandomNumber(1, 2);
      const a = 0;
      const b = 1;

      const Fa = k * Math.pow(a * a + c, 3);
      const Fb = k * Math.pow(b * b + c, 3);
      answer = Fb - Fa;

      const cStr = formatTerm(c);
      latex = `\\int_{0}^{1} ${6 * k}x(x^2 ${cStr})^2 \\, dx = ?`;
    } else if (roll === 1) {
      const k = generateRandomNumber(1, 2);
      const Fa = k * Math.pow(0 + 1, 2); 
      const Fb = k * Math.pow(4 + 1, 2); 
      answer = Fb - Fa; 

      latex = `\\int_{0}^{2} ${4 * k}x(x^2 + 1) \\, dx = ?`;
    } else {
      const k = generateRandomNumber(2, 7);
      answer = k;
      latex = `\\int_{0}^{\\frac{\\pi}{2}} ${3 * k}\\sin^2(x)\\cos(x) \\, dx = ?`;
    }
  }

  else {
    const roll = generateRandomNumber(0, 3);

    if (roll === 0) {
      const n = generateRandomNumber(2, 4);
      const k = generateRandomNumber(2, 6);
      const coeff = k * (n + 1);
      answer = k;
      latex = `\\int_{1}^{e} \\frac{${coeff}\\ln^{${n}}(x)}{x} \\, dx = ?`;
    } else if (roll === 1) {
      const k = generateRandomNumber(1, 3);
      answer = 27 * k;
      latex = `\\int_{1}^{2} ${6 * k}x(x^2 - 1)^2 \\, dx = ?`;
    } else if (roll === 2) {
      const k = generateRandomNumber(1, 5);
      answer = 2 * k;
      latex = `\\int_{0}^{\\sqrt{7}} \\frac{${2 * k}x}{\\sqrt{x^2 + 9}} \\, dx = ?`;
    } else {
      const k = generateRandomNumber(2, 8);
      answer = k;
      latex = `\\int_{0}^{\\frac{\\pi}{2}} ${4 * k}\\sin^3(x)\\cos(x) \\, dx = ?`;
    }
  }

  return {
    id: crypto.randomUUID(),
    latex,
    correctAnswer: answer,
    difficulty,
  };
}