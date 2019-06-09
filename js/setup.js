'use strict';

var removeClassHidden = function (element) {
  element.classList.remove('hidden');
};

var userDialog = document.querySelector('.setup');
var setupSimilar = userDialog.querySelector('.setup-similar');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var QUANTITY_WIZARD_OBJEST = 4;


var mixArray = function (array) { // Перемешать массив
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

var getRandomName = function () { // Получить массив случайно смиксованных имен и фамилий
  var mixedNames = [];
  var changedArrayOfNames = mixArray(WIZARD_NAMES);
  var changedArrayOfSurnames = mixArray(WIZARD_SURNAMES);

  for (var i = 0; i < WIZARD_NAMES.length; i++) {
    mixedNames.push(changedArrayOfNames[i] + ' ' + changedArrayOfSurnames[i]);
  }

  return mixedNames;
};


var wizards = [];

var createWizardObject = function (array, wizardName, colorOfCoat, colorOfEye) { // Создать объект массива волшебников
  array = {
    name: wizardName,
    coatColor: colorOfCoat,
    eyeColor: colorOfEye
  };

  return array;
};

var createWizardArray = function (quantityOfObjects) { // Создать массив волшебников wizards на основе сгенерированных объектов
  for (var i = 0; i < quantityOfObjects; i++) {
    var wizardObjest = createWizardObject(wizards[i], getRandomName()[i], mixArray(COAT_COLORS)[i], mixArray(EYE_COLORS)[i]);
    wizards.push(wizardObjest);
  }

  return wizards;
};

createWizardArray(QUANTITY_WIZARD_OBJEST);

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


var renderWizard = function (wizard) { // Отрисовать волшебника
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

var createSimilarWizards = function () { // Создать похожих волшебников
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

createSimilarWizards();


removeClassHidden(userDialog);
removeClassHidden(setupSimilar);
