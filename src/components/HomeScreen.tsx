import React from 'react';
import { HEROES } from '../data/appData';
import { Task, Hero, ParentChildProfile } from '../types';
import { playPopSound } from '../utils/audio';

interface HomeScreenProps {
  stars: number;
  selectedHeroId: string;
  tasks: Task[];
  completedTaskIds: string[];
  profile?: ParentChildProfile | null;
  onCompleteTask: (task: Task) => void;
  onOpenExtraChallenges: () => void;
  onOpenRewards: () => void;
  onChangeHero: () => void;
  onOpenParentAuth?: () => void;
  onAdjustStars?: (delta: number) => void;
  onResetDailyTasks?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  stars,
  selectedHeroId,
  tasks,
  completedTaskIds,
  profile,
  onCompleteTask,
  onOpenExtraChallenges,
  onOpenRewards,
  onChangeHero,
  onOpenParentAuth,
  onAdjustStars,
  onResetDailyTasks,
}) => {
  const currentHero: Hero = HEROES.find((h) => h.id === selectedHeroId) || HEROES[0];
  const [animatingTaskId, setAnimatingTaskId] = React.useState<string | null>(null);
  const [showParentControls, setShowParentControls] = React.useState<boolean>(false);

  // Animated star counter state for interactive escalation
  const [displayedStars, setDisplayedStars] = React.useState<number>(stars);
  const [isIncrementing, setIsIncrementing] = React.useState<boolean>(false);
  const [starGainDelta, setStarGainDelta] = React.useState<number | null>(null);
  const [showSparkles, setShowSparkles] = React.useState<boolean>(false);
  const prevStarsRef = React.useRef<number>(stars);

  React.useEffect(() => {
    if (stars > prevStarsRef.current) {
      const delta = stars - prevStarsRef.current;
      setStarGainDelta(delta);
      setIsIncrementing(true);
      setShowSparkles(true);

      // Stepping counter up smoothly so the child sees the numbers climbing
      const startVal = prevStarsRef.current;
      const targetVal = stars;
      const stepDuration = Math.min(80, Math.max(30, 400 / delta));
      let currentVal = startVal;

      const interval = setInterval(() => {
        currentVal += 1;
        setDisplayedStars(currentVal);
        if (currentVal >= targetVal) {
          clearInterval(interval);
        }
      }, stepDuration);

      const resetTimer = setTimeout(() => {
        setIsIncrementing(false);
        setStarGainDelta(null);
        setShowSparkles(false);
      }, 1300);

      prevStarsRef.current = stars;
      return () => {
        clearInterval(interval);
        clearTimeout(resetTimer);
      };
    } else {
      setDisplayedStars(stars);
      prevStarsRef.current = stars;
    }
  }, [stars]);

  const childDisplayName = profile
    ? `${profile.childFirstName}${profile.childSecondName ? ` ${profile.childSecondName}` : ''}`
    : '';

  const handleTaskClick = (task: Task) => {
    setAnimatingTaskId(task.id);
    setTimeout(() => {
      setAnimatingTaskId((prev) => (prev === task.id ? null : prev));
    }, 700);
    onCompleteTask(task);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center py-6 px-4 bg-[#D8C6B7] text-[#2B1B15] select-none">
      
      {/* Top Header matching home.png */}
      <div className="w-full max-w-sm flex items-center justify-between gap-2 pt-1 pb-3">
        {/* Star Counter Pill on Left with Interactive Escalation */}
        <div
          className={`relative flex items-center gap-1.5 bg-white/95 border-[2.5px] rounded-full px-3.5 py-1.5 shadow-sm transition-all duration-300 ${
            isIncrementing ? 'animate-star-pill-pulse scale-105 border-amber-600' : 'border-black'
          }`}
        >
          {/* Floating +N Stars badge animation */}
          {starGainDelta !== null && starGainDelta > 0 && (
            <div
              key={`gain-${displayedStars}`}
              className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-amber-400 text-amber-950 font-black text-xs px-2.5 py-0.5 rounded-full border-2 border-black comic-shadow-sm pointer-events-none z-30 animate-gain-fly-up whitespace-nowrap shadow-md"
            >
              <span>+{starGainDelta}</span>
              <span className="text-sm">⭐</span>
            </div>
          )}

          {/* Sparkles around pill */}
          {showSparkles && (
            <div className="absolute inset-0 pointer-events-none z-20">
              <span className="absolute -top-2 -right-1 text-sm animate-sparkle-burst-1">✨</span>
              <span className="absolute -bottom-2 -left-1 text-xs animate-sparkle-burst-2">🌟</span>
              <span className="absolute -top-1 -left-2 text-xs animate-sparkle-burst-3">⭐</span>
            </div>
          )}

          {/* Animated Ascending Number */}
          <span
            key={displayedStars}
            className={`text-2xl font-black text-[#2B1B15] tracking-wider min-w-[28px] text-center inline-block ${
              isIncrementing ? 'animate-star-num-pop' : ''
            }`}
          >
            {displayedStars}
          </span>

          {/* Glowing smiling star icon */}
          <div
            className={`relative w-7 h-7 flex items-center justify-center ${
              isIncrementing ? 'animate-star-celebrate' : 'animate-star-bounce'
            }`}
          >
            <svg width="28" height="28" viewBox="0 0 100 100">
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

          {/* Tiny Parent Quick Controls Button */}
          <button
            onClick={() => {
              playPopSound();
              setShowParentControls(true);
            }}
            title="تحكم الأهل: تعديل النجوم وإعادة مهام اليوم"
            className="w-5 h-5 rounded-full bg-amber-200 hover:bg-amber-300 border border-black/70 flex items-center justify-center text-[10px] cursor-pointer transition-transform active:scale-90 mr-0.5 shadow-2xs"
          >
            ⚙️
          </button>
        </div>

        {/* Center Child Hero Name & Mother Account Button */}
        {onOpenParentAuth && (
          <button
            onClick={() => {
              playPopSound();
              onOpenParentAuth();
            }}
            className="flex flex-col items-center bg-white/85 hover:bg-white border-2 border-black rounded-2xl px-3 py-1 shadow-xs cursor-pointer transition-transform active:scale-95"
            title="بيانات دخول الأم واسم الطفل"
          >
            <span className="text-xs font-black text-[#2B1B15] truncate max-w-[140px]">
              {childDisplayName ? `🦸‍♂️ البطل ${childDisplayName}` : '👩‍👦 تسجيل اسم البطل'}
            </span>
            <span className="text-[10px] font-bold text-[#5C3224]">
              {profile?.parentName ? `ماما ${profile.parentName} ✎` : 'دخول الأم ✎'}
            </span>
          </button>
        )}

        {/* Hero Avatar with Ink Ring Border on Right + Return/Change Badge */}
        <button
          onClick={() => {
            playPopSound();
            onChangeHero();
          }}
          title="الرجوع لشاشة الأبطال واختيار بطل آخر"
          className="relative group cursor-pointer focus:outline-hidden"
        >
          {/* Clean circular hero avatar */}
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-[2.5px] border-white shadow-md ring-2 ring-black/30 transition-transform group-hover:scale-105 active:scale-95 bg-white">
            <img
              src={currentHero.image}
              alt={currentHero.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
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
            const isAnimating = animatingTaskId === task.id;

            return (
              <button
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className={`relative flex flex-col items-center justify-center min-h-[125px] p-3 rounded-3xl border-[2.5px] border-dashed border-black transition-all duration-200 cursor-pointer ${
                  isAnimating ? 'animate-task-pop ring-4 ring-yellow-400 scale-105' : 'active:scale-95'
                } ${
                  isCompleted
                    ? 'ring-3 ring-amber-400/80 shadow-md'
                    : 'hover:scale-102 hover:shadow-sm'
                }`}
                style={{
                  backgroundColor: task.color,
                  color: task.textColor,
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

                {/* Completed Stamp or Badge */}
                {isCompleted && (
                  <div className="absolute top-2 right-2 bg-amber-400 text-[#2B1B15] rounded-full px-1.5 py-0.5 text-xs font-black border border-black shadow-xs flex items-center gap-0.5 animate-stamp-pop">
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
                  <span className={`text-3xl filter drop-shadow-xs select-none mt-0.5 transition-transform duration-300 ${
                    isAnimating ? 'scale-130 rotate-12' : ''
                  }`}>
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

      {/* Small Parent Quick Controls Modal */}
      {showParentControls && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
          <div className="w-full max-w-xs rounded-3xl p-5 bg-[#FFF8F0] border-[3px] border-black comic-shadow text-center space-y-3.5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-black/15 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#2B1B15]">
                <span>⚙️</span>
                <span>تحكم الأهل السريع</span>
              </div>
              <button
                type="button"
                onClick={() => setShowParentControls(false)}
                className="w-6 h-6 rounded-full bg-stone-200 hover:bg-stone-300 border border-black text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs font-bold text-[#5C3224]">
              الرصيد الحالي: <span className="font-black text-amber-900 text-sm">{stars} ⭐</span>
            </div>

            {/* Quick Star Adjustment Buttons: +1, -1, +5 */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  onAdjustStars?.(1);
                }}
                className="py-2.5 px-1 rounded-xl bg-emerald-100 hover:bg-emerald-200 border-2 border-emerald-700 font-black text-xs text-emerald-950 cursor-pointer transition-transform active:scale-95 shadow-2xs"
              >
                +١ نجمة ⭐
              </button>

              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  onAdjustStars?.(-1);
                }}
                className="py-2.5 px-1 rounded-xl bg-rose-100 hover:bg-rose-200 border-2 border-rose-700 font-black text-xs text-rose-950 cursor-pointer transition-transform active:scale-95 shadow-2xs"
              >
                -١ نجمة ❌
              </button>

              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  onAdjustStars?.(5);
                }}
                className="py-2.5 px-1 rounded-xl bg-amber-200 hover:bg-amber-300 border-2 border-amber-700 font-black text-xs text-amber-950 cursor-pointer transition-transform active:scale-95 shadow-2xs"
              >
                +٥ نجوم 🌟
              </button>
            </div>

            {/* Reset Today's Tasks */}
            <button
              type="button"
              onClick={() => {
                playPopSound();
                onResetDailyTasks?.();
                setShowParentControls(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-100 hover:bg-sky-200 border-2 border-sky-700 text-sky-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-transform active:scale-95 shadow-2xs"
            >
              <span>🔄</span>
              <span>إعادة مهام اليوم (تصفير المهام)</span>
            </button>

            <button
              type="button"
              onClick={() => setShowParentControls(false)}
              className="w-full py-2 rounded-xl bg-stone-200 hover:bg-stone-300 font-bold text-xs text-[#2B1B15] cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
