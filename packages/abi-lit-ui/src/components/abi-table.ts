import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./abi-function-item";

import type { AbiForm } from "../types";
import { repeat } from "lit/directives/repeat.js";
import { classMap } from "lit/directives/class-map.js";
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

  @property({ type: String })
  address = "";

  handleRowClick(event: Event, abiItem: AbiForm) {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("click", {
        bubbles: true,
        composed: true,
        detail: abiItem,
      }),
    );
  }

  render() {
    return html`
      <table>
        <tr>
          <th>Address</th>
          <th>Desc</th>
        </tr>
        ${repeat(
      this.datas || [],
      (abiItem) => abiItem.id,
      (abiItem) =>
        html`<tr
              @click=${(event: Event) => this.handleRowClick(event, abiItem)}
              class=${classMap({
          active: this.address === abiItem.address,
        })}
            >
              <td>${abiItem.address}</td>
              <td>${abiItem.desc}</td>
            </tr>`,
    )}
      </table>
    `;
  }

  handleSubmit(event: Event) { }

  static styles = css`
    table {
      font-size: 12px;
    }
    th,
    td {
      text-align: left;
    }
    .active {
      background-color: #2843f6; /* 你可以根据需要修改样式 */
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "abi-table": AbiTableElement;
  }
}
