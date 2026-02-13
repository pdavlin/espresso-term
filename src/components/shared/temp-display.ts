import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { formatTemp } from '../../utils/format.ts';

@customElement('temp-display')
export class TempDisplay extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .value {
      font-family: var(--font-mono);
      font-size: 28px;
      font-weight: 600;
      color: var(--color-text, #e8e8e8);
    }

    .label {
      font-size: 11px;
      color: var(--color-text-secondary, #999);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  `;

  @property({ type: Number }) value = 0;
  @property() label = '';

  render() {
    return html`
      <span class="value">${formatTemp(this.value)}</span>
      <span class="label">${this.label}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'temp-display': TempDisplay;
  }
}
