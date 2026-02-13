import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MachineController } from '../../state/machine.ts';
import { formatTemp } from '../../utils/format.ts';

@customElement('status-bar')
export class StatusBar extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--status-height, 32px);
      padding: 0 var(--space-md, 16px);
      background: var(--color-surface, #242424);
      border-bottom: 1px solid var(--color-border, #3a3a3a);
      font-size: 12px;
      color: var(--color-text-secondary, #999);
    }

    .state {
      text-transform: capitalize;
      font-weight: 600;
    }

    .state[data-brewing] {
      color: var(--color-accent, #4a9eff);
    }

    .temps {
      display: flex;
      gap: var(--space-md, 16px);
      font-family: var(--font-mono);
    }

    .disconnected {
      color: var(--color-warning, #ff9800);
    }
  `;

  private machine = new MachineController(this);

  render() {
    if (!this.machine.isConnected) {
      return html`<span class="disconnected">Connecting...</span>`;
    }

    const snap = this.machine.snapshot!;

    return html`
      <span class="state" ?data-brewing=${this.machine.isBrewing}>
        ${snap.state.state}
      </span>
      <span class="temps">
        <span>Group ${formatTemp(snap.groupTemperature)}</span>
        <span>Steam ${formatTemp(snap.steamTemperature)}</span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'status-bar': StatusBar;
  }
}
