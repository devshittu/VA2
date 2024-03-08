
import React from 'react';
import * as d3 from 'd3';
import { useD3 } from '../../hooks/useD3';

interface DataItem extends d3.SimulationNodeDatum  {
  year: string | number;
  sales: number;
};

interface BarChartProps  {
  data: DataItem[];
};

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const ref = useD3(
    (svg) => {
      svg.selectAll('*').remove(); // Clear SVG content
      const height = 500;
      const width = 500;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      const x = d3.scaleBand()
        .domain(data.map(d => d.year.toString()))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.sales) || 0])
        .range([height - margin.bottom, margin.top]);

      // Axis
      const xAxis = d3.axisBottom(x).tickSizeOuter(0);
      const yAxis = d3.axisLeft(y).ticks(null, 's');

      // Applying axes
      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(xAxis);

      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis);

      // Plot
      svg.append('g')
        .attr('fill', 'steelblue')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', d => x(d.year.toString())!)
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.sales))
        .attr('height', d => y(0) - y(d.sales));
    },
    [data.length]
  );

  return (
    <svg
      ref={ref}
      style={{ height: 500, width: '100%', marginRight: '0px', marginLeft: '0px' }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};
