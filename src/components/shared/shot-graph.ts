import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ShotSnapshot } from '../../api/types.ts';
import uPlot from 'uplot';

@customElement('shot-graph')
export class ShotGraph extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .chart {
      width: 100%;
      overflow: hidden;
    }

    .chart :global(.u-wrap) {
      width: 100% !important;
    }
  `;

  @property({ type: Array }) measurements: ShotSnapshot[] = [];
  @state() private chartWidth = 300;

  private plot: uPlot | null = null;
  private container: HTMLDivElement | null = null;
  private resizeObserver: ResizeObserver | null = null;

  private buildData(): uPlot.AlignedData {
    const time: number[] = [];
    const pressure: number[] = [];
    const flow: number[] = [];
    const weight: number[] = [];
    const temp: number[] = [];

    for (const m of this.measurements) {
      const t = new Date(m.machine.timestamp).getTime() / 1000;
      time.push(t);
      pressure.push(m.machine.pressure);
      flow.push(m.machine.flow);
      weight.push(m.scale?.weight ?? 0);
      temp.push(m.machine.groupTemperature);
    }

    if (time.length > 0) {
      const t0 = time[0];
      for (let i = 0; i < time.length; i++) {
        time[i] -= t0;
      }
    }

    return [time, pressure, flow, weight, temp];
  }

  private buildOpts(): uPlot.Options {
    return {
      width: this.chartWidth,
      height: 200,
      cursor: { show: false },
      legend: { show: false },
      scales: {
        x: { time: false },
        y: { auto: true },
        y2: { auto: true },
      },
      axes: [
        { stroke: '#666', grid: { stroke: '#333' } },
        { stroke: '#666', grid: { stroke: '#333' }, size: 40 },
        { side: 1, stroke: '#666', size: 40, grid: { show: false } },
      ],
      series: [
        {},
        { label: 'Pressure', stroke: '#4a9eff', width: 2, scale: 'y' },
        { label: 'Flow', stroke: '#4caf50', width: 2, scale: 'y' },
        { label: 'Weight', stroke: '#ff9800', width: 2, scale: 'y2' },
        { label: 'Temp', stroke: '#f44336', width: 1, scale: 'y2', dash: [4, 4] },
      ],
    };
  }

  protected firstUpdated(): void {
    this.container = this.renderRoot.querySelector('.chart') as HTMLDivElement;
    this.resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width && width !== this.chartWidth) {
        this.chartWidth = width;
        this.rebuildChart();
      }
    });
    this.resizeObserver.observe(this.container);
    this.rebuildChart();
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('measurements')) {
      this.rebuildChart();
    }
  }

  private rebuildChart(): void {
    if (!this.container) return;
    this.plot?.destroy();
    const data = this.buildData();
    if (data[0].length === 0) return;
    this.plot = new uPlot(this.buildOpts(), data, this.container);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.plot?.destroy();
    this.plot = null;
  }

  render() {
    return html`<div class="chart"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shot-graph': ShotGraph;
  }
}
