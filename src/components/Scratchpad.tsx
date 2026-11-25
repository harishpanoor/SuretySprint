import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Pen, Eraser, RotateCcw, Trash2, Grid, AlignJustify, Square, Minimize2, Maximize2 } from 'lucide-react';

interface ScratchpadProps {
  onClose?: () => void;
  className?: string;
}

type Tool = 'pen' | 'eraser';
type BackgroundPattern = 'blank' | 'lined' | 'grid';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  tool: Tool;
  color: string;
  size: number;
  points: Point[];
}

export const Scratchpad: React.FC<ScratchpadProps> = ({ onClose, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tool, setTool] = useState<Tool>('pen');
  const [penColor, setPenColor] = useState<string>('#1e40af'); // blue
  const [penSize, setPenSize] = useState<number>(2.5);
  const [pattern, setPattern] = useState<BackgroundPattern>('grid');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Undo history of strokes
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const currentStrokeRef = useRef<Stroke | null>(null);

  // Redraw canvas including background and all strokes
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw background pattern
    ctx.save();
    if (pattern === 'lined') {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      const lineSpacing = 28;
      for (let y = lineSpacing; y < height; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    } else if (pattern === 'grid') {
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = gridSize; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = gridSize; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }
    ctx.restore();

    // Render strokes
    for (const stroke of strokes) {
      if (!stroke || !stroke.points || stroke.points.length < 2) continue;
      ctx.save();
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = stroke.size * 5;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size;
      }

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
      ctx.restore();
    }
  }, [strokes, pattern]);

  // Adjust canvas size to container dimensions with DPR support
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      redraw();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [redraw, isExpanded]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  // Coordinate helper
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e && e.cancelable) {
      e.preventDefault();
    }
    const pt = getCoordinates(e);
    if (!pt) return;
    setIsDrawing(true);

    const newStroke: Stroke = {
      tool,
      color: penColor,
      size: penSize,
      points: [pt],
    };
    currentStrokeRef.current = newStroke;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e && e.cancelable) {
      e.preventDefault();
    }
    if (!isDrawing || !currentStrokeRef.current) return;
    const pt = getCoordinates(e);
    if (!pt) return;

    currentStrokeRef.current.points.push(pt);

    // Fast local segment draw on top of current canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pts = currentStrokeRef.current.points;
    if (pts.length >= 2) {
      const p1 = pts[pts.length - 2];
      const p2 = pts[pts.length - 1];

      ctx.save();
      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = penSize * 5;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penSize;
      }

      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const completedStroke = currentStrokeRef.current;
    currentStrokeRef.current = null;
    if (completedStroke && completedStroke.points && completedStroke.points.length > 0) {
      setStrokes((prev) => [...prev, { ...completedStroke, points: [...completedStroke.points] }]);
    }
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setStrokes([]);
  };

  return (
    <div
      className={`flex flex-col bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden transition-all duration-300 ${
        isExpanded ? 'fixed inset-4 z-50 shadow-2xl' : 'w-full h-80'
      } ${className}`}
    >
      {/* Scratchpad Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1">
            Rough Work
          </span>

          {/* Pen Tool */}
          <button
            type="button"
            onClick={() => setTool('pen')}
            className={`p-1.5 rounded-lg text-sm transition-colors ${
              tool === 'pen'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
            title="Pen"
          >
            <Pen className="w-4 h-4" />
          </button>

          {/* Eraser Tool */}
          <button
            type="button"
            onClick={() => setTool('eraser')}
            className={`p-1.5 rounded-lg text-sm transition-colors ${
              tool === 'eraser'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>

          {/* Pen Color Pickers */}
          {tool === 'pen' && (
            <div className="flex items-center gap-1 pl-1 border-l border-slate-200">
              {['#1e40af', '#059669', '#dc2626', '#1e293b'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setPenColor(c)}
                  className={`w-5 h-5 rounded-full border-2 transition-transform ${
                    penColor === c ? 'scale-115 border-slate-800' : 'border-white'
                  }`}
                  style={{ backgroundColor: c }}
                  title="Color"
                />
              ))}
            </div>
          )}

          {/* Pen Stroke Size */}
          <select
            value={penSize}
            onChange={(e) => setPenSize(Number(e.target.value))}
            className="text-xs bg-white border border-slate-200 rounded px-1.5 py-1 text-slate-700 font-medium"
            title="Stroke Width"
          >
            <option value={1.5}>Fine</option>
            <option value={2.5}>Medium</option>
            <option value={4.5}>Thick</option>
          </select>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-1">
          {/* Background pattern */}
          <button
            type="button"
            onClick={() => {
              const next: BackgroundPattern = pattern === 'grid' ? 'lined' : pattern === 'lined' ? 'blank' : 'grid';
              setPattern(next);
            }}
            className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg text-sm"
            title={`Pattern: ${pattern}`}
          >
            {pattern === 'grid' && <Grid className="w-4 h-4" />}
            {pattern === 'lined' && <AlignJustify className="w-4 h-4" />}
            {pattern === 'blank' && <Square className="w-4 h-4" />}
          </button>

          {/* Undo */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={strokes.length === 0}
            className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg text-sm disabled:opacity-40"
            title="Undo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Clear */}
          <button
            type="button"
            onClick={handleClear}
            disabled={strokes.length === 0}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm disabled:opacity-40"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Expand/Collapse */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-600 hover:bg-slate-200 rounded-lg text-sm"
            title={isExpanded ? 'Collapse' : 'Expand full-screen'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 text-xs text-slate-500 hover:text-slate-800"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Canvas Drawing Area */}
      <div ref={containerRef} className="flex-1 w-full h-full relative cursor-crosshair touch-none bg-white">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 block w-full h-full touch-none"
          style={{ touchAction: 'none' }}
        />
      </div>
    </div>
  );
};
