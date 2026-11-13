import React, { useState } from 'react';
import { BEHAVIOR_STRATEGIES_DATA } from '../data/childhoodEducationData';
import { BehaviorStrategy } from '../types';
import {
  HeartHandshake,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BookOpen,
  Users,
  Search,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export const BehaviorGuideSection: React.FC = () => {
  const [strategies, setStrategies] = useState<BehaviorStrategy[]>(BEHAVIOR_STRATEGIES_DATA);
  const [selectedStrategy, setSelectedStrategy] = useState<BehaviorStrategy>(strategies[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = strategies.filter((s) =>
    s.problemTitle.includes(searchQuery) ||
    s.underlyingCauses.some((c) => c.includes(searchQuery))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-6 md:p-8 rounded-3xl shadow-lg border-2 border-amber-300/40">
        <div className="inline-flex items-center gap-2 bg-white/20 px-3.5 py-1 rounded-full text-xs font-bold backdrop-blur-xs mb-3">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>علم نفس الطفل والإرشاد النفسي والتربوي</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">
          دليل تعديل السلوك والمواقف الطارئة في الروضة 🧠❤️
        </h2>
        <p className="text-amber-50 text-sm md:text-base max-w-2xl font-medium">
          مرجع عملي يساعدكِ في فهم الأسباب النفسية الحقيقية وراء سلوكيات الأطفال (العناد، العض، الخجل، البكاء)،
          مع توجيهات محددة لما يجب فعله وما يحذر ارتكابه، وقصص علاجية هادفة.
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-amber-600" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحثي عن مشكلة سلوكية (مثل: العض، البكاء، الخجل)..."
          className="w-full pl-4 pr-10 py-2.5 rounded-2xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none text-sm font-semibold text-amber-950 placeholder-amber-400 bg-white shadow-xs"
        />
      </div>

      {/* Grid: Problems List (Left 4 cols) & Detail Guide (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Behavior Problem Selectors */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-extrabold text-sm text-amber-950 px-1">
            المشكلات الشائعة في رياض الأطفال ({filtered.length})
          </h3>

          <div className="space-y-2.5">
            {filtered.map((item) => {
              const isSelected = selectedStrategy.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedStrategy(item)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-right space-y-1.5 ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-200'
                      : 'border-amber-100 bg-white hover:border-amber-300 hover:bg-amber-50/30 shadow-xs'
                  }`}
                >
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                    {item.ageCommon}
                  </span>
                  <h4 className="font-black text-sm md:text-base text-amber-950 leading-snug">
                    {item.problemTitle}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strategy Deep Dive Sheet */}
        <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-amber-200 shadow-md p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="border-b border-amber-100 pb-4">
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block mb-2">
              الفئة العمرية الأكثر تكراراً: {selectedStrategy.ageCommon}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-amber-950">
              {selectedStrategy.problemTitle}
            </h3>
          </div>

          {/* 1. Underlying Causes */}
          <div className="space-y-2">
            <h4 className="font-black text-sm md:text-base text-amber-950 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>لماذا يتصرف الطفل هكذا؟ (الأسباب النفسية والدوافع العميقة)</span>
            </h4>
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 space-y-2">
              {selectedStrategy.underlyingCauses.map((cause, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm font-semibold text-amber-950">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-2"></span>
                  <p className="leading-relaxed">{cause}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. DO vs DONT Two-Column Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* What to DO */}
            <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-black text-sm border-b border-emerald-200 pb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>ماذا تفعل المعلمة؟ (الممارسات الإيجابية)</span>
              </div>
              <ul className="space-y-2 text-xs font-bold text-emerald-950">
                {selectedStrategy.doList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-emerald-600 font-black">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to AVOID */}
            <div className="bg-rose-50/70 border-2 border-rose-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-black text-sm border-b border-rose-200 pb-2">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>احذري الوقوع في هذه الأخطاء!</span>
              </div>
              <ul className="space-y-2 text-xs font-bold text-rose-950">
                {selectedStrategy.dontList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-rose-600 font-black">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Therapeutic Story Idea */}
          <div className="bg-indigo-50/70 border border-indigo-200 p-4 rounded-2xl space-y-1.5">
            <h4 className="font-black text-xs md:text-sm text-indigo-950 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>فكرة قصة علاجية موجهة لتعديل هذا السلوك (Bibliotherapy):</span>
            </h4>
            <p className="text-xs md:text-sm font-semibold text-indigo-900 leading-relaxed">
              {selectedStrategy.storyIdea}
            </p>
          </div>

          {/* 4. Family Partnership */}
          <div className="bg-amber-100/60 border border-amber-300 p-4 rounded-2xl space-y-1.5">
            <h4 className="font-black text-xs md:text-sm text-amber-950 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-700" />
              <span>الشراكة مع الأسرة وإرشاد ولي الأمر:</span>
            </h4>
            <p className="text-xs md:text-sm font-semibold text-amber-900 leading-relaxed">
              {selectedStrategy.cooperationWithFamily}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
