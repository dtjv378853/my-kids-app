import React, { useState } from 'react';
import { CARTOON_CHARACTERS } from '../data/cartoonData';
import { CartoonCharacter, CharacterId } from '../types';
import { playBoingSound, playPopSound, speakCartoonDialogue } from '../utils/audio';
import { Sparkles, Heart, Utensils, Gamepad2, Volume2 } from 'lucide-react';

export const CharactersScreen: React.FC = () => {
  const [speakingCharId, setSpeakingCharId] = useState<CharacterId | null>(null);

  const handleSpeakBio = (char: CartoonCharacter) => {
    playBoingSound();
    setSpeakingCharId(char.id);
    speakCartoonDialogue(char.catchphrase, char.id, () => {
      setSpeakingCharId(null);
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full font-black text-xs md:text-sm border border-emerald-200 shadow-xs">
          <Heart className="w-4 h-4 text-emerald-600 fill-emerald-500" />
          <span>أبطال حارة الشطار 👥</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-amber-950">
          اتعرف على أبطال الكرتون عن قرب!
        </h2>
        <p className="text-xs md:text-sm font-bold text-amber-800 max-w-lg mx-auto">
          اضغط على أي بطل عشان تسمع لزمته الشهيرة وتعرف بيحب إيه وبيكره إيه!
        </p>
      </div>

      {/* Characters Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(CARTOON_CHARACTERS).map((char) => {
          const isSpeaking = speakingCharId === char.id;

          return (
            <div
              key={char.id}
              className="bg-white rounded-3xl border-4 border-amber-200 hover:border-amber-400 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center relative overflow-hidden group"
            >
              {/* Top Avatar */}
              <div className="relative mx-auto mb-4">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-amber-300 shadow-xl mx-auto bg-amber-50 group-hover:scale-105 transition-transform">
                  <img
                    src={char.avatar}
                    alt={char.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {isSpeaking && (
                  <span className="absolute -top-1 -right-1 text-2xl animate-bounce">
                    🗣️
                  </span>
                )}
              </div>

              {/* Name & Nickname */}
              <div className="space-y-1 mb-4">
                <h3 className="text-2xl font-black text-amber-950">
                  {char.name}
                </h3>
                <span className="text-xs font-bold text-white px-3 py-1 rounded-full inline-block shadow-xs" style={{ backgroundColor: char.color }}>
                  {char.nickname}
                </span>
              </div>

              {/* Bio Description */}
              <p className="text-xs md:text-sm font-bold text-amber-900/80 leading-relaxed mb-4">
                {char.description}
              </p>

              {/* Fun Facts (Favorite Food & Toy) */}
              <div className="bg-amber-50/70 rounded-2xl p-3 border border-amber-200 text-right space-y-2 mb-4 text-xs font-bold">
                <div className="flex items-center gap-2 text-amber-950">
                  <Utensils className="w-3.5 h-3.5 text-orange-500" />
                  <span>الأكل المفضل: {char.favoriteFood}</span>
                </div>
                <div className="flex items-center gap-2 text-amber-950">
                  <Gamepad2 className="w-3.5 h-3.5 text-purple-500" />
                  <span>اللعبة المفضلة: {char.favoriteToy}</span>
                </div>
              </div>

              {/* Catchphrase Play Button */}
              <button
                onClick={() => handleSpeakBio(char)}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-white font-black text-xs md:text-sm rounded-xl shadow-md border border-amber-300 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                <span>{isSpeaking ? 'بيتكلم...' : `اسمع لزمة ${char.name} 💬`}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
