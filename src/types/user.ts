export interface IUserSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  theme: 'dark' | 'light';
  showTimerProgress: boolean;
}

export interface IUserProfile {
  id: string;
  username: string;
  isGuest: boolean;
  highScore: number;
  createdAt?: string;
}