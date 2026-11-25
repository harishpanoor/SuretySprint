import React, { useRef, useMemo } from 'react';
import katex from 'katex';
import { Sparkles } from 'lucide-react';

interface MathInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

interface ToolbarSymbol {
  label: string;
  insert: string;
  cursorOffset?: number; // relative cursor placement
  title: string;
}

const TOOLBAR_SYMBOLS: ToolbarSymbol[] = [
  { label: '√x', insert: '\\sqrt{}', cursorOffset: -1, title: 'Square Root' },
  { label: 'x²', insert: '^2', title: 'Square' },
  { label: 'x³', insert: '^3', title: 'Cube' },
  { label: 'a/b', insert: '\\frac{}{}', cursorOffset: -3, title: 'Fraction' },
  { label: 'π', insert: '\\pi', title: 'Pi' },
  { label: '°', insert: '°', title: 'Degree' },
  { label: '±', insert: '\\pm ', title: 'Plus-Minus' },
  { label: '( )', insert: '()', cursorOffset: -1, title: 'Parentheses' },
  { label: 'x', insert: 'x', title: 'Variable x' },
  { label: 'y', insert: 'y', title: 'Variable y' },
  { label: '×', insert: ' * ', title: 'Multiply' },
  { label: '−', insert: ' - ', title: 'Minus' },
];

export const MathInput: React.FC<MathInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Type your answer...',
  disabled = false,
  autoFocus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInsertSymbol = (item: ToolbarSymbol) => {
    if (disabled) return;
    const input = inputRef.current;
    if (!input) {
      onChange(value + item.insert);
      return;
    }

    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? value.length;
    const newValue = value.slice(0, start) + item.insert + value.slice(end);
    onChange(newValue);

    setTimeout(() => {
      input.focus();
      const newCursorPos = start + item.insert.length + (item.cursorOffset ?? 0);
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  // Generate KaTeX preview
  const katexPreview = useMemo(() => {
    if (!value.trim()) return null;

    let mathCode = value.trim();
    // Convert common standard syntax to LaTeX if typed plainly
    // Convert simple fraction a/b to \frac{a}{b} if not already LaTeX
    if (!mathCode.includes('\\frac') && mathCode.includes('/')) {
      const parts = mathCode.split('/');
      if (parts.length === 2 && !parts[0].includes(' ') && !parts[1].includes(' ')) {
        mathCode = `\\frac{${parts[0].trim()}}{${parts[1].trim()}}`;
      }
    }
    // Convert sqrt(...) to \sqrt{...}
    mathCode = mathCode.replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}');

    try {
      return katex.renderToString(mathCode, {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return null;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full space-y-2">
      {/* Quick Math Symbol Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-lg border border-slate-200/80">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1 select-none">
          Symbols:
        </span>
        {TOOLBAR_SYMBOLS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => handleInsertSymbol(item)}
            title={item.title}
            className="px-2.5 py-1 text-xs sm:text-sm font-medium bg-white text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 rounded border border-slate-200 shadow-xs transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 font-mono text-base placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-3 focus:ring-blue-100 transition-all disabled:bg-slate-50 disabled:text-slate-500"
        />
      </div>

      {/* Live KaTeX Preview */}
      {katexPreview && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50/70 border border-blue-200/70 rounded-lg text-sm text-blue-900 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide shrink-0">
            Preview:
          </span>
          <span
            className="font-medium overflow-x-auto py-0.5"
            dangerouslySetInnerHTML={{ __html: katexPreview }}
          />
        </div>
      )}
    </div>
  );
};
