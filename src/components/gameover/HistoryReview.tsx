import { InlineMath } from 'react-katex';
import type { IAnswerRecord } from '../../types/game';

interface IHistoryReviewProps {
  history: IAnswerRecord[];
}

export function HistoryReview({ history }: IHistoryReviewProps) {
  if (history.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#71717a', padding: '24px 0', marginBottom: '24px' }}>
        No questions answered
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      <div
        style={{
          fontSize: '13px',
          fontWeight: 'bold',
          color: '#a1a1aa',
          marginBottom: '10px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        Review Answers ({history.length}):
      </div>

      <div
        style={{
          maxHeight: '250px',
          overflowY: 'auto',
          paddingRight: '6px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {history.map((item, index) => (
          <div
            key={item.questionId || index}
            style={{
              backgroundColor: '#27272a',
              borderRadius: '8px',
              padding: '10px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderLeft: item.isCorrect ? '4px solid #22c55e' : '4px solid #ef4444',
              borderTop: '1px solid #3f3f46',
              borderRight: '1px solid #3f3f46',
              borderBottom: '1px solid #3f3f46',
            }}
          >
            <div style={{ fontSize: '16px', overflowX: 'auto', maxWidth: '65%' }}>
              <InlineMath math={item.latex} />
            </div>

            <div style={{ textAlign: 'right', fontSize: '14px', fontWeight: 'bold' }}>
              {item.isCorrect ? (
                <span style={{ color: '#22c55e' }}>✓ {item.userAnswer}</span>
              ) : (
                <div>
                  <span style={{ color: '#ef4444', textDecoration: 'line-through', marginRight: '6px' }}>
                    {item.userAnswer}
                  </span>
                  <span style={{ color: '#22c55e' }}>{item.correctAnswer}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}