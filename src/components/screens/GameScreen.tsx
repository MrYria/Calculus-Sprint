// src/components/screens/GameScreen.tsx
import type { IGameConfig, IGameResults } from '../../types/game';
import { useGameSession } from '../../game/useGameSession';
import { GameHeader } from '../game/GameHeader';
import { QuestionDisplay } from '../game/QuestionDisplay';
import { AnswerInput } from '../game/AnswerInput';

interface IGameScreenProps {
  config: IGameConfig;
  onGameOver: (results: IGameResults) => void;
  onBackMenu: () => void;
}

export function GameScreen({ config, onGameOver, onBackMenu }: IGameScreenProps) {
  const session = useGameSession(config, onGameOver);

  return (
    <div
      style={{
        maxWidth: '520px',
        margin: '40px auto',
        padding: '24px',
        backgroundColor: '#18181b',
        color: '#f4f4f5',
        borderRadius: '16px',
        border: '1px solid #27272a',
        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
      }}
    >
      <GameHeader
        timeLeft={session.timeLeft}
        score={session.score}
        difficulty={session.difficulty}
        streak={session.streak}
        isSprint={config.mode === 'sprint'}
        onBackMenu={onBackMenu}
      />

      <QuestionDisplay
        latex={session.question.latex}
        status={session.status}
      />

      <AnswerInput
        value={session.userAnswer}
        onChange={session.setUserAnswer}
        onSubmit={session.handleSubmit}
      />
    </div>
  );
}