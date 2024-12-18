import { LitElement, html, css } from 'lit';

export class GameAuth extends LitElement {
  static get properties() {
    return {
      isAuthenticated: { type: Boolean }
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
      min-height: 400px;
      padding: 20px;
      box-sizing: border-box;
    }
    ::slotted(*) {
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    return html`
      ${!this.isAuthenticated 
        ? html`<slot name="auth"></slot>`
        : html`<slot name="game"></slot>`
      }
    `;
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }
}

customElements.define('game-auth', GameAuth); 