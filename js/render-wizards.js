'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');
  var setupSimilar = document.querySelector('.setup-similar');
  var CELLS_FOR_RENDERED_WIZARDS = 4;

  var renderWizard = function (wizard) { // Отрисовать волшебника
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;

    return wizardElement;
  };

  var createFragment = function (data) { // Создать и заполнить фрагмент
    var fragment = document.createDocumentFragment();
    var quantity;

    if (data.length > CELLS_FOR_RENDERED_WIZARDS) { // Проверка на тот случай, если сервер даст меньше 4 магов
      quantity = CELLS_FOR_RENDERED_WIZARDS;
    } else {
      quantity = data.length;
    }

    for (var i = 0; i < quantity; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    return fragment;
  };

  var addWizardsToDOM = function (data) { // Добавить волшебников в разметку
    window.removeClass(setupSimilar, 'hidden');
    similarListElement.appendChild(createFragment(data));
  };

  window.addWizardsToDOM = addWizardsToDOM;
})();
