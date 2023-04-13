//Elementos den DOM
const nav = document.getElementById("navBar");
const section = document.getElementById("cartContainer");

window.addEventListener("DOMContentLoaded", () => {
  //Initial State
  const item = {
    id: "rec1JZlfCIBOPdcT2",
    title: "Samsung Galaxy S8",
    price: "399.99",
    img: "https://dl.airtable.com/.attachments/64b266ad865098befbda3c3577a773c9/24497852/yedjpkwxljtb75t3tezl.png",
    amount: 1,
  };
  const items = [item];
  const api = "https://course-api.com/react-useReducer-cart-project";

  //Renderizar navBar
  const navbar = new NavBar(CartIcon());
  nav.innerHTML = navbar.render();

  //Renderizar Carrito
  const cartContainer = new CartContainer([]);
  section.innerHTML = cartContainer.render();
});
