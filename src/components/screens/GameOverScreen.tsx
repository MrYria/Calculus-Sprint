import type { IGameResults } from '../../types/game';
import { GameOverHeader } from '../gameover/GameOverHeader';
import { StatsSummary } from '../gameover/StatsSummary';
import { HistoryReview } from '../gameover/HistoryReview';
import { GameOverActions } from '../gameover/GameOverActions';

interface IGameOverScreenProps {
  results: IGameResults;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export function GameOverScreen({ results, onPlayAgain, onBackToMenu }: IGameOverScreenProps) {
  return (
    <div
      style={{
        maxWidth: '560px',
        margin: '40px auto',
        padding: '24px',
        backgroundColor: '#18181b',
        borderRadius: '16px',
        border: '1px solid #27272a',
        color: '#f4f4f5',
        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
      }}
    >
      <GameOverHeader score={results.score} />

      <StatsSummary
        accuracy={results.accuracy}
        correctAnswers={results.correctAnswers}
        totalQuestions={results.totalQuestions}
        maxStreak={results.maxStreak}
        maxDifficulty={results.maxDifficulty}
      />

      <HistoryReview history={results.answersHistory} />

      <GameOverActions
        onPlayAgain={onPlayAgain}
        onBackToMenu={onBackToMenu}
      />
    </div>
  );
}