'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var QUANTITY_WIZARD_OBJEST = 4;
var wizards = [];

var removeClassHidden = function (element) {
  element.classList.remove('hidden');
};

var userDialog = document.querySelector('.setup');
var setupSimilar = userDialog.querySelector('.setup-similar');


var getRandomIndex = function (array) { // Получить случайный индекс из массива
  return array[Math.floor(Math.random() * array.length)];
};

var reverseNameAndSurname = function () { // Поменять местами имя и фамилию
  var randomNumber = Math.floor(Math.random() * 2);

  if (randomNumber === 1) {
    return getRandomIndex(WIZARD_NAMES) + ' ' + getRandomIndex(WIZARD_SURNAMES);
  }

  return getRandomIndex(WIZARD_SURNAMES) + ' ' + getRandomIndex(WIZARD_NAMES);
};


var generateWizards = function () { // Создать массив волшебников
  for (var i = 0; i < QUANTITY_WIZARD_OBJEST; i++) {
    wizards.push({
      name: reverseNameAndSurname(),
      coatColor: getRandomIndex(COAT_COLORS),
      eyeColor: getRandomIndex(EYE_COLORS)
    });
  }

  return wizards;
};


// Далее функции создания волшебников на основе полученных данных

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) { // Отрисовать волшебника
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

  return wizardElement;
};


var similarListElement = document.querySelector('.setup-similar-list');

var createSimilarWizards = function () { // Создать похожих волшебников
  var fragment = document.createDocumentFragment();
  generateWizards();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

createSimilarWizards();

removeClassHidden(userDialog);
removeClassHidden(setupSimilar);
