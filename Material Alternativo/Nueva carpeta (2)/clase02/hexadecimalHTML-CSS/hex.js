const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const body = document.querySelector("body");
const color = document.querySelector(".color");

body.addEventListener("click", (e) => {
  const targetID = e.target.id;
  if (targetID === "btn") {
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      let index = getRandomNumber();
      hexColor += hex[index];
    }

    color.textContent = hexColor;
    body.style.backgroundColor = hexColor;
  }
});

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}

//console.log(Math.random());
//console.log(getRandomNumber());
