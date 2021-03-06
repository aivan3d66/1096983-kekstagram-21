'use strict';

const TIMEOUT_REQUEST = 100000;
const SUCCESS_CASE = `2`;
const ERROR_CASE = `4`;
const LOAD_REQUEST = `GET`;
const UPLOAD_REQUEST = `POST`;
const Url = {
  LOAD: `https://21.javascript.pages.academy/kekstagram/data`,
  UPLOAD: `https://21.javascript.pages.academy/kekstagram`
};

const ErrorCodesObj = {
  400: `Bad Request (400).`,
  401: `Unauthorized (401).`,
  402: `Payment Required (402).`,
  403: `Forbidden (403).`,
  404: `Not Found (404).`,
  405: `Method Not Allowed (405).`,
  406: `Not Acceptable (406).`,
  407: `Proxy Authentication Required (407).`,
  408: `Request Timeout (408).`,
  409: `Conflict (409).`,
  410: `Gone (410).`,
  411: `Length Required (411).`,
  412: `Precondition Failed (412).`,
  413: `Request Entity Too Large (413).`,
  414: `Request-URI Too Long (414).`,
  415: `Unsupported Media Type (415).`,
  416: `Requested Range Not Satisfiable (416).`,
  417: `Expectation Failed (417).`
};

const createXhr = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    const statusFirstNum = xhr.status.toString()[0];
    let errorMessage;

    switch (statusFirstNum) {
      case SUCCESS_CASE:
        onSuccess(xhr.response);
        break;

      case ERROR_CASE:
        errorMessage = ErrorCodesObj[xhr.status];
        break;

      default:
        errorMessage = `${xhr.statusText} (${xhr.status}).`;
        break;
    }

    if (errorMessage) {
      onError(errorMessage);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Ошибка соединения (001).`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Превышено время ожидания ответа от сервера (002).`);
  });

  xhr.timeout = TIMEOUT_REQUEST;

  return xhr;
};

const loadData = (onSuccess, onError) => {
  const loadXhr = createXhr(onSuccess, onError);

  loadXhr.open(LOAD_REQUEST, Url.LOAD);
  loadXhr.send();
};

const uploadData = (data, onSuccess, onError) => {
  const uploadXhr = createXhr(onSuccess, onError);

  uploadXhr.open(UPLOAD_REQUEST, Url.UPLOAD);
  uploadXhr.send(data);
};

window.backend = {
  load: loadData,
  upload: uploadData
};
