import { S } from "../State";
import { draw, con } from "../draw/Draw";
import { KeyCode } from "./KeyCode";
import { IState } from "../Types";

export default () => {
  window.addEventListener("keydown", (e) => {
    if (S.Frag.gameover || !S.Frag.start) {
      return;
    }

    if (e.keyCode === KeyCode.menu) {
      //メニューを閉じる
      if (S.Frag.menu) {
        menuClose(S, con);
        console.log(S.Frag.menu);
        return;
      }
      //メニューを開く
      if (!S.Frag.menu) {
        menuOpen(S, con);
        console.log(S.Frag.menu);
        return;
      }
    }
  });
};

export function menuOpen(S: IState, con: any) {
  S.Frag.menu = true;
  draw(con, S.env);
  return;
}

export function menuClose(S: IState, con: any) {
  S.Frag.menu = false;
  draw(con, S.env);
  return;
}
