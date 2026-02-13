import { LitElement, html, css, unsafeCSS, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { MachineController } from '../../state/machine.ts';
import {
  getWorkflow,
  updateWorkflow,
  listProfiles,
  uploadProfile,
  setMachineState,
} from '../../api/client.ts';
import { formatPressure, formatFlow, formatWeight, formatDuration } from '../../utils/format.ts';
import type { Profile, ProfileRecord } from '../../api/types.ts';
import uPlot from 'uplot';
import uPlotCSS from 'uplot/dist/uPlot.min.css?inline';

type BrewStep = 'dose' | 'profile' | 'shot';

@customElement('brew-view')
export class BrewView extends LitElement {
  static styles = css`
    ${unsafeCSS(uPlotCSS)}

    :host {
      display: block;
    }

    .step-content {
      padding: var(--space-md);
      max-width: 480px;
      margin: 0 auto;
      width: 100%;
    }

    /* Dose step */

    .dose-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-lg);
      padding-top: var(--space-xl);
    }

    .dose-label {
      font-size: 14px;
      color: var(--color-text-secondary);
    }

    .dose-stepper {
      display: flex;
      align-items: center;
      gap: var(--space-md);
    }

    .dose-stepper button {
      width: 48px;
      height: 48px;
      border: 1px solid var(--color-text);
      border-radius: 0;
      background: transparent;
      color: var(--color-text);
      font-family: inherit;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    .dose-stepper button:active {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .dose-value {
      font-size: 48px;
      min-width: 120px;
      text-align: center;
    }

    .dose-unit {
      font-size: 20px;
      color: var(--color-text-secondary);
    }

    .profile-label {
      font-size: 14px;
      color: var(--color-text-secondary);
    }

    /* Profile step */

    .profile-card {
      border: 1px solid var(--color-border);
      padding: 0.75rem 1rem;
      width: 100%;
      transition: border-color 0.15s ease-out;
    }

    .profile-card legend {
      padding: 0 0.5em;
      color: var(--base_04, #7e7777);
      font-weight: bold;
      font-size: 0.75rem;
      text-transform: lowercase;
      transition: color 0.15s ease-out;
    }

    .profile-card-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: var(--space-xs);
    }

    .profile-card-meta {
      font-size: 13px;
      color: var(--color-text-secondary);
      display: flex;
      gap: var(--space-md);
    }

    .profile-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      width: 100%;
      margin-top: var(--space-md);
    }

    .profile-list-item {
      padding: var(--space-sm) var(--space-md);
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: 0;
      cursor: pointer;
      font-size: 14px;
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    .profile-list-item:active {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .profile-list-item[data-selected] {
      border-color: var(--color-accent);
    }

    /* Shot step - fixed overlay that fills between status bar and nav */

    .shot-layout {
      position: fixed;
      top: var(--status-height, 32px);
      left: 0;
      right: 0;
      bottom: calc(var(--nav-height, 56px) + env(safe-area-inset-bottom));
      display: flex;
      flex-direction: column;
      background: var(--color-bg);
      z-index: 10;
    }

    .chart-area {
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }

    .shot-controls {
      flex-shrink: 0;
      padding: var(--space-sm) var(--space-md);
    }

    .readings {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-sm);
      text-align: center;
      margin: var(--space-md) 0;
    }

    .reading-value {
      font-size: 24px;
    }

    .reading-label {
      font-size: 11px;
      color: var(--color-text-secondary);
      margin-top: 2px;
    }

    .shot-timer {
      text-align: center;
      font-size: 16px;
      color: var(--color-text-secondary);
      margin-bottom: var(--space-sm);
    }

    /* Summary overlay */

    .summary {
      border: 1px solid var(--color-border);
      padding: 0.75rem 1rem;
      margin-top: var(--space-md);
      text-align: center;
      transition: border-color 0.15s ease-out;
    }

    .summary legend {
      padding: 0 0.5em;
      color: var(--base_04, #7e7777);
      font-weight: bold;
      font-size: 0.75rem;
      text-transform: lowercase;
      transition: color 0.15s ease-out;
    }

    .summary-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-md);
      margin-bottom: var(--space-lg);
    }

    .summary-stat-value {
      font-size: 20px;
    }

    .summary-stat-label {
      font-size: 11px;
      color: var(--color-text-secondary);
      margin-top: 2px;
    }

    /* Shared */

    .actions {
      display: flex;
      gap: var(--space-sm);
      justify-content: center;
      margin-top: var(--space-lg);
      width: 100%;
    }

    .btn {
      min-height: 44px;
      padding: var(--space-sm) var(--space-lg);
      border: 1px solid var(--color-text);
      border-radius: 0;
      background: transparent;
      color: var(--color-text);
      font-family: inherit;
      font-size: 16px;
      cursor: pointer;
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    .btn:active {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .btn-primary {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .btn-primary:active {
      border-color: var(--color-accent-dim);
      color: var(--color-accent-dim);
    }

    .btn-danger {
      border-color: var(--color-error);
      color: var(--color-error);
    }

    .btn-full {
      width: 100%;
    }

    .loading {
      text-align: center;
      padding: var(--space-xl);
      color: var(--color-text-secondary);
    }
  `;

  private machine = new MachineController(this);

  @state() private step: BrewStep = 'dose';
  @state() private shotComplete = false;
  @state() private doseIn = 18;
  @state() private selectedProfile: Profile | null = null;
  @state() private profiles: ProfileRecord[] = [];
  @state() private showProfileList = false;

  private plot: uPlot | null = null;
  private chartContainer: HTMLDivElement | null = null;
  private ro: ResizeObserver | null = null;
  private chartWidth = 0;
  private chartHeight = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.loadDefaults();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.teardownChart();
  }

  private async loadDefaults() {
    try {
      const workflow = await getWorkflow();
      this.doseIn = workflow.doseData.doseIn;
      this.selectedProfile = workflow.profile;
    } catch {
      // Gateway not available
    }
  }

  private adjustDose(delta: number) {
    this.doseIn = Math.max(0, +(this.doseIn + delta).toFixed(1));
  }

  private async loadProfiles() {
    try {
      this.profiles = await listProfiles();
    } catch {
      // Gateway not available
    }
  }

  private async selectProfile(record: ProfileRecord) {
    try {
      await uploadProfile(record.profile);
      this.selectedProfile = record.profile;
      this.showProfileList = false;
    } catch {
      // Upload failed
    }
  }

  private async startShot() {
    try {
      await updateWorkflow({ doseData: { doseIn: this.doseIn, doseOut: this.doseIn * 2 } });
    } catch {
      // Non-critical
    }
    this.machine.startRecording();
    this.shotComplete = false;
    this.step = 'shot';
    try {
      await setMachineState('espresso');
    } catch {
      // Handle offline
    }
  }

  private async stopShot() {
    try {
      await setMachineState('idle');
    } catch {
      // Handle offline
    }
  }

  private resetToStart() {
    this.teardownChart();
    this.machine.stopRecording();
    this.shotComplete = false;
    this.step = 'dose';
  }

  updated(): void {
    if (
      this.step === 'shot' &&
      !this.shotComplete &&
      this.machine.isRecording &&
      this.machine.recordedMeasurements.length > 0 &&
      this.machine.state !== 'espresso'
    ) {
      this.shotComplete = true;
    }

    if (this.step === 'shot') {
      this.ensureChart();
    } else if (this.plot) {
      this.teardownChart();
    }
  }

  // --- Chart management (no shadow DOM boundary, plain div) ---

  private ensureChart(): void {
    if (!this.ro) {
      this.chartContainer = this.renderRoot.querySelector('.chart-area') as HTMLDivElement;
      if (!this.chartContainer) return;
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
            this.createChart();
          }
        }
      });
      this.ro.observe(this.chartContainer);
    }

    if (this.plot) {
      const data = this.buildChartData();
      if (data[0].length > 0) {
        this.plot.setData(data);
      }
    } else if (this.chartWidth > 0 && this.chartHeight > 0) {
      this.createChart();
    }
  }

  private createChart(): void {
    if (!this.chartContainer || this.chartWidth === 0 || this.chartHeight === 0) return;
    this.plot?.destroy();
    this.plot = null;
    this.chartContainer.innerHTML = '';
    const data = this.buildChartData();
    if (data[0].length === 0) return;
    this.plot = new uPlot(this.buildChartOpts(), data, this.chartContainer);
  }

  private teardownChart(): void {
    this.ro?.disconnect();
    this.ro = null;
    this.plot?.destroy();
    this.plot = null;
    this.chartContainer = null;
    this.chartWidth = 0;
    this.chartHeight = 0;
  }

  private buildChartData(): uPlot.AlignedData {
    const measurements = this.machine.recordedMeasurements;
    const time: number[] = [];
    const pressure: number[] = [];
    const flow: number[] = [];
    const weight: number[] = [];
    const temp: number[] = [];

    for (const m of measurements) {
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

  private buildChartOpts(): uPlot.Options {
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

  // --- Computed getters ---

  private get shotDuration(): number {
    const m = this.machine.recordedMeasurements;
    if (m.length < 2) return 0;
    const t0 = new Date(m[0].machine.timestamp).getTime();
    const t1 = new Date(m[m.length - 1].machine.timestamp).getTime();
    return (t1 - t0) / 1000;
  }

  private get finalWeight(): number {
    const m = this.machine.recordedMeasurements;
    if (m.length === 0) return 0;
    return m[m.length - 1].scale?.weight ?? 0;
  }

  private get ratio(): string {
    if (this.doseIn <= 0 || this.finalWeight <= 0) return '-';
    return `1:${(this.finalWeight / this.doseIn).toFixed(1)}`;
  }

  // --- Render methods ---

  private renderDose() {
    return html`
      <div class="step-content">
        <div class="dose-section">
          <span class="dose-label">Dose</span>
          <div class="dose-stepper">
            <button @click=${() => this.adjustDose(-0.1)}>-</button>
            <span class="dose-value">
              ${this.doseIn.toFixed(1)}<span class="dose-unit">g</span>
            </span>
            <button @click=${() => this.adjustDose(0.1)}>+</button>
          </div>
          ${this.selectedProfile
            ? html`<span class="profile-label">${this.selectedProfile.title}</span>`
            : nothing}
          <div class="actions">
            <button class="btn btn-primary btn-full" @click=${() => { this.step = 'profile'; }}>
              Next
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private toggleProfileList() {
    if (!this.showProfileList && this.profiles.length === 0) {
      this.loadProfiles();
    }
    this.showProfileList = !this.showProfileList;
  }

  private renderProfile() {
    return html`
      <div class="step-content">
        ${this.selectedProfile
          ? html`
              <fieldset class="profile-card">
                <legend>profile</legend>
                <div class="profile-card-title">${this.selectedProfile.title}</div>
                <div class="profile-card-meta">
                  <span>${this.selectedProfile.author}</span>
                  <span>${this.selectedProfile.beverage_type}</span>
                  <span>${this.selectedProfile.steps.length} steps</span>
                </div>
              </fieldset>
            `
          : html`<div class="loading">No profile selected</div>`}

        <div class="actions">
          <button class="btn" @click=${() => this.toggleProfileList()}>
            ${this.showProfileList ? 'Cancel' : 'Change'}
          </button>
          <button class="btn btn-primary" @click=${() => this.startShot()}>
            Start
          </button>
        </div>

        ${this.showProfileList
          ? html`
              <div class="profile-list">
                ${this.profiles.map(
                  (rec) => html`
                    <div
                      class="profile-list-item"
                      ?data-selected=${this.selectedProfile?.title === rec.profile.title}
                      @click=${() => this.selectProfile(rec)}
                    >
                      ${rec.profile.title}
                    </div>
                  `
                )}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private renderShot() {
    const snap = this.machine.snapshot;

    return html`
      <div class="shot-layout">
        <div class="chart-area"></div>
        <div class="shot-controls">
          <div class="shot-timer">${formatDuration(this.shotDuration)}</div>

          <div class="readings">
            <div>
              <div class="reading-value">${snap ? formatPressure(snap.pressure) : '-'}</div>
              <div class="reading-label">Pressure</div>
            </div>
            <div>
              <div class="reading-value">${snap ? formatFlow(snap.flow) : '-'}</div>
              <div class="reading-label">Flow</div>
            </div>
            <div>
              <div class="reading-value">${formatWeight(this.machine.scale?.weight ?? 0)}</div>
              <div class="reading-label">Weight</div>
            </div>
          </div>

          ${this.shotComplete
            ? this.renderSummary()
            : html`
                <div class="actions">
                  <button class="btn btn-danger btn-full" @click=${() => this.stopShot()}>
                    Stop
                  </button>
                </div>
              `}
        </div>
      </div>
    `;
  }

  private renderSummary() {
    return html`
      <fieldset class="summary">
        <legend>shot complete</legend>
        <div class="summary-stats">
          <div>
            <div class="summary-stat-value">${formatWeight(this.finalWeight)}</div>
            <div class="summary-stat-label">Weight</div>
          </div>
          <div>
            <div class="summary-stat-value">${formatDuration(this.shotDuration)}</div>
            <div class="summary-stat-label">Duration</div>
          </div>
          <div>
            <div class="summary-stat-value">${this.ratio}</div>
            <div class="summary-stat-label">Ratio</div>
          </div>
        </div>
        <button class="btn btn-primary btn-full" @click=${() => this.resetToStart()}>
          New Shot
        </button>
      </fieldset>
    `;
  }

  render() {
    switch (this.step) {
      case 'dose':
        return this.renderDose();
      case 'profile':
        return this.renderProfile();
      case 'shot':
        return this.renderShot();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'brew-view': BrewView;
  }
}
