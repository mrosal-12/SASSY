
const form = document.querySelector('#form');
const output = document.querySelector('#debug')

output.innerText = JSON.stringify(getData(form));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = getData(event.currentTarget);
  console.log('submit', data);
});


form.addEventListener('change', (event) => {
  const data = getData(event.currentTarget)
  console.log('change', data);

  output.innerText = JSON.stringify(data);
  console.log(Array.from(new FormData(event.currentTarget)))
});


function getData(elem) {
  const formData = new FormData(elem);
  return Object.fromEntries(formData.entries());
}