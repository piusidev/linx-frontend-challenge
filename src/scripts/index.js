import { getContent } from "./api.js";

const listProducts = async (page) => {
  const content = await getContent(page);
  const products = content.products
  
  products.forEach(element => {
    const card = `
      <div class="card" id="${element.id}">
        <div class="image-container">
          <img src="http://${element.image}">
        </div>
        <h5>${element.name}</h5>
        <p>${element.description}</p>
        <div class="price">
          <span>De:</span>
          <span>Por: R$19,99</span>
          <span>ou ${element.installments.count} de R$9,99</span>
        </div>
        <button class="button">Comprar</button>
      </div>
    `
    document.getElementById('products').innerHTML += card;
  });
}

window.onload = () => {
  listProducts();
};