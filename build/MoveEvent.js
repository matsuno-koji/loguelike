"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const KeyCode_1 = require("./key/KeyCode");
const State_1 = require("./State");
const Draw_1 = require("./draw/Draw");
const player_1 = __importDefault(require("./player/player"));
const Map_1 = require("./Map");
// import { createField, putDownStairs } from "./createField";
const messages_1 = require("./text/messages");
const text_1 = require("./text/text");
const config_1 = require("./config");
const battleEvents_1 = require("./battle/battleEvents");
const doEnemyTurn_1 = __importDefault(require("./enemy/doEnemyTurn"));
const CreateFloor_1 = __importDefault(require("../src/floor/CreateFloor"));
exports.default = () => {
    window.addEventListener("keydown", (e) => {
        e.preventDefault();
        if (e.keyCode === KeyCode_1.KeyCode.left ||
            e.keyCode === KeyCode_1.KeyCode.up ||
            e.keyCode === KeyCode_1.KeyCode.right ||
            e.keyCode === KeyCode_1.KeyCode.down) {
            const movePlayer = new player_1.default(State_1.S.player.x, State_1.S.player.y);
            // shiftを押している
            if (e.shiftKey) {
                if (State_1.S.KeyPress.left && State_1.S.KeyPress.up) {
                    movePlayer.moveUpperLeft();
                }
                else if (State_1.S.KeyPress.right && State_1.S.KeyPress.up) {
                    movePlayer.moveUpperRight();
                }
                else if (State_1.S.KeyPress.left && State_1.S.KeyPress.down) {
                    movePlayer.moveDownnerLeft();
                }
                else if (State_1.S.KeyPress.right && State_1.S.KeyPress.down) {
                    movePlayer.moveDownnerRight();
                }
                else {
                    return;
                }
            }
            // shiftを押していない
            else {
                if (e.keyCode === KeyCode_1.KeyCode.left) {
                    movePlayer.moveLeft();
                }
                else if (e.keyCode === KeyCode_1.KeyCode.up) {
                    movePlayer.moveUp();
                }
                else if (e.keyCode === KeyCode_1.KeyCode.right) {
                    movePlayer.moveRight();
                }
                else if (e.keyCode === KeyCode_1.KeyCode.down) {
                    movePlayer.moveDown();
                }
            }
            // 現在の位置から移動していた場合
            if (movePlayer.x !== State_1.S.player.x || movePlayer.y !== State_1.S.player.y) {
                const movePoint = { x: movePlayer.x, y: movePlayer.y };
                //移動先に敵がいた場合
                const enemys = State_1.S.fields[State_1.S.player.depth].enemys;
                const result = battleEvents_1.battleEvent.searchEnemy(movePoint, enemys);
                if ((result.enemy && result.index) ||
                    (result.enemy && result.index === 0) //0はfalseを返すため場合分け
                ) {
                    const targetEnemy = result.enemy;
                    const enemyIndex = result.index;
                    //ダメージ計算
                    battleEvents_1.battleEvent.attackResult(targetEnemy);
                    //敵のHPが0以下になった場合
                    if (targetEnemy.HP <= 0) {
                        battleEvents_1.battleEvent.defeatEnemy(enemys, targetEnemy, enemyIndex);
                    }
                    while (State_1.S.player.EXP >= State_1.S.player.requireEXP) {
                        battleEvents_1.battleEvent.levelUp();
                    }
                }
                else {
                    //移動予定のブロックを特定
                    const targetBlock = State_1.S.fields[State_1.S.player.depth].blocks[movePoint.x][movePoint.y];
                    //移動先が通過可能なブロックならプレイヤーの座標を更新
                    if (config_1.CanStand[targetBlock.base]) {
                        State_1.S.player.x = movePoint.x;
                        State_1.S.player.y = movePoint.y;
                    }
                    else {
                        State_1.S.messages.add(new messages_1.Message(text_1.TEXT.wall, config_1.MessageType.normal));
                        Draw_1.draw(Draw_1.con, State_1.S.env);
                    }
                }
            }
            else {
                return;
            }
        }
        else {
            return;
        }
        doEnemyTurn_1.default();
        Draw_1.draw(Draw_1.con, State_1.S.env);
    });
    window.addEventListener("keydown", (e) => {
        e.preventDefault(); //スペースでのスクロールを防止
        if (e.keyCode === KeyCode_1.KeyCode.space) {
            const block = State_1.S.fields[State_1.S.player.depth].blocks[State_1.S.player.x][State_1.S.player.y];
            if (block.base === Map_1.map.B_DOWNSTAIR) {
                State_1.S.player.stairDown();
                State_1.S.messages.add(new messages_1.Message(text_1.TEXT.downstair, config_1.MessageType.normal));
                if (!State_1.S.fields[State_1.S.player.depth]) {
                    // S.fields[S.player.depth] = createField(
                    //   S.player.depth,
                    //   [{ x: S.player.x, y: S.player.y }],
                    //   S.seed
                    // );
                    State_1.S.fields[State_1.S.player.depth] = {
                        size: { x: 25, y: 25 },
                        enemys: [],
                        blocks: [],
                    };
                    //テスト用に書き換え
                    // S.fields[S.player.depth].blocks = createFloor();
                    State_1.S.fields[State_1.S.player.depth].blocks = CreateFloor_1.default({
                        width: 25,
                        height: 25,
                    });
                    // S.fields[S.player.depth].enemys = popEnemy(rooms);
                    // putDownStairs(rooms);
                    //フィールドサイズを更新
                    State_1.S.fieldSize = State_1.S.fields[State_1.S.player.depth].size;
                }
            }
        }
        else {
            return;
        }
        Draw_1.draw(Draw_1.con, State_1.S.env);
    });
};
