import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./abi-function-item";
import "./abi-dialog";
@customElement("abi-form")
export class AbiFormElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property({ type: Boolean })
  opened = false;

  @property({ attribute: false })
  onOk: () => void = () => { };

  @property({ attribute: false })
  onClose: () => void = () => { };



  handleClose() {
    this.onClose()
  }

  render() {
    console.log("this.", this.opened);
    return html`
      <abi-dialog .opened=${this.opened}>
        <div
          slot="dialog-title"
          style="text-align: left; font-weight: bold; font-size: 24px"
        >
          Add Abi ...
        </div>
        <div slot="dialog-body">
          <form @submit="${this.onOk}" style="width: 100%">
            <div class="form-item">
              <label htmlFor="desc" class="form-label"> Desc: </label>
              <input
                id="desc"
                name="desc"
                type="text"
                placeholder="contract desc"
                class=""
                autocomplete="off"
              />
            </div>
            <div class="form-item">
              <label htmlFor="address" class="form-label"> Address: </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="contract address"
                class=""
                autocomplete="off"
              />
            </div>
            <div class="form-item">
              <label htmlFor="abi" class="form-label"> Abi: </label>
              <textarea
                id="abi"
                name="abi"
                type="text"
                placeholder="contract abi"
                class=""
                rows=${20}
                autocomplete="off"
              ></textarea>
            </div>
            <button type="submit" @click=${this.handleClose}>submit</button>
          </form>
        </div>
      </abi-dialog>
    `;
  }

  static styles = css`
    .flex {
      display: flex;
      flex-direction: column;
    }
    .form-item {
      display: flex;
      margin-top: 12px;
    }
    .form-label {
      min-width: 80px;
      display: inline-block;
      text-align: left;
      font-weight: bolder;
    }
    input,
    textarea {
      width: 100%;
      outline-color: #646cff;
    }
    input {
      height: 28px;
      line-height: 28px;
    }
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
      margin-top: 14px;
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
    "abi-form": AbiFormElement;
  }
}
