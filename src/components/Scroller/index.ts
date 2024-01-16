import Virtualizer from "../../class/Virtualizer";
import scroller from "./index.html?raw";

const template = document.createElement("template");
template.innerHTML = scroller;

class Scroller extends HTMLElement {
  virtualizer: null | Virtualizer = null;
  scrollerSettings: any = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.virtualizer = new Virtualizer();
    this.scrollerSettings = this.init(this.virtualizer.settings);
    this.firstRender();
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

  firstRender = () => {
    if (this.shadowRoot && this.shadowRoot.querySelector) {
      const scrollerElement = this.shadowRoot.querySelector(".wrapper");
      if (scrollerElement instanceof HTMLElement) {
        scrollerElement.addEventListener("scroll", this.onScroll);

        this.render();
        scrollerElement.style.height =
          this.scrollerSettings.viewportHeight + "px";
        scrollerElement.scrollTop = this.scrollerSettings.initialPosition;
      }
    }
  };

  onScroll: (ev: Event) => any = (ev) => {
    const { scrollTop } = ev.currentTarget as HTMLElement;
    
    const {
      totalHeight,
      toleranceHeight,
      bufferedItems,
      settings: { itemHeight, minIndex },
    } = this.scrollerSettings;
    const index =
      minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight);
    const data = this.virtualizer?.getData(index, bufferedItems) ?? [];
    const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0);
    const bottomPaddingHeight = Math.max(
      totalHeight - topPaddingHeight - data.length * itemHeight,
      0
    );

    this.scrollerSettings.topPaddingHeight = topPaddingHeight;
    this.scrollerSettings.bottomPaddingHeight = bottomPaddingHeight;
    this.scrollerSettings.data = data;

    this.render();
  };

  render = () => {
    if (this.shadowRoot && this.shadowRoot.querySelector) {
      const scrollerElement = this.shadowRoot.querySelector(".wrapper");
      const topPadding = this.shadowRoot.querySelector(".top-padding");
      const btmPadding = this.shadowRoot.querySelector(".btm-padding");
      const items = this.shadowRoot.querySelector(".items");

      if (scrollerElement instanceof HTMLElement) {
        scrollerElement.style.height =
          this.scrollerSettings.viewportHeight + "px";
      }

      if (topPadding instanceof HTMLElement) {
        topPadding.style.height = this.scrollerSettings.topPaddingHeight + "px";
      }

      if (btmPadding instanceof HTMLElement) {
        btmPadding.style.height =
          this.scrollerSettings.bottomPaddingHeight + "px";
      }

      if (items instanceof HTMLElement) {
        items.innerHTML = this.scrollerSettings.data
          .map(
            (item: { index: number; text: string }) => `<div>${item.text}</div>`
          )
          .join("");
      }
    }
  };
}

customElements.define("scroller-item", Scroller);
