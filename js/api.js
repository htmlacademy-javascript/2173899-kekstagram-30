
const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';
const ServerRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [HttpMethod.GET]: 'Не удалось загрузить данные',
  [HttpMethod.POST]: 'Ошибка загрузки файла',
};

const request = async (url, method = HttpMethod.GET, body = null) => {
  const response = await fetch(url, { method, body });
  if (! response.ok) {
    throw new Error(ErrorText[method]);
  }

  return response.json();
};

const loadData = async () => request(SERVER_URL + ServerRoute.GET_DATA);


const sendData = async (pictureData) => request(
  SERVER_URL + ServerRoute.SEND_DATA,
  HttpMethod.POST,
  pictureData,
);

export { loadData, sendData };
