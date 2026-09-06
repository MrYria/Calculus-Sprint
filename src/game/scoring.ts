export function calculateScore(basePoints: number, streak: number): number {
  return basePoints * (streak + 1);
}