var products = [
  {
    id: 1,
    name: "Futomaki",
    image: "special-1.png",
    price: 12.99,
  },
  {
    id: 2,
    name: "Korea BBQ",
    image: "special-2.png",
    price: 21.99,
  },
  {
    id: 3,
    name: "Kimchi",
    image: "special-3.png",
    price: 6.99,
  },
  {
    id: 4,
    name: "Noodle",
    image: "special-4.jpeg",
    price: 12.99,
  },
  {
    id: 5,
    name: "Korea BBQ",
    image: "special-5.jpeg",
    price: 21.99,
  },
  {
    id: 6,
    name: "Burger",
    image: "special-6.jpeg",
    price: 6.99,
  },
];
const toggle = document.querySelector(".header__bar-icon");
const menu = document.querySelector(".header-nav");
const activeClass = "is-show";
toggle.addEventListener("click", function () {
  menu.classList.add(activeClass);
});
window.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !e.target.matches(".header__bar-icon")) {
    menu.classList.remove(activeClass);
  }
});
