import Room from "../Room";
import { Floor } from "../Floor";
import { IGate } from "@root/Types";
import fillUpWall from "../usecase/fillUpWall";
import digRooms from "../usecase/digRooms";
import putDownstair from "../usecase/putDownstair";
/* 一階の設計図 */
const point = { x: 1, y: 1 };
const size = { width: 23, height: 23 };
const rooms = [new Room(point, size, 1)];
const downstair = { x: 13, y: 7 };
const gates: IGate[] = [];
const floorSize = { width: 25, height: 25 };

const firstFloor = new Floor(floorSize, rooms, gates, downstair);

firstFloor.blocks = fillUpWall(firstFloor, firstFloor.blocks);
firstFloor.blocks = digRooms(firstFloor, firstFloor.blocks);
firstFloor.blocks = putDownstair(firstFloor);
export { firstFloor };
