import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./abi-function-item";

import type { Abi, AbiForm, AbiFunction, AbiItem } from "../types";
import { repeat } from "lit/directives/repeat.js";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("abi-table")
export class AbiTableElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property({ type: Array })
  datas: AbiForm[] = [];

  // @property()
  // onClick: (data: any) => void = () => { };



  handleRowClick(abiItem: AbiForm) {
    const event = new CustomEvent('click', { bubbles: true, composed: true, detail: abiItem });
    this.dispatchEvent(event);
  }


  render() {
    return html`
      <table>
        <tr>
          <th>Address</th>
          <th>Desc</th>
          <th>Operation</th>
        </tr>
      ${repeat(
      this.datas || [],
      (abiItem) => abiItem.id,
      (abiItem) =>
        html`<tr @click=${() => this.handleRowClick(abiItem)}>
          <td>${abiItem.address}</td>
          <td>${abiItem.desc}</td>
          <!-- <td>${abiItem.abi}</td> -->
        </tr>`,
    )}
      </table>
    `;
  }

  handleSubmit(event: Event) { }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "abi-table": AbiTableElement;
  }
}
