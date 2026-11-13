import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playPopSound, playCelebrationSound, playBoingSound } from '../utils/audio';
import { Sparkles, Trophy } from 'lucide-react';

interface IceCreamGameProps {
  onGameComplete: () => void;
}

interface Scoop {
  id: number;
  emoji: string;
  name: string;
  x: number;
  y: number;
  speed: number;
  caught: boolean;
}

const FLAVORS = [
  { emoji: '🥭', name: 'مانجو مثلج' },
  { emoji: '🍓', name: 'فراولة بالسكر' },
  { emoji: '🍫', name: 'شوكولاتة بندق' },
  { emoji: '🍦', name: 'فانيليا كراميل' },
  { emoji: '🍉', name: 'بطيخ منعش' },
];

export const IceCreamGame: React.FC<IceCreamGameProps> = ({ onGameComplete }) => {
  const [scoops, setScoops] = useState<Scoop[]>([]);
  const [caughtCount, setCaughtCount] = useState<number>(0);
  const targetCount = 7;
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Spawn scoops periodically
  useEffect(() => {
    if (isFinished) return;

    const interval = setInterval(() => {
      setScoops((prev) => {
        if (prev.length >= 6) return prev;
        const flavor = FLAVORS[Math.floor(Math.random() * FLAVORS.length)];
        const newScoop: Scoop = {
          id: Date.now() + Math.random(),
          emoji: flavor.emoji,
          name: flavor.name,
          x: Math.floor(Math.random() * 80) + 10, // 10% to 90%
          y: -10,
          speed: Math.random() * 1.5 + 1.2,
          caught: false,
        };
        return [...prev, newScoop];
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isFinished]);

  // Animate falling scoops
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setScoops((prev) =>
        prev
          .map((s) => ({ ...s, y: s.y + s.speed }))
          .filter((s) => s.y < 105 && !s.caught)
      );
    }, 50);

    return () => clearInterval(timer);
  }, [isFinished]);

  const handleCatch = (id: number) => {
    playPopSound();
    setScoops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, caught: true } : s))
    );

    const nextCount = caughtCount + 1;
    setCaughtCount(nextCount);

    if (nextCount >= targetCount && !isFinished) {
      setIsFinished(true);
      playCelebrationSound();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="relative w-full h-80 md:h-96 bg-gradient-to-b from-sky-200 via-pink-100 to-amber-100 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-inner p-4 select-none">
      {/* Game Header */}
      <div className="relative z-10 flex items-center justify-between bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl border-2 border-amber-300 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍦</span>
          <div>
            <h4 className="font-extrabold text-sm md:text-base text-amber-950 leading-tight">
              المس الآيس كريم المتطاير في الهوا!
            </h4>
            <p className="text-xs font-bold text-amber-700">
              ساعد بندق وبسبوسة يجمعوا {targetCount} كرات آيس كريم
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-amber-500 text-white px-3 py-1 rounded-xl font-black text-sm">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>{caughtCount} / {targetCount}</span>
        </div>
      </div>

      {/* Falling Ice Cream Scoops Area */}
      <div className="absolute inset-0">
        {scoops.map((scoop) => (
          <button
            key={scoop.id}
            onClick={() => handleCatch(scoop.id)}
            style={{
              left: `${scoop.x}%`,
              top: `${scoop.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute transition-transform active:scale-125 focus:outline-none cursor-pointer flex flex-col items-center group"
          >
            <div className="text-4xl md:text-5xl drop-shadow-lg transform hover:scale-110 active:rotate-12 transition-transform">
              {scoop.emoji}
            </div>
            <span className="text-[10px] font-bold bg-white/90 text-amber-950 px-1.5 py-0.5 rounded-full shadow-xs whitespace-nowrap opacity-80 group-hover:opacity-100">
              {scoop.name}
            </span>
          </button>
        ))}
      </div>

      {/* Completion Overlay */}
      {isFinished && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-20 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 text-center max-w-sm border-4 border-amber-400 shadow-2xl transform scale-105 transition-transform">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="font-extrabold text-2xl text-amber-950 mb-1">
              يا فنان يا بطل! 🍨🎉
            </h3>
            <p className="text-sm font-bold text-amber-800 mb-4 leading-relaxed">
              جمعت كل الآيس كريم وبندق وبسبوسة والحارة كلها بيشكروا شطارتك!
            </p>
            <button
              onClick={() => {
                playBoingSound();
                onGameComplete();
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-lg rounded-2xl shadow-lg border-2 border-amber-300 hover:brightness-110 active:scale-95 transition-all"
            >
              كمّل الحلقة وشوف المفاجأة! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
