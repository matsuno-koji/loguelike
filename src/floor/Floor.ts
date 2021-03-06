import { ISize, IBlock, IGate, IPoint } from "../Types";
import { MapType, Direction } from "../config";
import Room from "./Room";
import Dig from "./Dig";
import { Random } from "../module/RandomNum";

export class Floor {
  size: ISize;
  rooms: Room[];
  gates: IGate[];
  downstair: IPoint;
  blocks: IBlock[][];

  constructor(
    floorSize: ISize,
    rooms: Room[],
    gates: IGate[],
    downstair: IPoint
  ) {
    this.size = floorSize;
    this.rooms = rooms;
    this.gates = gates;
    this.downstair = downstair;
    this.blocks = [];
  }

  coordinateCanStand() {
    const roomNum = Random.rangeInt(0, this.rooms.length - 1);
    const room = this.rooms[roomNum];
    const x = Random.rangeInt(room.start.x, room.end.x);
    const y = Random.rangeInt(room.start.y, room.end.y);
    const point = { x: x, y: y };
    return point;
  }

  isInFloor(point: IPoint) {
    let result = false;
    if (
      point.x > 0 &&
      point.x < this.size.width - 2 &&
      point.y > 0 &&
      point.y < this.size.height - 2
    ) {
      result = true;
    }
    return result;
  }

  isCanStand(point: IPoint) {
    let isCanStand = false;
    let x = point.x;
    let y = point.y;
    if (this.blocks[x][y].base === MapType.floor) {
      isCanStand = true;
    }
    return isCanStand;
  }

  fillWall(blocks: IBlock[][]) {
    for (let i = 0; i <= this.size.width; i++) {
      blocks[i] = [];
      for (let j = 0; j <= this.size.height; j++) {
        blocks[i][j] = { base: MapType.wall };
      }
    }
  }

  digPaths(blocks: IBlock[][]) {
    for (let i = 0; i < this.gates.length; i++) {
      let gate = this.gates[i];
      if (
        gate.direction === Direction.left ||
        gate.direction === Direction.right
      ) {
        new Dig(gate.A, gate.B).sideToside(blocks);
      } else {
        new Dig(gate.A, gate.B).topTobottom(blocks);
      }
    }
  }
}
