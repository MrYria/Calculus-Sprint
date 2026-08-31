// src/App.tsx
import { useState } from 'react';
import { InlineMath } from 'react-katex';
import { generateArithmeticQuestion } from './math/arithmetic';
import { generatePowersQuestion } from './math/power';
import { generateDerivativesQuestion } from './math/derivatives';
import type { MathQuestion, Topic } from './types/math';
import { generateIntegralsQuestion } from './math/integrals';
import { generateGraphsQuestion } from './math/graphs/index';

const TOPICS: { id: Topic; label: string; icon: string }[] = [
  { id: 'arithmetic', label: 'Arithmetic', icon: '➕' },
  { id: 'powers', label: 'Powers & Log', icon: '⚡' },
  { id: 'derivatives', label: 'Derivatives', icon: '📐' },
  { id: 'integrals', label: 'Integrals', icon: '∫' },
  { id: 'graphs', label: 'Graphs', icon : 'y=x'}
];

export default function App() {
  const [topic, setTopic] = useState<Topic>('arithmetic');
  const [difficulty, setDifficulty] = useState<number>(1.0);

  const getQuestion = (selectedTopic: Topic, diff: number): MathQuestion => {
    switch (selectedTopic) {
      case 'arithmetic':
        return generateArithmeticQuestion(diff);
      case 'powers':
        return generatePowersQuestion(diff);
      case 'derivatives':
        return generateDerivativesQuestion(diff);
      case 'integrals':
        return generateIntegralsQuestion(diff);
      case 'graphs':
        return generateGraphsQuestion(diff);
      default:
        return generateArithmeticQuestion(diff);
    }
  };

  const [question, setQuestion] = useState<MathQuestion>(() =>
    generateDerivativesQuestion(1.0)
  );

  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const handleTopicChange = (newTopic: Topic) => {
    setTopic(newTopic);
    setDifficulty(1.0);
    setStreak(0);
    setStatus('idle');
    setQuestion(getQuestion(newTopic, 1.0));
    setUserAnswer('');
  };

  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const parsed = Number(userAnswer.trim());

    if (parsed === question.correctAnswer) {
      setStatus('correct');
      setScore((prev) => prev + 10 * (streak + 1));
      setStreak((prev) => prev + 1);

      const nextDifficulty = Math.round((difficulty + 0.4) * 10) / 10;
      setDifficulty(nextDifficulty);
      setQuestion(getQuestion(topic, nextDifficulty));
      setUserAnswer('');
    } else {
      setStatus('wrong');
      setStreak(0);

      const nextDifficulty = Math.max(1.0, Math.round((difficulty - 0.5) * 10) / 10);
      setDifficulty(nextDifficulty);
      setQuestion(getQuestion(topic, nextDifficulty));
      setUserAnswer('');
    }
  };

  return (
    <div
      style={{
        maxWidth: '460px',
        margin: '40px auto',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
        padding: '24px',
        backgroundColor: '#18181b',
        color: '#f4f4f5',
        borderRadius: '16px',
        border: '1px solid #27272a',
        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
      }}
    >
      <h2 style={{ margin: '0 0 16px 0', fontSize: '22px' }}>
        CalculusSprint 
      </h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {TOPICS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => handleTopicChange(t.id)}
            style={{
              flex: '1 1 calc(33.3% - 8px)',
              padding: '10px 6px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px',
              background: topic === t.id ? '#2563eb' : '#27272a',
              color: topic === t.id ? '#fff' : '#a1a1aa',
              transition: 'all 0.2s',
            }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '16px',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        <span>Score: {score}</span>
        <span style={{ color: '#fbbf24' }}>
          Stars: {difficulty.toFixed(1)}
        </span>
        <span style={{ color: streak > 1 ? '#f97316' : '#71717a' }}>
          🔥 x{streak + 1}
        </span>
      </div>

      <div
        style={{
          fontSize: '28px',
          padding: '24px 16px',
          background: status === 'wrong' ? '#450a0a' : '#27272a',
          borderRadius: '12px',
          marginBottom: '20px',
          minHeight: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
          whiteSpace: 'nowrap',
          border: status === 'wrong' ? '1px solid #ef4444' : '1px solid #3f3f46',
        }}
      >
        <InlineMath math={question.latex} />
      </div>

      <form onSubmit={checkAnswer}>
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your Answer..."
          autoFocus
          style={{
            width: '90%',
            padding: '14px',
            fontSize: '20px',
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
            width: '98%',
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
          Відповісти (Enter)
        </button>
      </form>
    </div>
  );
}