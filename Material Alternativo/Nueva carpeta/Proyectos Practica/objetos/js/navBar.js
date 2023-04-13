class NavBar {
  constructor(icon) {
    this.icon = icon;
  }

  render = () => {
    return `
            <h3>carrito de compras</h3>
            <div class='nav-container'>
              ${this.icon}
            </div>
            `;
  };
}
