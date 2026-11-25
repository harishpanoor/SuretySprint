import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { getChapterModule, getAllChapters } from '../data/chapters';
import { evaluateAnswer } from '../engine/evaluator';
import { Storage } from '../engine/storage';
import { Question, Difficulty, UserAttempt } from '../types/curriculum';
import { MathText } from '../components/MathText';
import { MathInput } from '../components/MathInput';
import { HintLadder } from '../components/HintLadder';
import { FormulaDrawer } from '../components/FormulaDrawer';
import { Scratchpad } from '../components/Scratchpad';
import { ProofBuilder } from '../components/ProofBuilder';
import { DiagramRenderer } from '../components/diagrams/DiagramRenderer';
import {
  BookOpen,
  Edit3,
  PenTool,
  RotateCw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Filter,
  Check,
} from 'lucide-react';

interface PracticePageProps {
  chapterId: number;
  onBack: () => void;
  onSelectChapter: (id: number) => void;
}

export const PracticePage: React.FC<PracticePageProps> = ({
  chapterId,
  onBack,
  onSelectChapter,
}) => {
  const chapterModule = getChapterModule(chapterId);
  const { chapter, curatedQuestions, generator } = chapterModule;

  // Filters
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [questionList, setQuestionList] = useState<Question[]>(curatedQuestions);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  // Active question state
  const currentQuestion = questionList[currentIdx] ?? curatedQuestions[0];
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [subPartAnswers, setSubPartAnswers] = useState<Record<string, string>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Evaluation state
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [subPartResults, setSubPartResults] = useState<Record<string, boolean>>({});

  // Hint and Solution Tracking
  const [hintsRevealed, setHintsRevealed] = useState<number>(0);
  const [solutionRevealed, setSolutionRevealed] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  // UI Panels
  const [isFormulaOpen, setIsFormulaOpen] = useState<boolean>(false);
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);
  const [showWorkingNotes, setShowWorkingNotes] = useState<boolean>(false);
  const [workingNote, setWorkingNote] = useState<string>('');

  // Reset inputs when question changes
  const resetQuestionState = useCallback((q: Question) => {
    setUserAnswer('');
    setSubPartAnswers({});
    setSelectedOptionId(null);
    setIsChecked(false);
    setIsCorrect(false);
    setSubPartResults({});
    setHintsRevealed(0);
    setSolutionRevealed(false);
    setStartTime(Date.now());
    setWorkingNote(Storage.getWorkingNote(q.id));
  }, []);

  // Filter effect
  useEffect(() => {
    let list = curatedQuestions;
    if (selectedDifficulty !== 'All') {
      list = curatedQuestions.filter((q) => q.difficulty === selectedDifficulty);
      if (list.length === 0) list = curatedQuestions; // fallback
    }
    setQuestionList(list);
    setCurrentIdx(0);
    resetQuestionState(list[0]);
  }, [curatedQuestions, selectedDifficulty, resetQuestionState]);

  // Load new generated question
  const handleGenerateFresh = () => {
    const freshQuestion = generator(Date.now());
    setQuestionList((prev) => [freshQuestion, ...prev]);
    setCurrentIdx(0);
    resetQuestionState(freshQuestion);
  };

  const handleNextQuestion = () => {
    if (currentIdx < questionList.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      resetQuestionState(questionList[nextIdx]);
    } else {
      // Loop or generate
      handleGenerateFresh();
    }
  };

  const handlePrevQuestion = () => {
    if (currentIdx > 0) {
      const prevIdx = currentIdx - 1;
      setCurrentIdx(prevIdx);
      resetQuestionState(questionList[prevIdx]);
    }
  };

  // Submit and check answer
  const handleCheckAnswer = () => {
    if (isChecked) return;
    const now = Date.now();
    const timeSpentSeconds = Math.max(1, Math.round((now - startTime) / 1000));
    let correct = false;
    let submittedAnswerStr = userAnswer;

    if (currentQuestion.type === 'mcq' || currentQuestion.type === 'assertion_reason') {
      const sel = selectedOptionId?.trim().toUpperCase();
      const target = currentQuestion.correctOptionId?.trim().toUpperCase();
      correct = Boolean(sel && target && sel === target);
      submittedAnswerStr = selectedOptionId ?? '';
    } else if (currentQuestion.type === 'numerical' || currentQuestion.type === 'expression') {
      const evalRes = evaluateAnswer(userAnswer, currentQuestion.expectedAnswer ?? '', {
        tolerance: currentQuestion.tolerance,
        acceptableAnswers: currentQuestion.acceptableAnswers,
      });
      correct = evalRes.isCorrect;
    } else if (currentQuestion.type === 'multi_part' && currentQuestion.subParts) {
      const results: Record<string, boolean> = {};
      let allSubCorrect = true;
      currentQuestion.subParts.forEach((part) => {
        const val = subPartAnswers[part.id] ?? '';
        const evalRes = evaluateAnswer(val, part.expectedAnswer, {
          tolerance: part.tolerance,
          acceptableAnswers: part.acceptableAnswers,
        });
        results[part.id] = evalRes.isCorrect;
        if (!evalRes.isCorrect) allSubCorrect = false;
      });
      setSubPartResults(results);
      correct = allSubCorrect;
      submittedAnswerStr = JSON.stringify(subPartAnswers);
    } else if (currentQuestion.type === 'proof') {
      // Proof is self-checked or handled via ProofBuilder onComplete
      correct = true;
      submittedAnswerStr = 'proof_verified';
    }

    setIsChecked(true);
    setIsCorrect(correct);

    if (correct && !solutionRevealed) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }

    // Record Attempt in typed LocalStorage
    const attempt: UserAttempt = {
      questionId: currentQuestion.id,
      chapterId: currentQuestion.chapterId,
      timestamp: now,
      isCorrect: correct,
      userAnswer: submittedAnswerStr,
      hintsRevealed,
      solutionRevealed,
      timeSpentSeconds,
    };
    Storage.recordAttempt(attempt, currentQuestion);
  };

  const handleProofComplete = (score: number, maxScore: number) => {
    const correct = score === maxScore;
    setIsChecked(true);
    setIsCorrect(correct);

    if (correct) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }

    const attempt: UserAttempt = {
      questionId: currentQuestion.id,
      chapterId: currentQuestion.chapterId,
      timestamp: Date.now(),
      isCorrect: correct,
      userAnswer: `proof_${score}_of_${maxScore}`,
      hintsRevealed,
      solutionRevealed,
      timeSpentSeconds: 60,
    };
    Storage.recordAttempt(attempt, currentQuestion);
  };

  const handleWorkingNoteChange = (text: string) => {
    setWorkingNote(text);
    Storage.saveWorkingNote(currentQuestion.id, text);
  };

  return (
    <div className="space-y-5 pb-16">
      {/* Top Navigation & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            title="Back to Syllabus"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Chapter {chapter.id} • {chapter.unitName}
            </div>
            <h2 className="text-base font-bold text-slate-900 line-clamp-1">{chapter.name}</h2>
          </div>
        </div>

        {/* Quick Chapter Selector */}
        <div className="flex items-center gap-2">
          <select
            value={chapterId}
            onChange={(e) => onSelectChapter(Number(e.target.value))}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 font-semibold focus:outline-hidden focus:border-blue-500"
          >
            {getAllChapters().map((ch) => (
              <option key={ch.id} value={ch.id}>
                Ch {ch.id}: {ch.shortName}
              </option>
            ))}
          </select>

          {/* Formula Drawer Button */}
          <button
            type="button"
            onClick={() => setIsFormulaOpen(true)}
            className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Formula Sheet</span>
          </button>
        </div>
      </div>

      {/* Filter and Mode Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-100/90 p-2 rounded-2xl border border-slate-200/80">
        {/* Difficulty Pill Filter */}
        <div className="flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1 hidden sm:inline" />
          {(['All', 'Easy', 'Standard', 'Exam'] as const).map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                selectedDifficulty === diff
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Action Buttons: Scratchpad, Notes, Fresh Question */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowScratchpad(!showScratchpad)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1 ${
              showScratchpad
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Rough Work</span>
          </button>

          <button
            type="button"
            onClick={() => setShowWorkingNotes(!showWorkingNotes)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1 ${
              showWorkingNotes
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Notes</span>
          </button>

          <button
            type="button"
            onClick={handleGenerateFresh}
            className="px-2.5 py-1 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-colors flex items-center gap-1"
            title="Generate fresh problem with randomized numbers"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>New Numbers</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Question Card & Working (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
            {/* Question Header Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  Q {currentIdx + 1} of {questionList.length}
                </span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                  {currentQuestion.marks} {currentQuestion.marks === 1 ? 'Mark' : 'Marks'}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                    currentQuestion.difficulty === 'Easy'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : currentQuestion.difficulty === 'Standard'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {currentQuestion.difficulty}
                </span>
                {currentQuestion.isGenerated && (
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                    Generated
                  </span>
                )}
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={handlePrevQuestion}
                  className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30 rounded"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="p-1 text-slate-500 hover:text-slate-800 rounded"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Prompt */}
            <div className="text-base text-slate-900 font-medium leading-relaxed">
              <MathText text={currentQuestion.prompt} />
            </div>

            {/* Diagram (if applicable) */}
            {currentQuestion.diagramSvgId && (
              <div className="py-2 flex justify-center bg-slate-50/50 rounded-2xl border border-slate-100">
                <DiagramRenderer
                  svgId={currentQuestion.diagramSvgId}
                  data={currentQuestion.diagramData}
                />
              </div>
            )}

            {/* Answer Input Section according to question type */}
            <div className="pt-2 space-y-4">
              {/* Type 1: Direct MCQ & Assertion-Reason */}
              {(currentQuestion.type === 'mcq' ||
                currentQuestion.type === 'assertion_reason') &&
                currentQuestion.mcqOptions && (
                  <div className="space-y-2">
                    {currentQuestion.mcqOptions.map((opt) => {
                      const isSelected = selectedOptionId?.toUpperCase() === opt.id.toUpperCase();
                      const isCorrectOpt = isChecked && opt.id.toUpperCase() === currentQuestion.correctOptionId?.toUpperCase();
                      const isWrongOpt = isChecked && isSelected && !isCorrect;

                      return (
                        <div
                          key={opt.id}
                          onClick={() => !isChecked && setSelectedOptionId(opt.id)}
                          className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                            isCorrectOpt
                              ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                              : isWrongOpt
                              ? 'bg-rose-50 border-rose-500 shadow-xs'
                              : isSelected
                              ? 'bg-blue-50/80 border-blue-600 shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center font-bold text-xs ${
                              isCorrectOpt
                                ? 'bg-emerald-600 text-white'
                                : isWrongOpt
                                ? 'bg-rose-600 text-white'
                                : isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {opt.id}
                          </div>
                          <div className="text-sm text-slate-800 flex-1 pt-0.5">
                            <MathText text={opt.text} />
                            {isChecked && opt.explanation && (
                              <p className="text-xs text-slate-500 mt-1 italic">
                                {opt.explanation}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              {/* Type 2: Numerical or Algebraic Expression */}
              {(currentQuestion.type === 'numerical' ||
                currentQuestion.type === 'expression') && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Type Your Answer:
                  </label>
                  <MathInput
                    value={userAnswer}
                    disabled={isChecked}
                    onChange={setUserAnswer}
                    onSubmit={handleCheckAnswer}
                    placeholder="Enter answer (e.g. 24, 3/4, 2*sqrt(3), (x-2)(x+3))..."
                  />
                </div>
              )}

              {/* Type 3: Multi-Part Question */}
              {currentQuestion.type === 'multi_part' && currentQuestion.subParts && (
                <div className="space-y-4">
                  {currentQuestion.subParts.map((part) => {
                    const partPassed = isChecked && subPartResults[part.id];
                    const partFailed = isChecked && subPartResults[part.id] === false;

                    return (
                      <div
                        key={part.id}
                        className={`p-3.5 rounded-2xl border space-y-2 ${
                          partPassed
                            ? 'bg-emerald-50/60 border-emerald-300'
                            : partFailed
                            ? 'bg-rose-50/60 border-rose-300'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span className="text-blue-700">{part.partLabel} <MathText text={part.prompt} /></span>
                          <span className="text-slate-400 font-mono">[{part.marks}m]</span>
                        </div>
                        <input
                          type="text"
                          disabled={isChecked}
                          value={subPartAnswers[part.id] ?? ''}
                          onChange={(e) =>
                            setSubPartAnswers((prev) => ({ ...prev, [part.id]: e.target.value }))
                          }
                          placeholder="Your answer for this part..."
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-mono focus:outline-hidden focus:border-blue-600"
                        />
                        {isChecked && (
                          <div className="text-xs font-semibold flex items-center gap-1.5 pt-1">
                            {partPassed ? (
                              <span className="text-emerald-700 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                Correct! (+{part.marks} marks)
                              </span>
                            ) : (
                              <span className="text-rose-700 flex items-center gap-1">
                                <XCircle className="w-4 h-4 text-rose-500" />
                                Expected: {part.expectedAnswer}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Type 4: Geometry Proof */}
              {currentQuestion.type === 'proof' && currentQuestion.proofSteps && (
                <ProofBuilder
                  steps={currentQuestion.proofSteps}
                  rubric={currentQuestion.proofRubric}
                  onComplete={handleProofComplete}
                  disabled={isChecked}
                />
              )}

              {/* Check Answer Button & Feedback */}
              {currentQuestion.type !== 'proof' && (
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {!isChecked ? (
                    <button
                      type="button"
                      onClick={handleCheckAnswer}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Check Answer</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            <span>Correct! Full {currentQuestion.marks} Marks</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-rose-600" />
                            <span>Incorrect. Review hints or worked solution below.</span>
                          </>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-1.5"
                      >
                        <span>Next Question</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Working Notes (Text box for student rough notes) */}
          {showWorkingNotes && (
            <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Student Working Lines (Scratchpad Notes)
                </span>
                <span className="text-[11px] text-slate-400">Auto-saved for this question</span>
              </div>
              <textarea
                value={workingNote}
                onChange={(e) => handleWorkingNoteChange(e.target.value)}
                placeholder="Type your intermediate working lines, formulas, or steps here..."
                rows={3}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 focus:outline-hidden focus:border-blue-500"
              />
            </div>
          )}

          {/* HTML5 Canvas Scratchpad */}
          {showScratchpad && (
            <div className="animate-fadeIn">
              <Scratchpad onClose={() => setShowScratchpad(false)} />
            </div>
          )}
        </div>

        {/* Right Column: 3-Step Hint Ladder & Solution (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-4 sticky top-4">
            <HintLadder
              key={currentQuestion.id}
              hintData={currentQuestion.hintLadder}
              solution={currentQuestion.solution}
              onHintRevealed={(count) => setHintsRevealed(count)}
              onSolutionRevealed={() => setSolutionRevealed(true)}
            />
          </div>
        </div>
      </div>

      {/* Slide-out Formula Cheat Sheet Drawer */}
      <FormulaDrawer
        chapter={chapter}
        isOpen={isFormulaOpen}
        onClose={() => setIsFormulaOpen(false)}
      />
    </div>
  );
};
