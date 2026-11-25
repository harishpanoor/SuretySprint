import React, { useMemo } from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
  inline?: boolean;
}

function renderMathSegment(mathCode: string, displayMode: boolean, key: React.Key) {
  try {
    const html = katex.renderToString(mathCode.trim(), {
      displayMode,
      throwOnError: false,
      strict: 'ignore',
    });
    if (displayMode) {
      return (
        <span
          key={key}
          className="my-2 block overflow-x-auto text-center"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
    return (
      <span
        key={key}
        className="inline-block px-0.5 align-middle"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return <code key={key} className="text-red-500">${mathCode}$</code>;
  }
}

function renderInlineContent(content: string, keyPrefix: string): React.ReactNode {
  if (!content) return null;
  const regex = /(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g;
  const tokens = content.split(regex);

  return tokens.map((token, index) => {
    const key = `${keyPrefix}_${index}`;
    if (token.startsWith('$$') && token.endsWith('$$')) {
      return renderMathSegment(token.slice(2, -2), true, key);
    }
    if (token.startsWith('$') && token.endsWith('$')) {
      return renderMathSegment(token.slice(1, -1), false, key);
    }
    return formatSimpleMarkdown(token, key);
  });
}

function formatSimpleMarkdown(str: string, keyPrefix: string): React.ReactNode {
  const parts = str.split(/(\*\*[^*]+?\*\*|\*[^*]+?\*|`[^`]+?`)/g);
  return parts.map((part, i) => {
    const key = `${keyPrefix}_p${i}`;
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={key} className="italic">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={key} className="px-1 py-0.5 text-xs bg-slate-100 rounded text-blue-700 font-mono">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

function renderMarkdownTable(lines: string[], key: React.Key) {
  const parseRow = (line: string) =>
    line
      .trim()
      .slice(1, -1)
      .split('|')
      .map((c) => c.trim());

  const headerCells = parseRow(lines[0]);
  const bodyRows = lines.slice(2).map(parseRow);

  return (
    <div key={key} className="overflow-x-auto my-3 rounded-xl border border-slate-200 shadow-2xs">
      <table className="min-w-full text-xs divide-y divide-slate-200 text-center">
        <thead className="bg-slate-100 font-bold text-slate-700">
          <tr>
            {headerCells.map((cell, cIdx) => (
              <th key={cIdx} className="px-3 py-2 border-r border-slate-200 last:border-r-0">
                {renderInlineContent(cell, `th_${key}_${cIdx}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100 text-slate-800">
          {bodyRows.map((row, rIdx) => (
            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-3 py-2 border-r border-slate-100 last:border-r-0 font-medium">
                  {renderInlineContent(cell, `td_${key}_${rIdx}_${cIdx}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '', inline = false }) => {
  const renderedContent = useMemo(() => {
    if (!text) return null;

    // Detect if text contains markdown table segments
    const lines = text.split('\n');
    const blocks: React.ReactNode[] = [];
    let currentTableLines: string[] = [];
    let currentTextLines: string[] = [];

    const flushText = () => {
      if (currentTextLines.length === 0) return;
      blocks.push(
        <React.Fragment key={`text_${blocks.length}`}>
          {currentTextLines.map((line, lIdx) => (
            <React.Fragment key={lIdx}>
              {lIdx > 0 && <br />}
              {renderInlineContent(line, `l_${blocks.length}_${lIdx}`)}
            </React.Fragment>
          ))}
        </React.Fragment>
      );
      currentTextLines = [];
    };

    const flushTable = () => {
      if (currentTableLines.length === 0) return;
      blocks.push(renderMarkdownTable(currentTableLines, `tbl_${blocks.length}`));
      currentTableLines = [];
    };

    let inTable = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        if (!inTable) {
          // Look ahead to check if next line is separator
          if (i + 1 < lines.length && /^\|(\s*:?-+:?\s*\|)+$/.test(lines[i + 1].trim())) {
            flushText();
            inTable = true;
            currentTableLines.push(line);
            continue;
          }
        } else {
          currentTableLines.push(line);
          continue;
        }
      }

      if (inTable) {
        flushTable();
        inTable = false;
      }
      currentTextLines.push(line);
    }

    if (inTable) flushTable();
    flushText();

    return blocks;
  }, [text]);

  const Component = inline ? 'span' : 'div';

  return <Component className={`leading-relaxed text-slate-800 ${className}`}>{renderedContent}</Component>;
};
