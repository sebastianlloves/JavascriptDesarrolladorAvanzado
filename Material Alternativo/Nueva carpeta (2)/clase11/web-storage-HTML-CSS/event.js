const body = document.querySelector("body");
const bgColor = localStorage.getItem("bgColor");

if (bgColor) body.style.backgroundColor = `#${bgColor}`;

window.addEventListener("storage", function (e) {
  const { key, oldValue, newValue, url, storageArea } = e;

  //Cambiar color de fondo
  if (key === "bgColor") body.style.backgroundColor = `#${newValue}`;

  document.querySelector(".my-key").textContent = key;
  document.querySelector(".my-old").textContent = oldValue;
  document.querySelector(".my-new").textContent = newValue;
  document.querySelector(".my-url").textContent = url;
  document.querySelector(".my-storage").textContent =
    JSON.stringify(storageArea);
});
