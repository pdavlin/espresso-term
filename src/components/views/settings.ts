import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getMachineInfo, getDevices, getReaSettings } from '../../api/client.ts';
import { isMockGateway, isMockCoffee } from '../../api/mock.ts';
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

    fieldset {
      border: 1px solid var(--color-border);
      padding: 0.75rem 1rem;
      margin: var(--space-md) 0;
      transition: border-color 0.15s ease-out;
    }

    fieldset:hover,
    fieldset:focus-within {
      border-color: var(--color-accent);
    }

    fieldset legend {
      padding: 0 0.5em;
      color: var(--base_04, #7e7777);
      font-weight: bold;
      font-size: 0.75rem;
      text-transform: lowercase;
      transition: color 0.15s ease-out;
    }

    fieldset:hover legend,
    fieldset:focus-within legend {
      color: var(--color-accent);
    }

    .field {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-sm) 0;
      border-bottom: 1px solid var(--color-border);
      font-size: 14px;
    }

    .field:last-child {
      border-bottom: none;
    }

    .field-label {
      color: var(--color-text-secondary);
    }

    .field-value {
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
      border-radius: 0;
      color: var(--color-text);
      font-family: inherit;
      font-size: 14px;
      transition: border-color 0.15s ease-out;
    }

    input[type="text"]:focus {
      border-color: var(--color-accent);
    }

    button {
      padding: var(--space-xs) var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: 0;
      background: var(--color-surface);
      color: var(--color-text);
      font-family: inherit;
      font-size: 14px;
      cursor: pointer;
      transition: border-color 0.15s ease-out, color 0.15s ease-out;
    }

    button:active {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .toggle-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-sm) 0;
      border-bottom: 1px solid var(--color-border);
      font-size: 14px;
    }

    .toggle-row label {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      cursor: pointer;
    }
  `;

  @state() private machineInfo: MachineInfo | null = null;
  @state() private devices: DeviceInfo[] = [];
  @state() private reaSettings: ReaSettings | null = null;
  @state() private gatewayUrl = localStorage.getItem('gateway-url') ?? '';
  @state() private mockGateway = isMockGateway();
  @state() private mockCoffee = isMockCoffee();

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

  private toggleMockGateway() {
    const next = !this.mockGateway;
    if (next) {
      localStorage.setItem('mock-gateway', 'true');
    } else {
      localStorage.removeItem('mock-gateway');
    }
    window.location.reload();
  }

  private toggleMockCoffee() {
    const next = !this.mockCoffee;
    if (next) {
      localStorage.setItem('mock-coffee', 'true');
    } else {
      localStorage.removeItem('mock-coffee');
    }
    window.location.reload();
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

      <fieldset>
        <legend>gateway</legend>
        <div class="gateway-input">
          <input
            type="text"
            placeholder="http://tablet-ip:8080"
            .value=${this.gatewayUrl}
            @input=${(e: Event) => (this.gatewayUrl = (e.target as HTMLInputElement).value)}
          />
          <button @click=${this.saveGatewayUrl}>Save</button>
        </div>
      </fieldset>

      <fieldset>
        <legend>development</legend>
        <div class="toggle-row">
          <span class="field-label">Mock gateway</span>
          <label>
            <input
              type="checkbox"
              .checked=${this.mockGateway}
              @change=${this.toggleMockGateway}
            />
            Simulate machine data
          </label>
        </div>
        <div class="toggle-row">
          <span class="field-label">Mock coffee</span>
          <label>
            <input
              type="checkbox"
              .checked=${this.mockCoffee}
              @change=${this.toggleMockCoffee}
            />
            Simulate Airtable data
          </label>
        </div>
      </fieldset>

      ${this.machineInfo
        ? html`
            <fieldset>
              <legend>machine</legend>
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
            </fieldset>
          `
        : ''}

      ${this.devices.length > 0
        ? html`
            <fieldset>
              <legend>devices</legend>
              ${this.devices.map(
                (d) => html`
                  <div class="device">
                    <div class="device-name">${d.name}</div>
                    <div class="device-meta">${d.type} / ${d.state}</div>
                  </div>
                `
              )}
            </fieldset>
          `
        : ''}

      ${this.reaSettings
        ? html`
            <fieldset>
              <legend>gateway settings</legend>
              <div class="field">
                <span class="field-label">Mode</span>
                <span class="field-value">${this.reaSettings.gatewayMode}</span>
              </div>
              <div class="field">
                <span class="field-label">Log Level</span>
                <span class="field-value">${this.reaSettings.logLevel}</span>
              </div>
            </fieldset>
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
