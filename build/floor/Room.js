"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var Room = /** @class */ (function () {
    function Room(point, size, index) {
        if (index) {
            this.index = index;
        }
        this.size = size;
        this.start = point;
        this.end = this.calcEnd(point, size);
        this.center = this.calcCenter(point, size);
        this.hasPath = [];
        this.toPath = [];
    }
    //部屋が一つしかないなら早期リターン
    Room.prototype.findNear = function (rooms) {
        var roomDistances = [];
        if (rooms.length <= 1) {
            return undefined;
        }
        for (var i = 0; i < rooms.length; i++) {
            var room = rooms[i];
            var distance = Math.abs(this.center.x - room.center.x) +
                Math.abs(this.center.y - room.center.y);
            //距離ゼロは自室なので加えない
            if (distance !== 0) {
                var result = { index: i, distance: distance };
                roomDistances.push(result);
            }
        }
        //部屋の距離を比較して配列を並び替える
        roomDistances = roomDistances.sort(function (a, b) {
            return a.distance > b.distance ? 1 : -1;
        });
        //一番近い部屋を返す
        return rooms[roomDistances[0].index];
    };
    //終点を計算
    Room.prototype.calcEnd = function (point, size) {
        var result = {
            x: point.x + size.width - 1,
            y: point.y + size.height - 1,
        };
        return result;
    };
    //中心点を計算
    Room.prototype.calcCenter = function (point, size) {
        var result = {
            x: Math.floor(point.x + size.width / 2),
            y: Math.floor(point.y + size.height / 2),
        };
        return result;
    };
    Room.prototype.isNoDuplicate = function (rooms) {
        var result = true;
        var area_x = {
            start: this.start.x - config_1.RoomConf.distance_x,
            end: this.end.x + config_1.RoomConf.distance_y,
        };
        var area_y = {
            start: this.start.y - config_1.RoomConf.distance_y,
            end: this.end.y + config_1.RoomConf.distance_y,
        };
        //まだ部屋が無い場合、確実に生成できるので処理終了
        if (rooms.length === 0)
            return result;
        //各部屋のxとyを比較する
        for (var i = 0; i < rooms.length; i++) {
            var room = rooms[i];
            if ((area_x.start <= room.start.x &&
                room.start.x <= area_x.end &&
                area_y.start <= room.start.y &&
                room.start.y <= area_y.end) ||
                (area_x.start <= room.end.x &&
                    room.end.x <= area_x.end &&
                    area_y.start <= room.end.y &&
                    room.end.y <= area_y.end)) {
                result = false;
                break;
            }
        }
        return result;
    };
    //作成しようとしている部屋がフロアからはみだしていないか確認する
    Room.prototype.isInFloor = function (floorSize) {
        var result = true;
        //部屋がフロアからはみ出していないか確認
        if (this.start.x < 1 ||
            this.start.y < 1 ||
            this.end.x > floorSize.width - 1 ||
            this.end.y > floorSize.height - 1) {
            result = false;
        }
        return result;
    };
    return Room;
}());
exports.default = Room;
