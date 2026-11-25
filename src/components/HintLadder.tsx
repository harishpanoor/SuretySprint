import React, { useState } from 'react';
import { HintLadderData, WorkedSolution } from '../types/curriculum';
import { MathText } from './MathText';
import { HelpCircle, ChevronRight, AlertTriangle, CheckCircle2, Lock, Unlock } from 'lucide-react';

interface HintLadderProps {
  hintData: HintLadderData;
  solution: WorkedSolution;
  onHintRevealed?: (count: number) => void;
  onSolutionRevealed?: () => void;
  disabled?: boolean; // e.g. During mock tests
}

export const HintLadder: React.FC<HintLadderProps> = ({
  hintData,
  solution,
  onHintRevealed,
  onSolutionRevealed,
  disabled = false,
}) => {
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Automatically reset hint ladder when question changes
  React.useEffect(() => {
    setRevealedHints(0);
    setShowSolution(false);
  }, [hintData, solution]);

  const handleRevealNextHint = () => {
    if (disabled || revealedHints >= 3) return;
    const nextCount = revealedHints + 1;
    setRevealedHints(nextCount);
    onHintRevealed?.(nextCount);
  };

  const handleRevealSolution = () => {
    if (disabled) return;
    setShowSolution(true);
    onSolutionRevealed?.();
  };

  if (disabled) {
    return (
      <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
        <Lock className="w-4 h-4 text-slate-400" />
        <span>Hints and worked solutions are disabled during active exam tests.</span>
      </div>
    );
  }

  const hintLevels = [
    {
      level: 1,
      title: 'Hint 1: Concept Clue',
      description: 'Which theorem, identity, or core method applies here?',
      content: hintData.hint1Concept,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      level: 2,
      title: 'Hint 2: Formula & Setup',
      description: 'The exact formula or initial equation to set up.',
      content: hintData.hint2Formula,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      level: 3,
      title: 'Hint 3: Key Next Step',
      description: 'The substitution or first critical simplification.',
      content: hintData.hint3Step,
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Ladder Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Need help? 3-Step Hint Ladder</h4>
            <p className="text-xs text-slate-500">
              Revealed {revealedHints} of 3 hints • Try thinking before revealing next step
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {revealedHints < 3 && !showSolution && (
            <button
              type="button"
              onClick={handleRevealNextHint}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1 transition-transform active:scale-95"
            >
              <span>Get Hint {revealedHints + 1}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          {!showSolution && (
            <button
              type="button"
              onClick={handleRevealSolution}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Full Solution</span>
            </button>
          )}
        </div>
      </div>

      {/* Revealed Hint Cards */}
      {revealedHints > 0 && (
        <div className="space-y-2.5">
          {hintLevels.slice(0, revealedHints).map((hint) => (
            <div
              key={hint.level}
              className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5 animate-fadeIn"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${hint.badgeColor}`}>
                  {hint.title}
                </span>
                <span className="text-[11px] text-slate-400">{hint.description}</span>
              </div>
              <div className="text-sm text-slate-800 pt-0.5">
                <MathText text={hint.content} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full ICSE Step-by-Step Solution Card */}
      {showSolution && (
        <div className="p-4 bg-emerald-50/50 rounded-2xl border-2 border-emerald-200/80 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h4 className="text-sm font-bold text-emerald-900">
                Official ICSE Marking Scheme & Step-by-Step Working
              </h4>
            </div>
            <span className="text-xs font-bold text-emerald-700 px-2 py-0.5 bg-emerald-100 rounded-md">
              Full Working
            </span>
          </div>

          {/* Steps with Mark Tags */}
          <div className="space-y-3">
            {solution.steps.map((step, idx) => (
              <div key={idx} className="flex items-start justify-between gap-3 text-sm">
                <div className="flex items-start gap-2 flex-1">
                  <span className="text-xs font-bold text-slate-400 pt-0.5">{idx + 1}.</span>
                  <div className="text-slate-800">
                    <MathText text={step.step} />
                  </div>
                </div>
                {step.markTag && (
                  <span className="shrink-0 text-xs font-mono font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                    {step.markTag}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Final Answer Banner */}
          <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Final Answer:
            </span>
            <div className="font-bold text-emerald-800">
              <MathText text={solution.finalAnswer} inline />
            </div>
          </div>

          {/* Common Mistake to Avoid */}
          {solution.commonMistake && (
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 flex items-start gap-2.5 text-xs text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-rose-700 uppercase tracking-wide text-[10px]">
                  Common ICSE Board Mistake to Avoid:
                </span>
                <MathText text={solution.commonMistake} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
