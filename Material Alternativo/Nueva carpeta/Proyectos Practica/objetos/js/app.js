//Elementos den DOM
const nav = document.getElementById("navBar");
const section = document.getElementById("cartContainer");

const asyncFetch = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await res.json();
};

window.addEventListener("DOMContentLoaded", () => {
  //Initial State
  const items = [];
  const api = "https://course-api.com/react-useReducer-cart-project";
  (async () => {
    try {
      try {
        const res = await fetch(api);
        if (!res.ok)
          throw new Error(
            `Ocurrió un error: ${res.status} - ${res.statusText}`
          );

        const data = await res.json();
        data.forEach((item) => {
          items.push(item);
        });
      } catch (error) {
        console.log(error);
      }

      //Insertar NavBar
      const navbar = new NavBar(CartIcon(), items);
      nav.innerHTML = navbar.render();

      //Insertar Carrito
      const cartContainer = new CartContainer(items);
      cartContainer.calculateTotalPrice();
      cartContainer.handleClick();
      section.innerHTML = cartContainer.render();
    } catch (error) {
      console.log(error);
    }
  })();
});
