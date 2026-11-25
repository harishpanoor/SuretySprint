import React, { useState } from 'react';
import { ProofStep } from '../types/curriculum';
import { MathText } from './MathText';
import { CheckCircle2, XCircle, Award, Sparkles, ChevronDown } from 'lucide-react';

interface ProofBuilderProps {
  steps: ProofStep[];
  rubric?: string[];
  onComplete?: (score: number, maxScore: number) => void;
  disabled?: boolean;
}

export const ProofBuilder: React.FC<ProofBuilderProps> = ({
  steps,
  rubric = [],
  onComplete,
  disabled = false,
}) => {
  // Map of step index to chosen reason
  const [selectedReasons, setSelectedReasons] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selfCheckList, setSelfCheckList] = useState<Record<number, boolean>>({});

  const handleSelectReason = (stepIdx: number, reason: string) => {
    if (disabled || submitted) return;
    setSelectedReasons((prev) => ({ ...prev, [stepIdx]: reason }));
  };

  const handleCheckProof = () => {
    setSubmitted(true);
    let correctCount = 0;
    steps.forEach((step, idx) => {
      if (selectedReasons[idx]?.trim() === step.reason.trim()) {
        correctCount++;
      }
    });
    onComplete?.(correctCount, steps.length);
  };

  const allSelected = steps.every((_, idx) => !!selectedReasons[idx]);

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="flex items-center justify-between p-3 bg-indigo-50/70 border border-indigo-200/80 rounded-xl">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900">
            Interactive Statement–Reason Proof Builder
          </h4>
        </div>
        <span className="text-xs text-indigo-600 font-semibold">
          {steps.length} Steps • Match reasons
        </span>
      </div>

      {/* Two Column Table of Statements and Reasons */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="grid grid-cols-12 bg-slate-100/90 text-xs font-bold text-slate-600 border-b border-slate-200 px-3 py-2">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-6">Statement (Given / Derived)</div>
          <div className="col-span-5">Geometric Reason</div>
        </div>

        <div className="divide-y divide-slate-100">
          {steps.map((step, idx) => {
            const isCorrect = submitted && selectedReasons[idx]?.trim() === step.reason.trim();
            const isWrong = submitted && selectedReasons[idx]?.trim() !== step.reason.trim();

            const options = step.availableReasonOptions ?? [
              step.reason,
              'Given in hypothesis',
              'Vertically opposite angles',
              'Corresponding parts of congruent triangles (CPCTC)',
              'Alternate interior angles are equal',
            ];

            return (
              <div
                key={step.id || idx}
                className={`grid grid-cols-12 items-center px-3 py-3 text-xs sm:text-sm transition-colors ${
                  isCorrect ? 'bg-emerald-50/50' : isWrong ? 'bg-rose-50/50' : 'hover:bg-slate-50/60'
                }`}
              >
                {/* Step Number */}
                <div className="col-span-1 text-center font-bold text-slate-400">
                  {step.stepNumber ?? idx + 1}
                </div>

                {/* Statement */}
                <div className="col-span-6 pr-2 font-medium text-slate-800">
                  <MathText text={step.statement} />
                </div>

                {/* Reason Selection */}
                <div className="col-span-5 relative">
                  {!submitted ? (
                    <div className="relative">
                      <select
                        disabled={disabled}
                        value={selectedReasons[idx] ?? ''}
                        onChange={(e) => handleSelectReason(idx, e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-hidden focus:border-indigo-500 appearance-none pr-6 cursor-pointer"
                      >
                        <option value="">Select reason...</option>
                        {options.map((opt, oIdx) => (
                          <option key={oIdx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
                    </div>
                  ) : (
                    <div className="flex items-start gap-1.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span
                          className={`font-semibold block ${
                            isCorrect ? 'text-emerald-800' : 'text-rose-700'
                          }`}
                        >
                          {selectedReasons[idx] || '(Not answered)'}
                        </span>
                        {isWrong && (
                          <span className="text-[11px] text-emerald-700 block mt-0.5 font-medium">
                            Correct: {step.reason}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      {!submitted && (
        <div className="flex justify-end">
          <button
            type="button"
            disabled={!allSelected || disabled}
            onClick={handleCheckProof}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1.5"
          >
            <span>Verify Proof Reasoning</span>
          </button>
        </div>
      )}

      {/* ICSE Step-Mark Self-Check Rubric */}
      {rubric.length > 0 && (
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
            <Award className="w-4 h-4 text-amber-500" />
            <span>ICSE Examiner Marking Rubric (Self-Check)</span>
          </div>
          <div className="space-y-1.5">
            {rubric.map((item, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={!!selfCheckList[idx]}
                  onChange={(e) =>
                    setSelfCheckList((prev) => ({ ...prev, [idx]: e.target.checked }))
                  }
                  className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-0"
                />
                <MathText text={item} />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
