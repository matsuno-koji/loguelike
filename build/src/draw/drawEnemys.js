"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("../State");
var config_1 = require("../config");
var Enemy_1 = require("../Enemy");
exports.default = (function (con, drawStartPoint) {
    con.textBaseline = "middle";
    con.textAlign = "center";
    var enemys = State_1.S.fields[State_1.S.player.depth].enemys;
    for (var i = 0; i < enemys.length; i++) {
        if (enemys[i].point.x >= drawStartPoint.x &&
            enemys[i].point.x < drawStartPoint.x + config_1.DrawRange.x &&
            enemys[i].point.y >= drawStartPoint.y &&
            drawStartPoint.y + config_1.DrawRange.y) {
            drawEnemy(con, enemys[i], drawStartPoint);
        }
    }
});
function drawEnemy(con, enemy, drawStartPoint) {
    var id = enemy.id;
    if (id === Enemy_1.EnemyId.slime) {
        drawEnemyImg.slime(con, enemy.point, drawStartPoint);
    }
    else if (id === Enemy_1.EnemyId.rat) {
        drawEnemyImg.rat(con, enemy.point, drawStartPoint);
    }
}
var drawEnemyImg;
(function (drawEnemyImg) {
    function slime(con, popPoint, drawStartPoint) {
        con.fillStyle = "blue";
        con.font = "16px consolas";
        con.fillText("●", (popPoint.x - drawStartPoint.x) * config_1.TyleSize.x + config_1.TyleSize.x / 2, (popPoint.y - drawStartPoint.y) * config_1.TyleSize.y + config_1.TyleSize.y / 2);
    }
    drawEnemyImg.slime = slime;
    function rat(con, popPoint, drawStartPoint) {
        con.fillStyle = "blown";
        con.font = "16px consolas";
        con.fillText("R", (popPoint.x - drawStartPoint.x) * config_1.TyleSize.x + config_1.TyleSize.x / 2, (popPoint.y - drawStartPoint.y) * config_1.TyleSize.y + config_1.TyleSize.y / 2);
    }
    drawEnemyImg.rat = rat;
})(drawEnemyImg = exports.drawEnemyImg || (exports.drawEnemyImg = {}));
