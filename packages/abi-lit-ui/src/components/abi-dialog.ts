import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@customElement("abi-table")
export class AbiTableElement extends LitElement {
  @property({ type: Boolean })
  opened = false;

  render() {
    return html` <style>
        .opened {
          display: flex;
        }
        .closed {
          display: none;
        }
        .dialog {
          flex-direction: column;
          border: 2px outset black;
          padding: 1em;
          margin: 1em;
        }
        .buttons {
          display: flex;
          flex-direction: row;
        }
        .accept {
          justify-content: space-around;
          align-content: space-around;
        }
        .cancel {
          justify-content: space-around;
          align-content: space-around;
        }
      </style>
      <div
        class="${classMap({
          dialog: true,
          opened: !this.opened,
          closed: this.opened,
        })}"
      >
        <h1 class="title ">Title</h1>
        <p class="content">This is a dialog</p>
        <div class="buttons">
          <button
            class="accept"
            @click="${() =>
              this.dispatchEvent(new CustomEvent("dialog.accept"))}"
          >
            Ok
          </button>
          <button
            class="cancel"
            @click="${() =>
              this.dispatchEvent(new CustomEvent("dialog.cancel"))}"
          >
            Cancel
          </button>
        </div>
      </div>`;
  }
}
