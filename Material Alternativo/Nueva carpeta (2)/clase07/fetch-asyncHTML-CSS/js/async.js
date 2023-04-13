const asyncFetch = async (url) => {
  const regExp = /\.(jpe?g|png|webp)$/i;
  const type = regExp.test(url) ? "blob" : "json";

  switch (type) {
    case "blob": {
      const response = await fetch(url);
      if (!response.ok) return Error(`HTTP error, status = ${response.status}`);
      return response.blob();
    }
    case "json": {
      const response = await fetch(url);
      if (!response.ok) return Error(`HTTP error, status = ${response.status}`);
      return response.json();
    }
  }
};

/*
  Fetch archivos blob
*/
const myImage = document.querySelector(".my-image");

const getBlob = async () => {
  try {
    const myBlob = await asyncFetch("images/flowers.jpg");
    if (myBlob instanceof Error) throw myBlob;
    const tempUrl = URL.createObjectURL(myBlob);
    myImage.src = tempUrl;
  } catch (error) {
    const p = document.createElement("p");
    p.classList.add("error");
    p.innerText = `Error: ${error.message}`;
    myImage.insertAdjacentElement("beforebegin", p);
  }
};

getBlob();

/*
  Fetch archivos json
*/

const myList = document.querySelector("ul");

(async () => {
  try {
    const products = await asyncFetch("products.json");
    if (products instanceof Error) throw products;
    for (const product of products) {
      const listItem = document.createElement("li");

      const nameElement = document.createElement("strong");
      nameElement.textContent = product.Name;

      const priceElement = document.createElement("strong");
      priceElement.textContent = `$${product.Price}`;

      listItem.append(
        nameElement,
        `se puede encontrar en ${product.Location}. Precio: `,
        priceElement
      );

      myList.appendChild(listItem);
    }
  } catch (error) {
    const p = document.createElement("p");
    p.classList.add("error");
    p.innerText = `Error: ${error.message}`;
    myList.insertAdjacentElement("beforebegin", p);
  }
})();
