const body = document.querySelector("body");
const bgColor = localStorage.getItem("bgcolor");

//Si existe, aplicar el background que corresponde al item guardado en storage
if (bgColor) body.style.background = `#${bgColor}`;

window.addEventListener("storage", function (e) {
  //Cambio del color de fondo sólo cuando el item modificado es "bgcolor"
  if (e.key === "bgcolor") body.style.background = `#${e.newValue}`;
  //Mostrar valores afectados en el cambio
  document.querySelector(".my-key").textContent = e.key;
  document.querySelector(".my-old").textContent = e.oldValue;
  document.querySelector(".my-new").textContent = e.newValue;
  document.querySelector(".my-url").textContent = e.url;
  document.querySelector(".my-storage").textContent = JSON.stringify(
    e.storageArea
  );
});
