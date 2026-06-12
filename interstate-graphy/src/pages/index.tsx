import { onCleanup, onMount } from 'solid-js';
import * as d3 from 'd3';
import networkRaw from '../../../data/network.json?raw';

type NodeDatum = {
  id: number;
  name: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
};

type LinkDatum = {
  source: number | NodeDatum;
  target: number | NodeDatum;
};

type GraphData = {
  nodes: NodeDatum[];
  links: LinkDatum[];
};

const graphData: GraphData = JSON.parse(networkRaw);

export default function Home() {
  let svgRef: SVGSVGElement | undefined;

  onMount(() => {
    if (!svgRef) {
      return;
    }

    const width = svgRef.clientWidth || 960;
    const height = 620;

    const nodes: NodeDatum[] = graphData.nodes.map((node) => ({ ...node }));
    const links: LinkDatum[] = graphData.links.map((link) => ({ ...link }));

    const svg = d3
      .select(svgRef)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const g = svg.append('g');

    svg.call(
      d3
        .zoom()
        .scaleExtent([0.6, 2.8])
        .on('zoom', (event: { transform: { toString: () => string } }) => {
          g.attr('transform', event.transform.toString());
        })
    );

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: NodeDatum) => d.id)
          .distance(120)
      )
      .force('charge', d3.forceManyBody().strength(-450))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(34));

    const link = g
      .append('g')
      .attr('stroke', '#6b7280')
      .attr('stroke-opacity', 0.75)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', 2);

    const node = g
      .append('g')
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.6)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 18)
      .attr('fill', '#0f766e')
      .attr('cursor', 'grab');

    node.append('title').text((d: NodeDatum) => d.name);

    const labels = g
      .append('g')
      .attr('font-size', 11)
      .attr('font-weight', 700)
      .attr('fill', '#0f172a')
      .attr('pointer-events', 'none')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text((d: NodeDatum) => d.name)
      .attr('dy', -24)
      .attr('text-anchor', 'middle');

    const dragBehavior = d3
      .drag()
      .on('start', (event: { active: boolean }, d: NodeDatum) => {
        if (!event.active) {
          simulation.alphaTarget(0.2).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event: { x: number; y: number }, d: NodeDatum) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event: { active: boolean }, d: NodeDatum) => {
        if (!event.active) {
          simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      });

    node.call(dragBehavior);

    simulation.on('tick', () => {
      link
        .attr('x1', (d: LinkDatum) => (d.source as NodeDatum).x ?? 0)
        .attr('y1', (d: LinkDatum) => (d.source as NodeDatum).y ?? 0)
        .attr('x2', (d: LinkDatum) => (d.target as NodeDatum).x ?? 0)
        .attr('y2', (d: LinkDatum) => (d.target as NodeDatum).y ?? 0);

      node.attr('cx', (d: NodeDatum) => d.x ?? 0).attr('cy', (d: NodeDatum) => d.y ?? 0);

      labels.attr('x', (d: NodeDatum) => d.x ?? 0).attr('y', (d: NodeDatum) => d.y ?? 0);
    });

    onCleanup(() => {
      simulation.stop();
      svg.selectAll('*').remove();
    });
  });

  return (
    <section class="bg-slate-100 text-slate-800 p-6 md:p-10 min-h-[calc(100vh-48px)]">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight">
          Diagonally Cross Country Move Graph (ATL 2 PDX)
        </h1>
        <p class="mt-2 text-slate-600">
          Drag nodes and
          scroll to zoom.
        </p>

        <div class="mt-6 rounded-xl border border-slate-300 bg-white shadow-sm overflow-hidden">
          <svg ref={svgRef} class="w-full h-[620px] block" role="img" />
        </div>
      </div>
    </section>
  );
}
