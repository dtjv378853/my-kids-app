import React from 'react';
import { AcademicTab } from '../types';
import {
  BookOpen,
  HeartHandshake,
  Scissors,
  ClipboardCheck,
  GraduationCap,
  Sparkles,
  School,
} from 'lucide-react';

interface NavbarProps {
  currentTab: AcademicTab;
  setCurrentTab: (tab: AcademicTab) => void;
}

export const EarlyChildhoodNavbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
}) => {
  const navItems = [
    { id: 'lesson_plans', label: 'خطط الأنشطة والدروس', icon: BookOpen, color: 'text-emerald-700' },
    { id: 'behavior_guide', label: 'دليل تعديل السلوك', icon: HeartHandshake, color: 'text-amber-700' },
    { id: 'teaching_aids', label: 'الوسائل والمسرح', icon: Scissors, color: 'text-purple-700' },
    { id: 'rubrics_eval', label: 'تقييم نمو الطفل', icon: ClipboardCheck, color: 'text-teal-700' },
    { id: 'study_summaries', label: 'ملخصات المقررات', icon: GraduationCap, color: 'text-blue-700' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-emerald-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => setCurrentTab('lesson_plans')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md border border-white transform group-hover:scale-105 transition-transform">
            <School className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-xl md:text-2xl text-emerald-950 tracking-tight leading-none">
                مُعين
              </h1>
              <span className="text-[11px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                التربية للطفولة المبكرة ✨
              </span>
            </div>
            <p className="text-xs font-semibold text-emerald-700 mt-0.5">
              المنصة الشاملة لطالبات ومعلمات رياض الأطفال
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-emerald-50/70 p-1.5 rounded-2xl border border-emerald-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs font-black'
                    : 'text-emerald-950 hover:bg-emerald-100/70'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Tag */}
        <div className="hidden sm:flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>التربية العملية والميدانية</span>
        </div>
      </div>

      {/* Mobile Horizontal Navigation */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-3 py-2 bg-emerald-50/90 border-t border-emerald-100">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white font-black shadow-xs'
                  : 'text-emerald-950 bg-white border border-emerald-100 font-bold'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
