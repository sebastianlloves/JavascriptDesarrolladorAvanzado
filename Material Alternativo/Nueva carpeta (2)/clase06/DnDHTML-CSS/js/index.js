//Referencias del HTML
const origen = document.getElementById("src_move");
const destino = document.getElementById("dest_move");

//Funciones Callback
function dragStartHandler(e) {
  const {
    currentTarget,
    dataTransfer,
    target: { id },
  } = e;
  //console.log(currentTarget);
  //console.log(dataTransfer);
  currentTarget.classList.add("dashed");
  currentTarget.classList.remove("solid");

  dataTransfer.setData("text", id);
}

function dragLeaveHandler(e) {
  const { currentTarget } = e;

  currentTarget.style.background = "";
}

function dragOverHandler(e) {
  e.preventDefault();
  const { currentTarget } = e;

  currentTarget.style.background = "lightblue";
}

function dropHandler(e) {
  console.log("drop");

  e.preventDefault();

  const {
    dataTransfer,
    target: { id },
    target,
  } = e;

  const idTransfer = dataTransfer.getData("text");
  const dragElement = document.getElementById(idTransfer);

  console.log(dragElement);

  if (idTransfer === "src_move" && id === "dest_move") {
    target.appendChild(dragElement);
  }
}

function dragEndHandler(e) {
  const { currentTarget } = e;
  currentTarget.classList.remove("dashed");
  currentTarget.classList.add("solid");
}

//Agregar escuchas
origen.addEventListener("dragstart", dragStartHandler);
origen.addEventListener("dragend", dragEndHandler);

destino.addEventListener("drop", dropHandler);
destino.addEventListener("dragover", dragOverHandler);
destino.addEventListener("dragleave", dragLeaveHandler);
