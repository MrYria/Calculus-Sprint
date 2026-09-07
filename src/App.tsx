import { useState } from "react";
import { MainMenu } from "./components/screens/MainMenu";
import type { IGameConfig, IGameResults, StateScreen } from "./types/game";
import { GameScreen } from "./components/screens/GameScreen";
import { GameOverScreen } from './components/screens/GameOverScreen';



export default function App() {
  const [screen, setScreen] = useState<StateScreen>('menu');
  const [gameConfig, setGameConfig] = useState<IGameConfig | null>(null);
  const [gameResults, setGameResults] = useState<IGameResults | null>(null);

  const handleStartGame = (config: IGameConfig) => {
    setGameConfig(config);
    setScreen('playing'); 
  };

  const handleGameOver = (results: IGameResults) => {
    setGameResults(results);
    setScreen('game_over');
  };

  const handlePlayAgain = () => {
    setScreen('playing');
  };

  const handleBackToMenu = () => {
    setScreen('menu');
    setGameResults(null);
  };

   return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#09090b',
        color: '#f4f4f5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {screen === 'menu' && (
        <MainMenu
          onStartGame={handleStartGame}
          onOpenLeaderboard={() => console.log('Open Leaderboard (скоро)')}
          onOpenSettings={() => console.log('Open Settings (скоро)')}
          onOpenAuth={() => console.log('Open Login (скоро)')}
        />
      )}

      {screen === 'playing' && gameConfig && (
        <GameScreen
          config={gameConfig}
          onGameOver={handleGameOver}
          onBackMenu={handleBackToMenu}
        />
      )}

      {screen === 'game_over' && gameResults && (
        <GameOverScreen
          results={gameResults}
          onPlayAgain={handlePlayAgain}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}