interface IAnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AnswerInput ({
    value,
    onChange,
    onSubmit,
}: IAnswerInputProps) {return (
    <form onSubmit={onSubmit}>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Type answer & press Enter..."
                    autoFocus
                    style={{
                        width: '92%',
                        padding: '14px',
                        fontSize: '22px',
                        textAlign: 'center',
                        borderRadius: '8px',
                        border: '2px solid #3b82f6',
                        backgroundColor: '#09090b',
                        color: '#fff',
                        outline: 'none',
                        marginBottom: '16px',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '14px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        background: '#2563eb',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                >
                    Submit (Enter)
                </button>
            </form>
)
}