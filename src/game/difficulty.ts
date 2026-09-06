export function getBonusTimeForLevel(level: number): number {
  switch (level) {
    case 2: return 10;
    case 3: return 20;
    case 4: return 40;
    case 5: return 60;
    case 6: return 120;
    case 7: return 240;
    default: return 0;
  }
}

