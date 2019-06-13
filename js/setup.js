'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var QUANTITY_WIZARDS = 4;
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');


var removeClassHidden = function (element) {
  element.classList.remove('hidden');
};

var userDialog = document.querySelector('.setup');
var setupSimilar = userDialog.querySelector('.setup-similar');


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

var addFragmentToDOM = function (count) { // Добавить фрагмент в разметку
  similarListElement.appendChild(createFragment(generateWizards(count)));
};

addFragmentToDOM(QUANTITY_WIZARDS);


removeClassHidden(userDialog);
removeClassHidden(setupSimilar);
