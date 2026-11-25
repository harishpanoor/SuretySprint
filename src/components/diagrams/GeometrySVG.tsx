import React from 'react';

interface TriangleDiagramProps {
  type?: 'general' | 'isosceles' | 'congruent_pair' | 'midpoint' | 'midpoint_triangle';
  labels?: { A?: string; B?: string; C?: string; D?: string; E?: string; F?: string };
  sideLabels?: { AB?: string; BC?: string; CA?: string; DE?: string };
  angleLabels?: { A?: string; B?: string; C?: string };
  className?: string;
}

export const TriangleDiagram: React.FC<TriangleDiagramProps> = ({
  type = 'general',
  labels = { A: 'A', B: 'B', C: 'C', D: 'D', E: 'E' },
  sideLabels,
  angleLabels,
  className = '',
}) => {
  if (type === 'congruent_pair') {
    return (
      <svg viewBox="0 0 340 160" className={`w-full max-w-sm mx-auto h-auto ${className}`}>
        {/* Triangle 1: ABC */}
        <polygon points="60,25 15,135 125,135" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5" />
        <text x="60" y="18" textAnchor="middle" className="text-xs font-bold fill-slate-700">A</text>
        <text x="10" y="150" textAnchor="middle" className="text-xs font-bold fill-slate-700">B</text>
        <text x="130" y="150" textAnchor="middle" className="text-xs font-bold fill-slate-700">C</text>
        {/* Tick marks on AB */}
        <line x1="33" y1="78" x2="43" y2="82" stroke="#2563eb" strokeWidth="2" />
        {/* Double tick marks on BC */}
        <line x1="68" y1="131" x2="68" y2="139" stroke="#2563eb" strokeWidth="2" />
        <line x1="72" y1="131" x2="72" y2="139" stroke="#2563eb" strokeWidth="2" />

        {/* Triangle 2: PQR */}
        <polygon points="260,25 215,135 325,135" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" />
        <text x="260" y="18" textAnchor="middle" className="text-xs font-bold fill-slate-700">P</text>
        <text x="210" y="150" textAnchor="middle" className="text-xs font-bold fill-slate-700">Q</text>
        <text x="330" y="150" textAnchor="middle" className="text-xs font-bold fill-slate-700">R</text>
        {/* Tick marks on PQ */}
        <line x1="233" y1="78" x2="243" y2="82" stroke="#16a34a" strokeWidth="2" />
        {/* Double tick marks on QR */}
        <line x1="268" y1="131" x2="268" y2="139" stroke="#16a34a" strokeWidth="2" />
        <line x1="272" y1="131" x2="272" y2="139" stroke="#16a34a" strokeWidth="2" />
      </svg>
    );
  }

  if (type === 'midpoint') {
    return (
      <svg viewBox="0 0 240 180" className={`w-full max-w-xs mx-auto h-auto ${className}`}>
        {/* Triangle ABC: A=(120, 20), B=(30, 150), C=(210, 150) */}
        <polygon points="120,25 30,155 210,155" fill="#f8fafc" stroke="#1e40af" strokeWidth="2.5" />
        {/* Midpoint line DE: D = (75, 90), E = (165, 90) */}
        <line x1="75" y1="90" x2="165" y2="90" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 2" />
        
        {/* Vertices */}
        <circle cx="120" cy="25" r="3.5" fill="#1e40af" />
        <circle cx="30" cy="155" r="3.5" fill="#1e40af" />
        <circle cx="210" cy="155" r="3.5" fill="#1e40af" />
        <circle cx="75" cy="90" r="3.5" fill="#dc2626" />
        <circle cx="165" cy="90" r="3.5" fill="#dc2626" />

        <text x="120" y="18" textAnchor="middle" className="text-xs font-bold fill-slate-800">{labels.A ?? 'A'}</text>
        <text x="20" y="165" textAnchor="middle" className="text-xs font-bold fill-slate-800">{labels.B ?? 'B'}</text>
        <text x="220" y="165" textAnchor="middle" className="text-xs font-bold fill-slate-800">{labels.C ?? 'C'}</text>
        <text x="60" y="93" textAnchor="middle" className="text-xs font-bold fill-red-600">{labels.D ?? 'D'}</text>
        <text x="180" y="93" textAnchor="middle" className="text-xs font-bold fill-red-600">{labels.E ?? 'E'}</text>
        
        {sideLabels?.BC && (
          <text x="120" y="172" textAnchor="middle" className="text-[11px] font-semibold fill-blue-800">
            {sideLabels.BC}
          </text>
        )}
        {sideLabels?.DE && (
          <text x="120" y="83" textAnchor="middle" className="text-[11px] font-semibold fill-red-600">
            {sideLabels.DE}
          </text>
        )}
      </svg>
    );
  }

  if (type === 'midpoint_triangle') {
    return (
      <svg viewBox="0 0 240 185" className={`w-full max-w-xs mx-auto h-auto ${className}`}>
        {/* Outer Triangle ABC: A=(120, 25), B=(30, 155), C=(210, 155) */}
        <polygon points="120,25 30,155 210,155" fill="#f8fafc" stroke="#1e40af" strokeWidth="2.5" />
        
        {/* Inner Midpoint Triangle DEF:
            F is midpoint of AB = (75, 90)
            E is midpoint of AC = (165, 90)
            D is midpoint of BC = (120, 155) */}
        <polygon points="75,90 165,90 120,155" fill="#fef3c7" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 2" />

        {/* Vertices of ABC */}
        <circle cx="120" cy="25" r="3.5" fill="#1e40af" />
        <circle cx="30" cy="155" r="3.5" fill="#1e40af" />
        <circle cx="210" cy="155" r="3.5" fill="#1e40af" />

        {/* Midpoints D, E, F */}
        <circle cx="120" cy="155" r="3.5" fill="#dc2626" />
        <circle cx="165" cy="90" r="3.5" fill="#dc2626" />
        <circle cx="75" cy="90" r="3.5" fill="#dc2626" />

        {/* Vertex Labels */}
        <text x="120" y="18" textAnchor="middle" className="text-xs font-bold fill-slate-800">{labels.A ?? 'A'}</text>
        <text x="18" y="165" textAnchor="middle" className="text-xs font-bold fill-slate-800">{labels.B ?? 'B'}</text>
        <text x="222" y="165" textAnchor="middle" className="text-xs font-bold fill-slate-800">{labels.C ?? 'C'}</text>
        <text x="120" y="174" textAnchor="middle" className="text-xs font-bold fill-red-600">{labels.D ?? 'D'}</text>
        <text x="180" y="93" textAnchor="middle" className="text-xs font-bold fill-red-600">{labels.E ?? 'E'}</text>
        <text x="60" y="93" textAnchor="middle" className="text-xs font-bold fill-red-600">{labels.F ?? 'F'}</text>
      </svg>
    );
  }

  // General / Isosceles Triangle
  return (
    <svg viewBox="0 0 220 170" className={`w-full max-w-xs mx-auto h-auto ${className}`}>
      <polygon points="110,25 25,145 195,145" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5" />
      <text x="110" y="18" textAnchor="middle" className="text-xs font-bold fill-slate-800">{labels.A ?? 'A'}</text>
      <text x="15" y="155" textAnchor="middle" className="text-xs font-bold fill-slate-800">{labels.B ?? 'B'}</text>
      <text x="205" y="155" textAnchor="middle" className="text-xs font-bold fill-slate-800">{labels.C ?? 'C'}</text>

      {/* Side tick marks if isosceles */}
      {type === 'isosceles' && (
        <>
          <line x1="62" y1="83" x2="72" y2="88" stroke="#2563eb" strokeWidth="2" />
          <line x1="148" y1="88" x2="158" y2="83" stroke="#2563eb" strokeWidth="2" />
        </>
      )}

      {sideLabels?.AB && <text x="50" y="80" textAnchor="middle" className="text-[11px] font-medium fill-slate-600">{sideLabels.AB}</text>}
      {sideLabels?.BC && <text x="110" y="160" textAnchor="middle" className="text-[11px] font-medium fill-slate-600">{sideLabels.BC}</text>}
      {sideLabels?.CA && <text x="170" y="80" textAnchor="middle" className="text-[11px] font-medium fill-slate-600">{sideLabels.CA}</text>}

      {angleLabels?.A && <text x="110" y="45" textAnchor="middle" className="text-[10px] font-semibold fill-amber-700">{angleLabels.A}</text>}
      {angleLabels?.B && <text x="45" y="138" textAnchor="middle" className="text-[10px] font-semibold fill-amber-700">{angleLabels.B}</text>}
      {angleLabels?.C && <text x="175" y="138" textAnchor="middle" className="text-[10px] font-semibold fill-amber-700">{angleLabels.C}</text>}
    </svg>
  );
};

interface RightTriangleDiagramProps {
  baseLabel?: string;
  altitudeLabel?: string;
  hypotenuseLabel?: string;
  angleLabel?: string;
  vertexA?: string;
  vertexB?: string;
  vertexC?: string;
  className?: string;
}

export const RightTriangleDiagram: React.FC<RightTriangleDiagramProps> = ({
  baseLabel = 'Base',
  altitudeLabel = 'Alt',
  hypotenuseLabel = 'Hyp',
  angleLabel,
  vertexA = 'A',
  vertexB = 'B',
  vertexC = 'C',
  className = '',
}) => {
  return (
    <svg viewBox="0 0 220 170" className={`w-full max-w-xs mx-auto h-auto ${className}`}>
      {/* Right triangle: B is right angle at (40, 140), A is at (40, 30), C is at (180, 140) */}
      <polygon points="40,30 40,140 180,140" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="2.5" />
      {/* Right angle square indicator at B */}
      <polyline points="40,125 55,125 55,140" fill="none" stroke="#1d4ed8" strokeWidth="1.5" />

      {/* Vertices */}
      <text x="35" y="24" textAnchor="middle" className="text-xs font-bold fill-slate-800">{vertexA}</text>
      <text x="25" y="150" textAnchor="middle" className="text-xs font-bold fill-slate-800">{vertexB}</text>
      <text x="190" y="150" textAnchor="middle" className="text-xs font-bold fill-slate-800">{vertexC}</text>

      {/* Edge labels */}
      {altitudeLabel && (
        <text x="22" y="85" textAnchor="middle" className="text-[11px] font-semibold fill-blue-700">
          {altitudeLabel}
        </text>
      )}
      {baseLabel && (
        <text x="110" y="158" textAnchor="middle" className="text-[11px] font-semibold fill-blue-700">
          {baseLabel}
        </text>
      )}
      {hypotenuseLabel && (
        <text x="120" y="78" textAnchor="middle" className="text-[11px] font-semibold fill-emerald-700">
          {hypotenuseLabel}
        </text>
      )}

      {/* Angle arc at C */}
      {angleLabel && (
        <>
          <path d="M 160 140 A 20 20 0 0 0 152 125" fill="none" stroke="#d97706" strokeWidth="1.5" />
          <text x="145" y="132" textAnchor="middle" className="text-[10px] font-bold fill-amber-700">{angleLabel}</text>
        </>
      )}
    </svg>
  );
};

interface CircleDiagramProps {
  radiusLabel?: string;
  chordLabel?: string;
  distLabel?: string;
  isTwoParallelChords?: boolean;
  className?: string;
}

export const CircleDiagram: React.FC<CircleDiagramProps> = ({
  radiusLabel = 'r',
  chordLabel = 'Chord',
  distLabel = 'd',
  isTwoParallelChords = false,
  className = '',
}) => {
  return (
    <svg viewBox="0 0 200 200" className={`w-full max-w-xs mx-auto h-auto ${className}`}>
      {/* Circle center at (100, 100), radius = 75 */}
      <circle cx="100" cy="100" r="75" fill="#f8fafc" stroke="#2563eb" strokeWidth="2.5" />
      {/* Center point O */}
      <circle cx="100" cy="100" r="3.5" fill="#1e40af" />
      <text x="100" y="93" textAnchor="middle" className="text-xs font-bold fill-blue-900">O</text>

      {/* Chord AB at y = 145 */}
      {/* x-offsets: sqrt(75^2 - 45^2) = sqrt(5625 - 2025) = 60. So x = 40 to 160 */}
      <line x1="40" y1="145" x2="160" y2="145" stroke="#dc2626" strokeWidth="2.5" />
      <circle cx="40" cy="145" r="3" fill="#dc2626" />
      <circle cx="160" cy="145" r="3" fill="#dc2626" />
      <text x="30" y="150" textAnchor="middle" className="text-xs font-bold fill-slate-800">A</text>
      <text x="170" y="150" textAnchor="middle" className="text-xs font-bold fill-slate-800">B</text>

      {/* Perpendicular OM to chord */}
      <line x1="100" y1="100" x2="100" y2="145" stroke="#059669" strokeWidth="2" strokeDasharray="3 2" />
      <circle cx="100" cy="145" r="3" fill="#059669" />
      <text x="108" y="155" textAnchor="start" className="text-xs font-bold fill-slate-800">M</text>

      {/* Radius line OA */}
      <line x1="100" y1="100" x2="40" y2="145" stroke="#2563eb" strokeWidth="1.8" />

      {/* Labels */}
      {distLabel && (
        <text x="92" y="125" textAnchor="end" className="text-[11px] font-semibold fill-emerald-700">
          {distLabel}
        </text>
      )}
      {radiusLabel && (
        <text x="65" y="115" textAnchor="middle" className="text-[11px] font-semibold fill-blue-700">
          {radiusLabel}
        </text>
      )}
      {chordLabel && (
        <text x="100" y="165" textAnchor="middle" className="text-[11px] font-semibold fill-red-600">
          {chordLabel}
        </text>
      )}

      {/* Second chord if requested */}
      {isTwoParallelChords && (
        <>
          {/* Chord CD at y = 55 (distance 45 on opposite side) */}
          <line x1="40" y1="55" x2="160" y2="55" stroke="#7c3aed" strokeWidth="2" />
          <text x="30" y="55" textAnchor="middle" className="text-xs font-bold fill-slate-800">C</text>
          <text x="170" y="55" textAnchor="middle" className="text-xs font-bold fill-slate-800">D</text>
          <line x1="100" y1="100" x2="100" y2="55" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 2" />
        </>
      )}
    </svg>
  );
};

interface ParallelogramDiagramProps {
  vertexA?: string;
  vertexB?: string;
  vertexC?: string;
  vertexD?: string;
  showDiagonals?: boolean;
  className?: string;
}

export const ParallelogramDiagram: React.FC<ParallelogramDiagramProps> = ({
  vertexA = 'A',
  vertexB = 'B',
  vertexC = 'C',
  vertexD = 'D',
  showDiagonals = true,
  className = '',
}) => {
  return (
    <svg viewBox="0 0 240 160" className={`w-full max-w-xs mx-auto h-auto ${className}`}>
      {/* Parallelogram vertices: A=(70, 30), B=(210, 30), C=(170, 130), D=(30, 130) */}
      <polygon points="70,30 210,30 170,130 30,130" fill="#f5f3ff" stroke="#6d28d9" strokeWidth="2.5" />

      {/* Diagonals AC and BD */}
      {showDiagonals && (
        <>
          <line x1="70" y1="30" x2="170" y2="130" stroke="#d97706" strokeWidth="1.8" strokeDasharray="4 2" />
          <line x1="210" y1="30" x2="30" y2="130" stroke="#d97706" strokeWidth="1.8" strokeDasharray="4 2" />
          <circle cx="120" cy="80" r="3.5" fill="#d97706" />
          <text x="120" y="73" textAnchor="middle" className="text-xs font-bold fill-amber-800">O</text>
        </>
      )}

      {/* Vertices */}
      <text x="65" y="22" textAnchor="middle" className="text-xs font-bold fill-slate-800">{vertexA}</text>
      <text x="218" y="25" textAnchor="middle" className="text-xs font-bold fill-slate-800">{vertexB}</text>
      <text x="180" y="142" textAnchor="middle" className="text-xs font-bold fill-slate-800">{vertexC}</text>
      <text x="20" y="140" textAnchor="middle" className="text-xs font-bold fill-slate-800">{vertexD}</text>
    </svg>
  );
};
