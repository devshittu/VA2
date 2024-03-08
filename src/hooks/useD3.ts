import React from 'react';
import * as d3 from 'd3';

// Simplify the renderChartFn's parameter type to work around the issue
type RenderChartFn = (selection: d3.Selection<any, unknown, null, undefined>) => { stop: () => void } | void;

export const useD3 = (renderChartFn: RenderChartFn, dependencies: React.DependencyList) => {
  const ref = React.useRef<SVGSVGElement | null>(null);
  const simulation = React.useRef<{ stop: () => void } | null>(null);

  React.useEffect(() => {
    if (ref.current) {
      // Use any to bypass the complex type mismatch
      const sim = renderChartFn(d3.select<any, unknown>(ref.current));
      if (sim) {
        simulation.current = sim;
      }

      return () => {
        simulation.current?.stop();
      };
    }
  }, dependencies);

  return ref;
};
