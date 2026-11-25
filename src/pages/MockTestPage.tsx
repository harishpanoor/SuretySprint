import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CHAPTER_MODULES, getAllChapters } from '../data/chapters';
import { evaluateAnswer } from '../engine/evaluator';
import { Storage } from '../engine/storage';
import { Question, MockTestResult } from '../types/curriculum';
import { MathText } from '../components/MathText';
import { MathInput } from '../components/MathInput';
import { DiagramRenderer } from '../components/diagrams/DiagramRenderer';
import {
  Clock,
  Award,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ChevronRight,
  TrendingDown,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface MockTestPageProps {
  onBack: () => void;
  onSelectChapter: (id: number) => void;
}

type TestMode = 'chapter' | 'custom' | 'full_icse';

export const MockTestPage: React.FC<MockTestPageProps> = ({ onBack, onSelectChapter }) => {
  const allChapters = getAllChapters();

  // Test Setup Config
  const [mode, setMode] = useState<TestMode>('chapter');
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [selectedMultiChapterIds, setSelectedMultiChapterIds] = useState<number[]>([1, 2, 3, 4]);

  // Test Active State
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [multiPartAnswers, setMultiPartAnswers] = useState<Record<string, Record<string, string>>>({});
  const [proofAnswers, setProofAnswers] = useState<Record<string, Record<string, string>>>({});
  const [totalDurationSeconds, setTotalDurationSeconds] = useState<number>(1800);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(1800); // 30 min default
  const [isTestSubmitted, setIsTestSubmitted] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<MockTestResult | null>(null);

  const timerRef = useRef<any>(null);

  // Timer countdown
  useEffect(() => {
    if (isTestActive && !isTestSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTestActive, isTestSubmitted]);

  // Start Test Generator
  const handleStartTest = () => {
    let questions: Question[] = [];
    let duration = 30 * 60; // 30 mins

    if (mode === 'chapter') {
      const mod = CHAPTER_MODULES[selectedChapterId];
      // Pick all 6 curated + 4 generated = exactly 10 questions
      questions = [...mod.curatedQuestions];
      for (let i = 0; i < 4; i++) {
        questions.push(mod.generator(Date.now() + i * 37));
      }
      duration = 30 * 60; // 30 min
    } else if (mode === 'custom') {
      // Pick from selected chapters
      selectedMultiChapterIds.forEach((chId) => {
        const mod = CHAPTER_MODULES[chId];
        if (mod) {
          questions.push(...mod.curatedQuestions.slice(0, 3));
        }
      });
      duration = Math.max(15, questions.length * 3) * 60;
    } else {
      // Full ICSE Class 9 Mock Test: 80 Marks, 3 Hours (180 mins)
      // SECTION A (40 marks compulsory):
      // Question 1: 16 MCQs (1 mark each) sampled across the 8 Units
      const secAChs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 17, 21];
      secAChs.forEach((chId, idx) => {
        const mod = CHAPTER_MODULES[chId];
        questions.push({
          ...mod.curatedQuestions[0],
          id: `secA_mcq_${chId}`,
          section: 'A',
          questionLabel: `Q1(${idx + 1})`,
        } as any);
      });
      // Question 2 (12 marks compulsory): 3 questions (4m each)
      questions.push({ ...CHAPTER_MODULES[2].curatedQuestions[4], id: 'secA_q2_1', section: 'A', questionLabel: 'Q2(i)' } as any);
      questions.push({ ...CHAPTER_MODULES[5].curatedQuestions[4], id: 'secA_q2_2', section: 'A', questionLabel: 'Q2(ii)' } as any);
      questions.push({ ...CHAPTER_MODULES[12].curatedQuestions[2], id: 'secA_q2_3', section: 'A', questionLabel: 'Q2(iii)' } as any);

      // Question 3 (12 marks compulsory): 3 questions (4m each)
      questions.push({ ...CHAPTER_MODULES[3].curatedQuestions[4], id: 'secA_q3_1', section: 'A', questionLabel: 'Q3(i)' } as any);
      questions.push({ ...CHAPTER_MODULES[8].curatedQuestions[3], id: 'secA_q3_2', section: 'A', questionLabel: 'Q3(ii)' } as any);
      questions.push({ ...CHAPTER_MODULES[18].curatedQuestions[3], id: 'secA_q3_3', section: 'A', questionLabel: 'Q3(iii)' } as any);
      // Total Section A = 16 + 12 + 12 = 40 marks!

      // SECTION B (40 marks - Attempt any 4 out of 7 questions):
      const secBDefs = [
        { group: 4, items: [{ ch: 1, idx: 4 }, { ch: 1, idx: 5 }, { ch: 4, idx: 4 }] }, // Pure Arith & Expansions
        { group: 5, items: [{ ch: 6, idx: 4 }, { ch: 7, idx: 3 }, { ch: 8, idx: 4 }] }, // Simultaneous, Indices, Logarithms
        { group: 6, items: [{ ch: 9, idx: 2 }, { ch: 10, idx: 3 }, { ch: 11, idx: 3 }] }, // Geometry (Triangles & Midpoint)
        { group: 7, items: [{ ch: 12, idx: 3 }, { ch: 13, idx: 3 }, { ch: 16, idx: 4 }] }, // Pythagoras, Rectilinear, Circles
        { group: 8, items: [{ ch: 17, idx: 3 }, { ch: 18, idx: 2 }, { ch: 18, idx: 4 }] }, // Statistics & Mean/Median
        { group: 9, items: [{ ch: 19, idx: 4 }, { ch: 20, idx: 3 }, { ch: 20, idx: 4 }] }, // Mensuration (Area, Perimeter & Solids)
        { group: 10, items: [{ ch: 21, idx: 3 }, { ch: 22, idx: 3 }, { ch: 25, idx: 4 }] }, // Trigonometry & Coordinate Geometry
      ];

      secBDefs.forEach(({ group, items }) => {
        items.forEach((it, subIdx) => {
          const mod = CHAPTER_MODULES[it.ch];
          const rawQ = mod.curatedQuestions[it.idx] || mod.curatedQuestions[0];
          questions.push({
            ...rawQ,
            id: `secB_g${group}_${subIdx}_${rawQ.id}`,
            section: 'B',
            groupNumber: group,
            questionLabel: `Q${group}(${['i', 'ii', 'iii'][subIdx] || subIdx + 1})`,
          } as any);
        });
      });

      duration = 180 * 60; // 3 hours
    }

    setTestQuestions(questions);
    setCurrentIdx(0);
    setUserAnswers({});
    setSelectedOptions({});
    setMultiPartAnswers({});
    setProofAnswers({});
    setTotalDurationSeconds(duration);
    setTimeRemainingSeconds(duration);
    setIsTestActive(true);
    setIsTestSubmitted(false);
    setTestResult(null);
  };

  const handleAutoSubmit = () => {
    handleSubmitTest();
  };

  const handleSubmitTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTestSubmitted(true);

    let totalScore = 0;
    let maxMarks = 0;
    const answersRecord: MockTestResult['answers'] = {};
    const chapterScores: MockTestResult['chapterScores'] = {};

    // For full_icse mode: Section A (40m compulsory) + Section B (best 4 of 7 groups of 10m = 40m)
    const isFullIcse = mode === 'full_icse';
    const sectionBGroupScores: Record<number, { score: number; max: number }> = {};

    testQuestions.forEach((q: any) => {
      const qSection = q.section;
      const qGroup = q.groupNumber;

      if (!isFullIcse) {
        maxMarks += q.marks;
      }

      if (!chapterScores[q.chapterId]) {
        chapterScores[q.chapterId] = {
          score: 0,
          maxMarks: 0,
          chapterName: CHAPTER_MODULES[q.chapterId]?.chapter.shortName ?? `Ch ${q.chapterId}`,
        };
      }

      let isCorrect = false;
      let userAnswerStr = '';

      if (q.type === 'mcq' || q.type === 'assertion_reason') {
        userAnswerStr = selectedOptions[q.id] ?? '';
        const sel = userAnswerStr.trim().toUpperCase();
        const target = q.correctOptionId?.trim().toUpperCase();
        isCorrect = Boolean(sel && target && sel === target);
      } else if (q.type === 'multi_part' && q.subParts) {
        const subAns = multiPartAnswers[q.id] ?? {};
        let partsCorrect = 0;
        q.subParts.forEach((part: any) => {
          const val = subAns[part.id] ?? '';
          if (evaluateAnswer(val, part.expectedAnswer).isCorrect) {
            partsCorrect++;
          }
        });
        isCorrect = partsCorrect === q.subParts.length;
        userAnswerStr = Object.entries(subAns).map(([k, v]) => `(${k}) ${v}`).join(', ') || '(Blank)';
      } else if (q.type === 'proof' && q.proofSteps) {
        const pAns = proofAnswers[q.id] ?? {};
        isCorrect = q.proofSteps.every((step: any) => pAns[step.id] === step.reason);
        userAnswerStr = isCorrect ? 'Completed Proof' : (Object.keys(pAns).length > 0 ? 'Incomplete Proof' : '(Blank)');
      } else {
        userAnswerStr = userAnswers[q.id] ?? '';
        const evalRes = evaluateAnswer(userAnswerStr, q.expectedAnswer ?? '', {
          tolerance: q.tolerance,
          acceptableAnswers: q.acceptableAnswers,
        });
        isCorrect = evalRes.isCorrect;
      }

      const awarded = isCorrect ? q.marks : 0;

      if (isFullIcse && qSection === 'B' && qGroup) {
        if (!sectionBGroupScores[qGroup]) {
          sectionBGroupScores[qGroup] = { score: 0, max: 0 };
        }
        sectionBGroupScores[qGroup].score += awarded;
        sectionBGroupScores[qGroup].max += q.marks;
      } else {
        totalScore += awarded;
      }

      chapterScores[q.chapterId].maxMarks += q.marks;
      chapterScores[q.chapterId].score += awarded;

      answersRecord[q.id] = {
        userAnswer: userAnswerStr,
        isCorrect,
        marksAwarded: awarded,
      };

      // Auto-save mistakes if wrong
      if (!isCorrect) {
        Storage.addMistake(q, userAnswerStr);
      }
    });

    if (isFullIcse) {
      maxMarks = 80;
      // In Section B, student attempts any 4 of 7 groups (each carrying 10 marks).
      // Score the top 4 groups achieved by the student (up to 40 marks).
      const sortedGroupScores = Object.values(sectionBGroupScores)
        .map((g) => g.score)
        .sort((a, b) => b - a);
      const top4SecB = sortedGroupScores.slice(0, 4).reduce((sum, s) => sum + s, 0);
      totalScore += top4SecB;
    }

    const result: MockTestResult = {
      id: `test_${Date.now()}`,
      timestamp: Date.now(),
      mode,
      totalMarks: maxMarks,
      score: totalScore,
      timeTakenSeconds: Math.max(1, totalDurationSeconds - timeRemainingSeconds),
      chapterScores,
      answers: answersRecord,
    };

    setTestResult(result);
    Storage.saveTestResult(result);

    if (totalScore / maxMarks >= 0.75) {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = testQuestions[currentIdx];

  // 1. Pre-Test Setup View
  if (!isTestActive) {
    return (
      <div className="space-y-6 pb-16">
        {/* Header */}
        <div className="flex items-center gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={onBack}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Clock className="w-3.5 h-3.5" />
              <span>Exam Practice Modes</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Mini Exam & Full ICSE Mock Tests
            </h1>
          </div>
        </div>

        {/* 3 Modes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mode 1: Chapter Test */}
          <div
            onClick={() => setMode('chapter')}
            className={`p-5 rounded-3xl border-2 transition-all cursor-pointer space-y-3 ${
              mode === 'chapter'
                ? 'bg-blue-50/70 border-blue-600 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                30 Minutes
              </span>
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Chapter Quick Test</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              10 curated and generated exam questions on a single chapter with real-time countdown timer.
            </p>

            {mode === 'chapter' && (
              <div className="pt-2">
                <label className="text-[11px] font-bold text-slate-500 block mb-1">
                  Select Chapter:
                </label>
                <select
                  value={selectedChapterId}
                  onChange={(e) => setSelectedChapterId(Number(e.target.value))}
                  className="w-full text-xs bg-white border border-slate-200 rounded-xl px-2.5 py-2 font-semibold text-slate-800"
                >
                  {allChapters.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      Ch {ch.id}: {ch.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Mode 2: Custom Multi-Chapter Test */}
          <div
            onClick={() => setMode('custom')}
            className={`p-5 rounded-3xl border-2 transition-all cursor-pointer space-y-3 ${
              mode === 'custom'
                ? 'bg-indigo-50/70 border-indigo-600 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                Custom Units
              </span>
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">School Unit Test Prep</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Select specific chapters coming up in your school terminal or prelim exams.
            </p>

            {mode === 'custom' && (
              <div className="pt-2 max-h-40 overflow-y-auto space-y-1 pr-1 border-t border-indigo-100">
                {allChapters.map((ch) => {
                  const isChecked = selectedMultiChapterIds.includes(ch.id);
                  return (
                    <label
                      key={ch.id}
                      className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMultiChapterIds((prev) => [...prev, ch.id]);
                          } else {
                            setSelectedMultiChapterIds((prev) => prev.filter((id) => id !== ch.id));
                          }
                        }}
                        className="rounded text-indigo-600"
                      />
                      <span className="line-clamp-1">Ch {ch.id}: {ch.shortName}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mode 3: Full ICSE Class 9 Mock */}
          <div
            onClick={() => setMode('full_icse')}
            className={`p-5 rounded-3xl border-2 transition-all cursor-pointer space-y-3 ${
              mode === 'full_icse'
                ? 'bg-purple-50/70 border-purple-600 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                3 Hours • 80 Marks
              </span>
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Full Board Mock Exam</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Official CISCE format: Compulsory Section A + Section B spanning all 8 units. Hints and formulas disabled!
            </p>
          </div>
        </div>

        {/* Start Button */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Ready to test under exam conditions?</h4>
            <p className="text-xs text-slate-500">
              During the test, hints and formula sheets will be locked to simulate genuine board exam readiness.
            </p>
          </div>
          <button
            type="button"
            onClick={handleStartTest}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2 shrink-0"
          >
            <span>Start Test Now</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 2. Active Test Question View
  if (!isTestSubmitted && currentQ) {
    const isOptionSelected = (optId: string) => selectedOptions[currentQ.id] === optId;

    return (
      <div className="space-y-5 pb-16">
        {/* Test Header Bar with Live Countdown Timer */}
        <div className="flex items-center justify-between bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Exam in Progress
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-300">
              Question {currentIdx + 1} of {testQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-sm font-bold ${
                timeRemainingSeconds < 300
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  : 'bg-white/10 text-white'
              }`}
            >
              <Clock className="w-4 h-4 text-blue-300" />
              <span>{formatTimer(timeRemainingSeconds)}</span>
            </div>

            <button
              type="button"
              onClick={handleSubmitTest}
              className="px-3.5 py-1 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition-colors"
            >
              Submit Exam
            </button>
          </div>
        </div>

        {/* Question Palette Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-2 bg-white rounded-2xl border border-slate-200">
          {testQuestions.map((q, idx) => {
            const hasAnswer =
              !!selectedOptions[q.id] ||
              !!userAnswers[q.id] ||
              (!!multiPartAnswers[q.id] && Object.values(multiPartAnswers[q.id]).some((v) => v.trim() !== '')) ||
              (!!proofAnswers[q.id] && Object.values(proofAnswers[q.id]).some((v) => v.trim() !== ''));
            const isCurrent = idx === currentIdx;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold shrink-0 transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-xs scale-105'
                    : hasAnswer
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Active Question Box */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              {(currentQ as any).section && (
                <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-md">
                  Section {(currentQ as any).section} • {(currentQ as any).questionLabel}
                </span>
              )}
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                Ch {currentQ.chapterId}
              </span>
              <span className="text-xs font-bold text-slate-500">
                {currentQ.marks} {currentQ.marks === 1 ? 'Mark' : 'Marks'}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Exam mode • Hints disabled
            </span>
          </div>

          {/* Prompt */}
          <div className="text-base text-slate-900 font-medium leading-relaxed">
            <MathText text={currentQ.prompt} />
          </div>

          {/* Diagram */}
          {currentQ.diagramSvgId && (
            <div className="py-2 flex justify-center bg-slate-50/50 rounded-2xl border border-slate-100">
              <DiagramRenderer svgId={currentQ.diagramSvgId} data={currentQ.diagramData} />
            </div>
          )}

          {/* Answer Inputs */}
          <div className="pt-2">
            {(currentQ.type === 'mcq' || currentQ.type === 'assertion_reason') && currentQ.mcqOptions && (
              <div className="space-y-2">
                {currentQ.mcqOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() =>
                      setSelectedOptions((prev) => ({ ...prev, [currentQ.id]: opt.id }))
                    }
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      isOptionSelected(opt.id)
                        ? 'bg-blue-50 border-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center font-bold text-xs ${
                        isOptionSelected(opt.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {opt.id}
                    </div>
                    <div className="text-sm text-slate-800 flex-1 pt-0.5">
                      <MathText text={opt.text} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(currentQ.type === 'numerical' || currentQ.type === 'expression') && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Your Answer:
                </label>
                <MathInput
                  value={userAnswers[currentQ.id] ?? ''}
                  onChange={(val) =>
                    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: val }))
                  }
                  placeholder="Enter final value..."
                />
              </div>
            )}

            {currentQ.type === 'multi_part' && currentQ.subParts && (
              <div className="space-y-3">
                {currentQ.subParts.map((part) => (
                  <div key={part.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                    <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span>{part.partLabel} <MathText text={part.prompt} /></span>
                      <span className="text-slate-400 font-mono">[{part.marks}m]</span>
                    </div>
                    <input
                      type="text"
                      value={multiPartAnswers[currentQ.id]?.[part.id] ?? ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setMultiPartAnswers((prev) => ({
                          ...prev,
                          [currentQ.id]: {
                            ...(prev[currentQ.id] ?? {}),
                            [part.id]: val,
                          },
                        }));
                      }}
                      placeholder="Your answer for this part..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-mono focus:outline-hidden focus:border-blue-600"
                    />
                  </div>
                ))}
              </div>
            )}

            {currentQ.type === 'proof' && currentQ.proofSteps && (
              <div className="space-y-3">
                <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-900 font-medium">
                  Select the correct geometric reason for each deduction step below:
                </div>
                {currentQ.proofSteps.map((step) => (
                  <div key={step.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                    <div className="text-xs font-bold text-slate-700">
                      <span className="text-blue-700">Step {step.stepNumber}:</span> <MathText text={step.statement} />
                    </div>
                    <select
                      value={proofAnswers[currentQ.id]?.[step.id] ?? ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setProofAnswers((prev) => ({
                          ...prev,
                          [currentQ.id]: {
                            ...(prev[currentQ.id] ?? {}),
                            [step.id]: val,
                          },
                        }));
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-600"
                    >
                      <option value="">Select geometric reason...</option>
                      {step.availableReasonOptions?.map((opt, oIdx) => (
                        <option key={oIdx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Question Nav Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(currentIdx - 1)}
              className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl disabled:opacity-40"
            >
              Previous
            </button>

            {currentIdx < testQuestions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIdx(currentIdx + 1)}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
              >
                Next Question
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitTest}
                className="px-6 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Post-Test Evaluation & Weak-Area Report View
  if (isTestSubmitted && testResult) {
    const pct = Math.round((testResult.score / testResult.totalMarks) * 100);

    return (
      <div className="space-y-6 pb-16 animate-fadeIn">
        {/* Scorecard Hero */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-blue-200">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Test Performance Report</span>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-6xl font-black text-white">
              {testResult.score} <span className="text-2xl sm:text-3xl font-normal text-blue-300">/ {testResult.totalMarks}</span>
            </div>
            <p className="text-sm text-blue-200 font-semibold">{pct}% Overall Score</p>
          </div>

          <div className="flex justify-center gap-4 text-xs text-blue-200 pt-2">
            <span>Mode: {testResult.mode}</span>
            <span>•</span>
            <span>Time Taken: {Math.round(testResult.timeTakenSeconds / 60)} min</span>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsTestActive(false)}
              className="px-6 py-2.5 bg-white text-slate-900 font-bold text-xs rounded-xl hover:bg-blue-50 transition-colors"
            >
              Return to Test Menu
            </button>
          </div>
        </div>

        {/* Chapter-wise Breakdown & Weak-Area Diagnostics */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">
              Chapter-wise Weak-Area Diagnostic
            </h3>
          </div>

          <div className="divide-y divide-slate-100">
            {Object.entries(testResult.chapterScores).map(([chIdStr, cs]) => {
              const chId = Number(chIdStr);
              const chPct = cs.maxMarks > 0 ? Math.round((cs.score / cs.maxMarks) * 100) : 0;
              const isWeak = chPct < 60;

              return (
                <div key={chId} className="py-3 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-600">Ch {chId}</span>
                      <span className="text-sm font-bold text-slate-800">{cs.chapterName}</span>
                      {isWeak && (
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                          Weak Area
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">
                      Score: {cs.score} / {cs.maxMarks} marks ({chPct}%)
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectChapter(chId)}
                    className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                  >
                    Practice Chapter
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Question-by-Question Review */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Detailed Answer Review</h3>
          {testQuestions.map((q, idx) => {
            const ansInfo = testResult.answers[q.id];
            const isCorrect = ansInfo?.isCorrect;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-3xl border p-5 space-y-3 ${
                  isCorrect ? 'border-emerald-200' : 'border-rose-200'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500">Q {idx + 1}</span>
                    <span className="text-xs font-bold text-blue-600">Ch {q.chapterId}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    {isCorrect ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        +{q.marks} Marks
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        0 Marks
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-sm text-slate-900 font-medium">
                  <MathText text={q.prompt} />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                  <div>
                    <span className="font-bold text-slate-600">Your Answer: </span>
                    <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                      {(q.type === 'mcq' || q.type === 'assertion_reason') && q.mcqOptions && ansInfo?.userAnswer
                        ? (() => {
                            const opt = q.mcqOptions.find((o: any) => o.id.toUpperCase() === ansInfo.userAnswer.toUpperCase());
                            return opt ? `(${opt.id}) ${opt.text}` : ansInfo.userAnswer;
                          })()
                        : ansInfo?.userAnswer || '(Blank)'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div>
                      <span className="font-bold text-slate-600">Expected: </span>
                      <span className="text-emerald-700 font-bold inline-block">
                        <MathText
                          text={
                            (q.type === 'mcq' || q.type === 'assertion_reason') && q.mcqOptions
                              ? (() => {
                                  const opt = q.mcqOptions.find((o: any) => o.id.toUpperCase() === q.correctOptionId?.toUpperCase());
                                  return opt ? `(${opt.id}) ${opt.text}` : q.correctOptionId || '';
                                })()
                              : q.type === 'multi_part' && q.subParts
                              ? q.subParts.map((p: any) => `${p.partLabel} ${p.expectedAnswer}`).join(', ')
                              : q.type === 'proof'
                              ? q.solution?.finalAnswer || 'See worked proof steps below'
                              : q.expectedAnswer || q.solution?.finalAnswer || ''
                          }
                        />
                      </span>
                    </div>
                  )}
                </div>

                {/* Worked Solution Steps */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Worked Solution:
                  </span>
                  {q.solution.steps.map((st, sIdx) => (
                    <div key={sIdx} className="text-xs text-slate-700 flex items-start justify-between gap-2">
                      <div className="flex items-start gap-1.5">
                        <span className="font-bold text-slate-400">{sIdx + 1}.</span>
                        <MathText text={st.step} />
                      </div>
                      {st.markTag && (
                        <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {st.markTag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};
