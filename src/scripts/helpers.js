export const formatMoney = (value) => {

  if(typeof(value) != 'string') {
    value = value.toFixed(2);
    value = value.toString();
  }

  value = value.replace(/[^0-9]/g, "");
  let getMoney = value.replace(/([0-9]{2})$/g, ",$1");

  if(getMoney.length > 6) {
    getMoney = getMoney.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  return getMoney;
}

export const resetFields = () => {
  const fields = document.querySelectorAll('input, input[type=radio], select');

  for(let i = 0; i < fields.length; i++) {
    fields[i].value = '';
    fields[i].checked = false;
  }
}

export const notify = (type, title, message) => {
  let color = '';

  switch (type) {
    case 'error':
      color = "#FF6D78"
      break;
    case 'warning':
      color = "#FC9F63"
      break;
    case 'success':
      color = "#4BB543"
      break;
  }

  const notifyComponent = `
    <div class="notify" style="background: ${color}">
      <span>${title}</span>
      <p>${message}</p>
    </div>
  `;

  const div = document.createElement("div");
  div.innerHTML = notifyComponent;
  document.querySelector("body").appendChild(div);

  setTimeout(() => {
    document.querySelector("body").removeChild(div);
  }, 2000);
}