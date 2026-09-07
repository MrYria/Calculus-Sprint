interface IStatsSummaryProps {
    accuracy: number;
    correctAnswers: number;
    totalQuestions: number;
    maxStreak: number;
    maxDifficulty: number;
}

export function StatsSummary({
    accuracy,
    correctAnswers,
    totalQuestions,
    maxStreak,
    maxDifficulty,
}: IStatsSummaryProps) {
    const stats = [
    { label: 'Accuracy', value: `${accuracy}%`, color: accuracy >= 80 ? '#22c55e' : '#fbbf24' },
    { label: 'Solved', value: `${correctAnswers} / ${totalQuestions}`, color: '#fff' },
    { label: 'Max Combo', value: `🔥 x${maxStreak}`, color: '#f97316' },
    { label: 'Peak Level', value: `⭐ ${maxDifficulty.toFixed(1)}`, color: '#fbbf24' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        marginBottom: '24px',
      }}
    >
      {stats.map((s, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: '#27272a',
            borderRadius: '10px',
            padding: '12px 16px',
            border: '1px solid #3f3f46',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#a1a1aa', textTransform: 'uppercase' }}>
            {s.label}
          </span>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: s.color }}>
            {s.value}
          </span>
        </div>
      ))}
    </div>
  );
}