import card from "./index.html?raw";

const template = document.createElement("template");
template.innerHTML = card;

class CardItem extends HTMLElement {
  _titleText: string;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    this._titleText = "";
  }

  get titleText() {
    return this._titleText;
  }

  set titleText(value: string) {
    this._titleText = value;
  }
}

customElements.define("card-item", CardItem);
