'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var QUANTITY_WIZARDS = 4;
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var setupSimilar = document.querySelector('.setup-similar');


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

  window.removeClass(setupSimilar, 'hidden');

  // Кастомизация волшебника

  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var getRandomColorForWizardPart = function (elem, painting, array, input) {
    elem.style[painting] = getRandomItem(array);
    input.value = elem.style[painting];
  };

  wizardCoat.addEventListener('click', function () {
    var inputWizardCoat = document.querySelector('input[name="coat-color"]');
    getRandomColorForWizardPart(wizardCoat, 'fill', COAT_COLORS, inputWizardCoat);
  });

  wizardEyes.addEventListener('click', function () {
    var inputWizardEyes = document.querySelector('input[name="eyes-color"]');
    getRandomColorForWizardPart(wizardEyes, 'fill', EYE_COLORS, inputWizardEyes);
  });

  wizardFireball.addEventListener('click', function () {
    var inputWizardFireball = document.querySelector('input[name="fireball-color"]');
    getRandomColorForWizardPart(wizardFireball, 'backgroundColor', FIREBALL_COLORS, inputWizardFireball);
  });
})();
