const $list = document.querySelector(".list")!;
const $wrapper = document.querySelector(".wrapper")!;
const limit = 3;

const main = () => {
  localStorage.clear();
  let page: null | number = 1;
  let fetchLimit = 10;
  const loadItems = async (number: number) => {
    const data = await fetch(
      `http://localhost:3000/posts?_page=${number}&_limit=${fetchLimit}`
    );
    const items = await data.json();
    if (items.length === 0) {
      page = null;
      document.querySelector(".more")?.remove();
    }

    const itemsString = localStorage.getItem("items");
    const localItems = JSON.parse(itemsString!);
    localStorage.setItem(
      "items",
      JSON.stringify([...(localItems ?? []), ...items])
    );

    // for (let i = 0; i < fetchLimit; i++) {
    //   const info = items[i];
    //   if (!info) {
    //     break;
    //   }
    //   // create card item component
    //   const cardItem = document.createElement("card-item").shadowRoot!;
    //   cardItem
    //     .querySelector(".card__image")
    //     ?.getElementsByTagName("img")?.[0]
    //     ?.setAttribute("src", info.image);
    //   const cardTitle = cardItem.querySelector(".card__title");
    //   if (cardTitle) {
    //     cardTitle.textContent = info.title;
    //   }
    //   const cardText = cardItem.querySelector(".card__text");
    //   if (cardText) {
    //     cardText.textContent = info.content;
    //   }
    //   $list.append(cardItem);
    // }

    // const windowHeight = window.innerHeight;
    // const cardHeight = 656;
    // const itemsString = localStorage.getItem("items");
    // const items = JSON.parse(itemsString!);
    // const currentScrollPos = window.scrollY;
    // window.addEventListener("scroll", () =>
    //   virtualize({ windowHeight, cardHeight, items, currentScrollPos })
    // );
  };

  // const intersectionObserver = new IntersectionObserver((entries) => {
  //   if (entries[0].intersectionRatio <= 0) return;
  //   if (page) {
  //     // loadItems(page++);
  //   } else {
  //     document.querySelector(".more")?.remove();
  //   }
  // });
  // intersectionObserver.observe(document.querySelector(".more")!);

  // loadItems(page++);
};

document.addEventListener("DOMContentLoaded", main);
