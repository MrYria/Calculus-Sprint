interface IDifficultySelectorProps {
  difficulty: number;
  onDifficultyChange: (diff: number) => void;
}

export function DifficultySelector({
  difficulty,
  onDifficultyChange,
}: IDifficultySelectorProps) {
  const levels = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color: '#a1a1aa', fontSize: '14px', fontWeight: 'bold', marginRight: '12px' }}>
          Level / Stars:
        </span>
        <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '14px' }}>
          {difficulty.toFixed(1)} ★
        </span>
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        {levels.map((lvl) => {
          const isSelected = Math.floor(difficulty) === lvl;

          return (
            <button
              key={lvl}
              type="button"
              onClick={() => onDifficultyChange(lvl)}
              style={{
                flex: 1,
                padding: '8px 0',
                background: isSelected ? '#f59e0b' : '#27272a',
                color: isSelected ? '#000' : '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                transition: 'all 0.2s',
              }}
            >
              {lvl}★
            </button>
          );
        })}
      </div>
    </div>
  );
}