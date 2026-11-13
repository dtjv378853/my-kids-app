import React, { useState, useEffect } from 'react';
import { CartoonEpisode, CartoonScene, SceneChoiceOption, CharacterId } from '../types';
import { CARTOON_CHARACTERS } from '../data/cartoonData';
import {
  playPopSound,
  playBoingSound,
  playCelebrationSound,
  playSlideWhistle,
  playCartoonGiggle,
  playSplatSound,
  speakCartoonDialogue,
  stopSpeaking,
  getVoiceMode,
  setVoiceMode,
  VoiceMode,
} from '../utils/audio';
import { IceCreamGame } from './IceCreamGame';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Sparkles,
  RotateCcw,
  Trophy,
  PartyPopper,
  Hand,
  Play,
  Pause,
  Wand2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlayerProps {
  episode: CartoonEpisode;
  onClose: () => void;
  onEpisodeCompleted: (stars: number) => void;
}

export const EpisodePlayerModal: React.FC<PlayerProps> = ({
  episode,
  onClose,
  onEpisodeCompleted,
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<SceneChoiceOption | null>(null);
  const [isGameCompleted, setIsGameCompleted] = useState<boolean>(false);
  const [isEpisodeFinished, setIsEpisodeFinished] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [characterBounce, setCharacterBounce] = useState<CharacterId | null>(null);

  const scene: CartoonScene = episode.scenes[currentSceneIndex] || episode.scenes[0];
  const dialogue = scene.dialogues[currentDialogueIndex];
  const hasChoices = Boolean(scene.choice);
  const allDialoguesRead = currentDialogueIndex >= scene.dialogues.length - 1;

  // Speak the dialogue when it changes
  useEffect(() => {
    if (!dialogue || isEpisodeFinished) return;

    // Trigger associated sound effect
    if (dialogue.soundEffect === 'boing') playBoingSound();
    else if (dialogue.soundEffect === 'giggle') playCartoonGiggle();
    else if (dialogue.soundEffect === 'splat') playSplatSound();
    else if (dialogue.soundEffect === 'whistle') playSlideWhistle('up');
    else if (dialogue.soundEffect === 'celebrate') playCelebrationSound();

    // Trigger visual bounce on the speaking character
    if (dialogue.characterId !== 'narrator') {
      setCharacterBounce(dialogue.characterId as CharacterId);
      setTimeout(() => setCharacterBounce(null), 800);
    }

    // Speak with Egyptian cartoon tone
    setIsSpeaking(true);
    speakCartoonDialogue(
      dialogue.text,
      dialogue.characterId as CharacterId,
      () => {
        setIsSpeaking(false);
      }
    );

    return () => {
      stopSpeaking();
    };
  }, [currentSceneIndex, currentDialogueIndex, isEpisodeFinished]);

  const handleNextDialogue = () => {
    playPopSound();
    if (currentDialogueIndex < scene.dialogues.length - 1) {
      setCurrentDialogueIndex(prev => prev + 1);
      setSelectedChoice(null);
    }
  };

  const handlePrevDialogue = () => {
    playPopSound();
    if (currentDialogueIndex > 0) {
      setCurrentDialogueIndex(prev => prev - 1);
      setSelectedChoice(null);
    }
  };

  const handleReplayDialogue = () => {
    playPopSound();
    if (!dialogue) return;
    setIsSpeaking(true);
    speakCartoonDialogue(
      dialogue.text,
      dialogue.characterId as CharacterId,
      () => setIsSpeaking(false)
    );
  };

  const handleChoiceSelect = (option: SceneChoiceOption) => {
    setSelectedChoice(option);
    if (option.soundEffect === 'celebrate') {
      playCelebrationSound();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } else if (option.soundEffect === 'boing') {
      playBoingSound();
    } else {
      playPopSound();
    }

    setCharacterBounce(option.characterReactionId);
    speakCartoonDialogue(
      option.reactionText,
      option.characterReactionId,
      () => setCharacterBounce(null)
    );
  };

  const handleNextScene = () => {
    playPopSound();
    if (currentSceneIndex < episode.scenes.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
      setCurrentDialogueIndex(0);
      setSelectedChoice(null);
      setIsGameCompleted(false);
    } else {
      // Episode completed!
      setIsEpisodeFinished(true);
      playCelebrationSound();
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
      });
      onEpisodeCompleted(episode.starsReward);
    }
  };

  const handleCharacterTap = (charId: CharacterId) => {
    playBoingSound();
    setCharacterBounce(charId);
    const char = CARTOON_CHARACTERS[charId];
    if (char) {
      const randomPhrase = char.phrases[Math.floor(Math.random() * char.phrases.length)];
      speakCartoonDialogue(randomPhrase, charId, () => setCharacterBounce(null));
    }
  };

  const currentSpeaker = dialogue ? CARTOON_CHARACTERS[dialogue.characterId] : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in select-none">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl md:rounded-[36px] border-4 md:border-8 border-amber-400 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[96vh]">
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-3 text-white flex items-center justify-between border-b-4 border-amber-600 shadow-md">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-black">
              الحلقة {episode.number} 📺
            </span>
            <h3 className="font-extrabold text-base md:text-lg leading-tight drop-shadow-xs">
              {episode.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playPopSound();
                const nextMode: VoiceMode = getVoiceMode() === 'cartoon_sfx' ? 'natural_human' : 'cartoon_sfx';
                setVoiceMode(nextMode);
                handleReplayDialogue();
              }}
              className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-1 transition-all"
              title="تبديل نبرة الصوت"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>{getVoiceMode() === 'cartoon_sfx' ? 'صوت كرتوني 🎵' : 'صوت كلام 🗣️'}</span>
            </button>

            <button
              onClick={() => {
                stopSpeaking();
                playPopSound();
                onClose();
              }}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              title="إغلاق الكرتون"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Cartoon Stage / Canvas */}
        <div className="relative flex-1 min-h-[340px] md:min-h-[420px] bg-gradient-to-b from-sky-300 via-sky-100 to-amber-100 overflow-hidden flex flex-col justify-between p-4">
          {/* Whimsical Background Scene Art */}
          <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Clouds / Sun decoration */}
          <div className="absolute top-4 left-6 text-4xl animate-pulse">☁️</div>
          <div className="absolute top-8 right-12 text-5xl animate-bounce" style={{ animationDuration: '4s' }}>
            ☀️
          </div>
          <div className="absolute top-12 left-1/3 text-3xl opacity-80">🎈</div>

          {/* Scene Title & Interactive Tip */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="bg-white/90 backdrop-blur-sm text-amber-950 font-black text-xs md:text-sm px-3 py-1 rounded-full border border-amber-300 shadow-xs">
              {scene.title}
            </span>

            {scene.tip && (
              <span className="hidden sm:flex items-center gap-1 bg-amber-100/95 text-amber-900 font-bold text-xs px-2.5 py-1 rounded-full border border-amber-300 shadow-xs">
                <Hand className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
                {scene.tip}
              </span>
            )}
          </div>

          {/* If there's an Interactive Mini-Game in the Scene (e.g. Ice Cream Game) */}
          {scene.interactiveGame === 'icecream' && !isGameCompleted ? (
            <div className="relative z-20 my-auto">
              <IceCreamGame
                onGameComplete={() => {
                  setIsGameCompleted(true);
                  handleNextScene();
                }}
              />
            </div>
          ) : (
            <>
              {/* Comic Speech Bubble */}
              {dialogue && (
                <div className="relative z-20 mx-auto max-w-xl w-full my-2 animate-task-pop">
                  <div className="bg-white rounded-3xl p-4 md:p-5 border-4 border-amber-400 shadow-xl relative text-center">
                    {/* Character Tag */}
                    <div
                      className="absolute -top-4 right-6 px-3 py-1 rounded-full font-black text-xs md:text-sm text-white shadow-md flex items-center gap-1.5"
                      style={{ backgroundColor: currentSpeaker?.color || '#FF9500' }}
                    >
                      <span>{currentSpeaker?.name || dialogue.characterName}</span>
                      {isSpeaking && (
                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                      )}
                    </div>

                    {/* Dialogue Text with friendly large Arabic font */}
                    <p className="text-amber-950 font-bold text-base md:text-xl leading-relaxed mt-1">
                      {dialogue.text}
                    </p>

                    {/* Speech Bubble Tail */}
                    <div className="absolute -bottom-3 right-12 w-6 h-6 bg-white border-b-4 border-r-4 border-amber-400 transform rotate-45"></div>

                    {/* Replay voice button */}
                    <button
                      onClick={handleReplayDialogue}
                      className="absolute -bottom-3 left-6 bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full shadow-md text-xs font-black flex items-center gap-1 transition-transform active:scale-90"
                      title="اسمع الجملة تاني"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="text-[10px] hidden sm:inline">أعد الصوت</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Characters Standing on Stage */}
              <div className="relative z-10 flex items-end justify-around px-2 pt-2 md:pt-4">
                {/* Bondok */}
                <div
                  onClick={() => handleCharacterTap('bondok')}
                  className={`flex flex-col items-center cursor-pointer transition-transform duration-300 transform ${
                    characterBounce === 'bondok' ? '-translate-y-8 scale-110' : 'hover:scale-105'
                  } ${dialogue?.characterId === 'bondok' ? 'scale-105' : 'opacity-90'}`}
                >
                  <div className="relative">
                    <img
                      src={CARTOON_CHARACTERS.bondok.avatar}
                      alt="بندق"
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-amber-400 shadow-xl bg-amber-200"
                    />
                    {dialogue?.characterId === 'bondok' && (
                      <span className="absolute -top-2 -right-2 text-2xl animate-bounce">
                        💬
                      </span>
                    )}
                  </div>
                  <span className="mt-1.5 font-extrabold text-xs sm:text-sm bg-white/90 text-amber-900 px-3 py-0.5 rounded-full border border-amber-300 shadow-xs">
                    بندق 🐰
                  </span>
                </div>

                {/* Basbousa */}
                <div
                  onClick={() => handleCharacterTap('basbousa')}
                  className={`flex flex-col items-center cursor-pointer transition-transform duration-300 transform ${
                    characterBounce === 'basbousa' ? '-translate-y-8 scale-110' : 'hover:scale-105'
                  } ${dialogue?.characterId === 'basbousa' ? 'scale-105' : 'opacity-90'}`}
                >
                  <div className="relative">
                    <img
                      src={CARTOON_CHARACTERS.basbousa.avatar}
                      alt="بسبوسة"
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-pink-400 shadow-xl bg-pink-200"
                    />
                    {dialogue?.characterId === 'basbousa' && (
                      <span className="absolute -top-2 -right-2 text-2xl animate-bounce">
                        💬
                      </span>
                    )}
                  </div>
                  <span className="mt-1.5 font-extrabold text-xs sm:text-sm bg-white/90 text-pink-900 px-3 py-0.5 rounded-full border border-pink-300 shadow-xs">
                    بسبوسة 🐱
                  </span>
                </div>

                {/* Ammi Felfel (Shown in scenes where he appears) */}
                <div
                  onClick={() => handleCharacterTap('ammi_felfel')}
                  className={`hidden sm:flex flex-col items-center cursor-pointer transition-transform duration-300 transform ${
                    characterBounce === 'ammi_felfel' ? '-translate-y-8 scale-110' : 'hover:scale-105'
                  } ${dialogue?.characterId === 'ammi_felfel' ? 'scale-105' : 'opacity-90'}`}
                >
                  <div className="relative">
                    <img
                      src={CARTOON_CHARACTERS.ammi_felfel.avatar}
                      alt="عم فلفل"
                      className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-teal-400 shadow-xl bg-teal-200"
                    />
                    {dialogue?.characterId === 'ammi_felfel' && (
                      <span className="absolute -top-2 -right-2 text-2xl animate-bounce">
                        💬
                      </span>
                    )}
                  </div>
                  <span className="mt-1.5 font-extrabold text-xs sm:text-sm bg-white/90 text-teal-900 px-3 py-0.5 rounded-full border border-teal-300 shadow-xs">
                    عم فلفل 🦜
                  </span>
                </div>
              </div>

              {/* Interactive Choice Options (When child needs to decide or answer) */}
              {hasChoices && allDialoguesRead && scene.choice && (
                <div className="relative z-30 bg-amber-100/95 backdrop-blur-md rounded-2xl p-3 md:p-4 border-2 border-amber-400 shadow-lg mt-2 animate-fade-in">
                  <div className="flex items-center gap-1.5 mb-2 font-black text-sm md:text-base text-amber-950">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>{scene.choice.prompt}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {scene.choice.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleChoiceSelect(opt)}
                        className={`p-3 rounded-2xl font-bold text-sm text-right transition-all flex items-center justify-between border-2 ${
                          selectedChoice?.id === opt.id
                            ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-102'
                            : 'bg-white text-amber-950 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                        }`}
                      >
                        <span>{opt.text}</span>
                        {selectedChoice?.id === opt.id && (
                          <span className="text-lg">✨</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {selectedChoice && (
                    <div className="mt-3 bg-white/90 p-2.5 rounded-xl border border-amber-300 text-amber-900 font-bold text-sm flex items-center gap-2 animate-task-pop">
                      <span className="text-xl">
                        {selectedChoice.characterReactionId === 'bondok' ? '🐰' : selectedChoice.characterReactionId === 'basbousa' ? '🐱' : '🦜'}
                      </span>
                      <span>{selectedChoice.reactionText}</span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Navigation & Controls */}
        <div className="bg-amber-100/80 px-4 py-3 border-t-2 border-amber-200 flex items-center justify-between gap-2">
          {/* Dialogue / Scene Pagination Indicator */}
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900">
            <span>المشهد {currentSceneIndex + 1} من {episode.scenes.length}</span>
            <span className="text-amber-400">•</span>
            <span>الحوار {currentDialogueIndex + 1} من {scene.dialogues.length}</span>
          </div>

          {/* Controller Buttons */}
          <div className="flex items-center gap-2">
            {/* Prev dialogue */}
            <button
              onClick={handlePrevDialogue}
              disabled={currentDialogueIndex === 0}
              className={`p-2 rounded-xl border font-bold text-xs flex items-center gap-1 transition-all ${
                currentDialogueIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-amber-50 border-amber-200 text-amber-400'
                  : 'bg-white border-amber-300 text-amber-900 hover:bg-amber-50 active:scale-95'
              }`}
              title="الحوار السابق"
            >
              <ChevronRight className="w-4 h-4" />
              <span className="hidden sm:inline">السابق</span>
            </button>

            {/* Next dialogue or Next Scene */}
            {!allDialoguesRead ? (
              <button
                onClick={handleNextDialogue}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-white font-extrabold text-sm rounded-xl shadow-md border border-amber-400 flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <span>كمّل الحوار</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNextScene}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white font-extrabold text-sm rounded-xl shadow-md border border-emerald-400 flex items-center gap-1.5 active:scale-95 transition-all animate-pulse"
              >
                <span>
                  {currentSceneIndex < episode.scenes.length - 1
                    ? 'المشهد التالي 🚀'
                    : 'إنهاء الحلقة والاحتفال! 🎉'}
                </span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Finished Episode Overlay Screen */}
        {isEpisodeFinished && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full text-center border-4 border-amber-400 shadow-2xl relative">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg border-2 border-white transform rotate-6">
                <PartyPopper className="w-10 h-10 animate-bounce" />
              </div>

              <h3 className="font-extrabold text-2xl md:text-3xl text-amber-950 mb-2">
                مبروك يا بطل! 🌟
              </h3>
              <p className="text-base font-bold text-amber-800 mb-6 leading-relaxed">
                خلصت {episode.title} وساعدت بندق وبسبوسة!
                أنت أجدع بطل في حارة الشطار كلها!
              </p>

              {/* Star reward badge */}
              <div className="bg-amber-100 border-2 border-amber-300 rounded-2xl p-4 mb-6 flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-amber-500 fill-amber-400 animate-spin" />
                <div>
                  <div className="font-black text-2xl text-amber-950">+{episode.starsReward} نجمة</div>
                  <div className="text-xs font-bold text-amber-700">اتضافت لرصيدك الذهبي!</div>
                </div>
              </div>

              <button
                onClick={() => {
                  playCelebrationSound();
                  onClose();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-lg rounded-2xl shadow-lg border-2 border-amber-400 hover:brightness-110 active:scale-95 transition-all"
              >
                شاهد حلقة تانية 📺✨
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
