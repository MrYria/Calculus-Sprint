interface IGameOverActionsProps {
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export function GameOverActions({ onPlayAgain, onBackToMenu }: IGameOverActionsProps) {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button
        onClick={onPlayAgain}
        style={{
          flex: 1,
          padding: '14px',
          backgroundColor: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
        }}
      >
        🔄 Play Again
      </button>

      <button
        onClick={onBackToMenu}
        style={{
          flex: 1,
          padding: '14px',
          backgroundColor: '#27272a',
          color: '#e4e4e7',
          border: '1px solid #3f3f46',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
      >
        🏠 Main Menu
      </button>
    </div>
  );
}