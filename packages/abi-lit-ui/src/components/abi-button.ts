import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./abi-function-item";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("abi-button")
export class AbiButtonElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property({ type: String })
  type: "button" | "submit" | "reset" | "menu" = "button";

  render() {
    return html`
      <button type=${this.type}>
        <slot></slot>
      </button>
    `;
  }

  static styles = css`
    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
      margin-right: 6px;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "abi-button": AbiButtonElement;
  }
}
