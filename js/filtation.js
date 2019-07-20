'use strict';

(function () {
  var wizards = [];
  var currentCoatColor;
  var currentEyesColor;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === currentCoatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === currentEyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    var sortedWizards = wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }

      return rankDiff;
    });

    window.wizards.removeWizardsFromDOM();
    window.wizards.addWizardsToDOM(sortedWizards);
  };

  window.wizard.onCoatChange = function (color) {
    currentCoatColor = color;
    window.debounce(updateWizards);
  };

  window.wizard.onEyesChange = function (color) {
    currentEyesColor = color;
    window.debounce(updateWizards);
  };

  var successLoad = function (data) { // Добавить в DOM волшебников из полученных от сервера данных
    wizards = data;
    window.wizards.addWizardsToDOM(wizards);
  };

  window.backend.load(successLoad, window.showError);
})();
