const API_URL = 'http://localhost:41062/www/utch-api-1/src/index.php?action=';

const table = document.getElementById('tbody');
const fragment = document.createDocumentFragment();

const insertRowData = (data) => {
  const { id, name, num, phone } = data;

  const trTable = document.createElement('tr');
  trTable.innerHTML = `
    <th scope="row">${num}</th>
    <td>${name}</td>
    <td>${data.document}</td>
    <td>${phone}</td>
    <td class="content-thumbnail p-3">
      <a href="./registrar_usuario.html?id=${id}" role="button" class="btn btn-outline-light me-1">📝</a>
      <button type="button" data-id="${id}" class="btn btn-outline-light me-1">❌</button>
    </td>
  `;
  fragment.appendChild(trTable);
  table.appendChild(fragment);
};

fetch(`${API_URL}user_list`, {
  method: 'GET',
})
  .then((response) => response.json())
  .then((res) => res.data.map((data, index) => {
    const insertData = {
      ...data,
      num: index + 1,
    };
    insertRowData(insertData);
  }));

table.addEventListener('click', e => {
  const userId = e.target.dataset.id;
  if (!userId) return {};

  fetch(`${API_URL}delete_user&id=${userId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((res) => {
      if (!res.error) table.removeChild(e.target.parentElement.parentElement);
    });
});