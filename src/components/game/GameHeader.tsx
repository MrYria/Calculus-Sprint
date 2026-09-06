interface IGameHeaderProps {
  timeLeft: number;
  score: number;
  difficulty: number;
  streak: number;
  isSprint: boolean;
  onBackMenu: () => void;
}


export function GameHeader({
  timeLeft,
  score,
  difficulty,
  streak,
  isSprint,
  onBackMenu,
}: IGameHeaderProps) {
  return (
    <header style={{ marginBottom: '24px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <button
          onClick={onBackMenu}
          style={{
            background: '#27272a',
            border: 'none',
            color: '#a1a1aa',
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          ← Menu
        </button>

        {isSprint ? (
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: timeLeft <= 10 ? '#ef4444' : '#fbbf24',
              transition: 'color 0.2s',
            }}
          >
            ⏱️ {timeLeft}s
          </div>
        ) : (
          <div style={{ color: '#a1a1aa', fontSize: '14px' }}>🧘 Zen Mode</div>
        )}

        <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Score: {score}</div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '14px',
          color: '#a1a1aa',
          borderTop: '1px solid #27272a',
          paddingTop: '8px',
        }}
      >
        <span>⭐ Level: {difficulty.toFixed(1)}</span>
        <span style={{ color: streak > 1 ? '#f97316' : '#71717a', fontWeight: 'bold' }}>
          🔥 Combo: x{streak + 1}
        </span>
      </div>
    </header>
  );
}