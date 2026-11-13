import React, { useState } from 'react';
import { CARTOON_CHARACTERS } from '../data/cartoonData';
import { CharacterId } from '../types';
import {
  playPopSound,
  playBoingSound,
  playCelebrationSound,
  playSlideWhistle,
  speakCartoonDialogue,
  stopSpeaking,
} from '../utils/audio';
import { Sparkles, Play, Film, MessageSquare, RotateCcw, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESET_LINES: Record<CharacterId, string[]> = {
  bondok: [
    'يا خبر أبيض يا جدعان! السندوتش طار في الهوا ونزل في حضني!',
    'بطني بتصوصو يا ناس.. عايزين نطلب 10 طعميات بالسمسم!',
    'يلا بينا ننط نطة كرتونية من فوق السحاب.. ووووي!',
    'أنا بندق الشقي.. مفيش مغامرة بتفوتني أبداً!',
  ],
  basbousa: [
    'اصبر يا بندق وبلاش تهور.. المخ قبل العضلات!',
    'أنا فحصت اللغز بالعدسة السحرية.. الحل طلع في منتهى البساطة!',
    'يا عيني عليك يا بندق لما تفتكس وتعمل مصيبة!',
    'الخطة نجحت 10 على 10 وبقينا أشطر فريق في الحارة!',
  ],
  ammi_felfel: [
    'يا صباح السعادة والسكر زيادة على أحلى كتاكيت في الدنيا!',
    'عندي فزورة جديدة لعيونكم.. مين الشاطر اللي هيعرف الحل؟',
    'طعمية سخنة مقرمشة وريحتها تجيب لآخر الشارع!',
    'نورتوا حارة الشطار.. ضحكتكم دي بالدنيا كلها!',
  ],
  robot: [
    'بيب بوب.. تم تشغيل مكنة الآيس كريم.. تجهيز كرات المانجو!',
    'إنذار طاقة.. زيادة سكر في الحارة بنسبة 100%!',
  ],
};

const STAGE_BACKGROUNDS = [
  { id: 'street', name: 'حارة الشطار 🏘️', gradient: 'from-amber-200 via-orange-100 to-sky-200' },
  { id: 'lab', name: 'معمل الاختراعات 🧪', gradient: 'from-purple-200 via-indigo-100 to-blue-200' },
  { id: 'park', name: 'حديقة الألعاب 🌳', gradient: 'from-emerald-200 via-teal-100 to-lime-200' },
  { id: 'kitchen', name: 'مطبخ عم فلفل 🧆', gradient: 'from-yellow-200 via-amber-100 to-orange-200' },
];

export const CartoonStudioScreen: React.FC = () => {
  const [selectedCharId, setSelectedCharId] = useState<CharacterId>('bondok');
  const [selectedBg, setSelectedBg] = useState(STAGE_BACKGROUNDS[0]);
  const [dialogueText, setDialogueText] = useState<string>(PRESET_LINES.bondok[0]);
  const [customText, setCustomText] = useState<string>('');
  const [isPlayingScene, setIsPlayingScene] = useState<boolean>(false);
  const [isCharacterJumping, setIsCharacterJumping] = useState<boolean>(false);

  const character = CARTOON_CHARACTERS[selectedCharId];

  const handleSelectCharacter = (charId: CharacterId) => {
    playPopSound();
    setSelectedCharId(charId);
    if (PRESET_LINES[charId] && PRESET_LINES[charId].length > 0) {
      setDialogueText(PRESET_LINES[charId][0]);
    }
  };

  const handleSelectPreset = (text: string) => {
    playPopSound();
    setDialogueText(text);
    setCustomText('');
  };

  const handlePlayCartoonScene = () => {
    const textToSpeak = customText.trim() || dialogueText;
    if (!textToSpeak) return;

    playBoingSound();
    setIsPlayingScene(true);
    setIsCharacterJumping(true);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });

    speakCartoonDialogue(textToSpeak, selectedCharId, () => {
      setIsCharacterJumping(false);
      setIsPlayingScene(false);
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-1.5 rounded-full font-black text-xs md:text-sm border border-pink-200 shadow-xs">
          <Film className="w-4 h-4 text-pink-600" />
          <span>مسرح صانع الكرتون للأطفال 🎭</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-amber-950">
          ألّف مشهد كرتوني بالعامية وشوفه بيمثل لايف!
        </h2>
        <p className="text-xs md:text-sm font-bold text-amber-800 max-w-xl mx-auto">
          اختر بطلك المفضل، المكان، والجملة المضحكة.. واضغط تشغيل عشان الشخصية تنط وتتكلم بصوتها الكرتوني!
        </p>
      </div>

      {/* Interactive Cartoon Stage Preview */}
      <div className={`relative rounded-3xl md:rounded-[36px] overflow-hidden border-4 md:border-8 border-amber-400 shadow-2xl p-6 min-h-[360px] md:min-h-[400px] flex flex-col justify-between bg-gradient-to-b ${selectedBg.gradient}`}>
        {/* Background Sparkles */}
        <div className="absolute top-4 left-6 text-3xl animate-bounce" style={{ animationDuration: '3s' }}>
          ✨
        </div>
        <div className="absolute top-8 right-8 text-4xl animate-pulse">
          🌈
        </div>

        {/* Scene Info Tag */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="bg-white/90 backdrop-blur-sm text-amber-950 font-black text-xs md:text-sm px-3.5 py-1.5 rounded-full border border-amber-300 shadow-xs">
            المكان: {selectedBg.name}
          </span>

          <span className="bg-white/90 backdrop-blur-sm text-orange-950 font-black text-xs md:text-sm px-3.5 py-1.5 rounded-full border border-orange-300 shadow-xs">
            البطل: {character.name} {character.id === 'bondok' ? '🐰' : character.id === 'basbousa' ? '🐱' : '🦜'}
          </span>
        </div>

        {/* Comic Speech Bubble */}
        <div className="relative z-20 mx-auto max-w-lg w-full my-4">
          <div className="bg-white rounded-3xl p-5 border-4 border-amber-400 shadow-xl relative text-center">
            <div
              className="absolute -top-3.5 right-6 px-3 py-0.5 rounded-full font-black text-xs text-white shadow-md"
              style={{ backgroundColor: character.color }}
            >
              {character.name} بيمثل:
            </div>

            <p className="text-amber-950 font-extrabold text-base md:text-xl leading-relaxed mt-1">
              "{customText.trim() || dialogueText}"
            </p>

            {/* Bubble Tail */}
            <div className="absolute -bottom-3 right-1/2 transform translate-x-1/2 w-6 h-6 bg-white border-b-4 border-r-4 border-amber-400 rotate-45"></div>
          </div>
        </div>

        {/* Animated Character on Stage */}
        <div className="relative z-10 flex flex-col items-center pb-2">
          <div
            className={`transition-transform duration-300 transform ${
              isCharacterJumping ? '-translate-y-12 scale-110 rotate-6' : 'hover:scale-105'
            }`}
          >
            <img
              src={character.avatar}
              alt={character.name}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-white shadow-2xl bg-amber-100"
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handlePlayCartoonScene}
              disabled={isPlayingScene}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:brightness-110 text-white font-black text-base md:text-lg rounded-2xl shadow-xl border-2 border-white flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{isPlayingScene ? 'بيمثل الآن...' : 'شغّل المشهد بالصوت! 🚀'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Studio Settings */}
      <div className="bg-white rounded-3xl border-4 border-amber-200 p-6 shadow-md space-y-6">
        {/* 1. Pick Character */}
        <div>
          <h4 className="font-black text-base md:text-lg text-amber-950 mb-3 flex items-center gap-2">
            <span>1. اختار بطل المشهد:</span>
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {(['bondok', 'basbousa', 'ammi_felfel'] as CharacterId[]).map((cId) => {
              const char = CARTOON_CHARACTERS[cId];
              const isSelected = selectedCharId === cId;
              return (
                <button
                  key={cId}
                  onClick={() => handleSelectCharacter(cId)}
                  className={`p-3 rounded-2xl border-3 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 shadow-md scale-102'
                      : 'border-amber-100 hover:border-amber-300 bg-white'
                  }`}
                >
                  <img
                    src={char.avatar}
                    alt={char.name}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div className="text-center">
                    <span className="font-black text-xs md:text-sm text-amber-950 block">
                      {char.name}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 hidden sm:inline">
                      {char.id === 'bondok' ? '🐰 شقي' : char.id === 'basbousa' ? '🐱 ذكية' : '🦜 حكيم'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Pick Stage Background */}
        <div>
          <h4 className="font-black text-base md:text-lg text-amber-950 mb-3 flex items-center gap-2">
            <span>2. اختار المكان والخلفية:</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {STAGE_BACKGROUNDS.map((bg) => (
              <button
                key={bg.id}
                onClick={() => {
                  playPopSound();
                  setSelectedBg(bg);
                }}
                className={`p-3 rounded-2xl border-2 font-bold text-xs md:text-sm text-center transition-all cursor-pointer ${
                  selectedBg.id === bg.id
                    ? 'border-amber-500 bg-amber-500 text-white shadow-md'
                    : 'border-amber-200 bg-amber-50/50 text-amber-900 hover:bg-amber-100'
                }`}
              >
                {bg.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Choose or Write Egyptian Slang Dialogue */}
        <div>
          <h4 className="font-black text-base md:text-lg text-amber-950 mb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-600" />
            <span>3. اختار جملة بالعامية أو اكتب فكرتك:</span>
          </h4>

          {/* Preset Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {PRESET_LINES[selectedCharId]?.map((line, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(line)}
                className={`p-3 rounded-xl border-2 text-right text-xs md:text-sm font-bold transition-all cursor-pointer ${
                  dialogueText === line && !customText
                    ? 'border-amber-500 bg-amber-100/90 text-amber-950 shadow-xs'
                    : 'border-amber-100 bg-amber-50/40 text-amber-900 hover:bg-amber-100'
                }`}
              >
                "{line}"
              </button>
            ))}
          </div>

          {/* Custom text input */}
          <div className="relative">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="أو اكتب أي كلام بالعامية تحب الشخصية تقوله هنا... (مثلاً: إلحقوا البطة طارت!)"
              className="w-full px-4 py-3 rounded-2xl border-2 border-amber-300 focus:border-amber-500 focus:outline-none font-bold text-sm md:text-base text-amber-950 placeholder-amber-400 bg-amber-50/30 shadow-inner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
