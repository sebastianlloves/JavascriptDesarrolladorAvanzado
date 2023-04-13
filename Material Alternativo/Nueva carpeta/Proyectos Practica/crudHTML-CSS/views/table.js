const vistaTable = (arr) => {
  const rows =
    arr.length > 0
      ? crearFilas(arr)
      : "<tr> <td colSpan='3'>Sin datos</td> </tr>";

  return `<div>
    <h3>Tabla de Datos</h3>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Casa</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </div>`;
};

const crearFilas = (arr) =>
  arr
    .map(
      (el) => `<tr>
        <td>${el.name}</td>
        <td>${el.house}</td>
        <td>
        <button
            class="btn btn-warning me-3" data-personaje="${el.id}" id="modificar">
            Editar
        </button>
        <button class="btn btn-danger" id="eliminar" data-personaje="${el.id}">
            Eliminar
        </button>
        </td>
    </tr>`
    )
    .join("");
