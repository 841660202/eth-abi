import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import "./abi-button";
@customElement("abi-dialog")
export class AbiDialogElement extends LitElement {
  @property({ type: Boolean })
  opened = false;

  @property()
  onClose = () => {};

  render() {
    console.log("this.opened", this.opened);
    return html` <div
      class="${classMap({
        dialog: true,
        opened: this.opened,
        closed: !this.opened,
      })}"
    >
      <div class="dialog-bg"></div>
      <div style="flex: 1">
        <button class="closeBtn" @click=${this.onClose}>X</button>
        <slot name="dialog-title"></slot>
        <slot name="dialog-body"></slot>
      </div>
      <slot name="dialog-footer" class="footer"></slot>
    </div>`;
  }
  static styles = css`
    .closeBtn {
      position: absolute;
      right: 1em;
      top: 1em;
      border: none;
      background-color: transparent;
      color: white;
      font-size: 1.5em;
      cursor: pointer;
    }
    .opened {
      display: flex;
      opacity: 1;
    }
    .closed {
      display: none;
      opacity: 0;
    }
    .dialog-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      backdrop-filter: blur(4px);
    }
    .dialog {
      transition-duration: 1000ms;
      transition-property: all;
      flex-direction: column;
      padding: 1em;
      margin: 1em;
      position: fixed;
      width: 500px;
      background-color: #2a323c24;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      z-index: 999;
      left: 50%;
      transform: translateX(-50%);
    }

    .footer {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 14px;
    }
    .accept {
      justify-content: space-around;
      align-content: space-around;
    }
    .cancel {
      justify-content: space-around;
      align-content: space-around;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "abi-dialog": AbiDialogElement;
  }
}
