import React from 'react';

export interface HistogramBin {
  label: string; // e.g. "10-20" or class mark "15"
  frequency: number;
}

interface StatsChartProps {
  type: 'histogram' | 'frequency_polygon' | 'both';
  bins: HistogramBin[];
  xTitle?: string;
  yTitle?: string;
  className?: string;
}

export const StatsChartSVG: React.FC<StatsChartProps> = ({
  type = 'histogram',
  bins,
  xTitle = 'Class Interval',
  yTitle = 'Frequency',
  className = '',
}) => {
  const chartWidth = 320;
  const chartHeight = 180;
  const padding = { top: 20, right: 20, bottom: 40, left: 45 };

  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const maxFreq = Math.max(...bins.map((b) => b.frequency), 5);
  // Y-axis scale nice round number
  const yMax = Math.ceil(maxFreq / 5) * 5;

  const numBins = bins.length;
  const barWidth = innerWidth / numBins;

  // Calculate coordinates for frequency polygon points
  const points = bins.map((bin, i) => {
    const x = padding.left + i * barWidth + barWidth / 2;
    const y = padding.top + innerHeight - (bin.frequency / yMax) * innerHeight;
    return { x, y, freq: bin.frequency };
  });

  // Polyline string for frequency polygon
  const polylineStr = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className={`w-full max-w-sm mx-auto bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs ${className}`}>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
        {/* Background Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
          const y = padding.top + innerHeight * (1 - pct);
          const val = Math.round(yMax * pct);
          return (
            <g key={idx}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + innerWidth}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <text
                x={padding.left - 6}
                y={y + 3.5}
                textAnchor="end"
                className="text-[9px] fill-slate-400 font-mono"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* Axes */}
        {/* Y Axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + innerHeight}
          stroke="#94a3b8"
          strokeWidth="1.5"
        />
        {/* X Axis */}
        <line
          x1={padding.left}
          y1={padding.top + innerHeight}
          x2={padding.left + innerWidth}
          y2={padding.top + innerHeight}
          stroke="#94a3b8"
          strokeWidth="1.5"
        />

        {/* Histogram Bars */}
        {(type === 'histogram' || type === 'both') &&
          bins.map((bin, i) => {
            const x = padding.left + i * barWidth;
            const barHeight = (bin.frequency / yMax) * innerHeight;
            const y = padding.top + innerHeight - barHeight;

            return (
              <g key={i}>
                <rect
                  x={x + 1}
                  y={y}
                  width={barWidth - 2}
                  height={barHeight}
                  fill="#dbeafe"
                  stroke="#3b82f6"
                  strokeWidth="1.2"
                  rx="1"
                />
                {/* Frequency value on top of bar */}
                <text
                  x={x + barWidth / 2}
                  y={y - 3}
                  textAnchor="middle"
                  className="text-[9px] font-bold fill-blue-800"
                >
                  {bin.frequency}
                </text>
              </g>
            );
          })}

        {/* Frequency Polygon Line & Dots */}
        {(type === 'frequency_polygon' || type === 'both') && (
          <g>
            <polyline
              points={polylineStr}
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="3.5"
                fill="#dc2626"
                stroke="#fff"
                strokeWidth="1.5"
              />
            ))}
          </g>
        )}

        {/* X Axis Labels */}
        {bins.map((bin, i) => {
          const x = padding.left + i * barWidth + barWidth / 2;
          return (
            <text
              key={i}
              x={x}
              y={padding.top + innerHeight + 14}
              textAnchor="middle"
              className="text-[9px] font-medium fill-slate-600"
            >
              {bin.label}
            </text>
          );
        })}

        {/* Axis Titles */}
        <text
          x={padding.left + innerWidth / 2}
          y={chartHeight - 6}
          textAnchor="middle"
          className="text-[10px] font-semibold fill-slate-500 uppercase tracking-wider"
        >
          {xTitle}
        </text>
        <text
          x={12}
          y={padding.top + innerHeight / 2}
          textAnchor="middle"
          transform={`rotate(-90 12 ${padding.top + innerHeight / 2})`}
          className="text-[10px] font-semibold fill-slate-500 uppercase tracking-wider"
        >
          {yTitle}
        </text>
      </svg>
    </div>
  );
};
