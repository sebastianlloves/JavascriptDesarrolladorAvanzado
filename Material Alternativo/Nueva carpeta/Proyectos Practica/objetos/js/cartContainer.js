/*
    Renderiza la vista del carrito. Contiene una lista de Objetos CartItem
    Maneja la funcionalidad de aplicación.

    renderItems() 
        => Lee la lista de Objetos para generar la vista del carrito

    calculateTotalPrice() 
        => Lee la lista de Objetos para calcular el precio total de los items en el carrito. Vuelve a renderizar la vista para actualizar correctamente los valores

    handleClick() => Maneja la delegación del evento click a los distintos elementos de la vista
        => Botones up/down 
            => Cambian el valor almacenado en el Objeto CartItem según el id. Vuelven a renderizar la vista para actualizar valores
        => Botón clear
            => Limpia el array almacenado en el Objeto Container. Actualiza la vista renderizada
            
    render() 
        => retorna el HTML que se inserta en el innerHTML del elemento de HTML para generar la vista del carrito. Genera una vista condicional en base a la existencia de elementos en el array items del Objeto CartContainer
*/

class CartContainer {
  constructor(items) {
    this.items = items;
    this.total = 0;
  }

  renderItems = () => {
    return this.items
      .map((item) => {
        const cartItem = new CartItem(item);
        return cartItem.render();
      })
      .join("");
  };

  calculateTotalPrice = () => {
    let totalPrice = 0;
    this.items.forEach((item) => {
      totalPrice += item.amount * Number(item.price);
      this.total = totalPrice;
    });
  };

  handleClick = () => {
    document.addEventListener("click", ({ target }) => {
      const container = document.getElementById("cartContainer");
      if (target.classList.contains("up")) {
        //Obtener el id del item eliminando "up-" del id del target
        const itemId = target.id.slice(3, target.id.length);
        //console.log(itemId);

        //Almacenar el item correspondiente al id
        const item = this.items.find((item) => item.id === itemId);
        //console.log(item);

        //Encontrar el índice item en array
        const itemIndex = this.items.indexOf(item);
        //console.log(itemIndex);

        //Actualizar el array
        this.items[itemIndex].amount = item.amount + 1;

        //Cambiar el precio total
        this.calculateTotalPrice();

        //Actualizar vista
        container.innerHTML = this.render();
      } else if (target.classList.contains("down")) {
        //Obtener id del item eliminando "down-" del id del target
        const itemId = target.id.slice(5, target.id.length);
        //console.log(itemId);

        //Almacenar el item correspondiente al id
        const item = this.items.find((item) => item.id === itemId);
        //console.log(item);

        //Encontrar el índice item en array
        const itemIndex = this.items.indexOf(item);
        //console.log(itemIndex);

        //Actualizar el array según la cantidad restante. Si es 0, elimina el elemento
        const nuevaCantidad = item.amount - 1;
        if (nuevaCantidad === 0) {
          //Eliminar el elemento del array
          this.items.splice(itemIndex, 1);

          //Cambiar el precio total y volver a renderizar la vista
          this.calculateTotalPrice();

          //Actualizar la vista
          container.innerHTML = this.render();
        } else {
          //Actualizar el array
          this.items[itemIndex].amount = nuevaCantidad;

          //Cambiar el precio total y volver a renderizar la vista
          this.calculateTotalPrice();
          //Actualizar la vista
          container.innerHTML = this.render();
        }
      } else if (target.id === "clear") {
        //Confirmar si se desea borrar todos los elementos
        const borrar = confirm("¿Seguro que quiere eliminar todo el carrito?");
        if (borrar) {
          //Limpiar el array
          this.items = [];
          //Volver a renderizar
          container.innerHTML = this.render();
        } else {
          return;
        }
      }
    });
  };

  render = () => {
    if (this.items.length < 1) {
      return ` 
            <section class="cart">
                <h2>your bag</h2>
                <h4 class="empty-cart">is currently empty</h4>
            </section>
            `;
    }
    return `
    <section class="cart">
        <header>
            <h2>your bag</h2>
        </header>
        <div>
            ${this.renderItems()}
        </div>
        <footer>
        <hr />
        <div class="cart-total">
            <h4>
            total <span>${this.total.toFixed(2)}</span>
            </h4>
        </div>
        <button id="clear" class="btn clear-btn">
            clear cart
        </button>
        </footer>
    </section>
    `;
  };
}

//Renderiza la vista de cada celular en el carrito. Almacena dos intancias de la Clase Button, una para cada boton necesario
class CartItem {
  constructor(item) {
    const { id, img, title, price, amount } = item;
    this.id = id;
    this.img = img;
    this.title = title;
    this.price = price;
    this.amount = amount;
    this.btnUp = new Button(`up-${this.id}`, ChevronUp);
    this.btnDown = new Button(`down-${this.id}`, ChevronDown);
  }

  render = () => {
    return `
            <article class="cart-item">
                <img src=${this.img} alt=${this.title} />
                <div>
                  <h4>${this.title}</h4>
                  <h4 class="item-price">${this.price}</h4>
                  <button
                    id="remove"
                    class="remove-btn">
                    remove
                  </button>
                </div>
                <div>
                  ${this.btnUp.render()}
                  <p class="amount">${this.amount}</p>
                  ${this.btnDown.render()}
                </div>
            </article>
                `;
  };
}

//Renderiza los botones para aumentar/disminuir la cantidad de cada celular en la lista
class Button {
  constructor(id, iconFn) {
    this.id = id;
    this.icon = iconFn(id);
  }

  render = () => {
    return `<button class="amount-btn">
            ${this.icon}
        </button>`;
  };
}

/*
Pruebas de Componente

window.addEventListener("DOMContentLoaded", () => {
   const btnUp = new Button("up", ChevronUp);
  btnUp.handleClick();
  const item = {
    id: "rec1JZlfCIBOPdcT2",
    title: "Samsung Galaxy S8",
    price: "399.99",
    img: "https://dl.airtable.com/.attachments/64b266ad865098befbda3c3577a773c9/24497852/yedjpkwxljtb75t3tezl.png",
    amount: 1,
  };
  const cartContainer = new CartCointainer([item], 399.99);
  cartContainer.handleClick();
  document.getElementById("cartContainer").innerHTML = cartContainer.render();
});
*/
