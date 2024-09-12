import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import "./abi-function-item";

function isAbiFunction(item: AbiItem): item is AbiFunction {
  return item.type === "function";
}
import type { Abi, AbiFunction, AbiItem } from "../types";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("abi-element")
export class AbiElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property({ type: Array })
  abi: Abi = [];

  @property()
  onCallback: (data: string) => void = () => { };

  @state()
  writeOperations: AbiFunction[] = [];

  @state()
  readOperations: AbiFunction[] = [];

  firstUpdated() {
    this.updateOperations();
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("abi")) {
      this.updateOperations();
    }
  }

  updateOperations() {
    console.log("updateOperations", this.abi);
    this.writeOperations = this.abi
      .filter(
        (item): item is AbiFunction =>
          !["event", "error", "constructor"].includes(item.type) &&
          !(isAbiFunction(item) && item.stateMutability === "view"),
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    this.readOperations = this.abi
      .filter(
        (item): item is AbiFunction =>
          isAbiFunction(item) && item.stateMutability === "view",
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  renderOperations(operations: AbiFunction[]) {
    return html`
      <ul>
        ${repeat(
      operations,
      (abiItem) => abiItem.name,
      (abiItem) =>
        html`<abi-function-item
              .abiItem="${abiItem}"
              .onCallback=${this.onCallback}
            ></abi-function-item>`,
    )}
      </ul>
    `;
  }
  render() {
    return html`
      <div class="flex">
        <!-- write -->
        ${this.renderOperations(this.writeOperations)}
        <!-- read -->
        ${this.renderOperations(this.readOperations)}
      </div>
    `;
  }

  static styles = css`
    .flex {
      display: flex;
      flex-direction: row;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "abi-element": AbiElement;
  }
}
