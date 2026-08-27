import type { MathQuestion, Operation } from '../types/math';

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomOperand(difficulty: number): number {
  difficulty = Math.floor(difficulty);
  const min = Math.pow(10, difficulty - 1);
  const max = Math.pow(10, difficulty) - 1;

  return generateRandomNumber(min, max);
}

function getModDiff(difficulty: number): { a: number, b: number } {
  if (difficulty < 2) return { a: generateRandomNumber(1, 9), b: generateRandomNumber(1, 9) };
  if (difficulty < 3) return { a: generateRandomNumber(11, 99), b: generateRandomNumber(1, 10) };
  if (difficulty < 4) return { a: generateRandomNumber(11, 200), b: generateRandomNumber(2, 10) };

  if (generateRandomNumber(0, 1) === 0) {
    if (difficulty < 5) return { a: generateRandomNumber(10, 80), b: generateRandomNumber(10, 15) };
    if (difficulty < 6) return { a: generateRandomNumber(10, 120), b: generateRandomNumber(10, 21) };
    if (difficulty < 7) return { a: generateRandomNumber(20, 200), b: generateRandomNumber(11, 30) };
    return { a: generateRandomNumber(101, 1200), b: generateRandomNumber(11, 50) };
  } else {
    if (difficulty < 5) return { a: generateRandomNumber(100, 999), b: generateRandomNumber(2, 10) };
    if (difficulty < 6) return { a: generateRandomNumber(1000, 2000), b: generateRandomNumber(2, 9) };
    if (difficulty < 7) return { a: generateRandomNumber(2000, 9000), b: generateRandomNumber(2, 9) };
    return { a: generateRandomNumber(9000, 18000), b: generateRandomNumber(2, 9) };
  }

}

export function generateArithmeticQuestion(difficulty: number): MathQuestion {
  const operations: Operation[] = ['+', '-', '*', '/'];
  const op = operations[generateRandomNumber(0, operations.length - 1)];

  let num1: number;
  let num2: number;
  let answer: number;

  let latex = '';

  switch (op) {
    case '+':
      num1 = generateRandomOperand(difficulty);
      num2 = generateRandomOperand(difficulty);
      answer = num1 + num2;
      latex = `${num1} + ${num2} = ?`;
      break;
    case '-':
      num1 = generateRandomOperand(difficulty);
      num2 = generateRandomOperand(difficulty);
      answer = num1 - num2;
      latex = `${num1} - ${num2} = ?`;
      break;
    case '*':
      const { a, b } = getModDiff(difficulty);
      num1 = a;
      num2 = b;
      answer = num1 * num2;
      latex = `${num1} \\times ${num2} = ?`;
      break;
    case '/': {
      const { a, b } = getModDiff(difficulty);
      num1 = a;
      num2 = b;

      const dividend = num1 * num2;
      const divisor = num1;
      answer = num2;
      latex = `${dividend} \\div ${divisor} = ?`;

      break;
    }
  }

  return {
    id: crypto.randomUUID(),
    latex,
    correctAnswer: answer,
    difficulty
  }
}



