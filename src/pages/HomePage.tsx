import React, { useState, useEffect } from 'react';
import { UNITS } from '../data/syllabus';
import { CHAPTER_MODULES } from '../data/chapters';
import { Storage } from '../engine/storage';
import { ChapterProgress, Chapter } from '../types/curriculum';
import { FormulaDrawer } from '../components/FormulaDrawer';
import { MathText } from '../components/MathText';
import {
  BookOpen,
  Award,
  AlertCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Calculator,
  Coins,
  Binary,
  Shapes,
  BarChart3,
  Box,
  Triangle,
  Compass,
} from 'lucide-react';

interface HomePageProps {
  onSelectChapter: (chapterId: number) => void;
  onOpenMistakes: () => void;
  onOpenMockTest: () => void;
}

const UNIT_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Calculator,
  Coins,
  Binary,
  Shapes,
  BarChart3,
  Box,
  Triangle,
  Compass,
};

export const HomePage: React.FC<HomePageProps> = ({
  onSelectChapter,
  onOpenMistakes,
  onOpenMockTest,
}) => {
  const [progressMap, setProgressMap] = useState<Record<number, ChapterProgress>>({});
  const [mistakesCount, setMistakesCount] = useState<number>(0);
  const [drawerChapter, setDrawerChapter] = useState<Chapter | null>(null);
  const [selectedStage, setSelectedStage] = useState<'all' | 'stage1' | 'stage2' | 'stage3'>('all');

  const STAGES = [
    { id: 'all', label: 'All Chapters (1–25)', unitIds: [1, 2, 3, 4, 5, 6, 7, 8] },
    { id: 'stage1', label: 'Stage 1: Arith & Algebra (Ch 1–8)', unitIds: [1, 2, 3] },
    { id: 'stage2', label: 'Stage 2: Geometry & Stats (Ch 9–18)', unitIds: [4, 5] },
    { id: 'stage3', label: 'Stage 3: Mensuration, Trig & Coords (Ch 19–25)', unitIds: [6, 7, 8] },
  ] as const;

  const filteredUnits = selectedStage === 'all'
    ? UNITS
    : UNITS.filter((u) => {
        const activeStage = STAGES.find((s) => s.id === selectedStage);
        return activeStage ? (activeStage.unitIds as readonly number[]).includes(u.id) : true;
      });

  useEffect(() => {
    setProgressMap(Storage.getAllProgress());
    const mistakes = Storage.getMistakes();
    setMistakesCount(mistakes.filter((m) => !m.mastered).length);
  }, []);

  // Compute aggregate stats
  const totalAttempted = Object.values(progressMap).reduce((acc, p) => acc + p.attemptedCount, 0);
  const totalMastered = Object.values(progressMap).reduce((acc, p) => acc + p.masteredCount, 0);
  const accuracy = totalAttempted > 0 ? Math.round((totalMastered / totalAttempted) * 100) : 0;

  // Find last practiced chapter or default to Chapter 1
  let lastPracticedId = 1;
  let latestTime = 0;
  for (const [idStr, p] of Object.entries(progressMap)) {
    if (p.lastPracticed && p.lastPracticed > latestTime) {
      latestTime = p.lastPracticed;
      lastPracticedId = Number(idStr);
    }
  }

  const lastChapter = CHAPTER_MODULES[lastPracticedId]?.chapter;

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200 border border-white/15">
            <BrainCircuit className="w-3.5 h-3.5 text-blue-300" />
            <span>CISCE Class 9 Mathematics • 8 Units • 25 Chapters</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Master ICSE Class 9 Maths with Step-by-Step Precision
          </h1>
          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Solve authentic board-style problems, use the 3-step Hint Ladder when stuck, write answers with the Quick Math Toolbar, and take full 80-mark mock tests offline.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onSelectChapter(lastPracticedId)}
              className="px-5 py-2.5 bg-white text-blue-900 hover:bg-blue-50 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Continue Chapter {lastPracticedId}: {lastChapter?.shortName}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onOpenMockTest}
              className="px-4 py-2.5 bg-blue-600/80 hover:bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-xl border border-white/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-blue-200" />
              <span>Full ICSE Mock Test</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 rounded-xl">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-800">{totalAttempted}</div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
              Attempted
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 rounded-xl">
            <Award className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="text-xl font-bold text-emerald-700">{totalMastered}</div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
              Mastered
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 rounded-xl">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="text-xl font-bold text-indigo-700">{accuracy}%</div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
              Accuracy
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenMistakes}
          className="p-4 bg-white hover:bg-rose-50/50 rounded-2xl border border-slate-200/80 hover:border-rose-200 shadow-xs flex items-center gap-3 transition-colors text-left group"
        >
          <div className="p-2.5 bg-rose-50 group-hover:bg-rose-100 rounded-xl transition-colors">
            <AlertCircle className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <div className="text-xl font-bold text-rose-700">{mistakesCount}</div>
            <div className="text-[11px] font-medium text-slate-400 group-hover:text-rose-600 uppercase tracking-wide flex items-center gap-1">
              <span>Mistakes Bucket</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </button>
      </div>

      {/* Syllabus Map: All 8 Units with Revision Stage Filter */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Official ICSE Class 9 Syllabus Map</h2>
            <p className="text-xs text-slate-500">
              Select any chapter to practice curated questions, unlimited generators, or view formula sheets
            </p>
          </div>

          {/* Revision Stages Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/70">
            {STAGES.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStage(st.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedStage === st.id
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredUnits.map((unit) => {
            const Icon = UNIT_ICONS[unit.iconName] ?? BookOpen;
            return (
              <div
                key={unit.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden"
              >
                {/* Unit Header */}
                <div className={`p-4 bg-gradient-to-r ${unit.color} text-white flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/15 backdrop-blur-xs rounded-xl">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                        {unit.code}
                      </span>
                      <h3 className="text-base font-bold text-white">{unit.name}</h3>
                    </div>
                  </div>
                  <span className="text-xs bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full font-semibold">
                    {unit.chapterIds.length} {unit.chapterIds.length === 1 ? 'Chapter' : 'Chapters'}
                  </span>
                </div>

                {/* Chapters in this Unit */}
                <div className="divide-y divide-slate-100">
                  {unit.chapterIds.map((chId) => {
                    const mod = CHAPTER_MODULES[chId];
                    const chapter = mod.chapter;
                    const prog = progressMap[chId] ?? { attemptedCount: 0, masteredCount: 0 };
                    const curatedCount = mod.curatedQuestions.length;

                    return (
                      <div
                        key={chId}
                        className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        {/* Chapter Info */}
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                              Ch {chapter.id}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                              onClick={() => onSelectChapter(chId)}>
                              {chapter.name}
                            </h4>
                          </div>
                          <MathText
                            text={chapter.description}
                            className="text-xs text-slate-500 line-clamp-2"
                          />

                          {/* Mini Progress Bar */}
                          <div className="flex items-center gap-3 pt-1">
                            <div className="w-32 bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    prog.attemptedCount > 0
                                      ? (prog.masteredCount / curatedCount) * 100
                                      : 0
                                  )}%`,
                                }}
                              />
                            </div>
                            <span className="text-[11px] text-slate-400 font-medium">
                              {prog.masteredCount} mastered • {curatedCount} curated + generator
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => setDrawerChapter(chapter)}
                            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
                            title="Formula Sheet"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                            <span>Formulas</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onSelectChapter(chId)}
                            className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
                          >
                            <span>Practice</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-out Formula Drawer */}
      {drawerChapter && (
        <FormulaDrawer
          chapter={drawerChapter}
          isOpen={true}
          onClose={() => setDrawerChapter(null)}
        />
      )}
    </div>
  );
};
