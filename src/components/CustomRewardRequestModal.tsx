import React, { useState } from 'react';
import { CustomRewardRequest } from '../types';
import { playPopSound, playFanfareSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CustomRewardRequestModalProps {
  isOpen: boolean;
  childName?: string;
  onClose: () => void;
  onSubmitRequest: (request: Omit<CustomRewardRequest, 'id' | 'createdAt' | 'status'>) => void;
}

const GIFT_ICONS = [
  '🚲', '🎮', '🧸', '🍦', '🎨', '⚽', 
  '📚', '🎪', '🚀', '🍕', '🎯', '🎸', 
  '🏊‍♂️', '🐶', '🧁', '🏎️', '🍿', '🎬'
];

const INSPIRATION_IDEAS = [
  { title: 'دراجة هوائية جديدة', icon: '🚲', cost: 40 },
  { title: 'رحلة إلى الملاهي', icon: '🎡', cost: 50 },
  { title: 'لعبة تركيب وليجو', icon: '🧱', cost: 30 },
  { title: 'آيس كريم كبير مع صوص', icon: '🍦', cost: 15 },
  { title: 'حضور فيلم في السينما', icon: '🎬', cost: 35 },
  { title: 'يوم لعب في حديقة الحيوان', icon: '🦁', cost: 45 },
  { title: 'ألوان وأدوات رسم جديدة', icon: '🎨', cost: 20 },
  { title: 'بيتزا عملاقة بالجبنة', icon: '🍕', cost: 25 },
];

export const CustomRewardRequestModal: React.FC<CustomRewardRequestModalProps> = ({
  isOpen,
  childName = 'البطل',
  onClose,
  onSubmitRequest,
}) => {
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🎁');
  const [proposedCost, setProposedCost] = useState(25);
  const [childMessage, setChildMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    playFanfareSound();
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error(err);
    }

    onSubmitRequest({
      title: title.trim(),
      icon: selectedIcon,
      proposedCost,
      childMessage: childMessage.trim() || undefined,
      childName,
    });

    setSubmitted(true);
  };

  const handleApplyIdea = (idea: { title: string; icon: string; cost: number }) => {
    playPopSound();
    setTitle(idea.title);
    setSelectedIcon(idea.icon);
    setProposedCost(idea.cost);
  };

  const handleResetAndClose = () => {
    playPopSound();
    setSubmitted(false);
    setTitle('');
    setSelectedIcon('🎁');
    setProposedCost(25);
    setChildMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/60 backdrop-blur-xs select-none overflow-y-auto" dir="rtl">
      <div className="relative w-full max-w-md rounded-3xl p-5 md:p-6 bg-[#FFF9F2] border-4 border-black comic-shadow my-auto">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          type="button"
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 font-black flex items-center justify-center border-2 border-black cursor-pointer text-sm"
        >
          ✕
        </button>

        {submitted ? (
          /* Confirmation Screen */
          <div className="text-center py-4 space-y-4">
            <div className="text-6xl animate-bounce">💌✨</div>
            <h3 className="text-2xl font-black text-[#2B1B15]">
              عاش يا {childName}! تم إرسال طلبك 🚀
            </h3>
            
            <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 text-right space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedIcon}</span>
                <div>
                  <h4 className="font-black text-lg text-[#2B1B15]">{title}</h4>
                  <p className="text-xs font-bold text-amber-800">
                    النجوم المقترحة من قبلك: {proposedCost} ⭐
                  </p>
                </div>
              </div>
              {childMessage && (
                <p className="text-xs text-stone-600 bg-white/80 p-2 rounded-xl border border-amber-200 mt-2">
                  <span className="font-bold text-amber-900">رسالتك لماما وبابا:</span> &quot;{childMessage}&quot;
                </p>
              )}
            </div>

            <p className="text-xs md:text-sm font-semibold text-[#5C3224] leading-relaxed">
              تم إرسال الطلب بنجاح! سيقوم ولي الأمر (ماما أو بابا) بمراجعته واعتماده، وبمجرد الموافقة ستظهر هديتك في قائمة الهدايا لتستبدلها بنجومك عندما تجمعها! 🌟
            </p>

            <button
              onClick={handleResetAndClose}
              type="button"
              className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-lg border-2 border-black comic-shadow-sm cursor-pointer"
            >
              رائع، فهمت يا بطل! 🤩
            </button>
          </div>
        ) : (
          /* The Gift Proposal Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center gap-2 bg-amber-100 border-2 border-amber-500 rounded-full px-3 py-1 mb-2">
                <span className="text-lg">🎁</span>
                <span className="text-xs font-black text-amber-900">اقتراح هدية خاصة</span>
                <span className="text-base">✨</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#231510]">
                ما الهدية التي تحلم بها يا {childName}؟
              </h3>
              <p className="text-xs text-[#5C3224] mt-1">
                اقترح هديتك الخاصة، وسيقوم ولي الأمر بمراجعتها واعتمادها لك!
              </p>
            </div>

            {/* Quick Inspiration Pills */}
            <div>
              <label className="block text-xs font-black text-[#2B1B15] mb-1.5">
                أفكار سريعة لهدايا يحبها الأبطال:
              </label>
              <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
                {INSPIRATION_IDEAS.slice(0, 4).map((idea) => (
                  <button
                    key={idea.title}
                    type="button"
                    onClick={() => handleApplyIdea(idea)}
                    className="shrink-0 text-[11px] font-bold bg-white hover:bg-amber-100 text-[#2B1B15] px-2.5 py-1 rounded-full border border-black/30 cursor-pointer flex items-center gap-1 transition-colors"
                  >
                    <span>{idea.icon}</span>
                    <span>{idea.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gift Title Input */}
            <div>
              <label className="block text-xs font-black text-[#2B1B15] mb-1">
                اسم الهدية أو النشاط <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثلاً: دراجة جديدة، لعبة ليجو، زيارة الملاهي..."
                  className="flex-1 py-2 px-3 text-sm font-bold bg-white border-2 border-black rounded-xl text-[#2B1B15] placeholder:text-stone-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <div className="w-11 h-11 bg-white border-2 border-black rounded-xl flex items-center justify-center text-2xl shadow-2xs">
                  {selectedIcon}
                </div>
              </div>
            </div>

            {/* Icon Picker */}
            <div>
              <label className="block text-xs font-black text-[#2B1B15] mb-1.5">
                اختر رمز الهدية المناسب:
              </label>
              <div className="grid grid-cols-9 gap-1 bg-white p-2 rounded-2xl border border-black/20">
                {GIFT_ICONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setSelectedIcon(icon);
                    }}
                    className={`w-7 h-7 text-lg rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                      selectedIcon === icon
                        ? 'bg-amber-300 border-2 border-black scale-110 shadow-xs'
                        : 'hover:bg-stone-100'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Proposed Star Cost */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-black text-[#2B1B15]">
                  كم نجمة تقترح لهذه الهدية؟
                </label>
                <span className="text-xs font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                  {proposedCost} نجمة ⭐
                </span>
              </div>
              
              {/* Presets */}
              <div className="flex gap-1.5 justify-between mb-2">
                {[10, 15, 20, 25, 30, 50].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      playPopSound();
                      setProposedCost(num);
                    }}
                    className={`flex-1 py-1 text-xs font-black rounded-lg border cursor-pointer transition-all ${
                      proposedCost === num
                        ? 'bg-amber-400 border-black shadow-2xs font-extrabold text-[#2B1B15]'
                        : 'bg-white border-black/20 text-stone-700 hover:bg-amber-50'
                    }`}
                  >
                    {num}⭐
                  </button>
                ))}
              </div>

              {/* Fine stepper */}
              <div className="flex items-center justify-center gap-3 bg-white p-1.5 rounded-xl border border-black/20">
                <button
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setProposedCost((prev) => Math.max(5, prev - 5));
                  }}
                  className="w-7 h-7 bg-stone-100 hover:bg-stone-200 text-stone-700 font-black rounded-lg border border-black/30 cursor-pointer text-xs"
                >
                  -5
                </button>
                <span className="text-sm font-black text-[#2B1B15] min-w-[60px] text-center">
                  {proposedCost} نجمة
                </span>
                <button
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setProposedCost((prev) => Math.min(100, prev + 5));
                  }}
                  className="w-7 h-7 bg-stone-100 hover:bg-stone-200 text-stone-700 font-black rounded-lg border border-black/30 cursor-pointer text-xs"
                >
                  +5
                </button>
              </div>
            </div>

            {/* Message to Parent */}
            <div>
              <label className="block text-xs font-black text-[#2B1B15] mb-1">
                رسالة تشجيعية لماما أو بابا (اختياري):
              </label>
              <input
                type="text"
                value={childMessage}
                onChange={(e) => setChildMessage(e.target.value)}
                placeholder="مثلاً: أوعدكم أكون بطل شاطر وأرتب غرفتي كل يوم!"
                className="w-full py-2 px-3 text-xs bg-white border-2 border-black rounded-xl text-[#2B1B15] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 pt-1">
              <button
                type="submit"
                disabled={!title.trim()}
                className="flex-1 py-3 rounded-2xl bg-[#E65100] hover:bg-[#D84315] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-white font-black text-base border-2 border-black comic-shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>إرسال الطلب لماما وبابا</span>
                <span>🚀</span>
              </button>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="py-3 px-4 rounded-2xl bg-stone-200 hover:bg-stone-300 active:scale-95 text-stone-800 font-bold text-sm border-2 border-black cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
