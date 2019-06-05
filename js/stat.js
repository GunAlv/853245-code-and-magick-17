'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var TEXT_GAP = 120;
var CLOUD_GAP = 10;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var BAR_WIDTH = 40;
var BAR_X = 140;
var BAR_Y = 250;
var BAR_GAP = 100;
var NAME_Y = 270;
var NAME_X = 145;
var NAME_GAP = 98;
var TIME_GAP = 30;
var MAX_BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, y) {
  ctx.font = '16px PT Mono';
  ctx.strokeText(text, TEXT_GAP, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var j = 1; j < arr.length; j++) {
    if (arr[j] > maxElement) {
      maxElement = arr[j];
    }
  }

  return maxElement;
};

var getRandomOpacity = function (playerName) {
  if (playerName === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  } else {
    var randomOpacity = (Math.random() * (1 - 0.1)) + 0.1;
    return 'rgba(0, 0, 255, ' + randomOpacity + ')';
  }
};


window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, 'Ура, вы победили!', 40);
  renderText(ctx, 'Список результатов:', 60);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = getRandomOpacity(players[i]);

    var timesText = Math.round(times[i]);
    var columnHeight = timesText * MAX_BAR_HEIGHT / (maxTime - 0);

    ctx.fillRect(BAR_X + (BAR_GAP * i), BAR_Y, BAR_WIDTH, columnHeight * (-1));
    ctx.strokeText(players[i], NAME_X + (NAME_GAP * i), NAME_Y);
    ctx.strokeText(timesText, NAME_X + (NAME_GAP * i), CLOUD_HEIGHT - columnHeight - TIME_GAP);
  }
};
