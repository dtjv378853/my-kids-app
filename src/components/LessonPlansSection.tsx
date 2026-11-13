import React, { useState } from 'react';
import { LESSON_PLANS_DATA } from '../data/childhoodEducationData';
import { LessonPlan, ActivityDomain, ActivityAgeGroup } from '../types';
import {
  BookOpen,
  Sparkles,
  Clock,
  Target,
  Layers,
  ShieldCheck,
  PlusCircle,
  Search,
  CheckCircle2,
  Copy,
  Printer,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const LessonPlansSection: React.FC = () => {
  const [plans, setPlans] = useState<LessonPlan[]>(LESSON_PLANS_DATA);
  const [selectedPlan, setSelectedPlan] = useState<LessonPlan>(plans[0]);
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Lesson Plan Generator State
  const [showGeneratorModal, setShowGeneratorModal] = useState<boolean>(false);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customUnit, setCustomUnit] = useState<string>('');
  const [customDomain, setCustomDomain] = useState<ActivityDomain>('scientific');
  const [customAge, setCustomAge] = useState<ActivityAgeGroup>('4-5');
  const [customDuration, setCustomDuration] = useState<number>(25);

  const filteredPlans = plans.filter((p) => {
    const matchDomain = filterDomain === 'all' || p.domain === filterDomain;
    const matchSearch =
      p.title.includes(searchQuery) ||
      p.unit.includes(searchQuery) ||
      p.tags.some((t) => t.includes(searchQuery));
    return matchDomain && matchSearch;
  });

  const handleCopyPlan = (plan: LessonPlan) => {
    const textToCopy = `خطة نشاط: ${plan.title}
الوحدة: ${plan.unit}
المرحلة العمرية: ${plan.ageGroup} سنوات | المدة: ${plan.durationMinutes} دقيقة

الأهداف السلوكية الإجرائية:
- المجال المعرفي:
${plan.behavioralObjectives.cognitive.map((c) => `  * ${c}`).join('\n')}
- المجال الحركي:
${plan.behavioralObjectives.psychomotor.map((p) => `  * ${p}`).join('\n')}
- المجال الوجداني:
${plan.behavioralObjectives.affective.map((a) => `  * ${a}`).join('\n')}

الوسائل التعليمية المستخدمة:
${plan.teachingAids.map((aid) => `  • ${aid}`).join('\n')}

التهيئة ومثير الانتباه:
${plan.introduction}

خطوات سير النشاط:
${plan.steps.map((st, i) => `  ${i + 1}. ${st}`).join('\n')}

الغلق والتقويم:
${plan.closing}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(plan.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const newPlan: LessonPlan = {
      id: `lp-custom-${Date.now()}`,
      title: customTitle,
      unit: customUnit || 'وحدة عامة للأطفال',
      ageGroup: customAge,
      domain: customDomain,
      durationMinutes: customDuration,
      behavioralObjectives: {
        cognitive: [
          `أن يتعرف الطفل على المفهوم الأساسي لـ (${customTitle}) بنسبة إتقان لا تقل عن 80%.`,
          `أن يميز الطفل الخصائص الرئيسية للموضوع عند سؤاله في حلقة النقاش.`
        ],
        psychomotor: [
          `أن ينفذ الطفل الخطوات الحركية والتطبيقية للنشاط بدقة وتناسق بصري حركي.`,
          `أن يشارك في ترتيب أدوات النشاط وإعادتها لمكانها بعد الانتهاء.`
        ],
        affective: [
          `أن يبدي الطفل اهتماماً وشغفاً في استكشاف موضوع النشاط مع أقرانه.`,
          `أن يتعاون بإيجابية مع زملائه في مجموعة العمل الصغيرة.`
        ]
      },
      teachingAids: [
        'مجسمات وبطاقات ملونة ذات ملمس حسي',
        'صندوق المفاجآت أو دمية قفازية لإثارة الفضول',
        'أوراق عمل فنية وخامات بيئية مستدامة'
      ],
      introduction: `تبدأ المعلمة النشاط بأحجية خفيفة أو صوت غامض يجذب انتباه الصغار نحو صندوق الاكتشاف حول موضوع (${customTitle}).`,
      steps: [
        'عرض المثير الحسي وتشجيع الأطفال على طرح تساؤلاتهم وتخمين ماذا سنفعل اليوم.',
        'تطبيق النشاط العملي في مجموعات صغيرة بالأركان التعليمية المجهزة.',
        'مشاركة الأطفال في التعبير عما أنجزوه ومناقشة النتائج مع المعلمة.'
      ],
      closing: 'أنشودة قصيرة مرتبطة بالمفهوم ولعبة تقويمية تفاعلية سريعة تظهر مدى تمكن الأطفال من الأهداف.',
      tags: ['نشاط مبتكر', 'تربية عملية', 'رياض أطفال']
    };

    setPlans([newPlan, ...plans]);
    setSelectedPlan(newPlan);
    setShowGeneratorModal(false);
    setCustomTitle('');
    setCustomUnit('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner and Quick Generator Action */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 md:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-emerald-400/40">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3.5 py-1 rounded-full text-xs font-bold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>معايير دفتر التحضير والتربية العملية الميدانية (Practicum)</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            نماذج ومولد خطط الأنشطة اليومية 📋
          </h2>
          <p className="text-emerald-100 text-sm md:text-base max-w-xl font-medium">
            صُممت الخطط وفق أحدث صياغات الأهداف السلوكية الثلاثية (المعرفي، الحركي، الوجداني) 
            جاهزة للطباعة، النسخ، والتطبيق الفوري في قاعة النشاط بالروضة.
          </p>
        </div>

        <button
          onClick={() => setShowGeneratorModal(true)}
          className="px-6 py-3.5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-2xl font-black text-sm md:text-base shadow-xl flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <PlusCircle className="w-5 h-5 text-emerald-600" />
          <span>أنشئي خطة نشاط جديدة ✍️</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border-2 border-emerald-100 shadow-xs">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute right-3.5 top-3.5 text-emerald-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحثي عن نشاط، وحدة، أو مفهوم..."
            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:outline-none text-sm font-semibold text-emerald-950 placeholder-emerald-400 bg-emerald-50/30"
          />
        </div>

        {/* Domain Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs font-bold">
          {[
            { id: 'all', label: 'جميع المجالات' },
            { id: 'scientific', label: 'علمي / استكشافي 🧪' },
            { id: 'mathematical', label: 'رياضي / منطقي 🔢' },
            { id: 'linguistic', label: 'لغوي / قصص 📖' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterDomain(tab.id)}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                filterDomain === tab.id
                  ? 'bg-emerald-600 text-white shadow-xs font-black'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Left Detail Panel & Right List Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Plans Navigation List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-extrabold text-sm text-emerald-950 px-1 flex items-center justify-between">
            <span>الأنشطة المتوفرة ({filteredPlans.length})</span>
            <span className="text-xs text-emerald-700 font-semibold">اضغطي للمعاينة</span>
          </h3>

          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {filteredPlans.map((plan) => {
              const isSelected = selectedPlan.id === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-right space-y-2 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/80 shadow-md ring-2 ring-emerald-200'
                      : 'border-emerald-100 bg-white hover:border-emerald-300 hover:bg-emerald-50/30 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      {plan.unit}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {plan.durationMinutes} دقيقة
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm md:text-base text-emerald-950 leading-snug">
                    {plan.title}
                  </h4>

                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-800/80">
                    <span className="bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                      عمر {plan.ageGroup} سنوات
                    </span>
                    <span className="bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                      {plan.domain === 'scientific' ? 'علمي' : plan.domain === 'mathematical' ? 'رياضي' : 'لغوي'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Plan Full View Document (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-emerald-200 shadow-md p-6 md:p-8 space-y-6">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-emerald-100">
            <div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
                {selectedPlan.unit}
              </span>
              <h3 className="text-xl md:text-2xl font-black text-emerald-950 leading-tight">
                {selectedPlan.title}
              </h3>
              <div className="flex items-center gap-3 text-xs font-bold text-emerald-800 mt-2">
                <span>الفئة المستهدفة: {selectedPlan.ageGroup} سنوات</span>
                <span>•</span>
                <span>الزمن المقترح: {selectedPlan.durationMinutes} دقيقة</span>
                <span>•</span>
                <span>المجال: {selectedPlan.domain}</span>
              </div>
            </div>

            {/* Actions: Copy & Print */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleCopyPlan(selectedPlan)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border-2 border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                {copiedId === selectedPlan.id ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>تم النسخ بنجاح! ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-emerald-600" />
                    <span>نسخ للدفتر</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 1. Behavioral Objectives Table */}
          <div className="space-y-3">
            <h4 className="font-black text-sm md:text-base text-emerald-950 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>أولاً: الأهداف السلوكية الإجرائية للنشاط</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-medium">
              {/* Cognitive */}
              <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-3.5 space-y-2">
                <span className="font-black text-sky-900 text-xs block border-b border-sky-200 pb-1">
                  1. الهدف المعرفي (Cognitive)
                </span>
                <ul className="space-y-1.5 text-sky-950 list-disc list-inside leading-relaxed">
                  {selectedPlan.behavioralObjectives.cognitive.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>

              {/* Psychomotor */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 space-y-2">
                <span className="font-black text-amber-900 text-xs block border-b border-amber-200 pb-1">
                  2. الهدف الحركي (Psychomotor)
                </span>
                <ul className="space-y-1.5 text-amber-950 list-disc list-inside leading-relaxed">
                  {selectedPlan.behavioralObjectives.psychomotor.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>

              {/* Affective */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-3.5 space-y-2">
                <span className="font-black text-rose-900 text-xs block border-b border-rose-200 pb-1">
                  3. الهدف الوجداني (Affective)
                </span>
                <ul className="space-y-1.5 text-rose-950 list-disc list-inside leading-relaxed">
                  {selectedPlan.behavioralObjectives.affective.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 2. Teaching Aids */}
          <div className="space-y-2">
            <h4 className="font-black text-sm md:text-base text-emerald-950 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>ثانياً: الأدوات والوسائل التعليمية والمواد المستهلكة</span>
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {selectedPlan.teachingAids.map((aid, idx) => (
                <span
                  key={idx}
                  className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold text-xs"
                >
                  ✓ {aid}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Introduction & Warm-up */}
          <div className="space-y-2 bg-amber-50/40 p-4 rounded-2xl border border-amber-200/80">
            <h4 className="font-black text-xs md:text-sm text-amber-950 flex items-center gap-1.5">
              <span>💡 التهيئة ومثير الانتباه (Warm-Up & Hook):</span>
            </h4>
            <p className="text-xs md:text-sm font-semibold text-amber-900 leading-relaxed">
              {selectedPlan.introduction}
            </p>
          </div>

          {/* 4. Execution Steps */}
          <div className="space-y-3">
            <h4 className="font-black text-sm md:text-base text-emerald-950">
              ثالثاً: خطوات وإجراءات تنفيذ النشاط بالتتابع
            </h4>
            <div className="space-y-2">
              {selectedPlan.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100 text-xs md:text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 text-xs shadow-xs">
                    {idx + 1}
                  </span>
                  <p className="font-semibold text-emerald-950 pt-0.5 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Closing & Assessment */}
          <div className="space-y-2 bg-teal-50/40 p-4 rounded-2xl border border-teal-200/80">
            <h4 className="font-black text-xs md:text-sm text-teal-950">
              رابعاً: الغلق والتقويم الختامي للنشاط (Closing & Evaluation)
            </h4>
            <p className="text-xs md:text-sm font-semibold text-teal-900 leading-relaxed">
              {selectedPlan.closing}
            </p>
          </div>

          {selectedPlan.safetyNotes && (
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100/70 p-3 rounded-xl border border-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>ملاحظات الأمان والسلامة: {selectedPlan.safetyNotes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Generator Modal */}
      {showGeneratorModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border-4 border-emerald-400 shadow-2xl space-y-4 animate-task-pop max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <h3 className="font-black text-lg text-emerald-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>إنشاء وتوليد خطة نشاط جديدة</span>
              </h3>
              <button
                onClick={() => setShowGeneratorModal(false)}
                className="text-emerald-400 hover:text-emerald-800 font-black text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGeneratePlan} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-emerald-950 mb-1">عنوان النشاط / المفهوم:</label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="مثلاً: مغناطيس المرح واستكشاف المعادن"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:outline-none text-sm font-semibold text-emerald-950"
                />
              </div>

              <div>
                <label className="block text-emerald-950 mb-1">اسم الوحدة التعليمية:</label>
                <input
                  type="text"
                  value={customUnit}
                  onChange={(e) => setCustomUnit(e.target.value)}
                  placeholder="مثلاً: وحدة الأيدي / وحدة المسكن / وحدة الغذاء"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:outline-none text-sm font-semibold text-emerald-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-emerald-950 mb-1">المجال:</label>
                  <select
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value as ActivityDomain)}
                    className="w-full px-3 py-2.5 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:outline-none text-xs font-semibold text-emerald-950 bg-white"
                  >
                    <option value="scientific">علمي واستكشافي 🧪</option>
                    <option value="mathematical">رياضي ومنطقي 🔢</option>
                    <option value="linguistic">لغوي وقصصي 📖</option>
                    <option value="artistic">فني وتعبيري 🎨</option>
                    <option value="motor">حركي وبدني 🏃</option>
                  </select>
                </div>

                <div>
                  <label className="block text-emerald-950 mb-1">المرحلة العمرية:</label>
                  <select
                    value={customAge}
                    onChange={(e) => setCustomAge(e.target.value as ActivityAgeGroup)}
                    className="w-full px-3 py-2.5 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:outline-none text-xs font-semibold text-emerald-950 bg-white"
                  >
                    <option value="3-4">3 - 4 سنوات (KG1)</option>
                    <option value="4-5">4 - 5 سنوات (KG2)</option>
                    <option value="5-6">5 - 6 سنوات (تمهيدي)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowGeneratorModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-emerald-200 text-emerald-800 hover:bg-emerald-50 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>توليد وصياغة الخطة فوراً</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
