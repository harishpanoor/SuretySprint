import React from 'react';

export interface GridPoint {
  x: number;
  y: number;
  label?: string;
  color?: string;
}

export interface GridLine {
  m: number; // slope
  c: number; // y-intercept: y = mx + c
  color?: string;
  label?: string;
}

interface CoordinateGridSVGProps {
  points?: GridPoint[];
  lines?: GridLine[];
  intersection?: { x: number; y: number; label?: string };
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  className?: string;
}

export const CoordinateGridSVG: React.FC<CoordinateGridSVGProps> = ({
  points = [],
  lines = [],
  intersection,
  xMin = -5,
  xMax = 5,
  yMin = -5,
  yMax = 5,
  className = '',
}) => {
  const size = 260;
  const padding = 24;
  const plotSize = size - 2 * padding;

  const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * plotSize;
  const toSvgY = (y: number) => padding + ((yMax - y) / (yMax - yMin)) * plotSize;

  const originX = toSvgX(0);
  const originY = toSvgY(0);

  // Generate integer ticks
  const xTicks = [];
  for (let x = xMin; x <= xMax; x++) {
    if (x !== 0) xTicks.push(x);
  }
  const yTicks = [];
  for (let y = yMin; y <= yMax; y++) {
    if (y !== 0) yTicks.push(y);
  }

  return (
    <div className={`w-full max-w-xs mx-auto bg-white p-2 rounded-xl border border-slate-200 shadow-xs ${className}`}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
        {/* Background Grid */}
        {xTicks.map((x) => (
          <line
            key={`gx_${x}`}
            x1={toSvgX(x)}
            y1={padding}
            x2={toSvgX(x)}
            y2={size - padding}
            stroke="#f1f5f9"
            strokeWidth="1"
          />
        ))}
        {yTicks.map((y) => (
          <line
            key={`gy_${y}`}
            x1={padding}
            y1={toSvgY(y)}
            x2={size - padding}
            y2={toSvgY(y)}
            stroke="#f1f5f9"
            strokeWidth="1"
          />
        ))}

        {/* X Axis */}
        <line
          x1={padding - 8}
          y1={originY}
          x2={size - padding + 8}
          y2={originY}
          stroke="#475569"
          strokeWidth="1.8"
        />
        <text x={size - padding + 12} y={originY + 4} className="text-[10px] font-bold fill-slate-700">
          X
        </text>
        <text x={padding - 18} y={originY + 4} className="text-[10px] font-bold fill-slate-700">
          X'
        </text>

        {/* Y Axis */}
        <line
          x1={originX}
          y1={size - padding + 8}
          x2={originX}
          y2={padding - 8}
          stroke="#475569"
          strokeWidth="1.8"
        />
        <text x={originX - 3} y={padding - 10} textAnchor="middle" className="text-[10px] font-bold fill-slate-700">
          Y
        </text>
        <text x={originX - 3} y={size - padding + 18} textAnchor="middle" className="text-[10px] font-bold fill-slate-700">
          Y'
        </text>

        {/* Origin Label O */}
        <text x={originX - 8} y={originY + 12} className="text-[9px] font-bold fill-slate-500">
          O
        </text>

        {/* Ticks and Numbers */}
        {xTicks.map((x) => (
          <g key={`tx_${x}`}>
            <line x1={toSvgX(x)} y1={originY - 3} x2={toSvgX(x)} y2={originY + 3} stroke="#475569" strokeWidth="1" />
            <text x={toSvgX(x)} y={originY + 12} textAnchor="middle" className="text-[8px] font-mono fill-slate-500">
              {x}
            </text>
          </g>
        ))}
        {yTicks.map((y) => (
          <g key={`ty_${y}`}>
            <line x1={originX - 3} y1={toSvgY(y)} x2={originX + 3} y2={toSvgY(y)} stroke="#475569" strokeWidth="1" />
            <text x={originX - 7} y={toSvgY(y) + 3} textAnchor="end" className="text-[8px] font-mono fill-slate-500">
              {y}
            </text>
          </g>
        ))}

        {/* Linear Equations Lines */}
        {lines.map((line, idx) => {
          // Points at xMin and xMax
          const y1 = line.m * xMin + line.c;
          const y2 = line.m * xMax + line.c;
          return (
            <line
              key={idx}
              x1={toSvgX(xMin)}
              y1={toSvgY(y1)}
              x2={toSvgX(xMax)}
              y2={toSvgY(y2)}
              stroke={line.color ?? '#2563eb'}
              strokeWidth="2"
            />
          );
        })}

        {/* Points */}
        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={toSvgX(p.x)} cy={toSvgY(p.y)} r="4" fill={p.color ?? '#2563eb'} stroke="#fff" strokeWidth="1.5" />
            {p.label && (
              <text
                x={toSvgX(p.x) + 6}
                y={toSvgY(p.y) - 6}
                className="text-[9px] font-bold fill-slate-800"
              >
                {p.label}
              </text>
            )}
          </g>
        ))}

        {/* Intersection Point */}
        {intersection && (
          <g>
            <circle
              cx={toSvgX(intersection.x)}
              cy={toSvgY(intersection.y)}
              r="5"
              fill="#dc2626"
              stroke="#fff"
              strokeWidth="2"
            />
            <text
              x={toSvgX(intersection.x) + 8}
              y={toSvgY(intersection.y) - 6}
              className="text-[10px] font-bold fill-red-700 bg-white"
            >
              {intersection.label ?? `(${intersection.x}, ${intersection.y})`}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
