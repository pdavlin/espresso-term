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
      background: var(--color-surface, #242424);
      border-top: 1px solid var(--color-border, #3a3a3a);
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
      color: var(--color-text-secondary, #999);
      font-size: 10px;
      padding: 4px 8px;
      border-radius: var(--radius-sm, 4px);
      transition: color 0.15s;
    }

    a[data-active] {
      color: var(--color-accent, #4a9eff);
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
