import { getContent } from "./api.js";

const listProducts = async () => {
  const products = await getContent();

  products.forEach(element => {
    console.log(element)
  });

}

window.onload = () => {
  listProducts();
};