import { KeyCode } from "./KeyCode";
import { S } from "./State";
import { con, draw } from "./Draw";
import Player from "./player";
import { map } from "./Map";
import { createField } from "./createField";
import { Message } from "./messages";
import { TEXT } from "./text";
import { MessageType, CanStand } from "./config";
import { Point } from "./Types";
import { battleEvent } from "./battle/battleEvents";
import doEnemyTurn from "./doEnemyTurn";
export default () => {
  window.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (
      e.keyCode === KeyCode.left ||
      e.keyCode === KeyCode.up ||
      e.keyCode === KeyCode.right ||
      e.keyCode === KeyCode.down
    ) {
      const movePlayer = new Player(S.player.x, S.player.y);
      // shiftを押している
      if (e.shiftKey) {
        if (S.KeyPress.left && S.KeyPress.up) {
          movePlayer.moveUpperLeft();
        } else if (S.KeyPress.right && S.KeyPress.up) {
          movePlayer.moveUpperRight();
        } else if (S.KeyPress.left && S.KeyPress.down) {
          movePlayer.moveDownnerLeft();
        } else if (S.KeyPress.right && S.KeyPress.down) {
          movePlayer.moveDownnerRight();
        } else {
          return;
        }
      }
      // shiftを押していない
      else {
        if (e.keyCode === KeyCode.left) {
          movePlayer.moveLeft();
        } else if (e.keyCode === KeyCode.up) {
          movePlayer.moveUp();
        } else if (e.keyCode === KeyCode.right) {
          movePlayer.moveRight();
        } else if (e.keyCode === KeyCode.down) {
          movePlayer.moveDown();
        }
      }
      // 現在の位置から移動していた場合
      if (movePlayer.x !== S.player.x || movePlayer.y !== S.player.y) {
        const movePoint: Point = { x: movePlayer.x, y: movePlayer.y };
        //移動先に敵がいた場合
        const enemys = S.fields[S.player.depth].enemys;
        const result = battleEvent.searchEnemy(movePoint, enemys);
        if (
          (result.enemy && result.index) ||
          (result.enemy && result.index === 0) //0はfalseを返すため場合分け
        ) {
          const targetEnemy = result.enemy;
          const enemyIndex = result.index;
          //ダメージ計算
          battleEvent.attackResult(targetEnemy);
          //敵のHPが0以下になった場合
          if (targetEnemy.HP <= 0) {
            battleEvent.defeatEnemy(enemys, targetEnemy, enemyIndex);
          }
          while (S.player.EXP >= S.player.requireEXP) {
            battleEvent.levelUp();
          }
        } else {
          //移動予定のブロックを特定
          const targetBlock =
            S.fields[S.player.depth].blocks[movePoint.x][movePoint.y];
          //移動先が通過可能なブロックならプレイヤーの座標を更新
          if (CanStand[targetBlock.base]) {
            S.player.x = movePoint.x;
            S.player.y = movePoint.y;
          } else {
            S.messages.add(new Message(TEXT.wall, MessageType.normal));
            draw(con, S.env);
          }
        }
      } else {
        return;
      }
    } else {
      return;
    }
    doEnemyTurn();
    draw(con, S.env);
  });

  window.addEventListener("keydown", (e) => {
    e.preventDefault(); //スペースでのスクロールを防止
    if (e.keyCode === KeyCode.space) {
      const block = S.fields[S.player.depth].blocks[S.player.x][S.player.y];
      if (block.base === map.B_DOWNSTAIR) {
        S.player.stairDown();
        S.messages.add(new Message(TEXT.downstair, MessageType.normal));
        if (!S.fields[S.player.depth]) {
          S.fields[S.player.depth] = createField(
            S.player.depth,
            [{ x: S.player.x, y: S.player.y }],
            S.seed
          );
          //フィールドサイズを更新
          S.fieldSize = S.fields[S.player.depth].size;
        }
      }
    } else {
      return;
    }
    draw(con, S.env);
  });
};