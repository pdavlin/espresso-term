import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { listProfiles, uploadProfile } from '../../api/client.ts';
import type { ProfileRecord } from '../../api/types.ts';

@customElement('profiles-view')
export class ProfilesView extends LitElement {
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

    .list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .profile-card {
      padding: var(--space-md);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      cursor: pointer;
    }

    .profile-card:active {
      background: var(--color-surface-alt);
    }

    .profile-title {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .profile-meta {
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .empty {
      text-align: center;
      padding: var(--space-xl);
      color: var(--color-text-secondary);
    }

    .loading {
      text-align: center;
      padding: var(--space-xl);
      color: var(--color-text-secondary);
    }
  `;

  @state() private profiles: ProfileRecord[] = [];
  @state() private loading = true;

  connectedCallback(): void {
    super.connectedCallback();
    this.loadProfiles();
  }

  private async loadProfiles() {
    this.loading = true;
    try {
      this.profiles = await listProfiles();
    } catch {
      this.profiles = [];
    }
    this.loading = false;
  }

  private async selectProfile(record: ProfileRecord) {
    await uploadProfile(record.profile);
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading profiles...</div>`;
    }

    if (this.profiles.length === 0) {
      return html`<div class="empty">No profiles found</div>`;
    }

    return html`
      <h2>Profiles</h2>
      <div class="list">
        ${this.profiles
          .filter((p) => p.visibility === 'visible')
          .map(
            (p) => html`
              <div class="profile-card" @click=${() => this.selectProfile(p)}>
                <div class="profile-title">${p.profile.title}</div>
                <div class="profile-meta">
                  ${p.profile.author} / ${p.profile.beverage_type}
                </div>
              </div>
            `
          )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'profiles-view': ProfilesView;
  }
}
