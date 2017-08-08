/*各种游戏开房设置*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameSetting = (function () {
    function GameSetting() {
        this.timeArr = [15, 30, 60];
        this.timeId = 0;
        this.type = GameConstant.GAME_SUBTYPE1;
        this.gameName = "";
    }
    Object.defineProperty(GameSetting.prototype, "TimeId", {
        get: function () {
            return this.timeId;
        },
        set: function (value) {
            if (value >= 0 && value < this.timeArr.length)
                this.timeId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameSetting.prototype, "Type", {
        get: function () {
            return this.type;
        },
        set: function (value) {
            this.type = value;
        },
        enumerable: true,
        configurable: true
    });
    GameSetting.prototype.setType = function () {
        if (this.type == GameConstant.GAME_SUBTYPE1)
            this.type = GameConstant.GAME_SUBTYPE2;
        else
            this.type = GameConstant.GAME_SUBTYPE1;
    };
    return GameSetting;
}());
__reflect(GameSetting.prototype, "GameSetting");
//# sourceMappingURL=GameSetting.js.map