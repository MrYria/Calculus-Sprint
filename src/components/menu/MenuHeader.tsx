interface IMenuHeaderProps {
    onOpenLeaderboard?: () => void;
    onOpenSettings?: () => void;
    onOpenAuth?: () => void;
}

export function MenuHeader({
    onOpenLeaderboard,
    onOpenSettings,
    onOpenAuth,
}: IMenuHeaderProps) {
    return (
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
    )
}