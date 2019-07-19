'use strict';

window.util = (function () {
  var Keycode = {
    ESC: 27,
    ENTER: 12
  };

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ESC) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === Keycode.ENTER) {
        action();
      }
    }
  };
})();
