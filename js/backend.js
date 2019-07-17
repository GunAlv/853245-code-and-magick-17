'use strict';

(function () {
  var catchErrors = function (xhr, onLoad, onError) {
    var error;

    switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;

      case 400:
        error = 'Неверный запрос';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      case 500:
        error = 'Ошибка сервера';
        break;

      default:
        error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
    }

    if (error) {
      onError(error);
    }
  };

  var connectionError = function (onError) {
    onError('Произошла ошибка соединения');
  };

  var getRequest = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      catchErrors(xhr, onLoad, onError);
    });

    xhr.addEventListener('error', function () {
      connectionError(onError);
    });

    xhr.open(method, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  window.backend = {
    load: function (onLoad, onError) {
      getRequest('https://js.dump.academy/code-and-magick/data', 'GET', onLoad, onError);
    },

    save: function (data, onLoad, onError) {
      getRequest('https://js.dump.academy/code-and-magick', 'POST', onLoad, onError, data);
    }
  };
})();
