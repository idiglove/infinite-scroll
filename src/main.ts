function main() {
  let page: null | number = 1;
  const limit = 100;
  const $list = document.querySelector(".list")!;
  const loadItems = async (number: number) => {
    const data = await fetch(
      `http://localhost:3000/posts?_page=${number}&_limit=${limit}`
    );
    const items = await data.json();
    if (items.length === 0) {
      page = null;
      document.querySelector(".more")?.remove();
    }
    items.forEach((info: any) => {
      const item = document.querySelector("card-item")?.cloneNode(true)
        .shadowRoot!;
      item
        .querySelector(".card__image")
        .getElementsByTagName("img")?.[0]
        ?.setAttribute("src", info.image);
      item.querySelector(".card__title").textContent = info.title;
      item.querySelector(".card__text").textContent = info.content;
      $list.append(item);
    });
  };

  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) return;
    if (page) {
      loadItems(page++);
    } else {
      document.querySelector(".more")?.remove();
    }
  });
  intersectionObserver.observe(document.querySelector(".more")!);
}
document.addEventListener("DOMContentLoaded", main);
