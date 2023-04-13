export const asyncFetch = async (url) => {
  const regExp = /\.(html)$/i;
  const type = regExp.test(url) ? "text" : "json";

  switch (type) {
    case "text": {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${response.status}`);
      }
      return response.text();
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
