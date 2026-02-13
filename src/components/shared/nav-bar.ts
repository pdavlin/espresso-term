import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Route = 'brew' | 'history' | 'profiles' | 'settings';

interface NavItem {
  route: Route;
  label: string;
}

const items: NavItem[] = [
  { route: 'brew', label: 'Brew' },
  { route: 'history', label: 'History' },
  { route: 'profiles', label: 'Profiles' },
  { route: 'settings', label: 'Settings' },
];

@customElement('nav-bar')
export class NavBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--nav-height, 56px);
      background: var(--color-surface, #292424);
      border-top: 1px solid var(--color-border, #655d5d);
      padding-bottom: env(safe-area-inset-bottom);
      z-index: 100;
    }

    nav {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-around;
      max-width: 600px;
      margin: 0 auto;
    }

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      color: var(--color-text-secondary, #8a8585);
      font-size: 10px;
      padding: 4px 8px;
      border-bottom: 2px solid transparent;
      transition: color 0.15s ease-out, border-color 0.15s ease-out;
    }

    a[data-active] {
      color: var(--color-accent, #4b8b8b);
      border-color: var(--color-accent, #4b8b8b);
    }
  `;

  @property() active: Route = 'brew';

  render() {
    return html`
      <nav>
        ${items.map(
          (item) => html`
            <a
              href="#/${item.route}"
              ?data-active=${this.active === item.route}
            >
              ${item.label}
            </a>
          `
        )}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nav-bar': NavBar;
  }
}
