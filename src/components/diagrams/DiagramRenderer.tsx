import React from 'react';
import {
  TriangleDiagram,
  RightTriangleDiagram,
  CircleDiagram,
  ParallelogramDiagram,
} from './GeometrySVG';
import { StatsChartSVG } from './StatsChartSVG';
import { CoordinateGridSVG } from './CoordinateGridSVG';

interface DiagramRendererProps {
  svgId?: string;
  data?: Record<string, any>;
  className?: string;
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ svgId, data = {}, className = '' }) => {
  if (!svgId) return null;

  switch (svgId) {
    case 'TriangleDiagram':
      return <TriangleDiagram {...data} className={className} />;
    case 'RightTriangleDiagram':
      return <RightTriangleDiagram {...data} className={className} />;
    case 'CircleDiagram':
      return <CircleDiagram {...data} className={className} />;
    case 'ParallelogramDiagram':
      return <ParallelogramDiagram {...data} className={className} />;
    case 'StatsChartSVG':
      return <StatsChartSVG type={data.type ?? 'histogram'} bins={data.bins ?? []} {...data} className={className} />;
    case 'CoordinateGridSVG':
      return <CoordinateGridSVG {...data} className={className} />;
    default:
      return null;
  }
};
