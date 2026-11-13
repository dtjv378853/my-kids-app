import React from 'react';
import { Tv, Sparkles, Volume2, VolumeX, Users, Volume1, Film, Wand2 } from 'lucide-react';
import { playPopSound, toggleMute, getIsMuted, getVoiceMode, setVoiceMode, VoiceMode } from '../utils/audio';

interface NavbarProps {
  currentTab: 'episodes' | 'studio' | 'soundboard' | 'characters';
  setCurrentTab: (tab: 'episodes' | 'studio' | 'soundboard' | 'characters') => void;
  stars: number;
}

export const CartoonNavbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  stars,
}) => {
  const [muted, setMuted] = React.useState<boolean>(getIsMuted());
  const [voiceMode, setVoiceModeState] = React.useState<VoiceMode>(getVoiceMode());

  const handleMuteToggle = () => {
    const isNowMuted = toggleMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      playPopSound();
    }
  };

  const handleVoiceModeToggle = () => {
    playPopSound();
    const nextMode: VoiceMode = voiceMode === 'cartoon_sfx' ? 'natural_human' : 'cartoon_sfx';
    setVoiceMode(nextMode);
    setVoiceModeState(nextMode);
  };

  const navItems = [
    { id: 'episodes', label: 'حلقات الكرتون', icon: Tv, color: 'bg-amber-500' },
    { id: 'studio', label: 'صانع الكرتون', icon: Film, color: 'bg-pink-500' },
    { id: 'soundboard', label: 'إفيهات وضحك', icon: Volume1, color: 'bg-purple-500' },
    { id: 'characters', label: 'أبطال الحارة', icon: Users, color: 'bg-emerald-500' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-300 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <div 
          onClick={() => {
            playPopSound();
            setCurrentTab('episodes');
          }}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md border-2 border-white transform group-hover:scale-105 group-hover:rotate-3 transition-transform text-2xl">
            🐰🐱
          </div>
          <div>
            <h1 className="font-extrabold text-xl md:text-2xl text-amber-900 tracking-tight leading-none">
              بندق وبسبوسة
            </h1>
            <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
              كرتون بالعامية المصرية ✨
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-amber-50 p-1.5 rounded-2xl border-2 border-amber-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playPopSound();
                  setCurrentTab(item.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md scale-102'
                    : 'text-amber-900 hover:bg-amber-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'animate-bounce' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side: Voice Style, Stars Badge & Audio Toggle */}
        <div className="flex items-center gap-2">
          {/* Voice Mode Toggle (Cartoon Chatter vs Spoken Voice) */}
          <button
            onClick={handleVoiceModeToggle}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 font-black text-xs transition-all active:scale-95 cursor-pointer shadow-xs ${
              voiceMode === 'cartoon_sfx'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-purple-300'
                : 'bg-white text-purple-900 border-purple-300 hover:bg-purple-50'
            }`}
            title="تغيير ستايل الصوت"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>
              {voiceMode === 'cartoon_sfx' ? 'أصوات كرتونية 🎵' : 'صوت كلام عربي 🗣️'}
            </span>
          </button>

          {/* Star Counter */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 px-3 py-1.5 rounded-2xl shadow-sm">
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-extrabold text-amber-950 text-base">{stars}</span>
            <span className="text-xs font-bold text-amber-700 hidden sm:inline">نجمة</span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={handleMuteToggle}
            className={`p-2.5 rounded-2xl border-2 transition-all transform active:scale-95 ${
              muted
                ? 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100'
                : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100'
            }`}
            title={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
            aria-label="Toggle sound"
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-amber-200 bg-amber-50/90 py-1.5 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playPopSound();
                setCurrentTab(item.id);
              }}
              className={`flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'text-amber-700 bg-amber-200/70 font-black'
                  : 'text-amber-900/70'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-600' : ''}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
