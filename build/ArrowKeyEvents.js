"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyCode_1 = require("./KeyCode");
var State_1 = require("./State");
var Draw_1 = require("./Draw");
var index_1 = require("./index");
exports.default = (function () {
    // 移動キーが押されているか
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === KeyCode_1.KeyCode.left) {
            State_1.S.KeyPress.left = true;
        }
        else if (e.keyCode === KeyCode_1.KeyCode.up) {
            State_1.S.KeyPress.up = true;
        }
        else if (e.keyCode === KeyCode_1.KeyCode.right) {
            State_1.S.KeyPress.right = true;
        }
        else if (e.keyCode === KeyCode_1.KeyCode.down) {
            State_1.S.KeyPress.down = true;
        }
        else {
            State_1.S.KeyPress.left = false;
            State_1.S.KeyPress.up = false;
            State_1.S.KeyPress.right = false;
            State_1.S.KeyPress.down = false;
        }
    });
    // 移動キーが離されたかどうか
    window.addEventListener("keyup", function (e) {
        if (e.keyCode === KeyCode_1.KeyCode.left) {
            State_1.S.KeyPress.left = false;
        }
        else if (e.keyCode === KeyCode_1.KeyCode.up) {
            State_1.S.KeyPress.up = false;
        }
        else if (e.keyCode === KeyCode_1.KeyCode.right) {
            State_1.S.KeyPress.right = false;
        }
        else if (e.keyCode === KeyCode_1.KeyCode.down) {
            State_1.S.KeyPress.down = false;
        }
    });
    // shiftキー
    window.addEventListener("keydown", function (e) {
        if (e.keyCode === KeyCode_1.KeyCode.shift) {
            if (!State_1.S.env.diagonal) {
                State_1.S.env.diagonal = true;
                Draw_1.draw(Draw_1.con, State_1.S.env);
            }
            return;
        }
    });
    // シフトを押しているかどうか
    window.addEventListener("keyup", function (e) {
        if (e.keyCode === KeyCode_1.KeyCode.shift) {
            if (State_1.S.env.diagonal) {
                State_1.S.env.diagonal = false;
                Draw_1.draw(Draw_1.con, State_1.S.env);
            }
        }
    });
    /* Zキー */
    window.addEventListener("keydown", function (e) {
        //タイトル画面での操作
        if (!State_1.S.Frag.start) {
            if (e.keyCode === KeyCode_1.KeyCode.action) {
                State_1.S.Frag.start = true;
                index_1.init();
                Draw_1.draw(Draw_1.con, State_1.S.env);
            }
            return;
        }
        //ゲームオーバー時の操作
        if (State_1.S.Frag.gameover) {
            if (e.keyCode === KeyCode_1.KeyCode.action) {
                State_1.S.Frag.start = false;
                Draw_1.draw(Draw_1.con, State_1.S.env);
            }
            return;
        }
    });
    // ブラウザ以外を見ているとき
    window.addEventListener("blur", function (e) {
        if (State_1.S.env.diagonal) {
            State_1.S.env.diagonal = false;
            Draw_1.draw(Draw_1.con, State_1.S.env);
        }
    });
});
