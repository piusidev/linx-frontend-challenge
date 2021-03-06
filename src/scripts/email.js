import { getContent } from "./api.js";
import { formatMoney } from "./helpers.js"; 

//Listing only two elements of array
const listEmailProducts = async (page) => {
  const content = await getContent(page);
  const products = content.products;
  
  products.slice(0, 2).forEach(element => {
    const card = `
      <div class="card" id="${element.id}">
        <div class="image-container">
          <img src="http://${element.image}">
        </div>
        <div class="info-container">
          <h5>${element.name}</h5>
          <p>${element.description}</p>
          <div class="price">
            <span>De: R$${formatMoney(element.oldPrice)}</span>
            <span>Por: R$${formatMoney(element.price)}</span>
            <span>ou ${element.installments.count}x de R$${formatMoney(element.installments.value)}</span>
          </div>
          <button class="button">Comprar</button>
        </div>
      </div>
    `
    document.getElementById('products').innerHTML += card;
  });
}

window.onload = () => {
  listEmailProducts();
}