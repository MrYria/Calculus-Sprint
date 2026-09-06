import type { Topic } from "../../types/math";

interface ITopicSelectorProps {
    selectedTopic: Topic | 'all_mix';
    onTopicChange: (topic: Topic | 'all_mix') => void;
}

export function TopicSelector({
    selectedTopic,
    onTopicChange,
}: ITopicSelectorProps) {
    return (
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
                    onClick={() => onTopicChange(t.id as Topic | 'all_mix')}
                    style={{
                        flex: '1 1 calc(33.3% - 8px)',
                        background: selectedTopic === t.id ? '#2563eb' : '#27272a',
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
    )
}