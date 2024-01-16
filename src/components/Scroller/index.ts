import Virtualizer from "../../class/Virtualizer";
import scroller from "./index.html?raw";

const template = document.createElement("template");
template.innerHTML = scroller;

class Scroller extends HTMLElement {
  virtualizer: null | Virtualizer = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.virtualizer = new Virtualizer();
  }

  init = ({
    minIndex,
    maxIndex,
    startIndex,
    itemHeight,
    amount,
    tolerance,
  }) => {
    // 1) height of the visible part of the viewport (px)
    const viewportHeight = amount * itemHeight;
    // 2) total height of rendered and virtualized items (px)
    const totalHeight = (maxIndex - minIndex + 1) * itemHeight;
    // 3) single viewport outlet height, filled with rendered but invisible rows (px)
    const toleranceHeight = tolerance * itemHeight;
    // 4) all rendered rows height, visible part + invisible outlets (px)
    const bufferHeight = viewportHeight + 2 * toleranceHeight;
    // 5) number of items to be rendered, buffered dataset length (pcs)
    const bufferedItems = amount + 2 * tolerance;
    // 6) how many items will be virtualized above (pcs)
    const itemsAbove = startIndex - tolerance - minIndex;
    // 7) initial height of the top padding element (px)
    const topPaddingHeight = itemsAbove * itemHeight;
    // 8) initial height of the bottom padding element (px)
    const bottomPaddingHeight = totalHeight - topPaddingHeight;
    // 9) initial scroll position (px)
    const initialPosition = topPaddingHeight + toleranceHeight;

    const settings = this.virtualizer?.settings;

    // initial state object
    return {
      settings,
      viewportHeight,
      totalHeight,
      toleranceHeight,
      bufferHeight,
      bufferedItems,
      topPaddingHeight,
      bottomPaddingHeight,
      initialPosition,
      data: [],
    };
  };
}

customElements.define("scroller-item", Scroller);
