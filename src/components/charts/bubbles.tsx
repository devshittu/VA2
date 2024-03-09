import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { useD3 } from "../../hooks/useD3";
import { useContainerSize } from "../../hooks/useContainerSize";

// Define the structure of your data items
// interface DataItem {
//   r: number;
//   group?: number; // Optional, add more properties as needed
// }
interface DataItem extends d3.SimulationNodeDatum {
  r: number;
  group?: number;
}

// Define props for the Blobs component
interface BlobsProps {
  data: DataItem[];
}

export const Blobs: React.FC<BlobsProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useContainerSize(containerRef);

  const ref = useD3(
    (svg) => {
      const canvas = svg.node() as HTMLCanvasElement; // Assuming useD3 hook adapts to work with canvas
      const context = canvas.getContext("2d");
      if (!context) return; // Contextual type guarding

      // const nodes = data.map(Object.create);
      const nodes = data.map(d => ({ ...d }));

      const simulation = d3
        .forceSimulation<DataItem>(nodes)
        .alphaTarget(0.3)
        .velocityDecay(0.1)
        .force("x", d3.forceX().strength(0.1))
        .force("y", d3.forceY().strength(0.1))
        .force(
          "collide",
          d3.forceCollide<DataItem>().radius((d: any) =>{
            console.log("Bubble Blobs: collide: ", typeof d , d)
            return d.r + 1}).iterations(3)
        )
        .force(
          "charge",
          d3.forceManyBody().strength((d, i) => (i ? 0 : (-width * 2) / 3))
        )
        .on("tick", ticked);

      function pointed(event: PointerEvent) {
        const [x, y] = d3.pointer(event);
        nodes[0].fx = x - width / 2;
        nodes[0].fy = y - height / 2;
      }

      function ticked() {
        if (!width || !height) return;
        context?.clearRect(0, 0, width, height);
        context?.save();
        context?.translate(width / 2, height / 2);
        for (const d of nodes) {
    if (typeof d.x === 'number' && typeof d.y === 'number') {
          context?.beginPath();
          context?.moveTo(d.x + d.r, d.y);
          context?.arc(d.x, d.y, d.r, 0, 2 * Math.PI);
          context?.fill();
    }
        }
        context?.restore();
      }

      d3.select(canvas)
        .on("touchmove", (event) => event.preventDefault())
        .on("pointermove", pointed);

      return simulation;
    },
    [data.length, width, height] // Dependency list for useEffect inside useD3
  );

  return (
    <div ref={containerRef} className="w-full aspect-square">
      <canvas ref={ref as any} width={width} height={height} />
    </div>
  );
};
