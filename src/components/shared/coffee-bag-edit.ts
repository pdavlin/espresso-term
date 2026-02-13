import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  type CoffeeBag,
  type CoffeeBagUpdate,
  getRoasters,
  updateCoffeeBag,
} from '../../api/airtable.ts';

/**
 * Inline edit form for a CoffeeBag record.
 *
 * Dispatches:
 *  - `coffee-bag-saved` (detail: { bag: CoffeeBag }) on successful save
 *  - `coffee-bag-edit-cancel` on cancel
 *
 * Both events bubble and are composed so they cross shadow DOM boundaries.
 */
@customElement('coffee-bag-edit')
export class CoffeeBagEdit extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .edit-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      padding: var(--space-md) 0;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .field-label {
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .field-input {
      border: 1px solid var(--color-border);
      border-radius: 0;
      padding: var(--space-xs) var(--space-sm);
      font-size: 14px;
      font-family: inherit;
      background: var(--color-surface);
      color: var(--base_07);
      outline: none;
      -webkit-appearance: none;
      appearance: none;
    }

    .field-input:focus {
      border-color: var(--color-accent);
    }

    /* Date input color-scheme for dark backgrounds */
    input[type="date"] {
      color-scheme: dark;
    }

    /* Roaster picker */

    .roaster-display {
      border: 1px solid var(--color-border);
      border-radius: 0;
      padding: var(--space-xs) var(--space-sm);
      font-size: 14px;
      font-family: inherit;
      background: var(--color-surface);
      color: var(--base_07);
      cursor: pointer;
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: border-color 0.15s ease-out;
    }

    .roaster-display:active {
      border-color: var(--color-accent);
    }

    .roaster-chevron {
      font-size: 10px;
      color: var(--color-text-secondary);
    }

    .roaster-list {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--color-border);
      border-top: none;
      max-height: 200px;
      overflow-y: auto;
    }

    .roaster-option {
      padding: var(--space-xs) var(--space-sm);
      font-size: 14px;
      font-family: inherit;
      background: var(--color-surface);
      color: var(--base_07);
      border: none;
      border-bottom: 1px solid var(--color-border);
      cursor: pointer;
      text-align: left;
      transition: color 0.15s ease-out;
    }

    .roaster-option:last-child {
      border-bottom: none;
    }

    .roaster-option:active {
      color: var(--color-accent);
    }

    .roaster-option[data-selected] {
      color: var(--color-accent);
    }

    /* Actions */

    .actions {
      display: flex;
      gap: var(--space-sm);
      margin-top: var(--space-sm);
    }

    .btn {
      min-height: 44px;
      padding: var(--space-sm) var(--space-lg);
      border: 1px solid var(--base_07);
      border-radius: 0;
      background: transparent;
      color: var(--base_07);
      font-family: inherit;
      font-size: 16px;
      cursor: pointer;
      flex: 1;
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

    .btn:disabled {
      opacity: 0.4;
      cursor: default;
    }

    .error-msg {
      font-size: 12px;
      color: var(--color-error);
    }
  `;

  @property({ attribute: false }) bag!: CoffeeBag;

  @state() private name = '';
  @state() private roasterRecordId = '';
  @state() private country = '';
  @state() private processing = '';
  @state() private roastLevel = '';
  @state() private roastDate = '';

  @state() private roasters: Map<string, string> = new Map();
  @state() private showRoasterPicker = false;
  @state() private saving = false;
  @state() private errorMessage = '';

  willUpdate(changed: Map<string | number | symbol, unknown>): void {
    if (changed.has('bag') && this.bag) {
      this.name = this.bag.name;
      this.roasterRecordId = this.bag.roasterRecordId;
      this.country = this.bag.country;
      this.processing = this.bag.processing;
      this.roastLevel = this.bag.roastLevel;
      this.roastDate = this.bag.roastDate ?? '';
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.loadRoasters();
  }

  private async loadRoasters() {
    try {
      this.roasters = await getRoasters();
    } catch {
      // Roasters unavailable; the picker will be empty
    }
  }

  private get selectedRoasterName(): string {
    if (!this.roasterRecordId) return '';
    return this.roasters.get(this.roasterRecordId) ?? this.bag.roaster;
  }

  private toggleRoasterPicker() {
    this.showRoasterPicker = !this.showRoasterPicker;
  }

  private selectRoaster(id: string) {
    this.roasterRecordId = id;
    this.showRoasterPicker = false;
  }

  private async save() {
    this.saving = true;
    this.errorMessage = '';

    const update: CoffeeBagUpdate = {};

    if (this.name !== this.bag.name) update.name = this.name;
    if (this.roasterRecordId !== this.bag.roasterRecordId) update.roasterRecordId = this.roasterRecordId;
    if (this.country !== this.bag.country) update.country = this.country;
    if (this.processing !== this.bag.processing) update.processing = this.processing;
    if (this.roastLevel !== this.bag.roastLevel) update.roastLevel = this.roastLevel;

    const newRoastDate = this.roastDate || null;
    if (newRoastDate !== this.bag.roastDate) update.roastDate = newRoastDate;

    try {
      await updateCoffeeBag(this.bag.id, update);

      const updatedBag: CoffeeBag = {
        ...this.bag,
        name: this.name,
        roaster: this.roasters.get(this.roasterRecordId) ?? this.bag.roaster,
        roasterRecordId: this.roasterRecordId,
        country: this.country,
        processing: this.processing,
        roastLevel: this.roastLevel,
        roastDate: newRoastDate,
      };

      this.dispatchEvent(
        new CustomEvent('coffee-bag-saved', {
          detail: { bag: updatedBag },
          bubbles: true,
          composed: true,
        }),
      );
    } catch (err) {
      this.errorMessage = err instanceof Error ? err.message : 'Save failed';
    } finally {
      this.saving = false;
    }
  }

  private cancel() {
    this.dispatchEvent(
      new CustomEvent('coffee-bag-edit-cancel', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="edit-form">
        <div class="field">
          <label class="field-label">Roast date</label>
          <input
            class="field-input"
            type="date"
            .value=${this.roastDate}
            @input=${(e: InputEvent) => {
              this.roastDate = (e.target as HTMLInputElement).value;
            }}
          />
        </div>

        <div class="field">
          <label class="field-label">Name</label>
          <input
            class="field-input"
            type="text"
            .value=${this.name}
            @input=${(e: InputEvent) => {
              this.name = (e.target as HTMLInputElement).value;
            }}
          />
        </div>

        <div class="field">
          <label class="field-label">Roaster</label>
          <div class="roaster-display" @click=${() => this.toggleRoasterPicker()}>
            <span>${this.selectedRoasterName || 'Select roaster'}</span>
            <span class="roaster-chevron">${this.showRoasterPicker ? '\u25B2' : '\u25BC'}</span>
          </div>
          ${this.showRoasterPicker
            ? html`
                <div class="roaster-list">
                  ${[...this.roasters.entries()].map(
                    ([id, name]) => html`
                      <button
                        class="roaster-option"
                        ?data-selected=${id === this.roasterRecordId}
                        @click=${() => this.selectRoaster(id)}
                      >
                        ${name}
                      </button>
                    `,
                  )}
                </div>
              `
            : nothing}
        </div>

        <div class="field">
          <label class="field-label">Country</label>
          <input
            class="field-input"
            type="text"
            .value=${this.country}
            @input=${(e: InputEvent) => {
              this.country = (e.target as HTMLInputElement).value;
            }}
          />
        </div>

        <div class="field">
          <label class="field-label">Processing</label>
          <input
            class="field-input"
            type="text"
            .value=${this.processing}
            @input=${(e: InputEvent) => {
              this.processing = (e.target as HTMLInputElement).value;
            }}
          />
        </div>

        <div class="field">
          <label class="field-label">Roast level</label>
          <input
            class="field-input"
            type="text"
            .value=${this.roastLevel}
            @input=${(e: InputEvent) => {
              this.roastLevel = (e.target as HTMLInputElement).value;
            }}
          />
        </div>

        ${this.errorMessage
          ? html`<div class="error-msg">${this.errorMessage}</div>`
          : nothing}

        <div class="actions">
          <button class="btn" @click=${() => this.cancel()} ?disabled=${this.saving}>
            Cancel
          </button>
          <button class="btn btn-primary" @click=${() => this.save()} ?disabled=${this.saving}>
            ${this.saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'coffee-bag-edit': CoffeeBagEdit;
  }
}
