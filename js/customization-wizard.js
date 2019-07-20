'use strict';

(function () {
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var wizard = {
    onCoatChange: function (color) {},
    onEyesChange: function (color) {}
  };

  wizardCoat.addEventListener('click', function () {
    var inputWizardCoat = document.querySelector('input[name="coat-color"]');
    window.paintWizardPart.isCoat(wizardCoat, inputWizardCoat);
    wizard.onCoatChange(inputWizardCoat.value);
  });

  wizardEyes.addEventListener('click', function () {
    var inputWizardEyes = document.querySelector('input[name="eyes-color"]');
    window.paintWizardPart.isEyes(wizardEyes, inputWizardEyes);
    wizard.onEyesChange(inputWizardEyes.value);
  });

  wizardFireball.addEventListener('click', function () {
    var inputWizardFireball = document.querySelector('input[name="fireball-color"]');
    window.paintWizardPart.isFireball(wizardFireball, inputWizardFireball);
  });

  window.wizard = wizard;
})();
