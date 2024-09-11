import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { AbiFunction } from "../types";
import { repeat } from "lit/directives/repeat.js";
import { encodeFunctionData } from "viem";

@customElement("abi-function-item")
export class AbiFunctionItemElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property({ type: Object })
  abiItem = {} as AbiFunction;

  @property({ type: Boolean })
  active = false;

  @property()
  onCallback: (data: string) => void = () => {};

  @state()
  formItems: string[] = [];

  @state()
  canSubmit = false;

  updated(changedProperties: any) {
    if (changedProperties.has("abiItem")) {
      this.initializeformItems();
    }
  }
  initializeformItems() {
    this.formItems = this.abiItem?.inputs.map(() => "");

    this.checkFormValidity();
  }

  handleInput(event: InputEvent, _field: string, index: number) {
    this.formItems[index] = (event.target as HTMLInputElement).value;
    this.checkFormValidity();
  }
  handleInputArrayString(event: InputEvent) {
    this.formItems = (event.target as HTMLInputElement).value?.split(",");
    this.checkFormValidity();
  }

  checkFormValidity() {
    this.canSubmit = this.formItems.every((value) => value.trim() !== "");
  }

  handleSubmit() {
    const calldata = encodeFunctionData({
      abi: [this.abiItem],
      functionName: this.abiItem.name,
      args: this.formItems,
    });

    this.onCallback(calldata);
  }

  renderCollapse() {
    const { abiItem } = this;
    const isRead = abiItem.stateMutability === "view";
    const buttonReadClass = isRead
      ? "btn btn-sm btn-info"
      : "btn btn-sm btn-warning";
    return html`
      <form
        class="flex items-center"
        @submit="${(e: FormDataEvent) => e.preventDefault()}"
      >
        <button
          ?disabled="${!this.canSubmit}"
          type="submit"
          @click="${this.handleSubmit}"
          class=${buttonReadClass}
          style="height: 2rem; visibility: visible;"
        >
          ${abiItem.name}
        </button>
        ${abiItem.inputs.length > 0
          ? html`<input
              style="height: 2rem; visibility: visible;"
              class="form-control"
              .value="${this.formItems?.join("")?.length > 0
                ? this.formItems?.join(",")
                : ""}"
              placeholder=${abiItem.inputs
                .map((item) => item.type + " " + item.name)
                .join(",")}
              @input="${(e: InputEvent) => this.handleInputArrayString(e)}"
            /> `
          : ""}
      </form>
    `;
  }
  renderExpand() {
    const { abiItem } = this;
    const isRead = abiItem.stateMutability === "view";
    const buttonReadClass = isRead
      ? "btn btn-sm btn-info"
      : "btn btn-sm btn-warning";

    return html`
      <form @submit="${(e: FormDataEvent) => e.preventDefault()}">
        ${abiItem.inputs.length > 0
          ? html`
              <div>
                ${repeat(
                  abiItem.inputs,
                  (item) => item.name,
                  (item, index) =>
                    html` <div class="pt-2 flex justify-end items-center">
                      <label class="mr-6" for="${item.name}"
                        >${item.name}</label
                      >
                      <input
                        id="${item.name}"
                        type="text"
                        autocomplete="off"
                        .value="${this.formItems[index]}"
                        @input="${(e: InputEvent) =>
                          this.handleInput(e, item.name, index)}"
                        style="height: 2rem; visibility: visible;"
                        class="form-control"
                        placeholder=${item.type}
                      />
                    </div>`,
                )}

                <div class="pt-2 flex justify-end">
                  <button class="mr-4 flex items-center  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="s-16"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                      />
                    </svg>

                    Calldata
                  </button>
                  <button class="mr-4 flex items-center  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="s-16"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                      />
                    </svg>

                    Parameters
                  </button>
                  <button
                    class=${buttonReadClass}
                    style="height: 2rem; visibility: visible;"
                    ?disabled="${!this.canSubmit}"
                    @click="${this.handleSubmit}"
                    type="submit"
                  >
                    ${abiItem.name}
                  </button>
                </div>
              </div>
            `
          : ""}
      </form>
    `;
  }
  render() {
    const { abiItem } = this;
    const liClass =
      abiItem.inputs.length > 0 ? "pt-2 flex justify-end" : "pt-2 flex";
    return html`
      <li class=${liClass} style="min-height: 2rem; visibility: visible;">
        ${this.active ? this.renderExpand() : this.renderCollapse()}
        ${abiItem.inputs.length > 0
          ? html` <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="icon-btn transition"
              style="transform: ${this.active
                ? "rotate(180deg)"
                : "rotate(0deg)"}"
              @click=${() => (this.active = !this.active)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>`
          : ""}
      </li>
    `;
  }

  static styles = css`
    li {
      text-align: left;
      display: flex;
      flex-direction: row;
    }
    .pt-2,
    .py-2 {
      padding-top: 0.5rem !important;
    }
    .mr-2 {
      margin-right: 2px;
    }
    .mr-6 {
      margin-right: 6px;
    }

    .btn {
      background-color: transparent;
      border: 1px solid transparent;
      border-radius: 2px;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.25;
      padding: 0.5rem 0.75rem;
      text-align: center;
      transition: all 0.15s ease-in-out;
      user-select: none;
      vertical-align: middle;
      width: 120px;
      min-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .btn-sm {
      border-radius: 2px;
      font-size: 12px;
      font-weight: 700;
      line-height: 1.5;
      padding: 0.25rem 0.5rem;
    }
    .btn-warning {
      background-color: #2843f6;
      border-color: #2843f6;
      /* background-color: #c97539;
      border-color: #c97539; */
      color: #fff;
    }
    .btn-info {
      background-color: #355f7d;
      border-color: #355f7d;
      color: #fff;
    }

    .form-control {
      background-clip: padding-box;
      background-color: #2a323c;
      border: 1px solid transparent;
      border-radius: 2px !important;
      color: #dfe1ea !important;
      display: block;
      font-size: 0.875rem !important;
      font-weight: 400;
      width: 400px;
      padding-left: 10px;
    }
    input {
      outline: none;
    }
    input:focus {
      border: 1px solid #355f7d;
    }
    .icon-btn {
      width: 1.5rem;
      height: 1.5rem;
      cursor: pointer;
    }
    .transition {
      transition: transform 0.3s ease-in-out;
    }
    .flex {
      display: flex;
    }
    .items-center {
      align-items: center;
    }
    .justify-end {
      justify-content: flex-end;
    }
    .mr-4 {
      margin-right: 4px;
    }
    .s-16 {
      width: 16px;
      height: 16px;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.4;
      /* filter: blur(0.6); */
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "abi-function-item": AbiFunctionItemElement;
  }
}
