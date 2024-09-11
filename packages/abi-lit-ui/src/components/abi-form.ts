import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./abi-function-item";

import type { Abi, AbiFunction, AbiItem } from "../types";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("abi-form")
export class AbiFormElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property({ type: Array })
  abi: Abi = [];

  @property()
  onOk: (data: Record<string, string>) => void = () => {};

  render() {
    return html`
      <div class="flex">
        <form @submit="${this.handleSubmit}">
          <div class="form-item">
            <label htmlFor="desc" class="form-label"> Desc: </label>
            <input
              id="desc"
              name="desc"
              type="text"
              placeholder="contract desc"
              class=""
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
              rows=${10}
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    `;
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });

    this.onOk(data);
  }

  static styles = css`
    .flex {
      display: flex;
      flex-direction: row;
    }
    .form-item {
      display: flex;
      margin-top: 6px;
    }
    .form-label {
      min-width: 80px;
      display: inline-block;
      text-align: left;
    }
    input,
    textarea {
      width: 300px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "abi-form": AbiFormElement;
  }
}
