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
  const fields = document.querySelectorAll('input, select');

  for(i = 0; i < fields.length; i++) {
    fields[i].value = ''
  }
}
