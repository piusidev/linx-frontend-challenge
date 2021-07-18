//This function call API and return the data

export const getContent = async (page) => {
  const url = `https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=${page}`;
  let content = null;

  await fetch(url)
  .then(response => response.json())
  .then(data => {
    content = data.products;
  })
  .catch(error => {
    console.log(error);
  })

  return content;
}
