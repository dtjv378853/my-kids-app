export interface Hero {
  id: string;
  name: string;
  title: string;
  image: string;
  color: string;
  glowColor: string;
  badge: string;
  powerDescription: string;
}

export interface Task {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  color: string; // Pastel background hex
  textColor: string;
  category: 'daily' | 'extra';
  completed: boolean;
  completedAt?: string;
}

export interface Reward {
  id: string;
  title: string;
  icon: string;
  cost: number;
  redeemedCount: number;
}

export interface UserProgress {
  selectedHeroId: string;
  stars: number;
  completedTaskIds: string[]; // IDs of tasks completed today
  lastCompletedDate: string; // YYYY-MM-DD
  redeemedRewards: {
    id: string;
    rewardId: string;
    title: string;
    icon: string;
    cost: number;
    date: string;
  }[];
  totalStarsEarned: number;
}
