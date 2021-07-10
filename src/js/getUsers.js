const API_URL = 'http://localhost:41062/www/utch-api-1/src/index.php?action=';

const main = document.getElementById('main');
const fragment = document.createDocumentFragment();

const insertUserCard = (data) => {
  const { id, name, phone } = data;
  const divUserContent = document.createElement('div');
  divUserContent.classList.add('card-user');
  divUserContent.classList.add('glass');
  divUserContent.classList.add('mb-3');
  divUserContent.classList.add('p-2');

  divUserContent.innerHTML = `
    <div class="d-flex align-items-center">
      <div class="image pe-3">
        <img
          src="./img/avatars/${id % 10}.png"
          class="avatar-img rounded"
          width="155"
        />
      </div>
      <div class="me-3">
        <h2 class="title mb-0 mt-0">${name}</h2>
        <span class="subtitle text-muted">${phone}</span>
        <div class="d-flex flex-column mb-3">
          <span class="title">Documento</span>
          <span class="subtitle text-muted">${data.document}</span>
        </div>
        <div class="mb-2">
          <a href="./registrar_usuario.html?id=${id}" role="button" class="btn btn-sm btn-outline-primary me-1">
            Editar
          </a>
          <button data-id="${id}" class="btn btn-sm btn-outline-danger me-1">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  `;
  fragment.appendChild(divUserContent);
  main.appendChild(fragment);
};

fetch(`${API_URL}user_list`, {
  method: 'GET',
})
  .then((response) => response.json())
  .then((res) => res.data.map((data, index) => insertUserCard(data)));

main.addEventListener('click', (e) => {
  const userId = e.target.dataset.id;

  if (!userId) return {};

  fetch(`${API_URL}delete_user&id=${userId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((res) => {
      if (!res.error)
        main.removeChild(
          e.target.parentElement.parentElement.parentElement.parentElement
        );
    });
});
