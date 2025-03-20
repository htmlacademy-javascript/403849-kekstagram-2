const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/e'
};

const getData = () => fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => Error());

const sendData = (form) => fetch(`${BASE_URL}${Route.SEND_DATA}`, {
    method: 'POST',
    body: new FormData(form)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => Error());

export {getData, sendData}
