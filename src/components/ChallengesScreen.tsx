import React from 'react';
import { EXTRA_CHALLENGES } from '../data/appData';
import { Task } from '../types';
import { playPopSound } from '../utils/audio';

interface ChallengesScreenProps {
  stars: number;
  completedTaskIds: string[];
  onCompleteTask: (task: Task) => void;
  onBack: () => void;
}

export const ChallengesScreen: React.FC<ChallengesScreenProps> = ({
  stars,
  completedTaskIds,
  onCompleteTask,
  onBack,
}) => {
  const [animatingChallengeId, setAnimatingChallengeId] = React.useState<string | null>(null);

  const handleChallengeClick = (challenge: Task) => {
    setAnimatingChallengeId(challenge.id);
    setTimeout(() => {
      setAnimatingChallengeId((prev) => (prev === challenge.id ? null : prev));
    }, 700);
    onCompleteTask(challenge);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center py-6 px-4 bg-[#D8C6B7] text-[#2B1B15] select-none">
      
      {/* Header matching challenges.png: تحديات الأبطال الإضافية ⭐ */}
      <div className="w-full max-w-sm pt-2 pb-3 text-center">
        <div className="flex items-center justify-between px-2 mb-2">
          {/* Back button shortcut & star counter */}
          <button
            onClick={() => {
              playPopSound();
              onBack();
            }}
            className="text-xs bg-white/70 hover:bg-white text-[#2B1B15] px-2.5 py-1 rounded-full border border-black/30 font-bold cursor-pointer"
          >
            رجوع ↩
          </button>
          <div className="flex items-center gap-1.5 bg-white/80 border border-black/30 rounded-full px-3 py-0.5 text-sm font-black">
            <span>{stars}</span>
            <span>⭐</span>
          </div>
        </div>

        <h1 
          className="text-3xl md:text-4xl font-extrabold text-[#231510] flex items-center justify-center gap-2 drop-shadow-xs"
          style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
        >
          <span className="text-yellow-400 text-3xl">⭐</span>
          <span>تحديات الأبطال الإضافية</span>
        </h1>
      </div>

      {/* 6 Additional Habit Cards matching challenges.png */}
      <div className="w-full max-w-sm my-auto py-2">
        <div className="grid grid-cols-2 gap-4">
          {EXTRA_CHALLENGES.map((challenge) => {
            const isCompleted = completedTaskIds.includes(challenge.id);
            const isAnimating = animatingChallengeId === challenge.id;

            return (
              <button
                key={challenge.id}
                onClick={() => handleChallengeClick(challenge)}
                className={`relative flex flex-col items-center justify-center min-h-[125px] p-3 rounded-3xl border-[2.5px] border-dashed border-black transition-all duration-200 cursor-pointer ${
                  isAnimating ? 'animate-task-pop ring-4 ring-yellow-400 scale-105' : 'active:scale-95'
                } ${
                  isCompleted
                    ? 'ring-3 ring-amber-400/80 shadow-md'
                    : 'hover:scale-102 hover:shadow-sm'
                }`}
                style={{
                  backgroundColor: challenge.color,
                  color: challenge.textColor,
                }}
              >
                {/* Floating Star Animation when clicked */}
                {isAnimating && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 animate-star-float flex items-center gap-1 bg-yellow-300 text-[#2B1B15] text-xs font-black px-2.5 py-0.5 rounded-full border border-black shadow-lg">
                    <span>+1</span>
                    <span>⭐</span>
                    <span>بطل!</span>
                  </div>
                )}

                {/* Completed Stamp */}
                {isCompleted && (
                  <div className="absolute top-2 right-2 bg-amber-400 text-[#2B1B15] rounded-full px-1.5 py-0.5 text-[10px] font-black border border-black shadow-xs flex items-center gap-0.5 animate-stamp-pop">
                    <span>تم</span>
                    <span>✓</span>
                  </div>
                )}

                {/* 1 Star reward indication */}
                <div className="absolute top-2 left-2 text-[10px] font-bold opacity-80 flex items-center gap-0.5">
                  <span>+1</span>
                  <span>⭐</span>
                </div>

                {/* Challenge content matching challenges.png */}
                <div className="text-center flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center justify-center gap-1 text-center">
                    <span 
                      className="text-lg md:text-xl font-black leading-tight"
                      style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
                    >
                      {challenge.title}
                    </span>
                    <span className={`text-xl transition-transform duration-300 ${
                      isAnimating ? 'scale-130 rotate-12' : ''
                    }`}>
                      {challenge.icon}
                    </span>
                  </div>

                  {challenge.subtitle && (
                    <span className="text-xs font-bold opacity-90 mt-0.5 text-center">
                      {challenge.subtitle}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Button matching challenges.png: العودة للرئيسية ⬅️ */}
      <div className="w-full max-w-xs pb-4">
        <button
          onClick={() => {
            playPopSound();
            onBack();
          }}
          className="w-full py-3.5 px-6 rounded-full bg-[#6C7075] hover:bg-[#5C6065] active:scale-95 transition-all text-white text-xl font-black flex items-center justify-center gap-3 border-[2.5px] border-[#222] shadow-[0_5px_0_#222] cursor-pointer"
          style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
        >
          <span className="text-base inline-flex items-center justify-center bg-[#5F8FA6] p-1 rounded-sm text-white">
            ⬅️
          </span>
          <span>العودة للرئيسية</span>
        </button>
      </div>

    </div>
  );
};
