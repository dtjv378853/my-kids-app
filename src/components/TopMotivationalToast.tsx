import React, { useEffect, useState } from 'react';
import { playPopSound } from '../utils/audio';

interface TopMotivationalToastProps {
  message: string | null;
  taskTitle?: string;
  onClose: () => void;
  durationMs?: number;
}

export const TopMotivationalToast: React.FC<TopMotivationalToastProps> = ({
  message,
  taskTitle,
  onClose,
  durationMs = 7000,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 250);
      }, durationMs);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message, durationMs, onClose]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-sm transition-all duration-300 pointer-events-auto ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      }`}
      dir="rtl"
    >
      <div className="relative bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-300 text-[#2B1810] border-[3px] border-black rounded-3xl p-3 shadow-2xl overflow-hidden flex items-center gap-3">
        {/* Animated star icon */}
        <div className="relative w-11 h-11 shrink-0 bg-white/90 rounded-2xl border-2 border-black flex items-center justify-center text-2xl shadow-xs animate-star-bounce">
          <span>⭐</span>
          <span className="absolute -top-1 -right-1 text-[11px]">✨</span>
        </div>

        {/* Message and task title */}
        <div className="flex-1 min-w-0 pr-0.5">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="bg-black/85 text-yellow-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              +١ نجمة ⭐ إنجاز خارق!
            </span>
            {taskTitle && (
              <span className="text-[10px] font-bold text-[#4B220C] truncate max-w-[120px]">
                ({taskTitle})
              </span>
            )}
          </div>
          <p
            className="text-xs md:text-sm font-black leading-tight text-[#2B1810] drop-shadow-2xs"
            style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
          >
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            playPopSound();
            setVisible(false);
            setTimeout(onClose, 200);
          }}
          className="w-6 h-6 rounded-full bg-black/15 hover:bg-black/30 border border-black/40 flex items-center justify-center text-xs font-black text-[#2B1810] shrink-0 cursor-pointer transition-transform active:scale-90"
          title="إغلاق التنبيه"
        >
          ✕
        </button>

        {/* Bottom subtle progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <div
            className="h-full bg-black/60 transition-all linear"
            style={{
              animation: `shrinkWidth ${durationMs}ms linear forwards`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
