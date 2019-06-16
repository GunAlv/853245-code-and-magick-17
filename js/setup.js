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
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');

var onModalEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeModal();
  }
};

var openModal = function () {
  removeClassHidden(setupModal);

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
