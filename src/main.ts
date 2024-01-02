function main() {
  const $list = document.querySelector(".list")!;
  // Simulate a request to load data and render it to the list element;
  function loadItems(number: number) {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(Array(number).fill(null));
      }, 1000);
    }).then((data: any) => {
      data.forEach(() => {
        const item = document.querySelector("card-item")?.cloneNode(true)!;
        $list.append(item);
      });
    });
  }

  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) return;
    loadItems(10);
  });
  // start observing
  intersectionObserver.observe(document.querySelector(".more")!);
}
document.addEventListener("DOMContentLoaded", main);
