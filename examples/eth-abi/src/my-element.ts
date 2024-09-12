import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
type ABIFormItem = { desc: string, address: string, abi: string }
type ABIItem = { desc: string, address: string, abi: [] }
// import './lib/abi-ui';
import '@eth-abi/lit-ui';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  constructor() {
    super()
    this.handleRead = this.handleRead.bind(this)
  }

  @state()
  opened = false;

  @state()
  abiList: ABIFormItem[] = [];

  @state()
  abiItem?: ABIItem;



  handleOpen(data: `${string}`) {
    this.opened = true
    this.requestUpdate()
  }

  callback(data: `${string}`) {
    console.log('callback', data);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    let obj: any = {}

    for (const [name, value] of formData.entries()) {
      obj[name] = value
    }
    const res = localStorage.getItem("--tool:evm:abi-list")
    obj['id'] = crypto.randomUUID()
    let list = []
    if (res !== null) {
      list = JSON.parse(res)
    }
    localStorage.setItem("--tool:evm:abi-list", JSON.stringify([...list, obj]))

  }

  handleSelectAbi(item: CustomEvent) {
    try {
      this.abiItem = {
        ...item.detail,
        abi: JSON.parse(item.detail.abi)
      };
    } catch (error) {
      console.error("Failed to parse ABI", error);
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.handleRead()
  }


  handleRead() {
    let list: ABIFormItem[] = []
    const res = localStorage.getItem("--tool:evm:abi-list")
    if (res !== null) {
      list = JSON.parse(res)
    }
    this.abiList = list
    this.abiItem = {
      ...this.abiList[0],
      abi: JSON.parse(this.abiList[0].abi)
    }

  }

  render() {
    return html`
      <button @click=${this.handleOpen}>Add abi</button>
      <button @click=${this.handleRead}>Read List</button>
      <abi-form .opened=${this.opened} .onOk=${this.handleSubmit} .onClose=${() => this.opened = false}></abi-form>
      <div class="abi-content">
        <abi-table @click=${(event: CustomEvent) => this.handleSelectAbi(event)} .datas=${this.abiList} .address=${this.abiItem?.address}></abi-table>
        <abi-element .abi=${this.abiItem?.abi || []} .onCallback=${this.callback}> </abi-element>
      </div>
    `;
  }


  handleOk(v: any) {
    console.log(v);
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .abi-content {
      display: flex;
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
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
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
