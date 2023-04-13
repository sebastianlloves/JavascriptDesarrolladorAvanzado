/*
    Fetch de archivo blob
*/

const myImage = document.querySelector(".my-image");

const promise = fetch("images/flowers.jpg");
//console.log(promise);

promise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error en la petición. status: ${response.status}`);
    }

    return response.blob();
  })
  .then((myBlob) => {
    const tempURL = URL.createObjectURL(myBlob);
    myImage.src = tempURL;
  })
  .catch((error) => {
    const p = document.createElement("p");
    p.classList.add("error");
    p.innerText = `Error: ${error.message}`;
    myImage.insertAdjacentElement("beforebegin", p);
  });

/*
  Fetch de archivo json
*/

const myList = document.querySelector("ul");

fetch("products.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error en la petición. status: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    for (const product of data) {
      const listItem = document.createElement("li");

      const name = document.createElement("strong");
      name.textContent = product.Name;

      const price = document.createElement("strong");
      price.textContent = `$${product.Price}`;

      listItem.append(
        name,
        `Se puede puede encontrar en ${product.Location}. Valor: `,
        price
      );
      myList.appendChild(listItem);
    }
  })
  .catch((error) => {
    const p = document.createElement("p");
    p.classList.add("error");
    p.innerText = `Error: ${error.message}`;
    myList.insertAdjacentElement("beforebegin", p);
  });
