import row from "./index.html?raw";

const template = document.createElement("template");
template.innerHTML = row;

class RowTemplate extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("row-template", RowTemplate);
