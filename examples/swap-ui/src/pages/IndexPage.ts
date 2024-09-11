// Components
import type { TemplateResult } from "lit";
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { TwLitElement } from "../common/TwLitElement";

import "@eth/swap-ui/index.css";
import "@eth/swap-ui";

@customElement("x-index-page")
export class IndexPage extends TwLitElement {
  render(): TemplateResult {
    return html`
      <div class="container">
        <x-hello-world></x-hello-world>
        这种方案不可行，组件库，单独打出来的css，会被项目中的lit组件隔离掉，导致样式丢失
      </div>
    `;
  }
}
