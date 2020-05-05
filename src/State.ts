import Player from "./player/player";
import { MessageList } from "./text/messages";
import { IState } from "./Types";

export let S: IState = {
  floors: [],
  enemys: [],
  player: new Player(0, 0),
  bags: [],
  messages: new MessageList(),
  Frag: {
    start: false,
    gameover: false,
    menu: false,
    eyecatch: false,
  },
  env: { diagonal: false },
  KeyPress: {
    left: false,
    right: false,
    up: false,
    down: false,
  },
  seed: Date.now().toString(10),
};
