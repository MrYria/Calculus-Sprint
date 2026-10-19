import { useState, useEffect, useCallback, useRef } from 'react';
import type { IGameConfig, IGameResults, IAnswerRecord } from '../types/game';
import type { MathQuestion } from '../types/math';
import { getMathQuestion } from './engine';
import { getBonusTimeForLevel } from './difficulty';
import { calculateScore } from './scoring';
import { finishGameApi, startGameApi } from '../api/game.api';

export function useGameSession(
  config: IGameConfig,
  onGameOver: (results: IGameResults) => void
) {
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
  const [gameUuid, setGameUuid] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const questionStartTime = useRef<number | null>(null);
  const isFinishedRef = useRef<boolean>(false);

  useEffect(() => {
    questionStartTime.current = Date.now();
  }, []);

  const loadNextQuestion = (nextDifficulty: number) => {
    const nextQuestion = getMathQuestion(config.topic, nextDifficulty);
    questionStartTime.current = Date.now();
    setQuestion(nextQuestion);
  };

  const finishGame = useCallback(async () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setIsSubmitting(true);

    let finalScore = score;

    if (config.mode === 'sprint' && gameUuid) {
      try {
        const response = await finishGameApi(gameUuid, answersHistory);
        finalScore = response.verifiedScore;
      } catch (err) {
        console.error('Failed to verify game on server, using local score:', err);
      }
    }

    const totalAnswered = correctCount + wrongCount;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const timeSpent = config.timeLimit === 'infinite' ? 0 : config.timeLimit - timeLeft;

    setIsSubmitting(false);


    onGameOver({
      score: finalScore,
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
  }, [
    answersHistory,
    config.mode,
    config.timeLimit,
    config.topic,
    correctCount,
    difficulty,
    gameUuid,
    maxStreak,
    onGameOver,
    score,
    timeLeft,
    wrongCount,
  ]);

  useEffect(() => {
    if (config.mode === 'training' || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [config.mode, timeLeft]);

  useEffect(() => {
    if (config.mode === 'sprint') {
      startGameApi(config.topic)
        .then((session) => setGameUuid(session.game_uuid))
        .catch((err) => console.error('Failed to init game on server:', err));
    }
  }, [config.mode, config.topic]);

  useEffect(() => {
    if (config.mode === 'sprint' && timeLeft === 0) {
      finishGame();
    }
  }, [config.mode, timeLeft, finishGame]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const parsed = Number(userAnswer.trim());
    const isCorrect = parsed === question.correctAnswer;

    const startedAt = questionStartTime.current;
    const timeSpentMs = startedAt === null ? 0 : Date.now() - startedAt;

    const maxAllowedDifficulty = config.mode === 'training'
      ? Math.floor(config.initialDifficulty) + 0.9
      : 7.5;

    const record: IAnswerRecord = {
      questionId: question.id,
      latex: question.latex,
      userAnswer: parsed,
      correctAnswer: question.correctAnswer,
      timeSpentMs,
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
      setScore((prev) => prev + calculateScore(10, newStreak));

      const nextDifficulty = Math.min(
        maxAllowedDifficulty,
        Math.round((difficulty + 0.3) * 10) / 10
      );
      setDifficulty(nextDifficulty);
      loadNextQuestion(nextDifficulty);

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

      const minAllowedDifficulty = config.initialDifficulty;
      const nextDifficulty = Math.max(
        minAllowedDifficulty,
        Math.round((difficulty - 0.4) * 10) / 10
      );
      setDifficulty(nextDifficulty);
      loadNextQuestion(nextDifficulty);
      setUserAnswer('');
    }
  };

  return {
    difficulty,
    timeLeft,
    question,
    userAnswer,
    setUserAnswer,
    score,
    streak,
    status,
    handleSubmit,
    isSubmitting,
    finishGame,
  };
}