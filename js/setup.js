'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var QUANTITY_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');
var setupSimilar = document.querySelector('.setup-similar');


var removeClassHidden = function (element) {
  element.classList.remove('hidden');
};

var getRandomItem = function (array) { // Получить случайный элемент массива
  return array[Math.floor(Math.random() * array.length)];
};

var reverseNameAndSurname = function () { // Поменять местами имя и фамилию
  var randomNumber = Math.floor(Math.random() * 2);

  if (randomNumber === 1) {
    return getRandomItem(WIZARD_NAMES) + ' ' + getRandomItem(WIZARD_SURNAMES);
  }

  return getRandomItem(WIZARD_SURNAMES) + ' ' + getRandomItem(WIZARD_NAMES);
};


var generateWizards = function (count) { // Создать массив волшебников
  var wizards = [];

  for (var i = 0; i < count; i++) {
    wizards.push({
      name: reverseNameAndSurname(),
      coatColor: getRandomItem(COAT_COLORS),
      eyeColor: getRandomItem(EYE_COLORS)
    });
  }

  return wizards;
};


var renderWizard = function (wizard) { // Отрисовать волшебника
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

  return wizardElement;
};

var createFragment = function (wizards) { // Создать и заполнить фрагмент
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  return fragment;
};

var addWizardsToDOM = function (wizards) { // Добавить волшебников в разметку
  similarListElement.appendChild(createFragment(wizards));
};

addWizardsToDOM(generateWizards(QUANTITY_WIZARDS));

removeClassHidden(setupSimilar);


// Функции открытия/закрытия модального окна


var setupModal = document.querySelector('.setup');

setupModal.classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');

var getDraggedElementPosition = function (draggedElement, top, left) { // Получить исходную позицию модального окна
  draggedElement.style.top = top;
  draggedElement.style.left = left;
};

var onModalEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeModal();
  }
};

var openModal = function () {
  removeClassHidden(setupModal);

  getDraggedElementPosition(setupModal, '80px', '50%');

  document.addEventListener('keydown', onModalEscPress);
};

var closeModal = function () {
  setupModal.classList.add('hidden');

  document.removeEventListener('keydown', onModalEscPress);
};

setupOpen.addEventListener('click', function () {
  openModal();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openModal();
  }
});

setupClose.addEventListener('click', function () {
  closeModal();
});

setupClose.addEventListener('keydown', onModalEscPress);

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeModal();
  }
});

// Функция валидации

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


// Функции кастомизации волшебника игрока

var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var inputWizardCoat = setupModal.querySelector('input[name="coat-color"]');
var wizardEyes = setupModal.querySelector('.wizard-eyes');
var inputWizardEyes = setupModal.querySelector('input[name="eyes-color"]');
var wizardFireball = setupModal.querySelector('.setup-fireball-wrap');
var inputWizardFireball = setupModal.querySelector('input[name="fireball-color"]');

var getRandomColorForWizardPart = function (elem, painting, array, input) {
  elem.style[painting] = getRandomItem(array);
  input.value = elem.style[painting];
};

wizardCoat.addEventListener('click', function () {
  getRandomColorForWizardPart(wizardCoat, 'fill', COAT_COLORS, inputWizardCoat);
});

wizardEyes.addEventListener('click', function () {
  getRandomColorForWizardPart(wizardEyes, 'fill', EYE_COLORS, inputWizardEyes);
});

wizardFireball.addEventListener('click', function () {
  getRandomColorForWizardPart(wizardFireball, 'backgroundColor', FIREBALL_COLORS, inputWizardFireball);
});


// Функция перетаскивания модального окна

var userAvatar = document.querySelector('.upload');

userAvatar.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var dragged = false;

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var setupModalTopPosition = (setupModal.offsetTop - shift.y) + 'px';
    var setupModalLeftPosition = (setupModal.offsetLeft - shift.x) + 'px';

    getDraggedElementPosition(setupModal, setupModalTopPosition, setupModalLeftPosition);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onUserAvatarUpload = function (uploadEvt) {
        uploadEvt.preventDefault();
        userAvatar.removeEventListener('click', onUserAvatarUpload);
      };

      userAvatar.addEventListener('click', onUserAvatarUpload);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


// // Функция перетаскивания артефактов

var setupModalShop = setupModal.querySelector('.setup-artifacts-shop');

setupModalShop.addEventListener('mousedown', function (evt) {

  if (evt.target.tagName === 'IMG') {
    var currentArtifact = evt.target;
    currentArtifact.style.position = 'absolute';
    currentArtifact.style.zIndex = '5';
  }

  var startCoords = {
    x: currentArtifact.clientX,
    y: currentArtifact.clientY
  };

  var onArtifactMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var currentArtifactTopPosition = (currentArtifact.offsetTop - shift.y) + 'px';
    var currentArtifactLeftPosition = (currentArtifact.offsetLeft - shift.x) + 'px';

    getDraggedElementPosition(currentArtifact, currentArtifactTopPosition, currentArtifactLeftPosition);
  };

  var onArtifactUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onArtifactMove);
    document.removeEventListener('mouseup', onArtifactUp);

    var artifactsSlot = setupModalShop.querySelectorAll('.setup-artifacts-cell');
    var slotsBackpack = setupModal.querySelectorAll('.setup-artifacts > .setup-artifacts-cell');

    // Звезда переносится в рюкзак только при клике. В ином случае она улетает в небытие
    for (var i = 0; i < artifactsSlot.length; i++) {
      artifactsSlot[i].removeChild(currentArtifact);
      slotsBackpack[i].appendChild(currentArtifact);
    }
  };

  document.addEventListener('mousemove', onArtifactMove);
  document.addEventListener('mouseup', onArtifactUp);
});

