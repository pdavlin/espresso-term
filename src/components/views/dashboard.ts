import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MachineController } from '../../state/machine.ts';
import { setMachineState } from '../../api/client.ts';
import { formatPressure, formatFlow, formatWeight } from '../../utils/format.ts';
import type { MachineState } from '../../api/types.ts';
import '../shared/temp-display.ts';

@customElement('dashboard-view')
export class DashboardView extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--space-md);
    }

    .temps {
      display: flex;
      justify-content: center;
      gap: var(--space-xl);
      margin-bottom: var(--space-lg);
    }

    .readings {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-sm);
      text-align: center;
      font-family: var(--font-mono);
      font-size: 14px;
      margin-bottom: var(--space-lg);
      color: var(--color-text-secondary);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      justify-content: center;
    }

    button {
      padding: var(--space-sm) var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background: var(--color-surface);
      color: var(--color-text);
      font-size: 14px;
      cursor: pointer;
    }

    button:active {
      background: var(--color-surface-alt);
    }

    button[data-primary] {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: #fff;
    }

    .no-connection {
      text-align: center;
      padding: var(--space-xl);
      color: var(--color-text-secondary);
    }
  `;

  private machine = new MachineController(this);

  private async changeState(state: MachineState) {
    await setMachineState(state);
  }

  render() {
    if (!this.machine.isConnected) {
      return html`<div class="no-connection">Waiting for machine...</div>`;
    }

    const snap = this.machine.snapshot!;

    return html`
      <div class="temps">
        <temp-display .value=${snap.groupTemperature} label="Group"></temp-display>
        <temp-display .value=${snap.steamTemperature} label="Steam"></temp-display>
        <temp-display .value=${snap.mixTemperature} label="Mix"></temp-display>
      </div>

      <div class="readings">
        <span>${formatPressure(snap.pressure)}</span>
        <span>${formatFlow(snap.flow)}</span>
        <span>${formatWeight(this.machine.scale?.weight ?? 0)}</span>
      </div>

      <div class="actions">
        <button data-primary @click=${() => this.changeState('espresso')}>Espresso</button>
        <button @click=${() => this.changeState('steam')}>Steam</button>
        <button @click=${() => this.changeState('hotWater')}>Hot Water</button>
        <button @click=${() => this.changeState('flush')}>Flush</button>
        <button @click=${() => this.changeState('idle')}>Stop</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dashboard-view': DashboardView;
  }
}
