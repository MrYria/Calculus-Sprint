import { useEffect, useState } from 'react';
import type { IGameConfig, IGameResults, IAnswerRecord } from '../../types/game';
import type { Topic, MathQuestion } from '../../types/math';
import { generateArithmeticQuestion } from '../../math/arithmetic';
import { generatePowersQuestion } from '../../math/power';
import { generateDerivativesQuestion } from '../../math/derivatives';
import { generateIntegralsQuestion } from '../../math/integrals';
import { generateGraphsQuestion } from '../../math/graphs/index';
import { InlineMath } from 'react-katex';
import { generateRandomNumber } from '../../helper/utils';

interface IGameScreenProps {
    config: IGameConfig;
    onGameOver: (results: IGameResults) => void;
    onBackMenu: () => void;
}

export function GameScreen({ config, onGameOver, onBackMenu }: IGameScreenProps) {
    const [difficulty, setDifficulty] = useState<number>(config.initialDifficulty);
    const [highestLevelReached, setHighestLevelReached] = useState<number>(() =>
        Math.floor(config.initialDifficulty)
    );

    const [timeLeft, setTimeLeft] = useState<number>(() =>
        config.timeLimit === 'infinite' ? 0 : config.timeLimit
    );

    const [question, setQuestion] = useState<MathQuestion>(() =>
        getMathQuestion(config.topic, config.initialDifficulty)
    );

    const [userAnswer, setUserAnswer] = useState<string>('');
    const [score, setScore] = useState<number>(0);
    const [streak, setStreak] = useState<number>(0);
    const [maxStreak, setMaxStreak] = useState<number>(0);
    const [correctCount, setCorrectCount] = useState<number>(0);
    const [wrongCount, setWrongCount] = useState<number>(0);
    const [answersHistory, setAnswersHistory] = useState<IAnswerRecord[]>([]);
    const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

    useEffect(() => {
        if (config.mode === 'training' || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleFinishGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [config.mode, timeLeft]);


    const handleFinishGame = () => {
        const totalAnswered = correctCount + wrongCount;
        const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
        const timeSpent = config.timeLimit === 'infinite' ? 0 : config.timeLimit - timeLeft;

        onGameOver({
            score,
            correctAnswers: correctCount,
            wrongAnswers: wrongCount,
            totalQuestions: totalAnswered,
            accuracy,
            maxStreak,
            maxDifficulty: difficulty,
            topic: config.topic,
            timeSpent,
            answersHistory,
        });
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userAnswer.trim()) return;

        const parsed = Number(userAnswer.trim());
        const isCorrect = parsed === question.correctAnswer;

        const record: IAnswerRecord = {
            questionId: question.id,
            latex: question.latex,
            userAnswer: parsed,
            correctAnswer: question.correctAnswer,
            isCorrect,
            difficulty,
        };
        setAnswersHistory((prev) => [...prev, record]);

        if (isCorrect) {
            setStatus('correct');
            setCorrectCount((prev) => prev + 1);
            const newStreak = streak + 1;
            setStreak(newStreak);
            setMaxStreak((prev) => Math.max(prev, newStreak));
            setScore((prev) => prev + 10 * newStreak);

            const nextDifficulty = Math.round((difficulty + 0.3) * 10) / 10;
            setDifficulty(nextDifficulty);
            setQuestion(getMathQuestion(config.topic, nextDifficulty));

            const nextLevel = Math.floor(nextDifficulty);
            if (nextLevel > highestLevelReached) {
                const bonusSeconds = getBonusTimeForLevel(nextLevel);
                setTimeLeft((prev) => prev + bonusSeconds);
                setHighestLevelReached(nextLevel);
            }

            setUserAnswer('');
        } else {
            setStatus('wrong');
            setWrongCount((prev) => prev + 1);
            setStreak(0);

            const nextDifficulty = Math.max(1.0, Math.round((difficulty - 0.4) * 10) / 10);
            setDifficulty(nextDifficulty);
            setQuestion(getMathQuestion(config.topic, nextDifficulty));
            setUserAnswer('');
        }
    };

    return (
        <div
            style={{
                maxWidth: '520px',
                margin: '40px auto',
                fontFamily: 'system-ui, sans-serif',
                padding: '24px',
                backgroundColor: '#18181b',
                color: '#f4f4f5',
                borderRadius: '16px',
                border: '1px solid #27272a',
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                }}
            >
                <button
                    onClick={onBackMenu}
                    style={{
                        background: '#27272a',
                        border: 'none',
                        color: '#a1a1aa',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                    }}
                >
                    ← Menu
                </button>

                {config.mode === 'sprint' ? (
                    <div
                        style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: timeLeft <= 10 ? '#ef4444' : '#fbbf24',
                            transition: 'color 0.2s',
                        }}
                    >
                        ⏱️ {timeLeft}s
                    </div>
                ) : (
                    <div style={{ color: '#a1a1aa', fontSize: '14px' }}>🧘 Zen Mode</div>
                )}

                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Score: {score}</div>
            </div>

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
                <InlineMath math={question.latex} />
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
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

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '16px',
                    fontSize: '14px',
                    color: '#a1a1aa',
                }}
            >
                <span>⭐ Stars: {difficulty.toFixed(1)}</span>
                <span style={{ color: streak > 1 ? '#f97316' : '#71717a', fontWeight: 'bold' }}>
                    🔥 Combo: x{streak + 1}
                </span>
            </div>
        </div>
    );
}

const getMathQuestion = (currentTopic: Topic | 'all_mix', difficulty: number): MathQuestion => {
    switch (currentTopic) {
        case 'arithmetic':
            return generateArithmeticQuestion(difficulty);
        case 'powers':
            return generatePowersQuestion(difficulty);
        case 'derivatives':
            return generateDerivativesQuestion(difficulty);
        case 'integrals':
            return generateIntegralsQuestion(difficulty);
        case 'graphs':
            return generateGraphsQuestion(difficulty);
        case 'all_mix': {
            const topics = ['arithmetic', 'powers', 'derivatives', 'integrals', 'graphs'] as const satisfies readonly Topic[];
            return getMathQuestion(topics[generateRandomNumber(0, topics.length - 1)], difficulty);
        }
        default:
            return generateArithmeticQuestion(difficulty);
    }
};

function getBonusTimeForLevel(level: number): number {
    switch (level) {
        case 2: return 10;
        case 3: return 20;
        case 4: return 40;
        case 5: return 60;
        case 6: return 120;
        case 7: return 240;
        default: return 0;
    }
}