import card from "./index.html?raw";

const template = document.createElement("template");
template.innerHTML = card;

class CardItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("card-item", CardItem);
