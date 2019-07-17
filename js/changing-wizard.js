'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  window.getRandomItem = function (array) { // Получить случайный элемент массива
    return array[Math.floor(Math.random() * array.length)];
  };

  // Функции для изменения мага главного игрока

  var getRandomColorForWizardPart = function (elem, painting, array, input) {
    input.value = window.getRandomItem(array);
    elem.style[painting] = input.value;
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
