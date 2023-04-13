//Referencias del HTML
const origen = document.getElementById("src_move");
const destino = document.getElementById("dest_move");

//Funciones Callback
function dragStartHandler(e) {}

function dragOverHandler(e) {}

function dropHandler(e) {}

function dragEndHandler(e) {}

//Agregar escuchas
origen.addEventListener("dragstart", dragStartHandler);
origen.addEventListener("dragend", dragEndHandler);

destino.addEventListener("drop", dropHandler);
destino.addEventListener("dragover", dragOverHandler);
