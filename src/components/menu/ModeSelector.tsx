import type { GameMode, TimeLimit } from "../../types/game";


interface IModeSelectorProps {
    mode: GameMode;
    timeLimit: TimeLimit;
    onModeChange: (mode: GameMode) => void;
    onTimeChange: (time: TimeLimit) => void;
}

export function ModeSelector({
    mode,
    timeLimit,
    onModeChange,
    onTimeChange,
}: IModeSelectorProps) {
    return (
        <>
            <div style={{ marginBottom: '16px' }}>
                <button
                    onClick={() => onModeChange('sprint')}
                    style={{ background: mode === 'sprint' ? '#2563eb' : '#27272a', color: '#fff', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginRight: '8px', fontWeight: 'bold' }}
                >
                    ⚡ Sprint
                </button>
                <button
                    onClick={() => onModeChange('training')}
                    style={{ background: mode === 'training' ? '#2563eb' : '#27272a', color: '#fff', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    🧘 Training
                </button>
            </div>

            {mode === 'sprint' && (
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '12px', color: '#a1a1aa', fontSize: '14px', fontWeight: 'bold' }}>Time:</span>
                    {[60, 120, 180].map((t) => (
                        <button
                            key={t}
                            onClick={() => onTimeChange(t as TimeLimit)}
                            style={{
                                background: timeLimit === t ? '#2563eb' : '#27272a',
                                color: '#fff',
                                padding: '6px 14px',
                                borderRadius: '6px',
                                border: 'none',
                                cursor: 'pointer',
                                marginRight: '8px',
                                fontWeight: 'bold'
                            }}
                        >
                            {t}s
                        </button>
                    ))}
                </div>
            )}
        </>
    );
}