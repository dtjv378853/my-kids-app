import React from 'react';
import { CartoonEpisode } from '../types';
import { CARTOON_EPISODES, CARTOON_CHARACTERS } from '../data/cartoonData';
import { playPopSound, playBoingSound } from '../utils/audio';
import { Play, Sparkles, Clock, Star, Flame, Trophy } from 'lucide-react';
import streetBanner from '../assets/images/cartoon_fun_street_1790770448204.jpg';

interface EpisodesScreenProps {
  onSelectEpisode: (episode: CartoonEpisode) => void;
  onSelectTab: (tab: 'episodes' | 'studio' | 'soundboard' | 'characters') => void;
}

export const EpisodesScreen: React.FC<EpisodesScreenProps> = ({
  onSelectEpisode,
  onSelectTab,
}) => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* Hero Cartoon Banner */}
      <div className="relative rounded-3xl md:rounded-[36px] overflow-hidden border-4 border-amber-300 shadow-xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img
            src={streetBanner}
            alt="حارة الشطار"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-right max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/90 text-amber-950 px-4 py-1.5 rounded-full font-black text-xs md:text-sm mb-3 shadow-sm border border-amber-200">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-400" />
              <span>كرتون أطفال تفاعلي كوميدي 100% بالعامية!</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white drop-shadow-md leading-tight mb-3">
              مغامرات بندق وبسبوسة في حارة الشطار 🐰✨
            </h2>
            <p className="text-amber-50 font-bold text-sm md:text-base leading-relaxed mb-6">
              اضحك وعيش المغامرة مع أرنوب الحارة الشقي بندق، والقطة الذكية بسبوسة، وعم فلفل!
              حلقات كرتون بالصوت، فوازير بالعامية، وألعاب ممتعة للأبطال الصغار!
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  playBoingSound();
                  onSelectEpisode(CARTOON_EPISODES[0]);
                }}
                className="px-6 py-3.5 bg-white text-amber-950 font-black text-base rounded-2xl shadow-lg hover:bg-amber-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border-2 border-amber-200 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-amber-500 text-amber-500" />
                <span>شاهد الحلقة الأولى الآن!</span>
              </button>

              <button
                onClick={() => {
                  playPopSound();
                  onSelectTab('studio');
                }}
                className="px-5 py-3.5 bg-amber-900/40 hover:bg-amber-900/60 backdrop-blur-sm text-white font-extrabold text-sm rounded-2xl border border-white/30 hover:scale-102 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>أنا عايز ألّف كرتون! 🎨</span>
              </button>
            </div>
          </div>

          {/* Characters Quick Avatars Bubble */}
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md p-3 rounded-3xl border-2 border-white/40 shadow-inner">
            <div className="text-center group cursor-pointer" onClick={() => onSelectTab('characters')}>
              <img
                src={CARTOON_CHARACTERS.bondok.avatar}
                alt="بندق"
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-white shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-transform"
              />
              <span className="text-[11px] font-black text-white block mt-1">بندق 🐰</span>
            </div>
            <div className="text-center group cursor-pointer" onClick={() => onSelectTab('characters')}>
              <img
                src={CARTOON_CHARACTERS.basbousa.avatar}
                alt="بسبوسة"
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-white shadow-md transform group-hover:scale-110 group-hover:-rotate-6 transition-transform"
              />
              <span className="text-[11px] font-black text-white block mt-1">بسبوسة 🐱</span>
            </div>
            <div className="text-center group cursor-pointer" onClick={() => onSelectTab('characters')}>
              <img
                src={CARTOON_CHARACTERS.ammi_felfel.avatar}
                alt="عم فلفل"
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-white shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-transform"
              />
              <span className="text-[11px] font-black text-white block mt-1">عم فلفل 🦜</span>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Section Title */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-amber-950">
            حلقات الكرتون التفاعلية 📺
          </h3>
          <p className="text-xs md:text-sm font-bold text-amber-800">
            اختر حلقة، اسمع الحوار بالعامية، وشارك بندق في اتخاذ القرارات!
          </p>
        </div>
      </div>

      {/* Episode Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CARTOON_EPISODES.map((ep) => (
          <div
            key={ep.id}
            className="bg-white rounded-3xl border-4 border-amber-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
          >
            {/* Episode Cover Image */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-amber-100">
              <img
                src={ep.coverImage}
                alt={ep.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

              {/* Badge & Episode Number */}
              <div className="absolute top-3 right-3 bg-amber-500 text-white font-black text-xs px-3 py-1 rounded-full shadow-md border border-white/40">
                {ep.badge}
              </div>

              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-xs text-white font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
                <Clock className="w-3.5 h-3.5" />
                <span>{ep.durationText}</span>
              </div>

              {/* Episode Title over thumbnail bottom */}
              <div className="absolute bottom-3 right-3 left-3 text-right">
                <h4 className="font-black text-lg md:text-xl text-white drop-shadow-md leading-tight">
                  {ep.title}
                </h4>
                <p className="text-xs font-bold text-amber-200 drop-shadow-xs truncate mt-0.5">
                  {ep.subtitle}
                </p>
              </div>
            </div>

            {/* Episode Body Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs md:text-sm font-bold text-amber-900/80 leading-relaxed">
                {ep.synopsis}
              </p>

              <div className="pt-2 border-t border-amber-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-600 font-extrabold text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>مكافأة: +{ep.starsReward} نجمة</span>
                </div>

                <button
                  onClick={() => {
                    playBoingSound();
                    onSelectEpisode(ep);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-white font-black text-xs md:text-sm rounded-xl shadow-md border border-amber-300 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>شاهد وتفاعل</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
