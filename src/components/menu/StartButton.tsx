import type { GameMode } from "../../types/game";

interface IStartButtonProps {
  mode: GameMode;
  onStart: () => void;
}

export function StartButton ({
    mode,
    onStart,
}:IStartButtonProps) {
    return(
        <div style={{ textAlign: 'center' }}>
                <button
                    onClick={onStart}
                    style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        background: '#2563eb',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                    }}
                >
                     Start {mode === 'sprint' ? 'Sprint' : 'Training'}
                </button>
            </div>
    );
}