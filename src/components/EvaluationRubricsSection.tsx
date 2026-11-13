import React, { useState } from 'react';
import { DEVELOPMENTAL_EVAL_DATA } from '../data/childhoodEducationData';
import { DevelopmentalMilestone } from '../types';
import {
  ClipboardCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Printer,
  Download,
  Award,
} from 'lucide-react';

interface StudentObservation {
  id: string;
  childName: string;
  age: string;
  notes: Record<string, 'mastered' | 'progressing' | 'needs_support'>;
}

export const EvaluationRubricsSection: React.FC = () => {
  const [data] = useState<DevelopmentalMilestone[]>(DEVELOPMENTAL_EVAL_DATA);
  const [childName, setChildName] = useState<string>('');
  const [evalMap, setEvalMap] = useState<Record<string, 'mastered' | 'progressing' | 'needs_support'>>({});
  const [savedObservations, setSavedObservations] = useState<StudentObservation[]>([
    {
      id: 'demo-1',
      childName: 'عمر أحمد',
      age: '4 سنوات و6 أشهر',
      notes: {
        'النمو الحركي الدقيق (Fine Motor Skills)-0': 'mastered',
        'النمو اللغوي والتواصلي (Language & Communication)-0': 'progressing',
      }
    }
  ]);

  const handleScore = (key: string, val: 'mastered' | 'progressing' | 'needs_support') => {
    setEvalMap((prev) => ({ ...prev, [key]: val }));
  };

  const handleSaveAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim()) return;

    const newObs: StudentObservation = {
      id: `obs-${Date.now()}`,
      childName,
      age: '4 - 5 سنوات',
      notes: evalMap,
    };

    setSavedObservations([newObs, ...savedObservations]);
    setChildName('');
    setEvalMap({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white p-6 md:p-8 rounded-3xl shadow-lg border-2 border-teal-300/40">
        <div className="inline-flex items-center gap-2 bg-white/20 px-3.5 py-1 rounded-full text-xs font-bold backdrop-blur-xs mb-3">
          <ClipboardCheck className="w-3.5 h-3.5" />
          <span>التقويم الأصيل والملاحظة المنظمة (Authentic Assessment)</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">
          استمارات الملاحظة ونموذج تقييم نمو طفل الروضة 📝⭐
        </h2>
        <p className="text-teal-50 text-sm md:text-base max-w-2xl font-medium">
          أداة عملية لقياس المؤشرات النمائية للأطفال في المجالات الحركية، اللغوية، والانفعالية،
          تساعد طالبات التربية العملية في إعداد تقارير دراسة الحالة الفردية والتقييم النهائي.
        </p>
      </div>

      {/* Main Assessment Form */}
      <div className="bg-white rounded-3xl border-2 border-teal-200 p-6 md:p-8 shadow-md space-y-6">
        <form onSubmit={handleSaveAssessment} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-teal-100">
            <div className="w-full sm:w-1/2">
              <label className="block text-xs font-black text-teal-950 mb-1">
                اسم الطفل المراد ملاحظته:
              </label>
              <input
                type="text"
                required
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="اكتبي اسم الطفل (مثال: سارة محمد)..."
                className="w-full px-4 py-2.5 rounded-xl border border-teal-200 focus:border-teal-500 focus:outline-none text-sm font-semibold text-teal-950 bg-teal-50/20"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
                مقياس الرصد: (أتقن ✓ / في تدريب ⏳ / يحتاج دعم ⚠️)
              </span>
            </div>
          </div>

          {/* Assessment Domains */}
          <div className="space-y-6">
            {data.map((domain, dIdx) => (
              <div key={dIdx} className="space-y-3">
                <div className="bg-teal-50/70 p-3 rounded-2xl border border-teal-200 flex items-center justify-between">
                  <h4 className="font-black text-sm md:text-base text-teal-950">
                    {domain.domain}
                  </h4>
                  <span className="text-[11px] font-bold text-teal-700 hidden sm:inline">
                    {domain.evaluationCriterion}
                  </span>
                </div>

                <div className="space-y-2">
                  {domain.milestones.map((ms, mIdx) => {
                    const key = `${domain.domain}-${mIdx}`;
                    const currentVal = evalMap[key];

                    return (
                      <div
                        key={mIdx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-teal-100 hover:bg-teal-50/30 transition-colors text-xs"
                      >
                        <span className="font-semibold text-teal-950 leading-relaxed sm:w-2/3">
                          • {ms}
                        </span>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleScore(key, 'mastered')}
                            className={`px-3 py-1.5 rounded-lg font-black transition-all ${
                              currentVal === 'mastered'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                            }`}
                          >
                            أتقن ✓
                          </button>

                          <button
                            type="button"
                            onClick={() => handleScore(key, 'progressing')}
                            className={`px-3 py-1.5 rounded-lg font-black transition-all ${
                              currentVal === 'progressing'
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                            }`}
                          >
                            في تدريب ⏳
                          </button>

                          <button
                            type="button"
                            onClick={() => handleScore(key, 'needs_support')}
                            className={`px-3 py-1.5 rounded-lg font-black transition-all ${
                              currentVal === 'needs_support'
                                ? 'bg-rose-500 text-white shadow-xs'
                                : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                            }`}
                          >
                            يحتاج دعم ⚠️
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-teal-100">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:brightness-110 text-white font-black text-sm rounded-xl shadow-md cursor-pointer flex items-center gap-2 active:scale-95 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>حفظ تقرير الملاحظة لهذا الطفل</span>
            </button>
          </div>
        </form>
      </div>

      {/* Saved Records History */}
      {savedObservations.length > 0 && (
        <div className="bg-white rounded-3xl border-2 border-teal-100 p-6 shadow-xs space-y-4">
          <h3 className="font-black text-base text-teal-950 flex items-center gap-2">
            <span>سجلات الملاحظة المحفوظة ({savedObservations.length})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {savedObservations.map((obs) => (
              <div
                key={obs.id}
                className="p-4 rounded-2xl border-2 border-teal-200 bg-teal-50/30 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-teal-950">{obs.childName}</span>
                  <span className="font-bold text-teal-700 text-[11px]">{obs.age}</span>
                </div>
                <p className="text-teal-800 text-[11px] font-semibold">
                  تم رصد مؤشرات النمو ومحفوظة بملف الإنجاز (Portfolio).
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
