import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { playCelebrationSound, playPopSound, toggleMute, getIsMuted } from '../utils/audio';

interface StarCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskTitle?: string;
  totalStars?: number;
}

const ENCOURAGING_MESSAGES = [
  { text: 'أنت بطل حقيقي نفتخر بك دائماً!', icon: '🌟', badge: 'فخر الأبطال' },
  { text: 'عاش البطل! خطوة جديدة ومميزة نحو القمة!', icon: '🚀', badge: 'عزيمة خارقة' },
  { text: 'ما شاء الله عليك! كل يوم تصبح أقوى وأذكى!', icon: '💪', badge: 'قوة وذكاء' },
  { text: 'أفعالك الطيبة تجعل عائلتك فخورة وسعيدة بك جداً!', icon: '💖', badge: 'قلب طيب' },
  { text: 'أنت تملك طاقة خارقة تصنع بها أشياء مدهشة!', icon: '⚡', badge: 'طاقة إيجابية' },
  { text: 'النظام والترتيب سر الأبطال العظماء وأنت منهم!', icon: '🏆', badge: 'بطل منظم' },
  { text: 'استمر في التألق يا بطل، مستقبلك مشرق وجميل!', icon: '☀️', badge: 'نجم المستقبل' },
  { text: 'أنت قدوة رائعة وتثبت دائماً أنك قد التحدي!', icon: '🎯', badge: 'قد التحدي' },
  { text: 'برافو يا شجاع! لا شيء مستحيل أمام عزيمتك!', icon: '🥇', badge: 'شجاعة فائقة' },
  { text: 'عمل رائع ومتقن، أحسنت صنعاً يا بطلنا المميز!', icon: '👏', badge: 'إتقان وتميز' },
];

export const StarCelebrationModal: React.FC<StarCelebrationModalProps> = ({
  isOpen,
  onClose,
  taskTitle,
  totalStars = 1,
}) => {
  const [currentMessage, setCurrentMessage] = useState(ENCOURAGING_MESSAGES[0]);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(getIsMuted());
  const [displayStars, setDisplayStars] = useState<number>(Math.max(0, totalStars - 1));
  const [starCountPulsing, setStarCountPulsing] = useState<boolean>(false);

  // Trigger celebration effects on modal open
  useEffect(() => {
    if (isOpen) {
      // Pick random encouraging message
      const randomIndex = Math.floor(Math.random() * ENCOURAGING_MESSAGES.length);
      setCurrentMessage(ENCOURAGING_MESSAGES[randomIndex]);

      // Set initial count before increase
      const prevStars = Math.max(0, totalStars - 1);
      setDisplayStars(prevStars);
      setStarCountPulsing(false);

      // Play rich celebration audio (poppers, brass fanfare, magic harp)
      playCelebrationSound();

      // Launch cheerful confetti
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FF69B4', '#00CED1', '#32CD32', '#FFA500'],
        });

        // Second side bursts
        setTimeout(() => {
          confetti({
            particleCount: 45,
            angle: 60,
            spread: 60,
            origin: { x: 0 },
            colors: ['#FFD700', '#FF1493', '#00E5FF'],
          });
          confetti({
            particleCount: 45,
            angle: 120,
            spread: 60,
            origin: { x: 1 },
            colors: ['#FFD700', '#FF1493', '#00E5FF'],
          });
        }, 260);
      } catch (e) {
        console.error(e);
      }

      // Animate star count increment (+1) with celebratory pulse
      const timer = setTimeout(() => {
        setDisplayStars(totalStars);
        setStarCountPulsing(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, totalStars]);

  const handleNextMessage = () => {
    playPopSound();
    let nextIndex = Math.floor(Math.random() * ENCOURAGING_MESSAGES.length);
    if (ENCOURAGING_MESSAGES[nextIndex].text === currentMessage.text) {
      nextIndex = (nextIndex + 1) % ENCOURAGING_MESSAGES.length;
    }
    setCurrentMessage(ENCOURAGING_MESSAGES[nextIndex]);
  };

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = toggleMute();
    setIsAudioMuted(muted);
    if (!muted) {
      playPopSound();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm rounded-[32px] p-5 text-center relative overflow-hidden shadow-2xl border-4 border-[#3D2619] transition-all transform scale-100"
        style={{
          background: 'linear-gradient(180deg, #FDE8C7 0%, #F8D3DF 50%, #E9CBE5 100%)',
        }}
      >
        {/* Audio Mute/Unmute Toggle in top corner */}
        <button
          onClick={handleToggleSound}
          title={isAudioMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
          className="absolute top-3.5 left-3.5 z-20 w-8 h-8 rounded-full bg-white/70 hover:bg-white border border-[#2B1B15]/30 flex items-center justify-center text-sm shadow-xs cursor-pointer transition-transform active:scale-90"
        >
          {isAudioMuted ? '🔇' : '🔊'}
        </button>

        {/* Subtle decorative background stars */}
        <div className="absolute top-4 right-10 text-yellow-400 text-xl animate-pulse">✨</div>
        <div className="absolute top-12 right-4 text-yellow-400 text-lg animate-pulse delay-100">⭐</div>
        <div className="absolute bottom-20 left-4 text-pink-400 text-lg">💖</div>
        <div className="absolute bottom-24 right-4 text-yellow-300 text-xl">✨</div>

        {/* Top Text as seen in video: أحسنت يا بطل 🎉 */}
        <div className="mt-1 mb-2">
          <h2 className="text-3xl font-extrabold text-[#381E14] flex items-center justify-center gap-2 drop-shadow-xs">
            <span>🎉</span>
            <span>أحسنت يا بطل</span>
          </h2>
          {taskTitle && (
            <p className="text-xs font-semibold text-[#663828] mt-0.5 bg-white/60 inline-block px-3 py-0.5 rounded-full border border-[#D9B59F]">
              أتممت: {taskTitle}
            </p>
          )}
        </div>

        {/* The Smiling Happy Kawaii Star matching the video */}
        <div className="my-2.5 flex justify-center items-center">
          <div className="relative animate-star-bounce">
            {/* Glowing aura */}
            <div className="absolute inset-0 rounded-full bg-yellow-300/60 blur-xl scale-125" />
            
            <svg
              width="125"
              height="125"
              viewBox="0 0 100 100"
              className="relative drop-shadow-[0_8px_16px_rgba(234,179,8,0.4)]"
            >
              <defs>
                <linearGradient id="starGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFF066" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </linearGradient>
              </defs>
              
              {/* Star Body with bold comic outline */}
              <polygon
                points="50,5 64,34 96,39 73,62 78,94 50,79 22,94 27,62 4,39 36,34"
                fill="url(#starGrad)"
                stroke="#2B1810"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              
              {/* Left Eye */}
              <circle cx="42" cy="45" r="3.2" fill="#2B1810" />
              <circle cx="43" cy="44" r="1.1" fill="#FFFFFF" />
              
              {/* Right Eye */}
              <circle cx="58" cy="45" r="3.2" fill="#2B1810" />
              <circle cx="59" cy="44" r="1.1" fill="#FFFFFF" />

              {/* Rosy Cheeks */}
              <ellipse cx="36" cy="51" rx="3.5" ry="2" fill="#F87171" opacity="0.75" />
              <ellipse cx="64" cy="51" rx="3.5" ry="2" fill="#F87171" opacity="0.75" />

              {/* Happy Smile */}
              <path
                d="M 44 52 Q 50 60 56 52"
                fill="none"
                stroke="#2B1810"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Text under star: لقد حصلت على نجمة جديدة 🤩 */}
        <div className="mb-2">
          <p className="text-xl font-bold text-[#3B2014] flex items-center justify-center gap-1.5">
            <span>لقد حصلت على نجمة جديدة</span>
            <span className="text-2xl">🤩</span>
          </p>

          {/* Real-time Star Increment Badge */}
          <div className="flex items-center justify-center gap-2 mt-1.5">
            <span className="font-bold text-amber-900 bg-amber-100/90 border border-amber-300 px-3 py-0.5 rounded-full text-xs shadow-xs">
              +1 نجمة ذهبية ⭐
            </span>
            <span className={`font-black text-xs px-3 py-0.5 rounded-full border border-emerald-400 bg-emerald-50 text-emerald-900 transition-all duration-300 ${
              starCountPulsing ? 'scale-110 shadow-md ring-2 ring-emerald-300' : ''
            }`}>
              إجمالي نجومك الآن: {displayStars} ⭐
            </span>
          </div>
        </div>

        {/* Animated Encouraging Message Card below the star */}
        <div 
          onClick={handleNextMessage}
          title="انقر للحصول على رسالة تشجيعية أخرى!"
          className="mb-3.5 mx-1 p-2.5 rounded-2xl bg-white/90 border-2 border-[#D97706] shadow-sm hover:shadow-md cursor-pointer transition-all transform hover:scale-102 active:scale-98 animate-in slide-in-from-bottom-2 duration-300 relative group"
        >
          {/* Badge indicator */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span>{currentMessage.icon}</span>
              <span>{currentMessage.badge}</span>
            </span>
            <span className="text-[10px] text-amber-800 opacity-60 group-hover:opacity-100 transition-opacity font-semibold flex items-center gap-0.5">
              <span>رسالة أخرى</span>
              <span>🔄</span>
            </span>
          </div>

          {/* Animated Message Text */}
          <p 
            key={currentMessage.text}
            className="text-xs md:text-sm font-extrabold text-[#381B10] leading-snug animate-in fade-in zoom-in-95 duration-200"
            style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
          >
            « {currentMessage.text} »
          </p>
        </div>

        {/* Bottom Button as seen in video: العودة للمهام ⬅️ */}
        <button
          onClick={() => {
            playPopSound();
            onClose();
          }}
          className="w-full py-3 px-6 rounded-2xl bg-white hover:bg-slate-50 active:scale-95 transition-all text-[#2B1B15] text-xl font-extrabold flex items-center justify-center gap-3 border-[3px] border-[#2B1B15] comic-shadow cursor-pointer"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[#6699AA] text-white text-base">
            ⬅️
          </span>
          <span>العودة للمهام</span>
        </button>
      </div>
    </div>
  );
};
