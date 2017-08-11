/*玩家单轮数据 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerRoundData = (function () {
    function PlayerRoundData() {
        this.nick = "12312"; //微信昵称
        this.avatar = ""; //微信头像
        this.point = 5; //本局得分
        this.rank = -1; //本局排名
    }
    Object.defineProperty(PlayerRoundData.prototype, "Nick", {
        get: function () {
            return this.nick;
        },
        set: function (value) {
            this.nick = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerRoundData.prototype, "Avatar", {
        get: function () {
            return this.avatar;
        },
        set: function (value) {
            this.avatar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerRoundData.prototype, "Point", {
        get: function () {
            return this.point;
        },
        set: function (value) {
            this.point = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerRoundData.prototype, "Rank", {
        get: function () {
            return this.rank;
        },
        set: function (value) {
            this.rank = value;
        },
        enumerable: true,
        configurable: true
    });
    PlayerRoundData.prototype.toJsonString = function () {
        return { rank: this.rank, nick: this.nick, avatar: this.avatar, point: this.point };
    };
    return PlayerRoundData;
}());
__reflect(PlayerRoundData.prototype, "PlayerRoundData");
//# sourceMappingURL=PlayerRoundData.js.map