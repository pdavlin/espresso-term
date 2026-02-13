import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getWorkflow, updateWorkflow } from '../../api/client.ts';
import type { Workflow } from '../../api/types.ts';

@customElement('workflow-view')
export class WorkflowView extends LitElement {
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

    .fields {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .field {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-sm) 0;
      border-bottom: 1px solid var(--color-border);
    }

    .field-label {
      font-size: 14px;
      color: var(--color-text-secondary);
    }

    .field-value {
      font-family: var(--font-mono);
      font-size: 14px;
    }

    input[type="number"] {
      width: 80px;
      padding: var(--space-xs) var(--space-sm);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      color: var(--color-text);
      font-family: var(--font-mono);
      font-size: 14px;
      text-align: right;
    }

    .loading {
      text-align: center;
      padding: var(--space-xl);
      color: var(--color-text-secondary);
    }
  `;

  @state() private workflow: Workflow | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.loadWorkflow();
  }

  private async loadWorkflow() {
    try {
      this.workflow = await getWorkflow();
    } catch {
      // Gateway not available
    }
  }

  private async updateDose(field: 'doseIn' | 'doseOut', value: number) {
    await updateWorkflow({ doseData: { ...this.workflow!.doseData, [field]: value } });
    this.loadWorkflow();
  }

  render() {
    if (!this.workflow) {
      return html`<div class="loading">Loading workflow...</div>`;
    }

    const { doseData, profile, grinderData, coffeeData } = this.workflow;

    return html`
      <h2>${profile.title}</h2>
      <div class="fields">
        <div class="field">
          <span class="field-label">Dose In</span>
          <input
            type="number"
            step="0.1"
            .value=${String(doseData.doseIn)}
            @change=${(e: Event) =>
              this.updateDose('doseIn', Number((e.target as HTMLInputElement).value))}
          />
        </div>
        <div class="field">
          <span class="field-label">Dose Out</span>
          <input
            type="number"
            step="0.1"
            .value=${String(doseData.doseOut)}
            @change=${(e: Event) =>
              this.updateDose('doseOut', Number((e.target as HTMLInputElement).value))}
          />
        </div>
        <div class="field">
          <span class="field-label">Ratio</span>
          <span class="field-value">
            1:${doseData.doseIn > 0 ? (doseData.doseOut / doseData.doseIn).toFixed(1) : '0'}
          </span>
        </div>
        ${coffeeData
          ? html`
              <div class="field">
                <span class="field-label">Coffee</span>
                <span class="field-value">${coffeeData.name}</span>
              </div>
            `
          : ''}
        ${grinderData
          ? html`
              <div class="field">
                <span class="field-label">Grind</span>
                <span class="field-value">${grinderData.setting}</span>
              </div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workflow-view': WorkflowView;
  }
}
