import { getContent } from "./api.js";
import { formatMoney, notify, resetFields, validateEmail } from "./helpers.js"; 


//The received param is the next page of API
const listProducts = async (page) => {
  const content = await getContent(page);
  const products = content.products;
  
  //Create a card for each element in array
  products.forEach(element => {
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

//Get the button prop, increased +1 and call
//the function that list products with new page
const moreProducts = async () => {
  const button = document.getElementById('more-products');
  let page = button.getAttribute('data-page');
  page = parseInt(page);
  button.setAttribute('data-page', ++page);

  listProducts(page);
}

const collapse = () => {
  const content = document.getElementById('content');
  const arrow = document.getElementById('arrow');

  content.classList.toggle('collapse');
  arrow.classList.toggle('spin');
}

//Check all inputs and notify if empty, else, send data
const sendForm = () => {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const doc = document.getElementById('doc');
  let gender = document.getElementsByName('gender');
  
  for(let i = 0; i < gender.length; i++) {
    if(gender[i].checked) {
      gender = true;
    }
  }

  if(name.value == '') {
    notify('warning', 'Campos vazios!', 'Informe seu nome');
    name.focus();
    return
  }

  if(email.value == '') {
    notify('warning', 'Campos vazios!', 'Informe seu email');
    email.focus();
    return
  }else if(validateEmail(email.value) !== true ) {
    notify('warning', 'Campos vazios!', 'Informe um email válido');
    email.focus();
    return
  }

  if(doc.value == '') {
    notify('warning', 'Campos vazios!', 'Informe seu CPF');
    doc.focus();
    return
  }

  if(gender !== true) {
    notify('warning', 'Campos vazios!', 'Informe seu genero');
    return
  }

  notify('success', 'Sucesso!', 'Obrigado por contribuir com o algorítimo');
  resetFields();
}

//Check all inputs and notify if empty, else, send data
const friendShare = () => {
  const name = document.getElementById('friend-name');
  const email = document.getElementById('friend-email');

  if(name.value == '') {
    notify('warning', 'Campos vazios!', 'Informe um nome');
    name.focus();
    return
  }

  if(email.value == '') {
    notify('warning', 'Campos vazios!', 'Informe um email');
    email.focus();
    return
  }else if(validateEmail(email.value) !== true ) {
    notify('warning', 'Campos vazios!', 'Informe um email válido');
    email.focus();
    return
  }

  notify('success', 'Sucesso!', `Lista enviada para o(a) ${name.value}`);
  resetFields();
}

//expose functions for global scope
window.moreProducts = moreProducts;
window.collapse = collapse;
window.sendForm = sendForm;
window.friendShare = friendShare;

window.onload = () => {
  listProducts();
};