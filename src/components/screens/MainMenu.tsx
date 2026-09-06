// src/components/screens/MainMenu.tsx
import { useState } from 'react';
import type { IGameConfig, GameMode, TimeLimit } from '../../types/game';
import type { Topic } from '../../types/math';

import { MenuHeader } from '../menu/MenuHeader';
import { ModeSelector } from '../menu/ModeSelector';
import { TopicSelector } from '../menu/TopicSelector';
import { DifficultySelector } from '../menu/DifficultySelector';
import { StartButton } from '../menu/StartButton';

interface IMainMenuProps {
  onStartGame: (config: IGameConfig) => void;
  onOpenSettings?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenAuth?: () => void;
}

export function MainMenu({ onStartGame, onOpenSettings, onOpenLeaderboard, onOpenAuth }: IMainMenuProps) {
  const [topic, setTopic] = useState<Topic | 'all_mix'>('arithmetic');
  const [mode, setMode] = useState<GameMode>('sprint');
  const [timeLimit, setTimeLimit] = useState<TimeLimit>(60);
  const [initialDifficulty, setInitialDifficulty] = useState<number>(1.0);

  const handleStart = () => {
    onStartGame({
      topic,
      mode,
      timeLimit: mode === 'training' ? 'infinite' : timeLimit,
      initialDifficulty,
    });
  };

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
      <MenuHeader
        onOpenLeaderboard={onOpenLeaderboard}
        onOpenSettings={onOpenSettings}
        onOpenAuth={onOpenAuth}
      />

      <ModeSelector
        mode={mode}
        timeLimit={timeLimit}
        onModeChange={setMode}
        onTimeChange={setTimeLimit}
      />

      <DifficultySelector
        difficulty={initialDifficulty}
        onDifficultyChange={setInitialDifficulty}
      />

      <TopicSelector
        selectedTopic={topic}
        onTopicChange={setTopic}
      />

      <StartButton
        mode={mode}
        onStart={handleStart}
      />
    </div>
  );
}