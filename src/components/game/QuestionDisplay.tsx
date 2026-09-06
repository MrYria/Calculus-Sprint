import { InlineMath } from 'react-katex';


interface IQuestionDisplayProps {
  latex: string;
  status: 'idle' | 'correct' | 'wrong';
}

export function QuestionDisplay ({
    latex,
    status,
}: IQuestionDisplayProps) { return (
    <div
                style={{
                    fontSize: '28px',
                    padding: '32px 16px',
                    background: status === 'wrong' ? '#450a0a' : '#27272a',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: status === 'wrong' ? '1px solid #ef4444' : status === 'correct' ? '1px solid #22c55e' : '1px solid #3f3f46',
                    transition: 'all 0.2s',
                }}
            >
                <InlineMath math={latex} />
            </div>

)
}