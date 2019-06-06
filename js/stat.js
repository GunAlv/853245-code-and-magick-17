'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CONGRATULATION_GAP = 120;
var CLOUD_GAP = 10;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var BAR_WIDTH = 40;
var BAR_X = 140;
var BAR_Y = 250;
var BAR_GAP = 100;
var NAME_Y = 270;
var TEXT_GAP = 98;
var TIME_GAP = 30;
var MAX_BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y) {
  ctx.font = '16px PT Mono';
  ctx.strokeText(text, x, y);
};

var getMaxElement = function (array) {
  var maxElement = array[0];

  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }

  return maxElement;
};

var getRandomColor = function (playerName) {
  if (playerName === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  } else {
    var randomSaturation = (Math.random() * (1 - 0.1)) + 0.1;
    return 'rgba(0, 0, 255, ' + randomSaturation + ')';
  }
};


window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)'); // Отрисовка тени
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff'); // Отрисовка облака
  renderText(ctx, 'Ура, вы победили!', CONGRATULATION_GAP, 40);
  renderText(ctx, 'Список результатов:', CONGRATULATION_GAP, 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = getRandomColor(players[i]);

    var timesText = Math.round(times[i]);
    var columnHeight = timesText * MAX_BAR_HEIGHT / maxTime;

    ctx.fillRect(BAR_X + (BAR_GAP * i), BAR_Y, BAR_WIDTH, columnHeight * (-1));
    renderText(ctx, players[i], BAR_X + (TEXT_GAP * i), NAME_Y); // Отрисовка имен игроков
    renderText(ctx, timesText, BAR_X + (TEXT_GAP * i), CLOUD_HEIGHT - columnHeight - TIME_GAP); // Отрисовка времени их прохождения
  }
};
