'use strict';

(function () {

  // Перетаскивание окна волшебника
  var setupModal = document.querySelector('.setup');
  var userAvatar = document.querySelector('.upload');

  userAvatar.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var setupModalTopPosition = (setupModal.offsetTop - shift.y) + 'px';
      var setupModalLeftPosition = (setupModal.offsetLeft - shift.x) + 'px';

      window.getDraggedElementPosition(setupModal, setupModalTopPosition, setupModalLeftPosition);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onUserAvatarUpload = function (uploadEvt) {
          uploadEvt.preventDefault();
          userAvatar.removeEventListener('click', onUserAvatarUpload);
        };

        userAvatar.addEventListener('click', onUserAvatarUpload);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Перетаскивание артефактов

  var setupModalShop = setupModal.querySelector('.setup-artifacts-shop');

  setupModalShop.addEventListener('mousedown', function (evt) {

    if (evt.target.tagName === 'IMG') {
      var currentArtifact = evt.target;
      currentArtifact.style.position = 'absolute';
      currentArtifact.style.zIndex = '5';
    }

    var startCoords = {
      x: currentArtifact.clientX,
      y: currentArtifact.clientY
    };

    var onArtifactMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentArtifactTopPosition = (currentArtifact.offsetTop - shift.y) + 'px';
      var currentArtifactLeftPosition = (currentArtifact.offsetLeft - shift.x) + 'px';

      window.getDraggedElementPosition(currentArtifact, currentArtifactTopPosition, currentArtifactLeftPosition);
    };

    var onArtifactUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onArtifactMove);
      document.removeEventListener('mouseup', onArtifactUp);

      var artifactsSlot = setupModalShop.querySelectorAll('.setup-artifacts-cell');
      var slotsBackpack = setupModal.querySelectorAll('.setup-artifacts > .setup-artifacts-cell');

      for (var i = 0; i < artifactsSlot.length; i++) {
        artifactsSlot[i].removeChild(currentArtifact);
        window.getDraggedElementPosition(currentArtifact, 0, 0);
        slotsBackpack[i].appendChild(currentArtifact);
      }
    };

    document.addEventListener('mousemove', onArtifactMove);
    document.addEventListener('mouseup', onArtifactUp);
  });
})();
