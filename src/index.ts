function main() {
  const element = document.getElementById("app");
  if (element) {
    element.textContent = "Hello, World!";
  }
}
document.addEventListener("DOMContentLoaded", main);
