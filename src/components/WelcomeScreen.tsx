import React from 'react';
import { WELCOME_HERO_IMAGE } from '../data/appData';
import { playPopSound } from '../utils/audio';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center py-6 px-4 bg-[#D1BEAE] text-[#3D2619] overflow-hidden select-none">
      
      {/* Header Titles Area matching welcome.png */}
      <div className="w-full max-w-sm pt-2 z-10 flex flex-col items-center">
        
        {/* Arabic Title with Yellow Crayon Star on its left */}
        <div className="w-full flex items-center justify-center relative px-2">
          {/* Yellow crayon star neatly on the top-left margin */}
          <div className="absolute left-1 -top-1 select-none pointer-events-none">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="#F8E16C" stroke="#D1B036" strokeWidth="1.5">
              <polygon points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5" />
            </svg>
          </div>

          <h1 
            className="text-5xl md:text-6xl font-extrabold tracking-wide text-[#542B21] drop-shadow-xs text-center"
            style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
          >
            عالم الأبطال
          </h1>
        </div>

        {/* English Subtitle with the 3 doodle stars right beside it on the right side */}
        <div className="w-full flex items-center justify-between px-3 mt-1 relative">
          <p 
            className="text-2xl md:text-3xl font-black italic tracking-wider text-[#5C3224]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            A World of Heroes
          </p>

          {/* Outlined doodle stars placed beside 'A World of Heroes' on the right side */}
          <div className="select-none pointer-events-none flex flex-col items-end -mt-1 mr-1">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2B1A13" strokeWidth="2.2" className="transform rotate-12">
              <polygon points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5" />
            </svg>
            <div className="flex gap-2 -mt-1 mr-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B1A13" strokeWidth="2.2" className="transform -rotate-12">
                <polygon points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5" />
              </svg>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2B1A13" strokeWidth="2.2" className="transform rotate-6">
                <polygon points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Center Hero Character Image (Completely clean with NO stars or sparkles overlapping the hero) */}
      <div className="relative my-auto flex items-center justify-center max-w-sm w-full py-2">
        <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-103 active:scale-97">
          <img
            src={WELCOME_HERO_IMAGE}
            alt="بطل عالم الأبطال"
            referrerPolicy="no-referrer"
            className="w-full max-h-[55vh] object-contain drop-shadow-[0_12px_24px_rgba(50,25,10,0.35)] rounded-2xl"
          />
        </div>
      </div>

      {/* Wooden Plank Start Button at Bottom */}
      <div className="w-full max-w-xs pb-4 z-10">
        <button
          onClick={() => {
            playPopSound();
            onStart();
          }}
          className="wood-button w-full py-4 px-6 rounded-2xl text-center cursor-pointer transition-all duration-200 active:scale-95 group"
        >
          <span 
            className="text-3xl md:text-4xl font-extrabold text-[#52291E] tracking-wider block group-hover:scale-105 transition-transform"
            style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
          >
            ابدأ المغامرة
          </span>
        </button>
      </div>

    </div>
  );
};
