interface IGameOverHeaderProps {
  score: number;
}

export function GameOverHeader ({
    score,
}:IGameOverHeaderProps) {
    return (
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
      <div
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#a1a1aa',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          marginBottom: '8px',
        }}
      >
        Sprint Finished 🏁
      </div>

      <div
        style={{
          fontSize: '44px',
          fontWeight: '900',
          color: '#60a5fa', 
          textShadow: '0 0 24px rgba(96, 165, 250, 0.3)',
          letterSpacing: '-1px',
        }}
      >
        {score}{' '}
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#a1a1aa' }}>
          PTS
        </span>
      </div>
    </div>
    )
}