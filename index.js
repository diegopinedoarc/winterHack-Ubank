const menu = document.querySelector(".btn__container");
const item = document.querySelectorAll(".item");

menu.addEventListener("click", (e) => {
  e.preventDefault();
  item.forEach((i) => i.classList.toggle("show"));
});
