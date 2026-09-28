import React from 'react';
import { HEROES } from '../data/appData';
import { Task, Hero } from '../types';
import { playPopSound } from '../utils/audio';

interface HomeScreenProps {
  stars: number;
  selectedHeroId: string;
  tasks: Task[];
  completedTaskIds: string[];
  onCompleteTask: (task: Task) => void;
  onOpenExtraChallenges: () => void;
  onOpenRewards: () => void;
  onChangeHero: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  stars,
  selectedHeroId,
  tasks,
  completedTaskIds,
  onCompleteTask,
  onOpenExtraChallenges,
  onOpenRewards,
  onChangeHero,
}) => {
  const currentHero: Hero = HEROES.find((h) => h.id === selectedHeroId) || HEROES[0];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center py-6 px-4 bg-[#D8C6B7] text-[#2B1B15] select-none">
      
      {/* Top Header matching home.png */}
      <div className="w-full max-w-sm flex items-center justify-between pt-1 pb-4">
        {/* Star Counter Pill on Left */}
        <div className="relative flex items-center gap-2 bg-white/90 border-[2.5px] border-black rounded-full px-5 py-1.5 shadow-sm">
          <span className="text-2xl font-black text-[#2B1B15] tracking-wider min-w-[24px] text-center">
            {stars}
          </span>
          {/* Glowing smiling star icon */}
          <div className="relative w-8 h-8 flex items-center justify-center animate-star-bounce">
            <svg width="30" height="30" viewBox="0 0 100 100">
              <polygon
                points="50,5 64,34 96,39 73,62 78,94 50,79 22,94 27,62 4,39 36,34"
                fill="#FFD200"
                stroke="#E5A100"
                strokeWidth="4"
              />
              <circle cx="43" cy="46" r="3.5" fill="#2B1810" />
              <circle cx="57" cy="46" r="3.5" fill="#2B1810" />
              <path d="M 45 54 Q 50 60 55 54" fill="none" stroke="#2B1810" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Hero Avatar with Ink Ring Border on Right + Return/Change Badge */}
        <button
          onClick={() => {
            playPopSound();
            onChangeHero();
          }}
          title="الرجوع لشاشة الأبطال واختيار بطل آخر"
          className="relative group cursor-pointer focus:outline-hidden"
        >
          {/* Ink stroke style circle */}
          <div className="relative w-16 h-16 rounded-full p-1 flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#1A1412"
                strokeWidth="6"
                strokeDasharray="90 8 45 6"
                strokeLinecap="round"
                className="transform -rotate-45"
              />
              <circle
                cx="50"
                cy="50"
                r="41"
                fill="none"
                stroke="#1A1412"
                strokeWidth="2"
                opacity="0.6"
              />
            </svg>
            <div className="w-12 h-12 rounded-full overflow-hidden bg-black border border-black/40">
              <img
                src={currentHero.image}
                alt={currentHero.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Clear Return/Switch Hero Badge on the Avatar corner */}
          <div 
            className="absolute -bottom-1 -left-1 bg-amber-300 hover:bg-amber-400 text-[#2B1B15] w-6 h-6 rounded-full border-2 border-black flex items-center justify-center shadow-xs transition-transform group-hover:scale-110"
            title="تغيير البطل"
          >
            <span className="text-xs font-black leading-none">↩</span>
          </div>
        </button>
      </div>

      {/* 6 Main Hero Daily Habit Cards matching home.png */}
      <div className="w-full max-w-sm my-auto py-2">
        <div className="grid grid-cols-2 gap-4">
          {tasks.map((task) => {
            const isCompleted = completedTaskIds.includes(task.id);

            return (
              <button
                key={task.id}
                onClick={() => {
                  onCompleteTask(task);
                }}
                className={`relative flex flex-col items-center justify-center min-h-[125px] p-3 rounded-3xl border-[2.5px] border-dashed border-black transition-all duration-200 cursor-pointer active:scale-95 ${
                  isCompleted
                    ? 'ring-3 ring-amber-400/80 shadow-md'
                    : 'hover:scale-102 hover:shadow-sm'
                }`}
                style={{
                  backgroundColor: task.color,
                  color: task.textColor,
                }}
              >
                {/* Completed Stamp or Badge */}
                {isCompleted && (
                  <div className="absolute top-2 right-2 bg-amber-400 text-[#2B1B15] rounded-full px-1.5 py-0.5 text-xs font-black border border-black shadow-xs flex items-center gap-0.5">
                    <span>تم</span>
                    <span>✓</span>
                  </div>
                )}

                {/* 1 Star reward indication per user instruction: "على كل مهمة نجمة واحدة بس" */}
                <div className="absolute top-2 left-2 text-[11px] font-bold opacity-80 flex items-center gap-0.5">
                  <span>+1</span>
                  <span>⭐</span>
                </div>

                {/* Card Title & Icon matching home.png */}
                <div className="text-center mt-2 flex flex-col items-center justify-center gap-1">
                  <span 
                    className="text-xl md:text-2xl font-black leading-tight drop-shadow-xs"
                    style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
                  >
                    {task.title}
                  </span>
                  <span className="text-3xl filter drop-shadow-xs select-none mt-0.5">
                    {task.icon}
                  </span>
                </div>

                {/* Subtitle / guidance hint */}
                {task.subtitle && (
                  <p className="text-[10px] text-center font-medium opacity-75 mt-1 line-clamp-1">
                    {task.subtitle}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Buttons matching home.png */}
      <div className="w-full max-w-sm pt-4 pb-2 flex items-center justify-between gap-3">
        {/* Left: Kraft paper dashed button: هدايا الأبطال 🎉 🧸 */}
        <button
          onClick={() => {
            playPopSound();
            onOpenRewards();
          }}
          className="flex-1 py-2 px-3 rounded-xl bg-[#BEA38B] hover:bg-[#B3967C] active:scale-95 transition-all border-[2px] border-dashed border-black cursor-pointer text-center relative shadow-sm"
        >
          <div className="text-base font-extrabold text-[#231510] leading-tight">
            هدايا الأبطال
          </div>
          <div className="text-lg flex items-center justify-center gap-1 mt-0.5">
            <span>🎉</span>
            <span>🧸</span>
          </div>
        </button>

        {/* Right: Folded Corner Mauve Button: المزيد من التحديات ⬅️ */}
        <button
          onClick={() => {
            playPopSound();
            onOpenExtraChallenges();
          }}
          className="flex-1 folded-corner-button py-3 px-4 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 text-white font-extrabold text-lg shadow-md"
          style={{
            backgroundColor: '#B5847B',
          }}
        >
          <span className="text-base inline-flex items-center justify-center bg-[#5F8FA6] p-1 rounded-sm text-white">
            ⬅️
          </span>
          <span className="text-sm md:text-base font-black text-[#20100C]">
            المزيد من التحديات
          </span>
        </button>
      </div>

    </div>
  );
};
