'use strict';

var removeClassHidden = function (element) {
  element.classList.remove('hidden');
};

var userDialog = document.querySelector('.setup');
var setupSimilar = userDialog.querySelector('.setup-similar');

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
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
  var changedArrayOfNames = mixArray(wizardNames);
  var changedArrayOfSurnames = mixArray(wizardSurnames);

  for (var i = 0; i < wizardNames.length; i++) {
    mixedNames.push(changedArrayOfNames[i] + ' ' + changedArrayOfSurnames[i]);
  }

  return mixedNames;
};


var wizards = [];

var createWizardObject = function (array, wizardName, colorOfCoat, colorOfEye) { // Создать объект массива волшебников
  array = {
    name: wizardName,
    coatColor: colorOfCoat,
    eyeColors: colorOfEye
  };

  return array;
};

var createWizardArray = function (quantityOfObjects) { // Создать массив волшебников wizards на основе сгенерированных объектов
  for (var i = 0; i < quantityOfObjects; i++) {
    var wizardObjest = createWizardObject(wizards[i], getRandomName()[i], mixArray(coatColors)[i], mixArray(eyeColors)[i]);
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
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColors;
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

var createSimilarWizards = function () {
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

createSimilarWizards();


removeClassHidden(userDialog);
removeClassHidden(setupSimilar);
