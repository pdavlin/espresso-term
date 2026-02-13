import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ShotSnapshot } from '../../api/types.ts';
import uPlot from 'uplot';

@customElement('shot-graph')
export class ShotGraph extends LitElement {
  static styles = css`
    :host {
      display: block;
      overflow: hidden;
    }
  `;

  @property({ type: Array }) measurements: ShotSnapshot[] = [];

  private plot: uPlot | null = null;
  private container: HTMLDivElement | null = null;
  private chartWidth = 0;
  private chartHeight = 0;
  private ro: ResizeObserver | null = null;

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
      height: this.chartHeight,
      cursor: { show: false },
      legend: { show: false },
      scales: {
        x: { time: false },
        y: { auto: true },
        y2: { auto: true },
      },
      axes: [
        { stroke: '#655d5d', grid: { stroke: '#292424' } },
        { stroke: '#655d5d', grid: { stroke: '#292424' }, size: 40 },
        { side: 1, stroke: '#655d5d', size: 40, grid: { show: false } },
      ],
      series: [
        {},
        { label: 'Pressure', stroke: '#5485b6', width: 2, scale: 'y' },
        { label: 'Flow', stroke: '#4b8b8b', width: 2, scale: 'y' },
        { label: 'Weight', stroke: '#b45a3c', width: 2, scale: 'y2' },
        { label: 'Temp', stroke: '#ca4949', width: 1, scale: 'y2', dash: [4, 4] },
      ],
    };
  }

  protected firstUpdated(): void {
    this.container = this.renderRoot.querySelector('.chart') as HTMLDivElement;
    this.ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const w = Math.floor(width);
      const h = Math.floor(height);
      if (w > 0 && h > 0 && (w !== this.chartWidth || h !== this.chartHeight)) {
        this.chartWidth = w;
        this.chartHeight = h;
        if (this.plot) {
          this.plot.setSize({ width: w, height: h });
        } else {
          this.rebuildChart();
        }
      }
    });
    this.ro.observe(this);
  }

  protected updated(changed: Map<PropertyKey, unknown>): void {
    if (changed.has('measurements')) {
      const data = this.buildData();
      if (data[0].length === 0) return;
      if (this.plot) {
        this.plot.setData(data);
      } else {
        this.rebuildChart();
      }
    }
  }

  private rebuildChart(): void {
    if (!this.container || this.chartWidth === 0 || this.chartHeight === 0) return;
    this.plot?.destroy();
    this.plot = null;
    this.container.innerHTML = '';
    const data = this.buildData();
    if (data[0].length === 0) return;
    this.plot = new uPlot(this.buildOpts(), data, this.container);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.ro?.disconnect();
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
