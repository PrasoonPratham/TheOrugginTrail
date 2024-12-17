import { LitElement, html, css } from 'lit';

export class GameAuth extends LitElement {
  static get properties() {
    return {
      isAuthenticated: { type: Boolean, reflect: true }
    };
  }

  constructor() {
    super();
    this.isAuthenticated = false;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    return html`
      <div class="auth-container">
        ${!this.isAuthenticated 
          ? html`<slot name="auth"></slot>`
          : html`<slot name="game"></slot>`
        }
      </div>
    `;
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }
}

customElements.define('game-auth', GameAuth);

// Export a singleton instance that can be used to manage auth state
export const gameAuth = document.createElement('game-auth') as GameAuth; 