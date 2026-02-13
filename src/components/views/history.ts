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
      background: transparent;
      border: 1px solid var(--color-border);
      border-radius: 0;
      cursor: pointer;
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    .shot-card:active {
      border-color: var(--color-accent);
      color: var(--color-accent);
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

    .shot-detail {
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

    .shot-detail-header {
      flex-shrink: 0;
      padding: var(--space-md);
    }

    .shot-meta {
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .detail {
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }

    .detail shot-graph {
      height: 100%;
    }

    .shot-detail-footer {
      flex-shrink: 0;
      padding: var(--space-sm) var(--space-md);
    }

    .back-btn {
      width: 100%;
      padding: var(--space-sm) var(--space-md);
      border: 1px solid var(--color-text);
      border-radius: 0;
      background: transparent;
      color: var(--color-text);
      font-family: inherit;
      font-size: 14px;
      cursor: pointer;
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    .back-btn:active {
      border-color: var(--color-accent);
      color: var(--color-accent);
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
        <div class="shot-detail">
          <div class="shot-detail-header">
            <h2>${this.selectedShot.workflow.profile.title}</h2>
            <div class="shot-meta">
              ${formatTimestamp(this.selectedShot.timestamp)}
              ${formatWeight(this.shotFinalWeight(this.selectedShot))}
              ${formatDuration(this.shotDuration(this.selectedShot))}
            </div>
          </div>
          <div class="detail">
            <shot-graph .measurements=${this.selectedShot.measurements}></shot-graph>
          </div>
          <div class="shot-detail-footer">
            <button class="back-btn" @click=${() => (this.selectedShot = null)}>Back</button>
          </div>
        </div>
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
