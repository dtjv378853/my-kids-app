import React from 'react';
import { HEROES } from '../data/appData';
import { Hero } from '../types';
import { playPopSound } from '../utils/audio';

interface HeroesScreenProps {
  selectedHeroId: string;
  onSelectHero: (heroId: string) => void;
  onConfirm: () => void;
}

export const HeroesScreen: React.FC<HeroesScreenProps> = ({
  selectedHeroId,
  onSelectHero,
  onConfirm,
}) => {
  const currentHero = HEROES.find((h) => h.id === selectedHeroId) || HEROES[0];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center py-6 px-4 bg-[#D3BEAF] text-[#2B1B15] overflow-y-auto select-none">
      
      {/* Decorative stars in header like heroes.png */}
      <div className="w-full max-w-md flex items-center justify-between px-2 pt-2">
        <div className="flex gap-1 text-yellow-500 text-xl animate-pulse">
          <span>✨</span>
          <span className="text-sm">⭐</span>
        </div>
        <h1 
          className="text-4xl md:text-5xl font-extrabold text-[#231510] tracking-wide text-center"
          style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
        >
          اختر بطلك الخارق
        </h1>
        <div className="w-6"></div>
      </div>

      {/* Hero Cards Grid: 2x2 exact layout like heroes.png */}
      <div className="w-full max-w-sm my-auto py-4">
        <div className="grid grid-cols-2 gap-4">
          {HEROES.map((hero: Hero) => {
            const isSelected = hero.id === selectedHeroId;

            return (
              <div
                key={hero.id}
                onClick={() => {
                  playPopSound();
                  onSelectHero(hero.id);
                }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform active:scale-95 ${
                  isSelected
                    ? 'ring-4 ring-[#2B1B15] scale-102 shadow-[0_8px_20px_rgba(0,0,0,0.35)]'
                    : 'hover:scale-101 shadow-md opacity-90 hover:opacity-100'
                }`}
                style={{
                  border: isSelected ? '4px solid #C47E64' : '4px solid #C47E64',
                  backgroundColor: '#0F1115',
                }}
              >
                {/* Hero 3D Render Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-black">
                  <img
                    src={hero.image}
                    alt={hero.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-108"
                  />

                  {/* Active selection checkmark badge */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1 shadow-lg border-2 border-white animate-in zoom-in-75 duration-200">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}

                  {/* Hero Emblem overlay badge at bottom-left */}
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-xs px-2 py-0.5 rounded-full text-white font-bold border border-white/20">
                    {hero.badge}
                  </div>
                </div>

                {/* Hero Name Banner */}
                <div 
                  className="py-1.5 px-2 text-center font-bold text-sm transition-colors text-white"
                  style={{
                    backgroundColor: isSelected ? '#3D2018' : '#261510',
                  }}
                >
                  <p className="truncate">{hero.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Hero Info snippet */}
        <div className="mt-3 text-center bg-white/40 border border-[#C47E64]/40 rounded-xl py-1.5 px-3">
          <p className="text-xs font-semibold text-[#542F24]">
            قوة {currentHero.name}: <span className="font-bold text-[#2B1B15]">{currentHero.powerDescription}</span>
          </p>
        </div>
      </div>

      {/* Start Button: يلا نبدأ ✨ matching heroes.png */}
      <div className="w-full max-w-xs pb-4">
        <button
          onClick={() => {
            playPopSound();
            onConfirm();
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#D68868] hover:bg-[#CC7A58] active:scale-95 transition-all text-[#2B1B15] font-black text-3xl flex items-center justify-center gap-3 border-[3px] border-[#2B1B15] comic-shadow cursor-pointer group"
          style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
        >
          <span className="text-yellow-300 text-3xl group-hover:scale-125 transition-transform">
            ✨
          </span>
          <span>يلا نبدأ</span>
        </button>
      </div>

    </div>
  );
};
