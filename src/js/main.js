const API_URL = 'http://localhost:41062/www/utch-api-1/src/index.php?action=';

const form = document.getElementById('form');
const divContainer = document.getElementById('container');

const feedbackAlert = (message, type) => {
  const fragment = document.createDocumentFragment();
  const alertElement = document.createElement('div');
  alertElement.classList.add('alert');
  alertElement.classList.add(`alert-${type}`);
  alertElement.appendChild(document.createTextNode(message));
  fragment.appendChild(alertElement);
  divContainer.prepend(fragment);
};

const postDataService = (data, method, module) => {
  fetch(`${API_URL}/${module}`, {
    method,
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.error) throw Error(res.msg);
      feedbackAlert(res.msg, 'success');
    })
    .catch((err) => feedbackAlert(err, 'danger'));
};

const formSendData = (event) => {
  event.preventDefault();
  const sendData = new FormData(form);

  postDataService(sendData, 'POST', 'users');
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const userId = location.search.split('id=').length > 1 ? location.search.split('id=')[1] : 0;
  const actionApi = !userId ? 'save_user' : `edit_user&id=${userId}`;

  fetch(`${API_URL}${actionApi}`, {
    method: 'POST',
    body: new FormData(form),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.error) throw Error(res.msg);
      feedbackAlert(res.msg, 'success');
    })
    .catch((err) => feedbackAlert(err, 'danger'));
});
