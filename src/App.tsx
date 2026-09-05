import { useState } from "react";
import { MainMenu } from "./components/screens/MainMenu";
import type { IGameConfig, StateScreen } from "./types/game";
import { GameScreen } from "./components/screens/GameScreen";



export default function App() {
  const [screen, setScreen] = useState<StateScreen>('menu');
  const [gameConfig, setGameConfig] = useState<IGameConfig | null>(null);

  const handleStartGame = (config: IGameConfig) => {
    setGameConfig(config);
    setScreen('playing'); 
  };

  return (
    <div>
      {screen === 'menu' && (
        <MainMenu onStartGame={handleStartGame} />
      )}

      {screen === 'playing' && gameConfig && (
        <GameScreen 
          config={gameConfig} 
          onGameOver={(results) => {  }}
          onBackMenu={() => setScreen('menu')}
        />
      )}
    </div>
  );
}