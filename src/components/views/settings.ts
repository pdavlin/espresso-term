import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getMachineInfo, getDevices, getReaSettings } from '../../api/client.ts';
import type { MachineInfo, DeviceInfo, ReaSettings } from '../../api/types.ts';

@customElement('settings-view')
export class SettingsView extends LitElement {
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

    h3 {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-secondary);
      margin-top: var(--space-lg);
      margin-bottom: var(--space-sm);
    }

    .field {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-sm) 0;
      border-bottom: 1px solid var(--color-border);
      font-size: 14px;
    }

    .field-label {
      color: var(--color-text-secondary);
    }

    .field-value {
      font-family: var(--font-mono);
    }

    .device {
      padding: var(--space-sm) 0;
      border-bottom: 1px solid var(--color-border);
    }

    .device-name {
      font-size: 14px;
    }

    .device-meta {
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .gateway-input {
      margin-top: var(--space-md);
      display: flex;
      gap: var(--space-sm);
    }

    input[type="text"] {
      flex: 1;
      padding: var(--space-xs) var(--space-sm);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      color: var(--color-text);
      font-size: 14px;
    }

    button {
      padding: var(--space-xs) var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      background: var(--color-surface);
      color: var(--color-text);
      font-size: 14px;
      cursor: pointer;
    }
  `;

  @state() private machineInfo: MachineInfo | null = null;
  @state() private devices: DeviceInfo[] = [];
  @state() private reaSettings: ReaSettings | null = null;
  @state() private gatewayUrl = localStorage.getItem('gateway-url') ?? '';

  connectedCallback(): void {
    super.connectedCallback();
    this.loadData();
  }

  private async loadData() {
    const results = await Promise.allSettled([
      getMachineInfo(),
      getDevices(),
      getReaSettings(),
    ]);

    if (results[0].status === 'fulfilled') this.machineInfo = results[0].value;
    if (results[1].status === 'fulfilled') this.devices = results[1].value;
    if (results[2].status === 'fulfilled') this.reaSettings = results[2].value;
  }

  private saveGatewayUrl() {
    if (this.gatewayUrl) {
      localStorage.setItem('gateway-url', this.gatewayUrl);
    } else {
      localStorage.removeItem('gateway-url');
    }
    window.location.reload();
  }

  render() {
    return html`
      <h2>Settings</h2>

      <h3>Gateway</h3>
      <div class="gateway-input">
        <input
          type="text"
          placeholder="http://tablet-ip:8080"
          .value=${this.gatewayUrl}
          @input=${(e: Event) => (this.gatewayUrl = (e.target as HTMLInputElement).value)}
        />
        <button @click=${this.saveGatewayUrl}>Save</button>
      </div>

      ${this.machineInfo
        ? html`
            <h3>Machine</h3>
            <div class="field">
              <span class="field-label">Model</span>
              <span class="field-value">${this.machineInfo.model}</span>
            </div>
            <div class="field">
              <span class="field-label">Serial</span>
              <span class="field-value">${this.machineInfo.serialNumber}</span>
            </div>
            <div class="field">
              <span class="field-label">Firmware</span>
              <span class="field-value">${this.machineInfo.version}</span>
            </div>
            <div class="field">
              <span class="field-label">GHC</span>
              <span class="field-value">${this.machineInfo.GHC ? 'Yes' : 'No'}</span>
            </div>
          `
        : ''}

      ${this.devices.length > 0
        ? html`
            <h3>Devices</h3>
            ${this.devices.map(
              (d) => html`
                <div class="device">
                  <div class="device-name">${d.name}</div>
                  <div class="device-meta">${d.type} / ${d.state}</div>
                </div>
              `
            )}
          `
        : ''}

      ${this.reaSettings
        ? html`
            <h3>Gateway Settings</h3>
            <div class="field">
              <span class="field-label">Mode</span>
              <span class="field-value">${this.reaSettings.gatewayMode}</span>
            </div>
            <div class="field">
              <span class="field-label">Log Level</span>
              <span class="field-value">${this.reaSettings.logLevel}</span>
            </div>
          `
        : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-view': SettingsView;
  }
}
