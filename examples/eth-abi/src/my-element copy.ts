import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { entryPointV6Abi } from './abis/entrypoint_v6';
type ABIItem = { desc: string, address: string, abi: string }
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
  @state()
  opened = false;

  @state()
  abiList: ABIItem[] = [];

  @state()
  abis = [{
    inputs: [],
    name: 'ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  }];

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

  handleSelectAbi(item: any) {
    console.log("item", item);
    try {
      // this.abis = JSON.parse(item.abi);
      // console.log("handleSelectAbi", this.abis); // 验证解析后的结果
      this.abis = [
        {
          inputs: [],
          name: 'ADMIN_ROLE',
          outputs: [
            {
              internalType: 'bytes32',
              name: '',
              type: 'bytes32',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
      ]
      this.requestUpdate(); // 强制触发更新
    } catch (error) {
      console.error("Failed to parse ABI", error);
    }
  }

  render() {
    console.log("abis", this.abis);
    console.log("abiList", this.abiList);
    return html`
      <button @click=${this.handleSelectAbi}>handleSelectAbi</button>
      <button @click=${this.handleOpen}>click</button>
      <button @click=${() => {
        let list: ABIItem[] = []
        const res = localStorage.getItem("--tool:evm:abi-list")
        if (res !== null) {
          list = JSON.parse(res)
        }
        this.abiList = list
      }}>Read List</button>
      <abi-table .onClick=${this.handleSelectAbi} .datas=${this.abiList}></abi-table>
      <abi-form .opened=${this.opened} .onOk=${this.handleSubmit} .onClose=${() => this.opened = false}></abi-form>
      <abi-element .abi=${this.abis} .onCallback=${this.callback}> </abi-element>
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

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
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
