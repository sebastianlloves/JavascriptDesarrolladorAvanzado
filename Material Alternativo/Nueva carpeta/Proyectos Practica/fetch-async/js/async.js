const asyncFetch = async (url) => {
  const regExp = /\.(jpe?g|png|gif|svg|webp)$/i;
  const type = regExp.test(url) ? "blob" : "json";

  switch (type) {
    case "blob": {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
      return response.blob();
    }
    case "json": {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
      return response.json();
    }

    default:
      throw new Error(`Extension error`);
  }
};

/*
    Fetch archivos blob
*/
const myImage = document.querySelector(".my-image");

const getBlob = async () => {
  try {
    const myBlob = await asyncFetch("images/flowers.jpg");
    const objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
  } catch (error) {
    const p = document.createElement("p");
    p.classList.add("error");
    p.innerText = `Error: ${error.message}`;
    myImage.insertAdjacentElement("beforeend", p);
  }
};

getBlob();

/*
    Fetch archivos json
*/

const myList = document.querySelector("ul");

const getJson = async () => {
  try {
    const products = await asyncFetch("products.json");
    for (const product of products) {
      const listItem = document.createElement("li");

      const nameElement = document.createElement("strong");
      nameElement.textContent = product.Name;

      const priceElement = document.createElement("strong");
      priceElement.textContent = `$${product.Price}`;

      listItem.append(
        nameElement,
        ` can be found in ${product.Location}. Cost: `,
        priceElement
      );
      myList.appendChild(listItem);
    }
  } catch (error) {
    const p = document.createElement("p");
    p.classList.add("error");
    p.innerText = `Error: ${error.message}`;
    myList.insertAdjacentElement("beforeend", p);
  }
};

getJson();
