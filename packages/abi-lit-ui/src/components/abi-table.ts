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
@customElement("abi-table")
export class AbiTableElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property({ type: Array })
  abi: Abi = [];

  @property()
  onOk: (data: Record<string, string>) => void = () => {};

  render() {
    return html`
      <table>
        <tr>
          <th>Address</th>
          <th>Chain</th>
          <th>Operation</th>
        </tr>
        <tr>
          <td>Priya</td>
          <td>Sharma</td>
          <td>24</td>
        </tr>
        <tr>
          <td>Arun</td>
          <td>Singh</td>
          <td>32</td>
        </tr>
        <tr>
          <td>Sam</td>
          <td>Watson</td>
          <td>41</td>
        </tr>
      </table>
    `;
  }

  handleSubmit(event: Event) {}

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "abi-table": AbiTableElement;
  }
}
