import { useState } from 'react';
import type { IGameConfig, GameMode, TimeLimit, StateScreen } from '../../types/game';
import type { Topic } from '../../types/math';


interface IMainMenuProps {
    onStartGame: (config: IGameConfig) => void;
    onOpenSettings?: () => void;
    onOpenLeaderboard?: () => void;
    onOpenAuth?: () => void;


}


export function MainMenu({ onStartGame, onOpenSettings, onOpenLeaderboard, onOpenAuth, }: IMainMenuProps) {
    const [topic, setTopic] = useState<Topic | 'all_mix'>('arithmetic');
    const [mode, setMode] = useState<GameMode>('sprint');
    const [timeLimit, setTimeLimit] = useState<TimeLimit>(60);
    const [initialDifficulty, setInitialDifficulty] = useState<number>(1.0);


    const handleStart = () => {
        onStartGame({
            topic,
            mode,
            timeLimit: mode === 'training' ? 'infinite' : timeLimit,
            initialDifficulty,
        });
    };

    return (
        <div style={{
            maxWidth: '560px',
            margin: '40px auto',
            padding: '24px',
            backgroundColor: '#18181b',
            borderRadius: '16px',
            border: '1px solid #27272a',
            color: '#f4f4f5',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
        }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <h2 style={{ margin: 0, fontSize: '22px' }}>CalculusSprint ⚡</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={onOpenLeaderboard} style={{ background: '#27272a', border: 'none', padding: '8px 12px', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>
                        🏆 Leaderboard
                    </button>
                    <button onClick={onOpenSettings} style={{ background: '#27272a', border: 'none', padding: '8px 12px', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>
                        ⚙️ Settings
                    </button>
                    <button onClick={onOpenAuth} style={{ background: '#27272a', border: 'none', padding: '8px 12px', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>
                        👤 Login
                    </button>
                </div>
            </header>

            <div style={{ marginBottom: '16px' }}>
                <button
                    onClick={() => setMode('sprint')}
                    style={{ background: mode === 'sprint' ? '#2563eb' : '#27272a', color: '#fff', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginRight: '8px', fontWeight: 'bold' }}
                >
                    ⚡ Sprint
                </button>
                <button
                    onClick={() => setMode('training')}
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
                            onClick={() => setTimeLimit(t as TimeLimit)}
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

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {[
                    { id: 'arithmetic', label: '➕ Arithmetic' },
                    { id: 'powers', label: '⚡ Powers & Log' },
                    { id: 'derivatives', label: '📐 Derivatives' },
                    { id: 'integrals', label: '∫ Integrals' },
                    { id: 'graphs', label: '📈 Graphs' },
                    { id: 'all_mix', label: '🔥 ALL MIX' },
                ].map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTopic(t.id as Topic | 'all_mix')}
                        style={{
                            flex: '1 1 calc(33.3% - 8px)',
                            background: topic === t.id ? '#2563eb' : '#27272a',
                            color: '#fff',
                            padding: '12px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: 'all 0.2s',
                        }}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div style={{ textAlign: 'center' }}>
                <button
                    onClick={handleStart}
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
        </div>
    );



}

