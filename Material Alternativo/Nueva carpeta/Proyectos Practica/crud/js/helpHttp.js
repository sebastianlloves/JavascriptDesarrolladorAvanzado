const helpHttp = () => {
  //Función que se encarga de configurar .fetch
  const customFetch = async (endpoint, options) => {
    //header por default en caso de que no se pase
    const defaultHeader = {
      accept: "application/json",
    };

    //Configuración de la llamada
    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    //Retorno de la Promesa con manejo de error en Promesa
    return await fetch(endpoint, options).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject({
            err: true,
            status: res.status || "00",
            statusText: res.statusText || "Ocurrió un error",
          })
    );
  };

  //Función que maneja el verbo GET
  const get = (url, options = {}) => customFetch(url, options);

  //Función que maneja el verbo POST
  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  //Función que maneja el verbo PUT
  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  //Función que maneja el verbo DELETE
  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  //Retorno de las funciones que manejan los verbos AJAX
  return {
    get,
    post,
    put,
    del,
  };
};
