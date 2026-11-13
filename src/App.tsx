/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ParentAuthScreen } from './components/ParentAuthScreen';
import { HeroesScreen } from './components/HeroesScreen';
import { HomeScreen } from './components/HomeScreen';
import { ChallengesScreen } from './components/ChallengesScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { StarCelebrationModal } from './components/StarCelebrationModal';
import { TopMotivationalToast } from './components/TopMotivationalToast';
import { ParentRewardRequestsModal } from './components/ParentRewardRequestsModal';
import { getRandomMotivationalMessage } from './data/motivationalMessages';
import { DAILY_TASKS, HEROES, REWARDS } from './data/appData';
import { Task, Reward, ParentChildProfile, CustomRewardRequest } from './types';
import { playPopSound } from './utils/audio';

type Screen = 'welcome' | 'parent_auth' | 'heroes' | 'home' | 'challenges' | 'rewards';

const STORAGE_KEYS = {
  STARS: 'world_of_heroes_stars',
  HERO: 'world_of_heroes_selected_hero',
  COMPLETED: 'world_of_heroes_completed_tasks',
  LAST_DATE: 'world_of_heroes_last_date',
  PROFILE: 'world_of_heroes_parent_child_profile',
  CUSTOM_REQUESTS: 'world_of_heroes_custom_reward_requests',
  REWARDS: 'world_of_heroes_rewards_list',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [returnScreenAfterAuth, setReturnScreenAfterAuth] = useState<Screen>('heroes');
  const [selectedHeroId, setSelectedHeroId] = useState<string>('hero-blue');
  const [stars, setStars] = useState<number>(0);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [celebrationOpen, setCelebrationOpen] = useState<boolean>(false);
  const [celebratingTask, setCelebratingTask] = useState<Task | null>(null);
  const [showParentModal, setShowParentModal] = useState<boolean>(false);
  const [showParentRequestsModal, setShowParentRequestsModal] = useState<boolean>(false);

  // Mother Login & Child Name Profile
  const [profile, setProfile] = useState<ParentChildProfile | null>(null);

  // Rewards list
  const [rewardsList, setRewardsList] = useState<Reward[]>(REWARDS);

  // Child's custom gift requests
  const [customRequests, setCustomRequests] = useState<CustomRewardRequest[]>([]);

  // Top motivational message when completing any task
  const [motivationalMessage, setMotivationalMessage] = useState<string | null>(null);
  const [motivationalTaskTitle, setMotivationalTaskTitle] = useState<string | undefined>(undefined);

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

      const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }

      const savedRewards = localStorage.getItem(STORAGE_KEYS.REWARDS);
      if (savedRewards) {
        const parsed: Reward[] = JSON.parse(savedRewards);
        // Ensure removed rewards (chocolate & favorite meal) do not persist from older localStorage
        const filtered = parsed.filter((r) => r.id !== 'r3' && r.id !== 'r4');
        setRewardsList(filtered);
        localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(filtered));
      }

      const savedCustomReqs = localStorage.getItem(STORAGE_KEYS.CUSTOM_REQUESTS);
      if (savedCustomReqs) {
        setCustomRequests(JSON.parse(savedCustomReqs));
      }

      const todayStr = new Date().toISOString().split('T')[0];
      const savedDate = localStorage.getItem(STORAGE_KEYS.LAST_DATE);

      if (savedDate === todayStr) {
        const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED);
        if (savedCompleted) {
          setCompletedTaskIds(JSON.parse(savedCompleted));
        }
      } else {
        localStorage.setItem(STORAGE_KEYS.LAST_DATE, todayStr);
        localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify([]));
        setCompletedTaskIds([]);
      }
    } catch (e) {
      console.error('Failed to read localStorage:', e);
    }
  }, []);

  const updateStars = (newStars: number) => {
    setStars(newStars);
    try {
      localStorage.setItem(STORAGE_KEYS.STARS, newStars.toString());
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdjustStars = (delta: number) => {
    const nextStars = Math.max(0, stars + delta);
    updateStars(nextStars);
  };

  const handleResetDailyTasks = () => {
    setCompletedTaskIds([]);
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify([]));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveProfile = (newProfile: ParentChildProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
    } catch (e) {
      console.error(e);
    }
    setCurrentScreen(returnScreenAfterAuth);
  };

  const handleHeroSelect = (heroId: string) => {
    setSelectedHeroId(heroId);
    try {
      localStorage.setItem(STORAGE_KEYS.HERO, heroId);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCompleteTask = (task: Task) => {
    const isAlreadyCompleted = completedTaskIds.includes(task.id);

    if (!isAlreadyCompleted) {
      const nextStars = stars + 1;
      updateStars(nextStars);

      const nextCompleted = [...completedTaskIds, task.id];
      setCompletedTaskIds(nextCompleted);
      try {
        localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(nextCompleted));
      } catch (e) {
        console.error(e);
      }
    }

    setCelebratingTask(task);
    setCelebrationOpen(true);
  };

  const handleCloseCelebration = () => {
    setCelebrationOpen(false);
    // Trigger motivational message at the top right after the child takes the star!
    const randomMsg = getRandomMotivationalMessage(profile?.childFirstName);
    setMotivationalMessage(randomMsg);
    setMotivationalTaskTitle(celebratingTask?.title);
  };

  const handleRedeemReward = (reward: Reward) => {
    if (stars >= reward.cost) {
      const nextStars = Math.max(0, stars - reward.cost);
      updateStars(nextStars);

      setRewardsList((prev) => {
        const next = prev.map((r) =>
          r.id === reward.id ? { ...r, redeemedCount: (r.redeemedCount || 0) + 1 } : r
        );
        try {
          localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(next));
        } catch (e) {
          console.error(e);
        }
        return next;
      });
    }
  };

  // Custom Gift Request Handlers
  const handleCreateCustomRequest = (
    req: Omit<CustomRewardRequest, 'id' | 'createdAt' | 'status'>
  ) => {
    const newRequest: CustomRewardRequest = {
      ...req,
      id: `req-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const nextRequests = [newRequest, ...customRequests];
    setCustomRequests(nextRequests);
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(nextRequests));
    } catch (e) {
      console.error(e);
    }
  };

  const handleApproveCustomRequest = (requestId: string, approvedCost: number) => {
    const targetReq = customRequests.find((r) => r.id === requestId);
    if (!targetReq) return;

    // 1. Update request status to approved
    const nextRequests = customRequests.map((r) =>
      r.id === requestId
        ? { ...r, status: 'approved' as const, approvedCost, reviewedAt: new Date().toISOString() }
        : r
    );
    setCustomRequests(nextRequests);
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(nextRequests));
    } catch (e) {
      console.error(e);
    }

    // 2. Add or update as a custom Reward in the rewardsList
    const customRewardId = `custom-reward-${requestId}`;
    setRewardsList((prev) => {
      const existingIndex = prev.findIndex(
        (r) => r.customRequestId === requestId || r.id === customRewardId
      );
      let nextRewards: Reward[];
      if (existingIndex >= 0) {
        nextRewards = prev.map((r, i) =>
          i === existingIndex
            ? { ...r, cost: approvedCost, title: targetReq.title, icon: targetReq.icon }
            : r
        );
      } else {
        const newReward: Reward = {
          id: customRewardId,
          title: targetReq.title,
          icon: targetReq.icon,
          cost: approvedCost,
          redeemedCount: 0,
          isCustom: true,
          customRequestId: requestId,
        };
        // Add at the beginning of the list for high visibility
        nextRewards = [newReward, ...prev];
      }

      try {
        localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(nextRewards));
      } catch (e) {
        console.error(e);
      }
      return nextRewards;
    });
  };

  const handleRejectCustomRequest = (requestId: string) => {
    const nextRequests = customRequests.map((r) =>
      r.id === requestId
        ? { ...r, status: 'rejected' as const, reviewedAt: new Date().toISOString() }
        : r
    );
    setCustomRequests(nextRequests);
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(nextRequests));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCustomRequest = (requestId: string) => {
    const nextRequests = customRequests.filter((r) => r.id !== requestId);
    setCustomRequests(nextRequests);
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(nextRequests));
    } catch (e) {
      console.error(e);
    }

    // Also remove from rewards if it was approved
    setRewardsList((prev) => {
      const nextRewards = prev.filter(
        (r) => r.customRequestId !== requestId && r.id !== `custom-reward-${requestId}`
      );
      try {
        localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(nextRewards));
      } catch (e) {
        console.error(e);
      }
      return nextRewards;
    });
  };

  const pendingCustomRequestsCount = customRequests.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen w-full bg-[#D8C6B7] text-[#2B1B15] font-sans antialiased" dir="rtl">
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          profile={profile}
          onOpenAuth={() => {
            setReturnScreenAfterAuth('heroes');
            setCurrentScreen('parent_auth');
          }}
          onStart={() => {
            if (!profile) {
              setReturnScreenAfterAuth('heroes');
              setCurrentScreen('parent_auth');
            } else {
              setCurrentScreen('heroes');
            }
          }}
        />
      )}

      {currentScreen === 'parent_auth' && (
        <ParentAuthScreen
          initialProfile={profile}
          onSaveProfile={handleSaveProfile}
          onBack={profile ? () => setCurrentScreen(returnScreenAfterAuth) : () => setCurrentScreen('welcome')}
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
          profile={profile}
          onCompleteTask={handleCompleteTask}
          onOpenExtraChallenges={() => setCurrentScreen('challenges')}
          onOpenRewards={() => setCurrentScreen('rewards')}
          onChangeHero={() => setCurrentScreen('heroes')}
          onOpenParentAuth={() => {
            setReturnScreenAfterAuth('home');
            setCurrentScreen('parent_auth');
          }}
          onAdjustStars={handleAdjustStars}
          onResetDailyTasks={handleResetDailyTasks}
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
          rewards={rewardsList}
          customRequests={customRequests}
          profile={profile}
          onRedeemReward={handleRedeemReward}
          onEditProfile={() => {
            setReturnScreenAfterAuth('rewards');
            setCurrentScreen('parent_auth');
          }}
          onBack={() => setCurrentScreen('home')}
          onCreateCustomRequest={handleCreateCustomRequest}
          onApproveCustomRequest={handleApproveCustomRequest}
          onRejectCustomRequest={handleRejectCustomRequest}
          onDeleteCustomRequest={handleDeleteCustomRequest}
        />
      )}

      {/* Top Random Motivational Message Toast when child receives star and returns to tasks */}
      <TopMotivationalToast
        message={motivationalMessage}
        taskTitle={motivationalTaskTitle}
        onClose={() => setMotivationalMessage(null)}
      />

      <StarCelebrationModal
        isOpen={celebrationOpen}
        onClose={handleCloseCelebration}
        taskTitle={celebratingTask?.title}
        totalStars={stars}
      />

      {/* Discreet floating button for parents: زر صغير خالص للأهل */}
      {(currentScreen === 'home' || currentScreen === 'challenges') && (
        <button
          onClick={() => {
            playPopSound();
            setShowParentModal(true);
          }}
          title="خيارات ولي الأمر"
          className="fixed bottom-3 right-3 z-40 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center text-xs opacity-40 hover:opacity-100 transition-opacity cursor-pointer shadow-md"
        >
          ⚙️
          {pendingCustomRequestsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white animate-pulse" />
          )}
        </button>
      )}

      {/* Parent Quick Controls Modal */}
      {showParentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xs rounded-3xl p-5 bg-[#FAF5EF] border-4 border-black text-center text-[#2B1B15] shadow-2xl animate-in zoom-in-95 duration-150 space-y-3">
            <h4 className="text-xl font-black mb-1">⚙️ خيارات ولي الأمر</h4>
            <p className="text-xs text-[#5C3224]">
              يمكنك متابعة طلبات هدايا طفلك، أو إعادة تعيين مهام اليوم، أو ضبط رصيد النجوم يدوياً.
            </p>

            <div className="space-y-2 text-right">
              {/* Review Custom Gift Requests Button */}
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setShowParentModal(false);
                  setShowParentRequestsModal(true);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-purple-100 hover:bg-purple-200 border-2 border-purple-700 text-purple-950 font-black text-xs flex items-center justify-between cursor-pointer transition-transform active:scale-95 shadow-2xs"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🎁</span>
                  <span>طلبات الهدايا المقترحة من الطفل</span>
                </div>
                {pendingCustomRequestsCount > 0 ? (
                  <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {pendingCustomRequestsCount} جديد 🔔
                  </span>
                ) : (
                  <span className="text-[10px] text-purple-800 font-bold">
                    ({customRequests.length})
                  </span>
                )}
              </button>

              {/* Star adjustment */}
              <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-black/20">
                <span className="text-xs font-bold">النجوم الحالية:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleAdjustStars(-1)}
                    className="w-7 h-7 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg border border-red-300 cursor-pointer"
                  >
                    -1
                  </button>
                  <span className="font-black px-2">{stars}</span>
                  <button
                    onClick={() => handleAdjustStars(1)}
                    className="w-7 h-7 bg-green-100 hover:bg-green-200 text-green-700 font-bold rounded-lg border border-green-300 cursor-pointer"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => handleAdjustStars(5)}
                    className="px-2 h-7 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-xs rounded-lg border border-amber-300 cursor-pointer"
                  >
                    +5 ⭐
                  </button>
                </div>
              </div>

              {/* Reset tasks */}
              <button
                onClick={() => {
                  handleResetDailyTasks();
                  setShowParentModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold text-xs border border-orange-300 transition-colors cursor-pointer text-center"
              >
                🔄 إعادة تعيين مهام اليوم (يوم جديد)
              </button>
            </div>

            <button
              onClick={() => setShowParentModal(false)}
              className="w-full py-2 bg-[#2B1B15] hover:bg-[#3D2619] text-white rounded-xl font-bold text-sm cursor-pointer mt-1"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* Global Parent Custom Rewards Review Modal */}
      <ParentRewardRequestsModal
        isOpen={showParentRequestsModal}
        requests={customRequests}
        onClose={() => setShowParentRequestsModal(false)}
        onApproveRequest={handleApproveCustomRequest}
        onRejectRequest={handleRejectCustomRequest}
        onDeleteRequest={handleDeleteCustomRequest}
      />
    </div>
  );
}
