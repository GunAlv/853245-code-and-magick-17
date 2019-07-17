'use strict';

(function () {
  window.showError = function (errorMessage) {
    var divError = document.createElement('div');
    divError.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    divError.style.position = 'absolute';
    divError.style.left = 0;
    divError.style.right = 0;
    divError.style.fontSize = '30px';
    divError.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', divError);
  };
})();
