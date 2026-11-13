import React, { useState } from 'react';
import { SOUNDBOARD_ITEMS, CARTOON_CHARACTERS } from '../data/cartoonData';
import { SoundboardItem, CharacterId } from '../types';
import {
  playPopSound,
  playBoingSound,
  playCelebrationSound,
  playCartoonGiggle,
  playSlideWhistle,
  speakCartoonDialogue,
} from '../utils/audio';
import { Volume2, Sparkles, Smile, Laugh } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SoundboardScreen: React.FC = () => {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const handlePlaySound = (item: SoundboardItem) => {
    setActiveItemId(item.id);

    // Play fun sound effects
    if (item.id === 'sb-1') playBoingSound();
    else if (item.id === 'sb-2') playPopSound();
    else if (item.id === 'sb-3') playSlideWhistle('up');
    else if (item.id === 'sb-4') playBoingSound();
    else if (item.id === 'sb-5') playCelebrationSound();
    else if (item.id === 'sb-7') playCartoonGiggle();
    else playPopSound();

    if (item.id === 'sb-8' || item.id === 'sb-5') {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    }

    // Speak the catchphrase
    speakCartoonDialogue(item.quote, item.characterId, () => {
      setActiveItemId(null);
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full font-black text-xs md:text-sm border border-purple-200 shadow-xs">
          <Laugh className="w-4 h-4 text-purple-600" />
          <span>صندوق الإفيهات والضحك الكرتوني 🔊</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-amber-950">
          إفيهات حارة الشطار بالعامية!
        </h2>
        <p className="text-xs md:text-sm font-bold text-amber-800 max-w-lg mx-auto">
          اضغط على أي كارت عشان تسمع بندق وبسبوسة وعم فلفل بيقولوا أشهر جملهم الكوميدية!
        </p>
      </div>

      {/* Grid of Soundboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SOUNDBOARD_ITEMS.map((item) => {
          const char = CARTOON_CHARACTERS[item.characterId];
          const isActive = activeItemId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handlePlaySound(item)}
              className={`p-5 rounded-3xl border-4 text-right transition-all flex flex-col justify-between h-48 cursor-pointer relative overflow-hidden group ${
                isActive
                  ? 'scale-105 shadow-2xl border-amber-500 bg-amber-50'
                  : 'border-amber-200 bg-white hover:border-amber-400 hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              {/* Top Row: Character Avatar & Emoji */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <img
                    src={char.avatar}
                    alt={char.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-300 shadow-xs"
                  />
                  <span className="font-extrabold text-xs text-amber-950">
                    {char.name}
                  </span>
                </div>
                <span className="text-2xl transform group-hover:scale-125 transition-transform">
                  {item.emoji}
                </span>
              </div>

              {/* Middle: Catchphrase Quote */}
              <div className="my-2">
                <h4 className="font-black text-base text-amber-950 mb-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs font-bold text-amber-800/80 line-clamp-2">
                  "{item.quote}"
                </p>
              </div>

              {/* Bottom: Play Indicator */}
              <div className="flex items-center justify-between w-full pt-2 border-t border-amber-100 text-[11px] font-extrabold">
                <span className="text-amber-600 flex items-center gap-1">
                  <Volume2 className={`w-3.5 h-3.5 ${isActive ? 'animate-bounce text-amber-600' : ''}`} />
                  {isActive ? 'بيتكلم...' : 'اسمع الإفيه'}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
