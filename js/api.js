import {fetchApi} from './fetch-api.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const getData = () => fetchApi(`${BASE_URL}${Route.GET_DATA}`);
const sendData = (form) => fetchApi(`${BASE_URL}${Route.SEND_DATA}k`, {
  method: Method.POST,
  body: new FormData(form)
});

export {getData, sendData};
