/*某一种游戏的数据记录 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameRecord = (function () {
    function GameRecord() {
        this.construtTestData();
    }
    GameRecord.prototype.construtTestData = function () {
        // this.mvpNum = Math.floor(Math.random()*200);
        // this.weakNum = Math.floor(Math.random()*50);
        // this.totalRound = Math.floor(200+Math.random()*500);
        // this.winRate = Math.floor(100*(this.mvpNum/this.totalRound));
        // this.totalPoint = Math.floor(Math.random()*300);
    };
    Object.defineProperty(GameRecord.prototype, "GameType", {
        //游戏类型
        get: function () {
            return this.gameType;
        },
        set: function (value) {
            this.gameType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRecord.prototype, "MvpNum", {
        //得到mvp次数
        get: function () {
            return this.mvpNum;
        },
        set: function (value) {
            this.mvpNum = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRecord.prototype, "WeakNum", {
        //浪货次数
        get: function () {
            return this.weakNum;
        },
        set: function (value) {
            this.weakNum = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRecord.prototype, "TotalRound", {
        //总局数
        get: function () {
            return this.totalRound;
        },
        set: function (value) {
            this.totalRound = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRecord.prototype, "WinRate", {
        //胜率
        get: function () {
            return this.winRate;
        },
        set: function (value) {
            this.winRate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameRecord.prototype, "TotalPoint", {
        //总积分
        get: function () {
            return this.totalPoint;
        },
        set: function (value) {
            this.totalPoint = value;
        },
        enumerable: true,
        configurable: true
    });
    GameRecord.prototype.toJsonString = function () {
        return { gameType: this.gameType, mvpNum: this.mvpNum, weakNum: this.weakNum,
            totalRound: this.totalRound, winRate: this.winRate };
    };
    return GameRecord;
}());
__reflect(GameRecord.prototype, "GameRecord");
//# sourceMappingURL=GameRecord.js.map