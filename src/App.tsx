/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HeroesScreen } from './components/HeroesScreen';
import { HomeScreen } from './components/HomeScreen';
import { ChallengesScreen } from './components/ChallengesScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { StarCelebrationModal } from './components/StarCelebrationModal';
import { DAILY_TASKS, HEROES } from './data/appData';
import { Task, Reward } from './types';
import { playPopSound } from './utils/audio';

type Screen = 'welcome' | 'heroes' | 'home' | 'challenges' | 'rewards';

const STORAGE_KEYS = {
  STARS: 'world_of_heroes_stars',
  HERO: 'world_of_heroes_selected_hero',
  COMPLETED: 'world_of_heroes_completed_tasks',
  LAST_DATE: 'world_of_heroes_last_date',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedHeroId, setSelectedHeroId] = useState<string>('hero-blue');
  const [stars, setStars] = useState<number>(0);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [celebrationOpen, setCelebrationOpen] = useState<boolean>(false);
  const [celebratingTask, setCelebratingTask] = useState<Task | null>(null);
  const [parentModalOpen, setParentModalOpen] = useState<boolean>(false);

  // Initialize and load saved state from localStorage
  useEffect(() => {
    try {
      const savedStars = localStorage.getItem(STORAGE_KEYS.STARS);
      if (savedStars !== null) {
        setStars(parseInt(savedStars, 10) || 0);
      }

      const savedHero = localStorage.getItem(STORAGE_KEYS.HERO);
      if (savedHero && HEROES.some((h) => h.id === savedHero)) {
        setSelectedHeroId(savedHero);
      }

      const todayStr = new Date().toISOString().split('T')[0];
      const savedDate = localStorage.getItem(STORAGE_KEYS.LAST_DATE);

      if (savedDate === todayStr) {
        const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED);
        if (savedCompleted) {
          setCompletedTaskIds(JSON.parse(savedCompleted));
        }
      } else {
        // Reset completed daily tasks for a brand new day while keeping star balance!
        localStorage.setItem(STORAGE_KEYS.LAST_DATE, todayStr);
        localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify([]));
        setCompletedTaskIds([]);
      }
    } catch (e) {
      console.error('Failed to load saved progress:', e);
    }
  }, []);

  // Save changes to localStorage
  const updateStars = (newStars: number) => {
    setStars(newStars);
    try {
      localStorage.setItem(STORAGE_KEYS.STARS, newStars.toString());
    } catch (e) {
      console.error(e);
    }
  };

  const handleHeroSelect = (heroId: string) => {
    setSelectedHeroId(heroId);
    try {
      localStorage.setItem(STORAGE_KEYS.HERO, heroId);
    } catch (e) {
      console.error(e);
    }
  };

  // Rule: "على كل مهمة نجمة واحدة بس" (Each task awards exactly 1 star)
  const handleCompleteTask = (task: Task) => {
    const isAlreadyCompleted = completedTaskIds.includes(task.id);

    if (!isAlreadyCompleted) {
      // Award exactly 1 star
      const nextStars = stars + 1;
      updateStars(nextStars);

      const nextCompleted = [...completedTaskIds, task.id];
      setCompletedTaskIds(nextCompleted);
      try {
        localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(nextCompleted));
      } catch (e) {
        console.error(e);
      }

      // Trigger Celebration Modal as seen in the uploaded video
      setCelebratingTask(task);
      setCelebrationOpen(true);
    } else {
      // Task already completed today: allow re-celebrating or show encouragement
      setCelebratingTask(task);
      setCelebrationOpen(true);
    }
  };

  const handleRedeemReward = (reward: Reward) => {
    if (stars >= reward.cost) {
      updateStars(stars - reward.cost);
    }
  };

  // Manual reset for parents/testing
  const handleResetDailyTasks = () => {
    setCompletedTaskIds([]);
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify([]));
    } catch (e) {
      console.error(e);
    }
    setParentModalOpen(false);
  };

  const handleAdjustStars = (amount: number) => {
    const next = Math.max(0, stars + amount);
    updateStars(next);
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-[#2B1B15] overflow-x-hidden">
      {/* Mobile-first frame container ensuring identical aspect and pixel-clean fidelity */}
      <div className="w-full max-w-md min-h-screen relative flex flex-col bg-[#D3BEAF] shadow-2xl overflow-hidden">
        
        {/* Screen Routing */}
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onStart={() => setCurrentScreen('heroes')}
          />
        )}

        {currentScreen === 'heroes' && (
          <HeroesScreen
            selectedHeroId={selectedHeroId}
            onSelectHero={handleHeroSelect}
            onConfirm={() => setCurrentScreen('home')}
          />
        )}

        {currentScreen === 'home' && (
          <HomeScreen
            stars={stars}
            selectedHeroId={selectedHeroId}
            tasks={DAILY_TASKS}
            completedTaskIds={completedTaskIds}
            onCompleteTask={handleCompleteTask}
            onOpenExtraChallenges={() => setCurrentScreen('challenges')}
            onOpenRewards={() => setCurrentScreen('rewards')}
            onChangeHero={() => setCurrentScreen('heroes')}
          />
        )}

        {currentScreen === 'challenges' && (
          <ChallengesScreen
            stars={stars}
            completedTaskIds={completedTaskIds}
            onCompleteTask={handleCompleteTask}
            onBack={() => setCurrentScreen('home')}
          />
        )}

        {currentScreen === 'rewards' && (
          <RewardsScreen
            stars={stars}
            onRedeemReward={handleRedeemReward}
            onBack={() => setCurrentScreen('home')}
          />
        )}

        {/* The Exact Celebration Modal with Bouncing Kawaii Star from video */}
        <StarCelebrationModal
          isOpen={celebrationOpen}
          onClose={() => setCelebrationOpen(false)}
          taskTitle={celebratingTask?.title}
          totalStars={stars}
        />

        {/* Subtle Parent Controls / Reset Gear Icon in top corner when in tasks */}
        {(currentScreen === 'home' || currentScreen === 'challenges') && (
          <button
            onClick={() => {
              playPopSound();
              setParentModalOpen(true);
            }}
            title="خيارات ولي الأمر"
            className="fixed bottom-3 right-3 z-40 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-xs opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
          >
            ⚙️
          </button>
        )}

        {/* Parent Settings Modal */}
        {parentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-xs rounded-3xl p-5 bg-[#FAF5EF] border-4 border-black text-center text-[#2B1B15]">
              <h4 className="text-xl font-black mb-3">⚙️ خيارات ولي الأمر</h4>
              <p className="text-xs text-[#5C3224] mb-4">
                يمكنك إعادة تعيين مهام اليوم لبدء يوم جديد، أو ضبط رصيد النجوم يدوياً.
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-black/20">
                  <span className="text-xs font-bold">النجوم الحالية:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleAdjustStars(-1)}
                      className="w-7 h-7 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg border border-red-300"
                    >
                      -1
                    </button>
                    <span className="font-black px-2">{stars}</span>
                    <button
                      onClick={() => handleAdjustStars(1)}
                      className="w-7 h-7 bg-green-100 hover:bg-green-200 text-green-700 font-bold rounded-lg border border-green-300"
                    >
                      +1
                    </button>
                    <button
                      onClick={() => handleAdjustStars(5)}
                      className="px-2 h-7 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-xs rounded-lg border border-amber-300"
                    >
                      +5 ⭐
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleResetDailyTasks}
                  className="w-full py-2.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold text-xs border border-orange-300 transition-colors cursor-pointer"
                >
                  🔄 إعادة تعيين مهام اليوم (يوم جديد)
                </button>
              </div>

              <button
                onClick={() => setParentModalOpen(false)}
                className="w-full py-2 bg-[#2B1B15] text-white rounded-xl font-bold text-sm cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
