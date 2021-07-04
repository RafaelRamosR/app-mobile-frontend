const selectDocument = document.getElementById('select-document');
const inputPhone = document.getElementById('phone');
const inputName = document.getElementById('name');
const inputLastName = document.getElementById('lastName');

const insertSelectData = (text, value) => {
  const fragment = document.createDocumentFragment();
  const options = document.createElement('option');
  options.setAttribute('value', value);
  options.appendChild(document.createTextNode(text));
  fragment.appendChild(options);
  selectDocument.appendChild(fragment);
};

const initialStateForm = (data) => {
  selectDocument.value = data.document;
  inputPhone.value = data.phone;
  inputName.value = data.name;
  inputLastName.value = data.lastName;
}

fetch(`${API_URL}documents`, {
  method: 'GET',
})
  .then((response) => response.json())
  .then((res) => res.data.map((e) => insertSelectData(e.name, e.id)));

if (location.search.split('id=').length > 1) {
  const userId = location.search.split('id=')[1];

  fetch(`${API_URL}user&id=${userId}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((res) => initialStateForm(res.data[0]));
}
