'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var setupSimilar = document.querySelector('.setup-similar');
  var QUANTITY_WIZARDS = 4;

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

  addWizardsToDOM(window.generateWizards(QUANTITY_WIZARDS));

  window.removeClass(setupSimilar, 'hidden');
})();
