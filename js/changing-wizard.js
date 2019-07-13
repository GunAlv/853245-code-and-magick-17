'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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

  window.generateWizards = function (count) { // Создать массив волшебников
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

  // Функции для изменения мага главного игрока

  var getRandomColorForWizardPart = function (elem, painting, array, input) {
    elem.style[painting] = getRandomItem(array);
    input.value = elem.style[painting];
  };

  window.paintWizardPart = {
    isCoat: function (elem, input) {
      getRandomColorForWizardPart(elem, 'fill', COAT_COLORS, input);
    },

    isEyes: function (elem, input) {
      getRandomColorForWizardPart(elem, 'fill', EYE_COLORS, input);
    },

    isFireball: function (elem, input) {
      getRandomColorForWizardPart(elem, 'backgroundColor', FIREBALL_COLORS, input);
    }
  };
})();
