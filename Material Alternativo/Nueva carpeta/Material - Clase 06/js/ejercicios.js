//Realizar una aplicación que le muestre al usuario en pantalla una imagen de su computadora. Validar que la imagen tenga un formato válido (jpg, jpeg, png, webp). La imagen debe cambiar cada vez que el usuario suba una imagen diferente

const dropZone = document.querySelector(".dragDrop");
const input = document.querySelector("#archivoDrop");
const img = document.querySelector(".imagen");
const p = document.querySelector(".texto");

input.addEventListener("change", () => {
  manejadorArchivos(input.files[0]);
});

dropZone.addEventListener("dragenter", (e) => e.preventDefault());

dropZone.addEventListener("dragleave", (e) => e.preventDefault());

dropZone.addEventListener("dragover", (e) => e.preventDefault());

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const archivo = validador(e.dataTransfer.files);
  manejadorArchivos(archivo);
});

function manejadorArchivos(archivo) {
  if (archivo) {
    const url = URL.createObjectURL(archivo);
    p.style.display = "none";
    img.style.display = "inline-block";
    img.setAttribute("src", url);
  } else {
    img.style.display = "none";
    p.style.display = "block";
  }
}

function validador(archivo) {
  const regExp = /\.(jpe?g|png|webp)$/i;
  if (!regExp.test(archivo[0].name)) return;

  return archivo;
}
