import inicio from "./inicio/inicio";
import contacto from "./contacto/contacto";

export default (route) => {
  const $content = document.querySelector("main");
  $content.innerHTML = "";

  switch (route) {
    case "#inicio":
      $content.appendChild(inicio());
      break;
    case "#contacto":
      $content.innerHTML = contacto();
      break;
    default:
      $content.appendChild(inicio());
      break;
  }
};
