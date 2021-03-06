"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("../State");
var config_1 = require("../config");
exports.default = (function () {
    var drawStartPoint = { x: 0, y: 0 };
    // 描画を開始するX座標を計算
    //プレイヤーのxが描画範囲の半分以内なら始点は0
    if (State_1.S.player.x <= Math.floor(config_1.DrawRange.x / 2)) {
        drawStartPoint.x = 0;
    }
    //画面描画が右端で止まるところを始点とする
    else if (State_1.S.player.x >=
        State_1.S.floors[State_1.S.player.depth].size.width - Math.floor(config_1.DrawRange.x / 2)) {
        drawStartPoint.x = State_1.S.floors[State_1.S.player.depth].size.width - config_1.DrawRange.x;
    }
    else {
        drawStartPoint.x = State_1.S.player.x - Math.floor(config_1.DrawRange.x / 2);
    }
    //描画を開始するY座標を計算
    if (State_1.S.player.y <= Math.floor(config_1.DrawRange.y / 2)) {
        drawStartPoint.y = 0;
    }
    else if (State_1.S.player.y >=
        State_1.S.floors[State_1.S.player.depth].size.height - Math.floor(config_1.DrawRange.y / 2)) {
        drawStartPoint.y = State_1.S.floors[State_1.S.player.depth].size.height - config_1.DrawRange.y;
    }
    else {
        drawStartPoint.y = State_1.S.player.y - Math.floor(config_1.DrawRange.y / 2);
    }
    return drawStartPoint;
});
//# sourceMappingURL=culcDrawStartPoint.js.map