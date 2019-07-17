'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var setupSimilar = document.querySelector('.setup-similar');
  var QUANTITY_WIZARDS = 4;

  var renderWizard = function (wizard) { // Отрисовать волшебника
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

    return wizardElement;
  };

  var createFragment = function (wizards, quantity) { // Создать и заполнить фрагмент
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < quantity; i++) {
      var randomWizard = window.getRandomItem(wizards); // Получить случайного волшебника из массива волшебников
      fragment.appendChild(renderWizard(randomWizard));
    }

    return fragment;
  };

  var addWizardsToDOM = function (wizards, quantity) { // Добавить волшебников в разметку
    similarListElement.appendChild(createFragment(wizards, quantity));
  };

  var successHandler = function (wizards) { // Добавить в DOM волшебников из полученных от сервера данных
    addWizardsToDOM(wizards, QUANTITY_WIZARDS);
    window.removeClass(setupSimilar, 'hidden');
  };

  window.backend.load(successHandler, window.showError);
})();
