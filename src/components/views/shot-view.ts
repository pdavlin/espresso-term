import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { MachineController } from '../../state/machine.ts';
import { getLatestShot } from '../../api/client.ts';
import { formatWeight, formatDuration } from '../../utils/format.ts';
import type { ShotRecord, ShotSnapshot } from '../../api/types.ts';
import '../shared/shot-graph.ts';

@customElement('shot-view')
export class ShotView extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--space-md);
    }

    h2 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: var(--space-md);
    }

    .summary {
      display: flex;
      gap: var(--space-lg);
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--color-text-secondary);
      margin-bottom: var(--space-md);
    }

    .empty {
      text-align: center;
      padding: var(--space-xl);
      color: var(--color-text-secondary);
    }
  `;

  private machine = new MachineController(this);
  @state() private lastShot: ShotRecord | null = null;
  @state() private liveMeasurements: ShotSnapshot[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this.loadLatestShot();
  }

  private async loadLatestShot() {
    try {
      this.lastShot = await getLatestShot();
    } catch {
      // No shots yet
    }
  }

  private get measurements(): ShotSnapshot[] {
    if (this.machine.isBrewing && this.liveMeasurements.length > 0) {
      return this.liveMeasurements;
    }
    return this.lastShot?.measurements ?? [];
  }

  private get shotDuration(): number {
    const m = this.measurements;
    if (m.length < 2) return 0;
    const start = new Date(m[0].machine.timestamp).getTime();
    const end = new Date(m[m.length - 1].machine.timestamp).getTime();
    return (end - start) / 1000;
  }

  private get finalWeight(): number {
    const m = this.measurements;
    if (m.length === 0) return 0;
    return m[m.length - 1].scale?.weight ?? 0;
  }

  render() {
    const m = this.measurements;

    if (m.length === 0) {
      return html`<div class="empty">No shot data available</div>`;
    }

    return html`
      <h2>${this.machine.isBrewing ? 'Live Shot' : 'Last Shot'}</h2>
      <div class="summary">
        <span>${formatWeight(this.finalWeight)}</span>
        <span>${formatDuration(this.shotDuration)}</span>
      </div>
      <shot-graph .measurements=${m}></shot-graph>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shot-view': ShotView;
  }
}
