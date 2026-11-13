import React, { useState } from 'react';
import { TEACHING_AIDS_DATA, PUPPET_SCRIPTS_DATA } from '../data/childhoodEducationData';
import { TeachingAid, PuppetScript } from '../types';
import {
  Sparkles,
  Scissors,
  Recycle,
  Theater,
  HelpCircle,
  CheckCircle2,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const CreativeAidsAndTheatreSection: React.FC = () => {
  const [subTab, setSubTab] = useState<'aids' | 'puppet'>('aids');
  const [aids] = useState<TeachingAid[]>(TEACHING_AIDS_DATA);
  const [scripts] = useState<PuppetScript[]>(PUPPET_SCRIPTS_DATA);
  const [activeScript, setActiveScript] = useState<PuppetScript>(scripts[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white p-6 md:p-8 rounded-3xl shadow-lg border-2 border-purple-300/40">
        <div className="inline-flex items-center gap-2 bg-white/20 px-3.5 py-1 rounded-full text-xs font-bold backdrop-blur-xs mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>الابتكار الحسي والإنتاج المسرحي لرياض الأطفال</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">
          بنك الوسائل التعليمية المبتكرة واسكريبتات مسرح العرائس 🎭🎨
        </h2>
        <p className="text-purple-100 text-sm md:text-base max-w-2xl font-medium">
          أفكار وسائل تعليمية عملية باستخدام خامات البيئة وإعادة التدوير منخفضة التكلفة، 
          مع نصوص مسرحيات عرائس جاهزة للتمثيل الصوتي وتوصيل القيم الأخلاقية للصغار.
        </p>

        {/* Sub-Tabs Switcher */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => setSubTab('aids')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              subTab === 'aids'
                ? 'bg-white text-purple-950 shadow-md scale-102'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>بنك الوسائل وخامات البيئة ({aids.length})</span>
          </button>

          <button
            onClick={() => setSubTab('puppet')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              subTab === 'puppet'
                ? 'bg-white text-purple-950 shadow-md scale-102'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Theater className="w-4 h-4" />
            <span>اسكريبتات مسرح العرائس ({scripts.length})</span>
          </button>
        </div>
      </div>

      {/* SubTab 1: Teaching Aids from Recyclable Materials */}
      {subTab === 'aids' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {aids.map((aid) => (
            <div
              key={aid.id}
              className="bg-white rounded-3xl border-2 border-purple-200 hover:border-purple-400 p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                    ركن: {aid.learningCorner === 'math' ? 'الرياضيات 🔢' : aid.learningCorner === 'science' ? 'العلوم والاستكشاف 🧪' : 'القراءة والمطالعة 📚'}
                  </span>
                  {aid.recyclableFriendly && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <Recycle className="w-3.5 h-3.5" />
                      <span>تدوير بيئي</span>
                    </span>
                  )}
                </div>

                <h3 className="font-black text-lg text-purple-950 mb-1 leading-snug">
                  {aid.title}
                </h3>
                <p className="text-xs font-semibold text-purple-700 mb-3">
                  المفهوم المستهدف: {aid.concept}
                </p>

                {/* Materials list */}
                <div className="space-y-1.5 bg-purple-50/50 p-3 rounded-2xl border border-purple-100 text-xs mb-3">
                  <span className="font-extrabold text-purple-900 block">الخامات المطلوبة:</span>
                  <ul className="space-y-1 text-purple-950 font-medium">
                    {aid.materialsNeeded.map((mat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-purple-500 font-bold">•</span>
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to Make */}
                <div className="space-y-1 text-xs">
                  <span className="font-extrabold text-purple-900 block">طريقة الصنع والتركيب:</span>
                  <ol className="space-y-1 text-purple-950 font-medium list-decimal list-inside leading-relaxed">
                    {aid.howToMake.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Classroom utilization */}
              <div className="pt-3 border-t border-purple-100 bg-pink-50/50 p-3 rounded-xl border border-pink-100 text-xs font-semibold text-pink-950">
                <span className="font-black text-pink-900 block mb-0.5">طريقة التوظيف بالصف:</span>
                {aid.howToUseInClass}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SubTab 2: Puppet Theatre Scripts */}
      {subTab === 'puppet' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          {/* Scripts list on left */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-black text-sm text-purple-950 px-1">
              النصوص المسرحية المتاحة
            </h3>
            <div className="space-y-2.5">
              {scripts.map((sc) => {
                const isSelected = activeScript.id === sc.id;
                return (
                  <div
                    key={sc.id}
                    onClick={() => setActiveScript(sc)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-right space-y-1.5 ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 shadow-md ring-2 ring-purple-200'
                        : 'border-purple-100 bg-white hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                        {sc.targetValue}
                      </span>
                      <span className="text-[11px] font-bold text-purple-700 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {sc.durationMinutes} دقائق
                      </span>
                    </div>

                    <h4 className="font-black text-base text-purple-950 leading-snug">
                      {sc.title}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Script view on right */}
          <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-purple-200 p-6 md:p-8 shadow-md space-y-6">
            <div className="border-b border-purple-100 pb-4">
              <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full inline-block mb-2">
                القيمة التربوية: {activeScript.targetValue}
              </span>
              <h3 className="text-2xl font-black text-purple-950">
                {activeScript.title}
              </h3>
            </div>

            {/* Characters Specs */}
            <div className="space-y-2">
              <h4 className="font-black text-sm text-purple-950">
                الشخصيات ونوع الدمية المقترحة:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {activeScript.characters.map((ch, idx) => (
                  <div key={idx} className="bg-purple-50 p-3 rounded-2xl border border-purple-200">
                    <span className="font-black text-purple-950 block">{ch.name}</span>
                    <span className="text-purple-700 block text-[11px] font-bold">{ch.puppetType}</span>
                    <p className="text-purple-900 mt-1 text-[11px] leading-tight">{ch.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Script Dialogue Lines */}
            <div className="space-y-3">
              <h4 className="font-black text-sm text-purple-950">
                نص الحوار المسرحي مع توجيهات الأداء الصوتي:
              </h4>

              <div className="space-y-2.5">
                {activeScript.dialogueLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50/60 to-pink-50/30 text-xs md:text-sm space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-purple-900">
                        {line.speaker}
                      </span>
                      <span className="text-[10px] font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded-full">
                        نبرة الصوت: ({line.emotion})
                      </span>
                    </div>
                    <p className="font-semibold text-purple-950 leading-relaxed">
                      "{line.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
