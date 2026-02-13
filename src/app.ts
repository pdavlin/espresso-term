import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './components/shared/status-bar.ts';
import './components/shared/nav-bar.ts';
import './components/views/brew-view.ts';
import './components/views/profiles.ts';
import './components/views/history.ts';
import './components/views/settings.ts';

type Route = 'brew' | 'history' | 'profiles' | 'settings';

const ROUTES: Route[] = ['brew', 'history', 'profiles', 'settings'];

function parseRoute(): Route {
  const hash = window.location.hash.replace('#/', '');
  return ROUTES.includes(hash as Route) ? (hash as Route) : 'brew';
}

@customElement('rea-app')
export class ReaApp extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      height: 100dvh;
    }

    main {
      flex: 1;
      overflow-y: auto;
      padding-bottom: calc(var(--nav-height, 56px) + env(safe-area-inset-bottom));
    }
  `;

  @state() private route: Route = parseRoute();

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('hashchange', this.onHashChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this.onHashChange);
  }

  private onHashChange = () => {
    this.route = parseRoute();
  };

  private renderView() {
    switch (this.route) {
      case 'brew':
        return html`<brew-view></brew-view>`;
      case 'profiles':
        return html`<profiles-view></profiles-view>`;
      case 'history':
        return html`<history-view></history-view>`;
      case 'settings':
        return html`<settings-view></settings-view>`;
    }
  }

  render() {
    return html`
      <status-bar></status-bar>
      <main>${this.renderView()}</main>
      <nav-bar .active=${this.route}></nav-bar>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rea-app': ReaApp;
  }
}
