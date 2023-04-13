import view from "./home.html?raw";
import javascriptLogo from "../javascript.svg";

export const home = () => {
  const addImage = view.replace("javascriptLogo", `${javascriptLogo}`);
  return addImage;
};
