/*
    Renderiza la vista del carrito. 
    Contiene una lista de Objetos CartItem
    Maneja la funcionalidad de aplicación.

    renderItems() 
        => Lee la lista de Objetos para generar la vista del carrito

    calculateTotalPrice() 
        => Lee la lista de Objetos para calcular el precio total de los items en el carrito. Vuelve a renderizar la vista para actualizar correctamente los valores
    handleClick => Maneja la delegación del evento click a los distintos elementos de la vista
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

/* 
    Renderiza la vista de cada celular en el carrito. 
    Almacena dos instancias de la Clase Button, una para cada botón necesario
*/
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

/*
    Renderiza los botones para aumentar/disminuir la cantidad de cada celular en la lista
*/
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
