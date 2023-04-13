export const asyncFetch = async (url) => {
  const res = await fetch(url);

  if (!res.ok) throw new Error("Error en la petición");

  return await res.json();
};
