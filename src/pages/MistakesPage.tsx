import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Storage } from '../engine/storage';
import { evaluateAnswer } from '../engine/evaluator';
import { MistakeItem } from '../types/curriculum';
import { MathText } from '../components/MathText';
import { MathInput } from '../components/MathInput';
import { DiagramRenderer } from '../components/diagrams/DiagramRenderer';
import {
  AlertTriangle,
  CheckCircle2,
  Trash2,
  ArrowLeft,
  Check,
  RefreshCw,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface MistakesPageProps {
  onBack: () => void;
  onSelectChapter: (id: number) => void;
}

export const MistakesPage: React.FC<MistakesPageProps> = ({ onBack, onSelectChapter }) => {
  const [mistakes, setMistakes] = useState<MistakeItem[]>([]);
  const [retryAnswers, setRetryAnswers] = useState<Record<string, string>>({});
  const [retrySubPartAnswers, setRetrySubPartAnswers] = useState<Record<string, Record<string, string>>>({});
  const [feedback, setFeedback] = useState<Record<string, { isCorrect: boolean; message: string }>>({});
  const [filter, setFilter] = useState<'active' | 'all'>('active');
  const [recentlyMasteredIds, setRecentlyMasteredIds] = useState<Set<string>>(new Set());
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  const loadMistakes = () => {
    setMistakes(Storage.getMistakes());
  };

  useEffect(() => {
    loadMistakes();
  }, []);

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRetrySubmit = (item: MistakeItem) => {
    const q = item.question;
    let isCorrect = false;

    if (q.type === 'mcq' || q.type === 'assertion_reason') {
      const chosenOpt = (retryAnswers[item.id] ?? '').trim();
      const targetOpt = (q.correctOptionId ?? '').trim();
      const optMatch = q.mcqOptions?.find(
        (o) =>
          o.id.toUpperCase() === chosenOpt.toUpperCase() ||
          o.text.trim().toLowerCase() === chosenOpt.toLowerCase()
      );
      isCorrect = Boolean(
        (chosenOpt && targetOpt && chosenOpt.toUpperCase() === targetOpt.toUpperCase()) ||
        (optMatch && targetOpt && optMatch.id.toUpperCase() === targetOpt.toUpperCase()) ||
        (q.expectedAnswer && evaluateAnswer(chosenOpt, q.expectedAnswer).isCorrect)
      );
    } else if (q.type === 'multi_part' && q.subParts) {
      const subAns = retrySubPartAnswers[item.id] ?? {};
      isCorrect = q.subParts.every((part) => {
        const val = subAns[part.id] ?? '';
        const res = evaluateAnswer(val, part.expectedAnswer, {
          tolerance: part.tolerance,
          acceptableAnswers: part.acceptableAnswers,
        });
        return res.isCorrect;
      });
    } else {
      const ans = retryAnswers[item.id] ?? '';
      const target = q.expectedAnswer ?? q.correctOptionId ?? q.solution?.finalAnswer ?? '';
      const evalRes = evaluateAnswer(ans, target, {
        tolerance: q.tolerance,
        acceptableAnswers: q.acceptableAnswers,
      });
      isCorrect = evalRes.isCorrect;
    }

    if (isCorrect) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      Storage.resolveMistake(item.id);
      Storage.resolveMistake(q.id);
      setRecentlyMasteredIds((prev) => new Set(prev).add(item.id));
      setFeedback((prev) => ({
        ...prev,
        [item.id]: { isCorrect: true, message: 'Correct! Mastered on retry.' },
      }));
      loadMistakes();
    } else {
      setFeedback((prev) => ({
        ...prev,
        [item.id]: {
          isCorrect: false,
          message:
            q.type === 'mcq' || q.type === 'assertion_reason'
              ? `Still incorrect. Review the question and options or check the worked solution below.`
              : 'Still incorrect. Review hints or try again.',
        },
      }));
    }
  };

  const handleRemove = (id: string) => {
    Storage.removeMistake(id);
    setRecentlyMasteredIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    loadMistakes();
  };

  const handleDismissMastered = (id: string) => {
    setRecentlyMasteredIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleClearMastered = () => {
    Storage.clearMasteredMistakes();
    setRecentlyMasteredIds(new Set());
    loadMistakes();
  };

  const displayedList = mistakes.filter((m) =>
    filter === 'active' ? !m.mastered || recentlyMasteredIds.has(m.id) : true
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Spaced Revision Bucket
              </span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">Mistakes to Retry & Master</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Active / All Filter */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setFilter('active')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                filter === 'active'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Unresolved ({mistakes.filter((m) => !m.mastered).length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({mistakes.length})
            </button>
          </div>

          <button
            type="button"
            onClick={handleClearMastered}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Clear Mastered
          </button>
        </div>
      </div>

      {/* Empty State */}
      {displayedList.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Your Mistakes Bucket is Clean!</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Any questions you get wrong during chapter practice or mock tests will automatically appear here for focused spaced repetition.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedList.map((item) => {
            const q = item.question;
            const res = feedback[item.id];
            const isMasteredNow = item.mastered || recentlyMasteredIds.has(item.id);
            const isSolutionOpen = expandedSolutions[item.id];

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl border shadow-xs p-5 space-y-4 transition-all ${
                  isMasteredNow ? 'border-emerald-300 bg-emerald-50/15' : 'border-slate-200'
                }`}
              >
                {/* Mistake Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                      Ch {q.chapterId}
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      {q.difficulty} • {q.marks} Mark{q.marks > 1 ? 's' : ''}
                    </span>
                    {isMasteredNow && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300/60">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        Mastered on Retry
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectChapter(q.chapterId)}
                      className="text-xs text-blue-600 hover:underline font-semibold"
                    >
                      Open Chapter
                    </button>
                    {isMasteredNow && filter === 'active' && (
                      <button
                        type="button"
                        onClick={() => handleDismissMastered(item.id)}
                        className="px-2 py-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
                        title="Dismiss from active list"
                      >
                        Dismiss
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                      title="Remove from bucket"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="text-sm text-slate-900 font-medium leading-relaxed">
                  <MathText text={q.prompt} />
                </div>

                {/* Inline Diagram if any */}
                {q.diagramSvgId && (
                  <div className="py-2 flex justify-center bg-slate-50/50 rounded-2xl border border-slate-100">
                    <DiagramRenderer svgId={q.diagramSvgId} data={q.diagramData} />
                  </div>
                )}

                {/* Previous answer note */}
                {item.originalAnswer && (
                  <div className="text-xs text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200/70 inline-block">
                    <span className="font-bold">Your previous answer:</span>{' '}
                    {(q.type === 'mcq' || q.type === 'assertion_reason') && q.mcqOptions
                      ? (() => {
                          const opt = q.mcqOptions.find((o) => o.id.toUpperCase() === item.originalAnswer?.toUpperCase());
                          return opt ? `(${opt.id}) ${opt.text}` : item.originalAnswer;
                        })()
                      : item.originalAnswer}
                  </div>
                )}

                {/* Retry Input Area */}
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Retry Solution:
                  </label>
                  {(q.type === 'mcq' || q.type === 'assertion_reason') && q.mcqOptions ? (
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.mcqOptions.map((opt) => {
                          const isSelected = retryAnswers[item.id] === opt.id;
                          const hasFeedback = Boolean(res);
                          const isCorrectOpt =
                            hasFeedback && opt.id.toUpperCase() === q.correctOptionId?.toUpperCase();
                          const isWrongSelected =
                            hasFeedback && isSelected && !res?.isCorrect;

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() =>
                                setRetryAnswers((prev) => ({ ...prev, [item.id]: opt.id }))
                              }
                              className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center gap-2.5 transition-all ${
                                isCorrectOpt
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs'
                                  : isWrongSelected
                                  ? 'bg-rose-50 border-rose-500 text-rose-900 shadow-xs'
                                  : isSelected
                                  ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-xs'
                                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                              }`}
                            >
                              <span
                                className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center font-bold text-[10px] ${
                                  isCorrectOpt
                                    ? 'bg-emerald-600 text-white'
                                    : isWrongSelected
                                    ? 'bg-rose-600 text-white'
                                    : isSelected
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {opt.id}
                              </span>
                              <span className="flex-1">
                                <MathText text={opt.text} />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleRetrySubmit(item)}
                          disabled={!retryAnswers[item.id]}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Check Retry</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleSolution(item.id)}
                          className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                          <span>{isSolutionOpen ? 'Hide Solution' : 'View Worked Solution'}</span>
                          {isSolutionOpen ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ) : q.type === 'multi_part' && q.subParts ? (
                    <div className="space-y-3">
                      {q.subParts.map((part) => (
                        <div
                          key={part.id}
                          className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
                        >
                          <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                            <span>
                              {part.partLabel} <MathText text={part.prompt} />
                            </span>
                            <span className="text-slate-400 font-mono">[{part.marks}m]</span>
                          </div>
                          <input
                            type="text"
                            value={retrySubPartAnswers[item.id]?.[part.id] ?? ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setRetrySubPartAnswers((prev) => ({
                                ...prev,
                                [item.id]: {
                                  ...(prev[item.id] ?? {}),
                                  [part.id]: val,
                                },
                              }));
                            }}
                            placeholder="Your answer..."
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:outline-hidden focus:border-blue-600"
                          />
                        </div>
                      ))}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleRetrySubmit(item)}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Check Retry</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleSolution(item.id)}
                          className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                          <span>{isSolutionOpen ? 'Hide Solution' : 'View Worked Solution'}</span>
                          {isSolutionOpen ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <div className="flex-1">
                          <MathInput
                            value={retryAnswers[item.id] ?? ''}
                            onChange={(val) =>
                              setRetryAnswers((prev) => ({ ...prev, [item.id]: val }))
                            }
                            onSubmit={() => handleRetrySubmit(item)}
                            placeholder="Type retry answer..."
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRetrySubmit(item)}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5 shrink-0"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Check Retry</span>
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleSolution(item.id)}
                          className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                          <span>{isSolutionOpen ? 'Hide Solution' : 'View Worked Solution'}</span>
                          {isSolutionOpen ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {res && (
                    <div
                      className={`text-xs font-bold p-3 rounded-xl flex items-center gap-2 ${
                        res.isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {res.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <RefreshCw className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>{res.message}</span>
                    </div>
                  )}

                  {/* Expandable Worked Solution */}
                  {isSolutionOpen && q.solution && (
                    <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 animate-fadeIn">
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                          ICSE Step-by-Step Worked Solution
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-700">
                          Final: <MathText text={q.solution.finalAnswer} />
                        </span>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        {q.solution.steps.map((st, sIdx) => (
                          <div
                            key={sIdx}
                            className="text-xs text-slate-700 flex items-start justify-between gap-2"
                          >
                            <div className="flex items-start gap-1.5">
                              <span className="font-bold text-slate-400">{sIdx + 1}.</span>
                              <MathText text={st.step} />
                            </div>
                            {st.markTag && (
                              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded shrink-0">
                                {st.markTag}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      {q.solution.commonMistake && (
                        <div className="mt-2 text-[11px] text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200/60">
                          <span className="font-bold">Common ICSE Mistake: </span>
                          {q.solution.commonMistake}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
