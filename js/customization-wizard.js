'use strict';

(function () {
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

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

  var updateWizards = function () {
    // var sameCoatAndEyesWizards = wizards.filter(function (it) {
    //   return it.colorCoat === currentCoatColor && it.colorEyes === currentEyesColor;
    // });
    // var sameCoatWizards = wizards.filter(function (it) {
    //   return it.colorCoat === currentCoatColor;
    // });
    // var sameEyesWizards = wizards.filter(function (it) {
    //   return it.colorEyes === currentEyesColor;
    // });

    // var filteredWizards = sameCoatAndEyesWizards.concat(sameCoatWizards).
    // concat(sameEyesWizards).concat(wizards);

    // var uniqueWizards = filteredWizards.filter(function (it, i) {
    //   return filteredWizards.indexOf(it) === i;
    // });

    var sortedWizards = wizards.sort(function (left, right) {
      return getRank(right) - getRank(left);
    });

    window.addWizardsToDOM(sortedWizards);
  };

  wizardCoat.addEventListener('click', function () {
    var inputWizardCoat = document.querySelector('input[name="coat-color"]');
    window.paintWizardPart.isCoat(wizardCoat, inputWizardCoat);
    currentCoatColor = inputWizardCoat.value;
    updateWizards();
  });

  wizardEyes.addEventListener('click', function () {
    var inputWizardEyes = document.querySelector('input[name="eyes-color"]');
    window.paintWizardPart.isEyes(wizardEyes, inputWizardEyes);
    currentEyesColor = inputWizardEyes.value;
    updateWizards();
  });

  wizardFireball.addEventListener('click', function () {
    var inputWizardFireball = document.querySelector('input[name="fireball-color"]');
    window.paintWizardPart.isFireball(wizardFireball, inputWizardFireball);
  });

  var successLoad = function (data) { // Добавить в DOM волшебников из полученных от сервера данных
    wizards = data;
    updateWizards();
    // window.addWizardsToDOM(wizards);
  };

  window.backend.load(successLoad, window.showError);
})();
