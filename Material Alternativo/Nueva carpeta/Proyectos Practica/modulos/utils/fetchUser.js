const URL = "https://randomuser.me/api/";

const asyncFetch = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error, status = ${response.status}`);
  }
  return response.json();
};

const getUser = async () => {
  try {
    const data = await asyncFetch(URL);
    // destructure
    const person = data.results[0];
    const { phone, email } = person;
    const { large: image } = person.picture;
    const { password } = person.login;
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;
    return {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };
  } catch (error) {
    console.log(error);
  }
};

export default getUser;
