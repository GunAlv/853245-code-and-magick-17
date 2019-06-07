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
var TEXT_GAP = 25;
var MAX_BAR_HEIGHT = 150;

var renderRect = function (ctx, x, y, rectWith, rectHeight, color) {
  if (color) {
    ctx.fillStyle = color;
  }

  ctx.fillRect(x, y, rectWith, rectHeight);
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

var getRandomColorOfPlayer = function (playerName) {
  if (playerName === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  }

  var randomSaturation = Math.floor(Math.random() * (101 - 15) + 15);
  return 'hsl(243, ' + randomSaturation + '%,' + ' 50%)';
};


window.renderStatistics = function (ctx, players, times) {
  renderRect(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)'); // Отрисовка тени
  renderRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff'); // Отрисовка облака
  renderText(ctx, 'Ура, вы победили!', CONGRATULATION_GAP, 40);
  renderText(ctx, 'Список результатов:', CONGRATULATION_GAP, 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var timesText = Math.round(times[i]);
    var columnHeight = timesText * MAX_BAR_HEIGHT / maxTime;

    renderRect(ctx, BAR_X + (BAR_GAP * i), BAR_Y, BAR_WIDTH, columnHeight * (-1), getRandomColorOfPlayer(players[i])); // Отрисовка колонок
    renderText(ctx, players[i], BAR_X + (BAR_GAP * i), BAR_Y + TEXT_GAP); // Отрисовка имен игроков
    renderText(ctx, timesText, BAR_X + (BAR_GAP * i), CLOUD_HEIGHT - columnHeight - TEXT_GAP); // Отрисовка времени их прохождения
  }
};
