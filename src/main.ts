import Card from "./Card/index";

function main() {
  const element = document.getElementById("app");
  const card = Card();
  if (element) {
    element.innerHTML = card;
  }
}
document.addEventListener("DOMContentLoaded", main);
