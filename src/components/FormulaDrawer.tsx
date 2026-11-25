import React, { useState } from 'react';
import { Chapter } from '../types/curriculum';
import { MathText } from './MathText';
import { BookOpen, X, Search, Lightbulb, CheckSquare, Sparkles } from 'lucide-react';

interface FormulaDrawerProps {
  chapter: Chapter;
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaDrawer: React.FC<FormulaDrawerProps> = ({ chapter, isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const { formulaSheet } = chapter;
  const filter = search.toLowerCase();

  const filteredFormulas = formulaSheet.formulas.filter(
    (f) =>
      f.title.toLowerCase().includes(filter) ||
      (f.description && f.description.toLowerCase().includes(filter))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-fadeIn">
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-out Drawer Panel */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-slideLeft">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl">
              <BookOpen className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                Formula & Rules Sheet
              </span>
              <h3 className="text-base font-bold text-white line-clamp-1">{chapter.name}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-100 bg-slate-50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search formulas or rules..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-500"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Key Rules */}
          {formulaSheet.keyRules.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>Key Definitions & Rules</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2">
                {formulaSheet.keyRules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="text-blue-600 font-bold">•</span>
                    <MathText text={rule} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulas */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Standard Formulas</span>
            </div>
            {filteredFormulas.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No matching formulas found.</p>
            ) : (
              filteredFormulas.map((f, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-blue-200 transition-colors"
                >
                  <h4 className="text-xs font-semibold text-slate-800 mb-1">{f.title}</h4>
                  <div className="p-2 bg-blue-50/50 rounded-lg text-center overflow-x-auto">
                    <MathText text={`$$${f.latex}$$`} />
                  </div>
                  {f.description && (
                    <div className="text-[11px] text-slate-500 mt-1.5">
                      <MathText text={f.description} />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Exam Tips */}
          {formulaSheet.examTips.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>ICSE Board Exam Tips</span>
              </div>
              <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 space-y-2">
                {formulaSheet.examTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-amber-900">
                    <span className="font-bold text-amber-600">★</span>
                    <MathText text={tip} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-[11px] text-slate-400">
            Reference for ICSE Class 9 Mathematics • CISCE Syllabus
          </p>
        </div>
      </div>
    </div>
  );
};
