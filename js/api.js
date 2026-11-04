const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const load = (route, errorText, method = Method.GET, body = null) => {
  const options = { method };
  if (body) {
    options.body = body;
  }

  return fetch(`${BASE_URL}${route}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return method === Method.GET ? response.json() : response;
    })
    .catch(() => {
      throw new Error(errorText);
    });
};

const getData = () => load(Route.GET_DATA, 'Не удалось загрузить данные. Попробуйте обновить страницу');

const sendData = (body) => load(Route.SEND_DATA, 'Не удалось отправить форму. Попробуйте еще раз', Method.POST, body);

export { getData, sendData };
