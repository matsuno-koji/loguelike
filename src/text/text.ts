export enum TEXT {
  title = "Logue Like",
  start = "Zキーで始める",
  downstair = "階段を降りました",
  wall = "壁にぶつかった！",
  init = "ダンジョン最高〜〜〜!!",
  depth = "階",
  level = "LV",
  hp = "HP",
  ATK = "攻撃力",
  DEF = "防御力",
  EXP = "経験値",
  die = "あなたは力尽きた",
}

export module actionMsg {
  export let attack = (name: string, damage: number) => {
    return `${name}に${damage}のダメージを与えた`;
  };
  export let kill = (name: string, exp: number) => {
    return `${name}を倒した。${exp}の経験値を得た`;
  };
  export let levelUp = (level: number) => {
    return `レベルが${level}にあがった`;
  };
  export let beAttacked = (name: string, damage: number) => {
    return `${name}から${damage}のダメージを受けた`;
  };
}
