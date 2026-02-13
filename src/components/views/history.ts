import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getShotIds, getShot } from '../../api/client.ts';
import { formatTimestamp, formatWeight, formatDuration } from '../../utils/format.ts';
import type { ShotRecord } from '../../api/types.ts';
import '../shared/shot-graph.ts';

@customElement('history-view')
export class HistoryView extends LitElement {
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

    .list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .shot-card {
      padding: var(--space-md);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      cursor: pointer;
    }

    .shot-card:active {
      background: var(--color-surface-alt);
    }

    .shot-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }

    .shot-title {
      font-weight: 600;
      font-size: 14px;
    }

    .shot-time {
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .shot-meta {
      font-size: 12px;
      color: var(--color-text-secondary);
      font-family: var(--font-mono);
    }

    .detail {
      margin-top: var(--space-md);
    }

    .empty {
      text-align: center;
      padding: var(--space-xl);
      color: var(--color-text-secondary);
    }
  `;

  @state() private shotIds: string[] = [];
  @state() private selectedShot: ShotRecord | null = null;
  @state() private loading = true;

  connectedCallback(): void {
    super.connectedCallback();
    this.loadShotIds();
  }

  private async loadShotIds() {
    this.loading = true;
    try {
      this.shotIds = await getShotIds();
    } catch {
      this.shotIds = [];
    }
    this.loading = false;
  }

  private async selectShot(id: string) {
    this.selectedShot = await getShot(id);
  }

  private shotDuration(record: ShotRecord): number {
    const m = record.measurements;
    if (m.length < 2) return 0;
    const start = new Date(m[0].machine.timestamp).getTime();
    const end = new Date(m[m.length - 1].machine.timestamp).getTime();
    return (end - start) / 1000;
  }

  private shotFinalWeight(record: ShotRecord): number {
    const m = record.measurements;
    if (m.length === 0) return 0;
    return m[m.length - 1].scale?.weight ?? 0;
  }

  render() {
    if (this.loading) {
      return html`<div class="empty">Loading history...</div>`;
    }

    if (this.selectedShot) {
      return html`
        <h2>${this.selectedShot.workflow.profile.title}</h2>
        <div class="shot-meta">
          ${formatTimestamp(this.selectedShot.timestamp)}
          ${formatWeight(this.shotFinalWeight(this.selectedShot))}
          ${formatDuration(this.shotDuration(this.selectedShot))}
        </div>
        <div class="detail">
          <shot-graph .measurements=${this.selectedShot.measurements}></shot-graph>
        </div>
        <button @click=${() => (this.selectedShot = null)}>Back</button>
      `;
    }

    if (this.shotIds.length === 0) {
      return html`<div class="empty">No shot history</div>`;
    }

    return html`
      <h2>History</h2>
      <div class="list">
        ${this.shotIds.map(
          (id) => html`
            <div class="shot-card" @click=${() => this.selectShot(id)}>
              <span class="shot-title">${id}</span>
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'history-view': HistoryView;
  }
}
