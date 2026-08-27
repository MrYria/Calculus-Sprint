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

export function generateDerivativesQuestion(difficulty: number): MathQuestion {
  let answer = 0;
  let latex = '';

  if (difficulty < 2) {
    const roll = generateRandomNumber(0, 2);
    const x0 = generateRandomNumber(1, 5);

    if (roll === 0) {
      const c = generateRandomNumber(10, 100);
      answer = 0;
      latex = `f(x) = ${c}, \\quad f'(${x0}) = ?`;
    } else if (roll === 1) {
      const a = generateRandomNumber(2, 9);
      const b = generateRandomNumber(-10, 10);
      answer = a;
      const bStr = b !== 0 ? formatTerm(b) : '';
      latex = `f(x) = ${a}x ${bStr}, \\quad f'(${x0}) = ?`;
    } else {
      const a = generateRandomNumber(2, 6);
      answer = 2 * a * x0;
      latex = `f(x) = ${a}x^2, \\quad f'(${x0}) = ?`;
    }
  }

  else if (difficulty < 3) {
    const roll = generateRandomNumber(0, 1);
    const x0 = generateRandomNumber(1, 3);

    if (roll === 0) {
      const a = generateRandomNumber(1, 4);
      const b = generateRandomNumber(-6, 6);
      const c = generateRandomNumber(-10, 10);
      answer = 2 * a * x0 + b;

      const aStr = a === 1 ? 'x^2' : `${a}x^2`;
      latex = `f(x) = ${aStr} ${formatTerm(b, 'x')} ${formatTerm(c)}, \\quad f'(${x0}) = ?`;
    } else {
      const a = generateRandomNumber(1, 2);
      const b = generateRandomNumber(-5, 5);
      answer = 3 * a * (x0 * x0) + b;

      const aStr = a === 1 ? 'x^3' : `${a}x^3`;
      latex = `f(x) = ${aStr} ${formatTerm(b, 'x')}, \\quad f'(${x0}) = ?`;
    }
  }

  else if (difficulty < 4) {
    const roll = generateRandomNumber(0, 3);

    if (roll === 0) {
      const x0 = generateRandomNumber(1, 2);
      const a = 1;
      const b = generateRandomNumber(-3, 3);
      const c = generateRandomNumber(-5, 5);
      const d = generateRandomNumber(-10, 10);

      answer = 3 * a * (x0 * x0) + 2 * b * x0 + c;
      latex = `f(x) = x^3 ${formatTerm(b, 'x^2')} ${formatTerm(c, 'x')} ${formatTerm(d)}, \\quad f'(${x0}) = ?`;
    } else if (roll === 1) {
      const a = generateRandomNumber(2, 6);
      const k = generateRandomNumber(2, 4);
      answer = a * k;
      latex = `f(x) = ${a}\\sin(${k}x), \\quad f'(0) = ?`;
    } else if (roll === 2) {
      const a = generateRandomNumber(2, 9);
      answer = -a;
      latex = `f(x) = ${a}\\cos(x), \\quad f'\\left(\\frac{\\pi}{2}\\right) = ?`;
    } else {
      const a = generateRandomNumber(1, 5);
      answer = 2 * a;
      latex = `f(x) = ${a === 1 ? '' : a}\\tan(x), \\quad f'\\left(\\frac{\\pi}{4}\\right) = ?`;
    }
  }
  else if (difficulty < 5) {
    const roll = generateRandomNumber(0, 3);

    if (roll === 0) {
      const a = 1;
      const b = generateRandomNumber(-2, 2);
      const c = generateRandomNumber(-3, 3);
      const d = generateRandomNumber(-5, 5);
      const e = generateRandomNumber(-10, 10);

      answer = 4 * a + 3 * b + 2 * c + d;
      latex = `f(x) = x^4 ${formatTerm(b, 'x^3')} ${formatTerm(c, 'x^2')} ${formatTerm(d, 'x')} ${formatTerm(e)}, \\quad f'(1) = ?`;
    } else if (roll === 1) {
      const a = generateRandomNumber(2, 7);
      const k = generateRandomNumber(2, 5);
      answer = a * k;
      latex = `f(x) = ${a}e^{${k}x}, \\quad f'(0) = ?`;
    } else if (roll === 2) {
      const x0 = generateRandomNumber(2, 5);
      const k = generateRandomNumber(2, 6);
      const a = k * x0;
      answer = k;
      latex = `f(x) = ${a}\\ln(x), \\quad f'(${x0}) = ?`;
    } else {
      const roots = [{ x0: 4, sqrt: 2 }, { x0: 9, sqrt: 3 }];
      const selected = roots[generateRandomNumber(0, roots.length - 1)];
      const k = generateRandomNumber(1, 5);
      const a = k * (2 * selected.sqrt);
      answer = k;
      latex = `f(x) = ${a}\\sqrt{x}, \\quad f'(${selected.x0}) = ?`;
    }
  }
  else if (difficulty < 6) {
    const roll = generateRandomNumber(0, 2);

    if (roll === 0) {
      const a = generateRandomNumber(2, 5);
      const k = generateRandomNumber(2, 4);
      const b = generateRandomNumber(2, 5);
      const c = generateRandomNumber(-6, 6);

      answer = a * k + c;
      latex = `f(x) = ${a}e^{${k}x} ${formatTerm(b, 'x^2')} ${formatTerm(c, 'x')}, \\quad f'(0) = ?`;
    } else if (roll === 1) {
      const a = generateRandomNumber(2, 6);
      const k = generateRandomNumber(2, 4);
      const b = generateRandomNumber(2, 8);
      const m = generateRandomNumber(2, 5);

      answer = a * k;
      latex = `f(x) = ${a}\\sin(${k}x) ${formatTerm(b, `\\cos(${m}x)`)}, \\quad f'(0) = ?`;
    } else {
      const x0 = generateRandomNumber(2, 4);
      const k = generateRandomNumber(3, 7);
      const a = k * x0;
      const b = generateRandomNumber(1, 5);

      answer = k - b;
      latex = `f(x) = ${a}\\ln(x) ${formatTerm(-b, 'x')}, \\quad f'(${x0}) = ?`;
    }
  }
  else if (difficulty < 7) {
    const roll = generateRandomNumber(0, 2);

    if (roll === 0) {
      const a = generateRandomNumber(1, 3);
      const b = generateRandomNumber(1, 4);
      const c = generateRandomNumber(1, 3);
      const d = generateRandomNumber(1, 3);

      answer = a * (c + d) + c * (a + b);
      latex = `f(x) = (${a}x + ${b})(${c}x + ${d}), \\quad f'(1) = ?`;
    } else if (roll === 1) {
      const a = generateRandomNumber(2, 6);
      const b = generateRandomNumber(1, 4);
      const c = generateRandomNumber(1, 3);

      answer = a - b * c;
      latex = `f(x) = \\frac{${a}x + ${b}}{${c}x + 1}, \\quad f'(0) = ?`;
    } else {
      const a = generateRandomNumber(2, 4);
      const x0 = generateRandomNumber(1, 3);
      const b = 1 - a * x0; 

      answer = 3 * a;
      const bStr = formatTerm(b);
      latex = `f(x) = (${a}x ${bStr})^3, \\quad f'(${x0}) = ?`;
    }
  }
  else {
    const roll = generateRandomNumber(0, 5);

    if (roll === 0) {
      const a = generateRandomNumber(1, 4);
      const k = generateRandomNumber(a + 1, a + 6);
      answer = k - a;
      latex = `f(x) = \\frac{e^{${k}x}}{${a === 1 ? '' : a}x + 1}, \\quad f'(0) = ?`;
    } else if (roll === 1) {
      const k = generateRandomNumber(1, 3);
      const targetNumerator = 6 * k; 
      const a = generateRandomNumber(2, 4);
      const b = targetNumerator - 2 * a;
      const c = 9 - a - b;

      answer = k;
      latex = `f(x) = \\sqrt{${a}x^2 ${formatTerm(b, 'x')} ${formatTerm(c)}}, \\quad f'(1) = ?`;
    } else if (roll === 2) {

      const c = generateRandomNumber(2, 6);
      const d = generateRandomNumber(2, 5);
      const k = generateRandomNumber(2, 4);
      answer = c + d * k;
      latex = `f(x) = (${c}x + ${d})e^{${k}x}, \\quad f'(0) = ?`;
    } else if (roll === 3) {
      const b = generateRandomNumber(2, 4);
      const c = generateRandomNumber(1, 3);
      const k = generateRandomNumber(b * c + 1, b * c + 6);
      answer = k - b * c;
      latex = `f(x) = \\frac{\\sin(${k}x) + ${b}}{${c === 1 ? '' : c}x + 1}, \\quad f'(0) = ?`;
    } else if (roll === 4) {
      const a = generateRandomNumber(2, 4);
      const b = generateRandomNumber(-4, -1);
      const c = 1 - a - b; 
      answer = 3 * (2 * a + b); 
      latex = `f(x) = (${a}x^2 ${formatTerm(b, 'x')} ${formatTerm(c)})^3, \\quad f'(1) = ?`;
    } else {

      const a = generateRandomNumber(2, 5);
      const b = generateRandomNumber(3, 8);
      const c = generateRandomNumber(-9, 9);
      answer = b + c;
      latex = `f(x) = e^{${a}x^2 ${formatTerm(b, 'x')}} ${formatTerm(c, 'x')}, \\quad f'(0) = ?`;
    }
  }

  return {
    id: crypto.randomUUID(),
    latex,
    correctAnswer: answer,
    difficulty,
  };
}