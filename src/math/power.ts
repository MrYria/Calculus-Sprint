import type { MathQuestion, PowerType } from '../types/math';

function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomMultipleOfFive(min: number, max: number): number {
    const steps = (max - min) / 5;
    const randomStep = Math.floor(Math.random() * (steps + 1));
    return min + randomStep * 5;
}




function logDiff(difficulty: number): { base: number; answer: number } {
  if (difficulty < 2) {
    const bases = [2, 10, 3];
    const base = bases[generateRandomNumber(0, bases.length - 1)];
    return { base, answer: generateRandomNumber(2, 3) };
  }
  if (difficulty < 4) {
    const roll = generateRandomNumber(0, 2);
    if (roll === 0) return { base: 2, answer: generateRandomNumber(4, 6) }; 
    if (roll === 1) return { base: 10, answer: generateRandomNumber(3, 5) }; 
    return { base: 3, answer: generateRandomNumber(3, 4) }; 
  }
  if (difficulty < 6) {
    const roll = generateRandomNumber(0, 2);
    if (roll === 0) return { base: 2, answer: generateRandomNumber(7, 10) }; 
    if (roll === 1) return { base: 5, answer: generateRandomNumber(3, 4) };
    return { base: 3, answer: generateRandomNumber(4, 5) }; 
  }

  const roll = generateRandomNumber(0, 3);
  if (roll === 0) {
    return { base: 2, answer: generateRandomNumber(11, 16) };
  }
  if (roll === 1) {
    return { base: 10, answer: generateRandomNumber(6, 8) };
  }
  if (roll === 2) {
    return { base: 3, answer: generateRandomNumber(5, 7) };
  }
  const base = generateRandomNumber(6, 8);
  return { base, answer: generateRandomNumber(3, 4) };
}

function powerDiff(difficulty: number): { a: number, b: number } {
    const powerType = generateRandomNumber(0, 2)

    if (difficulty < 2) return { a: generateRandomNumber(1, 10), b: 2 };

    switch (powerType) {
        default:
        case 0:
            if (difficulty < 3) return { a: generateRandomNumber(7, 16), b: 2 };
            if (difficulty < 4) return { a: generateRandomNumber(15, 22), b: 2 };
            if (difficulty < 5) return { a: generateRandomNumber(21, 26), b: 2 };
            if (difficulty < 6) return { a: getRandomMultipleOfFive(25, 100), b: 2 };
            return { a: generateRandomNumber(36, 50), b: 2 };
        case 1:
            if (difficulty < 3) return { a: 2, b: generateRandomNumber(3, 7) };
            if (difficulty < 4) return { a: 2, b: generateRandomNumber(7, 11) };
            if (difficulty < 5) return { a: 3, b: generateRandomNumber(3, 6) };
            if (difficulty < 6) return { a: 2, b: generateRandomNumber(11, 13) };
            return { a: 2, b: generateRandomNumber(14, 18) };
        case 2:
            if (difficulty < 3) return { a: generateRandomNumber(2, 5), b: 3 };
            if (difficulty < 4) return { a: generateRandomNumber(6, 9), b: 3 };
            if (difficulty < 5) return { a: generateRandomNumber(2, 5), b: 4 };
            if (difficulty < 6) return { a: generateRandomNumber(10, 15), b: 3 };
            return { a: generateRandomNumber(6, 10), b: 4 };
    }
}


export function generatePowersQuestion(difficulty: number): MathQuestion {
    const powertypes: PowerType[] = ['root', 'power', 'log']
    const op = powertypes[generateRandomNumber(0, powertypes.length - 1)];

    let answer: number = 0;
    let latex = '';

    switch (op) {
        case 'power':
            const { a, b } = powerDiff(difficulty);
            let power_base = a;
            let exp = b;
            answer = Math.pow(power_base, exp);
            latex = `${power_base}^{${exp}}`
            break;

        case 'root': {
            const { a, b } = powerDiff(difficulty);

            answer = a;
            const degree = b;
            const x = Math.pow(a, b);

            if (degree === 2) {
                latex = `\\sqrt{${x}} = ?`;
            } else {
                latex = `\\sqrt[${degree}]{${x}} = ?`;
            }
        }
            break;
        case 'log':
            const { base, answer: ans } = logDiff(difficulty);

            const x = Math.pow(base, ans);
            answer = ans;

            latex = `\\log_{${base}}(${x}) = ?`;
            break;
    }
    return {
        id: crypto.randomUUID(),
        latex,
        correctAnswer: answer,
        difficulty
    }
}