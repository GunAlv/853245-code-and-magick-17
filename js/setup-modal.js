'use strict';

(function () {
  var setupModal = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');

  window.getDraggedElementPosition = function (draggedElement, top, left) { // Получить исходную позицию модального окна
    draggedElement.style.top = top;
    draggedElement.style.left = left;
  };

  var onModalEscPress = function (evt) {
    window.util.isEscEvent(evt, closeModal);
  };

  window.removeClass = function (element, className) {
    element.classList.remove(className);
  };

  window.addClass = function (element, className) {
    element.classList.add(className);
  };

  var openModal = function () {
    window.removeClass(setupModal, 'hidden');
    window.getDraggedElementPosition(setupModal, '80px', '50%');
    document.addEventListener('keydown', onModalEscPress);
  };

  var closeModal = function () {
    window.addClass(setupModal, 'hidden');

    document.removeEventListener('keydown', onModalEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openModal();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openModal);
  });

  setupClose.addEventListener('click', function () {
    closeModal();
  });

  setupClose.addEventListener('keydown', onModalEscPress);

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeModal);
  });

  // Валидация

  var userNameInput = setupModal.querySelector('.setup-user-name');

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25 символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onModalEscPress);
  });
})();
