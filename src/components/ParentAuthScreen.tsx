import React, { useState } from 'react';
import { ParentChildProfile } from '../types';
import { playPopSound } from '../utils/audio';

interface ParentAuthScreenProps {
  initialProfile: ParentChildProfile | null;
  onSaveProfile: (profile: ParentChildProfile) => void;
  onBack?: () => void;
}

export const ParentAuthScreen: React.FC<ParentAuthScreenProps> = ({
  initialProfile,
  onSaveProfile,
  onBack,
}) => {
  const [parentName, setParentName] = useState(initialProfile?.parentName || '');
  const [parentContact, setParentContact] = useState(initialProfile?.parentContact || '');
  const [childFirstName, setChildFirstName] = useState(initialProfile?.childFirstName || '');
  const [childSecondName, setChildSecondName] = useState(initialProfile?.childSecondName || '');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playPopSound();

    if (!parentName.trim()) {
      setErrorMsg('يرجى كتابة اسم الأم لتسجيل الدخول 🌸');
      return;
    }
    if (!childFirstName.trim()) {
      setErrorMsg('يرجى كتابة اسم الطفل الأول (إجباري) 🦸‍♂️');
      return;
    }

    setErrorMsg('');
    const newProfile: ParentChildProfile = {
      parentName: parentName.trim(),
      parentContact: parentContact.trim() || undefined,
      childFirstName: childFirstName.trim(),
      childSecondName: childSecondName.trim() || undefined,
      registeredAt: initialProfile?.registeredAt || new Date().toISOString(),
    };

    onSaveProfile(newProfile);
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-between items-center py-6 px-4 bg-[#D3BEAF] text-[#2B1B15] select-none overflow-y-auto"
      dir="rtl"
    >
      {/* Top Header */}
      <div className="w-full max-w-md pt-1 pb-3 text-center">
        {onBack && (
          <div className="flex justify-start mb-2">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                onBack();
              }}
              className="text-xs bg-white/80 hover:bg-white text-[#2B1B15] px-3 py-1 rounded-full border border-black/30 font-bold cursor-pointer"
            >
              رجوع ↩
            </button>
          </div>
        )}

        <div className="inline-flex items-center justify-center gap-2 bg-amber-100 border-2 border-black rounded-2xl px-4 py-1.5 shadow-xs mb-2">
          <span className="text-xl">👩‍👧‍👦</span>
          <span className="text-sm font-black text-[#4A2511]">
            بوابة تسجيل الدخول (تملأها الأم)
          </span>
        </div>

        <h1
          className="text-3xl md:text-4xl font-extrabold text-[#231510] tracking-wide drop-shadow-xs"
          style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
        >
          تسجيل دخول الأم والبطل
        </h1>
        <p className="text-xs md:text-sm font-bold text-[#5C3224] mt-1">
          سجّلي بياناتك واسم طفلك لحفظ نجومه وتشجيعه على المهام اليومية في عالم الأبطال ⭐🦸‍♂️
        </p>
      </div>

      {/* Login Form Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#FFF8F0] rounded-3xl p-5 border-[3px] border-black comic-shadow space-y-4 my-auto"
      >
        {errorMsg && (
          <div className="bg-rose-100 border-2 border-rose-600 text-rose-900 rounded-2xl p-3 text-xs font-black text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Section 1: Child Name (First Required, Second Optional) */}
        <div className="bg-amber-50/90 border-2 border-dashed border-amber-700/50 rounded-2xl p-3.5 space-y-3">
          <div className="flex items-center gap-1.5 text-sm font-black text-[#3D2018]">
            <span>🦸‍♂️</span>
            <span>بيانات البطل الصغير:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Child First Name - Required */}
            <div>
              <label className="block text-xs font-black text-[#2B1B15] mb-1">
                اسم الطفل الأول <span className="text-rose-600 font-black">(إجباري *)</span>
              </label>
              <input
                type="text"
                required
                value={childFirstName}
                onChange={(e) => setChildFirstName(e.target.value)}
                placeholder="مثال: آدم / مريم"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#2B1B15] placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Child Second Name - Optional */}
            <div>
              <label className="block text-xs font-black text-[#2B1B15] mb-1">
                الاسم الثاني للطفل <span className="text-emerald-700 font-bold">(اختياري)</span>
              </label>
              <input
                type="text"
                value={childSecondName}
                onChange={(e) => setChildSecondName(e.target.value)}
                placeholder="اسم الأب أو العائلة (اختياري)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black/70 text-sm font-bold text-[#2B1B15] placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Mother Login Info */}
        <div className="bg-sky-50/70 border-2 border-dashed border-sky-700/40 rounded-2xl p-3.5 space-y-3">
          <div className="flex items-center gap-1.5 text-sm font-black text-[#13354E]">
            <span>👩‍👦</span>
            <span>بيانات الأم:</span>
          </div>

          <div>
            <label className="block text-xs font-black text-[#2B1B15] mb-1">
              اسم الأم / ولي الأمر <span className="text-rose-600">(إجباري *)</span>
            </label>
            <input
              type="text"
              required
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="اكتبي اسمك هنا (لتسجيل الحساب)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#2B1B15] placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-[#2B1B15] mb-1">
              رقم الموبايل أو وسيلة التواصل <span className="text-emerald-700 font-bold">(اختياري)</span>
            </label>
            <input
              type="text"
              value={parentContact}
              onChange={(e) => setParentContact(e.target.value)}
              placeholder="مثال: 010xxxxxxxx (اختياري)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black/70 text-sm font-bold text-[#2B1B15] placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-2xl bg-[#D68868] hover:bg-[#CC7A58] active:scale-95 transition-all text-[#2B1B15] font-black text-xl flex items-center justify-center gap-2 border-[3px] border-black comic-shadow cursor-pointer"
        >
          <span>✨</span>
          <span>حفظ وتسجيل الدخول للمغامرة</span>
        </button>
      </form>

      {/* Footer note */}
      <div className="w-full max-w-md pt-3 text-center">
        <p className="text-[11px] font-bold text-[#5C3224]">
          🔒 جميع البيانات تُحفظ محلياً على جهازك لتشجيع بطلك ومتابعة نجومه.
        </p>
      </div>
    </div>
  );
};
